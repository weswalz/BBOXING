# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production to ./dist/
npm run preview      # Preview production build locally
npm run astro ...    # Run Astro CLI commands
```

## Project Architecture

**Framework**: Astro with TypeScript (strict mode)
**Styling**: Tailwind CSS 4.x with DaisyUI components
**Structure**: Standard Astro project structure with:
- `src/pages/` - Routes and pages
- `src/layouts/` - Layout components 
- `src/components/` - Reusable Astro components
- `src/styles/` - Global styles with Tailwind imports
- `src/assets/` - Static assets

## Technology Stack

- **Astro 5.x**: Static site generator with component islands
- **Tailwind CSS 4.x**: Utility-first CSS framework via Vite plugin
- **DaisyUI**: Component library for Tailwind (dev dependency)
- **TypeScript**: Strict configuration extending Astro defaults
- **Vite**: Build tool with Tailwind integration

## Configuration

- Astro config uses Vite with Tailwind plugin (`@tailwindcss/vite`)
- Global styles in `src/styles/global.css` with `@import "tailwindcss"`
- TypeScript extends `astro/tsconfigs/strict`
- DaisyUI available as component library