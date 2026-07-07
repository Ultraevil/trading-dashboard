import { useAppSelector } from '@/app/hooks';
import { selectSocketStatus } from '@/features/market/marketSelectors';
import { selectActiveWidgets } from '@/features/widgets/widgetsSlice';
import { BottomPanelWrapper, StatusDot, LogLine } from './BottomPanel.styles';

export const BottomPanel = () => {
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
        Market feed: {socketStatus}
      </LogLine>
      <LogLine>Widgets on board: {activeWidgets.length}</LogLine>
    </BottomPanelWrapper>
  );
};
