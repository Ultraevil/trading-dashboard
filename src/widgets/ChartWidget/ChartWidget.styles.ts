import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Value = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const ChartArea = styled.div`
  flex: 1;
  min-height: 60px;
`;

export const EmptyState = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textFaint};
`;
