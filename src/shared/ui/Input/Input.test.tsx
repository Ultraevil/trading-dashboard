import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input for accessibility', () => {
    renderWithProviders(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('lets the user type into the field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Input label="Email" />);

    const input = screen.getByLabelText('Email');
    await user.type(input, 'jane@example.com');

    expect(input).toHaveValue('jane@example.com');
  });

  it('shows an error message and marks the field invalid', () => {
    renderWithProviders(<Input label="Email" error="Enter a valid email address" />);

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  });

  it('does not mark the field invalid when there is no error', () => {
    renderWithProviders(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false');
  });
});
