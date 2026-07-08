import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLogin } from './useLogin';
import { useAppDispatch } from '@/app/hooks';
import { addToast } from '@/features/ui/uiSlice';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { loginSchema } from './LoginForm.schema';
import type { LoginFormValues } from './LoginForm.schema';
import { Form, FormError } from './LoginForm.styles';

export const LoginForm = () => {
  const { t } = useTranslation();
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
      dispatch(addToast(t('auth.signInSuccess'), 'success'));
    } catch {
      setFormError(t('auth.signInError'));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        type="email"
        label={t('auth.email')}
        placeholder={t('auth.emailPlaceholder')}
        error={errors.email?.message && t(errors.email.message)}
        autoComplete="email"
        {...register('email')}
      />
      <Input
        type="password"
        label={t('auth.password')}
        placeholder={t('auth.passwordPlaceholder')}
        error={errors.password?.message && t(errors.password.message)}
        autoComplete="current-password"
        {...register('password')}
      />
      {formError && <FormError role="alert">{formError}</FormError>}
      <Button type="submit" isLoading={isLoading} fullWidth>
        {t('auth.signIn')}
      </Button>
    </Form>
  );
};
