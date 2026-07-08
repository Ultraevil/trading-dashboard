import { useTranslation } from 'react-i18next';
import { useGetBrentPriceQuery } from '@/services/api/brentApi';
import { useMarketPrice } from '@/features/market/useMarketPrice';
import { useTrend } from '@/shared/hooks/useTrend';
import { Button } from '@/shared/ui/Button';
import {
  Wrapper,
  Row,
  Label,
  Price,
  LivePrice,
  Skeleton,
  ErrorText,
  Footer,
} from './PriceWidget.styles';

export const PriceWidget = () => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, error, refetch } =
    useGetBrentPriceQuery();
  const btcPrice = useMarketPrice('BTCUSDT');

  const brentTrend = useTrend(data?.price);
  const btcTrend = useTrend(btcPrice);

  return (
    <Wrapper>
      <Row>
        <Label>{t('widgets.price.brentLabel')}</Label>
      </Row>

      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <ErrorText role="alert">{t('widgets.price.error')}</ErrorText>
      ) : (
        <Price trend={brentTrend}>${data?.price.toFixed(2)}</Price>
      )}

      <Row>
        <Label>{t('widgets.price.btcLabel')}</Label>
      </Row>

      {btcPrice == null ? (
        <Skeleton />
      ) : (
        <LivePrice trend={btcTrend}>${btcPrice.toFixed(2)}</LivePrice>
      )}

      <Footer>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => refetch()}
          isLoading={isFetching}
        >
          {t('common.refresh')}
        </Button>
      </Footer>
    </Wrapper>
  );
};
