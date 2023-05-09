---
title: spring-security-oauth2-authorization-server
date: 2023-05-09
isOriginal: true
category: 
tag: 
---

## 介绍 

spring-security-oauth2已经被废弃，采用Security5.7 之后就用spring-security-oauth2-authorization-server，

## /oauth2/token

在之前的老版本中请求token的端点是在一个叫做TokenEndpoint的类中，此类可以处理/oauth/token请求，这个类可看成是一个Controller，而在新版本中已经没有这个类，新版本中请求token的端点是/oauth2/token,我看源码没有找到对应的controller,直到我debug源码，才发现根本没有类似之前的专门处理/oauth/token的controller,其实新版本在Filter（实际是OAuth2TokenEndpointFilter）中就已经直接响应给客户端了，
![20230509201806](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230509201806.png)

下面写个demo测试在filter中直接响应，新建一个springboot的web项目，添加一个filter，这个过滤器仅仅用来测试，所有请求都给他返回一个“hello world"，我们请求任意路径发现确实如此，根本没有进入Controller，我甚至都没定义Controller，打破了我的惯性思维，潜意识认为只要有请求，最终都要进入Controller,谬矣。

```java
@Component
public class CustomFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.getWriter().write("hello world");
    }
}
```
![20230509201658](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230509201658.png)