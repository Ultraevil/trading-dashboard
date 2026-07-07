import { useMarketPrice } from '@/features/market/useMarketPrice';
import { useValueHistory } from '@/shared/hooks/useValueHistory';
import { Wrapper, StatRow, StatLabel, StatValue } from './StatsWidget.styles';

const MAX_SAMPLES = 200;

export const StatsWidget = () => {
  const price = useMarketPrice('BTCUSDT');
  const samples = useValueHistory(price, MAX_SAMPLES);

  const hasData = samples.length > 0;
  const min = hasData ? Math.min(...samples) : null;
  const max = hasData ? Math.max(...samples) : null;
  const avg = hasData ? samples.reduce((a, b) => a + b, 0) / samples.length : null;

  const format = (n: number | null) => (n == null ? '—' : `$${n.toFixed(2)}`);

  return (
    <Wrapper>
      <StatRow>
        <StatLabel>Last</StatLabel>
        <StatValue>{format(price ?? null)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>Session low</StatLabel>
        <StatValue>{format(min)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>Session high</StatLabel>
        <StatValue>{format(max)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>Session avg</StatLabel>
        <StatValue>{format(avg)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>Samples</StatLabel>
        <StatValue>{samples.length}</StatValue>
      </StatRow>
    </Wrapper>
  );
};
