import React from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

import s from './index.module.less';

function LoadingComponent(props: SpinProps): React.ReactElement {
	return <Spin className={s.spin} size="large" tip="loading..." {...props} />;
}

export default LoadingComponent;
