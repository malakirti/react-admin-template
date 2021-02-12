/**
 * 权限控制。此处取了mobx状态，redux见同级目录permission组件
 * @description 需要权限控制的UI视图可用此组件包裹，路由请移步`src/utils/render-routes.tsx`
 */
import React from 'react';
import { MobXProviderContext, Observer } from 'mobx-react';

export interface IProps {
	permission: string | string[] | { // 权限 或 权限列表 或 权限配置。当为数组，满足其中一项即认为有权限
		logic?: 'some' | 'every'; // 权限判断逻辑，默认为some
		checks: string | string[]; // 要检查的权限 或 权限列表
	}
	children: React.ReactElement;
}

const Authorization: React.FC<IProps> = (props: IProps) => {
	const { permission } = props;
	const mpc = React.useContext(MobXProviderContext) as {
		global: {
			permissions: string[];
		};
	};

	return (
		<Observer>
			{() => {
				const { permissions } = mpc.global;
				if (typeof permission === 'string') {
					if (!permissions.includes(permission)) {
						return null;
					}
					return props.children;
				}

				if (Array.isArray(permission)) {
					if (!permission.some((value) => permissions.includes(value))) {
						return null;
					}
					return props.children;
				}

				const { logic, checks } = permission;

				if (typeof checks === 'string' && !permissions.includes(checks)) {
					return null;
				}

				if (Array.isArray(checks)) {
					const authorized = logic === 'every'
						? checks?.every((value) => permissions.includes(value))
						: checks?.some((value) => permissions.includes(value));

					if (!authorized) {
						return null;
					}
				}
				return props.children;
			}}
		</Observer>
	);
};

export default Authorization;
