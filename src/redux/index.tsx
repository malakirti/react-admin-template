import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

export interface IProps {
	children: React.ReactElement;
}

const ReduxProvider: React.FC<IProps> = (props: IProps) => {
	return <Provider store={store}>{props.children}</Provider>;
};

export default ReduxProvider;
