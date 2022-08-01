---
title: 多线程中的Future
date: 2022-04-06 
author: chenkun
publish: true
keys:
category:
  - 线程池
  - 多线程
tag:
  - 多线程
  - 线程池
---

<!--more-->

## 1、Future的作用

Future可以用来获取一个异步执行的结果，可以使用`isDone`方法检查异步任务是否完成，或者使用`get`阻塞住调用线程，直到计算完成返回结果，你也可以使用`cancel`方法停止任务的执行。
