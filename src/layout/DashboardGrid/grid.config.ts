/**
 * react-grid-layout's <Responsive> picks a breakpoint key by matching the
 * container width against these thresholds (widest-matching-first), then
 * looks up `cols`/`layouts` for that same key. Without an explicit
 * `breakpoints` prop it falls back to its own defaults (lg/md/sm/xs/xxs),
 * which don't line up with the three keys (`lg`/`md`/`sm`) our layouts and
 * cols are keyed by — so anything narrower than ~768px would silently miss
 * a matching layout. These thresholds make `sm` the catch-all for phones.
 */
export const GRID_BREAKPOINTS = {
  lg: 900,
  md: 600,
  sm: 0,
};

export const GRID_COLS = {
  lg: 3,
  md: 2,
  sm: 1,
};

export const GRID_ROW_HEIGHT = 220;
