import * as yup from 'yup';

/**
 * Validation messages are translation keys, not literal strings — the
 * schema itself doesn't need to know the current language. LoginForm
 * translates each message (via `t()`) at render time, so switching
 * languages re-translates already-visible errors without rebuilding
 * the schema.
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('auth.errors.emailRequired')
    .email('auth.errors.emailInvalid'),

  password: yup
    .string()
    .required('auth.errors.passwordRequired')
    .min(6, 'auth.errors.passwordMin'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
