import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'
import packsRouter from './routes/packs.js'
import reportsRouter from './routes/reports.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/products', productsRouter)
app.use('/api/packs', packsRouter)
app.use('/api/reports', reportsRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📚 API endpoints:`)
  console.log(`  GET    /api/products`)
  console.log(`  POST   /api/products`)
  console.log(`  DELETE /api/products/:id`)
  console.log(`  GET    /api/packs`)
  console.log(`  POST   /api/packs/generate`)
  console.log(`  PUT    /api/packs/:id`)
  console.log(`  GET    /api/reports/totals`)
})
