import { useTranslation } from 'react-i18next';
import { useMarketPrice } from '@/features/market/useMarketPrice';
import { useValueHistory } from '@/shared/hooks/useValueHistory';
import { Wrapper, StatRow, StatLabel, StatValue } from './StatsWidget.styles';
import { env } from '@/config/env';

const MAX_SAMPLES = 200;

export const StatsWidget = () => {
  const { t } = useTranslation();
  const price = useMarketPrice(env.btcSymbol);
  const samples = useValueHistory(price, MAX_SAMPLES);

  const hasData = samples.length > 0;
  const min = hasData ? Math.min(...samples) : null;
  const max = hasData ? Math.max(...samples) : null;
  const avg = hasData
    ? samples.reduce((a, b) => a + b, 0) / samples.length
    : null;

  const format = (n: number | null) => (n == null ? '—' : `$${n.toFixed(2)}`);

  return (
    <Wrapper>
      <StatRow>
        <StatLabel>{t('widgets.stats.last')}</StatLabel>
        <StatValue>{format(price ?? null)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>{t('widgets.stats.sessionLow')}</StatLabel>
        <StatValue>{format(min)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>{t('widgets.stats.sessionHigh')}</StatLabel>
        <StatValue>{format(max)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>{t('widgets.stats.sessionAvg')}</StatLabel>
        <StatValue>{format(avg)}</StatValue>
      </StatRow>
      <StatRow>
        <StatLabel>{t('widgets.stats.samples')}</StatLabel>
        <StatValue>{samples.length}</StatValue>
      </StatRow>
    </Wrapper>
  );
};
