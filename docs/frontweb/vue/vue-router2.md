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

### 一， 路由的本质

简单来说，浏览器端路由其实并不是真实的网页跳转（和服务器没有任何交互），而是纯粹在浏览器端发生的一系列行为，本质上来说前端路由就是：

 **对 url 进行改变和监听，来让某个 dom 节点显示对应的视图**

### 二， 路由的区别

一般来说，浏览器端的路由分为两种：

1. `hash` 路由，特征是` url` 后面会有 # 号，如` baidu.com/#foo/bar/baz`。
2. `history` 路由，`url` 和普通路径没有差异。如 `baidu.com/foo/bar/baz`。

我们已经讲过了路由的本质，那么要实现前端路由，需要解决两个核心：

1. 如何改变 URL 却不引起页面刷新？
2. 如何检测 URL 变化了？，并且展示对应的组件

### 三，路由简单实现

#####  3.1 **hash**模式

hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，**改变 URL 中的 hash 部分不会引起页面刷新**。

通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：

1. 通过浏览器前进后退改变 URL
2. 通过`<a>`标签改变 URL
3. 通过window.location改变URL

通过 `location.hash = 'foo'` 这样的语法来**改变**，路径就会由 `baidu.com` 变更为 `baidu.com/#foo`。

通过 `window.addEventListener('hashchange')` 这个事件，就可以**监听**到 `hash` 值的变化。



##### 3.2 **history**模式

`history` 提供了` pushState `和 `replaceState `两个方法，**这两个方法改变 `URL` 的` path` 部分不会引起页面刷新**.

`history` 提供类似` hashchange `事件的 `popstate `事件，但` popstate` 事件有些不同：

1. 通过浏览器前进后退改变 `URL `时会触发` popstate` 事件
2. 通过`pushState/replaceState`或`<a>`标签改变 `URL `不会触发 `popstate` 事件。
3. 好在我们可以拦截 `pushState/replaceState`的调用和`<a>`标签的点击事件来检测 URL 变化
4. 通过`js` 调用`history`的`back`，`go`，`forward`方法来触发该事件。

所以监听` URL `变化可以实现，只是没有` hashchange `那么方便。



**为什么路径更新后，浏览器页面不会重新加载？**

这里我们需要思考一个问题，平常通过 `location.href = 'baidu.com/foo'` 这种方式来跳转，是会让浏览器重新加载页面并且请求服务器的，但是 `history.pushState` 的神奇之处就在于它可以让 `url` 改变，但是不重新加载页面，完全由用户决定如何处理这次 url 改变。

因此，这种方式的前端路由必须在支持 ``histroy` `API `的浏览器上才可以使用。



**为什么刷新后会 404？**

本质上是因为刷新以后是带着 `baidu.com/foo` 这个页面去请求服务端资源的，但是服务端并没有对这个路径进行任何的映射处理，当然会返回 404，处理方式是让服务端对于"不认识"的页面,返回 `index.html`，这样这个包含了前端路由相关`js`代码的首页，就会加载你的前端路由配置表，并且此时虽然服务端给你的文件是首页文件，但是你的 `url` 上是 `baidu.com/foo`，前端路由就会加载 `/foo` 这个路径相对应的视图，完美的解决了 404 问题。

`history` 路由的**监听**也有点坑，浏览器提供了 `window.addEventListener('popstate')` 事件，但是它只能监听到浏览器回退和前进所产生的路由变化，对于主动的 `pushState` 却监听不到。解决方案当然有，下文实现 `react-router` 的时候再细讲~



###  四，原生js实现前端路由

##### 4.1基于hash实现

```html
<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <!-- 定义路由 -->
        <li><a href="#/home">home</a></li>
        <li><a href="#/about">about</a></li>

        <!-- 渲染路由对应的 UI -->
        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = routeView
    window.addEventListener('hashchange', ()=>{
        let hash = location.hash;
        routerView.innerHTML = hash
    })
    window.addEventListener('DOMContentLoaded', ()=>{
        if(!location.hash){//如果不存在hash值，那么重定向到#/
            location.hash="/"
        }else{  //如果存在hash值，那就渲染对应UI
            let hash = location.hash;
            routerView.innerHTML = hash
        }
    })
</script>
</html>


```

解释下上面代码，其实很简单：

1. 我们通过`a`标签的`href`属性来改变`URL`的`hash`值（当然，你触发浏览器的前进后退按钮也可以，或者在控制台输入`window.location`赋值来改变`hash`）
2. 我们监听`hashchange`事件。一旦事件触发，就改变**`routerView`**的内容，若是在`vue`中，这改变的应当是**router-view**这个组件的内容
3. 为何又监听了`load`事件？这时应为页面第一次加载完不会触发 `hashchange`，因而用`load`事件来监听`hash`值，再将视图渲染成对应的内容。

##### 4.2  基于 history 实现

```html
<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <li><a href='/home'>home</a></li>
        <li><a href='/about'>about</a></li>

        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = routeView
    window.addEventListener('DOMContentLoaded', onLoad)
    window.addEventListener('popstate', ()=>{
        routerView.innerHTML = location.pathname
    })
    function onLoad () {
        routerView.innerHTML = location.pathname
        var linkList = document.querySelectorAll('a[href]')
        linkList.forEach(el => el.addEventListener('click', function (e) {
            e.preventDefault()  //拦截` <a>` 标签点击事件默认行为
            history.pushState(null, '', el.getAttribute('href')) //使用pushState改变url，页面不会刷新
            routerView.innerHTML = location.pathname
        }))
    }

</script>
</html>
```

解释下上面代码，其实也差不多：

1. 我们通过a标签的`href`属性来改变URL的path值（当然，你触发浏览器的前进后退按钮也可以，或者在控制台输入`history.go,back,forward`赋值来触发`popState`事件）。
2. 这里需要注意的就是，当改变`path`值时，默认会触发页面的跳转，所以需要拦截` <a>` 标签点击事件默认行为， 点击时使用` pushState` 修改` URL`并更新手动 `UI`，从而实现点击链接更新 `URL` 和 `UI `的效果。
3. 我们监听**popState**事件。一旦事件触发，就改变**routerView**的内容。
4. `load`事件则是一样的



