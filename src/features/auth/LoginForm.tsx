import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useLogin } from './useLogin';
import { useAppDispatch } from '@/app/hooks';
import { addToast } from '@/features/ui/uiSlice';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { loginSchema } from './LoginForm.schema';
import type { LoginFormValues } from './LoginForm.schema';
import { Form, FormError } from './LoginForm.styles';

export const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    setFormError(null);

    try {
      await login(email, password);
      dispatch(addToast('Signed in successfully', 'success'));
    } catch {
      setFormError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message || ''}
        autoComplete="email"
        {...register('email')}
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        error={errors.password?.message || ''}
        autoComplete="current-password"
        {...register('password')}
      />
      {formError && <FormError role="alert">{formError}</FormError>}
      <Button type="submit" isLoading={isLoading} fullWidth>
        Sign in
      </Button>
    </Form>
  );
};
