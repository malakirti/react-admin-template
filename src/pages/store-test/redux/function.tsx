import React from 'react';
import { Card, Button } from 'antd';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setPermissions } from '@/redux/store/global';
import PermissionTest from './components/perssion-test';

const MobxTestF: React.FC = () => {
	const store = useStore();
	const dispatch = useDispatch();
	const selector = useSelector((data: RootState) => {
		return {
			system: data.system,
			global: data.global,
		};
	});

	// 两种方式提交数据变更
	function onHandleClick() {
		const { permissions } = selector.global;

		let list;
		if (permissions.includes('李四')) {
			list = permissions.filter((p) => p !== '李四');
		} else {
			list = [...permissions, '李四'];
		}

		store.dispatch({
			type: 'global/setPermissions',
			payload: list,
		});

		// dispatch(setPermissions(list.filter(Boolean)));
	}

	function onAddAdminClick() {
		const { permissions } = selector.global;

		if (permissions.includes('admin')) {
			return;
		}

		dispatch(setPermissions([...permissions, 'admin']));
	}

	return (
		<Card>
			<p>我是redux函数组件</p>
			<h1>{selector.system.systemName}</h1>

			<div style={{ margin: '10px 0' }}>
				当前拥有的权限：
				{JSON.stringify(selector.global.permissions)}
			</div>

			<div>
				<Button type="primary" onClick={onHandleClick}>
					点击切换权限
				</Button>

				<Button
					style={{ marginLeft: 10 }}
					type="primary"
					disabled={selector.global.permissions.includes('admin')}
					onClick={onAddAdminClick}
				>
					添加admin权限 (添加后工作台正常显示)
				</Button>
			</div>

			<PermissionTest />
		</Card>
	);
};

export default MobxTestF;
