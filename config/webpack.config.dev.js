const path = require('path')
const merge = require('webpack-merge')
const webpackCommon = require('./webpack.config.common')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 显示进度条
const ROOT_PATH = process.cwd();
const DIST_PATH = path.resolve(ROOT_PATH, "dist");
const Config = require('../web.config.ts')
const chalk = require('react-dev-utils/chalk')


module.exports = merge(webpackCommon, {
	mode: 'development',
	output: {
		path: DIST_PATH,
		filename: "[name].[hash].js"
	},
	devServer: { // 本地为搭建了一个小型的静态文件服务器
		hot: true,
		host: "0.0.0.0", // 可以使用手机访问
		port: Config.Serverport,
		compress: true,
		quiet: true, // 清除webpack
		historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
		// proxy: {
		//   // 代理到后端的服务地址，会拦截所有以api开头的请求地址
		//   "/api": "http://localhost:4000"
		// }
	},
	plugins: [
		new ProgressBarPlugin({
			format: ' Avtion [:bar] ' + ':percent' + ' (:elapsed seconds)',
			clear: false,
			callback: () => {
				console.log(' \n 成功启动服务！！！😊😊😊')
				console.log(` \n Local:            http://localhost:${Config.Serverport}/`)
				console.log(` On Your Network:  http://${Config.IPv4}:${Config.Serverport}/`)
				console.log('\n\nNote that the development build is not optimized.')
				console.log(`To create a production build, use ${chalk.yellow('npm run build')}.`)
			}
		})
	]
}) 