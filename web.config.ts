/*
 * @Author: Mr.zheng
 * @Date: 2019-07-17 10:10:00
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-07-29 14:56:07
 * @Description: webpack配置文件
 */
const path = require('path')
const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
var IPAdress = '';
for (var devName in interfaces) {
	var iface = interfaces[devName];
	for (var i = 0; i < iface.length; i++) {
		var alias = iface[i];
		if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
			IPAdress = alias.address;
		}
	}
}
// interface overalSituationConfig{
// 	Serverport: String,
// 	IPv4: String,
// 	developmentModel: String,
// 	ComponentLibrary: String,
// 	vendor: Array<String>
// }

let Config = {
	Serverport: "4000", 							// 端口
	IPv4: IPAdress, 								// 本地IP地址
	developmentModel: 'h5',							// 开发类型   h5 || pc 【没用！！】
	ComponentLibrary: 'antd-mobile',				// 使用的UI组件   antd-mobile || antd
	vendor: ['react'],                              // 对第三方包分包配置
	alias: {
		"src": path.resolve(process.cwd(), 'src'),  // 配置别名
		"components": path.resolve(process.cwd(), 'src', 'components')
	}
}
module.exports = Config
