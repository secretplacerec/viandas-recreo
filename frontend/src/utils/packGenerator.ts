import { Product, Pack, PackItem } from '../types'

export function generateMonthPacks(products: Product[]): Pack[] {
  if (products.length === 0) return []

  const WORK_DAYS = 20
  const PACKS_PER_DAY = 3
  const ITEMS_PER_PACK = 3

  const packs: Pack[] = []
  let productIndex = 0

  // Crear los 60 packs (20 días × 3)
  for (let day = 1; day <= WORK_DAYS; day++) {
    const weekNum = Math.ceil(day / 5)

    for (let packNum = 1; packNum <= PACKS_PER_DAY; packNum++) {
      const packItems: PackItem[] = []

      // Distribuir productos entre los packs
      for (let i = 0; i < ITEMS_PER_PACK; i++) {
        const product = products[productIndex % products.length]
        packItems.push({
          id: `${day}-${packNum}-${i}`,
          packId: `${day}-${packNum}`,
          productId: product.id,
          product,
          quantity: 1,
        })
        productIndex++
      }

      packs.push({
        id: `pack-${day}-${packNum}`,
        day,
        weekNum,
        packNum,
        items: packItems,
        createdAt: new Date(),
      })
    }
  }

  return packs
}

export function shufflePacks(packs: Pack[]): Pack[] {
  const shuffled = [...packs]
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
