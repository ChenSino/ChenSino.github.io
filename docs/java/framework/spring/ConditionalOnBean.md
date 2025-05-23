---
title: ConditionalOnBean注解
date: 2025-02-07
author: chensino
publish: true
isOriginal: true
---

### 问题

调试SpringSecurity源码时，发现一个问题，`org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration#securityFilterChainRegistration`方法上使用了`@ConditionalOnBean(name = DEFAULT_FILTER_NAME)`注解，这个注解是判断`springSecurityFilterChain`这个bean存在的时候才执行方法创建securityFilterChainRegistration这个bean。springSecurityFilterChain的bean创建是在`org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration#springSecurityFilterChain`，调试的时候我发现securityFilterChainRegistration方法执行居然在springSecurityFilterChain之前，这里让我很迷惑，按照一般思路应该是先执行`springSecurityFilterChain()`创建springSecurityFilterChain的bean后，securityFilterChainRegistration方法执行的时候`@ConditionalOnBean(name = DEFAULT_FILTER_NAME)`这个注解才能判断通过。

### 先说原因

ConditionalOnBean这个注解在判断时其实并不是真的判断bean是否存在，它判断的其实是某个bean的definition是否存在并不是判断bean实例，如果这个bean的definition存在则ConditionalOnBean就匹配成功。关于beandefinition请参考之前的源码[SpringIOC](./SpringIOC.md)

### 源码查看

```java
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnBeanCondition.class)
public @interface ConditionalOnBean {
    //省略...
}
```

ConditionalOnBean注解依赖于OnBeanCondition这个类进行实际的处理判断。经过一系列的代码最终会执行到`org.springframework.boot.autoconfigure.condition.OnBeanCondition#getMatchingBeans(org.springframework.boot.autoconfigure.condition.OnBeanCondition.Spec<?>)`，可以在断点添加过滤条件方便观察，这里我观察的是`org.springframework.security.web.SecurityFilterChain`，知道在哪里打断点就可以了，其他细节不再赘述

![](https://ddns.chensina.cn:2032/afatpig/blog/2025-02-07_11-57.png)