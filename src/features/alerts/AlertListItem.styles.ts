import styled from '@emotion/styled';

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

export const Symbol = styled.span`
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.mono};
`;

export const ConditionBadge = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TargetPrice = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
`;

export const StatusBadge = styled.span<{ variant: 'active' | 'disabled' }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, variant }) =>
    variant === 'active' ? theme.colors.greenMuted : theme.colors.panelAlt};
  color: ${({ theme, variant }) =>
    variant === 'active' ? theme.colors.green : theme.colors.textMuted};
`;

export const TriggeredAt = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.textFaint};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;
