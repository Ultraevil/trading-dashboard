export const CREATE_ALERT = `
  mutation CreateAlert($input: CreateAlertInput!) {
    createAlert(input: $input) {
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
