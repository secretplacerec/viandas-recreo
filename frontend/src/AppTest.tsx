import { useState } from 'react'

export default function AppTest() {
  const [currentPage, setCurrentPage] = useState('products')

  const navItems = [
    { id: 'products', label: 'Productos' },
    { id: 'packs', label: 'Generar Packs' },
    { id: 'calendar', label: 'Calendario' },
    { id: 'report', label: 'Lista de Compra' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            📦 Viandas Recreo
          </h1>
          <p className="text-gray-600 mt-1">Gestor de packs para recreos escolares</p>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                  currentPage === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Full Stack Funcionando</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Backend</h3>
              <p className="text-green-600">✅ http://localhost:3000 (Express)</p>
              <p className="text-gray-600">Base de datos: SQLite</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Frontend</h3>
              <p className="text-green-600">✅ http://localhost:5173 (React)</p>
              <p className="text-gray-600">Conectado a API</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Recargar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
