import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLogin } from './useLogin';
import { useAppDispatch } from '@/app/hooks';
import { addToast } from '@/features/ui/uiSlice';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Form, FormError } from './LoginForm.styles';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

export const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Must be at least 6 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validate()) return;

    try {
      await login(email, password);
      dispatch(addToast('Signed in successfully', 'success'));
    } catch {
      setFormError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="current-password"
      />
      {formError && <FormError role="alert">{formError}</FormError>}
      <Button type="submit" isLoading={isLoading} fullWidth>
        Sign in
      </Button>
    </Form>
  );
};
