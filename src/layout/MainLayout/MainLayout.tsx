import { MainLayoutWrapper } from './MainLayout.styles';
import { Sidebar } from '@/layout/Sidebar';
import { MainContent } from '@/layout/MainContent';

export const MainLayout = () => {
  return (
    <MainLayoutWrapper>
      <Sidebar />
      <MainContent />
    </MainLayoutWrapper>
  );
};
