---
title: vue-router4.0的基本使用
date: 2022-10-08 
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

<!--more-->

### 一，安装

```bash
npm install vue-router@4
```

### 二，基本用法

2.1 在项目中新建`router/index.js`

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import About from '@/components/About.vue'
import Home from '@/components/Home.vue'
import User from '@/components/User.vue'
import NotFound from '@/components/NotFound.vue'


//定义一些路由
//每个路由都需要映射到一份组件

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/users/:id', component: User}
]

//创建路由实例并传递routes配置
 const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

  export default router
  

```

2.2 挂载到`main.js`上

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

2.3 在组件中使用

```vue
<template>
  <div>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/users/johnny">Go to johnny</router-link>
    <router-link to="/users/jolyne">Go to jolyne</router-link>
    <router-view/>
  </div>
</template>
```

### 三，路由的访问

通过`app.use(router)`,我们可以在任意组件中以`this.$router` 的形式访问它。并且以 `this.$route `的形式访问当前路由。

```ts
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username  //访问当前路由带的参数
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
  },
}

```

要在setup函数中访问路由，我们则需要调用`useRouter` 或 `useRoute`

```vue
<template>
    <div>
        user
    </div>
</template>

<script setup lang="ts">
 import { useRouter, useRoute } from 'vue-router'
 import {watch} from 'vue'
    const router = useRouter()
    const route = useRoute()

    watch(()=>route.params,(toParams,previousParams)=>{
        console.log(toParams)
        console.log(previousParams)
    })
</script>

```



