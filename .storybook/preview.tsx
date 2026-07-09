import type { Preview, Decorator } from '@storybook/react-vite';
import { ThemeProvider, Global } from '@emotion/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import i18n from '../src/shared/i18n/config';
import { getTheme } from '@/styles/theme';
import type { ThemeMode } from '@/styles/theme';
import { globalStyles } from '@/styles/GlobalStyle';
import { createTestStore } from '@/test/createTestStore';

// A single store shared across stories for this Storybook session - this
// mirrors how `src/test/test-utils.tsx` wires up tests. Components that
// don't touch Redux (Button, Input, WidgetContainer) simply ignore it;
// ToastContainer uses it to read/dispatch toasts.
const store = createTestStore();

/**
 * Wraps every story in the same providers `App.tsx` sets up: Redux, i18n,
 * and the emotion theme (incl. global reset/base styles). The active
 * theme reacts to the "Theme" toolbar item added below, so every
 * component can be previewed in both light and dark mode without writing
 * per-story decorators.
 */
const withAppProviders: Decorator = (Story, context) => {
  const mode: ThemeMode = context.globals.theme === 'light' ? 'light' : 'dark';
  const theme = getTheme(mode);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <MemoryRouter>
            <div
              style={{
                minHeight: '100vh',
                padding: '2rem',
                background: theme.colors.bg,
              }}
            >
              <Story />
            </div>
          </MemoryRouter>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // We paint the background ourselves from the active app theme (see
    // the decorator above), so the built-in backgrounds addon UI would
    // just be a second, conflicting way to do the same thing.
    backgrounds: { disable: true },
  },

  globalTypes: {
    theme: {
      description: 'App theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'light', icon: 'sun', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'dark',
  },

  decorators: [withAppProviders],
};

export default preview;
