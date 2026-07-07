import { css } from '@emotion/react';
import type { AppTheme } from './theme';

/**
 * A function returning the global CSS so it can react to the active theme
 * (dark/light) supplied via emotion's <ThemeProvider>. Pass this straight
 * to <Global styles={globalStyles} /> — emotion calls functions of this
 * shape with the current theme automatically.
 */
export const globalStyles = (theme: AppTheme) => css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.md};
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition:
      background ${theme.transition.base},
      color ${theme.transition.base};
  }

  button,
  input {
    font-family: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
  }

  ::selection {
    background: ${theme.colors.accentMuted};
    color: ${theme.colors.text};
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  /* scrollbars */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.borderStrong} transparent;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: ${theme.colors.borderStrong};
    border-radius: ${theme.radii.pill};
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textFaint};
  }
`;
