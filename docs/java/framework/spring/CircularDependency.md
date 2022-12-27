---
title: Spring循环依赖
date:  2022-12-23
author: chensino
keys:
category:
    - Spring
tag:
---

## 1、循环依赖的产生

> A依赖B,B也依赖于A

~~~java
public class A{
    private A a;

    public void setA(A a){
        this.a = a;
    }

    public A getA(){
        return this.a;
    }
}

public class B{
    private B b;

    public void setA(B b){
        this.b = b;
    }

    public B getB(){
        return this.b;
    }
}
~~~

## 2、Spring是如何解决的循环依赖问题

### 2.1 Bean的生命周期

![Bean的生命周期](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221226111134.png)

### 2.2 依赖注入的过程

核心是利用了setter方法的注入方式解决的循环依赖，使用构造方法注入是无法解决依赖注入的问题。

~~~markdown
1. 通过反射调用A的无参构造方法，创建一个A对象；
2. 调用setter注入B,B b = factory.getBean(B.class)，此时会触发B的bean初始化，
    2.1 反射创建B对象
    2.2 调用B的setter方法，获取A对象，A a = factory.getBean(A.class)，
    2.3 发现A的bean（此时只是一个空对象，还未填充属性）已存在，把Aset到B对象中
    2.4 B对象接着执行后续的逻辑，BeanPostProcessor前置处理——>初始化——>BeanPostProcessor后置处理等
    2.5 处理玩以后返回B的bean给A
3. A拿到B的Bean后接着setter,然后继续执行后续逻辑，和上面B的过程一样
~~~
