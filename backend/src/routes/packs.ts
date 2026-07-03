import { Router } from 'express'
import * as packService from '../services/packService.js'

const router = Router()

// GET all packs
router.get('/', async (req, res) => {
  try {
    const packs = await packService.getAllPacks()
    res.json({ success: true, data: packs })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

// GET single pack
router.get('/:id', async (req, res) => {
  try {
    const pack = await packService.getPackById(req.params.id)
    if (!pack) {
      return res.status(404).json({ success: false, error: 'Pack no encontrado' })
    }
    res.json({ success: true, data: pack })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

// POST generate packs for the month
router.post('/generate', async (req, res) => {
  try {
    const packs = await packService.generateMonthPacks()
    res.status(201).json({
      success: true,
      data: packs,
      message: `Se generaron ${packs.length} packs exitosamente`
    })
  } catch (error) {
    res.status(400).json({ success: false, error: String(error) })
  }
})

// PUT update pack items
router.put('/:id', async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'items debe ser un array'
      })
    }

    const pack = await packService.updatePackItems(req.params.id, items)
    res.json({ success: true, data: pack })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Pack no encontrado' })
    }
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router
