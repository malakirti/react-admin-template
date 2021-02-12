import React, { useState } from 'react';
import { Switch } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import config from '@/config';
import { RootState } from '@/redux/store';
import { getRedirectsRoutes, renderRoutesDeep } from '@/utils/render-routes';
import routes from '@/router';
import logo from '@/assets/icon/logo.png';

import GlobalMenu from './components/global-menu';
import GlobalBreadcrumb from './components/global-breadcrumb';
import HeaderRight from './components/header-right';
import TabsBar from './components/tabs-bar';
import s from './index.module.less';

const { Header, Sider, Content } = Layout;

const BaseLayout: React.FC = () => {
	const location = useLocation();
	const history = useHistory();
	const permissions = useSelector((state: RootState) => state.global.permissions);
	const [collapsed, setCollapsed] = useState(false);

	function onNavToRoot(): void {
		if (location.pathname !== '/') {
			history.push('/');
		}
	}

	return (
		<Layout id="app-container">
			<Sider className={s.appSider} collapsedWidth={48} collapsed={collapsed}>
				<div id="app-aside" className={s.appAside}>
					<div
						className={s.appAsideLogo}
						onClick={onNavToRoot}
					>
						{collapsed ? <img className={s.logo} src={logo} alt="logo"/> : config.appName}
					</div>
					<div className={s.asideMenu}>
						<GlobalMenu collapsed={collapsed} />
					</div>
					<div
						className={s.fold}
						onClick={(): void => {
							setCollapsed(!collapsed);
						}}
					>
						{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
					</div>
				</div>
			</Sider>
			<Layout>
				<Header className={s.appHeader}>
					<section className={s.headerMenu}>
						<TabsBar />
					</section>
					<HeaderRight />
				</Header>
				<GlobalBreadcrumb />
				<Content className={s.appRouterView}>
					<Switch>
						{getRedirectsRoutes(routes)}
						{renderRoutesDeep(routes, { permissions })}
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
