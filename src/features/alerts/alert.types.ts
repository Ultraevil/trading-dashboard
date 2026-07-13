export type AlertCondition = 'ABOVE' | 'BELOW';

export interface Alert {
  id: string;
  symbol: string;
  condition: AlertCondition;
  targetPrice: number;
  enabled: boolean;
  triggeredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlertInput {
  symbol: string;
  condition: AlertCondition;
  targetPrice: number;
}

export interface UpdateAlertInput {
  id: string;
  symbol?: string;
  condition?: AlertCondition;
  targetPrice?: number;
}

/** Payload of the `price-alert` websocket event, sent only to the alert's owner. */
export interface PriceAlertPayload {
  type: 'price-alert';
  symbol: string;
  currentPrice: number;
  targetPrice: number;
  condition: AlertCondition;
  triggeredAt: string;
}
