import React from 'react';
import { Result, Button } from 'antd';
import s from './index.module.less';

const NotFond: React.FC = () => {
	return (
		<div className={s.container}>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={<Button type="primary">Back Home</Button>}
			/>
		</div>
	);
};

export default NotFond;
