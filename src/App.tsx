import { ThemeProvider, Global } from '@emotion/react';
import { useAppSelector } from '@/app/hooks';
import { selectThemeMode } from '@/features/theme/themeSlice';
import { getTheme } from '@/styles/theme';
import { globalStyles } from '@/styles/GlobalStyle';
import { MarketProvider } from '@/app/providers/MarketProvider';
import { SessionCleanupProvider } from '@/app/providers/SessionCleanupProvider';
import { ToastContainer } from '@/shared/ui/Toast';
import { AppRoutes } from '@/routes';

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <SessionCleanupProvider>
        <MarketProvider>
          <AppRoutes />
          <ToastContainer />
        </MarketProvider>
      </SessionCleanupProvider>
    </ThemeProvider>
  );
};
