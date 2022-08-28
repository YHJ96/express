const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/access_token',
    createProxyMiddleware({
      target: 'https://github.com/login/oauth',
      changeOrigin: true,
    }),
  );
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'https://api.github.com',
      changeOrigin: true,
    }),
  );
};
