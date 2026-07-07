import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  addWidget,
  removeWidget,
  selectActiveWidgets,
} from '@/features/widgets/widgetsSlice';
import { widgetRegistry } from '@/features/widgets/widgets.registry';
import type { WidgetType } from '@/features/widgets/widgets.registry';
import { selectIsSidebarCollapsed } from '@/features/ui/uiSlice';
import { selectIsAuthenticated, selectAuthEmail } from '@/features/auth/authSelectors';
import { useLogout } from '@/features/auth/useLogout';
import { LoginForm } from '@/features/auth/LoginForm';
import { PATHS } from '@/routes/paths';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
  SidebarWrapper,
  Section,
  SectionLabel,
  NavList,
  NavButton,
  NavLink,
  AccountSummary,
  AccountEmail,
} from './Sidebar.styles';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const activeWidgets = useAppSelector(selectActiveWidgets);
  const isCollapsed = useAppSelector(selectIsSidebarCollapsed);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectAuthEmail);
  const { logout } = useLogout();

  const [widgetSearch, setWidgetSearch] = useState('');

  const availableWidgets = Object.values(widgetRegistry).filter((widget) =>
    widget.title.toLowerCase().includes(widgetSearch.toLowerCase()),
  );

  const onToggleWidget = (type: WidgetType) => {
    if (activeWidgets.includes(type)) {
      dispatch(removeWidget(type));
    } else {
      dispatch(addWidget(type));
    }
  };

  return (
    <SidebarWrapper collapsed={isCollapsed} aria-label="Primary">
      <Section>
        {!isCollapsed && <SectionLabel>Menu</SectionLabel>}
        <NavList>
          <NavLink to={PATHS.dashboard} end title="Dashboard">
            📊 {!isCollapsed && 'Dashboard'}
          </NavLink>
          <NavLink to={PATHS.analytics} title="Analytics">
            📈 {!isCollapsed && 'Analytics'}
          </NavLink>
          <NavLink to={PATHS.settings} title="Settings">
            ⚙️ {!isCollapsed && 'Settings'}
          </NavLink>
        </NavList>
      </Section>

      <Section>
        {!isCollapsed && <SectionLabel>Widgets</SectionLabel>}
        {!isCollapsed && (
          <Input
            placeholder="Search widgets…"
            value={widgetSearch}
            onChange={(e) => setWidgetSearch(e.target.value)}
            aria-label="Search widgets"
          />
        )}
        <NavList>
          {availableWidgets.map((widget) => {
            const isActive = activeWidgets.includes(widget.type);
            return (
              <NavButton
                key={widget.type}
                active={isActive}
                onClick={() => onToggleWidget(widget.type)}
                title={widget.title}
                aria-pressed={isActive}
              >
                {isActive ? '✓' : '+'} {!isCollapsed && widget.title}
              </NavButton>
            );
          })}
          {availableWidgets.length === 0 && !isCollapsed && (
            <span>No widgets match “{widgetSearch}”.</span>
          )}
        </NavList>
      </Section>

      {!isCollapsed && (
        <Section>
          <SectionLabel>Account</SectionLabel>
          {isAuthenticated ? (
            <AccountSummary>
              <AccountEmail>{email}</AccountEmail>
              <Button size="sm" variant="ghost" onClick={logout}>
                Log out
              </Button>
            </AccountSummary>
          ) : (
            <LoginForm />
          )}
        </Section>
      )}
    </SidebarWrapper>
  );
};
