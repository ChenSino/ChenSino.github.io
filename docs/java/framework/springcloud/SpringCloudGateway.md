---
title: 网关路由失效
date: 2023-06-20
isOriginal: true
---

## 问题描述

有一个业务服务，启动了两个做成负载均衡，分别为10.6.6.11:2221,10.6.6.11:5221,为了调试，所以把route修改为只路由到5221,但是网关服务配置好route后，发送请求无法路由到指定的10.6.6.11:5221服务，一直路由到另一个服务10.6.6.11:2221上，并且连自定义的gatewayfilter都失效了

请求路径为：`http://gateway:port/mcs/test`
配置如下

```yml
spring:
  cloud:
    gateway:
      discovery:
        # 让gateway可以发现nacos中的微服务，实现动态路由
        locator:
          enabled: true
          lower-case-service-id: true
          filters:
            - StripPrefix=0
      #路由数组[路由 就是指定当请求满足什么条件的时候转到哪个微服务]
      routes:
        - id: mcs
          uri: http://10.10.102.106:5221
          predicates:
            - Path=/mcs/**
          filters:
            - StripPrefix=1
```

## 原因

还是对gateway不够熟悉，其实是因为配置了`spring.cloud.gateway.locator.enable=true`，这个配置会开启服务自动发现，从而实现动态路由。意思就是当你开启了这个配置，就会自动去到你的请求路径去找服务名，这里我的服务名就是mcs,当请求`http://gateway:port/mcs/test`，发现有mcs,就会自动把这个请求路由到服务名为mcs的服务上（去注册中心找这个服务），如果找不到这个服务，那么就会继续从下面配置的route中去看看有没有匹配的。所以这里可以在nacos手动把msc下线，你就会发现下面的route生效了，可以路由到5221了。

> 动态路由：  
> 动态路由说白了就是每新注册一个服务，都可以通过`http://gateway:port/serviceName/xxx`去访问，而无需手动配置路由，这种情况在大多数情况是很方便，但是遇到需要自定义路由就非常不好，比如我们上面需要把所有请求都路由到5221.。

## 针对本次问题的解决方法

### 方法1

把动态路由配置关闭（默认就是关闭）

### 方法2

到nacos把服务下线，route中的路由就会生效，当然uri只能用具体ip的形式了，不能使用lb://servicename这种负载均衡写法了