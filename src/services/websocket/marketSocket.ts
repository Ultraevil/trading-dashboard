import { io, Socket } from 'socket.io-client';

type PriceEvent = {
  symbol: string;
  price: number;
  timestamp: number;
};

export type SocketStatus = 'idle' | 'connected' | 'disconnected';

class MarketSocket {
  private socket: Socket | null = null;

  private listeners = new Map<string, Set<(price: number) => void>>();

  private statusListeners = new Set<(status: SocketStatus) => void>();

  private status: SocketStatus = 'idle';

  private setStatus(status: SocketStatus) {
    this.status = status;
    this.statusListeners.forEach((cb) => cb(status));
  }

  getStatus() {
    return this.status;
  }

  onStatusChange(cb: (status: SocketStatus) => void) {
    this.statusListeners.add(cb);
    return () => this.statusListeners.delete(cb);
  }

  connect() {
    if (this.socket) return;

    this.socket = io(import.meta.env.VITE_WS_URL, {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('accessToken'),
      },
    });

    this.socket.on('connect', () => {
      this.setStatus('connected');
    });

    this.socket.on('market:price', (data: PriceEvent) => {
      const set = this.listeners.get(data.symbol);
      if (!set) return;

      set.forEach((cb) => cb(data.price));
    });

    this.socket.on('disconnect', () => {
      this.setStatus('disconnected');
      this.socket = null;
    });

    this.socket.on('connect_error', () => {
      this.setStatus('disconnected');
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
    this.setStatus('idle');
  }
}

export const marketSocket = new MarketSocket();
