import prisma from '../lib/prisma.js'

export interface ShoppingItem {
  productId: string
  product: any
  totalGrams?: number
  totalUnits?: number
  totalQuantity: number
}

export async function calculateTotals(): Promise<ShoppingItem[]> {
  const packItems = await prisma.packItem.findMany({
    include: { product: true }
  })

  const totalsMap = new Map<string, ShoppingItem>()

  for (const item of packItems) {
    const key = item.productId
    const existing = totalsMap.get(key)

    if (existing) {
      existing.totalQuantity += item.quantity
      if (item.product.unitType === 'gramos') {
        existing.totalGrams = (existing.totalGrams || 0) + (item.product.weight * item.quantity)
      } else if (item.product.unitType === 'unidades') {
        existing.totalUnits = (existing.totalUnits || 0) + item.quantity
      } else if (item.product.unitType === 'ml') {
        existing.totalGrams = (existing.totalGrams || 0) + (item.product.weight * item.quantity)
      }
    } else {
      const shoppingItem: ShoppingItem = {
        productId: item.productId,
        product: item.product,
        totalQuantity: item.quantity
      }

      if (item.product.unitType === 'gramos') {
        shoppingItem.totalGrams = item.product.weight * item.quantity
      } else if (item.product.unitType === 'unidades') {
        shoppingItem.totalUnits = item.quantity
      } else if (item.product.unitType === 'ml') {
        shoppingItem.totalGrams = item.product.weight * item.quantity
      }

      totalsMap.set(key, shoppingItem)
    }
  }

  return Array.from(totalsMap.values()).sort((a, b) =>
    a.product.name.localeCompare(b.product.name)
  )
}

export async function getShoppingListCSV(): Promise<string> {
  const totals = await calculateTotals()

  let csv = 'Producto,Unidad,Cantidad\n'
  for (const item of totals) {
    let quantity = ''
    if (item.product.unitType === 'unidades') {
      quantity = `${item.totalUnits || 0} unidades`
    } else if (item.product.unitType === 'ml') {
      quantity = `${item.totalGrams || 0} ml`
    } else {
      quantity = `${item.totalGrams || 0} g`
    }
    csv += `"${item.product.name}","${item.product.unitType}","${quantity}"\n`
  }

  return csv
}
