import styled from '@emotion/styled';

export const StyledSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.red : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 8px 10px;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.transition.fast};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.red : theme.colors.accent};
  }
`;
