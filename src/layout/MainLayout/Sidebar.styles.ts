import styled from '@emotion/styled';
import { NavLink as RouterNavLink } from 'react-router-dom';

export const SidebarWrapper = styled.aside<{ collapsed: boolean }>`
  background: ${({ theme }) => theme.colors.panel};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  overflow-y: auto;
  width: ${({ collapsed }) => (collapsed ? '72px' : '100%')};
  transition: width ${({ theme }) => theme.transition.base};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(4)};
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  /* Below the mobile breakpoint the sidebar becomes an off-canvas drawer:
     fixed to the viewport, sliding in from the left, instead of a row of
     horizontally-scrolling sections (which doesn't work once there's a
     login form and a searchable widget list to fit). */
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    position: fixed;
    top: ${({ theme }) => theme.layout.topbarHeight};
    bottom: 0;
    left: 0;
    z-index: 40;
    flex-direction: column;
    width: min(85vw, 320px);
    max-width: 320px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: none;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: translateX(${({ collapsed }) => (collapsed ? '-100%' : '0')});
    transition: transform ${({ theme }) => theme.transition.base};
  }
`;

export const Backdrop = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: block;
    position: fixed;
    inset: ${({ theme }) => theme.layout.topbarHeight} 0 0 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 30;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  min-width: 180px;
`;

export const SectionLabel = styled.h4`
  font-size: ${({ theme }) => theme.font.size.xs};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textFaint};
  font-weight: 600;
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const NavButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 500;
  color: ${({ theme, active }) =>
    active ? theme.colors.text : theme.colors.textMuted};
  background: ${({ theme, active }) =>
    active ? theme.colors.accentMuted : 'transparent'};
  border: 1px solid
    ${({ theme, active }) => (active ? theme.colors.accent : 'transparent')};
  transition:
    background ${({ theme }) => theme.transition.fast},
    color ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.panelAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavLink = styled(RouterNavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid transparent;
  transition:
    background ${({ theme }) => theme.transition.fast},
    color ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.panelAlt};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background: ${({ theme }) => theme.colors.accentMuted};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavBadge = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 600;
  line-height: 1;
`;

export const AccountSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const AccountEmail = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  word-break: break-all;
`;
