# Frontend Technical Test Instructions

## Project Overview
This is a technical test to build a Dashboard using **React 19**, **TypeScript**, and **Tailwind CSS**.
- **Goal**: Implement a sidebar navigation, a "Subscription" page (refactor existing), a "Call Log" page, and a global "Project Selector" to switch API keys.
- **Constraints**: 1-hour strict timeframe (simulated). Prioritize core functionality over perfection.
- **Design reference**: [Figma Link](https://www.figma.com/design/Nv7e6LVCWymsxPgsxRMa3v/Prueba-técnica---Frontend?node-id=1480-0&p=f&m=draw) (Use as visual guide).

## Tech Stack & Architecture
- **Framework**: Vite + React 19 + TypeScript.
- **Styling**: Tailwind CSS v4. Use utility classes. Avoid inline styles.
- **UI Library**: "Untitled UI" located in `@/components`. Reuse these components where possible.
  - **Sidebar**: Check `@/components/application/app-navigation/sidebar-navigation/` for pre-built layouts (e.g., `sidebar-simple.tsx`).
- **State Management**:
  - Create a **Context** (e.g., `ProjectContext`) to manage the selected Project/API Key globally.
  - The Sidebar's "Project Selector" must update this context.
  - Pages must react to context changes and re-fetch data automatically.
- **Routing**: React Router v7. Use a "Layout" component (rendering the Sidebar and `Outlet`) to wrap authenticated routes.

## Documentation Strategy
- **MCP Context7**: Leverage the `mcp_context7` tool for documentation.
  - **Untitled UI**: Query for usage patterns to ensure professional component implementation (accessibility, props, variants).
  - **General**: Use it to clarify React 19, Tailwind v4, and Router v7 features.

## Critical Workflows
- **Root Directory**: All commands must be run from the `code/` subdirectory.
- **Setup**: `cd code && pnpm install`
- **Development**: `cd code && pnpm dev`
- **API & Proxy**:
  - The backend is `https://api.diga.io`.
  - **CORS handling**: Vite is configured to proxy `http://localhost:5173/api/...` to `https://api.diga.io/...`.
  - **Usage**: Always fetch from `/api/v1/...` (do not hardcode the full `https://api.diga.io` URL in fetch calls).
  - **Auth**: Headers must include `Authorization: Bearer <SELECTED_API_KEY>`.

## Development Guidelines

### 1. Refactoring `subscription.tsx`
The existing file is intentionally flawed. Required fixes:
- **Type Safety**: Replace `any` with proper Interfaces matching the API response.
- **Data Fetching**: Move `fetch` logic to a custom hook or use `useEffect` correctly with dependency arrays (depend on the API Key).
- **Styling**: Replace inline `style={{ padding: ... }}` with Tailwind classes (e.g., `p-8`).
- **Variables**: Rename `s`, `l` to descriptive names (`subscription`, `isLoading`).
- **Dates**: Handling date math in JS is tricky; verify logic or use a small utility if needed.

### 2. New Features
- **Call Log Page**: Fetch from `/v1/call`. Limit to 20 items. Handle empty states.
- **Sidebar**: Implement active route highlighting.

### 3. Conventions
- **Imports**: Use the `@/` alias for `src/`.
- **Files**: Use `kebab-case` for filenames (e.g., `call-log.tsx`).
- **Components**: Functional components with typed props.
- **Error Handling**: Display user-friendly error messages if API calls fail.

## Common Issues
- **Infinite Loops**: Ensure `useEffect` has proper dependencies, especially when fetching data based on the API key context.
- **401 Errors**: Ensure the Bearer token is being sent correctly in the headers from the Context.
