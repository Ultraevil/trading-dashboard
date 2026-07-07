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
      <PageTitle>Analytics</PageTitle>

      <Card>
        <CardTitle>Live feed</CardTitle>
        <Row>
          <span>
            <StatusDot variant={statusVariant} />
            Market socket
          </span>
          <Muted>{socketStatus}</Muted>
        </Row>
        {Object.entries(prices).length === 0 && (
          <Muted>No live prices received yet.</Muted>
        )}
        {Object.entries(prices).map(([symbol, price]) => (
          <Row key={symbol}>
            <span>{symbol}</span>
            <Muted>${price.toFixed(2)}</Muted>
          </Row>
        ))}
      </Card>

      <Card>
        <CardTitle>Active widgets ({activeWidgets.length})</CardTitle>
        {activeWidgets.map((type) => (
          <Row key={type}>
            <span>{widgetRegistry[type].title}</span>
            <Muted>{type}</Muted>
          </Row>
        ))}
      </Card>
    </PageWrapper>
  );
};
