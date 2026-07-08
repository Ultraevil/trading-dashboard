import widgetsReducer, {
  addWidget,
  removeWidget,
  setActiveWidgets,
} from './widgetsSlice';
import { ALL_WIDGET_TYPES } from './widgets.registry';

describe('widgetsSlice', () => {
  it('defaults to every known widget type being active', () => {
    const state = widgetsReducer(undefined, { type: '@@INIT' });
    expect(state.active).toEqual([...ALL_WIDGET_TYPES]);
  });

  it('adds a widget that is not already active', () => {
    const state = widgetsReducer({ active: [] }, addWidget('price'));
    expect(state.active).toEqual(['price']);
  });

  it('does not add a duplicate of an already-active widget', () => {
    const state = widgetsReducer({ active: ['price'] }, addWidget('price'));
    expect(state.active).toEqual(['price']);
  });

  it('removes an active widget', () => {
    const state = widgetsReducer(
      { active: ['price', 'chart', 'stats'] },
      removeWidget('chart'),
    );
    expect(state.active).toEqual(['price', 'stats']);
  });

  it('removing a widget that is not active is a no-op', () => {
    const state = widgetsReducer({ active: ['price'] }, removeWidget('chart'));
    expect(state.active).toEqual(['price']);
  });

  it('replaces the whole active list on hydration', () => {
    const state = widgetsReducer(
      { active: ['price'] },
      setActiveWidgets(['chart', 'stats']),
    );
    expect(state.active).toEqual(['chart', 'stats']);
  });
});
