import { useState, useEffect } from 'react'
import { Product, Pack } from '../types'
import { generateMonthPacks } from '../utils/packGenerator'

export default function PacksPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [packs, setPacks] = useState<Pack[]>([])
  const [generated, setGenerated] = useState(false)

  useEffect(() => {
    const savedProducts = localStorage.getItem('products')
    const savedPacks = localStorage.getItem('packs')
    if (savedProducts) setProducts(JSON.parse(savedProducts))
    if (savedPacks) {
      setPacks(JSON.parse(savedPacks))
      setGenerated(true)
    }
  }, [])

  const handleGenerate = () => {
    if (products.length === 0) {
      alert('Debes agregar productos primero')
      return
    }

    const newPacks = generateMonthPacks(products)
    setPacks(newPacks)
    localStorage.setItem('packs', JSON.stringify(newPacks))
    setGenerated(true)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Generar Packs Automáticamente
        </h2>
        <p className="text-gray-600 mb-6">
          Se crearán 60 packs (20 días × 3 recreos) distribuyendo los {products.length} productos
          disponibles de forma variada.
        </p>
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
        >
          🎲 Generar Packs para el Mes
        </button>
      </div>

      {generated && packs.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Packs Generados: {packs.length} ✓
            </h3>
            <p className="text-gray-600">
              {packs.filter(p => p.day <= 10).length} packs en las primeras 2 semanas
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packs.slice(0, 6).map((pack) => (
                <div key={pack.id} className="border border-gray-300 rounded-lg p-4">
                  <div className="font-bold text-gray-900 mb-2">
                    Día {pack.day} - Pack {pack.packNum}
                  </div>
                  <div className="space-y-1">
                    {pack.items.map((item, idx) => (
                      <div key={idx} className="text-sm text-gray-600">
                        • {item.product.name} (x{item.quantity})
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {packs.length > 6 && (
              <p className="text-gray-500 text-sm mt-4">
                ... y {packs.length - 6} packs más
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
