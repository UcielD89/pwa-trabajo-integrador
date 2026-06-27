# PWA Trabajo Integrador

Aplicación web progresiva (PWA) de catálogo y carrito de compras. Frontend en React con TypeScript y backend en Node.js + Express con base de datos MariaDB.

## Características

- Catálogo de productos con vista de grilla y página de detalle
- Carrito de compras con control de cantidad (drawer + context API)
- Cliente HTTP con Axios y validación de esquemas
- Diseño responsive con Tailwind CSS v4 y shadcn/ui
- Routing SPA con React Router
- API REST en Express conectada a MariaDB
- Estructura por capas en backend (routes → controllers → services → repositories)

## Stack

### Frontend

| Capa | Tecnología |
| --- | --- |
| Runtime | Bun |
| Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Estilos | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Routing | React Router 7 |
| HTTP | Axios |
| Iconos | Lucide React |
| Validación | Zod |
| Linting | ESLint + React Compiler |

### Backend

| Capa | Tecnología |
| --- | --- |
| Runtime | Node.js |
| Framework | Express 4 |
| Base de datos | MariaDB |
| Middleware | cors, dotenv |

## Estructura del proyecto

### `frontend/`

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/                      # Componentes shadcn (button, card, dialog, etc.)
│   │   ├── Loading/                 # Loader component + estilos
│   │   ├── CartDrawer.tsx
│   │   └── Navbar.tsx
│   ├── config/
│   │   └── axios.config.ts          # Cliente Axios configurado
│   ├── context/
│   │   └── CartContext.tsx          # Estado global del carrito
│   ├── hooks/
│   │   └── useCart.hook.ts
│   ├── lib/
│   │   └── utils.ts                 # cn() helper para Tailwind
│   ├── pages/
│   │   └── products/
│   │       ├── ProductsPage.tsx
│   │       ├── ProductsDetailPage.tsx
│   │       ├── components/          # ProductCard, ProductGrid, QuantityStepper, etc.
│   │       ├── hooks/               # useProducto, useProductos
│   │       ├── schemas/             # product.schema.ts (Zod)
│   │       ├── services/            # product.service.ts
│   │       └── utils/               # formatPrecio.ts
│   ├── types/
│   │   └── card.type.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                    # Estilos globales + variables de shadcn
├── components.json                  # Configuración shadcn/ui
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### `backend/`

```
backend/
└── src/
    ├── config/
    │   └── database.js              # Conexión a MariaDB
    ├── controllers/
    │   └── productosController.js
    ├── repositories/
    │   └── productosRepository.js   # Acceso a datos
    ├── routes/
    │   └── productosRoutes.js
    ├── services/
    │   └── productosService.js      # Lógica de negocio
    └── index.js                     # Entry point del servidor
```

## Cómo correr el proyecto

### Frontend

```bash
cd frontend
bun install
bun run dev          # http://localhost:5173
```

### Backend

```bash
cd backend
npm install
npm run dev          # http://localhost:3000 (configurable vía .env)
```

Configurá las variables de entorno copiando `.env.example` a `.env` en cada proyecto.

## Integrantes

- **Uciel Daro**
- **Franco Corbalan**