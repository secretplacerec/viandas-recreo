# 📦 Viandas Recreo - Gestor de Packs

App para capturar qué snacks le gustaría comer a tu hijo en los recreos de la escuela, armar automáticamente 3 packs variados por día (para todo el mes), y calcular los gramos totales para hacer compra al por mayor.

## Características

- ✅ **Gestión de Productos**: Agrega hasta 60 productos diferentes con peso/cantidad estándar
- 🎲 **Generación Automática**: Crea 60 packs (20 días × 3 recreos) distribuyendo los productos
- 📅 **Vista de Calendario**: Organiza los packs por semana y día
- ✏️ **Edición de Packs**: Modifica los packs generados automáticamente
- 🛒 **Lista de Compra**: Calcula gramos/unidades totales por producto
- 📥 **Exportar CSV**: Descarga la lista de compra en CSV

## Stack Tecnológico

### Frontend
- **React 18** + TypeScript
- **Vite** para desarrollo rápido
- **TailwindCSS** para estilos
- **Axios** para llamadas API
- **Responsive Design** (funciona en desktop y mobile)

### Backend
- **Node.js** + Express
- **TypeScript**
- **Prisma ORM** con SQLite
- **CORS** para conectar frontend y backend

### Base de Datos
- **SQLite** (simple, sin configuración)

## Instalación y Uso

### 1. Instalar dependencias (ambos)

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Inicializar base de datos (backend)

```bash
# En la carpeta backend/
npm run prisma:migrate
```

### 3. Ejecutar en desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Corre en http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Abre http://localhost:5173
```

### 4. Build para producción

```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
npm run build
npm run start
```

## Cómo usar la app

### Paso 1: Agregar Productos
1. Ve a la pestaña **"Productos"**
2. Haz click en **"+ Agregar Producto"**
3. Completa:
   - Nombre del producto (Ej: "Manzana")
   - Unidad de medida ("gramos", "unidades", "ml")
   - Peso/cantidad por unidad (Ej: para una manzana → 150)
4. Agrega hasta 60 productos diferentes

### Paso 2: Generar Packs
1. Ve a **"Generar Packs"**
2. Haz click en **"🎲 Generar Packs para el Mes"**
3. Se crearán automáticamente 60 packs (20 días × 3 recreos)
4. Cada pack tendrá 3 productos diferentes distribuidos de forma variada

### Paso 3: Editar Packs (Opcional)
1. Ve a **"Calendario"**
2. Haz click en cualquier pack para editarlo
3. Agrega/quita productos del pack
4. Guarda los cambios

### Paso 4: Ver Lista de Compra
1. Ve a **"Lista de Compra"**
2. Verás el total de gramos/unidades de cada producto
3. Puedes **exportar a CSV** o **imprimir**

## Estructura del Proyecto

```
viandas-recreo/
├── frontend/                    # App web con React
│   ├── src/
│   │   ├── pages/              # ProductsPage, PacksPage, CalendarPage, ReportPage
│   │   ├── components/         # ProductForm, PackEditor
│   │   ├── services/           # api.ts (cliente Axios)
│   │   ├── types/              # Definiciones de tipos TypeScript
│   │   ├── utils/              # packGenerator, calculations
│   │   ├── App.tsx             # Router simple
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                     # API REST con Express
│   ├── src/
│   │   ├── routes/             # products.ts, packs.ts, reports.ts
│   │   ├── services/           # productService, packService, reportService
│   │   ├── lib/                # prisma.ts
│   │   └── server.ts           # Servidor Express
│   ├── prisma/
│   │   ├── schema.prisma       # Definición de modelos
│   │   ├── dev.db              # Base de datos SQLite
│   │   └── migrations/         # Migraciones automáticas
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                    # Configuración (DATABASE_URL, PORT)
└── README.md
```

## API Endpoints

### Productos
- `GET /api/products` - Listar todos
- `POST /api/products` - Crear
- `PUT /api/products/:id` - Actualizar
- `DELETE /api/products/:id` - Eliminar

### Packs
- `GET /api/packs` - Listar todos con items
- `GET /api/packs/:id` - Obtener uno
- `POST /api/packs/generate` - Generar 60 packs automáticamente
- `PUT /api/packs/:id` - Actualizar items del pack

### Reportes
- `GET /api/reports/totals` - Obtener lista de compra consolidada
- `GET /api/reports/csv` - Descargar CSV

## Persistencia de Datos

Los datos se guardan en **SQLite** en `backend/prisma/dev.db`:
- Productos con nombre, unidad y peso
- 60 packs distribuidos por día/semana
- Items de cada pack con productos y cantidades

✅ Los datos persisten incluso si reinician el servidor.

## Características Implementadas

- ✅ Backend con API REST
- ✅ Base de datos SQLite con Prisma
- ✅ Generación automática de 60 packs
- ✅ Edición flexible de packs
- ✅ Cálculo de totales en gramos/unidades
- ✅ Exportación a CSV
- ✅ Interfaz web responsive

## Características Futuras

- [ ] Exportar a PDF con diseño
- [ ] Soporte para múltiples hijos
- [ ] Historial de compras anteriores
- [ ] Sugerencias de cantidad a comprar (ej: "1 bolsa de 1kg")
- [ ] Análisis de gastos por mes
- [ ] API key para proteger endpoints
- [ ] Autenticación de usuarios

## Licencia

MIT
