import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  addWidget,
  removeWidget,
  selectActiveWidgets,
} from '@/features/widgets/widgetsSlice';
import { widgetRegistry } from '@/features/widgets/widgets.registry';
import type { WidgetType } from '@/features/widgets/widgets.registry';
import { selectIsSidebarCollapsed, toggleSidebar } from '@/features/ui/uiSlice';
import {
  selectIsAuthenticated,
  selectAuthEmail,
} from '@/features/auth/authSelectors';
import { useLogout } from '@/features/auth/useLogout';
import { LoginForm } from '@/features/auth/LoginForm';
import { useGetAlertsQuery } from '@/services/api/alertsApi';
import { PATHS } from '@/routes/paths';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
  SidebarWrapper,
  Backdrop,
  Section,
  SectionLabel,
  NavList,
  NavButton,
  NavLink,
  NavBadge,
  AccountSummary,
  AccountEmail,
} from './Sidebar.styles';

export const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeWidgets = useAppSelector(selectActiveWidgets);
  const isCollapsed = useAppSelector(selectIsSidebarCollapsed);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectAuthEmail);
  const { logout } = useLogout();

  const { data: alerts } = useGetAlertsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const activeAlertsCount = alerts?.filter((alert) => alert.enabled).length ?? 0;

  const [widgetSearch, setWidgetSearch] = useState('');

  const availableWidgets = Object.values(widgetRegistry).filter((widget) =>
    t(widget.titleKey).toLowerCase().includes(widgetSearch.toLowerCase()),
  );

  const onToggleWidget = (type: WidgetType) => {
    if (activeWidgets.includes(type)) {
      dispatch(removeWidget(type));
    } else {
      dispatch(addWidget(type));
    }
  };

  return (
    <>
      {!isCollapsed && (
        <Backdrop
          aria-hidden="true"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <SidebarWrapper collapsed={isCollapsed} aria-label={t('sidebar.primary')}>
        <Section>
          {!isCollapsed && <SectionLabel>{t('sidebar.menu')}</SectionLabel>}
          <NavList>
            <NavLink
              to={PATHS.dashboard}
              end
              title={t('sidebar.nav.dashboard')}
            >
              📊 {!isCollapsed && t('sidebar.nav.dashboard')}
            </NavLink>
            <NavLink to={PATHS.analytics} title={t('sidebar.nav.analytics')}>
              📈 {!isCollapsed && t('sidebar.nav.analytics')}
            </NavLink>
            <NavLink to={PATHS.alerts} title={t('sidebar.nav.alerts')}>
              🔔 {!isCollapsed && t('sidebar.nav.alerts')}
              {activeAlertsCount > 0 && (
                <NavBadge aria-label={t('sidebar.activeAlertsCount', { count: activeAlertsCount })}>
                  {activeAlertsCount}
                </NavBadge>
              )}
            </NavLink>
            <NavLink to={PATHS.settings} title={t('sidebar.nav.settings')}>
              ⚙️ {!isCollapsed && t('sidebar.nav.settings')}
            </NavLink>
          </NavList>
        </Section>

        <Section>
          {!isCollapsed && <SectionLabel>{t('sidebar.widgets')}</SectionLabel>}
          {!isCollapsed && (
            <Input
              placeholder={t('sidebar.searchWidgets')}
              value={widgetSearch}
              onChange={(e) => setWidgetSearch(e.target.value)}
              aria-label={t('sidebar.searchWidgetsAria')}
            />
          )}
          <NavList>
            {availableWidgets.map((widget) => {
              const isActive = activeWidgets.includes(widget.type);
              const title = t(widget.titleKey);
              return (
                <NavButton
                  key={widget.type}
                  active={isActive}
                  onClick={() => onToggleWidget(widget.type)}
                  title={title}
                  aria-pressed={isActive}
                >
                  {isActive ? '✓' : '+'} {!isCollapsed && title}
                </NavButton>
              );
            })}
            {availableWidgets.length === 0 && !isCollapsed && (
              <span>
                {t('sidebar.noWidgetsMatch', { query: widgetSearch })}
              </span>
            )}
          </NavList>
        </Section>

        {!isCollapsed && (
          <Section>
            <SectionLabel>{t('sidebar.account')}</SectionLabel>
            {isAuthenticated ? (
              <AccountSummary>
                <AccountEmail>{email}</AccountEmail>
                <Button size="sm" variant="ghost" onClick={logout}>
                  {t('common.logOut')}
                </Button>
              </AccountSummary>
            ) : (
              <LoginForm />
            )}
          </Section>
        )}
      </SidebarWrapper>
    </>
  );
};
