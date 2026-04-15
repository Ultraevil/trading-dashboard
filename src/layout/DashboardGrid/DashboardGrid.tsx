import { Responsive, useContainerWidth } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WidgetRenderer } from '@/widgets/registry/WidgetRenderer';
import { WidgetContainer } from '@/shared/ui/WidgetContainer';

import { DashboardGridWrapper } from './DashboardGrid.styles';
import { widgetRegistry } from '@/widgets/registry/widgetRegistry';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import type { Layout } from 'react-grid-layout';

import {
  selectWidgets,
  selectLayouts,
} from '@/features/dashboard/model/selectors';
import { setLayouts } from '@/features/dashboard/model/dashboardSlice';
import {
  GRID_COLS,
  GRID_ROW_HEIGHT,
} from '@/features/dashboard/config/grid.config';

export const DashboardGrid = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectWidgets);
  const layouts = useAppSelector(selectLayouts);
  const { width, containerRef, mounted } = useContainerWidth();

  const onLayoutChange = (
    _layout: Layout,
    layouts: Partial<Record<string, Layout>>,
  ) => {
    dispatch(
      setLayouts({
        lg: [...(layouts.lg ?? [])],
        md: [...(layouts.md ?? [])],
        sm: [...(layouts.sm ?? [])],
      }),
    );
  };

  return (
    <DashboardGridWrapper ref={containerRef}>
      {mounted && (
        <Responsive
          layouts={layouts}
          onLayoutChange={onLayoutChange}
          width={width}
          cols={GRID_COLS}
          rowHeight={GRID_ROW_HEIGHT}
        >
          {widgets.map((w) => (
            <div key={w}>
              <WidgetContainer title={widgetRegistry[w].title}>
                <WidgetRenderer type={w} />
              </WidgetContainer>
            </div>
          ))}
        </Responsive>
      )}
    </DashboardGridWrapper>
  );
};
