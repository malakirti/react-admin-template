/* eslint-disable */
/* 临时放置。TS类型处理有点麻烦，先用JS写了，有时间再改成通用的 */

/**
 * 根据子节点查找所有父级
 * @param treeList
 * @param value
 * @param childrenField
 * @param valueField
 * @returns {T[]|*[]}
 */
export function getParentsRouteByPath(treeList, value, childrenField = 'children', valueField = 'id') {
	for (let i = 0; i < treeList.length; i++) {
		if (treeList[i]?.[valueField] === value) {
			return [treeList[i]];
		}
		if (treeList[i]?.[childrenField]) {
			const nodes = getParentsRouteByPath(treeList[i]?.[childrenField], value, childrenField, valueField);
			if (nodes) {
				return nodes.concat(treeList[i]);
			}
		}
	}
}
