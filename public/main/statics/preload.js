/**
 * preload代码直接copy不会有其他处理，所以请注意其兼容性
 */

/** ************** 页面加载之前 start *************** */

console.log('页面加载之前 - from preload.js');

/** ************** 页面加载之前 end *************** */


/** ************** 面内容加载之前 start *************** */

document.addEventListener('DOMContentLoaded', () => {
	console.log('面内容加载之前 - from preload.js');
});

/** ************** 面内容加载之前 end *************** */


/** ************** 面内容加载之后 start *************** */

window.addEventListener('load', () => {
	console.log('面内容加载之后 - from preload.js');
});

/** ************** 面内容加载之后 end *************** */


