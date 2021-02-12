/**
 * 此处代理在生产环境无效，仅对本地开发环境有效
 */
const proxyTable = {
	'/mock': {
		target: 'http://localhost',
		changeOrigin: true,
		pathRewrite: {
			'^/mock': '/mock',
		},
	},
	'/api': {
		target: 'http://localhost:10086',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '/api',
		},
	},
};

module.exports = proxyTable;
