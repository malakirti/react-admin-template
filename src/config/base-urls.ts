const { origin } = window.location;

export type IBuildEnvs = 'development' | 'test' | 'production';

export interface IBaseUrlsConfig {
	[key: string]: {
		development: string;
		test: string;
		production: string;
	}
}

/**
 * 多域统一管理，模式如下
 * 此处为base url配置，调用之处指定prefix将会使用对应配置，默认为api
 * 开发环境如果同域会被根目录下`dev.proxy.js`对应规则代理
 */
const baseUrls: IBaseUrlsConfig = {
	api: {
		development: origin,
		test: origin,
		production: origin,
	},
	trade: {
		development: origin,
		test: origin,
		production: origin,
	},
};

export default baseUrls;
