### react-init-app
react webpack4初始化脚手架react-router,mobx,axios等组件

- 脚手架主要实现的功能：
> 1. 实现webpack实现项目构建的基本功能，输入输出；
> 2. 加入html-webpack-plugin 自动实现模版的js 引入；
> 3. babel-loader 实现es6 语法转 es5 语法；
> 4. style-loader 和 css-loader 解析在js 引入的css 文件，并插入到html的head 中
> 5. 利用 webpack-dev-server 实现热加载和开启服务功能；
> 6. devtool='inline-source-map' 实现开发状态下的调试；
> 7. yargs-parser 模块解析命令行参数；
> 8. 利用 cross-env（运行跨平台设置和使用环境变量的脚本），保证windows 和 linux 的 环境变量设置统一；
> 9. 增加对于sass,less 的解析功能；
> 10. 增加对于图片，文件的加载解析；
> 11. 增加eslint 实现语法检查；
> 12. 代码分离,分离第三方模块代码；
> 13. js和css 分离开来； mini-css-extract-plugin
> 14. 加入依赖可视化查看工具 webpack-bundle-analyzer；
> 15. 引入react 全家桶  @babel/preset-react
> 16. mobx 和 mobx-react 使用了修饰符 
> >  babel-plugin-transform-decorators-legacy
> > babel-plugin-transform-class-properties
> 17. css 优化 optimize-css-assets-webpack-plugin
> 18. js 优化 uglifyjs-webpack-plugin

