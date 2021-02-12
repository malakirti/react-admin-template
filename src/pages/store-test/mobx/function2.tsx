import React from 'react';
import { Card, Button } from 'antd';
import { MobXProviderContext, Observer } from 'mobx-react';
import PermissionTest from './components/perssion-test';

export interface IProps {
	system: {
		systemName: string;
	};
	global: {
		permissions: string[];
		setPermissions: (permissions: string[]) => void;
	};
}

const MobxTestF: React.FC = () => {
	const mpc = React.useContext(MobXProviderContext) as IProps;

	function onHandleClick(): void {
		const { permissions } = mpc.global;

		let list;
		if (permissions.includes('张三')) {
			list = permissions.filter((p) => p !== '张三');
		} else {
			list = [...permissions, '张三'];
		}

		mpc.global.setPermissions(list);
	}

	return (
		<Observer>
			{() => {
				const {
					system: { systemName },
					global: { permissions },
				} = mpc;

				return (
					<Card>
						<p>我是mobx函数组件2</p>
						<h1>{systemName}</h1>

						<div style={{ margin: '10px 0' }}>
							当前拥有的权限：
							{JSON.stringify(permissions)}
						</div>

						<Button type="primary" onClick={onHandleClick}>
							点击切换权限
						</Button>

						<PermissionTest />
					</Card>
				);
			}}
		</Observer>
	);
};

export default MobxTestF;
