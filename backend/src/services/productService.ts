import prisma from '../lib/prisma.js'
import { type Product } from '@prisma/client'

export async function getAllProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getProductById(id: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } })
}

export async function createProduct(data: {
  name: string
  unitType: string
  weight: number
}): Promise<Product> {
  return prisma.product.create({ data })
}

export async function updateProduct(
  id: string,
  data: Partial<{ name: string; unitType: string; weight: number }>
): Promise<Product> {
  return prisma.product.update({ where: { id }, data })
}

export async function deleteProduct(id: string): Promise<Product> {
  return prisma.product.delete({ where: { id } })
}

export async function getProductCount(): Promise<number> {
  return prisma.product.count()
}
