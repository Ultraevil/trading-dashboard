/// <reference types="node" />
import { TextEncoder, TextDecoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
  // @ts-expect-error -- Node's TextDecoder is close enough to the DOM lib type for tests
  globalThis.TextDecoder = TextDecoder;
}

import '@testing-library/jest-dom';
