import React from 'react';
import { configure } from 'mobx';
import { Provider, ProviderProps, enableStaticRendering } from 'mobx-react';
import config from '@/config';
import store from './store';

if (config.isUseSSR) {
	enableStaticRendering(true);
}

if (config.isDevelopment) {
	configure({ enforceActions: 'observed' });
}

function MobxProvider(props: ProviderProps): React.ReactElement {
	return <Provider {...store}>{props.children}</Provider>;
}

export default MobxProvider;
