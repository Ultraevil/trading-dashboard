import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { Select } from './Select';

const OPTIONS = [
  { value: 'BTCUSDT', label: 'BTCUSDT' },
  { value: 'ICEEUR:BRN1!', label: 'ICEEUR:BRN1!' },
];

describe('Select', () => {
  it('associates the label with the select for accessibility', () => {
    renderWithProviders(<Select label="Symbol" options={OPTIONS} />);
    expect(screen.getByLabelText('Symbol')).toBeInTheDocument();
  });

  it('renders every option', () => {
    renderWithProviders(<Select label="Symbol" options={OPTIONS} />);

    expect(
      screen.getByRole('option', { name: 'BTCUSDT' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'ICEEUR:BRN1!' }),
    ).toBeInTheDocument();
  });

  it('lets the user pick an option', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Select label="Symbol" options={OPTIONS} />);

    const select = screen.getByLabelText('Symbol');
    await user.selectOptions(select, 'ICEEUR:BRN1!');

    expect(select).toHaveValue('ICEEUR:BRN1!');
  });

  it('shows an error message and marks the field invalid', () => {
    renderWithProviders(
      <Select label="Symbol" options={OPTIONS} error="Choose a symbol" />,
    );

    const select = screen.getByLabelText('Symbol');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Choose a symbol')).toBeInTheDocument();
  });
});
