module.exports = {
  devServer: {
    proxy: {
      '/auth':{
        target: 'http://localhost:8889',
        changeOrigin: true
      },
      '/api':{
        target: 'http://localhost:8889',
        changeOrigin: true
      }
    }
  }
}