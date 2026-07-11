import { useTranslation } from 'react-i18next';
import { useMarketPrice } from '@/features/market/useMarketPrice';
import { useTrend } from '@/shared/hooks/useTrend';
import {
  Wrapper,
  Row,
  Label,
  Price,
  LivePrice,
  Skeleton,
} from './PriceWidget.styles';
import { env } from '@/config/env';

export const PriceWidget = () => {
  const { t } = useTranslation();
  const brentPrice = useMarketPrice(env.brentSymbol);
  const btcPrice = useMarketPrice(env.btcSymbol);

  const brentTrend = useTrend(brentPrice);
  const btcTrend = useTrend(btcPrice);

  return (
    <Wrapper>
      <Row>
        <Label>{t('widgets.price.brentLabel')}</Label>
      </Row>

      {brentPrice == null ? (
        <Skeleton />
      ) : (
        <Price trend={brentTrend}>${brentPrice.toFixed(2)}</Price>
      )}

      <Row>
        <Label>{t('widgets.price.btcLabel')}</Label>
      </Row>

      {btcPrice == null ? (
        <Skeleton />
      ) : (
        <LivePrice trend={btcTrend}>${btcPrice.toFixed(2)}</LivePrice>
      )}
    </Wrapper>
  );
};
