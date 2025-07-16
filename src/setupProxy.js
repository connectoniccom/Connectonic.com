const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // You can change this path to match your backend API routes
    createProxyMiddleware({
      target: 'https://3001-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/',
      changeOrigin: true,
    })
  );
};