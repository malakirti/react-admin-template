/**
 * 为了与生产行为一致（参考build.js注释）此处用 BUILD_ENV 接管 NODE_ENV 并对其重新赋值
 */
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('../utils/checkers');

const path = require('path');
const open = require('open');
const chalk = require('chalk');
const address = require('address');
const express = require('express');
const webpack = require('webpack');
const portFinder = require('portfinder');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('../config');
const webpackDevConfig = require('./webpack/webpack.dev.config');
const { printInstructions } = require('../utils/printer');
const compiler = webpack(webpackDevConfig);

const devMiddleware = WebpackDevMiddleware(compiler, {
	stats: 'minimal',
	serverSideRender: false,
	publicPath: webpackDevConfig.output.publicPath,
});
const hotMiddleware = WebpackHotMiddleware(compiler, {
	log: (msg) => console.log(`${chalk.magenta('[WebpackHotMiddleware]')} ${chalk.green(msg)}`),
});

const app = express();

app.use('/', require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(path.resolve(process.cwd(), './public')));

Object.keys(config.proxy).forEach((context) => {
	let options = config.proxy[context];
	if (typeof options === 'string') {
		options = { target: options };
	}
	app.use(context, createProxyMiddleware(options.filter || context, options));
});

portFinder
	.getPortPromise({
		port: config.port,
	})
	.then((port) => {
		app.listen(port, config.hostName, () => {
			let firstTapDone = false;
			const localUrl = `http://localhost:${port}`;
			const networkUrl = `http://${address.ip()}:${port}`;

			compiler.hooks.done.tap('done', () => {
				printInstructions(localUrl, networkUrl);
				if (!firstTapDone) {
					firstTapDone = true;
					open(localUrl);
				}
			});
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
