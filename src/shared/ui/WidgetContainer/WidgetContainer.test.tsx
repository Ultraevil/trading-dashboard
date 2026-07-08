import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { WidgetContainer } from './WidgetContainer';

describe('WidgetContainer', () => {
  it('renders the title and its children', () => {
    renderWithProviders(
      <WidgetContainer title="BTC Chart">
        <p>chart contents</p>
      </WidgetContainer>,
    );

    expect(screen.getByText('BTC Chart')).toBeInTheDocument();
    expect(screen.getByText('chart contents')).toBeInTheDocument();
  });

  it('does not render remove/refresh buttons when no handlers are passed', () => {
    renderWithProviders(
      <WidgetContainer title="BTC Chart">
        <p>chart contents</p>
      </WidgetContainer>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();

    renderWithProviders(
      <WidgetContainer title="BTC Chart" onRemove={onRemove}>
        <p>chart contents</p>
      </WidgetContainer>,
    );

    await user.click(screen.getByRole('button', { name: /remove btc chart/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('calls onRefresh when the refresh button is clicked', async () => {
    const user = userEvent.setup();
    const onRefresh = jest.fn();

    renderWithProviders(
      <WidgetContainer title="BTC Chart" onRefresh={onRefresh}>
        <p>chart contents</p>
      </WidgetContainer>,
    );

    await user.click(screen.getByRole('button', { name: /refresh btc chart/i }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});
