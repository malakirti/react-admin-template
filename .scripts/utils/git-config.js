/**
 * 电脑经常换，为了方便暂且这么处理了，稳定之后删除
 */
const chalk = require('chalk');
// const inquirer = require('inquirer');
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

	// inquirer
	// 	.prompt({
	// 		name: 'confirm',
	// 		prefix: chalk.yellow(` 提示: ${chalk.grey('作者自用,请在`postinstall`中删除此段脚本!')}\n`),
	// 		message: `是否修改git config为: user.name(${chalk.cyan(name)})/user.email(${chalk.cyan(
	// 			email,
	// 		)})?`,
	// 		type: 'confirm',
	// 		default: false,
	// 	})
	// 	.then(({ confirm }) => {
	// 		if (confirm) {
	// 			execSync(`git config user.name ${name}`);
	// 			execSync(`git config user.email ${email}`);
	// 		}
	//
	// 		console.log();
	// 		console.log(chalk.grey(`• current git config user.name: ${execSync('git config user.name')}`));
	// 		console.log(chalk.grey(`• current git config user.email: ${execSync('git config user.email')}`));
	// 		console.log();
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
}
