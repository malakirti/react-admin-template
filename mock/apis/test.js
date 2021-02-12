/**
 * 此仅为示例，根据实际项目后端接口规范修改，示例仅为get、post方法，其他同理
 * status: 可选，默认`200`，会作为`http status code`返回
 * data: 响应的数据，真正的响应数据会被包装一层，详情见`server.js`
 *
 * @description 自定义对象即便引入`mockjs`也只生成一次，自定义函数每次请求都会得到新的`mock data`
 */
const mockjs = require('mockjs');

module.exports = {
	'GET /test': null, // 注意此`api`无效，同理 凡是为`falsy`的值都认为是无效配置
	'GET /test1': {
		$data: {
			type: 'mock-test1',
			message: 'test1 mock',
		},
	},
	'GET /test2': {
		$data: {
			type: 'mock-test2',
			userInfo: mockjs.mock({
				id: '@id',
				name: mockjs.Random.cname(),
				'age|18-35': 20,
				avatar: mockjs.Random.image('200x200'),
				address: mockjs.Random.county(true),
				motto: mockjs.Random.csentence(),
			}),
			message: 'test2 mock',
		},
	},
	'GET /test3': (req, res) => {
		setTimeout(() => {
			res.json({
				code: 200,
				success: true,
				message: 'test3 mock',
				data: mockjs.Random.cname(),
			});
		});
	},

	'POST /test': null, // 注意此`api`无效，同理 凡是为`falsy`的值都认为是无效配置
	'POST /test1': {
		$data: {
			type: 'mock-test1',
			message: 'test1 mock',
		},
	},
	'POST /test2': {
		$data: {
			type: 'mock-test2',
			userInfo: mockjs.mock({
				id: '@id',
				name: mockjs.Random.cname(),
				'age|18-35': 20,
				avatar: mockjs.Random.image('200x200'),
				address: mockjs.Random.county(true),
				motto: mockjs.Random.csentence(),
			}),
			message: 'test2 mock',
		},
	},
	'POST /test3': (req, res) => {
		setTimeout(() => {
			res.json({
				code: 200,
				success: true,
				message: 'test3 mock',
				data: mockjs.Random.cname(),
			});
		});
	},
};
