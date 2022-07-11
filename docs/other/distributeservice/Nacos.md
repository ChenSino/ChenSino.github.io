---
title: Nacos学习
date: 2022/3/17
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

## 1、配置管理

命名空间——>Group——>Data Id——>配置项

**命名空间：**

> 默认使用的命名空间是public,一个命名空间下可以有多个Group,多个服务。命名空间使用场景是租户粒度的隔离，可以给不同租户不同的命名空间，还可以用于隔离不同环境比如dev、test、prod。
>
> 如下图，我给dev环境设置了两个Group，CCS代表中控系统，BOM代表bom系统。

![image-20220602103505994](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220602103505994.png)

**Group**

> group是应用程序（服务）粒度的隔离，我在dev环境有两个微服务，中控微服务使用CCS分组下的配置，bom微服务使用bom分组下的配置

**DataId**

> 配置集，就是一个配置文件，类似springboot中的application.yml
