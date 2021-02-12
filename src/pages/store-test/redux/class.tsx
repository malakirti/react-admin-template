import React from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import PermissionTest from './components/perssion-test';

export interface IProps {
	system: {
		systemName: string;
	};
	global: {
		permissions: string[];
	};
	setPermissions: (permissions: string[]) => void;
}

class ReduxTestC extends React.Component<IProps> {
	constructor(props: IProps) {
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

		this.props.setPermissions(list);
	};

	onDeleteAdminClick = () => {
		const {
			global: { permissions },
		} = this.props;
		this.props.setPermissions(permissions.filter((p) => p !== 'admin'));
	};

	render() {
		const {
			system: { systemName },
			global: { permissions },
		} = this.props;
		return (
			<Card>
				<p>我是redux类组件</p>
				<h1>{systemName}</h1>

				<div style={{ margin: '10px 0' }}>
					当前拥有的权限：
					{JSON.stringify(permissions)}
				</div>

				<div>
					<Button type="primary" onClick={this.onHandleClick}>
						点击切换权限
					</Button>

					<Button
						style={{ marginLeft: 10 }}
						type="primary"
						disabled={!permissions.includes('admin')}
						onClick={this.onDeleteAdminClick}
					>
						删除admin权限 (删除后工作台将会403)
					</Button>
				</div>

				<PermissionTest />
			</Card>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		system: state.system,
		global: state.global,
	};
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		setPermissions: (permissions: string[]) => {
			dispatch({
				type: 'global/setPermissions',
				payload: permissions,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestC);
