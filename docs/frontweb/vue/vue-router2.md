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

## 一， 路由的本质

简单来说，浏览器端路由其实并不是真实的网页跳转（和服务器没有任何交互），而是纯粹在浏览器端发生的一系列行为，本质上来说前端路由就是：

 **对 url 进行改变和监听，来让某个 dom 节点显示对应的视图**

## 二， 路由的区别

一般来说，浏览器端的路由分为两种：

1. `hash` 路由，特征是` url` 后面会有 # 号，如` baidu.com/#foo/bar/baz`。
2. `history` 路由，`url` 和普通路径没有差异。如 `baidu.com/foo/bar/baz`。

我们已经讲过了路由的本质，那么要实现前端路由，需要解决两个核心：

1. 如何改变 URL 却不引起页面刷新？
2. 如何检测 URL 变化了？，并且展示对应的组件

## 三，路由简单实现

#### 3.1 **hash**模式

hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，**改变 URL 中的 hash 部分不会引起页面刷新**。

通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：

1. 通过浏览器前进后退改变 URL
2. 通过`<a>`标签改变 URL
3. 通过window.location改变URL

通过 `location.hash = 'foo'` 这样的语法来**改变**，路径就会由 `baidu.com` 变更为 `baidu.com/#foo`。

通过 `window.addEventListener('hashchange')` 这个事件，就可以**监听**到 `hash` 值的变化。



#### 3.2 **history**模式

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



##  四，原生js实现前端路由

#### 4.1基于hash实现

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

#### 4.2  基于 history 实现

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

4. router/index.js`load`事件则是一样的。

   

   

   

## 五，剖析`Vue-router`

这里是一个vue-router的基本使用。

```vue
//APP.vue

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

```

```javascript
//router/index.js

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from "../views/About.vue"
Vue.use(VueRouter)
  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
const router = new VueRouter({
  mode:"history",
  routes
})
export default router

```

现在我们决定创建自己的`Vue-router`,于是创建`myVueRouter.js`.



先抛出个问题，`Vue`项目中是怎么引入`VueRouter`。

1. 安装`VueRouter`，再通过`import VueRouter from 'vue-router'`引入.
2. 先 `const router = new VueRouter({...})`,再把router作为参数的一个属性值，`new Vue({router})`
3. 通过`Vue.use(VueRouter)` 使得每个组件都可以拥有router实例



从这个引入过程我们可以发现什么？

1. 我们是通过`new VueRouter({...})`获得一个`router`实例，也就是说，我们引入的`VueRouter`其实是一个类。

   所以我们可以初步假设

   ```
   class VueRouter{
       
   }
   ```

2. 我们还使用了`Vue.use()`,而`Vue.use`的一个原则就是执行对象的install这个方法,所以，我们可以再一步 假设`VueRouter`有有`install`这个方法。

   ```
   class VueRouter{
   
   }
   VueRouter.install = function () {
       
   }
   ```

   到这里，你能大概地将`VueRouter`写出来吗？

   很简单，就是将上面的`VueRouter`导出，如下就是`myVueRouter.js`

   ```vue
   
   class VueRouter{
   
   }
   VueRouter.install = function () {
       
   }
   
   export default VueRouter
   
   ```

   

六，分析`Vue.use`

`Vue.use(plugin)`;

> 参数：{ **Object** | **Function** } plugin

用法：安装Vue.js插件。如果插件是一个对象，必须提供install方法。如果插件是一个函数，它会被作为install方法。						调用install方法时，会将`Vue`作为参数传入。install方法被同一个插件多次调用时，插件也只会被安装一次。

作用：注册插件，此时只需要调用install方法并将`Vue`作为参数传入即可。但在细节上有两部分逻辑要处理:

​			1、插件的类型，可以是install方法，也可以是一个包含install方法的对象

​			2、插件只能被安装一次，保证插件列表不能有重复的插件

实现：

