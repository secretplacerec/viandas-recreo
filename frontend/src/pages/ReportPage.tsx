import { useState, useEffect } from 'react'
import { Pack, ShoppingItem } from '../types'
import { calculateTotals, formatQuantity } from '../utils/calculations'

export default function ReportPage() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [totals, setTotals] = useState<ShoppingItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('packs')
    if (saved) {
      const parsedPacks = JSON.parse(saved)
      setPacks(parsedPacks)
      setTotals(calculateTotals(parsedPacks))
    }
  }, [])

  const handleExportCSV = () => {
    if (totals.length === 0) {
      alert('No hay datos para exportar')
      return
    }

    let csv = 'Producto,Unidad,Cantidad\n'
    totals.forEach((item) => {
      const quantity = formatQuantity(item)
      csv += `"${item.product.name}","${item.product.unitType}","${quantity}"\n`
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lista-compra-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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

      {packs.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">
            No hay packs generados. Ve a "Generar Packs" primero.
          </p>
        </div>
      ) : totals.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">No hay datos en los packs.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
                <tr key={item.productId} className="hover:bg-gray-50">
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
    </div>
  )
}
