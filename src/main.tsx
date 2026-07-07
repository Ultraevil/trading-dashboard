import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReduxProvider } from '@/app/providers/ReduxProvider';
import { ApolloProvider } from '@/app/providers/ApolloProvider';
import { RouterProvider } from '@/app/providers/RouterProvider';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <ApolloProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </ApolloProvider>
    </ReduxProvider>
  </StrictMode>,
);
