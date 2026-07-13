import { useTranslation } from 'react-i18next';
import { useGetAlertsQuery } from '@/services/api/alertsApi';
import { getGraphQLErrorMessage } from '@/services/graphql/client';
import { AlertListItem } from './AlertListItem';
import { List, StatusText } from './AlertList.styles';

export const AlertList = () => {
  const { t } = useTranslation();
  const { data: alerts, isLoading, error } = useGetAlertsQuery();

  if (isLoading) return null;

  if (error) {
    return (
      <StatusText role="alert">
        {getGraphQLErrorMessage(error) ?? t('alerts.errors.generic')}
      </StatusText>
    );
  }

  if (!alerts || alerts.length === 0) {
    return <StatusText>{t('alerts.empty')}</StatusText>;
  }

  return (
    <List>
      {alerts.map((alert) => (
        <AlertListItem key={alert.id} alert={alert} />
      ))}
    </List>
  );
};
