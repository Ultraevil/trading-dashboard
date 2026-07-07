import { useId } from 'react';
import { Field, Label, StyledInput, ErrorText } from './Input.styles';
import type { InputProps } from './Input.types';

export const Input = ({ label, error, id, ...rest }: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Field>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput
        id={inputId}
        hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && <ErrorText id={`${inputId}-error`}>{error}</ErrorText>}
    </Field>
  );
};
