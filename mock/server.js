/**
 * 一个简单的mock服务，为便于控制台检索，统一加`/mock`前缀
 * 启动与项目独立，如需mock请手动配置
 */
const fs = require('fs');
const chalk = require('chalk');
const morgan = require('morgan');
const express = require('express');
const address = require('address');
const portfinder = require('portfinder');

const apis = require('./apis');

function routerHelper(method = 'get', req, res, next) {
	const value = apis[`${method.toUpperCase()} ${req.path.replace(/^\/mock/, '')}`];
	// value为falsy认为没有配置此mock
	if (!value) {
		res.status(404);
		res.set('Content-Type', 'application/json;charset=UTF-8')
		res.json({
			code: 404,
			success: false,
			message: `not fond error: api [${req.path}] is not defined`,
			data: null,
		});
		return void 0;
	}
	// 如果是函数
	if (typeof value === 'function') {
		value(req, res, next);
		return void 0;
	}

	if (typeof value === 'object') {
		const { status = 200, $data } = value;
		res.status(status);
		res.set('Content-Type', 'application/json;charset=UTF-8')
		res.json($data ? {
			code: status,
			success: true,
			message: '',
			data: $data,
		} : value);
	}
}

const app = express();
const router = express.Router();

router.use((req, res, next) => {
	console.log(chalk.gray(`[Time: ${new Date().toLocaleString()}]`));
	next();
});

app.use(morgan('short'));

router.get('/', (req, res) => {
	res.send('Hello Simple Mock Server');
});

router.get('/mock/*', (req, res, next) => {
	routerHelper('get', req, res, next);
});

router.post('/mock/*', (req, res, next) => {
	routerHelper('post', req, res, next);
});

// router.get('/*', (req, res, next) => {
// 	routerHelper('get', req, res, next);
// });
//
// router.post('/*', (req, res, next) => {
// 	routerHelper('post', req, res, next);
// });

app.use(router);

portfinder
	.getPortPromise()
	.then(port => {
		app.listen(port, () => {
			const localUrl = `http://localhost:${port}`;
			const networkUrl = `http://${address.ip()}:${port}`;

			console.log();
			console.log(chalk.gray(' Mock Server running at:'));
			console.log(` ${chalk.bold(`${chalk.green('✔')} Local:`)}   ${chalk.blue(localUrl)}`);
			console.log(` ${chalk.bold(`${chalk.green('✔')} Network:`)} ${chalk.blue(networkUrl)}`);
			console.log();
		});
	});
