import { AppLayoutWrapper } from './AppLayout.styles';
import type { AppLayoutProps } from './AppLayout.types';

export const AppLayout = ({ children }: AppLayoutProps) => {
  return <AppLayoutWrapper>{children}</AppLayoutWrapper>;
};
