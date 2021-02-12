const chalk = require('chalk');
const { printName, printEnvironment } = require('./printer');
const { nodeVersionCheck, buildEnvCheck, nodeEnvCheck } = require('./functions');

// logo
printName();

// Node Version
nodeVersionCheck();

// BUILD_ENV
buildEnvCheck();

// NODE_ENV
nodeEnvCheck();

console.log(chalk.gray(` 本次运行参数:`));
// env
printEnvironment();
console.log();
