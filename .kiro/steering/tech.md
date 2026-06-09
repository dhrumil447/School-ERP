# Tech Stack

## Build System
- **Vite** with `@vitejs/plugin-react`
- Dev server runs on port `5173` with `--host 0.0.0.0`
- Build output: `dist/`, minified with Terser, no sourcemaps in production

## Core Framework
- **React 18** with JSX (`.jsx` files throughout)
- **React Router DOM v6** – `createBrowserRouter` with nested routes and `<Outlet />`

## UI Libraries
- **MUI (Material UI v5)** – primary component library for layout, AppBar, Drawer, DataGrid, dialogs, icons
- **Tailwind CSS v3** – utility classes used alongside MUI, configured with CSS variable-based color tokens
- **Framer Motion** – available for animations
- **Recharts** – charts and data visualizations
- **Lucide React** – icon set (used in some components alongside MUI icons)

## Styling Approach
Dual-layer styling: MUI components styled via `sx` prop and theme overrides + Tailwind utilities for custom components.
- CSS variables define the color system (e.g. `hsl(var(--primary))`) in `index.css`
- `cn()` utility from `src/lib.js` merges Tailwind classes (`clsx` + `tailwind-merge`)
- Dark mode via Tailwind `darkMode: ['class']` and MUI `ThemeProvider` with separate light/dark theme objects
- Primary brand color: Indigo `#4F46E5` / Violet `#7C3AED`
- Base font: **Inter**
- Border radius convention: `rounded-2xl` (16px), `rounded-3xl` (24px)

## Forms
- **React Hook Form** – used for form state and validation

## Common Commands

```bash
# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

No test runner is configured.
