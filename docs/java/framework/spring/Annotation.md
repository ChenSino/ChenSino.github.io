---
title: 注解
date:  2022-12-21
keys:
tag:
category:
    - Spring
---

## 1、注入注解

~~~markdown
 1. @Autowired
     是Spring中的注解，按照类型注入，此注解可以用于字段属性上以及setter方法上，用在字段上则Spring底层会使用反射对字段进行赋值，用成员变量的在setter方法上，则会调用setter方法进行注入。
 2. @Autowired + @Qualifier 
    按照bean的名字注入
 3. @Resource
    是JavaEE规范中的注解在JSR250引入，默认是按照bean的名字注入，如果没指定名字则按照类型注入
~~~
