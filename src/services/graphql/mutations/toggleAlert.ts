export const TOGGLE_ALERT = `
  mutation ToggleAlert($id: String!) {
    toggleAlert(id: $id) {
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
