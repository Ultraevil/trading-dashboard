import { forwardRef, useId } from 'react';
import { Field, Label, StyledInput, ErrorText } from './Input.styles';
import type { InputProps } from './Input.types';

/**
 * Forwards its ref to the underlying <input>, since form libraries like
 * React Hook Form need a real DOM ref from `register()` to manage focus,
 * validation triggers, and uncontrolled value reads.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <Field>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <StyledInput
          ref={ref}
          id={inputId}
          hasError={Boolean(error)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && <ErrorText id={`${inputId}-error`}>{error}</ErrorText>}
      </Field>
    );
  },
);

Input.displayName = 'Input';
