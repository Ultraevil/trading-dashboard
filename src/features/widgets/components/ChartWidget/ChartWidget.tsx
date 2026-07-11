import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useMarketPrice } from '@/features/market/useMarketPrice';
import { useValueHistory } from '@/shared/hooks/useValueHistory';
import {
  Wrapper,
  Header,
  Label,
  Value,
  ChartArea,
  EmptyState,
} from './ChartWidget.styles';
import { env } from '@/config/env';

const MAX_POINTS = 40;

export const ChartWidget = () => {
  const { t } = useTranslation();
  const price = useMarketPrice(env.btcSymbol);
  const theme = useTheme();
  const history = useValueHistory(price, MAX_POINTS);

  if (history.length < 2) {
    return (
      <Wrapper>
        <Header>
          <Label>{t('widgets.chart.label')}</Label>
        </Header>
        <EmptyState>{t('widgets.chart.waiting')}</EmptyState>
      </Wrapper>
    );
  }

  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;

  const width = 280;
  const height = 80;

  const points = history
    .map((value, index) => {
      const x = (index / (history.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const isUp = history[history.length - 1] >= history[0];

  return (
    <Wrapper>
      <Header>
        <Label>{t('widgets.chart.label')}</Label>
        <Value>${price?.toFixed(2)}</Value>
      </Header>
      <ChartArea>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label={t('widgets.chart.sparklineAria')}
        >
          <polyline
            points={points}
            fill="none"
            stroke={isUp ? theme.colors.green : theme.colors.red}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ChartArea>
    </Wrapper>
  );
};
