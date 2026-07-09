# Trading Dashboard

A widget-based trading dashboard: drag/resize grid layout, a live price feed
over a websocket, GraphQL-backed auth and layout persistence via RTK Query,
light/dark theming, and a small plugin-style widget system.

## Running it

```bash
npm install
cp .env.example .env   # fill in VITE_GRAPHQL_URL / VITE_WS_URL
npm run dev
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`.

## Live Demo

Demo Video:
https://www.loom.com/share/fe505548ca1d47fd9c74219be3d7a468

## Testing

```bash
npm test              # Jest + React Testing Library (unit/component/hook)
npm run test:watch    # same, in watch mode
npx playwright install chromium   # one-time browser download
npm run test:e2e      # Playwright E2E (starts the dev server automatically)
```

- **Jest + React Testing Library** — 45 tests across hooks (`useTrend`,
  `useValueHistory`, `useMarketPrice`), shared UI (`Button`, `Input`,
  `WidgetContainer`), a form (`LoginForm`, covering validation and
  submit/error flows), a widget (`StatsWidget`), and the two Redux slices
  whose cross-slice sync is the trickiest bit of state in the app
  (`widgetsSlice` / `dashboardSlice`). External dependencies (the login
  mutation, the market websocket) are mocked at the module boundary rather
  than hitting the network, so these run fast and deterministically.
  `src/test/` holds the shared `renderWithProviders` helper (wraps
  Redux/Theme/i18n/Router) and a `createTestStore` factory so each test
  gets an isolated store.
- **Playwright** — `e2e/dashboard.spec.ts` (desktop project) drives a real
  browser against the running app: default widgets load, removing/re-adding
  widgets works, removing all of them shows the empty state, sidebar
  navigation between Dashboard/Analytics/Settings works, and the header
  language toggle actually re-renders the UI in Ukrainian.
  `e2e/mobile.spec.ts` runs under a separate `mobile-chromium` project
  (iPhone 13 viewport) and checks the off-canvas drawer specifically:
  closed by default, opened by the hamburger, closed again by tapping the
  backdrop. These exercise client-side behavior only, so they don't
  require the GraphQL/websocket backend to be running.

## Tech choices

- **React 19 + TypeScript + Vite**.
- **Redux Toolkit** for both client state (auth, widgets, dashboard layout,
  UI, theme) and server state (RTK Query, injected per-domain into a single
  `baseApi`). One library instead of RTK + a separate server-state library,
  since RTK Query already gives caching/invalidation/loading flags.
- **i18next + react-i18next** for internationalization — English and
  Ukrainian, with every user-facing string moved into
  `shared/i18n/locales/{en,uk}/translation.json`. Language is auto-detected
  from the browser, persisted to `localStorage`, and switchable from the
  header icon or the Settings page. Yup's validation messages are
  translation *keys*, translated at render time, so switching languages
  re-translates errors that are already on screen.
- **React Hook Form + Yup** (`@hookform/resolvers`) for form state and
  validation — `LoginForm` uses a schema (`LoginForm.schema.ts`) instead of
  hand-rolled `useState`/regex checks, with field errors wired through
  `aria-invalid`/`aria-describedby` on the shared `Input` component.
- **Emotion (`@emotion/styled` + `@emotion/react`)** for styling. Every
  component has a sibling `*.styles.ts` file — no inline styles, no
  CSS-in-JSX. A shared `styles/theme.ts` defines the design tokens (colors,
  spacing, radii, typography), with a `dark`/`light` variant and a
  `getTheme(mode)` helper; `ThemeProvider` is wired to the `theme` redux
  slice so the whole app reacts to the toggle in the header.
- **react-grid-layout** for the drag/drop/resize dashboard grid, with
  responsive breakpoints (`lg`/`md`/`sm`).
- **react-router-dom** for `Dashboard` / `Analytics` / `Settings` routes,
  all rendered inside a single `MainLayout` shell via `<Outlet />`.
