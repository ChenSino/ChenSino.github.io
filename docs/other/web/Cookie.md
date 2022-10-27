---
title: Cookie
date: 2022-10-25 16:57:01
author: qianxun
tag: 
  - 必会
---

## Cookie的作用域domain

一级域名：aaa.com
二级域名：bbb.aaa.com
三级域名：ccc.bbb.aaa.com

如上例子：
aaa.com 是 bbb.aaa.com 和 ccc.bbb.aaa.com 的父域名；bbb.aaa.com 是 ccc.bbb.aaa.com 的父域名；
反过来bbb.aaa.com 和 ccc.bbb.aaa.com 是 aaa.com 的子域名；ccc.bbb.aaa.com 是  bbb.aaa.com 的子域名

::: danger 划重点
在当前域名下，只能设置当前域以及父域的cookie，不能设置子域下的cookie。例如我在浏览器访问后端服务的域名为bbb.aaa.com时，我在后端就只能把cookie的
域设置为当前域（缺省状态就是当前）或者设置为其父域名aaa.com,而不能设置为其子域名ccc.bbb.aaa.com,设置子域名前端SetCookie或有警告
:::

::: danger 重点
cookie挂载在某个域下，只有在此域名下或者此域名的子域下才能获取cookie。也就是说例如我当前在浏览器访问的域名为bbb.aaa.com,我只能看到当前域名下的cookie以及父域名aaa.com下的
cookie,而看不到子域名ccc.bbb.aaa.com下的cookie
:::

## Cookie的path

path和域差不多，默认情况下的path是/也就是域下所有路径都可以看到cookie,如果设置了path为/somepth则浏览器只有访问/somepath或者/somepath/***等这些地址才能看到

## 实例

### 域名可以看到当前域以及父域名下的cookie，看不到其子域名下的cookie

![20221027151137](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027151137.png)

![20221027151245](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027151245.png)

### 设置了path,要同时满足url中有指定path才能看到

![20221027151447](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027151447.png)

![20221027151508](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027151508.png)

## 浏览器请求时会自动携带其所有能看到的cookie发送到后端

![20221027153648](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027153648.png)

![20221027153801](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027153801.png)

![20221027153905](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027153905.png)

![20221027153954](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221027153954.png)