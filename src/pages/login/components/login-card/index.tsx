import React, { useState } from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import classnames from 'classnames';
import JsCookie from 'js-cookie';
import config from '@/config';

import s from './index.module.less';
import normal from './img/normal.png';
import greeting from './img/greeting.png';
import blindfold from './img/blindfold.png';

export interface IProps {
	onSuccess: () => void;
}

export interface IFormData {
	username: string;
	password: string;
	remember: boolean;
}

const LoginCard: React.FC<IProps> = (props: IProps) => {
	const [panda, setPanda] = useState('normal');

	function onFinish(values: IFormData) {
		// 纯模拟一下
		JsCookie.set(config.mainCookieName, JSON.stringify(values));

		props.onSuccess();
	}

	return (
		<Card className={s.card}>
			<img
				title="图片来自掘金登陆弹窗，本项目非商业使用，如涉及侵权请联系删除，谢谢"
				className={classnames(s.panda, { [s.show]: panda === 'normal' })}
				src={normal}
				alt=""
			/>
			<img
				title="图片来自掘金登陆弹窗，本项目非商业使用，如涉及侵权请联系删除，谢谢"
				className={classnames(s.panda, { [s.show]: panda === 'greeting' })}
				src={greeting}
				alt=""
			/>
			<img
				title="图片来自掘金登陆弹窗，本项目非商业使用，如涉及侵权请联系删除，谢谢"
				className={classnames(s.panda, { [s.show]: panda === 'blindfold' })}
				src={blindfold}
				alt=""
			/>
			<Form name="login" onFinish={onFinish}>
				<Form.Item
					label="账户"
					name="username"
					rules={[{ required: true, message: '请输入用户名/邮箱！' }]}
				>
					<Input
						size="large"
						placeholder="请输入用户名/邮箱"
						onFocus={(): void => {
							setPanda('greeting');
						}}
						onBlur={(): void => {
							setPanda('normal');
						}}
					/>
				</Form.Item>
				<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
					<Input.Password
						size="large"
						onFocus={(): void => {
							setPanda('blindfold');
						}}
						onBlur={(): void => {
							setPanda('normal');
						}}
					/>
				</Form.Item>

				<Form.Item className={s.remember} name="remember" valuePropName="checked">
					<Checkbox>记住密码</Checkbox>
				</Form.Item>

				<Form.Item noStyle>
					<Button block size="large" type="primary" htmlType="submit">
						登录
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default LoginCard;
