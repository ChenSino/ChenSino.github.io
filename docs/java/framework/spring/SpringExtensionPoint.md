---
title: Spring框架扩展点
date: 2018-05-21
---
[TOC]

### 1. spring生命周期

spring容器实例化一个对象往大说主要是分为两步

#### 1.1 第一步：根据配置生成BeanDefinition

根据配置文件（properties、xml）、注解等生成Bean的定义，BeanDefinition的作用是用来描述如何生成真正的对象，对象的生成是通过反射实现，这里的关键词是“描述”，它的作用是告诉容器如何去生成一个真正的对象，它不是真正的对象！！！！

BeanDefinition里包含信息如下：

1. class：有了bean的class用反射就可以创建出一个真正的对象；
2. scope ：可取singleton、prototype，即单例还是多例；
3. lazyInit：表明此bean是否为懒加载，如果是true代表容器启动后自动创建出bean真实对象，若为false，则代表需要显示的调用容器的getBean()方法时才会实例化出对象；
4. 其它字段不再介绍

#### 1.2  第二步：根据BeanDefinition来生成真正的对象

![image-20210526182642991](/home/chenkun/.config/Typora/typora-user-images/image-20210526182642991.png)

### 2. 扩展点介绍

#### 2.1 扩展点1-BeanFactoryPostProcessor

此接口在容器启动后，并且BeanDefinition已经注册到容器中以后，调用其回调函数，作用就是能拿到ConfigurableListableBeanFactory，然后操作里面的容器里面的BeanDefinition

前面说了第一步是生成BeanDefinition此时真实的对象还未生成，所以可以用spring预留的扩展接口做一些事情，比如在代码中修改一个bean的BeanDefinition

举例说明（此场景可能没啥卵用，只是为了证明可以在实例化出对象之前可以修改它的BeanDefinition）：

第一次测试：在xml随便配一个bean，bean标签有个lazyInit，默认是false

```xml
  <bean id="address" class="com.chen.bean.Address">
        <property name="addressName" value="startName"/>
    </bean>
```

第二次测试：在实例化之前通过扩展点的功能把lazyInit改为true

实现方式：

```java
@Component
public class MyBeanFactoryPostProccessor implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        //获取名字为address的BeanDefinition
        BeanDefinition address = beanFactory.getBeanDefinition("address");
        //把它改成懒加载
        address.setLazyInit(true);
    }
}
```

入口函数，注意此处我没有调用applicationContext.getBean("address")，如果我们主动去获取address就不能达到测试效果，主动调用的话会导致address这个bean的lazyInit失效

```java
   @Test
    public void test1() {

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext-dog.xml");

    }
```



#### 2.2 扩展点2-BeanPostProcessor

##### 2.2.1 继续上面的实验

通过以上代码修改后会发现容器启动后第一次有实例化一个Address对象，第二次并没有实例化Address对象。如何证明呢？这就要用到另一个扩展点BeanPostProcessor

创建一个bean，并且让其实现BeanPostProcessor接口，该接口的作用就是在容器实例化出一个bean（真实的对象，要和BeanDefinition区分）后，会自动调用以下两个前置和后置函数，通过观察可以发现在2.1的测试中，第一次打印除了beanName是address的，第二次没打印出来，说明第二次没有实例化address

```java
@Component
public class MyBeanPostProccessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessBeforeInitialization====>" + beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessAfterInitialization======>"+beanName);
        return bean;
    }
}
```

##### 2.2.2 BeanPostProcessor扩展点的其它作用

BeanPostProcessor这个扩展点可以在容器创建一个对象后继续修改这个对象的属性值，比如你在xml中配置address后，给他的addressName字段设置了一个值，然后你是可以在BeanPostProcessor接口中去修改这个addressName这个字段的，并且修改了以后，你通过容器的getBean方法获取的对象是你修改后的。修改下MyBeanPostProccessor

```java
@Component
public class MyBeanPostProccessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessBeforeInitialization====>" + beanName);
        System.out.println(bean);
        //因为每个bean的实例化都会触发此接口的前置以及后置方法，我们只想修改address这个bean，所以要判断一下
        if (beanName.equals("address")) {
            Address address = (Address) bean;
            address.setAddressName("随便一个地址名字");
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessAfterInitialization======>"+beanName);
        return bean;
    }
}
```

通过以上代码修改address对象的属性后，再通过getBean方法获取对象，会发现对象的值是我们修改后的，而非xml中定义的那个值

#### 2.3 扩展点3-BeanNameAware

在BeanPostProcessor之前执行，获取Bean的名字
