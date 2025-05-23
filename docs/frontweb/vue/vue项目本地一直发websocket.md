---
title: 探索vue本地启动一直发送websocket请求
date: 2018-03-28  
publish: true
---

##### 1. 背景

去年开始学习vue，用vue写了远程视频+聊天的程序，其中聊天用的是websocket。但是最近我发现vue项目即使不引入websocket包，在依赖中也会自动下载，并且每次在浏览器控制台会多一个websocket的请求，因为之前是用的socket聊天，所以我以为这个websocket是我引入的，知道最近我才发现不是这样的。
下图是一个直接用webpack初始化的一个项目，没有手动添加任何包，可以看到webpack自动下载了websocket包，并且在项目启动后，在控制台可以看到自动发送了websocket请求。
![](https://ddns.chensina.cn:2032/afatpig/blog/20241217163320571.png)

![](https://ddns.chensina.cn:2032/afatpig/blog/20241217163340440.png)

##### 2、原因说明

这是因为webpack的热加载功能引起的，为什么我们改动代码后，浏览器能自动的做出响应呢？这里就是websocket的全双工通信的作用，不仅浏览器可以给服务端发送请求，而且服务器也可以反向的给浏览器发送请求。当我们在bian编辑器（在开发环境就相当于是服务器端）改好代码后，编辑器会发送websocket请求到浏览器（就是我们控制台看到的那个websocket），浏览器收到请求后就知道服务端的代码更新了，就会重新发送请求读取更新后的内容。
webpack启动项目日志如下，可以看到有个hot的包，我猜测这个包应该是热加载用的，因不是专业前端，这里就不深究了。
![](https://ddns.chensina.cn:2032/afatpig/blog/20241217163410562.png)
**验证**
先打开浏览器控制台，当我们修改vue项目代码，在编辑器保存可以看到浏览器中自动发送了一个hot-update的请求，这就是典型的websocket服务端给客户端发送请求，通知客户端（浏览器）进行刷新动作
![](https://ddns.chensina.cn:2032/afatpig/blog/20241217163424910.png)

##### 3、补充说明

在以webpack为基础的项目中还能看到一个http://localhost:8080/sockjs-node/info?t=1617248436524类似这样的请求。该请求的目的是为了保持浏览器和服务器之间的通信，类似心跳检测，如果服务端挂了，就会一直请求失败
![](https://ddns.chensina.cn:2032/afatpig/blog/20241217163436803.png)
手动关闭服务后可以看到请求失败了。有时切换网络，比如有线无线切换、使用代理等会出现这种情况
![](https://ddns.chensina.cn:2032/afatpig/blog/20241217163447124.png)
