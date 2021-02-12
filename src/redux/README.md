# redux

使用 redux 作为状态管理器，本项目使用了`@reduxjs/toolkit`作为 redux 套件只支持 hooks， redux-react 的 connect 依然可以连接类组件。

**如果选择 redux，请删掉 mobx 相关代码。**

建议全面拥抱 hooks，毕竟它真香。

# 约定

为便于查找，保持 namespace 与文件名同名，全局的 store 会放置于 pages 同目录，所以请自行保证 pages 内文件与外部文件不同名。
