import React from 'react';

import MessageCenter from '../message-center';
import UserCenter from '../user-center';
import s from './index.module.less';

const HeaderRight: React.FC = () => {
	return (
		<div className={s.headerRight}>
			<MessageCenter />
			<UserCenter />
		</div>
	);
};

export default HeaderRight;
