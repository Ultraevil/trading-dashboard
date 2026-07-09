import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { t } from '@/test/i18n';
import { WidgetContainer } from './WidgetContainer';

describe('WidgetContainer', () => {
  it('renders the title and its children', () => {
    renderWithProviders(
      <WidgetContainer title={t('widgets.chart.title')}>
        <p>chart contents</p>
      </WidgetContainer>,
    );

    expect(screen.getByText(t('widgets.chart.title'))).toBeInTheDocument();
    expect(screen.getByText('chart contents')).toBeInTheDocument();
  });

  it('does not render remove/refresh buttons when no handlers are passed', () => {
    renderWithProviders(
      <WidgetContainer title={t('widgets.chart.title')}>
        <p>chart contents</p>
      </WidgetContainer>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();

    renderWithProviders(
      <WidgetContainer title={t('widgets.chart.title')} onRemove={onRemove}>
        <p>chart contents</p>
      </WidgetContainer>,
    );

    await user.click(
      screen.getByRole('button', {
        name: t('widgetContainer.removeAria', {
          title: t('widgets.chart.title'),
        }),
      }),
    );
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('calls onRefresh when the refresh button is clicked', async () => {
    const user = userEvent.setup();
    const onRefresh = jest.fn();

    renderWithProviders(
      <WidgetContainer title={t('widgets.chart.title')} onRefresh={onRefresh}>
        <p>chart contents</p>
      </WidgetContainer>,
    );

    await user.click(
      screen.getByRole('button', {
        name: t('widgetContainer.refreshAria', {
          title: t('widgets.chart.title'),
        }),
      }),
    );
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});
