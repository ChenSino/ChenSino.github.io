---
title: Spring循环依赖
date:  2022-12-23
author: chensino
keys:
category:
    - Spring
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

![Bean的生命周期](https://ddns.chensina.cn:2032/afatpig/blog/20221226111134.png)

### 2.2 Bean生命周期

1. 反射创建对象（属性字段未作初始化）
2. 属性赋值，调用populateBean方法
3. 初始化initializeBean，依次调用invokeAwareMethods（BeanNameAware，BeanClassLoaderAware，BeanFactoryAware）,BeanPostProcessor前置处理，invokeInitMethods（InitializingBean，自定义初始化方法等），

### 2.3 循环依赖的解决方法

假设A依赖于B，B依赖于A，则解决循环依赖的过程如下：

核心是利用了setter方法的注入方式解决的循环依赖，使用构造方法注入是无法解决依赖注入的问题。

1. 创建A对象（使用反射创建）放入三级缓存singletonFactories中，该容器存放的是ObjectFactory不是直接的对象
2. 第一步创建的对象还未对字段填充，调用populateBean对A中字段填充
3. 填充时发现依赖于B，触发B的bean初始化，初始化后也放入三级缓存
4. 继续填充B对象的属性，发现B依赖于A，然后依次从一级、二级、三级缓存中获取A对象，发现在三级缓存中，则通过A的ObjectFactory获取到A对象，并且放入二级缓存earlySingletonObjects中，并删除三级缓存singletonFactories中A的ObjectFactory
5. 填充B对象属性完成，B对象创建完成，放入一级缓存singletons中，并删除三级缓存B对象的ObjectFactory
6. 回到第2步，此时把B对象填充到A的b字段中，并把A对象放入一级缓存singletons中，并删除二级缓存A对象

::: note 注意
 循环依赖的整个过程，B对象并没有产生二级缓存，因为先创建的A，等B创建时已经有了A的早期引用。之所以A需要放入二级缓存，是因为B的对象创建时需要使用到A的早期引用
:::
