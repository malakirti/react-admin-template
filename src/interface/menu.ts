import React from 'react';

export interface MenuInfo {
	key: React.Key;
	keyPath: React.Key[];
	item: React.ReactInstance;
	domEvent: React.MouseEvent<HTMLElement>;
}

export interface SelectInfo extends MenuInfo {
	selectedKeys?: React.Key[];
}
