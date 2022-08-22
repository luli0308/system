const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    // 代理标识段
    '/api',
    proxy({
      // 此处的端口号要与后期数据请求的数据端一致
      target: 'https://echarts.apache.org/examples',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
