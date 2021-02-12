import React, { useState } from 'react';
import { Dropdown, Badge, Tabs, List, Avatar, Divider } from 'antd';
import { BellOutlined, MessageOutlined, ExceptionOutlined } from '@ant-design/icons';
import s from './index.module.less';

const { TabPane } = Tabs;

const MessageCenter: React.FC = () => {
	const dataSource = [
		{
			title: 'Ant Design Title 1',
			description: 'Ant Design, a design language for background applications.',
			time: '2020.01.14 18:24:36',
		},
		{
			title: 'Ant Design Title 2',
			description: 'Ant Design, a design language for background applications.',
			time: '2020.01.14 18:24:36',
		},
		{
			title: 'Ant Design Title 3',
			description: 'Ant Design, a design language for background applications.',
			time: '2020.01.14 18:24:36',
		},
		{
			title: 'Ant Design Title 4',
			description: 'Ant Design, a design language for background applications.',
			time: '2020.01.14 18:24:36',
		},
	];
	const [visible, setVisible] = useState(false);
	const overlay = (
		<>
			<Tabs defaultActiveKey="1">
				<TabPane
					key="1"
					tab={
						<>
							<BellOutlined />
							通知 (4)
						</>
					}
				>
					<section className={s.messages}>
						<List
							itemLayout="horizontal"
							dataSource={dataSource}
							renderItem={(item) => (
								<List.Item className={s.listItem}>
									<List.Item.Meta
										avatar={<Avatar src="" />}
										title={item.title}
										description={item.description}
									/>
									<div className={s.listExtra}>{item.time}</div>
								</List.Item>
							)}
						/>
					</section>
				</TabPane>
				<TabPane
					key="2"
					tab={
						<>
							<MessageOutlined />
							消息 (4)
						</>
					}
				>
					<section className={s.messages}>
						<List
							itemLayout="horizontal"
							dataSource={dataSource}
							renderItem={(item) => (
								<List.Item className={s.listItem}>
									<List.Item.Meta
										avatar={<Avatar src="" />}
										title={item.title}
										description={item.description}
									/>
									<div className={s.listExtra}>{item.time}</div>
								</List.Item>
							)}
						/>
					</section>
				</TabPane>
				<TabPane
					key="3"
					tab={
						<>
							<ExceptionOutlined />
							代办 (4)
						</>
					}
				>
					<section className={s.messages}>
						<List
							itemLayout="horizontal"
							dataSource={dataSource}
							renderItem={(item) => (
								<List.Item className={s.listItem}>
									<List.Item.Meta
										avatar={<Avatar src="" />}
										title={item.title}
										description={item.description}
									/>
									<div className={s.listExtra}>{item.time}</div>
								</List.Item>
							)}
						/>
					</section>
				</TabPane>
			</Tabs>
			<Divider />
			<div className={s.messageFooter}>
				<div>清空消息</div>
				<div>查看更多</div>
			</div>
		</>
	);
	return (
		<Dropdown
			visible={visible}
			trigger={['click']}
			overlay={overlay}
			onVisibleChange={setVisible}
			overlayClassName={s.messageDropdown}
		>
			<div className={s.messageCenter}>
				<Badge count={999}>
					<BellOutlined className={s.bell} />
				</Badge>
			</div>
		</Dropdown>
	);
};

export default MessageCenter;
