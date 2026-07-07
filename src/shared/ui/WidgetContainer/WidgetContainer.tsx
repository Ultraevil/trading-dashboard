import {
  WidgetWrapper,
  WidgetHeader,
  WidgetTitle,
  WidgetActions,
  WidgetActionButton,
  WidgetBody,
} from './WidgetContainer.styles';
import type { WidgetContainerProps } from './WidgetContainer.types';

export const WidgetContainer = ({
  title,
  children,
  onRemove,
  onRefresh,
}: WidgetContainerProps) => {
  return (
    <WidgetWrapper>
      <WidgetHeader>
        <WidgetTitle title={title}>{title}</WidgetTitle>
        <WidgetActions>
          {onRefresh && (
            <WidgetActionButton
              aria-label={`Refresh ${title}`}
              title="Refresh"
              onClick={onRefresh}
            >
              ⟳
            </WidgetActionButton>
          )}
          {onRemove && (
            <WidgetActionButton
              aria-label={`Remove ${title}`}
              title="Remove widget"
              onClick={onRemove}
            >
              ×
            </WidgetActionButton>
          )}
        </WidgetActions>
      </WidgetHeader>

      <WidgetBody>{children}</WidgetBody>
    </WidgetWrapper>
  );
};
