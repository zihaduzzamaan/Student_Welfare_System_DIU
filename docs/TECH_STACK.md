# DIU Student Welfare System — Tech Stack Documentation

## Stack Decision Matrix

| Layer | Chosen Technology | Alternatives Considered | Why This Won |
|---|---|---|---|
| **Build Tool** | Vite 6 | Webpack 5, Turbopack | Sub-100ms HMR, native ESM, Go-powered esbuild, zero-config |
| **UI Framework** | React 19 (Compiler) | Solid.js, Svelte 5 | Auto-memoization, massive ecosystem, industry hiring standard |
| **Language** | TypeScript 5.x | JavaScript | Compile-time type safety, better DX, fewer runtime bugs |
| **Routing** | React Router v7 | TanStack Router | Mature, well-documented, nested layouts, lazy loading |
| **Styling** | Vanilla CSS + CSS Modules | Tailwind CSS, Styled Components | Zero runtime overhead, full design control, university branding |
| **Icons** | Lucide React | Heroicons, FontAwesome | Tree-shakeable, lightweight, consistent design language |
| **State (Phase 2)** | Zustand | Redux, Jotai | Minimal boilerplate, tiny bundle (1KB), intuitive API |
| **Server State (Phase 2)** | TanStack Query v5 | SWR, Apollo | Optimistic updates, caching, background revalidation |
| **Backend (Phase 2)** | Supabase | Firebase, Custom Express | PostgreSQL ACID, native RLS, free tier, auto-generated API |
| **Auth (Phase 2)** | Supabase Auth | Auth0, Firebase Auth | Integrated with Supabase, email + OAuth, JWT-based |

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│  ┌─────────────────────────────────────────────┐ │
│  │         React 19 (Compiler) + TSX           │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  Pages   │  │Components│  │  Hooks   │  │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  │ │
│  │       │              │              │        │ │
│  │  ┌────▼──────────────▼──────────────▼────┐  │ │
│  │  │        React Router v7 (Lazy)         │  │ │
│  │  └────────────────┬──────────────────────┘  │ │
│  │                   │                          │ │
│  │  ┌────────────────▼──────────────────────┐  │ │
│  │  │     CSS Modules + Design Tokens       │  │ │
│  │  └───────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────┘ │
│                      │ Phase 2                    │
│                      ▼                            │
│  ┌─────────────────────────────────────────────┐ │
│  │          Supabase Client SDK                │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │   Auth   │  │ PostgRES │  │ Realtime │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  │ │
│  └─────────────────────┬───────────────────────┘ │
└────────────────────────┼─────────────────────────┘
                         │ HTTPS
                         ▼
              ┌──────────────────┐
              │  Supabase Cloud  │
              │  ┌────────────┐  │
              │  │ PostgreSQL │  │
              │  │  + RLS     │  │
              │  └────────────┘  │
              └──────────────────┘
```

## Development Dependencies

| Package | Purpose |
|---|---|
| `vite` | Build tool and dev server |
| `@vitejs/plugin-react` | React Fast Refresh + Compiler |
| `typescript` | Type checking |
| `react` + `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `lucide-react` | Icon library |

## Dev Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server (default: http://localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npx tsc --noEmit` | Type-check without emitting files |

## Browser Support
- Chrome 90+ (primary)
- Firefox 90+
- Safari 15+
- Edge 90+
- Mobile Chrome & Safari (responsive layout)
