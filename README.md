# React Admin Template

🎉 A magical react admin template supporting electron.

<div align="center">
	<a href="https://github.com/malakirti/react-admin-template#react-admin-template">
  	<img width="100%" align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=malakirti&repo=react-admin-template&show_owner=true&theme=radical" alt="package">
	</a>
</div>

<div align="center">
	<a href="https://github.com/malakirti/react-admin-template">
		<img align="center" src="https://img.shields.io/github/package-json/name/malakirti/react-admin-template?logo=github" alt="name">
	</a>
	<a href="https://github.com/malakirti/react-admin-template">
		<img align="center" src="https://img.shields.io/github/package-json/v/malakirti/react-admin-template?label=github%40latest&logo=github" alt="version">
	</a>
</div>

<div align="center">
	<a href="https://github.com/malakirti/react-admin-template/blob/main/package.json">
		<img align="center" src="https://img.shields.io/github/package-json/dependency-version/malakirti/react-admin-template/react?logo=react" alt="react">
	</a>
	<a href="https://github.com/malakirti/react-admin-template/blob/main/package.json">
		<img align="center" src="https://img.shields.io/github/package-json/dependency-version/malakirti/react-admin-template/react-dom?logo=react" alt="react-dom">
	</a>
	<a href="https://github.com/malakirti/react-admin-template/blob/main/package.json">
		<img align="center" src="https://img.shields.io/github/package-json/dependency-version/malakirti/react-admin-template/react-router?logo=react-router" alt="react-router">
	</a>
	<a href="https://github.com/malakirti/react-admin-template/blob/main/package.json">
		<img align="center" src="https://img.shields.io/github/package-json/dependency-version/malakirti/react-admin-template/@reduxjs/toolkit?logo=redux" alt="@reduxjs/toolkit">
	</a>
	<a href="https://github.com/malakirti/react-admin-template/blob/main/package.json">
		<img align="center" src="https://img.shields.io/github/package-json/dependency-version/malakirti/react-admin-template/antd?logo=Ant%20Design" alt="Ant Design">
	</a>
</div>

<div align="center">
	<a href="https://github.com/malakirti/react-admin-template">
		<img align="center" src="https://img.shields.io/github/languages/count/malakirti/react-admin-template?logo=github" alt="languages count">
	</a>
	<a href="https://github.com/malakirti/react-admin-template">
		<img align="center" src="https://img.shields.io/github/languages/top/malakirti/react-admin-template?logo=typescript" alt="top language">
	</a>
	<a href="https://github.com/malakirti/react-admin-template">
		<img align="center" src="https://img.shields.io/github/repo-size/malakirti/react-admin-template?logo=github" alt="repo size">
	</a>
	<a href="https://github.com/malakirti/react-admin-template">
		<img align="center" src="https://img.shields.io/github/languages/code-size/malakirti/react-admin-template?logo=github" alt="code size">
	</a>
	<a href="https://github.com/malakirti/react-admin-template/commits/main">
		<img align="center" src="https://img.shields.io/github/commit-activity/y/malakirti/react-admin-template?logo=github" alt="commit activity">
	</a>
	<a href="https://github.com/malakirti/react-admin-template/blob/main/LICENSE#L3">
		<img align="center" src="https://img.shields.io/github/license/malakirti/react-admin-template?logo=github" alt="license">
	</a>
</div>
<p></p>

个人自用 React 项目开发模板，同时集成 Electron 支持。
默认使用`TypeScript`开发，若使用`JavaScript`开发，需注意`tsconfig.json`中`allowJs`配置。
本分支作为项目快速启动模板，不会过多提交代码，只提供基础模板。

**注意事项**

1. **本项目模板同时引入了`Redux`和`Mobx`的演示，仅提供开始前的选择演示，所以切忌二者同时使用。**
2. **删除其中一个很容易，在`src/app.tsx`中`MobxProvider`和`ReduxProvider`二选一即可**
3. **路由权限数据使用了redux的状态，根据选择修改，入口在`src/layout/index.tsx`**
4. **演示页面文件在`src/pages/store-test`目录，对应路由在`src/router/tests.tsx`文件，直接删除即可**
5. **然后选择性删除`src/mobx`目录或`src/redux`目录。**
6. **若选择`Mobx`，请将`@reduxjs/toolkit`、`react-redux`、`reselect`卸载，反之请将`mobx`、`mobx-react`卸载**
7. **标签页组件`TabsBar(src/layout/base-layout/components/tabs-bar)`依赖了`redux`的状态，使用`mobx`请自行改造**

