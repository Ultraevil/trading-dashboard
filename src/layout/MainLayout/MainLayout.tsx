import { MainLayoutWrapper } from './MainLayout.styles';
import { Sidebar } from '@/layout/Sidebar/Sidebar';
import { MainContent } from '@/layout/MainContent/MainContent';

export const MainLayout = () => {
  return (
    <MainLayoutWrapper>
      <Sidebar />
      <MainContent />
    </MainLayoutWrapper>
  );
};
