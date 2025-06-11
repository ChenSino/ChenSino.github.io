---
title:  PHP远程debug
date: 2025-05-23
author: chensino
publish: true
isOriginal: true
---

### Java和PHP的远程调试差异

一直以来都是做Java开发，最近接触wordpress想开发自定义功能，在搭建远程debug环境遇到各种坑。在java中远程debug很简单，只需要在服务端启动的时候指定debug端口，idea启动远程debug连接到这个端口就可以了。
而在PHP远程调试就比较麻烦，php是在客户端（我用的phpstorm）监听一个9003端口，然后服务端连接到这个端口，这个调试端口是在客户端的，和java完全相反。

### PHP 远程debug

流程

**装xdebug，配置xdebug**

```
[xdebug]
zend_extension="/usr/local/lib/php/extensions/no-debug-non-zts-20220829/xdebug.so"
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.client_port=9003
xdebug.client_host=192.168.1.100
xdebug.log=/tmp/xdebug.log
```
从名字也可以看出来xdebug.client_host是客户端也就是你的phpstorm所在机器ip，同理xdebug.client_port是phpstorm启动的监听端口
xdebug.log配置一下，方便定位debug失败原因

**phpstorm启动9003，并且需要配置本地文件和远程服务端的文件映射**


![](https://ddns.chensina.cn:2032/afatpig/blog/20250523174125999.png)
![](https://ddns.chensina.cn:2032/afatpig/blog/20250523174528498.png)

### 遇到的坑

注意事项：
1. 若用了docker，在phpstorm配置映射文件路径时，路径要是docker容器内的项目所在路径，不能配置宿主机上的
2. 在phpstorm配置server时，不能使用nginx转发的端口，要使用原生端口