const chalk = require('chalk');
const semver = require('semver');
const webpack = require('webpack');
const childProcess = require('child_process');

const envs = ['development', 'test', 'production'];
const NODE_ENV = process.env.NODE_ENV;
const BUILD_ENV = process.env.BUILD_ENV;
const { enginesRequired } = require('../config');
const currentNodeVersion = process.version;
const requiredNodeVersion = enginesRequired.node;

const boldYellowBright = (str) => chalk.bold(chalk.yellowBright(str));

function spawn(command, args, opts) {
	return new Promise((resolve, reject) => {
		const child = childProcess.spawn(
			command,
			args,
			Object.assign({ stdio: 'inherit', env: process.env }, opts),
		);
		child.once('error', (err) => {
			console.log(err);
			reject(err);
		});
		child.once('close', (code) => {
			if (code === 1) {
				process.exit(1);
			} else {
				resolve();
			}
		});
	});
}

// exec
function execSync(cmd, options) {
	return childProcess.execSync(cmd, options).toString().trim();
}

// Node Version
function nodeVersionCheck() {
	if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
		console.log(
			chalk.yellow(
				` 你当前${chalk.red('Node')}版本${chalk.red(currentNodeVersion)}，期望${chalk.red(
					'Node',
				)}版本${chalk.red(requiredNodeVersion)}`,
			),
		);
		console.log(chalk.yellow(` 点击右侧连接下载新版: https://nodejs.org/zh-cn/`));
		console.log(chalk.yellow(` 也可以使用nvm管理Node版本: https://github.com/nvm-sh/nvm`));
		console.log();
		process.exit(1);
	}
}

// BUILD_ENV
function buildEnvCheck() {
	if (!BUILD_ENV) {
		console.log(
			chalk.red(
				` 缺少必要构建参数${chalk.bold(chalk.yellowBright('BUILD_ENV'))}，请检查构建命令是否正确`,
			),
		);
		console.log();
		process.exit(1);
	}
}

// NODE_ENV
function nodeEnvCheck() {
	if (!envs.includes(NODE_ENV)) {
		console.log(
			chalk.red(
				` 环境变量${boldYellowBright(NODE_ENV)}值无效，${boldYellowBright(
					envs.join(', '),
				)}为${boldYellowBright('NODE_ENV')}可选项`,
			),
		);
		console.log();
		process.exit(1);
	}
}

// webpack compiler
function webpackBuilder(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				reject(err);
			}

			const message = stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false,
			});

			if (stats.hasErrors()) {
				reject(message);
			}

			resolve(message);
		});
	});
}

module.exports = {
	spawn,
	execSync,
	nodeVersionCheck,
	buildEnvCheck,
	nodeEnvCheck,
	webpackBuilder,
};
