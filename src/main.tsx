import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReduxProvider } from '@/app/providers/ReduxProvider';
import { ApolloProvider } from '@/app/providers/ApolloProvider';
import { RouterProvider } from '@/app/providers/RouterProvider';
import { I18nProvider } from '@/app/providers/I18nProvider';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <I18nProvider>
        <ApolloProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </ApolloProvider>
      </I18nProvider>
    </ReduxProvider>
  </StrictMode>,
);
