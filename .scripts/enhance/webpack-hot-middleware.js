const hotClient = require('webpack-hot-middleware/client?timeout=200&overlay=true&reload=true');

// 仅在electron或者浏览器打开electron网页的时候有效，不使用electron可以在webpack.render.dev.config.js替换后删除
hotClient.subscribe((event) => {
	if (event.action === 'reload') {
		// 热加载直接删除dom，不刷新网页
		// window.location.reload();

		const dom = document.querySelector('#webpack-hot-middleware-notice');
		if (dom) {
			dom.textContent = 'Compile Success!';

			setTimeout(() => {
				dom.offsetParent.removeChild(dom);
			}, 350);
		}
	}

	if (event.action === 'compiling') {
		const el = document.createElement('div');
		el.id = 'webpack-hot-middleware-notice';
		el.style.position = 'absolute';
		el.style.bottom = '20px';
		el.style.left = '20px';
		el.style.padding = '8px 12px';
		el.style.color = '#f90';
		el.style.fontSize = '16px';
		el.style.fontWeight = '700';
		el.style.backgroundColor = '#000';
		el.style.borderRadius = '4px';
		el.style.boxShadow = '0 4px 5px 0 #f90, 0 1px 10px 0 #f90';
		el.textContent = 'Main Process Compiling...';
		document.body.appendChild(el);
	}
});
