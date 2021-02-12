/**
 * mobx store入口
 * store文件使用 module.exports 导出，下面代码使用 context(key) 属性
 * store文件使用 export default 导出，下面代码使用 context(key).default 属性
 * 注：建议使用一种导出模式，方便以后全局变更修改适配，根据喜好自行选择
 */

const store: { [key: string]: any } = {};
store.pages = {};

const context = require.context('.', true, /\.ts$/);
const keys = context.keys().filter((item: string) => item !== './index.ts');

keys.forEach((key: string) => {
	const pathKeys = key.replace(/\.\//, '').replace(/\.ts$/g, '').split('/');
	// eslint-disable-next-line max-len
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,no-underscore-dangle
	const module = context(key).__esModule ? context(key).default : context(key);

	if (pathKeys.length === 1) {
		if (pathKeys[0] === 'pages') {
			throw new Error('pages已被文件夹占用，请更换文件名');
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		store[pathKeys[0]] = module;
	}

	// 页面级store全部挂载在pages对象下
	// 不过不建议页面级store写在此文件夹下，建议写在具体页面所在目录
	if (pathKeys.length === 2) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
		store.pages[pathKeys[1]] = module;
	}

	if (pathKeys.length > 2) {
		throw new Error('pages文件夹下不支持创建文件夹，如必须创建请自行修改此文件相关处理逻辑');
	}
});

export default store;