## 一. 本地开发

```shell script
# 安装依赖
> yarn # npm install

# 启动前会构建dll
> yarn start # npm run start

# 启动不会构建dll，之前存在就用
> yarn dev # npm run dev

# 启动electron开发环境
> yarn electron # npm run electron
```

## 二. 代码风格

本项目对代码风格有一定的要求，具体参考`.eslintrc.js`、`.stylelintrc.js`、`.prettierrc.js`文件配置。

## 三. 提交规范

项目提交前会对`commit message`进行检查，不符合规范提交会被拒绝。`commit message`格式如下：

```
> type(scope?): subject // scope可选
```

提交的 `type` 可选值如下:

```javascript
[
 'build',
 'ci',
 'chore',
 'docs',
 'feat',
 'fix', 
 'perf',
 'refactor',
 'revert',
 'style',
 'test',
]
```

## 四. 打包构建

为了互不影响，`web`代码打包再`dist`目录，`electron`代码打包在`build`目录，其中渲染进程代码全部在`build/render`目录。

### 环境变量说明

一些`BuiltIns`、`Plugins`、`Loader`的环境变量默认值是`process.env.NODE_ENV`，
但是自家 CI 没得商量只传递一个环境变量`NODE_ENV`且会超出`development`、`test`、`production`范围，
同时为了变量扩展，此项目`BABEL_ENV`、`NODE_ENV`已固定为`development`、`production`。
也就是说无论`NODE_ENV`传递什么值都会在赋值给`BUILD_ENV`后被强制矫正为`development`或`production`。

**所以本模板中请使用`BUILD_ENV`来区分环境，`process.env.NODE_ENV`不再使用**

### 打包命令

> 本模板内置`electron`打包支持。

```shell script
# web打包，默认生产环境
> yarn build # npm run build

# electron打包，默认生产环境
> yarn package # npm run package

# electron打包，仅打包
> yarn package:only # npm run package:only
```

## 五. 关于 Electron

本模板内置了`electron`相关功能，为了方便不需要`electron`的项项目并没有将主进程代码和渲染进程代码放置一起。
目录结构根据需要可以轻松自行调整，只需调整`.scripts/config/paths.js`文件相关变量即可轻松搞定。

### 不需要`electron`

> 如果不需要`electron`又不想其留在项目中，操作如下:

1. 删除`tsconfig.json`中`include`数组的`main`目录配置和`paths`对象中的`~/*`
2. 删除`.scripts/config/index.js`、`.scripts/config/paths.js`中 electron 相关目录配置，有注释
3. 删除`.scripts/electron`文件夹`
4. 删除`public/main`目录
5. 删除`package.json`文件中`scripts`对象的`electron`相关命令
6. 删除根目录下`electron.config.js`文件
7. 卸载`package.json`文件中的依赖
	1. `electron`
	2. `node-loader`
	3. `electron-debug`
	4. `electron-devtools-installer`
	5. `@types/electron-devtools-installer`
	6. `electron-builder`

```shell script
> yarn remove electron node-loader electron-debug electron-devtools-installer @types/electron-devtools-installer electron-builder electron-updater electron-log

# or

> npm uninstall electron node-loader electron-debug electron-devtools-installer @types/electron-devtools-installer electron-builder electron-updater electron-log
```

8. done

以上操作经实践暂无问题，如有问题请先查看控制台错误输出。

### 需要`electron`且需适当改造

> 如果希望将主进程、渲染进程放置于同一目录(以`src`为例，渲染进程代码`src/render`，主进程代码(`src/main`)，操作如下:

1. 删除`tsconfig.json`中`include`数组的`main`目录配置，将`src`替换为`src/render`
2. 将`tsconfig.json`中的`paths: { "~/*": ["./main/*"], "@/*": ["./src/*"] }`对象修改为`paths: { "~/*": ["./src/main/*"], "@/*": ["./src/render/*"] }`
3. `src`目录中新建`render`子目录，将`src`目录中原有所有文件移动到`src/render`目录
4. 将`main`目录移动到`src`目录与`render`目录同级
5. 修改`.scripts/config/paths.js`相关配置，将`src`修改为`src/render`，将`main`修改为`src/main`
6. 修改`electron.config.js`文件相关目录指向
7. done

## TODO

* 主进程代码修改后如何才能像渲染进程代码一样热加载，而不是每次重新启动程序
* 添加electron安装包更新功能
