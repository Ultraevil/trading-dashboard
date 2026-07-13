import { useTranslation } from 'react-i18next';
import { AlertForm } from '@/features/alerts/AlertForm';
import { AlertList } from '@/features/alerts/AlertList';
import { PageWrapper, PageTitle, Card, CardTitle } from './Page.styles';

export const AlertsPage = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <PageTitle>{t('pages.alerts.title')}</PageTitle>

      <Card>
        <CardTitle>{t('pages.alerts.createTitle')}</CardTitle>
        <AlertForm />
      </Card>

      <Card>
        <CardTitle>{t('pages.alerts.listTitle')}</CardTitle>
        <AlertList />
      </Card>
    </PageWrapper>
  );
};
