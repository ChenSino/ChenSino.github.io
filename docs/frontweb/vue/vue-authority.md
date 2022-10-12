---
title: vue中权限相关的问题
date: 2022-07-06  
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---


##  前端主要有哪些权限控制？

### **一，接口访问权限**

接口权限目前一般采用通用的形式来验证(用户是否登录系统)，没有的话一般返回401，跳转到登录页面重新进行登录 ,登录成功后拿到`token`，将`token`存起来，通过`axios`请求拦截器进行拦截，每次请求的时候头部携带`token`。

```javascript

axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
})
axios.interceptors.response.use(res=>{},{response}=>{
    if (response.data.code === 40099 || response.data.code === 40098) { //token过期或者错误
        router.push('/login')
    }
})

```

###  **二，菜单权限**



方式一：可访问的路由前端来控制

具体实现思路如下：

1，当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个**token**，拿到token之后（我会将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态）

2，前端会根据token再去拉取一个 **user_info** 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

3，权限验证：通过token获取用户对应的 **role**，动态根据用户的 role 算出其对应有权限的路由，通过   **router.addRoutes** 动态挂载这些路由。

具体实现:

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/clipboard.png)



```javascript

{
        path: '/path', 
        component: () => import('./component'),
        name: 'componentName',
        meta: {
            menuName：'菜单名称'
            auth: 'authCode'
        }
    } 
    
```

这种方式的菜单是根据我们匹配出来的路由表生成，并渲染的（当然，结构需要保持一致）。

**缺点**

- 菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译，并且发版本
- 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，有时候路由不一定要作为菜单展示，需要另外加字段不方便



**方式三，菜单和路由都由后端返回**

用户登录后向后端请求可访问的路由表，从而动态生成可访问页面，操作和原来是相同的，将后端返回的路由通过`addRoutes`动态挂载之前，这里多了一步将后端返回路由表中组件名称和本地的组件映射步骤：

```javascript
 
    1. 前端统一定义路由组件
     const Home = () => import("../pages/Home.vue");
     const UserInfo = () => import("../pages/UserInfo.vue");
     export default {
         home: Home,
         userInfo: UserInfo
     };
     
 2.后端路由组件返回以下格式
[
    {
        name: "home",
        path: "/",
        component: "home"
    },
   {
      name: "home",
      path: "/userinfo",
      component: "userInfo"
    }
]

```

```javascript

//前端的映射表map
//服务端返回的map类似于
const serviceMap = [
	{path:'/login',component:'login',hidden:true}
]
//遍历serviceMap,将component替换为 map[component],动态生成asyncRoutes
function mapComponent(serviceMap){
	serviceMap.forEach(route => {
    route.component = map[route.component];
    if(route.children){
    	route.children.map(child => mapComponent(child))
      }
	})
}
mapComponent(serviceMap)

```

### 三，按钮权限

[使用自定义指令来实现按钮级别的权限控制]()

参考文章

 [vue之权限控制和动态路由](https://juejin.cn/post/6866324830212325383)

[手摸手，带你用vue撸后台 系列二(登录权限篇)](https://juejin.cn/post/6844903478880370701)
