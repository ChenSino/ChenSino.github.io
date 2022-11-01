---
title: Http
date: 2022-11-01
author: chensino
tag: 
  - 必会
---

::: danger 必看手册
  https://developer.mozilla.org/zh-CN/docs/Web/HTTP
:::

## 一、状态码

### 1.1 3xx

### 1.1.1 304

HTTP 304 Not Modified 说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），例如GET 或HEAD 或在请求中附带了头部信息： If-None-Match 或If-Modified-Since。

如果是 200 OK ，响应会带有头部 Cache-Control, Content-Location, Date, ETag, Expires，和 Vary.

::: danger 温馨提示
很多浏览器的 开发者工具 会发出额外的请求，以达到 304 的目的，这样可以把资源以本地缓存的形式展现给开发者。一般缓存静态文件，如果用户在服务器上修改了静态文件，则请求时服务器会读取其修改时间，
这样就知道此文件是已修改过的，需要重新响应给浏览器修改后的内容。
:::
比如以下请求，浏览器会自动携带If-Modified-Since请求头，然后拿这个时间和服务器上文件修改时间对比，如果服务器上的时间比这个新，就会返回200,否则返回304。
![20221101150553](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221101150553.png)

另外浏览器有个Disable cache选择项，勾选此项代表不允许浏览器自动携带If-Modified-Sinc请求头，也就无法使用本地缓存了。当使用Ctrl+F5刷新页面时也是同样的道理，不携带If-Modified-Sinc请求头。
![20221101150938](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221101150938.png)
