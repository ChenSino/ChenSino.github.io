---
title: 注入集合
date: 2023-01-02
category:
    - Spring
---

## 1、测试

加入有以下代码，~MyProcessor~是一个接口，没有提供任何实现，然后启动容器会发现执行Bean1的构造方法时并不会空指针，容器会自动提供一个Collection的实现类~LinkedHashMap$LinkedValues~，那么容器如何注入我自己的MyProcessor呢？

~~~java
@Component
public class Bean1 {

    public Bean1(Collection<MyProcessor> processors){
        System.out.println(processors);
        System.out.println("执行构造方法");
        System.out.println(processors.size());
    }
}
~~~

## 2、实现方法

直接提供MyProcessor的实现类，并且让其成为bean（就是加入容器），则实力化Bean1时就会自动注入到构造方法中的processors中，这里注入并不是根据Collection类型注入的，而是根据其集合中元素的类型来注入的。比如提供以下两个实现，重新启动服务，就会看到Bean1的构造方法拿到了2个元素。

~~~java
@Component
public class MyProcessorImpl1 implements MyProcessor{
}

@Component
public class MyProcessorImpl2 implements MyProcessor{
}
~~~

## 3、以上方法如何保证只注入部分的实现类呢？

可以使用属性注入，或者setter注入，配合@Qualifier注解，在需要注入的bean上加上@Qualifier同时在setter方法也加上，不需要注入的bean上就不加就行了。以下演示setter方法注入集合，字段注入也是一样的

~~~java
@Component
public class Bean1 {

    private Collection<MyProcessor> processors;
//    @Autowired
//    public Bean1(Collection<MyProcessor> processors){
//        System.out.println(processors);
//        System.out.println("执行构造方法");
//        System.out.println(processors.size());
//    }

    @Autowired
    @Qualifier
    public void setProcessors(Collection<MyProcessor> processors) {
        this.processors = processors;
    }
}

//需要注入进去的就加上@Qualifier
@Component
@Qualifier
public class MyProcessorImpl1 implements MyProcessor{
}

//无需注入的就不用加
@Component
public class MyProcessorImpl2 implements MyProcessor{
}

~~~
