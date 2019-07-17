
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
let Config = {
	Serverport: "4000",
	IPv4: IPAdress
}
module.exports = Config