const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { dllConfig } = require('../../config');
const { appDllPath, appRootPkgJson } = require('../../config/paths');
const { dependencies } = require(appRootPkgJson);

// 不被DllPlugin支持的包
const dllExcludePackages = [
	'electron',
	'@babel/runtime',
	'@babel/runtime-corejs3',
	'electron-log',
	'electron-updater'
];

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: {
		[dllConfig.entryKey]: Object.keys(dependencies).filter(
			(key) => !dllExcludePackages.includes(key),
		),
	},
	output: {
		path: appDllPath,
		filename: dllConfig.filename,
		library: dllConfig.library,
	},
	plugins: [
		new WebpackBar({
			profile: true,
		}),
		new CleanWebpackPlugin(),
		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(appDllPath, dllConfig.manifest),
			name: dllConfig.library,
		}),
	],
};
