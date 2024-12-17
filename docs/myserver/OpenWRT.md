---
title: OpenWRT
date: 2024-12-10
author: chensino
publish: true
isOriginal: true
---

### 问题1：新安装的openwrt没有网络

> 表现为`/etc/resolv.conf`中的dns解析配置nameserver是127.0.0.1，这时ping baidu.com是不通的，但是ping外网ip是可以的，如果手动修改nameserver为
192.168.1.1则发现openwrt网络恢复，但是过一会这个nameserver会被还原为127.0.0.1。说明问题就出现在dns解析上

**解决方法：**

在openwrt设置页面，网络——DHCP/DNS设置页面，把dns转发填写为192.168.1.1，或者其他114.114.114.114之类的dns服务即可。

原理就是当nameserver配置127.0.0.1使用的其实是openwrt自带的dnsmasq提供dns服务，但是没给这个服务设置上游dns所以无法解析。