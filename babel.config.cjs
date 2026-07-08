module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    // Jest runs tests under CommonJS/Babel, which doesn't understand
    // `import.meta.env` (a Vite/ESM-only construct used in
    // services/websocket/marketSocket.ts). This plugin rewrites it to
    // `process.env` at transform time so those modules can be imported
    // in tests without a separate mock.
    'babel-plugin-transform-vite-meta-env',
  ],
};
