import React from 'react';
import { useLocation, useHistory } from 'react-router';

import LoginCard from './components/login-card';
import s from './index.module.less';

export interface ILocationState {
	pathname: string;
	search: string,
	hash: string;
	state: { [key: string]: any };
}

const Login: React.FC = () => {
	const location = useLocation();
	const history = useHistory();

	const { pathname, search, hash, state } = (location.state || {}) as ILocationState;

	function onSuccess() {
		if (!pathname) {
			history.replace('/');
			return;
		}

		history.replace({
			pathname,
			search,
			hash,
			state: { ...state },
		});
	}
	return (
		<div className={s.login}>
			<LoginCard onSuccess={onSuccess} />
		</div>
	);
};

export default Login;
