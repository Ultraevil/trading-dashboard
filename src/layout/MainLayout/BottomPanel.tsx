import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app/hooks';
import { selectSocketStatus } from '@/features/market/marketSelectors';
import { selectActiveWidgets } from '@/features/widgets/widgetsSlice';
import { BottomPanelWrapper, StatusDot, LogLine } from './BottomPanel.styles';

export const BottomPanel = () => {
  const { t } = useTranslation();
  const socketStatus = useAppSelector(selectSocketStatus);
  const activeWidgets = useAppSelector(selectActiveWidgets);

  const variant =
    socketStatus === 'connected'
      ? 'green'
      : socketStatus === 'disconnected'
        ? 'red'
        : 'yellow';

  return (
    <BottomPanelWrapper>
      <LogLine>
        <StatusDot variant={variant} />
        {t('bottomPanel.marketFeed', { status: t(`bottomPanel.status.${socketStatus}`) })}
      </LogLine>
      <LogLine>
        {t('bottomPanel.widgetsOnBoard', { count: activeWidgets.length })}
      </LogLine>
    </BottomPanelWrapper>
  );
};
