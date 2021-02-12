import React from 'react';
import { Button } from 'antd';
import Authorization from '@/components/authorization';

const PermissionTest: React.FC = () => {
	return (
		<div style={{ marginTop: 10 }}>
			<Authorization permission="张三">
				<Button style={{ marginRight: 10 }} type="primary">权限受控按钮 张三</Button>
			</Authorization>

			<Authorization permission={['李四']}>
				<Button style={{ marginRight: 10 }} type="primary">权限受控按钮 李四</Button>
			</Authorization>

			<Authorization permission={{ logic: 'some', checks: ['张三', '李四'] }}>
				<Button style={{ marginRight: 10 }} type="primary">权限受控按钮 张三 或 李四</Button>
			</Authorization>

			<Authorization permission={{ logic: 'every', checks: ['张三', '李四'] }}>
				<Button type="primary">权限受控按钮 张三 和 李四</Button>
			</Authorization>
		</div>
	);
};

export default PermissionTest;
