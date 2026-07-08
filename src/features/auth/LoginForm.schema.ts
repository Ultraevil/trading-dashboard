import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
