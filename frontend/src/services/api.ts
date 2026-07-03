import axios from 'axios'
import { Product } from '../types'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products
export const productService = {
  getAll: () => api.get('/products').then(res => res.data.data || []),
  getById: (id: string) => api.get(`/products/${id}`).then(res => res.data.data),
  create: (data: Omit<Product, 'id' | 'createdAt'>) =>
    api.post('/products', data).then(res => res.data.data),
  update: (id: string, data: Partial<Product>) =>
    api.put(`/products/${id}`, data).then(res => res.data.data),
  delete: (id: string) =>
    api.delete(`/products/${id}`).then(res => res.data.data)
}

// Packs
export const packService = {
  getAll: () => api.get('/packs').then(res => res.data.data || []),
  getById: (id: string) => api.get(`/packs/${id}`).then(res => res.data.data),
  generate: () =>
    api.post('/packs/generate').then(res => res.data.data || []),
  update: (id: string, items: any[]) =>
    api.put(`/packs/${id}`, { items }).then(res => res.data.data)
}

// Reports
export const reportService = {
  getTotals: () =>
    api.get('/reports/totals').then(res => res.data.data || []),
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
