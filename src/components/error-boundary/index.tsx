/**
 * 目前次组件代码没有实际作用
 * 可根据项目场景做个体验降级或错误上报入口
 */
import React, { Component } from 'react';
import config from '@/config';
import s from './index.module.less';

interface IProps {
	children: React.ReactElement;
}

interface IState {
	error?: Error;
	errorInfo?: React.ErrorInfo;
}

export default class ErrorBoundary extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			error: undefined,
			errorInfo: undefined,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.setState({ error, errorInfo });
	}

	private static onGetErrorInfo(error: Error, errorInfo: React.ErrorInfo) {
		return (
			<section className={s.container}>
				<div className={s.title}>React组件出错了，打开控制台查看详情</div>
				<div className={s.sub}>此错误只会出现开发环境，其他环境会静默失败</div>
				<section className={s.details}>
					<div className={s.type}>错误信息: </div>
					<div>{error.message}</div>
					<div className={s.type}>错误堆栈: </div>
					<div>{errorInfo.componentStack.replace(/\r?\n\s+/, '').replace(/(\r?\n)\s+/gm, '$1')}</div>
				</section>
			</section>
		);
	}

	render() {
		const { children } = this.props;
		const { error, errorInfo } = this.state;

		if (config.isDevelopment && error && errorInfo) {
			return ErrorBoundary.onGetErrorInfo(error, errorInfo);
		}

		return children;
	}
}
