import styled from '@emotion/styled';

export const Shell = styled.div`
  display: grid;
  grid-template-rows: ${({ theme }) => theme.layout.topbarHeight} 1fr ${({
      theme,
    }) => theme.layout.bottomPanelHeight};
  height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
`;

export const Body = styled.div<{ collapsed: boolean }>`
  display: grid;
  grid-template-columns: ${({ collapsed }) => (collapsed ? '72px' : '260px')} 1fr;
  overflow: hidden;
  transition: grid-template-columns ${({ theme }) => theme.transition.base};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const Content = styled.main`
  padding: ${({ theme }) => theme.spacing(4)};
  overflow: auto;
`;
