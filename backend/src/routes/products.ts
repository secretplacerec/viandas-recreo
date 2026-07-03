import { Router } from 'express'
import * as productService from '../services/productService.js'

const router = Router()

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts()
    res.json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' })
    }
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

// POST create product
router.post('/', async (req, res) => {
  try {
    const { name, unitType, weight } = req.body

    if (!name || !unitType || weight === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: name, unitType, weight'
      })
    }

    const product = await productService.createProduct({
      name: name.trim(),
      unitType,
      weight: parseFloat(weight)
    })

    res.status(201).json({ success: true, data: product })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un producto con ese nombre'
      })
    }
    res.status(500).json({ success: false, error: String(error) })
  }
})

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const { name, unitType, weight } = req.body
    const product = await productService.updateProduct(req.params.id, {
      ...(name && { name: name.trim() }),
      unitType,
      weight: weight ? parseFloat(weight) : undefined
    })
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id)
    res.json({ success: true, data: product })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' })
    }
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router
