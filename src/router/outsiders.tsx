import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import load from '@/utils/load';
import { IRouterConfig } from '@/utils/render-routes';

/**
 * 无公共功能组件路由列表
 * @description 此部分路由理论上不需要鉴权，如果需要请自行添加，渲染入口再`src/app.tsx`
 */
const outsiders: IRouterConfig[] = [
	{
		path: '/login',
		component: load(() => import('@/pages/login')),
		meta: { title: '用户登录', icon: <LoginOutlined />, showInTabs: false },
	},
	{
		path: '/permission-denied',
		component: load(() => import('@/pages/errors/403')),
		meta: { title: '无系统访问权限', icon: <LoginOutlined />, showInTabs: false },
	},
];

export default outsiders;
