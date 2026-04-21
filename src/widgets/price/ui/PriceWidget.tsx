import { useGetBrentPriceQuery } from '@/features/market/marketApi';

export const PriceWidget = () => {
  const { data, isLoading, error, refetch } = useGetBrentPriceQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading price</div>;

  return (
    <div style={{ padding: 12, background: '#111827', color: 'white' }}>
      <h3>Brent Crude</h3>

      <div style={{ fontSize: 28 }}>${data?.price}</div>

      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
};
