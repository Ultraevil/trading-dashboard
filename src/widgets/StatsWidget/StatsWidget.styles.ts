import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  height: 100%;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.font.size.sm};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const StatValue = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
`;
