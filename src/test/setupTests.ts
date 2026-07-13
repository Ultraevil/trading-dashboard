/// <reference types="node" />
import { TextEncoder, TextDecoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
  // @ts-expect-error -- Node's TextDecoder is close enough to the DOM lib type for tests
  globalThis.TextDecoder = TextDecoder;
}

import '@testing-library/jest-dom';

// PriceWidget/ChartWidget/StatsWidget read these via `import.meta.env`,
// which babel-plugin-transform-vite-meta-env rewrites to `process.env` for
// Jest. Setting fixed values here (matching .env.example) keeps tests
// deterministic without requiring a real .env file.
process.env.VITE_BRENT_SYMBOL = 'ICEEUR:BRN1!';
process.env.VITE_BTC_SYMBOL = 'BTCUSDT';

Object.defineProperty(window, 'Audio', {
  writable: true,
  value: class {
    play = jest.fn().mockResolvedValue(undefined);
    pause = jest.fn();
    currentTime = 0;
    volume = 1;
    preload = 'auto';
  },
});