import { useState, useEffect } from 'react'
import { packService, productService } from '../services/api'

export default function CalendarPage() {
  const [packs, setPacks] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [selectedPack, setSelectedPack] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [packsData, productsData] = await Promise.all([
        packService.getAll(),
        productService.getAll()
      ])
      setPacks(packsData)
      setProducts(productsData)
      setError(null)
    } catch (err) {
      setError('Error al cargar datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = (packId: string, productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    setPacks(
      packs.map((p) => {
        if (p.id === packId) {
          const newItem = {
            id: `${packId}-${Date.now()}`,
            packId,
            productId,
            product,
            quantity: 1,
          }
          return { ...p, items: [...p.items, newItem] }
        }
        return p
      })
    )
  }

  const handleRemoveItem = (packId: string, itemId: string) => {
    setPacks(
      packs.map((p) => {
        if (p.id === packId) {
          return { ...p, items: p.items.filter((i) => i.id !== itemId) }
        }
        return p
      })
    )
  }

  const handleSave = async () => {
    try {
      if (selectedPack) {
        await packService.update(selectedPack.id, selectedPack.items)
        setError(null)
      }
      alert('Cambios guardados')
      setShowModal(false)
      await loadData()
    } catch (err) {
      setError('Error al guardar cambios')
      console.error(err)
    }
  }

  const weeks = [1, 2, 3, 4]
  const days = [1, 2, 3, 4, 5]
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📅 Calendario de Packs del Mes
        </h2>
        <p className="text-gray-600">
          Total de packs: {packs.length} | Click en un pack para editar
        </p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">Cargando calendario...</p>
        </div>
      ) : packs.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">
            No hay packs generados. Ve a "Generar Packs" primero.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {weeks.map((week) => (
            <div key={week} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Semana {week}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {days.map((day) => {
                  const dayOfMonth = (week - 1) * 5 + day
                  const dayPacks = packs.filter(
                    (p) => p.day === dayOfMonth
                  )

                  return (
                    <div
                      key={dayOfMonth}
                      className="border border-gray-300 rounded-lg overflow-hidden"
                    >
                      <div className="bg-blue-50 p-3 border-b border-gray-300">
                        <div className="font-bold text-gray-900">
                          {dayNames[day - 1]}
                        </div>
                        <div className="text-sm text-gray-600">
                          Día {dayOfMonth}
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        {dayPacks.map((pack) => (
                          <button
                            key={pack.id}
                            onClick={() => {
                              setSelectedPack(pack)
                              setShowModal(true)
                            }}
                            className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-blue-100 cursor-pointer"
                          >
                            <div className="text-xs font-bold text-gray-700">
                              Pack {pack.packNum}
                            </div>
                            <div className="text-xs text-gray-600">
                              {pack.items.length} items
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de edición */}
      {showModal && selectedPack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gray-50 p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold text-gray-900">
                Editar Pack - Día {selectedPack.day}, Recreo {selectedPack.packNum}
              </h3>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Productos</h4>
                <div className="space-y-2">
                  {selectedPack.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded"
                    >
                      <span className="text-sm text-gray-700">
                        {item.product.name} (x{item.quantity})
                      </span>
                      <button
                        onClick={() => handleRemoveItem(selectedPack.id, item.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Agregar producto</h4>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddItem(selectedPack.id, e.target.value)
                      e.target.value = ''
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">-- Seleccionar --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-300 flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
