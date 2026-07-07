import { useEffect, useMemo } from 'react';
import type { Layout } from 'react-grid-layout';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import { debounce } from 'lodash';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WidgetContainer } from '@/shared/ui/WidgetContainer';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { widgetRegistry } from '@/features/widgets/widgets.registry';
import {
  selectActiveWidgets,
  removeWidget,
} from '@/features/widgets/widgetsSlice';
import { selectLayouts } from '@/features/dashboard/dashboardSelectors';
import { setLayouts } from '@/features/dashboard/dashboardSlice';
import type { Layouts } from '@/features/dashboard/dashboard.types';
import {
  useGetDashboardQuery,
  useSaveDashboardMutation,
} from '@/services/api/dashboardApi';

import { GRID_COLS, GRID_ROW_HEIGHT } from './grid.config';
import {
  DashboardGridWrapper,
  EmptyState,
  EmptyStateTitle,
} from './DashboardGrid.styles';

export const DashboardGrid = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectActiveWidgets);
  const layouts = useAppSelector(selectLayouts);
  const { width, containerRef, mounted } = useContainerWidth();

  // Best-effort sync with the backend: if it has a saved layout,
  // prefer it over the locally persisted one once it arrives.
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
    changedLayouts: Partial<Record<string, Layout>>,
  ) => {
    const normalizedLayouts: Layouts = {
      lg: [...(changedLayouts.lg ?? [])],
      md: [...(changedLayouts.md ?? [])],
      sm: [...(changedLayouts.sm ?? [])],
    };

    dispatch(setLayouts(normalizedLayouts));
    saveDebounced(normalizedLayouts);
  };

  if (widgets.length === 0) {
    return (
      <DashboardGridWrapper>
        <EmptyState>
          <EmptyStateTitle>No widgets on your dashboard yet</EmptyStateTitle>
          <span>Add one from the “Widgets” list in the sidebar.</span>
        </EmptyState>
      </DashboardGridWrapper>
    );
  }

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
          {widgets.map((type) => {
            const widget = widgetRegistry[type];
            const Component = widget.component;

            return (
              <div key={type}>
                <WidgetContainer
                  title={widget.title}
                  onRemove={() => dispatch(removeWidget(type))}
                >
                  <Component />
                </WidgetContainer>
              </div>
            );
          })}
        </Responsive>
      )}
    </DashboardGridWrapper>
  );
};
