import { useState, useEffect } from 'react'
import { packService, productService } from '../services/api'

export default function PacksPage() {
  const [productCount, setProductCount] = useState(0)
  const [packs, setPacks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generated, setGenerated] = useState(false)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const products = await productService.getAll()
      setProductCount(products.length)
      const existingPacks = await packService.getAll()
      if (existingPacks.length > 0) {
        setPacks(existingPacks)
        setGenerated(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGenerate = async () => {
    if (productCount === 0) {
      alert('Debes agregar productos primero')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const newPacks = await packService.generate()
      setPacks(newPacks)
      setGenerated(true)
    } catch (err) {
      setError('Error al generar packs. Verifica que el backend esté corriendo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Generar Packs Automáticamente
        </h2>
        <p className="text-gray-600 mb-6">
          Se crearán 60 packs (20 días × 3 recreos) distribuyendo los {productCount} productos
          disponibles de forma variada.
        </p>

        {error && (
          <div className="bg-red-50 p-3 rounded mb-4 border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
            <p className="text-red-500 text-xs mt-1">
              💡 Asegúrate de ejecutar el backend con: cd backend && npm install && npm run prisma:migrate && npm run dev
            </p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
        >
          {loading ? '⏳ Generando...' : '🎲 Generar Packs para el Mes'}
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
                    {pack.items.map((item: any, idx: number) => (
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
