import React from 'react';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';
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

const MobxTestF: React.FC<IProps> = (props: IProps) => {
	function onHandleClick(): void {
		const { permissions } = props.global;

		let list;
		if (permissions.includes('李四')) {
			list = permissions.filter((p) => p !== '李四');
		} else {
			list = [...permissions, '李四'];
		}

		props.global.setPermissions(list);
	}

	const {
		system: { systemName },
		global: { permissions },
	} = props;

	return (
		<Card>
			<p>我是mobx函数组件1</p>
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
};

export default inject('system', 'global')(observer(MobxTestF));
