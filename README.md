# Hafenleitstelle

A configurable dashboard for the harbor control center (**Hafen-Cockpit**). Users arrange widgets via drag & drop.

## Domain & goals

This is business-process software with a small user base. Load-time performance is secondary to a richer, more complex use case. The approach is **prototype first, optimize later** — implement core requirements in an extensible, flexible way to discover full requirements early.

Data is sourced from **open APIs** only (may be subject to change).

## Architecture

### Code organization

The repo is structured as a **monorepo-ready workspace**:

| Path | Purpose |
|------|---------|
| `Hafenleitstelle/` (repo root) | Named after the business domain for easy identification |
| `UI-Anuglar/` | Angular workspace — all Angular apps and shared libraries |
| `UI-Anuglar/projects/hafen-cockpit/` | **Hafen-Cockpit** dashboard application |

`UI-Anuglar` is scoped to Angular frontends. Additional stacks (e.g. `UI-React`) or backends can be added as sibling folders later.


Further architecture notes, assumptions, and open questions live in [IMPLEMENTME.md](IMPLEMENTME.md).

### Open questions

- Full-screen display? Integration into an existing app?
- Write-capable widgets (POST/PUT)? Concurrency handling?
- On-premise deployment? Local WAN only? User authentication?
- Per-subfunction refresh and busy state within a single widget?
- Global “refresh all” action?

## Repository structure

```
Hafenleitstelle/
├── UI-Anuglar/                 # Angular workspace (apps and shared libs)
│   └── projects/
│       └── hafen-cockpit/      # Hafen-Cockpit dashboard
...															# Backends etc as Siblings of UI-Folders
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js; the workspace targets npm 10.x)

## Build and run (Hafen-Cockpit)

All Angular commands are run from the workspace root `UI-Anuglar/`.

### Install dependencies

```bash
cd UI-Anuglar
npm install
```

### Development server

```bash
npm start
```

This runs `ng serve` for **Hafen-Cockpit**. Open [http://localhost:4200](http://localhost:4200). The app reloads on source changes.

Explicit project name:

```bash
npx ng serve Hafen-Cockpit
```

### Production build

```bash
npm run build
```

Output: `UI-Anuglar/dist/hafen-cockpit/`

Development build with source maps:

```bash
npx ng build Hafen-Cockpit --configuration development
```

### Unit tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev/) via the Angular CLI.

## Tech stack

- **Angular** 21 (standalone components, signals)
- **TypeScript** 5.9
- **SCSS** for styling
- **Vitest** for unit tests

## License

MIT — see [LICENSE](LICENSE).

--- AI generated, reviewed by human ---
