# 说明

## 安装

npm install 或者 yarn

注意

- 如果在国内，请为包管理器配置代理或者在透明网关代理，保证可以访问到国外的源。
- 若使用阿里源请注意阿里的electron地址和国外不一致，需要修改@electron/get中的代码或者直接为npm添加electron_custom_dir变量
- 使用node-sass需要配置相关编译环境

## webpack配置

- 需要注意主进程配置，webpack在一些情况下（本人在配合使用sqlite3时遇到），会将require的动态引入地址表达式背后的所有代码打包进去，这会导致打包出来的代码无法执行。因此加入webpack-node-externals阻止webpack处理node_modules中的内容
- babel和eslint的配置随个人需求
- 引入了jest和enzyme，但并没有提供测试的模板代码
