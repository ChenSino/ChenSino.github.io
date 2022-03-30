---
title: 打破双亲委派模式
date: 2022/3/30
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---
为什么说spi打破了双亲委派机制？
<!--more-->
# 1、什么是双亲委派？
# 2、什么是SPI
# 3、为什么SPI打破了双亲委派
## 3.1 ContextClassLoader
Thread context class loader存在的目的主要是为了解决parent delegation机制下无法干净的解决的问题。假如有下述委派链：



```mermaid
graph LR;
A[Custom ClassLoader]-->B[Application classloader]-->C[Extension classloader]--> d[Bootstrap class loader]
```


那么委派链左边的ClassLoader就可以很自然的使用右边的ClassLoader所加载的类。

但如果情况要反过来，是右边的ClassLoader所加载的代码需要反过来去找委派链靠左边的ClassLoader去加载东西怎么办呢？没辙，parent delegation是单向的，没办法反过来从右边找左边.

就是说当我们this.getClass().getClassLoader();可以获取到所有已经加载过的文件,
但是Application class loader -> Extension class loader -> Bootstrap class loader 就获取不到Custom ClassLoader 能加载到的信息,那么怎么办呢? 于是,Thread就把当前的类加载器,给保存下来了,其他加载器,需要的时候,就把当前线程的加载器,获取到.
