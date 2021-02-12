/**
 * 为了与生产行为一致（参考build.js注释）此处用 BUILD_ENV 接管 NODE_ENV 并对其重新赋值
 */
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

process.on('unhandledRejection', (error) => {
	throw error;
});

const chalk = require('chalk');

// check
require('../utils/checkers');

console.log(chalk.yellowBright.bold(' @todo: 此功能还在施工中... 施工中... 中...\n'));

process.exit(1);

// @todo

