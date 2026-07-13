import { forwardRef, useId } from 'react';
import { Field, Label, ErrorText } from '@/shared/ui/Input/Input.styles';
import { StyledSelect } from './Select.styles';
import type { SelectProps } from './Select.types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, ...rest }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <Field>
        {label && <Label htmlFor={selectId}>{label}</Label>}
        <StyledSelect
          ref={ref}
          id={selectId}
          hasError={Boolean(error)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && <ErrorText id={`${selectId}-error`}>{error}</ErrorText>}
      </Field>
    );
  },
);

Select.displayName = 'Select';
