---
title: 权限校验原理
date:  2022-12-20
keys:
tag:
category:
    - security
---

## 1、权限说明

认证（Authentication）：登录操作就是最常见的认证方式，就是提供用户名和密码来证明自己是某个系统的合法用户，当用户没有经过认证去访问一个受保护资源时，应当响应401  
授权（Authorization）：授权是检验用户是否有权限访问某个资源，比如普通用户是无法看到管理员界面的，当用户无权访问某个资源，应当响应403

## 2、Security中负责权限校验的类结构图

![Security中权限类](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221220222603.png)

如上图，可以看到最底层有两个类，分别是`FilterSecurityInterceptor` 和`MethodSecurityInterceptor`，这两个类都是AbstractSecurityInterceptor的子类。  
其中FilterSecurityInterceptor还实现了Filter接口，它是一个SecurityFilter，是众多SecurityFilterChain过滤器中的一个，它处理认证问题，当用户访问未认证接口
会被此类拦截，抛出异常，返回401。  

MethodSecurityInterceptor是当程序即将调用Controller中方法之前调用，对应的它处理Controller层被使用了@PreAuthorize注解的方法，它用来校验当前用户是否有注解中
包含的权限，当前用户不包含对应权限时，会抛出异常返回403。
