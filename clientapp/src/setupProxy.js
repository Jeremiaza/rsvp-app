﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/guest",
];

module.exports = function (app) {
    
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7273',
        secure: false,
        rejectUnauthorized: false,
        changeOrigin: true,
    });

    app.use(appProxy);
};
