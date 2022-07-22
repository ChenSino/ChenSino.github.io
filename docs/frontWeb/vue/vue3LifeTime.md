---
title: vue中组件的生命周期
date: 2022-07-06 16:57:01
author: qianxun
categories: 
  - vue知识点
tags: 
  - 必会
---

## 一，vue生命周期钩子函数

![d0c8a786c9177f3e668177cd4bfcf9c19e3d5676](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/d0c8a786c9177f3e668177cd4bfcf9c19e3d5676.png)

### 1.1  beforeCreate

- 该函数执行在`组件创建、数据观测 (data observer) 和 event/watcher 事件配置之前`，实例初始化之后被调用。

- 在该阶段`组件未创建`，`不能访问数据`，组件中的data，ref均为undefined。

  

### 1.2  created

- 该函数在组件创建完成后被立即调用，在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。

- 但是还未渲染成HTML模板，组件中的data对象已经存在，可以对data进行操作了，即可以访问数据，发请求，ref依旧是undefined，挂载阶段还没开始，$el 属性目前尚不可用。

- 般我们可以将对数据的初始化和初始化页面的请求放到里面，结束loading。
  

### 1.3  beforeMount

- 该函数在组件挂载之前，在该阶段页面上`还没`渲染出HTML元素，data初始化完成，ref`依旧`不可以操作，相关的 render 函数`首次`被调用。

- 可以`访问数据`，编译模板`结束`，虚拟dom`已经存在`。

- 该钩子在`服务器端渲染期间不被调用。


### 1.4  mounted
- 该函数是页面完成挂载之后执行的，这时 el 被新创建的 vm.$el 替换了，就可以操作ref了，一般会用于将组件初始时请求数据的方法放到这里面，filter也是在这里生效。

- 如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也在文档内。

- 可以拿到数据和节点，实例被挂载后调用。

**注意 ：mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick：**

```javascript
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

- beforeMount与mounted`实例②`：

  ```vue
  <div id="box">
      <div ref='demo'>demo</div>
  </div>
  <script>
      new Vue({
          el:"#box",
          data:{
              a:666
          },
          mounted(){
              console.log('mounted',this.a);
              console.log(this.$refs.demo);
          },
          beforeMount(){
              console.log('beforeMount',this.a);
              console.log(this.$refs.demo);
          }
      })
  </script>
  
  ```

  以上实例，更加有力的说明：
  beforeMount执行在真实的dom节点挂载之前，此时没有节点，所以拿不到节点。mounted执行时真实的dom节点已经挂载到页面上了，所以能拿到节点。
  

### 1.5 beforeUpdate

- 函数在`数据更新时调用`，发生`在虚拟 DOM 打补丁之前`，在有特殊需求的情况下，可以将更新之前的数据存起来，放到后面去使用。
- 这里适合在`更新之前`访问`现有的 DOM`，比如手动移除已添加的事件监听器。
- 该钩子在`服务器端渲染期间不被调用`，`因为`只有初次渲染会在服务端进行。



### 1.6 updated

- 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子，在数据更新之后做一些处理，即监控数据的变化。

- 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

**注意 ：updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.$nextTick：**

```javascript
updated: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
}

```



> 注意：[watch](https://cn.vuejs.org/v2/api/#watch)是监控特定数据的变化，而updated是监控组件里所有数据的变化。



### 1.7 beforeDestroy

- 该函数在实例销毁之前调用，这里的ref依旧可以操作，实例仍然完全可用，可以在这里做清除定时器的操作，防止内存泄漏。
- 该钩子在服务器端渲染期间不被调用。



### 1.8 destroyed
- 该函数在组件销毁的时候执行，即实例销毁后调用，这里的ref不存在。
- 该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁`。
- 该钩子在服务器端渲染期间不被调用。



（`this.$destroy()`可以销毁组件）

```vue
<div id="box">
  <Com></Com>
</div>
<script>
  var Com = {
    template: `<div> 
                  <button @click="kill">kill</button>
                </div>`,
    mounted() {
      this.timer = setInterval(()=>{
          console.log("hello");
      },1000)
    },
    beforeDestroy(){
        clearInterval(this.timer);
        console.log("beforeDestory")
    },
    destroyed(){
        console.log("destoryed")
    },
    methods:{
        kill(){  //销毁组件
            this.$destroy()
        }
    }
  };
  new Vue({
    el: '#box',
    components: {
      Com,
    },
  });
</script>

```

**组件进行销毁的时候,是先销毁的是父组件,然后销毁子组件**



### 1.9 activated

- 被 keep-alive缓存的组件激活时调用。

- 该钩子在服务器端渲染期间不被调用。


### 1.10 deactivated

- 被 keep-alive缓存的组件停用时调用。
- 该钩子在服务器端渲染期间不被调用。

```vue
<div id="box">
    <keep-alive>
        <component :is="cName"></component>
    </keep-alive>
        <button @click="cName='One'">change1</button>
        <button @click="cName='Two'">change2</button>
</div>
<script>
    var One ={
        template:`<div>one component</div>`,
        activated(){
            console.log("activated");
        },
        deactivated(){
            console.log("deactivated");
        }
    }
    var Two ={
        template:`<div>two component</div>`,
    }
    new Vue({
        el:"#box",
        components:{
            One,Two
        },
        data:{
            cName:'One'  //存组件的名字
        }
    })
</script>

```

### 1.11 errorCaptured

- 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。




## 二、 父子组件生命周期执行顺序

在正常开发，挂载周期的执行顺序为：

父beforeCreate => 父created => 父beforeMount => 子beforeCreate => 子created => 子beforeMount => **子mounted => 父mounted**

在数据更新阶段执行顺序为：

父beforeUpdate => 子beforeUpdate => 子updated => 父updated

在组件销毁阶段执行顺序为：

父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed

由此可见，其实所有周期规律就是：只要子组件被引入触发，所处不管任何周期都是父组件先开始执行，然后等到子组件执行完，父组件收尾。



实际开发中遇到一个问题，父组件中挂载子组件，子组件里也含有子组件，祖父组件中挂载父组件，

。父，子，孙，没有if渲染条件的阻止，mounted的执行顺序为

**孙mounted->父mounted->祖父mounted**

