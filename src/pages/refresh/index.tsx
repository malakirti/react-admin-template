/**
 * 应用内刷新中转页面
 * @description 思路: 原路由跳转至本中转页面再跳转回去以完整刷新
 * 需注意跳到此页面完成的刷新若无相关依赖不会重新调用公共区域(`src/layout`中以及其上的组件)的useEffect, useLayoutEffect回调
 * 所以，深度刷新请使用`window.location.reload()`或其他能达到此效果的方法
 * 因此，公共区域的相关useEffect, useLayoutEffect请依赖登陆的状态标志位，以保证通过弹窗登陆后数据正确更新。通过登陆页面的登陆不存在此问题
 */
import React from 'react';
import { useLocation, useHistory } from 'react-router';
import useEnhancedEffect from '@/utils/use-enhanced-effect';

interface IState {
	pathname: string;
	search?: string;
	hash?: string;
	originState: any;
}

const Refresh: React.FC = () => {
	const location = useLocation<IState>();
	const history = useHistory();
	const state = location.state;

	useEnhancedEffect(() => {
		if (!state) {
			history.replace('/');
		} else {
			history.replace({
				pathname: state.pathname,
				search: state.search,
				hash: state.hash,
				state: state.originState,
			});
		}
	}, []);

	return null;
};

export default Refresh;
