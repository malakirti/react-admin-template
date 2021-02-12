const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const { dllConfig } = require('../../config');
const paths = require('../../config/paths');
const webpackBaseConfig = require('./webpack.base.config');

const dllScriptExists = fs.existsSync(path.resolve(paths.appDllPath, dllConfig.filename));
const dllJsonExists = fs.existsSync(path.resolve(paths.appDllPath, dllConfig.manifest));
const canUseDll = dllScriptExists && dllJsonExists;

const webpackDevConfig = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	output: {
		publicPath: '/',
		filename: '[name]-[hash:8].js',
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		canUseDll &&
			new webpack.DllReferencePlugin({
				context: __dirname,
				manifest: require(path.resolve(paths.appDllPath, dllConfig.manifest)),
			}),
		canUseDll &&
			new AddAssetHtmlWebpackPlugin({
				filepath: require.resolve(path.resolve(paths.appDllPath, dllConfig.filename)),
			}),
	].filter(Boolean),
	optimization: {
		namedModules: true,
		noEmitOnErrors: true,
	},
};

const config = webpackMerge(webpackBaseConfig, webpackDevConfig);

Object.keys(config.entry).forEach(function (name) {
	// config.entry[name].unshift('webpack-hot-middleware/client?timeout=200&overlay=true&reload=true');

	// electron主进程编译时提示订阅，如不使用electron，可以使用上面那行，本质没什么区别
	config.entry[name].unshift(path.resolve(__dirname, '../../enhance/webpack-hot-middleware'));

	// react-hot-loader
	config.entry[name].unshift('react-hot-loader/patch');
});

module.exports = config;
