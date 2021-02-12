import { IRouterConfig } from '@/utils/render-routes';

export const getType = <T>(value: T): string => Object.prototype.toString.call(value).slice(8, -1);
export const isString = <T>(value: T): boolean => getType(value) === 'String';
export const isObject = <T>(value: T): boolean => getType(value) === 'Object';
export const isEmpty = function isEmpty<T>(val: T): boolean {
	if (val === null || val === undefined) return true;

	if (typeof val === 'boolean') return false;

	if (typeof val === 'number') return !val;

	if (val instanceof Error) return val.message === '';

	switch (getType(val)) {
		case 'String':
		case 'Array':
			return !(val as unknown as { length: number }).length;
		case 'File':
		case 'Map':
		case 'Set':
			return !(val as unknown as { size: number }).size;
		case 'Object':
			return !Object.keys(val).length;
		default:
			return false;
	}
};

export function getQueryString(name: string) {
	const search = window.location.href.split('?')[1];
	const separator = '&';
	const reg = new RegExp(`(^|${separator})${name}=([^${separator}]*)(${separator}|$)`, 'i');
	const result = reg.exec(search);
	if (result != null) {
		return decodeURIComponent(result[2]);
	}
	return null;
}

export function flatRouterList(list: IRouterConfig[]) {
	const res: IRouterConfig[] = [];

	function travel(arr: IRouterConfig[]) {
		for (let i = 0; i < arr.length; i++) {
			const route = arr[i];
			const children = arr[i].children;

			res.push(route);

			if (children) {
				// delete arr[i].children;
				travel(children);
			}
		}
	}
	travel(list);

	return res;
}

export function checkPermissions(
	permissions?: string[],
	authorities?: string | string[],
	some?: boolean,
) {
	if (!permissions || !authorities) {
		return true;
	}

	if (typeof authorities === 'string') {
		return permissions.includes(authorities);
	}

	const authorizationRequired = authorities && authorities?.length > 0;

	if (!authorizationRequired) {
		return true;
	}

	return some
		? authorities?.some((value) => permissions?.includes(value))
		: authorities?.every((value) => permissions?.includes(value));
}

export 	function comparePathname(path1?: string, path2?: string) {
	if (path1 === undefined || path2 === undefined) {
		return false;
	}
	if (path1 === path2) {
		return true;
	}
	return (path1 || '').replace(/\/$/, '') === (path2 || '').replace(/\/$/, '');
}
