import styled from '@emotion/styled';

export const WidgetWrapper = styled.div`
  height: 100%;
  background: #111827;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const WidgetHeader = styled.div`
  padding: 8px;
  background: #1f2937;
  cursor: grab;
  border-bottom: 1px solid #374151;
  user-select: none;
`;

export const WidgetBody = styled.div`
  flex: 1;
  padding: 12px;
  overflow: auto;
`;
