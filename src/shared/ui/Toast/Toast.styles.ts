import styled from '@emotion/styled';
import type { ToastVariant } from '@/features/ui/uiSlice';

export const ToastStack = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(4)};
  right: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  z-index: 1000;
`;

const colorByVariant: Record<ToastVariant, 'green' | 'red' | 'accent'> = {
  success: 'green',
  error: 'red',
  info: 'accent',
};

export const ToastItem = styled.div<{ variant: ToastVariant }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  min-width: 220px;
  max-width: 340px;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.panelAlt};
  border: 1px solid
    ${({ theme, variant }) => theme.colors[colorByVariant[variant]]};
  border-left-width: 3px;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.size.sm};
  animation: toast-in ${({ theme }) => theme.transition.base};

  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CloseButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: 1;
  padding: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
