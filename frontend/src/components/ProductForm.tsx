import { useState } from 'react'
import { Product } from '../types'

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export default function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState('')
  const [unitType, setUnitType] = useState<'gramos' | 'unidades' | 'ml'>('gramos')
  const [weight, setWeight] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !weight) return

    onSubmit({
      name: name.trim(),
      unitType,
      weight: parseFloat(weight),
    })
    setName('')
    setWeight('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Producto
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Manzana, Barrita de cereal"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unidad de Medida
          </label>
          <select
            value={unitType}
            onChange={(e) => setUnitType(e.target.value as 'gramos' | 'unidades' | 'ml')}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gramos">Gramos (g)</option>
            <option value="unidades">Unidades</option>
            <option value="ml">Mililitros (ml)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Peso/Cantidad por unidad
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ej: 150"
            step="0.1"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
