import React from 'react';
import { Modal } from 'antd';
import LoginCard from '../login-card';
import s from './index.module.less';

interface IProps {
	visible: boolean;
	onCancel: () => void;
	onSuccess: () => void;
}

const LoginModal: React.FC<IProps> = (props: IProps) => {
	return (
		<Modal
			destroyOnClose
			visible={props.visible}
			closable={false}
			centered
			footer={null}
			onCancel={props.onCancel}
			className={s.modal}
		>
			<LoginCard onSuccess={props.onSuccess} />
		</Modal>
	);
};

export default LoginModal;
