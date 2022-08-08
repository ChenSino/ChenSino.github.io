---
title: typeScript在vue项目中常见用法
date: 2022-08-05 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会y一板中的 TypeScript
---



###  一，模板中的 TypeScript


在使用了 <script lang="ts"> 或 <script setup lang="ts"> 后，<template> 在绑定表达式中也支持 TypeScript。

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- 出错，因为 x 可能是字符串 -->
  {{ x.toFixed(2) }}
</template>
```

可以使用联合类型强制转换解决此问题：

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```



###  二，为组件的prop标注类型

**2.1当使用 `<script setup>` 时，这个 `defineProps()` 宏函数支持从它的参数中推导类型**

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

这被称之为**“运行时声明**”，因为传递给 `defineProps()` 的参数会作为运行时的 `props` 选项使用。



**2.2  然而，通过泛型参数来定义 prop 的类型通常更直接：**

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

这被称之为“基于类型的声明”。编译器会尽可能地尝试根据类型参数推导出等价的运行时选项。

我们也可以将 prop 的类型移入一个单独的接口中：

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```
**2.3  Prop 默认值** 

当使用基于类型的声明时，我们失去了对 prop 定义默认值的能力。这可以通过目前实验性的[响应性语法糖](https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure)来解决：

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

// 对 defineProps() 的响应性解构
// 默认值会被编译为等价的运行时选项
const { foo, bar = 100 } = defineProps<Props>()
</script>
```



###  二，为组件的 emit 标注类型

在 <script setup> 中，emit 函数的类型标注可以通过运行时声明或类型声明进行

```vue
<script setup lang="ts">
// 运行时
const emit = defineEmits(['change', 'update'])

// 基于类型
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

这个类型参数应该是一个带[调用签名](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)的类型字面量。这个类型字面量的类型就是返回的 `emit` 函数的类型。我们可以看到，基于类型的声明使我们可以对所触发事件的类型进行更细粒度的控制。
