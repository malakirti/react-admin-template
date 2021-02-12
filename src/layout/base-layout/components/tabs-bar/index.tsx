/**
 * 标签页
 * @description 此处暂不做权限验证
 */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { Divider } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router';
import { useStore, useSelector } from 'react-redux';
import { flattedRoutes } from '@/router';
import useEnhancedEffect from '@/utils/use-enhanced-effect';
import ownerDocument from '@/utils/owner-document';
import { comparePathname } from '@/utils/functions';
import { RootState } from '@/redux/store';
import { ITabItem } from '@/redux/store/layout';
import s from './index.module.less';

interface IContextmenu {
	type: string;
	label: string;
	shortKey?: string;
	visible?: boolean;
}

const contextmenuWidth = 140;

const TabsBar: React.FC = () => {
	const store = useStore();
	const location = useLocation();
	const history = useHistory();
	const refTabs = useRef<HTMLUListElement | null>(null);
	const refContextmenu = useRef<HTMLUListElement | null>(null);
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	});
	const [isContextmenuVisible, setContextmenuVisible] = useState(false);
	const tabsList: ITabItem[] = useSelector((state: RootState) => state.layout.tabsList);
	const [currentTab, setCurrentTab] = useState<ITabItem>({
		path: location.pathname,
		title: '',
	});
	const [menus, setMenus] = useState<IContextmenu[]>([]);

	useEnhancedEffect(() => {
		store.dispatch({
			type: 'layout/setTabsList',
			payload: flattedRoutes
				.filter((item) => (item.meta?.showInTabs !== false && item.meta?.pin))
				.map(({ path, meta }) => {
					return {
						path,
						title: meta?.title,
						showInTabs: meta?.showInTabs,
						hidden: meta?.hidden,
						pin: meta?.pin,
					};
				}),
		});

		onAddTab(location.pathname);

		history.listen(({ pathname }) => {
			onAddTab(pathname);
		});

		const doc = ownerDocument(refContextmenu.current);

		refContextmenu.current?.addEventListener('click', onCancelAll);
		refContextmenu.current?.addEventListener('contextmenu', onCancelAll);
		doc.addEventListener('keydown', onHandleKeydown);
		doc.addEventListener('contextmenu', onClickAway);
		doc.addEventListener('click', onClickAway);

		return () => {
			refContextmenu.current?.removeEventListener('click', onCancelAll);
			refContextmenu.current?.removeEventListener('contextmenu', onCancelAll);
			doc.removeEventListener('keydown', onHandleKeydown);
			doc.removeEventListener('contextmenu', onClickAway);
			doc.removeEventListener('click', onClickAway);
		};
	}, []);

	function onAddTab(pathname: string) {
		const flag = tabsList.some((item) => comparePathname(item.path, pathname));
		if (!flag) {
			const route = flattedRoutes.find((item) => comparePathname(item.path, pathname));
			if (!route) {
				return;
			}

			const { path, meta } = route;
			if (meta?.showInTabs === false) {
				return;
			}

			store.dispatch({
				type: 'layout/addTabItem',
				payload: {
					path,
					title: meta?.title,
					showInTabs: meta?.showInTabs,
					hidden: meta?.hidden,
					pin: meta?.pin,
				},
			});
		}
	}

	function onContextMenu(event: React.MouseEvent, data: ITabItem) {
		event.preventDefault();
		event.stopPropagation();

		const rect = refTabs.current?.getBoundingClientRect();
		if (rect) {
			const { clientX, clientY } = event;
			const { top, left, width } = rect;

			if (clientX + contextmenuWidth - left + 4 < width) {
				setPosition({
					top: clientY - top + 2,
					left: clientX - left + 2,
				});
			} else {
				setPosition({
					top: clientY + 2,
					left: clientX - left - contextmenuWidth - 2,
				});
			}

			setCurrentTab(data);
			setContextmenuVisible(true);
			setMenus([
				{ type: 'refresh', label: '刷新', shortKey: 'Alt+F', visible: getVisible('refresh', data) },
				{ type: 'deep-refresh', label: '重新加载', shortKey: 'Alt+D', visible: getVisible('deep-refresh', data) },
				{ type: 'divider', label: '', shortKey: '', visible: getVisible('divider', data) },
				{ type: 'close', label: '关闭', shortKey: 'Alt+W', visible: getVisible('close', data) },
				{ type: 'close-others', label: '关闭其他', shortKey: 'Alt+O', visible: getVisible('close-others', data) },
				{ type: 'close-all', label: '关闭所有', shortKey: 'Alt+A', visible: getVisible('close-all', data) },
				{ type: 'close-left', label: '关闭左侧', shortKey: 'Alt+L', visible: getVisible('close-left', data) },
				{ type: 'close-right', label: '关闭右侧', shortKey: 'Alt+R', visible: getVisible('close-right', data) },
			]);
		}
	}

	function onTabItemClick(data: ITabItem) {
		setCurrentTab(data);
		history.push(data.path);
	}

	function getVisible(type: string, data: ITabItem) {
		const { pathname } = location;
		const length = tabsList.length;
		const currentIndex = tabsList.findIndex((item) => comparePathname(item.path, data.path));
		const firstPinIndex = tabsList.findIndex((item) => item.pin);
		const lastPinIndex = [...tabsList].reverse().findIndex((item) => item.pin);

		const showRefresh = comparePathname(pathname, data.path);
		const showClose = !data.pin; // 首页不可出现在tabs标签页中，因为无标签页的时候会跳转首页
		// const showClose = tabsList.length > 1 && !data?.pin;
		const showCloseOthers = tabsList
			.filter((item) => !comparePathname(item.path, data.path))
			.some((item) => !item.pin);
		const showCloseAll = !tabsList.some((item) => item.pin);
		const showCloseLeft = firstPinIndex === -1 && currentIndex > 0;
		const showCloseRight = (lastPinIndex === -1 && currentIndex < length - 1)
			|| (currentIndex < length - 1 && lastPinIndex > 0 && currentIndex >= length - 1 - lastPinIndex);

		switch (type) {
			case 'refresh':
				return showRefresh;
			case 'deep-refresh':
				return true;
			case 'divider':
				return showClose || showCloseOthers || showCloseAll || showCloseLeft || showCloseRight;
			case 'close':
				return showClose;
			case 'close-others':
				return showCloseOthers;
			case 'close-all':
				return showCloseAll;
			case 'close-left':
				return showCloseLeft;
			case 'close-right':
				return showCloseRight;
			default:
				return true;
		}
	}

	function onExecContextmenuItemClick(menu: { type: string; label: string }) {
		if (!currentTab.path) {
			return;
		}

		let list: ITabItem[] = [];
		const path = currentTab.path;
		const leftIndex = tabsList.findIndex((item) => comparePathname(item.path, path));

		switch (menu.type) {
			case 'refresh':
				onRefresh();
				break;
			case 'deep-refresh':
				onDeepRefresh();
				break;
			case 'close':
				list = [currentTab];
				break;
			case 'close-others':
				list = tabsList.filter((item) => !item.pin).filter((item) => !comparePathname(item.path, path));
				break;
			case 'close-all':
				list = tabsList.filter((item) => !item.pin);
				history.push('/');
				break;
			case 'close-left':
				list = [...tabsList].slice(0, leftIndex);
				break;
			case 'close-right':
				list = [...tabsList].slice(leftIndex + 1);
				break;
			default:
				break;
		}
		store.dispatch({
			type: 'layout/removeTabItems',
			payload: list,
		});
		setContextmenuVisible(false);

		const newTabsList = (store.getState() as RootState).layout.tabsList;
		if (!newTabsList.some((item) => comparePathname(item.path, location.pathname))) {
			const redirectPath = [...newTabsList].reverse()[0]?.path || '/';
			history.push(redirectPath);
		}
	}

	function onHandleKeydown(event: KeyboardEvent) {
		if (event.altKey) {
			event.preventDefault();
			console.log(event.key);
			switch (event.key.toUpperCase()) {
				case 'F':
					onRefresh();
					break;
				case 'D':
					window.location.reload();
					break;
				case 'W':
					break;
				case 'O':
					break;
				case 'A':
					break;
				case 'L':
					break;
				case 'R':
					break;
				default:
					break;
			}
		}
	}

	function onRefresh() {
		const { pathname, search, hash, state } = location;
		if (comparePathname(location.pathname, currentTab.path)) {
			history.replace({
				pathname: '/refresh',
				state: {
					pathname,
					search,
					hash,
					originState: state,
				},
			});
		} else {
			history.push(currentTab.path);
		}
	}

	function onDeepRefresh() {
		if (!comparePathname(location.pathname, currentTab.path)) {
			history.push(currentTab.path);
		}
		setTimeout(() => {
			window.location.reload();
		}, 500);
	}

	function onCancelAll(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	function onClickAway() {
		setContextmenuVisible(false);
	}

	return (
		<div className={s.container}>
			<ul className={s.tabs} ref={refTabs}>
				{tabsList.map((tab) => (
					<li
						key={tab.path}
						className={classNames(s.tab, {
							[s.active]: comparePathname(tab.path, location.pathname),
						})}
						onContextMenu={(event) => onContextMenu(event, tab)}
						onClick={() => onTabItemClick(tab)}
					>
						{tab.pin && <PushpinOutlined className={s.pin} />}
						{tab.title}
					</li>
				))}
			</ul>
			<ul
				ref={refContextmenu}
				style={{
					width: contextmenuWidth,
					...position,
					display: isContextmenuVisible ? '' : 'none',
				}}
				className={s.contextmenu}
			>
				{menus.map(({ type, label, shortKey, visible }) =>
					type === 'divider' ? visible && <Divider className={s.divider} key={type} /> : (
						visible && (
							<li
								key={type}
								className={classNames(s.item)}
								onClickCapture={() => onExecContextmenuItemClick({ type, label })}
							>
								<span>{label}</span>
								<span className={s.shortKey}>{shortKey}</span>
							</li>
						)
					),
				)}
			</ul>
		</div>
	);
};

export default TabsBar;
