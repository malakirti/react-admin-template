/**
 * status 可选，默认`200`
 * data 响应的数据，真正的响应数据会被包装，详情见`server.js`
 */
const test = require('./test');

module.exports = {
	...test,
};
