import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleSidebar } from '@/features/ui/uiSlice';
import { toggleThemeMode, selectThemeMode } from '@/features/theme/themeSlice';
import {
  selectIsAuthenticated,
  selectAuthEmail,
} from '@/features/auth/authSelectors';
import type { SupportedLanguage } from '@/shared/i18n/config';
import {
  HeaderBar,
  Brand,
  IconButton,
  Spacer,
  AccountBadge,
  Avatar,
} from './Header.styles';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectAuthEmail);

  const initials = email ? email.slice(0, 2).toUpperCase() : 'GU';

  const currentLanguage = i18n.language as SupportedLanguage;
  const nextLanguage: SupportedLanguage = currentLanguage === 'en' ? 'uk' : 'en';

  return (
    <HeaderBar>
      <IconButton
        aria-label={t('header.toggleSidebar')}
        onClick={() => dispatch(toggleSidebar())}
      >
        ☰
      </IconButton>

      <Brand>
        📈 <span>{t('header.brand')}</span>
      </Brand>

      <Spacer />

      <IconButton
        aria-label={t('header.toggleLanguage')}
        title={t('header.toggleLanguage')}
        onClick={() => i18n.changeLanguage(nextLanguage)}
      >
        {currentLanguage.toUpperCase()}
      </IconButton>

      <IconButton
        aria-label={t('header.toggleTheme')}
        onClick={() => dispatch(toggleThemeMode())}
        title={
          themeMode === 'dark'
            ? t('header.switchToLight')
            : t('header.switchToDark')
        }
      >
        {themeMode === 'dark' ? '🌙' : '☀️'}
      </IconButton>

      <AccountBadge>
        <Avatar>{initials}</Avatar>
        <span>{isAuthenticated ? email : t('header.guest')}</span>
      </AccountBadge>
    </HeaderBar>
  );
};
