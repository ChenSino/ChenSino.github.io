---
title: 利用vue-cli搭建项目
date: 2022-07-06  
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

### 一、创建一个新项目

```vue
vue create vue2-admin

```

这里搭建好的脚手架是采用`vue2+webpack`,并且预装了`vueRouter`、`vuex`、`scss`、`eslint`.

![image-20220809105240533](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220809105240533.png)

生成的文件夹如下所示：

![image-20220809105924589](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220809105924589.png)

`vue-cli` 脚手架搭建完成后，项目中是没有 `vue.config.js` 文件，需要手动创建。

### 二、创建`vue.config.js`

`vue.config.js`(相当于之前的`webpack.config.js`) 是一个可选的配置文件。如果项目的 (和`package.json`同级的) 根目录中存在这个文件，那么它会被`@vue/cli-service`自动加载。

```javascript
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath:  "/",
  outputDir: "dist",
  lintOnSave: false,
  // webpack配置别名
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src")); //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    port: 2021,
    host: "0.0.0.0", // ip
    disableHostCheck: true, //是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查
    hotOnly: false, // 热更新
    https: false, // https:{type:Boolean}配置前缀
    open: true, //配置自动启动浏览器
    /* 使用代理 */
    // proxy: {
    //   '/api': {
    //     /* 目标代理服务器地址 */
    //     target: 'http://dx.jiace.com:9030',
    //
    //     /* 允许跨域 */
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/api'
    //     }
    //   }
    // }
  },
};

```
