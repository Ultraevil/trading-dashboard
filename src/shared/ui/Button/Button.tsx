import { StyledButton, Spinner } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  );
};
