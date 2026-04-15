import { widgetRegistry } from '@/widgets/registry/widgetRegistry';
import { useAppDispatch } from '@/app/store/hooks';
import { SidebarWrapper } from './Sidebar.styles';
import { addWidget } from '@/features/dashboard/model/dashboardSlice';
import type { WidgetType } from '@/widgets/registry/widgetTypes';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const onAddWidget = (type: WidgetType) => {
    dispatch(addWidget(type));
  };
  return (
    <SidebarWrapper>
      <h4>Widgets</h4>
      {Object.values(widgetRegistry).map((widget) => (
        <button key={widget.type} onClick={() => onAddWidget(widget.type)}>
          {widget.title}
        </button>
      ))}
    </SidebarWrapper>
  );
};
