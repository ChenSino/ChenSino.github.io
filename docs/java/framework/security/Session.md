---
title: Security中的Session
date:  2023-01-03
author: chenkun
keys:
category:
    - Security
---

## 1、背景（问题复现）

~~~markdown

1. 使用idea新建一个springboot项目，引入web和security框架，不做任何配置直接启动web项目
2. 随便访问一个接口比如：http://localhost:8080/hello/aa，此时由于接口被security默认保护，会重定向到登录页面（如图一），此时查看sessionid（也就是name为JSESSIONID的cookie）是91E9629F748637154F86CCB44FB2B23D
3. 然后输入用户名：user,密码：控制台随机生成的，登录后会重定向到之前访问的接口，但此时
   查看JSESSIONID发现变了，变成87957B71A3CEA4FA375CFFACA6AD425D
~~~

![图一](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230103111735.png)
![图二](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230103111820.png)

## 2、sessionid变化的原因

[Session Fixation Attack Protection](https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html)

## 3、源码查看

Security的基本原理就是过滤器，这里不懂的请查看[官方文档](https://docs.spring.io/spring-security/reference/servlet/architecture.html)。当输入用户名和密码后，最终经过一系列的过滤器会到达`UsernamePasswordAuthenticationFilter`,此类会校验
用户名密码，然后校验通过会调用`this.sessionStrategy.onAuthentication(authenticationResult, request, response);`跟踪这里面的代码就会找到答案。

![时序图](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230103113548.png)

## 4、基于Session的认证

了解Security认证原理的应该知道，如果不认证，就直接访问一个受保护的接口，会被重定向到默认登录页面，提示登录，登录成功后会重定向到之前访问的接口。
Security本身是一系列的过滤器在工作，其特有的Filter我们把他叫做SecurityFilter,第一次走到UsernamePasswordAuthenticationFilter时，认证成功
后最终会重定向到之前访问的接口，后面的过滤器不会执行了，我之前调试发现第一次登录执行到
UsernamePasswordAuthenticationFilter后，就直接跳转到接口处理逻辑了，没有继续执行后面的过滤器，跟踪发现UsernamePasswordAuthenticationFilter认证成功后有个方法，吧请求重定向了。

![20230103161747](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230103161747.png)

认证成功会会吧SecurityContext设置到Session中，所以后面在请求时从session获取的认证信息。
