---
title: 搞懂npm与cnpm
date: 2022-10-14 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

## 一，什么是npm



npm是node官方的包管理工具
		cnpm 是淘宝NPM镜像官网，来自[淘宝NPM镜像官网](https://developer.aliyun.com/mirror/NPM?from=tnpm)的说明：

> 淘宝为我们搭建了一个国内的npm服务器，它目前是每隔10分钟将国外npm仓库的所有内容“搬运”回国内的服务器上，这样我们直接访问淘宝的国内服务器就可以了，它的地址是：[https://registry.npm.taobao.org](https://link.zhihu.com/?target=https%3A//registry.npm.taobao.org/)



npm和cnpm只是下载的地址不同，npm是从国外下载东西，cnpm是从国内下载东西。

npm默认的仓库地址为：

```bash
http://registry.npmjs.org
```

查看当前npm仓库地址命令：

```
npm config get registry
```

## 二，什么时候使用cnpm? 



因为npm的远程服务器在国外，所以有时候难免出现访问过慢，甚至无法访问的情况。

**第一种：**

直接安装cnpm 安装淘宝提供的cnpm，并更改服务器地址为淘宝的国内地址， 

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

这个命令行做了两件事：

（1）全局安装 cnpm

（2）并且将安装 `包`（各种包） 的地址切换到 国内的淘宝镜像

以后安装直接采用`cpm`替代`npm`， 例如原生npm命令为：`npm install uniq --save`

cnpm命令为：`cnpm install uniq --save`。



**第二种：**

替换npm仓库地址为淘宝镜像地址（推荐） 命令：

```
npm config set registry https://registry.npm.taobao.org
```

 查看是否更改成功：

```
npm config get registry
```

以后安装时，依然用npm命令，但是实际是从淘宝国内服务器下载的



### [【混淆系列】三问：npx、npm、cnpm、pnpm区别你搞清楚了吗？](https://zhuanlan.zhihu.com/p/494076214)
