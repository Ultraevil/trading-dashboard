import styled from '@emotion/styled';

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatusText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.font.size.sm};
`;
