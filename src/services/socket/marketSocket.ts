import { io, Socket } from 'socket.io-client';

type PriceEvent = {
  symbol: string;
  price: number;
  timestamp: number;
};

class MarketSocket {
  private socket: Socket | null = null;

  private listeners = new Map<string, Set<(price: number) => void>>();

  connect() {
    if (this.socket) return;

    this.socket = io(import.meta.env.VITE_WS_URL, {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('accessToken'),
      },
    });

    this.socket.on('connect', () => {
      console.log('🟢 Socket connected');
    });

    this.socket.on('market:price', (data: PriceEvent) => {
      const set = this.listeners.get(data.symbol);
      if (!set) return;

      set.forEach((cb) => cb(data.price));
    });

    this.socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
      this.socket = null;
    });
  }

  subscribe(symbol: string, cb: (price: number) => void) {
    if (!this.socket) return;

    if (!this.listeners.has(symbol)) {
      this.listeners.set(symbol, new Set());
    }

    this.listeners.get(symbol)!.add(cb);

    this.socket.emit('subscribe', symbol);
  }

  unsubscribe(symbol: string, cb: (price: number) => void) {
    this.listeners.get(symbol)?.delete(cb);

    this.socket?.emit('unsubscribe', symbol);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.listeners.clear();
  }
}

export const marketSocket = new MarketSocket();
