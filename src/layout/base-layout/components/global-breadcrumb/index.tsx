import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getParentsRouteByPath } from '@/utils/temporal';
import useEnhancedEffect from '@/utils/use-enhanced-effect';
import routes from '@/router';
import { IRouterConfig } from '@/utils/render-routes';
import s from './index.module.less';

const GlobalBreadcrumb: React.FC = () => {
	const location = useLocation();
	const [breadcrumbs, setBreadcrumbs] = useState<IRouterConfig[]>([]);
	useEnhancedEffect(() => {
		const pathname = location.pathname.replace(/\/$/, '');
		const list = getParentsRouteByPath(routes, pathname, 'children', 'path') as IRouterConfig[] || [];
		setBreadcrumbs(list.reverse());
	}, [location.pathname]);
	return (
		<>
			{breadcrumbs.length ? <section className={s.breadcrumb}>
				<Breadcrumb>
					<Breadcrumb.Item>
						{breadcrumbs.length ? (
							<Link className={s.link} to="/">
								<HomeOutlined className={s.home} />
								首页
							</Link>
						) : (
							<>
								<HomeOutlined className={s.home} />
								首页
							</>
						)}
					</Breadcrumb.Item>
					{breadcrumbs.map(({ path, meta }) => (
						<Breadcrumb.Item key={path}>{meta?.title}</Breadcrumb.Item>
					))}
				</Breadcrumb>
			</section> : null}
		</>
	);
};

export default GlobalBreadcrumb;
