---
title: vue自定义指令控制按钮级别权限
date: 2022-07-13  
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

<!--more-->



### 一，自定义指令介绍

除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。

vue中重用代码,3种方式：

1. ​	组件 --组件是主要的构建模块
2. ​	组合式函数--主要是侧重于有状态的逻辑
3. ​	自定义指令--主要是为了重用涉及普通元素的底层DOM访问的逻辑


### 二，注册自定义指令

 2.1  局部注册

```vue

const focus = {
  mounted: (el) => el.focus()
}
export default {
  directives: {
    // 在模板中启用 v-focus
    focus
  }
}
<input v-focus />

```

2.2 全局注册

```javascript

const app = createApp({})
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})

```

### 三，指令钩子

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```javascript

const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}

```

###  四，钩子函数的参数

指令的钩子会传递以下几种参数：

- el：指令绑定到的元素。这可以用于直接操作 DOM。
- binding：一个对象，包含以下属性。
- value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
- oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
- arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
- modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
- instance：使用该指令的组件实例。
- dir：指令的定义对象。    
- vnode：代表绑定元素的底层 VNode。
- prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

###  五，实际使用

5.1 使用自定义指令实现按钮级别的权限控制

比如在实际项目工程列表中，我们使用自定义指令来控制权限

1，我们首先列出工程模块所有的权限按钮

2，对比用户登录时，后台返回的按钮权限，有就显示，没有就不显示

```javascript

//后台返回的权限

Pages.ProjectCreation: "true"
Pages.ProjectCreation.Create: "true"
Pages.ProjectCreation.Download: "true"
Pages.ProjectCreation.Edit: "true"
Pages.ProjectCreation.Import: "true"
Pages.ProjectCreation.Query: "true"
Pages.ProjectCreation.Revise: "true"

```

```html

//在工程列表页列出所有按钮--再根据自定义指令控制是否显示

<button v-auth="'Query'">查看</button>
<button v-auth="'Add'">添加</button>
<button v-auth="'Edit'">编辑</button>
<button v-auth="'Cope'">复制</button>
<button v-auth="'Import'">上传</button>
<button v-auth="'Download'">下载</button>

```

```javascript

// src/authDirective.ts 
/*
在自定义指令值中判断权限，来控制相应按钮的显示与否
*/

export function authDirective(app: App) {
    // 单个权限验证（v-auth="xxx"）
    app.directive('auth', {
        mounted(el, binding) {
            const { value } = binding;
            console.log(value)
            let config = Local.get('config')
            console.log(config.auth.grantedPermissions)
            // 当前用户权限列表
            let permission = config.auth.grantedPermissions;
            if (!permission.some((v: string) => v === binding.value)){
                    el.parentNode && el.parentNode.removeChild(el); 
            }     
    });  
}
```

