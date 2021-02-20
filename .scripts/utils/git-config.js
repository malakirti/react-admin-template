/**
 * 划水处 commit 防呆
 */
const chalk = require('chalk');
const { execSync } = require('./functions');
const {
	author: { name, email },
} = require('../../package.json');

const currentName = execSync('git config user.name');
const currentEmail = execSync('git config user.email');

if (currentName !== name || currentEmail !== email) {
	// 为防止postinstall时不能修改成功，不使用确认直接修改
	execSync(`git config user.name ${name}`);
	execSync(`git config user.email ${email}`);

	console.log(chalk.grey(`• current git config user.name: ${execSync('git config user.name')}`));
	console.log(chalk.grey(`• current git config user.email: ${execSync('git config user.email')}`));
	// 在pre-commit阶段时修改，第一次需要返回错误，下一次方可commit
	process.exit(1);
}
