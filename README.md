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
- **Responsive Design** (funciona en desktop y mobile)

### Almacenamiento
- **LocalStorage** para persistencia de datos en el navegador

## Instalación y Uso

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
```

La app abrirá en `http://localhost:5173`

### 3. Build para producción

```bash
npm run build
npm run preview
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
├── frontend/
│   ├── src/
│   │   ├── pages/           # Páginas principales
│   │   ├── components/      # Componentes reutilizables
│   │   ├── types/           # Tipos TypeScript
│   │   ├── utils/           # Funciones de lógica
│   │   ├── App.tsx          # Componente principal
│   │   └── main.tsx         # Punto de entrada
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Datos Guardados

Todos los datos se guardan automáticamente en **localStorage** del navegador:
- `products`: Lista de productos
- `packs`: Packs generados

⚠️ Si limpias el localStorage o cambias de navegador, perderás los datos. Exporta a CSV para hacer backup.

## Características Futuras

- [ ] Backend con API REST
- [ ] Base de datos SQLite
- [ ] Exportar a PDF
- [ ] Soporte para múltiples hijos
- [ ] Historial de compras
- [ ] Sugerencias de cantidad a comprar

## Licencia

MIT
