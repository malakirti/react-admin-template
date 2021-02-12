import React from 'react';
import { Card } from 'antd';

const Dashboard: React.FC = () => {
	return (
		<Card>
			Dashboard:
			{navigator.userAgent}
		</Card>
	);
};

export default Dashboard;
