import axios from 'axios'
import { Product, Pack, ShoppingItem } from '../types'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products
export const productService = {
  getAll: () => api.get<{ data: Product[] }>('/products').then(res => res.data.data),
  getById: (id: string) => api.get<{ data: Product }>(`/products/${id}`).then(res => res.data.data),
  create: (data: Omit<Product, 'id' | 'createdAt'>) =>
    api.post<{ data: Product }>('/products', data).then(res => res.data.data),
  update: (id: string, data: Partial<Product>) =>
    api.put<{ data: Product }>(`/products/${id}`, data).then(res => res.data.data),
  delete: (id: string) =>
    api.delete<{ data: Product }>(`/products/${id}`).then(res => res.data.data)
}

// Packs
export const packService = {
  getAll: () => api.get<{ data: any[] }>('/packs').then(res => res.data.data),
  getById: (id: string) => api.get<{ data: any }>(`/packs/${id}`).then(res => res.data.data),
  generate: () =>
    api.post<{ data: any[] }>('/packs/generate').then(res => res.data.data),
  update: (id: string, items: any[]) =>
    api.put<{ data: any }>(`/packs/${id}`, { items }).then(res => res.data.data)
}

// Reports
export const reportService = {
  getTotals: () =>
    api.get<{ data: ShoppingItem[] }>('/reports/totals').then(res => res.data.data),
  exportCSV: () =>
    api.get('/reports/csv', { responseType: 'blob' }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `lista-compra-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    })
}

export default api
