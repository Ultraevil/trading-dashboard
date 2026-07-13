# Trading Dashboard

A widget-based trading dashboard: drag/resize grid layout, a live price feed
over a websocket, GraphQL-backed auth and layout persistence via RTK Query,
light/dark theming, and a small plugin-style widget system.

## Running it

```bash
npm install
cp .env.example .env   # fill in VITE_GRAPHQL_URL / VITE_WS_URL / VITE_*_SYMBOL
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

- **Jest + React Testing Library** — 80 tests across hooks (`useTrend`,
  `useValueHistory`, `useMarketPrice`), shared UI (`Button`, `Input`,
  `Select`, `WidgetContainer`, `ConfirmDialog`), forms (`LoginForm`,
  `AlertForm` — validation, create/edit, and server-error surfacing), a
  widget (`StatsWidget`), the price-alert notification listener
  (`useAlertNotifications`), the alert list's toggle/edit/delete flow
  (`AlertListItem`), and the two Redux slices whose cross-slice sync is
  the trickiest bit of dashboard state (`widgetsSlice` / `dashboardSlice`).
  External dependencies (the login mutation, the market websocket) are
  mocked at the module boundary rather than hitting the network, so these
  run fast and deterministically.
  `src/test/` holds the shared `renderWithProviders` helper (wraps
  Redux/Theme/i18n/Router), a `createTestStore` factory so each test
  gets an isolated store, and `src/test/i18n.ts` (a fixed-English `t()`).
  Since the app is internationalized, tests assert against **translation
  keys via `t()`**, not hardcoded copy — e.g.
  `screen.getByText(t('auth.errors.emailRequired'))` rather than
  `screen.getByText('Email is required')` — so editing a translation
  string doesn't break a test that has nothing to do with wording.
- **Playwright** — `e2e/dashboard.spec.ts` (desktop project) drives a real
  browser against the running app: default widgets load, removing/re-adding
  widgets works, removing all of them shows the empty state, sidebar
  navigation between Dashboard/Analytics/Settings works, and the header
  language toggle actually re-renders the UI in Ukrainian. Like the Jest
  suite, assertions use translation keys — `e2e/i18n.ts` sets up a
  standalone i18next instance (reading the same locale JSON, without the
  browser-only language detector the app itself uses) and exports `t`/`tUk`.
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
  translation _keys_, translated at render time, so switching languages
  re-translates errors that are already on screen.
- **React Hook Form + Yup** (`@hookform/resolvers`) for form state and
  validation — `LoginForm` and `AlertForm` use a schema
  (`*.schema.ts`) instead of hand-rolled `useState`/regex checks, with
  field errors wired through `aria-invalid`/`aria-describedby` on the
  shared `Input`/`Select` components.
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
  Both the Brent Crude futures feed and BTC/USDT go through this same
  channel; which exact symbols to subscribe to (`VITE_BRENT_SYMBOL`,
  `VITE_BTC_SYMBOL`) come straight from env vars and must match the
  backend's own `BRENT_SYMBOL`/`BTC_SYMBOL` — the socket re-authenticates
  (`updateAuthToken()`) on login/logout so subscriptions immediately
  reflect the current session.
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
├── pages/          the four routed pages (Dashboard/Analytics/Alerts/
│                   Settings)
├── features/       one folder per domain slice: auth, dashboard (grid
│                   layout only), widgets (which widgets are active, the
│                   type registry, and the widget components themselves —
│                   PriceWidget/ChartWidget/StatsWidget — under
│                   widgets/components/), market (live prices + socket
│                   status), alerts (CRUD hooks + form/list components for
│                   price alerts), ui (sidebar collapse, toasts, alert
│                   sound preference), theme
├── services/       data layer: RTK Query endpoints (api/), GraphQL
│                   transport (graphql/), websocket client (websocket/)
├── shared/         ui/ (Button, Input, Select, Toast, ConfirmDialog,
│                   WidgetContainer — generic, reusable, no feature
│                   imports), hooks/ (useTrend, useValueHistory), lib/
│                   (playAlertSound), i18n/ (en/uk translation resources +
│                   i18next config)
└── styles/         theme tokens + global styles
```

Unit/component tests live next to the code they cover as `*.test.ts(x)`
(e.g. `Button.test.tsx` beside `Button.tsx`); `src/test/` holds shared test
infrastructure. Playwright specs live in `e2e/` at the project root, since
they test the running app rather than a single module.

**State separation:** `features/widgets` owns _which_ widgets are on the
board; `features/dashboard` owns _where_ they sit on the grid. They stay in
sync via `dashboardSlice`'s `extraReducers` listening to `widgetsSlice`'s
`addWidget`/`removeWidget` actions, rather than one slice owning both
concerns. Each is persisted to its own `localStorage` key independently.

**Live data:** `useMarketPrice(symbol)` subscribes to the websocket and
writes into the `market` slice (single source of truth), so `PriceWidget`,
`ChartWidget`, and `StatsWidget` can all watch a symbol
(`import.meta.env.VITE_BTC_SYMBOL`, `VITE_BRENT_SYMBOL`) without each
holding its own copy or opening its own subscription. Brent Crude used to
be fetched via a GraphQL query against a REST-backed price provider; it's
now the same push-based websocket feed as everything else, since that's
what actually reflects the TradingView futures price the widget is meant
to show.

**Price alerts:** CRUD goes through `services/api/alertsApi.ts`, injected
into the same `baseApi`. Unlike the other endpoints, these use `queryFn`
(not `query` + `transformResponse`) so a GraphQL business error — invalid
input, "Alert not found" — surfaces as a real RTK Query error instead of
crashing on a `null` response; `services/graphql/client.ts` exports a
small `runGraphQL`/`getGraphQLErrorMessage` pair for this, reused by both
`AlertForm` (inline field/form error) and `AlertListItem` (error toast).
Toggle/delete apply an optimistic update to the cache (`onQueryStarted` +
`patchResult.undo()` on failure) so those feel instant. The triggered-alert
notification itself doesn't live on the alerts page: `MarketSocket` gained
a second event listener (`onPriceAlert`, alongside the existing
`onStatusChange`) for the backend's `price-alert` event — no new socket
connection — and `AlertNotificationsProvider` mounts
`useAlertNotifications()` once near the app root, so a toast (plus an
optional synthesized beep, see `shared/lib/playAlertSound.ts`) shows up
regardless of which page the user is on when an alert fires.

## UI/UX details worth noting

- Loading (skeletons), error (with retry), and empty states (no widgets on
  the board yet) are all handled explicitly, not just "happy path".
- Widgets get remove buttons via `WidgetContainer`; the sidebar widget list
  shows an active/inactive state per widget and is itself searchable.
- A small global toast system (`features/ui` + `shared/ui/Toast`) surfaces
  login success and triggered price alerts — a real notification system
  rather than one-off `alert`s.
- The sidebar shows a live badge next to "Alerts" with the count of
  currently-enabled alerts, and deleting one goes through a proper
  `ConfirmDialog` (Escape/backdrop-to-cancel) rather than `window.confirm`.
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
