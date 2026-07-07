export const SAVE_DASHBOARD = `
  mutation SaveDashboard($layouts: JSON!) {
    saveDashboard(layouts: $layouts)
  }
`;
