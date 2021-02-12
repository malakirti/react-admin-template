const os = require('os');
const chalk = require('chalk');
const figlet = require('figlet');
const { capitalCase } = require('change-case');
const { execSync } = require('./functions');
const { name, version, gitBranch, gitCommitHash, buildTarget } = require('../config');

function printName() {
	const cols = process.stdout.columns;
	try {
		if (cols < 104) {
			console.log(` ${chalk.yellowBright(capitalCase(name))}`);
			console.log();
		} else {
			console.log(chalk.grey(figlet.textSync(capitalCase(name))));
		}
	} catch (err) {
		console.log(err);
	}
}

function printEnvironment() {
	console.log(chalk.cyan(` name: ${chalk.yellow(name)}`));
	console.log(chalk.cyan(` version: ${chalk.yellow(version)}`));
	console.log(chalk.cyan(` branch: ${chalk.yellow(gitBranch)}`));
	console.log(chalk.cyan(` last commit: ${chalk.yellow(`${execSync('git log -1 --pretty=%s%b')} (${gitCommitHash})`)}`));

	console.log(chalk.cyan(` NODE_ENV: ${chalk.yellow(process.env.NODE_ENV)}`));
	console.log(chalk.cyan(` BUILD_ENV: ${chalk.yellow(process.env.BUILD_ENV)}`));
	console.log(chalk.cyan(` buildTarget: ${chalk.yellow(buildTarget)}`));

	console.log(chalk.cyan(` Node.js: ${chalk.yellow(process.version)}`));
	console.log(chalk.cyan(` OS: ${chalk.yellow(os.hostname(), os.type(), os.version(), os.platform(), os.arch())}`));
}

function printInstructions(localUrl, networkUrl) {
	console.log();
	console.log(chalk.gray(' Server running at:'));
	console.log(` ${chalk.bold(`${chalk.green('✔')} Local:`)}   ${chalk.blue(localUrl)}`);
	console.log(` ${chalk.bold(`${chalk.green('✔')} Network:`)} ${chalk.blue(networkUrl)}`);
	console.log();
}

function printStatsLog(proc, data) {
	let log = '';

	log += chalk.green.bold(`┏ ${proc} Process ${new Array(28 - proc.length).join('-')}`);
	log += '\n';

	if (typeof data === 'object') {
		data
			.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false,
			})
			.split(/\r?\n/)
			.forEach((line) => {
				line = line.replace(/\r?\n/gm, '');
				if (line) {
					log += '  ' + line + '\n';
				}
			});
	} else {
		log += `  ${data}\n`;
	}

	log += chalk.green.bold(`┗ ${new Array(36 + 1).join('-')}`) + '\n';

	console.log(log);
}

function printElectronLog(data, color) {
	let log = '';
	data = data.toString().split(/\r?\n/);
	data.forEach((line) => {
		line = line.replace(/\r?\n/gm, '').trim();
		if (line) {
			log += `  ${line}\n`;
		}
	});

	if (/[0-9A-z]+/.test(log)) {
		console.log(
			chalk[color].bold('┏ Electron ---------------------------') +
				'\n' +
				log.replace(/^(\r?\n)*/, '').replace(/(\r?\n)*&/, '') +
				chalk[color].bold('┗ ------------------------------------'),
		);
	}
}

module.exports = {
	printName,
	printEnvironment,
	printInstructions,
	printStatsLog,
	printElectronLog,
};
