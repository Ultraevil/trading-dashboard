import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { t } from '@/test/i18n';
import { LoginForm } from './LoginForm';

const mockLogin = jest.fn();

jest.mock('./useLogin', () => ({
  useLogin: () => ({ login: mockLogin, isLoading: false }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it('shows validation errors instead of submitting when fields are empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole('button', { name: t('auth.signIn') }));

    expect(
      await screen.findByText(t('auth.errors.emailRequired')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(t('auth.errors.passwordRequired')),
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(t('auth.email')), 'not-an-email');
    await user.type(screen.getByLabelText(t('auth.password')), 'password123');
    await user.click(screen.getByRole('button', { name: t('auth.signIn') }));

    expect(
      await screen.findByText(t('auth.errors.emailInvalid')),
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('rejects a password shorter than 6 characters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(t('auth.email')), 'jane@example.com');
    await user.type(screen.getByLabelText(t('auth.password')), '123');
    await user.click(screen.getByRole('button', { name: t('auth.signIn') }));

    expect(
      await screen.findByText(t('auth.errors.passwordMin')),
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls mockLogin with the entered credentials once validation passes', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(t('auth.email')), 'jane@example.com');
    await user.type(screen.getByLabelText(t('auth.password')), 'password123');
    await user.click(screen.getByRole('button', { name: t('auth.signIn') }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('jane@example.com', 'password123');
    });
  });

  it('shows a form-level error when mockLogin rejects', async () => {
    mockLogin.mockRejectedValueOnce(new Error('unauthorized'));
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(t('auth.email')), 'jane@example.com');
    await user.type(screen.getByLabelText(t('auth.password')), 'password123');
    await user.click(screen.getByRole('button', { name: t('auth.signIn') }));

    expect(await screen.findByText(t('auth.signInError'))).toBeInTheDocument();
  });
});
