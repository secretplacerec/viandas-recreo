import { useState } from 'react'
import ProductsPage from './pages/ProductsPage'
import PacksPage from './pages/PacksPage'
import CalendarPage from './pages/CalendarPage'
import ReportPage from './pages/ReportPage'

type PageType = 'products' | 'packs' | 'calendar' | 'report'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('products')

  const navItems: { id: PageType; label: string }[] = [
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
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'packs' && <PacksPage />}
        {currentPage === 'calendar' && <CalendarPage />}
        {currentPage === 'report' && <ReportPage />}
      </main>
    </div>
  )
}
