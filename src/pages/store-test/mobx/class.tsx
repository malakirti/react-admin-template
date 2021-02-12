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

@inject('system', 'global')
@observer
export default class MobxTestC extends React.Component<IProps> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	onHandleClick = () => {
		const {
			global: { permissions },
		} = this.props;

		let list;
		if (permissions.includes('李四')) {
			list = permissions.filter((p) => p !== '李四');
		} else {
			list = [...permissions, '李四'];
		}

		this.props.global.setPermissions(list);
	};

	render(): React.ReactElement {
		const {
			system: { systemName },
			global: { permissions },
		} = this.props;

		return (
			<Card>
				<p>我是mobx类组件</p>
				<h1>{systemName}</h1>

				<div style={{ margin: '10px 0' }}>
					当前拥有的权限：
					{JSON.stringify(permissions)}
				</div>

				<Button type="primary" onClick={this.onHandleClick}>
					点击切换权限
				</Button>

				<PermissionTest />
			</Card>
		);
	}
}
