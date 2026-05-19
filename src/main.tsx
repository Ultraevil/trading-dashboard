import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { theme } from './styles/theme';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/GlobalStyle';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { MarketProvider } from '@/app/providers/MarketProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Provider store={store}>
        <MarketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MarketProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