```javascript

Vue.use = function(plugin){
	const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
	if(installedPlugins.indexOf(plugin)>-1){ //判断插件是否注册过
		return this;
	}
	<!-- 其他参数 -->
	const args = toArray(arguments,1);
	args.unshift(this);
	if(typeof plugin.install === 'function'){//如果对象有plugin方法
		plugin.install.apply(plugin,args);
	}else if(typeof plugin === 'function'){ //如果插件本身是一个函数
		plugin.apply(null,plugin,args);
	}
	installedPlugins.push(plugin);
	return this;
}

```

1. ​	在`Vue.js`上新增了use方法，并接收一个参数`plugin`。

2. ​	首先判断插件是不是已经别注册过，如果被注册过，则直接终止方法执行，此时只需要使用`indexOf`方法即可.

3.    `toArray`方法我们在就是将类数组转成真正的数组。使用`toArray`方法得到`arguments`。除了第一个参数之外，剩余的所有参数将得到的列表赋值给`args`，然后将`Vue`添加到`args`列表的最前面。这样做的目的是保证install方法被执行时第一个参数是`Vue`，其余参数是注册插件时传入的参数。

4.  由于`plugin`参数支持对象和函数类型，所以通过判断`plugin.install`和`plugin`哪个是函数，即可知用户使用哪种方式祖册的插件，然后执行用户编写的插件并将`args`作为参数传入。

5. 最后，将插件添加到`installedPlugins`中，保证相同的插件不会反复被注册。

   

   

   第三点讲到，我们把`Vue`作为`install`的第一个参数，所以我们可以把`Vue`保存起来.

   ```javascript
   
   let vue = null;
   class VueRouter{
   
   }
   VueRouter.install = function (v) {
       Vue = v;
   };
   
   export default VueRouter
   
   ```

   然后再通过传进来的`Vue`创建两个组件`router-link`和`router-view`

   ```javascript
   //myVueRouter.js
   let Vue = null;
   class VueRouter{
   
   }
   VueRouter.install = function (v) {
       Vue = v;
       console.log(v);
   
       //新增代码
       Vue.component('router-link',{
           render(h){
               return h('a',{},'首页')
           }
       })
       Vue.component('router-view',{
           render(h){
               return h('h1',{},'首页视图')
           }
       })
   };
   
   export default VueRouter
   ```

   我们执行下项目，如果没报错，说明我们的假设没毛病。

   ![image-20221018111109282](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20221018111109282.png)

   没报错。没毛病！

   
## 六、 完善install方法

install 一般是给每个`vue`实例添加东西的，在这里就是给每个组件添加$route和$router。

**`$route`和`$router`有什么区别？**

`$router`是`VueRouter`的实例对象，`$route`是当前路由对象，也就是说`$route`是`$router`的一个属性 注意每个组件添加的`$route`是是同一个，`$router`也是同一个，所有组件共享的。

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

```

我们可以发现这里只是将`router` ，也就是./router导出的store实例，作为`Vue `参数的一部分。

但是这里就是有一个问题咯，这里的`Vue` 是根组件啊。也就是说目前只有根组件有这个`router`值，而其他组件是还		没有的，所以我们需要让其他组件也拥有这个router。

因此，install方法我们可以这样完善.

```javascript
//myVueRouter.js
let Vue = null;
class VueRouter{

}
VueRouter.install = function (v) {
    Vue = v;
    // 新增代码---保证在所有组件中我们可以取到router实例
    Vue.mixin({
        beforeCreate(){
            if (this.$options && this.$options.router){ // 如果是根组件
                this._root = this; //把当前实例挂载到_root上
                this._router = this.$options.router;
            }else { //如果是子组件
                this._root= this.$parent && this.$parent._root
            }
            
            Object.defineProperty(this,'$router',{
                get(){
                    return this._root._router
                }
            })
        }
    })

    Vue.component('router-link',{
        render(h){
            return h('a',{},'首页')
        }
    })
    Vue.component('router-view',{
        render(h){
            return h('h1',{},'首页视图')
        }
    })
};

export default VueRouter

