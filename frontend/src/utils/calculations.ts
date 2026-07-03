import { Pack, ShoppingItem } from '../types'

export function calculateTotals(packs: Pack[]): ShoppingItem[] {
  const totalsMap = new Map<string, ShoppingItem>()

  for (const pack of packs) {
    for (const item of pack.items) {
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
          totalQuantity: item.quantity,
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
  }

  return Array.from(totalsMap.values()).sort((a, b) =>
    a.product.name.localeCompare(b.product.name)
  )
}

export function formatQuantity(item: ShoppingItem): string {
  if (item.product.unitType === 'unidades') {
    return `${item.totalUnits || 0} unidades`
  } else if (item.product.unitType === 'ml') {
    return `${item.totalGrams || 0} ml`
  } else {
    return `${item.totalGrams || 0} g`
  }
}
