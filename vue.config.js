
module.exports = {
	publicPath: './',
	outputDir: 'dist',
	// assetsDir: '', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
	indexPath: 'index.html',
	filenameHashing: true,
	lintOnSave: false, 
	runtimeCompiler: true ,
	productionSourceMap: false ,
	css: {
		sourceMap: false, 
	},
	devServer: {
		hot: true, 
		open: true,
		host: '0.0.0.0',
		port: 4399,
		https: false,
		hotOnly: false,
 		// proxy: {}, // 跨域代理
 	},
 	parallel: require('os').cpus().length > 1,
 	pwa: {}, 
	pluginOptions: {}, 
	configureWebpack: {
		module: {
			rules: [ 
				{
					test: /\.(js|jsx|vue)?$/,
					sideEffects: false 
				}
			]
		}
	}
}