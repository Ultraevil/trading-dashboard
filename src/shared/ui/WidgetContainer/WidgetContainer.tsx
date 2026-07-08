import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <WidgetWrapper>
      <WidgetHeader>
        <WidgetTitle title={title}>{title}</WidgetTitle>
        <WidgetActions>
          {onRefresh && (
            <WidgetActionButton
              aria-label={t('widgetContainer.refreshAria', { title })}
              title={t('common.refresh')}
              onClick={onRefresh}
            >
              ⟳
            </WidgetActionButton>
          )}
          {onRemove && (
            <WidgetActionButton
              aria-label={t('widgetContainer.removeAria', { title })}
              title={t('widgetContainer.removeWidget')}
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
