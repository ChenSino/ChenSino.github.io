---
title: vue异步渲染引发的问题
date: 2023-12-18
author: chensino
publish: true
---

### 问题描述

在vue中，我们经常会遇到异步渲染引发的问题，我这里有个父组件给子组件传值的问题，就是很普通的父组件传递一个属性给子组件

```vue
<!---父组件代码：circleContentForm.circleCode是父组件请求后台异步返回的数据-->
<template>
    <CircleMember :circleCode="circleContentForm.circleCode"/>
</template>

<script lang="ts" setup>
   //....省略
   const getCircleContentById = () => {
  //查询列表
    getCircleContentByIdHttp(currentCircleId.value).then((res: CircleContent) => {
        circleContentForm.id = res.id
        circleContentForm.circleCode = res.circleCode
        circleContentForm.circleName = res.circleName
        circleContentForm.briefIntro = res.briefIntro
        circleContentForm.personInCharge = res.personInCharge
        circleContentForm.labelCode = res.labelCode
        circleContentForm.circlePrivacy = res.circlePrivacy
        circleContentForm.categoryCode = res.categoryCode
        circleContentForm.remark = res.remark
        circleContentForm.auditStatus = res.auditStatus
        circleContentForm.icon = res.icon
    })
}
</script>
```

```vue
<!---子组件代码：-->
<script lang="ts" setup>
    const props = defineProps({
    circleCode: {
        type: String, //参数类型
        default: String, //默认值
        required: true, //是否必须传递
    }
    })

    onMounted(() => {
        console.log("onMounted  props:::",props)
        console.log("onMounted  circleCode:::",props.circleCode)
    })
</script>
```

子组件中就简单打印从父组件获取的属性，但是时好时坏，经常获取不到，经过排查，发现是因为父组件的异步渲染引起的，父组件的异步渲染是异步的，父组件渲染子组件时，http响应还没处理完，所以传递到子组件的值就是空的。

### 解决方法

#### 使用if解决

使用if，保证父组件的异步请求响应后再渲染子组件
```vue
<!---父组件代码：circleContentForm.circleCode是父组件请求后台异步返回的数据-->
<template>
    <div>
        <CircleMember v-if="circleContentForm.circleCode" :circleCode="circleContentForm.circleCode"/>
    </div>
</template>

```

#### gpt提供方法

方法1
在父组件中进行异步请求：在父组件的 created 或 mounted 生命周期钩子函数中发起 HTTP 请求，并在请求成功后将数据赋值给父组件的一个属性。

```javascript
export default {
  data() {
    return {
      responseData: null // 初始化为 null
    };
  },
  async created() {
    try {
      const response = await axios.get('your_api_url');
      this.responseData = response.data; // 将请求返回的数据赋值给属性
    } catch (error) {
      console.error(error);
    }
  }
};
```

方法2
使用条件渲染：在父组件中使用 v-if 或者 v-show 指令，只有当属性有值时才渲染子组件。

```html
<child-component v-if="responseData" :propName="responseData"></child-component>
```

方法3
使用计算属性或监听器：在父组件中使用计算属性或监听器来动态地传递属性给子组件。

```javascript
export default {
  data() {
    return {
      responseData: null // 初始化为 null
    };
  },
  async created() {
    try {
      const response = await axios.get('your_api_url');
      this.responseData = response.data; // 将请求返回的数据赋值给属性
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    propToPass() {
      return this.responseData; // 使用计算属性动态返回属性的值
    }
  }
};
```