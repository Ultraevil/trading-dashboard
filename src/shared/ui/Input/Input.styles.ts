import styled from '@emotion/styled';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.red : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 8px 10px;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.transition.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textFaint};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.red : theme.colors.accent};
  }
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.red};
`;
