const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const threadLoader = require('thread-loader');
const postcssNormalize = require('postcss-normalize');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

threadLoader.warmup({}, ['babel-loader', 'css-loader', 'postcss-loader', 'less-loader']);

const {
	isUseSSR,
	nodeEnv,
	buildEnv,
	buildTarget,
	bundleAnalyzer,
	appPublicPath,
	useSourceMap,

	enableCache,

	name,
	version,
	gitBranch,
	gitCommitHash,
	buildTime,
} = require('../../config');
const paths = require('../../config/paths');
const isDevelopment = buildEnv === 'development';
const isProduction = buildEnv === 'production';
const canUseSourceMap = isProduction ? useSourceMap : true;

// antd theme
let antdThemeVars = {};
const antdThemeRcPath = path.resolve(paths.appRootPath, './.antdthemerc.js');
if (fs.existsSync(antdThemeRcPath)) {
	const antdThemeConfig = require(antdThemeRcPath);
	if (antdThemeConfig.enable) {
		antdThemeVars = antdThemeConfig.antdThemeVars;
	}
}

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
	const resourcePath = context.resourcePath.replace(/\\/g, '/');
	return `${resourcePath.split('/').slice(-5, -1).join('_')}__${localName}`;
}

function getStyleLoaders(useCssModule, isLessLoader) {
	const loaders = [
		isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
		require.resolve('thread-loader'),
		{
			loader: require.resolve('css-loader'),
			options: Object.assign({}, { sourceMap: useSourceMap }, useCssModule
				? {
					modules: isDevelopment
						? {
							getLocalIdent: getCSSModuleLocalIdent,
						}
						: true,
				}
				: {}),
		},
		{
			loader: require.resolve('postcss-loader'),
			options: {
				sourceMap: canUseSourceMap,
				postcssOptions: {
					plugins: [
						require.resolve('postcss-flexbugs-fixes'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
							},
							stage: 3,
						}),
						postcssNormalize(),
					],
				},
			},
		},
	];

	if (isLessLoader) {
		loaders.push(
			{
				loader: require.resolve('resolve-url-loader'),
				options: {
					sourceMap: canUseSourceMap,
					root: paths.appWebSrc,
				},
			},
			{
				loader: require.resolve('less-loader'),
				options: {
					sourceMap: canUseSourceMap,
					lessOptions: {
						modifyVars: antdThemeVars,
						javascriptEnabled: true,
					},
				},
			},
			{
				loader: require.resolve('style-resources-loader'),
				options: {
					patterns: [paths.globalLessVariables, paths.globalLessMixins],
					injector: 'append',
				},
			},
		);
	}
	return loaders;
}

const webpackBaseConfig = {
	// web or electron-renderer 如果想运行于浏览器，target设为web，同时请注意渲染线程代码
	target: buildTarget === 'electron' ? 'electron-renderer' : 'web',
	entry: {
		app: [paths.appWebEntry],
	},
	output: {
		globalObject: 'this',
		path: paths.appWebDistPath,
		publicPath: appPublicPath,
		pathinfo: !isProduction,
		filename: 'statics/scripts/[name]-[chunkhash:8].js',
		chunkFilename: 'statics/scripts/[name]-[chunkhash:8].chunk.js',
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				include: paths.appWebSrc,
				use: [
					require.resolve('thread-loader'),
					{
						loader: require.resolve('babel-loader'),
						options: {
							cacheDirectory: false,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: getStyleLoaders(false, false),
			},
			{
				test: /\.module\.css$/,
				exclude: /\.module\.css$/,
				use: getStyleLoaders(true, false),
			},
			{
				test: /\.less$/,
				exclude: /\.module\.less$/,
				use: getStyleLoaders(false, true),
			},
			{
				test: /\.module\.less$/,
				exclude: /node_modules/,
				use: getStyleLoaders(true, true),
			},
			{
				test: /\.(png|jpg|jpeg|bmp|gif)$/,
				loader: require.resolve('url-loader'),
				options: {
					limit: 10240,
					name: 'statics/assets/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\.svg$/,
				include: paths.spriteSvgPath,
				loader: require.resolve('svg-sprite-loader'),
				options: { symbolId: 'icon-[name]' },
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': paths.appWebSrc,
		},
	},
	plugins: [
		new WebpackBar({
			name: buildTarget === 'electron' ? 'Electron Render' : 'webpack',
			profile: true,
		}),
		new webpack.DefinePlugin({
			'process.env.USE_SSR': JSON.stringify(isUseSSR),
			'process.env.NODE_ENV': JSON.stringify(nodeEnv),
			'process.env.BUILD_ENV': JSON.stringify(buildEnv),
			'process.env.APP_NAME': JSON.stringify(name),
			'process.env.APP_VERSION': JSON.stringify(version),
			'process.env.GIT_BRANCH': JSON.stringify(gitBranch),
			'process.env.GIT_COMMIT_HASH': JSON.stringify(gitCommitHash),
			'process.env.APP_BUILD_TIME': JSON.stringify(buildTime),
		}),
		bundleAnalyzer && new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerPort: 'auto',
			reportTitle: `${buildTarget === 'electron' ? '渲染线程代码 - ' : ''}${name} - [${buildTime}]`,
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				enabled: true,
				async: isDevelopment,
				mode: 'write-references',
				configFile: paths.appTsConfig,
				diagnosticOptions: {
					syntactic: true,
					semantic: true,
					declaration: true,
					global: true,
				},
			},
		}),
		new ESLintWebpackPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			formatter: require.resolve('react-dev-utils/eslintFormatter'),
			eslintPath: require.resolve('eslint'),
			context: paths.appWebSrc,
			cache: enableCache,
			cwd: paths.appRootPath,
			resolvePluginsRelativeTo: __dirname,
		}),
		new StylelintPlugin({
			fix: true,
			cache: enableCache,
			quiet: true,
			context: paths.appWebSrc,
			files: ['**/*.(le|c)ss'],
		}),
		new AntdDayjsWebpackPlugin(),
		new HtmlWebpackPlugin(
			Object.assign(
				{},
				{
					inject: true,
					publicPath: appPublicPath,
					template: paths.appHtml,
					meta: {
						name,
						version,
						hash: gitCommitHash,
						time: buildTime,
					},
				},
				isProduction
					? {
							minify: {
								removeComments: true,
								collapseWhitespace: true,
								removeRedundantAttributes: true,
								useShortDoctype: true,
								removeEmptyAttributes: true,
								removeStyleLinkTypeAttributes: true,
								keepClosingSlash: true,
								minifyJS: true,
								minifyCSS: true,
								minifyURLs: true,
							},
					  }
					: undefined,
			),
		),
	].filter(Boolean),
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};

module.exports = webpackBaseConfig;
