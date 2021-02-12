/**
 * 自家 CI 对 NODE_ENV 传参不一定是development、test、production之一
 * 此处用 BUILD_ENV 接管，并将 NODE_ENV 强制赋值为 production
 */
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('../utils/checkers');

const chalk = require('chalk');
const rimraf = require('rimraf');
const { bundleAnalyzer } = require('../config');
const { appWebDistPath } = require('../config/paths');
const webpackProdConfig = require('./webpack/webpack.prod.config');
const { webpackBuilder } = require('../utils/functions');

// 配置有CleanWebpackPlugin，rimraf可以删除
rimraf(appWebDistPath, (err) => {
	if (err) throw err;

	console.log(chalk.yellowBright(` 构建目录【${appWebDistPath}】清理成功, 开始构建...`));

	webpackBuilder(webpackProdConfig)
		.then((res) => {
			// 启用webpack-bundle-analyzer不输出日志
			if (bundleAnalyzer) {
				console.log();
				console.log(`${chalk.bold.greenBright('✔')} ${chalk.greenBright('构建成功，可点击上方链接查看')}`);
				console.log();
				return;
			}
			console.log(chalk.green('------------------∽-★-∽--- 构建日志输出开始 ---∽-★-∽------------------'));
			console.log(`${res}`);
			console.log(chalk.green('------------------∽-★-∽--- 构建日志输出结束 ---∽-★-∽------------------'));
			console.log();
			console.log(` ${chalk.bold.greenBright('✔')} ${chalk.cyanBright(`构建完成！可在${chalk.greenBright(`【${appWebDistPath}】`)}目录查看或进行下一步操作`)}`);
			console.log();
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		});
});
