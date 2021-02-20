/**
 * 划水处 push 防呆
 */
const os = require('os');
const chalk = require('chalk');

if (/DD|DT/i.test(os.hostname()) || /3/.test(os.userInfo().username)) {
	console.log(chalk.redBright.bold.bgBlackBright('\n • 胆儿肥了啊\n'));
	process.exit(1);
}

console.log(chalk.green('\n半壁翻云刃，满江酩酊红。千古光阴一霎时，且醉浪涛中！\n'));