- **socket.io-client** for the live price feed (`services/websocket`),
  wrapped in a small class that tracks connection status and lets multiple
  widgets subscribe to the same symbol without opening multiple sockets.
- A hand-written GraphQL layer: `services/graphql/client.ts` is a thin
  `fetch`-based RTK Query `baseQuery` (handles the `Bearer` token and
  silently retries once after refreshing on a 401), with query/mutation
  strings extracted into `services/graphql/{queries,mutations}`.

## Architecture

```
src/
├── app/            store, typed hooks, providers (Redux/Apollo/Router)
├── routes/         route paths + <Routes> config
├── layout/         MainLayout shell (Header/Sidebar/BottomPanel) and the
│                   DashboardGrid
├── pages/          the three routed pages
├── features/       one folder per domain slice: auth, dashboard (grid
│                   layout only), widgets (which widgets are active, the
│                   type registry, and the widget components themselves —
│                   PriceWidget/ChartWidget/StatsWidget — under
│                   widgets/components/), market (live prices + socket
│                   status), ui (sidebar collapse, toasts), theme
├── services/       data layer: RTK Query endpoints (api/), GraphQL
│                   transport (graphql/), websocket client (websocket/)
├── shared/         ui/ (Button, Input, Toast, WidgetContainer — generic,
│                   reusable, no feature imports), hooks/ (useTrend,
│                   useValueHistory), i18n/ (en/uk translation resources +
│                   i18next config)
└── styles/         theme tokens + global styles
```

Unit/component tests live next to the code they cover as `*.test.ts(x)`
(e.g. `Button.test.tsx` beside `Button.tsx`); `src/test/` holds shared test
infrastructure. Playwright specs live in `e2e/` at the project root, since
they test the running app rather than a single module.

**State separation:** `features/widgets` owns *which* widgets are on the
board; `features/dashboard` owns *where* they sit on the grid. They stay in
sync via `dashboardSlice`'s `extraReducers` listening to `widgetsSlice`'s
`addWidget`/`removeWidget` actions, rather than one slice owning both
concerns. Each is persisted to its own `localStorage` key independently.

**Live data:** `useMarketPrice(symbol)` subscribes to the websocket and
writes into the `market` slice (single source of truth), so `PriceWidget`,
`ChartWidget`, and `StatsWidget` can all watch `BTCUSDT` without each
holding its own copy or opening its own subscription.

## UI/UX details worth noting

- Loading (skeletons), error (with retry), and empty states (no widgets on
  the board yet) are all handled explicitly, not just "happy path".
- Widgets get remove buttons via `WidgetContainer`; the sidebar widget list
  shows an active/inactive state per widget and is itself searchable.
- A small global toast system (`features/ui` + `shared/ui/Toast`) surfaces
  login success — a real notification system rather than one-off `alert`s.
- Responsive: three tiers, not just a single breakpoint —
  - **Desktop**: sidebar toggles between full width and a 72px icon rail.
  - **Tablet** (≤900px): sidebar becomes a horizontal strip stacked above
    the content.
  - **Mobile** (≤600px): sidebar becomes a fixed off-canvas drawer with a
    tap-to-close backdrop, opened via the header's hamburger button and
    closed by default on first load (detected via `matchMedia` at
    startup); the header hides secondary text (brand name, account email)
    down to icons only; the bottom status bar shrinks to a single line;
    and the dashboard grid switches to genuinely different column counts
    per breakpoint (3 → 2 → 1) with a shorter row height on phones —
    previously `sm`/`md` both silently used 3 columns with no matching
    react-grid-layout breakpoint below 768px, so anything narrower than a
    tablet never got a defined layout.
- Accessibility: labelled form fields with `aria-invalid`/`aria-describedby`
  wiring, `aria-pressed` on toggle buttons, `role="status"`/`aria-live` on
  toasts, focus-visible outlines, keyboard-reachable nav.
