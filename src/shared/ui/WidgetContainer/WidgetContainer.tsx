import {
  WidgetWrapper,
  WidgetHeader,
  WidgetBody,
} from './WidgetContainer.styles';

import type { WidgetContainerProps } from './WidgetContainer.types';

export const WidgetContainer = ({ title, children }: WidgetContainerProps) => {
  return (
    <WidgetWrapper>
      <WidgetHeader>{title}</WidgetHeader>

      <WidgetBody>{children}</WidgetBody>
    </WidgetWrapper>
  );
};
