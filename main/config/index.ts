const { APP_NAME: name, APP_VERSION: version, ELECTRON_PACKED } = process.env;

export default {
	name,
	version,
	packed: ELECTRON_PACKED === '1',
};
