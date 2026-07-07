import type { WidgetType } from './widgets.registry';

const WIDGETS_STORAGE_KEY = 'active_widgets_v1';

export const loadActiveWidgets = (): WidgetType[] | undefined => {
  try {
    const raw = localStorage.getItem(WIDGETS_STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const saveActiveWidgets = (widgets: WidgetType[]) => {
  try {
    localStorage.setItem(WIDGETS_STORAGE_KEY, JSON.stringify(widgets));
  } catch (e) {
    console.error('Failed to persist active widgets', e);
  }
};
