/**
 * electron configuration
 * @description 目前仅暴露electron-builder的全量配置
 */
const path = require('path');
const builder = require('electron-builder');
const ICON_ICO = path.resolve(__dirname, './public/main/icon/icon.ico');
const ICON_ICNS = path.resolve(__dirname, './public/main/icon/icon.icns');
const paths = require('./.scripts/config/paths');
const {
	npm_package_name: productName,
	npm_package_version: version,
	npm_package_author_name: authorName,
	npm_package_author_email: authorEmail,
} = process.env;

/**
 * For electron-builder
 * https://www.electron.build/configuration/configuration#configuration
 * https://www.electron.build/auto-update.html#auto-updatable-targets
 */
const cliOptions = {
	targets: builder.Platform.WINDOWS.createTarget(),
	config: {
		productName,
		buildVersion: version,
		appId: 'com.react.electron.admin.template',
		asar: false, // @todo 注意: 为便于调试默认设为了false，生产环境建议为true
		/** Inject properties to `package.json` **/
		// extraMetadata: {
		// 	'[key: string]': 'string',
		// },
		copyright: `Copyright © ${new Date().getFullYear()} ${authorName}<${authorEmail}>`,
		/** 网速有问题使用镜像 **/
		// electronDownload: {
		// 	mirror: 'https://npm.taobao.org/mirrors/electron/',
		// },

		/**
		 * `package.json` and `**\node_modules\**\*` only production dependencies will be copied
		 * https://www.electron.build/configuration/contents.html#files
		 * 此模板不需要copy node_modules，如有需要参考文档自行配置
		 */
		files: ['build', 'package.json', '!**/node_modules/**/*'],
		directories: {
			buildResources: 'build/main/public/assets',
			output: path.join(paths.appElectronReleasePath, `${productName}-release-${version}`),
		},
		nsis: {
			oneClick: false,
			deleteAppDataOnUninstall: true,
			allowToChangeInstallationDirectory: true,
			artifactName: '${productName}_setup_${version}.${ext}',
		},
		win: {
			icon: ICON_ICO,
			/**
			 * 注意: 启用`nsis`全程不可出现中文目录，包括但不限于【项目存放目录】、【`C:\Users\yourname\**`】目录
			 * 因为报`could not find...`异常但文件又确实存在，所以这儿被坑了很久很久😂😂😂
			 * !include: could not find: "D:\那一夜此处是中文\react-admin-template\node_modules\app-builder-lib\templates\nsis\include\StdUtils.nsh"
			 */
			target: ['nsis'],
			// target: ['msi', 'nsis', 'zip'],
		},
		mac: {
			icon: ICON_ICNS,
			target: ['dmg', 'pkg', 'zip'],
		},
		dmg: {
			icon: ICON_ICNS,
			contents: [
				{ x: 130, y: 220, type: 'file' },
				{ x: 410, y: 220, type: 'link', path: '/Applications' },
			],
		},
		linux: {
			icon: ICON_ICNS,
			target: ['deb', 'rpm', 'AppImage'],
			category: 'Development',
		},
	},
};

module.exports = {
	cliOptions,
};
