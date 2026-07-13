import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_SYMBOLS } from '@/config/env';
import { getGraphQLErrorMessage } from '@/services/graphql/client';
import {
  useCreateAlertMutation,
  useUpdateAlertMutation,
} from '@/services/api/alertsApi';
import { Select } from '@/shared/ui/Select';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Field, Label } from '@/shared/ui/Input/Input.styles';
import { alertFormSchema } from './AlertForm.schema';
import type { AlertFormValues } from './AlertForm.schema';
import type { Alert } from './alert.types';
import {
  Form,
  FieldsRow,
  ConditionToggle,
  Actions,
  FormError,
} from './AlertForm.styles';

interface AlertFormProps {
  /** Present -> edit this alert; absent -> create a new one. */
  alert?: Alert;
  /** Called after a successful create/update, e.g. to close an edit row. */
  onDone?: () => void;
}

const SYMBOL_OPTIONS = AVAILABLE_SYMBOLS.map((symbol) => ({
  value: symbol,
  label: symbol,
}));

export const AlertForm = ({ alert, onDone }: AlertFormProps) => {
  const { t } = useTranslation();
  const isEditing = Boolean(alert);
  const [formError, setFormError] = useState<string | null>(null);

  const [createAlert, { isLoading: isCreating }] = useCreateAlertMutation();
  const [updateAlert, { isLoading: isUpdating }] = useUpdateAlertMutation();
  const isSubmitting = isCreating || isUpdating;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlertFormValues>({
    resolver: yupResolver(alertFormSchema),
    defaultValues: {
      symbol: alert?.symbol ?? AVAILABLE_SYMBOLS[0],
      condition: alert?.condition ?? 'ABOVE',
      targetPrice: alert?.targetPrice,
    },
  });

  const onSubmit = async (values: AlertFormValues) => {
    setFormError(null);

    try {
      if (alert) {
        await updateAlert({ id: alert.id, ...values }).unwrap();
      } else {
        await createAlert(values).unwrap();
      }
      onDone?.();
    } catch (err) {
      setFormError(getGraphQLErrorMessage(err) ?? t('alerts.errors.generic'));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldsRow>
        <Select
          label={t('alerts.fields.symbol')}
          error={errors.symbol?.message && t(errors.symbol.message)}
          options={SYMBOL_OPTIONS}
          {...register('symbol')}
        />

        <Field>
          <Label as="span">{t('alerts.fields.condition')}</Label>
          <Controller
            control={control}
            name="condition"
            render={({ field }) => (
              <ConditionToggle role="radiogroup" aria-label={t('alerts.fields.condition')}>
                <Button
                  type="button"
                  size="sm"
                  variant={field.value === 'ABOVE' ? 'primary' : 'ghost'}
                  aria-pressed={field.value === 'ABOVE'}
                  onClick={() => field.onChange('ABOVE')}
                >
                  {t('alerts.condition.ABOVE')}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={field.value === 'BELOW' ? 'primary' : 'ghost'}
                  aria-pressed={field.value === 'BELOW'}
                  onClick={() => field.onChange('BELOW')}
                >
                  {t('alerts.condition.BELOW')}
                </Button>
              </ConditionToggle>
            )}
          />
        </Field>

        <Input
          type="number"
          step="any"
          label={t('alerts.fields.targetPrice')}
          placeholder={t('alerts.targetPricePlaceholder')}
          error={errors.targetPrice?.message && t(errors.targetPrice.message)}
          {...register('targetPrice', { valueAsNumber: true })}
        />
      </FieldsRow>

      {formError && <FormError role="alert">{formError}</FormError>}

      <Actions>
        <Button type="submit" isLoading={isSubmitting}>
          {isEditing ? t('alerts.saveChanges') : t('alerts.createAlert')}
        </Button>
        {isEditing && (
          <Button type="button" variant="ghost" onClick={onDone}>
            {t('alerts.cancel')}
          </Button>
        )}
      </Actions>
    </Form>
  );
};
