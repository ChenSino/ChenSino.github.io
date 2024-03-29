---
title: 旁路由网关
date: 2024-03-29
author: chensino
publish: true
isOriginal: true
---

## vmware中使用openwrt做旁路由网关

:::danger 注意！！
在windows下，如果宿主机是通过无线网卡连接的网络，vmware中的openwrt是无法作为一个正常的旁路由网关的，具体表现如下：
vmware中其他系统可以正常使用openwrt做旁路由网关，但是局域网内其他终端（包括宿主机）是无法使用这个openwrt作为网关的。
解决方式：
要么不要用windows系统，要么把宿主机切换为有线连接
:::

## 参考

[关于vmware搭openwrt旁路由 无线网卡设备无法上网](https://blog.csdn.net/m15151850711/article/details/121848463?spm=1001.2014.3001.5506)