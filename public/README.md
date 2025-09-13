# Trans Bot AI — Public Website Content Package

**Status:** 100% content-complete • **Date:** 2025-09-02

This package contains:

- Markdown page content for **58 pages** (Home + 57 subpages)
- A **Style Guide** (Tailwind tokens, typography, components, animations)
- A **Navigation Map** (`nav.json`) for routing scaffolding
- **Deployment Instructions** for a React + Vite + Tailwind implementation

## Quick Start (Developers)

1. Scaffold a React + Vite project (TS).
2. Install Tailwind and copy the provided `tailwind.config.cjs` and `src/index.css` tokens into your project.
3. Use `nav.json` to generate routes and menus.
4. Render Markdown files from `/content` to the site pages (e.g., mdx loader or a simple MD renderer).
5. Follow `/deployment/instructions.md` to push to production.

---

## Folder Structure

```
transbot_public_site_package/
├─ README.md
├─ nav.json
├─ content/
│  ├─ home.md
│  ├─ solutions/ (15 files)
│  ├─ product/ (12 files)
│  ├─ pricing/ (4 files)
│  ├─ resources/ (18 files)
│  └─ company/ (8 files)
├─ style-guide/
│  ├─ tailwind.config.cjs
│  ├─ components.md
│  └─ src/
│     └─ index.css
└─ deployment/
   └─ instructions.md
```
