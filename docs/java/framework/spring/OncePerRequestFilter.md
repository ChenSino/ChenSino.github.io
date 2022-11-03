---
title: OncePerRequestFilter
date:  2022-11-03
author: chensino
keys:
category:
tag:
---

## 1、OncePerRequestFilter

`org.springframework.web.filter.OncePerRequestFilter`是springweb中的一个过滤器，是为了确保一个请求只被过滤器执行一次。什么？难道一个请求还能被同一个过滤器执行多次？
其实是有这中可能的，在不同版本下的servlet下，过滤器的行为是不一样的。比如在servlet-2.3中，Filter会过滤一切请求，包括服务器内部使用forward转发请求和<%@ include file="/index.jsp"%>的情况。到了servlet-2.4中Filter默认下只拦截外部提交的请求，forward和include这些内部转发都不会被过滤。因为Springweb无法保证每个用户使用的Servlet容器是一样的，因此，在有些场景如果我们要确保同一个请求只能被过滤器处理一次，那就需要spring自己来实现了，因此有了这个类。其注释下写的很清楚，就是为了要陈any servlet container都确保只执行一次。

![20221103172449](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221103172449.png)

## 2、参考

[Spring的OncePerRequestFilter过滤器](https://blog.csdn.net/weixin_43944305/article/details/119923969)  
[Spring的OncePerRequestFilter的作用](https://blog.csdn.net/zl1zl2zl3/article/details/79270664)