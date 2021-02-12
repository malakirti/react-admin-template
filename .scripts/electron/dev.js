/**
 * 启动 Electron 开发环境
 * 如果不需要 Electron 又不想其留在项目中，在 `README.md` 中查看如何操作
 * 为了与生产行为一致（参考build.js注释）此处用 BUILD_ENV 接管 NODE_ENV 并对其重新赋值
 */
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
// process.env.BUILD_TARGET = 'electron'; // 见package.json

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('../utils/checkers');

const path = require('path');
const chalk = require('chalk');
const address = require('address');
const express = require('express');
const webpack = require('webpack');
const electron = require('electron');
const portFinder = require('portfinder');
const { spawn } = require('child_process');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('../config');
const paths = require('../config/paths');
const webpackMainProdConfig = require('./webpack/webpack.prod.config');
const webpackDevConfig = require('../web/webpack/webpack.dev.config');
const { printStatsLog, printElectronLog, printInstructions } = require('../utils/printer');

let electronProcess = null;
let isElectronManualRestarting = false;
let hotMiddleware = null;

function startRenderServer() {
	return new Promise(async (resolve, reject) => {
		const compiler = webpack(webpackDevConfig);

		const devMiddleware = WebpackDevMiddleware(compiler, {
			stats: 'minimal',
			serverSideRender: false,
			publicPath: webpackDevConfig.output.publicPath,
		});

		hotMiddleware = WebpackHotMiddleware(compiler, {
			log: (msg) => console.log(`${chalk.magenta('[HMW]')} ${chalk.green(msg)}`),
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
					config.port = port;

					let firstTapDone = false;
					const localUrl = `http://localhost:${port}`;
					const networkUrl = `http://${address.ip()}:${port}`;

					compiler.hooks.done.tap('done', () => {
						printInstructions(localUrl, networkUrl);

						if (!firstTapDone) {
							firstTapDone = true;
							resolve();
						}
					});
				});
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}

function startElectron() {
	return new Promise((resolve) => {
		electronProcess = spawn(electron, ['--inspect=5858', paths.appElectronDistPath], {
			env: Object.assign({}, process.env, {
				ELECTRON_DISABLE_SECURITY_WARNINGS: false, // electron的一些警告信息按需配置
				RENDER_DEV_HOST_NAME: config.hostName === '0.0.0.0' ? 'localhost' : config.hostName,
				RENDER_DEV_PORT: config.port,
			}),
		});

		electronProcess.stdout.on('data', (data) => {
			printElectronLog(data, 'cyan');
		});

		electronProcess.stderr.on('data', (data) => {
			printElectronLog(data, 'red');
		});

		electronProcess.on('close', (code) => {
			if (!isElectronManualRestarting) {
				process.exit(code || 1);
			}
		});

		resolve();
	});
}

function startMainWatcher() {
	return new Promise((resolve, reject) => {
		webpackMainProdConfig.entry.index.unshift(paths.appElectronDevEntry);

		let firstTapDone = false;
		const compiler = webpack(webpackMainProdConfig);

		compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
			printStatsLog('Main', chalk.cyan.bold('Main process compiling...'));
			if (hotMiddleware) {
				hotMiddleware.publish({ action: 'compiling' });
			}
			done();
		});

		compiler.watch({}, (err, stats) => {
			if (err) {
				console.log(err);
				return;
			}
			printStatsLog('Main', stats);
		});

		compiler.hooks.done.tap('done', (stats) => {
			if (hotMiddleware) {
				hotMiddleware.publish({ action: 'reload' });
			}

			if (stats.hasErrors()) {
				if (!firstTapDone) {
					printStatsLog('Main', stats);
					firstTapDone = true;
					reject(stats);
				}
				return;
			}

			if (electronProcess && electronProcess.kill) {
				isElectronManualRestarting = true;

				process.kill(electronProcess.pid);

				startElectron().then(() => {
					setTimeout(() => {
						isElectronManualRestarting = false;
					}, 10000);
				});
			}

			if (!firstTapDone) {
				firstTapDone = true;
				resolve();
			}
		});
	});
}

async function start() {
	await startMainWatcher();
	printStatsLog('Main', chalk.green('Main Process Ready'));

	await startRenderServer();
	printStatsLog('Render', chalk.green('Render Process Ready'));

	await startElectron();
	printStatsLog('Electron', chalk.green('Electron Process Ready'));
}

start().then(() => {
	printStatsLog('APP', chalk.green('All Ready'));
}).catch(() => {
	printStatsLog('Unknown', chalk.red('启动失败！请检查startRenderServer、startMainWatcher、startElectron是否有异常'));
	process.exit(1);
});
