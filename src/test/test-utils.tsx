import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme } from '@/styles/theme';
import i18n from '@/shared/i18n/config';
import { createTestStore } from './createTestStore';
import type { TestStore } from './createTestStore';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: TestStore;
  route?: string;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    store = createTestStore(),
    route = '/',
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={darkTheme}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// eslint-disable-next-line react-refresh/only-export-components -- test utility file, not part of the HMR component tree
export * from '@testing-library/react';
