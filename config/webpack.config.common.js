/**
 * webpack公共配置【对文件的处理以及解析】
 */
const path = require('path')
const webpack = require('webpack')
// const dashboard = new Dashboard();
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
		build: path.resolve(process.cwd(), "src/index.js")
	},
	output: {
		// 输出目录
		path: path.resolve(__dirname, "../dist")
	},
	resolve: {
		extensions: [".js", ".jsx", ".css", ".scss", ".tsx", ".ts"],
		alias: {
			"src": path.resolve(process.cwd(), "src"),
		}
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				// 使用 'style-loader','css-loader'
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer'),
							]
						}
					},
					'sass-loader',
				]
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-stage-0",
							// "@babel/plugin-transform-runtime",
						]
					}
				},
				exclude: path.resolve(process.cwd(), "node_modules")
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)/,
				use: {
					loader: 'url-loader',
					options: {
						outputPath: 'images/', // 图片输出的路径
						limit: 10 * 1024
					}
				}
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].min.[ext]',
							limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
							publicPath: 'fonts/',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ // 生成html文件
			filename: 'index.html', // 最终创建的文件名
			template: path.resolve(process.cwd(), "public/index.html"), // 指定模板路径
		}),
		new webpack.HotModuleReplacementPlugin(), // 对文件实现热更新
	],
}