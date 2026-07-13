export const UPDATE_ALERT = `
  mutation UpdateAlert($input: UpdateAlertInput!) {
    updateAlert(input: $input) {
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
