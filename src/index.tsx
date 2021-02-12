import React from 'react';
import ReactDom from 'react-dom';
import appInfo from './utils/app-info';
import reportWebVitals from './utils/report-web-vitals';

function render(): void {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
	const App = require('./app').default;

	// antd等一些第三方库会抛出一些警告，建议开启，防止自己写的代码有潜在问题
	// ReactDom.render(
	// 	<React.StrictMode>
	// 		<App />
	// 	</React.StrictMode>,
	// 	document.getElementById('react-admin-template'),
	// );

	ReactDom.render(<App />, document.getElementById('react-admin-template'));
}

render();

// app basic info
appInfo(process.env.BUILD_ENV !== 'production');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

// HMR
if (process.env.NODE_ENV === 'development') {
	if (module.hot) {
		module.hot.accept('./app', render);
	}
}
