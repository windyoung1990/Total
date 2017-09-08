## npm 更新命令
```javascript
//windows
npm install npm -g
```
## 本地安装
### 1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
### 2. 可以通过 require() 来引入本地安装的包。
## 全局安装
### 1. 将安装包放在 /usr/local 下或者你 node 的安装目录。
### 2. 可以直接在命令行里使用。
## 查看安装信息
npm list -g  
### 查看某个模块的安装信息
npm list node_modules_name  
## package.json
package.json 位于模块的目录下，用于定义包的属性  
## 卸载模块
npm uninstall express  
## 更新模块
npm update express  
## 使用淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org  
### 使用cnpm 安装模块
 cnpm install [name]  
 
