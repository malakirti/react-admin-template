export default function appInfo(log?: boolean): void {
	const env = <string>process.env.BUILD_ENV;
	const name = <string>process.env.APP_NAME;
	const version = <string>process.env.APP_VERSION;
	const gitBranch = <string>process.env.GIT_BRANCH;
	const gitCommitHash = <string>process.env.GIT_COMMIT_HASH;
	const prodBuildTime = <string>process.env.APP_BUILD_TIME;

	const isDev = env === 'development';
	const devUpdateTime = new Date().toLocaleString();
	const time = isDev ? `Refresh: ${devUpdateTime}` : `Build: ${prodBuildTime}`;

	if (log) {
		const style = 'padding:2px 4px;font-size:12px;font-weight:700';
		const br: (dir: string, size: number) => string = (dir: string, size: number) => {
			return `border-top-${dir}-radius:${size}px;border-bottom-${dir}-radius:${size}px`;
		};
		const nameStyle = `${style};color:#f90;background:#000;${br('left', 3)};`;
		const versionStyle = `${style};color:#fff;background:#007ec6;`;
		const envStyle = `${style};color:#fff;background:#3c1;`;
		const timeStyle = `${style};color:#fff;background:#dfb317;${br('right', 3)};`;

		window.console.log(
			`%c${name}%c${gitBranch}${isDev ? '' : `(${gitCommitHash})`}-v${version}%c${env}%c${time}`,
			nameStyle,
			versionStyle,
			envStyle,
			timeStyle,
		);
	}
}
