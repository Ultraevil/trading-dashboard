import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectIsSidebarCollapsed } from '@/features/ui/uiSlice';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomPanel } from './BottomPanel';
import { Shell, Body, Content } from './MainLayout.styles';

/**
 * The app shell: header on top, a sidebar + routed page content in the
 * middle, and a status bar at the bottom. Individual pages are rendered
 * through the router's <Outlet />, so MainLayout itself never needs to
 * know which page is active.
 */
export const MainLayout = () => {
  const isSidebarCollapsed = useAppSelector(selectIsSidebarCollapsed);

  return (
    <Shell>
      <Header />
      <Body collapsed={isSidebarCollapsed}>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Body>
      <BottomPanel />
    </Shell>
  );
};
