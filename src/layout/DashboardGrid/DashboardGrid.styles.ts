import styled from '@emotion/styled';

export const DashboardGridWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 100%;
  min-height: 240px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export const EmptyStateTitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;
