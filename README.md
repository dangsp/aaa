# btm

> work

## Build Setup

``` git bash here
#1.安装git，在当前项目文件夹右键打开git bash here指令窗口
git init 创建本地仓库

#2.安装node14.15.0

#3.安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

#4.克隆项目，进入项目安装依赖
git clone git@github.com:parasolHunter/btm_vue.git
cnpm install     //安装依赖
npm install -g node-gyp
npm install --global --production windows-build-tools
npm uninstall node-sass 如果之前已错误安装，先移除
npm install node-sass --save-dev

#8.运行开发环境下的项目（config配置），serve with hot reload at localhost:9000
npm run dev

#9.按生产环境打包项目（config配置）
npm run build

#10.直接执行打包后的dist目录index.html预览效果
npm install -g serve
```
