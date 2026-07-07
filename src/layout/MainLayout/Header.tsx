import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleSidebar } from '@/features/ui/uiSlice';
import { toggleThemeMode, selectThemeMode } from '@/features/theme/themeSlice';
import {
  selectIsAuthenticated,
  selectAuthEmail,
} from '@/features/auth/authSelectors';
import {
  HeaderBar,
  Brand,
  IconButton,
  Spacer,
  AccountBadge,
  Avatar,
} from './Header.styles';

export const Header = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectAuthEmail);

  const initials = email ? email.slice(0, 2).toUpperCase() : 'GU';

  return (
    <HeaderBar>
      <IconButton
        aria-label="Toggle sidebar"
        onClick={() => dispatch(toggleSidebar())}
      >
        ☰
      </IconButton>

      <Brand>📈 Trading Dashboard</Brand>

      <Spacer />

      <IconButton
        aria-label="Toggle color theme"
        onClick={() => dispatch(toggleThemeMode())}
        title={themeMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {themeMode === 'dark' ? '🌙' : '☀️'}
      </IconButton>

      <AccountBadge>
        <Avatar>{initials}</Avatar>
        {isAuthenticated ? email : 'Guest'}
      </AccountBadge>
    </HeaderBar>
  );
};
