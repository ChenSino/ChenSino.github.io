---
title: 注解
date:  2022-12-21
keys:
tag:
category:
    - Spring
---

## 1、依赖注入

~~~markdown
 1. @Autowired
     是Spring中的注解，按照类型注入，此注解可以用于字段属性上、setter方法上、构造函数上，用在字段上则Spring底层会使用反射对字段进行赋值，用成员变量的在setter方法上，则会调用setter方法进行注入。从Spring4.3开始，如果只有一个有参的构造方法，则可以省略构造方法上的@Autowired
 2. @Autowired + @Qualifier 
    按照bean的名字注入
 3. @Resource
    是JavaEE规范中的注解在JSR250引入，默认是按照bean的名字注入，如果没指定名字则按照类型注入
~~~

## 2、关于Spring不建议使用@Autowired在字段上

[此参考此博客](https://juejin.cn/post/6965673679342551048)

![Idea提示Field inject is not recommanded](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221223170907.png)

idea自动修复方法如下，正好说明了只有一个带参的构造方法时，可以省略构造方法上的@Autowired

![Idea给出的修复方法](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221223170953.png)

### 2.1 如果使用@Autowoired在字段上，可能带来的问题

~~~java
public class UserServiceImpl{
    @Autowired
    private Person person;

    private String company;

    public UserServiceImpl(){
        this.company = person.getCompany();
    }
}
~~~

启动报错:

~~~shell
Instantiation of bean failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [...]: Constructor threw exception; nested exception is java.lang.NullPointerException
~~~

要搞明白报错原因，需要对bean的生命周期有所了解，参考[bean生命周期](./CircularDependency.md)，Spring容器创建UserServiceImpl的实例正常过程如下：

1. 反射调用构造方法，创建一个对象
2. 使用反射给person赋值
3. 调用BeanPostProcessor的前置方法
4. 调用初始化方法
5. BeanPostProcessor后置方法
6. 得到对象

实际上的过程是：
使用反射调用构造方法，构造方法执行`this.company = person.getCompany();`发现此时person是空，直接报空指针。
