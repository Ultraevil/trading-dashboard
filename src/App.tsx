import { AppLayout } from '@/layout/AppLayout/AppLayout';
import { Topbar } from '@/layout/Topbar/Topbar';
import { MainLayout } from '@/layout/MainLayout/MainLayout';
import { BottomPanel } from '@/layout/BottomPanel/BottomPanel';

export default function App() {
  return (
    <AppLayout>
      <Topbar />
      <MainLayout />
      <BottomPanel />
    </AppLayout>
  );
}
