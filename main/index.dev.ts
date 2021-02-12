/**
 * Electron 开发 dev 环境入口
 */
import { app } from 'electron';
import electronLog from 'electron-log';
import electronDebug from 'electron-debug';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
	MOBX_DEVTOOLS,
} from 'electron-devtools-installer';
import { mark, performanceStart } from './utils/performance';

performanceStart();

mark('dev-start');

electronDebug({ showDevTools: false });

(async function dev() {
	await app.whenReady();

	/** ************** extensions start *************** */
	const results = await Promise.allSettled([
		installExtension(REACT_DEVELOPER_TOOLS),
		installExtension(REDUX_DEVTOOLS),
		installExtension(MOBX_DEVTOOLS),
	]);

	results.forEach((result) => {
		if (result.status === 'fulfilled') {
			electronLog.info(`Added Extension: ${result.value}`);
		}
		if (result.status === 'rejected') {
			electronLog.error('An error occurred when added extension: ', result.reason);
		}
	});
	/** ************** extensions end *************** */

	mark('dev-end');

	electronLog.info('Dev Ready');
})();
