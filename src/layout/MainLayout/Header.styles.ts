import styled from '@emotion/styled';

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: 0 ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.panel};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    gap: ${({ theme }) => theme.spacing(2)};
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.lg};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    span {
      display: none;
    }
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.font.size.md};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.panelAlt};
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const AccountBadge = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    span {
      display: none;
    }
  }
`;

export const Avatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentMuted};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 700;
`;
