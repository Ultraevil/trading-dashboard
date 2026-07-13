import * as yup from 'yup';

/**
 * Same approach as LoginForm.schema.ts: validation messages are
 * translation keys, translated at render time by the form itself.
 */
export const alertFormSchema = yup.object({
  symbol: yup.string().required('alerts.errors.symbolRequired'),

  condition: yup
    .mixed<'ABOVE' | 'BELOW'>()
    .oneOf(['ABOVE', 'BELOW'], 'alerts.errors.conditionRequired')
    .required('alerts.errors.conditionRequired'),

  targetPrice: yup
    .number()
    .typeError('alerts.errors.targetPriceInvalid')
    .positive('alerts.errors.targetPricePositive')
    .required('alerts.errors.targetPriceRequired'),
});

export type AlertFormValues = yup.InferType<typeof alertFormSchema>;
