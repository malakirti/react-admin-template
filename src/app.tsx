import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Container from '@/layout/container';
import ErrorBoundary from '@/components/error-boundary';
import BaseLayout from '@/layout/base-layout';
import { getRedirectsRoutes, renderRoutes } from '@/utils/render-routes';
import outsiders from '@/router/outsiders';
import '@/styles/index.less';

import MobxProvider from './mobx';
import ReduxProvider from './redux';

const App: React.FC = () => {
	return (
		// <BrowserRouter>
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				{/* @warn @todo 删除。此处仅是模板示例，真实项目请选择其一。⚠CAUTION: One of MobxProvider and ReduxProvider */}
				<MobxProvider>
					<ReduxProvider>
						<ErrorBoundary>
							<Container>
								<Switch>
									{getRedirectsRoutes(outsiders)}
									{renderRoutes(outsiders)}
									<BaseLayout />
								</Switch>
							</Container>
						</ErrorBoundary>
					</ReduxProvider>
				</MobxProvider>
			</ConfigProvider>
		</HashRouter>
		// </BrowserRouter>
	);
};

export default App;
