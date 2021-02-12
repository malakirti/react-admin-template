/**
 * 含公共功能组件路由列表
 *
 * key 			   				{String}   			key
 * path 			   			{String}   			路由地址
 * exact 			   			{Boolean}  			精确匹配，如果存在子路由，父级路由必须为true。默认: false
 * strict 			   		{Boolean}  			严格匹配，是否考虑尾部斜杠。默认: false
 * sensitive 			   	{Boolean}  			是否区分大小写匹配。默认: false
 * redirect 			   	{String}   			重定向路由地址。
 * render 			   		{Function}
 * component 			   	{ReactElement}
 * 其他扩展字段
 * meta 			   			{Object}   			元数据
 * meta?.title   			{[]} 						菜单标题，同时会作为网页标题，如不能满足请自行扩展字段
 * meta?.icon    			{String}   			icon
 * meta?.pin     			{Boolean}  			是否固定在标签栏。默认: false
 * meta?.cache   			{Boolean}  			是否被缓存，类似Vue。@todo
 * meta?.hidden  			{Boolean}  			是否被从导航栏隐藏，如果为true，同时不会被添加到tabs栏，父级隐藏所有子级也会隐藏。默认: false
 * meta?.showInTabs		{Boolean}  			是否被添加到tabs栏，优先级高于hidden。默认: true
 * meta?.some					{Boolean}				鉴权逻辑，authorities满足其一即为有权限。默认为false。
 * meta?.authorities	{Boolean}				权限列表。
 * meta?.fallback			{Boolean}				无权限回退页面。默认"/403"
 * @type {*[]}
 */
import React from 'react';
import {
	DesktopOutlined,
	DashboardOutlined,
	VerifiedOutlined,
	FieldNumberOutlined,
	ApiOutlined,
	AlertOutlined,
} from '@ant-design/icons';

import load from '@/utils/load';
import { IRouterConfig } from '@/utils/render-routes';
import { flatRouterList } from '@/utils/functions';
import tests from './tests';

const routes: IRouterConfig[] = [
	{
		path: '/',
		exact: true,
		component: load(() => import('@/pages/home')),
		meta: { title: '首页', icon: <DesktopOutlined />, hidden: true, showInTabs: false, pin: false },
	},
	{
		path: '/dashboard',
		exact: true,
		component: load(() => import('@/pages/dashboard')),
		// eslint-disable-next-line max-len
		meta: { title: '工作台', icon: <DashboardOutlined />, showInTabs: true, pin: true, authorities: ['admin'] }, // admin权限
	},
	{
		path: '/errors',
		exact: true,
		component: null,
		redirect: '/errors/403',
		meta: { title: 'errors', icon: <AlertOutlined /> },
		children: [
			{
				path: '/errors/403',
				component: load(() => import('@/pages/errors/403')),
				meta: { title: '无当前页面权限', icon: <VerifiedOutlined />, showInTabs: false },
			},
			{
				path: '/errors/404',
				component: load(() => import('@/pages/errors/404')),
				meta: { title: '访问出错了~', icon: <FieldNumberOutlined />, showInTabs: false },
			},
			{
				path: '/errors/500',
				component: load(() => import('@/pages/errors/500')),
				meta: { title: '服务端错误', icon: <ApiOutlined />, showInTabs: false },
			},
		],
	},
	...tests,
	{
		path: '/refresh',
		component: load(() => import('@/pages/refresh')),
		meta: { title: '正在刷新...', icon: null, hidden: true, showInTabs: false },
	},
	{
		path: '/*',
		component: load(() => import('@/pages/errors/404')),
		meta: { title: '/*', icon: null, hidden: true, showInTabs: false },
	},
];

export const flattedRoutes = flatRouterList(routes);

export default routes;
