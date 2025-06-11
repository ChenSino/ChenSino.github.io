---
title: ElementUI 使用问题
date: 2025-06-11
author: chensino
publish: true
isOriginal: true
---

### 1. ElForm下的Input输入框触发整个页面刷新的问题

> 背景问题：
> ElForm下有一个ElInput输入框，当光标在输入框时，按enter键会触发整个页面刷新。

::: danger 原因
[W3C标准定义](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：

当一个表单中只有一个单行文本输入字段时， 浏览器应当将在此字段中按下 Enter （回车键）的行为视为提交表单的请求。 如果希望阻止这一默认行为，可以在 `<el-form>`标签上添加 @submit.prevent。

:::

