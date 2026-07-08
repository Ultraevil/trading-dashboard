import dashboardReducer, { setLayouts, setState } from './dashboardSlice';
import { addWidget, removeWidget } from '@/features/widgets/widgetsSlice';
import { DEFAULT_LAYOUTS } from './dashboard.config';
import type { DashboardState } from './dashboard.types';

const emptyState: DashboardState = {
  layouts: { lg: [], md: [], sm: [] },
};

describe('dashboardSlice', () => {
  it('defaults to the default grid layout', () => {
    const state = dashboardReducer(undefined, { type: '@@INIT' });
    expect(state.layouts).toEqual(DEFAULT_LAYOUTS);
  });

  it('replaces the layouts wholesale on setLayouts', () => {
    const incoming = {
      lg: [{ i: 'price', x: 0, y: 0, w: 2, h: 2 }],
      md: [],
      sm: [],
    };

    const state = dashboardReducer(emptyState, setLayouts(incoming));
    expect(state.layouts.lg).toEqual(incoming.lg);
  });

  it('replaces the whole state on hydration (setState)', () => {
    const hydrated: DashboardState = {
      layouts: { lg: [{ i: 'stats', x: 0, y: 0, w: 1, h: 1 }], md: [], sm: [] },
    };

    const state = dashboardReducer(emptyState, setState(hydrated));
    expect(state).toEqual(hydrated);
  });

  // This is the cross-slice contract described in the README: dashboardSlice
  // doesn't own "which widgets exist" (that's widgetsSlice), but it does
  // react to widgetsSlice's own addWidget/removeWidget actions to keep the
  // grid layout in sync, via extraReducers.
  describe('reacting to widgetsSlice actions', () => {
    it('adds a default-sized layout entry to every breakpoint when a widget is added', () => {
      const state = dashboardReducer(emptyState, addWidget('price'));

      expect(state.layouts.lg).toEqual([
        { i: 'price', x: 0, y: 0, w: 1, h: 1 },
      ]);
      expect(state.layouts.md).toEqual([
        { i: 'price', x: 0, y: 0, w: 1, h: 1 },
      ]);
      expect(state.layouts.sm).toEqual([
        { i: 'price', x: 0, y: 0, w: 1, h: 1 },
      ]);
    });

    it('does not add a duplicate layout entry for a widget already on the grid', () => {
      const withPrice = dashboardReducer(emptyState, addWidget('price'));
      const state = dashboardReducer(withPrice, addWidget('price'));

      expect(state.layouts.lg).toHaveLength(1);
    });

    it('removes the layout entry from every breakpoint when a widget is removed', () => {
      const state = dashboardReducer(DEFAULT_LAYOUTS_STATE(), removeWidget('chart'));

      expect(state.layouts.lg?.some((item) => item.i === 'chart')).toBe(false);
      expect(state.layouts.md?.some((item) => item.i === 'chart')).toBe(false);
      expect(state.layouts.sm?.some((item) => item.i === 'chart')).toBe(false);
    });
  });
});

function DEFAULT_LAYOUTS_STATE(): DashboardState {
  return { layouts: JSON.parse(JSON.stringify(DEFAULT_LAYOUTS)) };
}
