import React, { useState } from 'react';
import { Menu } from 'antd';
import { MenuMode } from 'antd/lib/menu';
import { useLocation, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import useEnhancedEffect from '@/utils/use-enhanced-effect';
import { RootState } from '@/redux/store';
import { IRouterConfig } from '@/utils/render-routes';
import routes from '@/router';
import { SelectInfo } from '@/interface/menu';
import { checkPermissions } from '@/utils/functions';
import { getParentsRouteByPath } from '@/utils/temporal';

// import s from './index.module.less';

export interface IProps {
	mode?: MenuMode;
	collapsed?: boolean;
}

const { Item: MenuItem, SubMenu } = Menu;

const GlobalMenu: React.FC<IProps> = (props: IProps) => {
	const location = useLocation();
	const history = useHistory();
	const [openKeys, setOpenKeys] = useState<React.Key[]>([]);
	const permissions = useSelector((state: RootState) => state.global.permissions);

	useEnhancedEffect(() => {
		if (!props.collapsed) {
			const pathname = location.pathname.replace(/\/$/, '');
			const parents = getParentsRouteByPath(routes, pathname, 'children', 'path') as IRouterConfig[] || [];
			setOpenKeys(parents.map((item) => item.path));
		}
	}, [location.pathname]);

	function onHandleMenuSelect(item: SelectInfo): void {
		if (location.pathname !== item.key) {
			history.push(`${item.key}`);
		}
	}

	function renderMenuItem(list?: IRouterConfig[]): null | (null | React.ReactElement)[] {
		if (!Array.isArray(list) || !list.length) {
			return null;
		}
		return list
			.map((route) => {
				const subRoutes = route.children?.filter((item) => item && !item.meta?.hidden);
				const hasSubMenu = subRoutes?.length;

				// route.children为空会认为是有效的菜单，再判断
				// 此处值判断route.children非空且全部hidden返回null
				if (route.children?.length && !hasSubMenu) {
					return null;
				}

				const authorities = route.meta?.authorities;
				if (!checkPermissions(permissions, authorities, route.meta?.some)) {
					return null;
				}

				if (hasSubMenu) {
					return (
						<SubMenu key={route.path} title={route.meta?.title} icon={route.meta?.icon}>
							{renderMenuItem(subRoutes)}
						</SubMenu>
					);
				}

				return (
					<MenuItem key={route.path} icon={route.meta?.icon}>
						{route.meta?.title}
					</MenuItem>
				);
			})
			.filter(Boolean);
	}

	return (
		<Menu
			style={{ width: '100%' }}
			theme="dark"
			mode={props.mode || 'inline'}
			inlineIndent={12}
			focusable
			openKeys={openKeys as string[]}
			onOpenChange={(keys) => setOpenKeys(keys)}
			selectedKeys={[location.pathname]}
			onClick={onHandleMenuSelect}
		>
			{renderMenuItem(routes.filter((item) => item && !item.meta?.hidden))}
		</Menu>
	);
};

export default GlobalMenu;
