module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://console.ranyunlong.com:8080',
                pathRewrite: {
                    "^/api": "/renren-fast"
                }
            }
        }
    }
}