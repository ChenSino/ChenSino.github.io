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

1. `hash` 路由，特征是` url` 后面会有 # 号，如` baidu.com/#foo/bar/baz`。
2. `history` 路由，`url` 和普通路径没有差异。如 `baidu.com/foo/bar/baz`。

我们已经讲过了路由的本质，那么实际上只需要搞清楚两种路由分别是如何 改变，并且组件是如何监听并完成视图的展示，一切就真相大白了。

先分别谈谈两种路由用什么样的 api 实现前端路由：

#####  **hash**

通过 `location.hash = 'foo'` 这样的语法来**改变**，路径就会由 `baidu.com` 变更为 `baidu.com/#foo`。

通过 `window.addEventListener('hashchange')` 这个事件，就可以**监听**到 `hash` 值的变化。

##### **history**

其实是用了 `history.pushState` 这个 API 语法**改变**，它的语法乍一看比较怪异，先看下 `mdn` 文档里对它的定义：

```javascript
history.pushState(state, title[, url])
```

其中 `state` 代表状态对象，这让我们可以给每个路由记录创建自己的状态，并且它还会序列化后保存在用户的磁盘上，以便用户重新启动浏览器后可以将其还原。

`title` 当前没啥用。

通过 `history.pushState({}, '', foo)`，可以让 `baidu.com` 变化为 `baidu.com/foo`。



**为什么路径更新后，浏览器页面不会重新加载？**

这里我们需要思考一个问题，平常通过 `location.href = 'baidu.com/foo'` 这种方式来跳转，是会让浏览器重新加载页面并且请求服务器的，但是 `history.pushState` 的神奇之处就在于它可以让 url 改变，但是不重新加载页面，完全由用户决定如何处理这次 url 改变。

因此，这种方式的前端路由必须在支持 `histroy` API 的浏览器上才可以使用。



**为什么刷新后会 404？**

本质上是因为刷新以后是带着 `baidu.com/foo` 这个页面去请求服务端资源的，但是服务端并没有对这个路径进行任何的映射处理，当然会返回 404，处理方式是让服务端对于"不认识"的页面,返回 `index.html`，这样这个包含了前端路由相关`js`代码的首页，就会加载你的前端路由配置表，并且此时虽然服务端给你的文件是首页文件，但是你的 url 上是 `baidu.com/foo`，前端路由就会加载 `/foo` 这个路径相对应的视图，完美的解决了 404 问题。

`history` 路由的**监听**也有点坑，浏览器提供了 `window.addEventListener('popstate')` 事件，但是它只能监听到浏览器回退和前进所产生的路由变化，对于主动的 `pushState` 却监听不到。解决方案当然有，下文实现 `react-router` 的时候再细讲~











