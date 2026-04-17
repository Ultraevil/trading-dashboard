import { Layout, Responsive, useContainerWidth  } from 'react-grid-layout';

import { debounce } from 'lodash';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WidgetRenderer } from '@/widgets/registry/WidgetRenderer';
import { WidgetContainer } from '@/shared/ui/WidgetContainer';

import { DashboardGridWrapper } from './DashboardGrid.styles';
import { widgetRegistry } from '@/widgets/registry/widgetRegistry';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import {
  selectWidgets,
} from '@/features/dashboard/model/selectors';
import { setLayouts } from '@/features/dashboard/model/dashboardSlice';
import {
  GRID_COLS,
  GRID_ROW_HEIGHT,
} from '@/features/dashboard/config/grid.config';
import {
  useGetDashboardQuery,
  useSaveDashboardMutation,
} from '@/features/dashboard/api/dashboardApi';

import { useEffect, useMemo } from 'react';
import { Layouts } from '@/features/dashboard/model/types';


export const DashboardGrid = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectWidgets);
  const layouts = useAppSelector((s) => s.dashboard.layouts);
  const { width, containerRef, mounted } = useContainerWidth();

  const { data } = useGetDashboardQuery();
  const [saveDashboard] = useSaveDashboardMutation();

  useEffect(() => {
    if (data) {
      dispatch(setLayouts(data));
    }
  }, [data, dispatch]);

  const saveDebounced = useMemo(
    () =>
      debounce((l: Layouts) => {
        saveDashboard({ layouts: l });
      }, 500),
    [saveDashboard],
  );

  const onLayoutChange = (
    _: Layout,
    layouts: Partial<Record<string, Layout>>,
  ) => {
    const normalizedLayouts = {
      lg: [...(layouts.lg ?? [])],
      md: [...(layouts.md ?? [])],
      sm: [...(layouts.sm ?? [])],
    };

    dispatch(setLayouts(normalizedLayouts));
    saveDebounced(normalizedLayouts);
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
