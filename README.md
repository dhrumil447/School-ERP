# Elevate School ERP Frontend

A modern React + Vite + Tailwind CSS client-demo frontend for a premium School ERP & Management System.

## Run locally

```bash
npm install
npm run doctor
npm run dev
```

## Fixing Rollup native binding install errors

If a previous install used a newer Vite/Rollup pair and `npm run dev` fails with `Cannot find module @rollup/rollup-linux-x64-gnu`, clean the stale install artifacts and reinstall from this pinned dependency set:

```bash
npm run reset:deps
npm install
npm run doctor
npm run dev
```

This project pins Vite to the Rollup 3 based release line to avoid the Rollup 4 optional native binding issue that can appear in some Codespaces/npm installs.

The `dev`, `build`, and `preview` scripts run the same dependency check automatically before Vite starts, so stale installs fail with a clear fix instead of the Rollup/Rolldown native binding stack trace.
