const fs = require('fs');
const path = require('path');

const rootDirectory = fs.realpathSync(process.cwd());
const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
const resolvePath = (relativePath, root = rootDirectory) => path.resolve(root, relativePath);
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find((extension) =>
		fs.existsSync(resolveFn(`${filePath}.${extension}`)),
	);

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

const buildTarget = process.env.BUILD_TARGET;

module.exports = {
	// global
	appRootPath: resolvePath('.'),
	appDistPath: resolvePath('dist'),
	appBuildPath: resolvePath('build'),
	appRootPkgJson: resolvePath('package.json'),
	appJsConfig: resolvePath('jsconfig.json'),
	appTsConfig: resolvePath('tsconfig.json'),
	appEslintConfig: resolvePath('.eslintrc.js'),
	appNodeModules: resolvePath('node_modules'),

	// electron
	appElectronConfigPath: resolvePath('electron.config.js'),
	appElectronSrc: resolvePath('main'),
	appElectronDevEntry: resolveModule(resolvePath, 'main/index.dev'),
	appElectronEntry: resolveModule(resolvePath, 'main/index'),
	appElectronPublicAssetsPath: resolvePath('public/main'),
	appElectronDistPath: resolvePath('build/main'),
	appElectronDistPublicPath: resolvePath('build/main/public'),
	appElectronReleasePath: resolvePath('release'),

	// web
	appPublicAssetsPath: resolvePath('public/render'),
	favicon: resolvePath('public/render/favicon.ico'),
	appHtml: resolvePath('public/render/index.html'),
	spriteSvgPath: resolvePath('src/assets/svg-sprite'),
	appWebSrc: resolvePath('src'),
	appWebEntry: resolveModule(resolvePath, 'src/index'),
	appDllPath: resolvePath('node_modules/.cache/dll-plugin'),
	appWebDistPath: buildTarget === 'electron' ? resolvePath('build/render') : resolvePath('dist'),
	globalLessVariables: resolvePath('src/styles/variables/*.less'),
	globalLessMixins: resolvePath('src/styles/mixins/*.less'),
};
