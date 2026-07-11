import { io, Socket } from 'socket.io-client';
import { env } from '@/config/env';

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

    this.socket = io(env.wsUrl, {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('accessToken'),
      },
    });

    this.socket.on('connect', () => {
      this.setStatus('connected');
      // Re-establish subscriptions every time a connection is (re)made -
      // this covers the initial connect, socket.io's own automatic
      // reconnects after a network drop, and the forced re-handshake we
      // do from `updateAuthToken` after login/logout.
      this.listeners.forEach((_cbs, symbol) => {
        this.socket?.emit('subscribe', symbol);
      });
    });

    this.socket.on('market:price', (data: PriceEvent) => {
      const set = this.listeners.get(data.symbol);
      if (!set) return;

      set.forEach((cb) => cb(data.price));
    });

    this.socket.on('disconnect', () => {
      this.setStatus('disconnected');
      // Note: we deliberately do NOT clear `this.socket` here. socket.io
      // retries the connection on this same instance by default, and
      // dropping our reference would make subscribe()/unsubscribe() (and
      // updateAuthToken) silently no-op until something else called
      // connect() again - which is exactly why the feed used to get stuck
      // on "disconnected" until a full page refresh.
    });

    this.socket.on('connect_error', () => {
      this.setStatus('disconnected');
    });
  }

  /**
   * Re-authenticates the existing connection with whatever token is
   * currently in localStorage and forces a fresh handshake. Call this
   * whenever the access token changes (login, token refresh, logout)
   * instead of tearing down and recreating the socket - that way any
   * widgets already subscribed via `subscribe()` don't need to do
   * anything themselves; the 'connect' handler above resubscribes them.
   */
  updateAuthToken() {
    if (!this.socket) {
      this.connect();
      return;
    }

    this.socket.auth = { token: localStorage.getItem('accessToken') };
    this.socket.disconnect().connect();
  }

  subscribe(symbol: string, cb: (price: number) => void) {
    if (!this.listeners.has(symbol)) {
      this.listeners.set(symbol, new Set());
    }

    this.listeners.get(symbol)!.add(cb);

    // If we're already connected, subscribe immediately. Otherwise the
    // 'connect' handler above will send it as soon as the handshake
    // completes, so we don't need to (and can't) emit on a socket that
    // isn't open yet.
    if (this.socket?.connected) {
      this.socket.emit('subscribe', symbol);
    }
  }

  unsubscribe(symbol: string, cb: (price: number) => void) {
    const set = this.listeners.get(symbol);
    set?.delete(cb);

    if (set && set.size === 0) {
      this.listeners.delete(symbol);
    }

    if (this.socket?.connected) {
      this.socket.emit('unsubscribe', symbol);
    }
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.listeners.clear();
    this.setStatus('idle');
  }
}

export const marketSocket = new MarketSocket();
