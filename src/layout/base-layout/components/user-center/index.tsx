import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { Dropdown, Avatar, Menu, Tooltip } from 'antd';
import { UserOutlined, VerifiedOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import JsCookie from 'js-cookie';
import { MenuInfo } from '@/interface/menu';
import LoginModal from '@/pages/login/components/login-modal';
import config from '@/config';
import s from './index.module.less';

const UserCenter: React.FC = () => {
	const isLogin = JsCookie.get(config.mainCookieName);
	const { pathname, search, hash, state } = useLocation();
	const history = useHistory();
	const [visible, setVisible] = useState(false);

	function onHandleClick() {
		setVisible(true);
	}

	function onSuccess() {
		setVisible(false);

		// window.location.reload();

		// 使用这个刷新，需注意公共接口的调用
		history.replace({
			pathname: '/refresh',
			state: {
				pathname,
				search,
				hash,
				originState: state,
			},
		});
	}

	function onMenuHandleClick(item: MenuInfo) {
		switch (item.key) {
			case 'logout':
				JsCookie.set(config.mainCookieName, '');
				// 简单模拟一下，后面改成store存放
				window.location.reload();
				break;
			default:
				break;
		}
	}

	const overlay = (
		<Menu className={s.userCenterMenu} onClick={onMenuHandleClick}>
			<div className={s.header}>
				<div className={s.name}>malakirti</div>
				<div className={s.email}>vimalakirti409@gmail.com</div>
			</div>
			<Menu.Divider />
			<Menu.Item className={s.userCenterMenuItem} icon={<UserOutlined style={{ fontSize: 16 }} />}>
				个人中心
			</Menu.Item>
			<Menu.Item
				className={s.userCenterMenuItem}
				icon={<VerifiedOutlined style={{ fontSize: 16 }} />}
			>
				权限管理
			</Menu.Item>
			<Menu.Item
				className={s.userCenterMenuItem}
				icon={<SettingOutlined style={{ fontSize: 16 }} />}
			>
				系统设置
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item
				key="logout"
				className={s.userCenterMenuItem}
				icon={<LogoutOutlined style={{ fontSize: 16 }} />}
			>
				安全退出
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<Dropdown disabled={!isLogin} overlay={overlay}>
				{isLogin ? (
					<div className={s.userCenter}>
						<Avatar
							icon={<UserOutlined />}
							src="https://avatars0.githubusercontent.com/u/22541178"
						/>
					</div>
				) : (
					<Tooltip overlay="点击登陆">
						<div className={s.userCenter} onClick={onHandleClick}>
							<Avatar
								icon={<UserOutlined />}
								src="https://avatars0.githubusercontent.com/u/22541178"
							/>
						</div>
					</Tooltip>
				)}
			</Dropdown>

			<LoginModal
				visible={visible}
				onCancel={() => setVisible(false)}
				onSuccess={onSuccess}
			/>
		</>
	);
};

export default UserCenter;
