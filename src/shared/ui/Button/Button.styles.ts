import styled from '@emotion/styled';
import type { ButtonVariant, ButtonSize } from './Button.types';

const paddingBySize: Record<ButtonSize, string> = {
  sm: '6px 10px',
  md: '9px 14px',
};

const fontSizeBySize: Record<ButtonSize, string> = {
  sm: '12px',
  md: '13px',
};

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  line-height: 1;
  border: 1px solid transparent;
  transition:
    background ${({ theme }) => theme.transition.fast},
    border-color ${({ theme }) => theme.transition.fast},
    color ${({ theme }) => theme.transition.fast},
    opacity ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ size }) => paddingBySize[size]};
  font-size: ${({ size }) => fontSizeBySize[size]};

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.accent};
          color: white;
          &:hover:not(:disabled) { background: ${theme.colors.accentHover}; }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textMuted};
          border-color: ${theme.colors.border};
          &:hover:not(:disabled) {
            color: ${theme.colors.text};
            border-color: ${theme.colors.borderStrong};
            background: ${theme.colors.panelAlt};
          }
        `;
      case 'danger':
        return `
          background: transparent;
          color: ${theme.colors.red};
          border-color: ${theme.colors.border};
          &:hover:not(:disabled) {
            background: ${theme.colors.redMuted};
            border-color: ${theme.colors.red};
          }
        `;
      case 'subtle':
        return `
          background: ${theme.colors.panelAlt};
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
          &:hover:not(:disabled) { border-color: ${theme.colors.borderStrong}; }
        `;
      default:
        return '';
    }
  }}
`;

export const Spinner = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  opacity: 0.8;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
