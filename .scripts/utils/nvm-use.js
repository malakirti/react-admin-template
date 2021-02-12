const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const semver = require('semver');
const shell = require('shelljs');
const paths = require('../config/paths');
const { enginesRequired } = require('../config');

shell.config.silent = true;

try {
	if (!shell.which('nvm')) {
		return;
	}

	const nvmRcPath = path.resolve(paths.appRootPath, '.nvmrc');

	if (!fs.existsSync(nvmRcPath)) {
		return;
	}

	let needNodeVersion = fs.readFileSync(nvmRcPath, 'utf8').replace(/\r?\n/mg, '').trim();

	if (semver.satisfies(process.versions.node, needNodeVersion)) {
		return;
	}

	const installedVersions = [];
	shell.exec('nvm ls').toString().replace(/\r?\n\s*\*?\s*((\d+\.?)+)/mg, ($1, $2) => {
		installedVersions.push($2);
	});

	// 无指定版本就从安装列表随便匹配一个
	if (!installedVersions.includes(needNodeVersion)) {
		needNodeVersion = installedVersions.find(v => semver.satisfies(v, enginesRequired.node));
	}

	if (!needNodeVersion) {
		return;
	}

	const nvmLog = shell.exec(`nvm use ${needNodeVersion}`).toString();

	console.log(chalk.bold.yellowBright(nvmLog.toString()));
} catch (e) {
	console.log(e);
}
