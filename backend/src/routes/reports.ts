import { Router } from 'express'
import * as reportService from '../services/reportService.js'

const router = Router()

// GET shopping list totals
router.get('/totals', async (req, res) => {
  try {
    const totals = await reportService.calculateTotals()
    res.json({
      success: true,
      data: totals,
      count: totals.length
    })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

// GET shopping list as CSV
router.get('/csv', async (req, res) => {
  try {
    const csv = await reportService.getShoppingListCSV()
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="lista-compra.csv"')
    res.send(csv)
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router
