export const GET_ALERTS = `
  query GetAlerts {
    alerts {
      id
      symbol
      condition
      targetPrice
      enabled
      triggeredAt
      createdAt
      updatedAt
    }
  }
`;
