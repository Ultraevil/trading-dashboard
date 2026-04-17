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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
