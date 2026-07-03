import prisma from '../lib/prisma.js'
import { getAllProducts } from './productService.js'
import { type Pack } from '@prisma/client'

const WORK_DAYS = 20
const PACKS_PER_DAY = 3
const ITEMS_PER_PACK = 3

export async function generateMonthPacks(): Promise<Pack[]> {
  const products = await getAllProducts()

  if (products.length === 0) {
    throw new Error('No hay productos para generar packs')
  }

  // Eliminar packs existentes
  await prisma.packItem.deleteMany({})
  await prisma.pack.deleteMany({})

  const packs: Pack[] = []
  let productIndex = 0

  // Crear los 60 packs
  for (let day = 1; day <= WORK_DAYS; day++) {
    const weekNum = Math.ceil(day / 5)

    for (let packNum = 1; packNum <= PACKS_PER_DAY; packNum++) {
      const pack = await prisma.pack.create({
        data: { day, weekNum, packNum }
      })

      // Agregar productos al pack
      for (let i = 0; i < ITEMS_PER_PACK; i++) {
        const product = products[productIndex % products.length]
        await prisma.packItem.create({
          data: {
            packId: pack.id,
            productId: product.id,
            quantity: 1
          }
        })
        productIndex++
      }

      packs.push(pack)
    }
  }

  return getAllPacks()
}

export async function getAllPacks(): Promise<any[]> {
  return prisma.pack.findMany({
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: [{ day: 'asc' }, { packNum: 'asc' }]
  })
}

export async function getPackById(id: string): Promise<any> {
  return prisma.pack.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true }
      }
    }
  })
}

export async function updatePackItems(
  packId: string,
  items: { productId: string; quantity: number }[]
): Promise<any> {
  // Eliminar items existentes
  await prisma.packItem.deleteMany({ where: { packId } })

  // Crear nuevos items
  for (const item of items) {
    await prisma.packItem.create({
      data: {
        packId,
        productId: item.productId,
        quantity: item.quantity
      }
    })
  }

  return getPackById(packId)
}

export async function getPackCount(): Promise<number> {
  return prisma.pack.count()
}
