import { widgetRegistry } from './widgetRegistry';

interface Props {
  type: keyof typeof widgetRegistry;
}

export const WidgetRenderer = ({ type }: Props) => {
  const widget = widgetRegistry[type];

  if (!widget) return <div>Unknown widget</div>;

  const Component = widget.component;

  return <Component />;
};
