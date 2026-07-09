import styled from '@emotion/styled';

export const BottomPanelWrapper = styled.footer`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: 0 ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.bgElevated};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  overflow-x: auto;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
    gap: ${({ theme }) => theme.spacing(2)};
    font-size: ${({ theme }) => theme.font.size.xs};
  }
`;

export const StatusDot = styled.span<{ variant: 'green' | 'red' | 'yellow' }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme, variant }) => theme.colors[variant]};
`;

export const LogLine = styled.span`
  white-space: nowrap;
`;

export const SecondaryLogLine = styled(LogLine)`
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;
