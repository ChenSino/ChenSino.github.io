---
title: Linux下加装wifi模块
date:  2022-08-28
keys:
---

## 1、需求场景

场景1：
> 有一个没有wifi模块的电脑，想给他加装一个wifi模块，要求不仅支持windows系统，还需要支持Linux系统，最容易想到的方式是买一个USB无线网卡，
> 但此方法有个问题是一般USB无线网卡不会对Linux系统进行适配，即使有适配也是对系统条件要求很苛刻，比如只能用ubuntu,系统内核限制为指定版本等；

场景2：
> 有一个笔记本电脑，自带的有wifi模块，但是此无线网卡不支持5G、WIFI6等，此时可以根据情况升级无线网卡；

## 2、解决方案——使用板载无线网卡

使用板载无线网卡相对usb无线网卡来说，不会存在驱动的问题，驱动由Intel提供了支持，具体可以参考[此处](https://www.intel.cn/content/www/cn/zh/support/articles/000005511/network-and-i-o/wireless-networking.html)

使用板载网卡一般使用的是NGFF接口，也就是常见的M2接口，一般2015年以后的主板都有这个扩展口。
