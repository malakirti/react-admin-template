const { getThemeVariables } = require('antd/dist/theme');

// https://ant.design/docs/react/customize-theme-cn
module.exports = {
	enable: true,
	antdThemeVars: {
		...getThemeVariables({
			dark: false,
			compact: false,
		}),
		// 其他变量，eg.
		// 'primary-color': '#f90',
		// 'layout-header-background': '#1f1f1f',
		// 'menu-dark-bg': '#1f1f1f',
		// 'menu-popup-bg': '#1f1f1f',
		// 'menu-dark-inline-submenu-bg': '#141414',
	},
};
