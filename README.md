# PWA Trabajo Integrador

## Stack

- **Runtime**: Bun
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix Vega style)
- **Icons**: Lucide React
- **Code quality**: ESLint + React Compiler

---

## Primeros pasos

### Instalación

```bash
# Si no tenés bun instalado
curl -fsSL https://bun.sh | bash

# Instalación de dependencias
bun install
```

### Desarrollo

```bash
bun run dev          # Inicia el servidor de desarrollo (localhost:5173)
bun run build        # Build de producción
bun run preview      # Preview del build de producción
bun run lint         # Linting con ESLint
bun run lint:fix     # Linting con auto-fix
```

###shadcn/ui CLI

```bash
# Agregar un componente
bunx shadcn add button
bunx shadcn add card dialog dropdown-menu

# Agregar múltiples componentes
bunx shadcn add button card dialog form input label select tabs toast

# Agregar con opciones
bunx shadcn add button -y                    # Skip confirmación
bunx shadcn add button --style default       # Cambiar estilo

# Help
bunx shadcn --help
```

---

## Estructura del proyecto

```
src/
├── components/
│   └── ui/           # Componentes shadcn (button, card, dialog, etc.)
├── lib/
│   └── utils.ts      # cn() helper para Tailwind
├── pages/            # Vistas/páginas de la app
├── App.tsx           # Componente principal
├── main.tsx         # Entry point
└── index.css        # Estilos globales + variables de shadcn
```

### Alias configurados (via tsconfig.app.json)

| Alias             | Ruta real               |
| ----------------- | ----------------------- |
| `@/`              | `src/`                  |
| `@/components`    | `src/components`        |
| `@/components/ui` | `src/components/ui`     |
| `@/lib`           | `src/lib`               |
| `@/hooks`         | `src/hooks` (si existe) |

---

## Componentes disponibles

Actualmente instalado:

- `src/components/ui/button.tsx`

Para agregar más:

```bash
# Ejemplo: agregar card, input, label
bunx shadcn add card input label

# Ejemplo: agregar todos los componentes comunes
bunx shadcn add button card dialog form input label select tabs toast avatar badge calendar card checkbox collapsible dropdown-menu hover-card navigation-menu popover progress scroll-area separator sheet skeleton switch table tabs textarea toast tooltip
```

---

## Trabajando con shadcn/ui

### Importar componentes

```tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
```

### cn() helper

Usá `cn()` para concatenar clases de Tailwind (igual a clsx + tailwind-merge):

```tsx
import { cn } from "@/lib/utils"

// Ejemplo
<Button className={cn(
  "w-full",
  isActive && "bg-primary"
)}>
```

### Personalización de estilos

Los estilos de shadcn/ui usan CSS variables en `src/index.css`. Podés modificar las variables en `:root` para cambiar colores, bordes, etc.

---

## Scripts disponibles

| Script                         | Descripción                             |
| ------------------------------ | --------------------------------------- |
| `bun run dev`                  | Servidor de desarrollo con HMR          |
| `bun run build`                | Build de producción (TypeScript + Vite) |
| `bun run preview`              | Preview del build de producción         |
| `bun run lint`                 | ESLint con reglas type-aware            |
| `bunx shadcn add [componente]` | Agregar componente shadcn               |

---

## Tips

- El proyecto usa **Tailwind CSS v4** (no v3) — la configuración es diferente
- El schema de shadcn está en `components.json`
- Las variables CSS se definen en `src/index.css`
- El proyecto tiene **React Compiler** habilitado (experimental)
- Para cambiar el puerto de desarrollo, creá un archivo `.env`:
  ```
  VITE_PORT=3000
  ```
