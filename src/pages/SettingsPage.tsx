import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectThemeMode, setThemeMode } from '@/features/theme/themeSlice';
import {
  selectIsSidebarCollapsed,
  setSidebarCollapsed,
} from '@/features/ui/uiSlice';
import {
  selectIsAuthenticated,
  selectAuthEmail,
} from '@/features/auth/authSelectors';
import { useLogout } from '@/features/auth/useLogout';
import { Button } from '@/shared/ui/Button';
import {
  PageWrapper,
  PageTitle,
  Card,
  CardTitle,
  Row,
  Muted,
} from './Page.styles';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isSidebarCollapsed = useAppSelector(selectIsSidebarCollapsed);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectAuthEmail);
  const { logout } = useLogout();

  return (
    <PageWrapper>
      <PageTitle>Settings</PageTitle>

      <Card>
        <CardTitle>Appearance</CardTitle>
        <Row>
          <span>Theme</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              size="sm"
              variant={themeMode === 'dark' ? 'primary' : 'ghost'}
              onClick={() => dispatch(setThemeMode('dark'))}
            >
              Dark
            </Button>
            <Button
              size="sm"
              variant={themeMode === 'light' ? 'primary' : 'ghost'}
              onClick={() => dispatch(setThemeMode('light'))}
            >
              Light
            </Button>
          </div>
        </Row>
        <Row>
          <span>Collapse sidebar</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => dispatch(setSidebarCollapsed(!isSidebarCollapsed))}
          >
            {isSidebarCollapsed ? 'Expanded view' : 'Collapsed view'}
          </Button>
        </Row>
      </Card>

      <Card>
        <CardTitle>Account</CardTitle>
        {isAuthenticated ? (
          <>
            <Row>
              <span>Signed in as</span>
              <Muted>{email ?? 'unknown'}</Muted>
            </Row>
            <Button variant="danger" size="sm" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <Muted>You are not signed in yet — use the sidebar to log in.</Muted>
        )}
      </Card>
    </PageWrapper>
  );
};
