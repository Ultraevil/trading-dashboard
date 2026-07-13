import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectThemeMode, setThemeMode } from '@/features/theme/themeSlice';
import {
  selectIsSidebarCollapsed,
  setSidebarCollapsed,
  selectIsAlertSoundEnabled,
  setAlertSoundEnabled,
} from '@/features/ui/uiSlice';
import {
  selectIsAuthenticated,
  selectAuthEmail,
} from '@/features/auth/authSelectors';
import { useLogout } from '@/features/auth/useLogout';
import { Button } from '@/shared/ui/Button';
import type { SupportedLanguage } from '@/shared/i18n/config';
import {
  PageWrapper,
  PageTitle,
  Card,
  CardTitle,
  Row,
  Muted,
} from './Page.styles';

export const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isSidebarCollapsed = useAppSelector(selectIsSidebarCollapsed);
  const isAlertSoundEnabled = useAppSelector(selectIsAlertSoundEnabled);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectAuthEmail);
  const { logout } = useLogout();

  const currentLanguage = i18n.language as SupportedLanguage;

  return (
    <PageWrapper>
      <PageTitle>{t('pages.settings.title')}</PageTitle>

      <Card>
        <CardTitle>{t('pages.settings.appearance')}</CardTitle>
        <Row>
          <span>{t('pages.settings.theme')}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              size="sm"
              variant={themeMode === 'dark' ? 'primary' : 'ghost'}
              onClick={() => dispatch(setThemeMode('dark'))}
            >
              {t('pages.settings.dark')}
            </Button>
            <Button
              size="sm"
              variant={themeMode === 'light' ? 'primary' : 'ghost'}
              onClick={() => dispatch(setThemeMode('light'))}
            >
              {t('pages.settings.light')}
            </Button>
          </div>
        </Row>
        <Row>
          <span>{t('pages.settings.language')}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              size="sm"
              variant={currentLanguage === 'en' ? 'primary' : 'ghost'}
              onClick={() => i18n.changeLanguage('en')}
            >
              English
            </Button>
            <Button
              size="sm"
              variant={currentLanguage === 'uk' ? 'primary' : 'ghost'}
              onClick={() => i18n.changeLanguage('uk')}
            >
              Українська
            </Button>
          </div>
        </Row>
        <Row>
          <span>{t('pages.settings.collapseSidebar')}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => dispatch(setSidebarCollapsed(!isSidebarCollapsed))}
          >
            {isSidebarCollapsed
              ? t('pages.settings.expandedView')
              : t('pages.settings.collapsedView')}
          </Button>
        </Row>
      </Card>

      <Card>
        <CardTitle>{t('pages.settings.notifications')}</CardTitle>
        <Row>
          <span>{t('pages.settings.alertSound')}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => dispatch(setAlertSoundEnabled(!isAlertSoundEnabled))}
          >
            {isAlertSoundEnabled
              ? t('pages.settings.soundOn')
              : t('pages.settings.soundOff')}
          </Button>
        </Row>
      </Card>

      <Card>
        <CardTitle>{t('pages.settings.account')}</CardTitle>
        {isAuthenticated ? (
          <>
            <Row>
              <span>{t('auth.signedInAs')}</span>
              <Muted>{email ?? t('auth.unknown')}</Muted>
            </Row>
            <Button variant="danger" size="sm" onClick={logout}>
              {t('common.logOut')}
            </Button>
          </>
        ) : (
          <Muted>{t('auth.notSignedIn')}</Muted>
        )}
      </Card>
    </PageWrapper>
  );
};
