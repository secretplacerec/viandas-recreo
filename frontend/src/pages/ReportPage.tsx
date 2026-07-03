import { useState, useEffect } from 'react'
import { ShoppingItem } from '../types'
import { reportService } from '../services/api'

function formatQuantity(item: ShoppingItem): string {
  if (item.product.unitType === 'unidades') {
    return `${item.totalUnits || 0} unidades`
  } else if (item.product.unitType === 'ml') {
    return `${item.totalGrams || 0} ml`
  } else {
    return `${item.totalGrams || 0} g`
  }
}

export default function ReportPage() {
  const [totals, setTotals] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTotals()
  }, [])

  const loadTotals = async () => {
    try {
      setLoading(true)
      const data = await reportService.getTotals()
      setTotals(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar lista de compra')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = async () => {
    try {
      await reportService.exportCSV()
    } catch (err) {
      setError('Error al exportar CSV')
      console.error(err)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🛒 Lista de Compra
          </h2>
          <p className="text-gray-600 mt-1">
            Total de productos: {totals.length}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            📥 Exportar CSV
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            🖨️ Imprimir
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">Cargando lista de compra...</p>
        </div>
      ) : totals.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">
            No hay packs generados. Ve a "Generar Packs" primero.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 print:bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Unidad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {totals.map((item) => (
                <tr key={item.productId} className="hover:bg-gray-50 print:hover:bg-transparent">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.product.unitType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {formatQuantity(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:table, .print\\:table * { visibility: visible; }
          .print\\:overflow-x-auto { overflow: visible; }
        }
      `}</style>
    </div>
  )
}