```

代码解释：

1. 参数`Vue`，我们在第四小节分析`Vue.use`的时候，再执行install的时候，将`Vue`作为参数传进去。
2. `mixin`的作用是将`mixin`的内容混入到`Vue`的初始参数options中。
3. 为什么是`beforeCreate`而不是`created`呢？因为如果是在`created`操作的话，`$options`已经初始化好了。
4. 如果判断当前组件是根组件的话，就将我们传入的`router`和_`root`挂在到根组件实例上
5. 如果判断当前组件是子组件的话，就将我们root根组件挂载到子组件。注意是**引用的复制**，因此每个组件都拥有了同一个root根组件挂载在它身上。

然后我们通过

```javascript

Object.defineProperty(this,'$router',{
  get(){
      return this._root._router
  }
})

```

将`$router`挂载到组件实例上。

其实这种思想也是一种代理的思想，我们获取组件的`$router`，其实返回的是根组件的`_root._router`

到这里还install还没写完，可能你也发现了，`$route`还没实现，现在还实现不了，没有完善`VueRouter`的话，没办法获得当前路径.

## 七，完善`VueRouter`类

我们先看看我们`new VueRouter`类时传进了什么参数。

```javascript
const router = new VueRouter({
  mode:"history",
  routes
})
```

可见，传入了一个为数组的路由表`routes`，还有一个代表 当前是什么模式的`mode`。因此我们可以先这样实现`VueRouter`.

```javascript

class VueRouter{
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || [] //你传递的这个路由是一个数组表
    }
}
```

先接收了这两个参数。

但是我们直接处理`routes`是十分不方便的，所以我们先要转换成`key：value`的格式

```javascript
//myVueRouter.js
let Vue = null;
class VueRouter{
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || [] //你传递的这个路由是一个数组表
        this.routesMap = this.createMap(this.routes)
        console.log(this.routesMap);
    }
    createMap(routes){
        return routes.reduce((pre,current)=>{
            pre[current.path] = current.component
            return pre;
        },{})
    }
}
```

通过`createMap`我们将

```javascript
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
```

转换成

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS80MmQ0N2EzMy01ZTU0LTRiNzQtOTJkYi1hNGRkNzc3NGY0MzQucG5n)

路由中需要存放当前的路径，来表示当前的路径状态 为了方便管理，可以用一个对象来表示.

```javascript
//myVueRouter.js
let Vue = null;
新增代码
class HistoryRoute {
    constructor(){
        this.current = null
    }
}
class VueRouter{
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || [] //你传递的这个路由是一个数组表
        this.routesMap = this.createMap(this.routes)
        新增代码
        this.history = new HistoryRoute();
        
    }

    createMap(routes){
        return routes.reduce((pre,current)=>{
            pre[current.path] = current.component
            return pre;
        },{})
    }

}
```

但是我们现在发现这个`current`也就是 当前路径还是null，所以我们需要进行初始化。

初始化的时候判断是是`hash`模式还是 `history`模式。，然后将当前路径的值保存到`current`里.

```javascript
//myVueRouter.js

let Vue = null;
class HistoryRoute {
    constructor(){
        this.current = null
    }
}
class VueRouter{
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || [] //你传递的这个路由是一个数组表
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRoute();
        新增代码
        this.init()

    }
    新增代码
    init(){
        if (this.mode === "hash"){
            // 先判断用户打开时有没有hash值，没有的话跳转到#/
            location.hash? '':location.hash = "/";
            window.addEventListener("load",()=>{
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener("hashchange",()=>{
                this.history.current = location.hash.slice(1)
            })
        } else{
            location.pathname? '':location.pathname = "/";
            window.addEventListener('load',()=>{
                this.history.current = location.pathname
            })
            window.addEventListener("popstate",()=>{
                this.history.current = location.pathname
            })
        }
    }

    createMap(routes){
        return routes.reduce((pre,current)=>{
            pre[current.path] = current.component
            return pre;
        },{})
    }
}

```
