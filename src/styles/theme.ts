const darkColors = {
  // surfaces
  bg: '#0a0e14',
  bgElevated: '#0f1420',
  panel: '#121826',
  panelAlt: '#171f2e',
  border: '#232b3a',
  borderStrong: '#2f3a4d',

  // text
  text: '#e7eaf0',
  textMuted: '#8b94a7',
  textFaint: '#5b6478',

  // brand / accent
  accent: '#3b82f6',
  accentHover: '#5b93f7',
  accentMuted: 'rgba(59, 130, 246, 0.14)',

  // semantic
  green: '#22c55e',
  greenMuted: 'rgba(34, 197, 94, 0.14)',
  red: '#ef4444',
  redMuted: 'rgba(239, 68, 68, 0.14)',
  yellow: '#eab308',
};

const lightColors: typeof darkColors = {
  bg: '#f4f6fa',
  bgElevated: '#ffffff',
  panel: '#ffffff',
  panelAlt: '#eef1f6',
  border: '#dde3ee',
  borderStrong: '#c4cddc',

  text: '#161c2b',
  textMuted: '#5b6478',
  textFaint: '#8b94a7',

  accent: '#3b82f6',
  accentHover: '#2f6fe0',
  accentMuted: 'rgba(59, 130, 246, 0.1)',

  green: '#16a34a',
  greenMuted: 'rgba(22, 163, 74, 0.12)',
  red: '#dc2626',
  redMuted: 'rgba(220, 38, 38, 0.12)',
  yellow: '#ca8a04',
};

const buildTheme = (colors: typeof darkColors) => ({
  colors,

  radii: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    pill: '999px',
  },

  spacing: (n: number) => `${n * 4}px`,

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.35)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.45)',
  },

  font: {
    family:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', ui-monospace, Consolas, monospace",
    size: {
      xs: '11px',
      sm: '12px',
      md: '14px',
      lg: '0',
      xl: '0',
    },
  },

  transition: {
    fast: '120ms ease',
    base: '180ms ease',
  },

  layout: {
    sidebarWidth: '248px',
    topbarHeight: '56px',
    bottomPanelHeight: '160px',
  },

  breakpoint: {
    tablet: '900px',
    mobile: '600px',
  },
});

export type ThemeMode = 'dark' | 'light';

export const darkTheme = buildTheme(darkColors);
export const lightTheme = buildTheme(lightColors);

/** Default export used anywhere a static theme is needed (e.g. Storybook). */
export const theme = darkTheme;

export const getTheme = (mode: ThemeMode) =>
  mode === 'light' ? lightTheme : darkTheme;

export type AppTheme = typeof darkTheme;
