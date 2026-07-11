import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Price = styled.span<{ trend?: 'up' | 'down' | 'flat' }>`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: 700;
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme, trend }) =>
    trend === 'up'
      ? theme.colors.green
      : trend === 'down'
        ? theme.colors.red
        : theme.colors.text};
`;

export const LivePrice = styled.span<{ trend?: 'up' | 'down' | 'flat' }>`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme, trend }) =>
    trend === 'up'
      ? theme.colors.green
      : trend === 'down'
        ? theme.colors.red
        : theme.colors.textMuted};
`;

export const Skeleton = styled.div`
  height: 28px;
  width: 90px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.panelAlt};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.panelAlt} 0%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.panelAlt} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
