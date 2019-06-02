// 引入 path模块
const path = require('path')
	
module.exports = {
    // 入口配置
    entry: path.resolve('src', 'index.js'),

    // 输出目录
    output: {
        path: path.resolve('dist'),
        filename: 'app.js',
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader','less-loader']
            },
        ]
    },
    
    // 编译模式
    mode: 'development'
}