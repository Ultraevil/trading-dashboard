import { widgetRegistry } from '@/widgets/registry/widgetRegistry';
import { useAppDispatch } from '@/app/store/hooks';
import { SidebarWrapper } from './Sidebar.styles';
import { addWidget } from '@/features/dashboard/model/dashboardSlice';
import type { WidgetType } from '@/widgets/registry/widgetTypes';
import { LoginForm } from '@/features/auth/ui/LoginForm';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const onAddWidget = (type: WidgetType) => {
    dispatch(
      addWidget({
        id: type,
        item: {
          i: type,
          x: 0,
          y: 0,
          w: 2,
          h: 2,
        },
      }),
    );
  };
  return (
    <SidebarWrapper>
      <h4>Widgets</h4>
      {Object.values(widgetRegistry).map((widget) => (
        <button key={widget.type} onClick={() => onAddWidget(widget.type)}>
          {widget.title}
        </button>
      ))}

      <h4>Login</h4>
      <LoginForm />
    </SidebarWrapper>
  );
};
