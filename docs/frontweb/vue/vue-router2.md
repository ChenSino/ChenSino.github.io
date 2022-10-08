---
title: vue-router的本质
date: 2022-10-08 
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

<!--more-->

###  路由的本质

简单来说，浏览器端路由其实并不是真实的网页跳转（和服务器没有任何交互），而是纯粹在浏览器端发生的一系列行为，本质上来说前端路由就是：

 `对 url 进行改变和监听，来让某个 dom 节点显示对应的视图

###  路由的区别

一般来说，浏览器端的路由分为两种：

hash 路由，特征是 url 后面会有 # 号，如 baidu.com/#foo/bar/baz。
history 路由，url 和普通路径没有差异。如 baidu.com/foo/bar/baz。

我们已经讲过了路由的本质，那么实际上只需要搞清楚两种路由分别是如何 改变，并且组件是如何监听并完成视图的展示，一切就真相大白了。

先分别谈谈两种路由用什么样的 api 实现前端路由：

 **hash**

通过 `location.hash = 'foo'` 这样的语法来**改变**，路径就会由 `baidu.com` 变更为 `baidu.com/#foo`。

通过 `window.addEventListener('hashchange')` 这个事件，就可以**监听**到 `hash` 值的变化。

https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247485173&idx=1&sn=0eb7739aaf8e456d1b7a58dd353107ef&chksm=eb043e8cdc73b79a16f3982662041aed684b63198d772d3b6a47b5a89816e524e09dd8d92781&token=1581050816&lang=zh_CN&scene=21#wechat_redirect
