# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. ABIDE BY EVERYTHING IN rules.md.

## Build Commands

### Frontend (React + Vite)
```bash
# Navigate to frontend
cd biyu-boxing-frontend

# Install dependencies  
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## Architecture

### Frontend Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with DaisyUI components
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: React Router v6
- **HTTP Client**: Axios for API calls
- **Markdown**: React Markdown with GitHub Flavored Markdown support

### Project Structure
```
biyu-boxing-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── config/           # API configuration and environment setup
│   ├── hooks/            # Custom React hooks (e.g., useStrapiData)
│   ├── services/         # API service layer (Strapi integration)
│   └── types/            # TypeScript type definitions
```

### API Integration
- **CMS**: Strapi backend integration
- **Base URL**: Configured via `VITE_STRAPI_BASE_URL` environment variable
- **API Config**: Centralized in `src/config/api.ts` with endpoint definitions and query builders
- **Data Fetching**: React Query hooks with proper caching and error handling

### Key Development Rules (from rules.md)
1. Only implement exactly what is requested - ask before adding unrequested features
2. No dependency installation without consent - research compatibility first
3. Keep responses concise - focus on task completion status
4. Use intelligent but not excessive commenting
5. Enable and utilize logging for debugging
6. Analytical approach - no bandaid fixes, changes must make sense across codebase
7. Keep files under 500 lines - refactor when needed
8. Research official documentation before implementation
9. UI must follow 2025 award-winning web design standards
10. Keep SEO in mind for all page titles and metadata

### Type Safety
- Strict TypeScript configuration with separate configs for app and node
- Comprehensive type definitions for Strapi models in `src/types/`
- Type-safe API responses with proper error handling

### Development Workflow
1. Use React Query DevTools for debugging API calls (available in development)
2. Environment-based configuration for different deployment targets
3. Axios interceptors for request/response logging in development
4. Tailwind + DaisyUI for rapid UI development with consistent design system
