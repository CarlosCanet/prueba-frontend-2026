# Copilot Instructions for Diga Frontend Test

## Project Context
This is a React 19 + TypeScript + Tailwind CSS 4 implementation of a dashboard for Diga's frontend technical test. The project is based on the "Untitled UI" design system.

## Architecture & Structure
- **Framework**: React 19 with Vite.
- **Routing**: `react-router` v7. Note the integration with `react-aria` via `RouteProvider` in `src/providers/router-provider.tsx`.
- **Styling**: Tailwind CSS v4. Custom fonts/typography defined in CSS variables (`src/styles/`).
- **Path Alias**: Use `@/` which maps to `./src/`.

### Directory Structure
- `src/components/base`: Core UI components (Buttons, Inputs, etc.) - prefer reusing these over creating new ones.
- `src/components/foundations`: Atomic design elements (Icons, Badges).
- `src/components/application`: Higher-level feature components.
- `src/pages`: Page-level components.
- `src/providers`: Context providers (Theme, Router).

## Essential Workflows

### 1. API & Data Fetching
- **Proxy**: Dev server proxies `/api` to `https://api.diga.io`.
- **Auth**: Authenticated endpoints require a `Bearer <API_KEY>` header.
- **Fetching**: Use standard `fetch` or a lightweight hook. *Do not* hardcode absolute URLs; use the `/api` relative path.
- **State**: The "Project Selector" requirement suggests a global state (Context or simple state lift) is needed to manage the active API Key across pages.

### 2. Styling Patterns
- Use Tailwind classes.
- Typography classes like `text-header-3` are defined in the project's CSS/Tailwind configuration. Check `src/styles/typography.css` if unsure.
- Use `cx` utility (from `@/utils/cx`) for conditional class merging.

## Coding Conventions

### Refactoring & Best Practices
- **Strict Typing**: Avoid `any`. Define interfaces for API responses.
- **Effects**: Properly manage `useEffect` dependencies. Avoid "fire and forget" fetches inside components without cleanup or loading states.
- **Component Reusability**: Check `src/components/base` before building common UI elements (e.g., Progress bars, Buttons).

### React 19 Features
- The project allows React 19 features.

## Specific Task Instructions
- **Project Selector**: Needs to switch api keys globally.
- **Sidebar**: Should have "Suscripción" and "Registro de llamadas" (with active state styling).
- **Subscription Page Refactor**: Convert `src/pages/subscription.tsx` from its current low-quality state (hardcoded keys, `any` types, bad effects) to a production-ready component.
- **Call Log**: Implement pagination/limiting (first 20 calls).

## Common Commands
- `pnpm dev`: Start dev server (includes proxy).
- `pnpm build`: Production build.
