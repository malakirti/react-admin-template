const config = {
	appName: process.env.APP_NAME as string,
	isUseSSR: process.env.USE_SSR === 'true', // 保留，暂不支持此功能
	environment: process.env.BUILD_ENV,
	isDevelopment: process.env.BUILD_ENV === 'development',
	isProduction: process.env.BUILD_ENV === 'production',
	mainCookieName: 'react-admin-template',
};

export default config;
