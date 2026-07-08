import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app/hooks';
import { selectActiveWidgets } from '@/features/widgets/widgetsSlice';
import { widgetRegistry } from '@/features/widgets/widgets.registry';
import { selectSocketStatus } from '@/features/market/marketSelectors';
import {
  PageWrapper,
  PageTitle,
  Card,
  CardTitle,
  Row,
  Muted,
  StatusDot,
} from './Page.styles';

export const AnalyticsPage = () => {
  const { t } = useTranslation();
  const activeWidgets = useAppSelector(selectActiveWidgets);
  const socketStatus = useAppSelector(selectSocketStatus);
  const prices = useAppSelector((s) => s.market.prices);

  const statusVariant =
    socketStatus === 'connected'
      ? 'green'
      : socketStatus === 'disconnected'
        ? 'red'
        : 'yellow';

  return (
    <PageWrapper>
      <PageTitle>{t('pages.analytics.title')}</PageTitle>

      <Card>
        <CardTitle>{t('pages.analytics.liveFeed')}</CardTitle>
        <Row>
          <span>
            <StatusDot variant={statusVariant} />
            {t('pages.analytics.marketSocket')}
          </span>
          <Muted>{t(`bottomPanel.status.${socketStatus}`)}</Muted>
        </Row>
        {Object.entries(prices).length === 0 && (
          <Muted>{t('pages.analytics.noLivePrices')}</Muted>
        )}
        {Object.entries(prices).map(([symbol, price]) => (
          <Row key={symbol}>
            <span>{symbol}</span>
            <Muted>${price.toFixed(2)}</Muted>
          </Row>
        ))}
      </Card>

      <Card>
        <CardTitle>
          {t('pages.analytics.activeWidgets', { count: activeWidgets.length })}
        </CardTitle>
        {activeWidgets.map((type) => (
          <Row key={type}>
            <span>{t(widgetRegistry[type].titleKey)}</span>
            <Muted>{type}</Muted>
          </Row>
        ))}
      </Card>
    </PageWrapper>
  );
};
