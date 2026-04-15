import { AppLayout } from '@/layout/AppLayout';
import { Topbar } from '@/layout/Topbar';
import { MainLayout } from '@/layout/MainLayout';
import { BottomPanel } from '@/layout/BottomPanel';

export default function App() {
  return (
    <AppLayout>
      <Topbar />
      <MainLayout />
      <BottomPanel />
    </AppLayout>
  );
}
