---
title: Spring中的设计模式
date: 2018-05-18
---
### 1、工厂模式

BeanFactory是典型的工厂方法模式，其有多个实现，不同的实现有不同的getBean方法，默认实现是DefaultListalbeBeanFactory,我们也可以定义自己的工厂实现BeanFactory接口，重写里面的getBean方法

### 2、单例模式

在spring中使用singleton修饰的bean都是单例模式，`org.springframework.beans.factory.support.DefaultSingletonBeanRegistry#addSingleton`，在spring实例化出真正的对象后，会把这个对象加到容器中

> 修正，以上说singleton=单例模式，是错误的，singleton指的是容器中该对象的bean只有一个，和单例模式不是一回事，单例模式有：Mybatis的连接工厂、redis的连接工厂等

~~~java

/**
* Add the given singleton object to the singleton cache of this factory.
* <p>To be called for eager registration of singletons.
* @param beanName the name of the bean
* @param singletonObject the singleton object
*/
protected void addSingleton(String beanName, Object singletonObject) {
synchronized (this.singletonObjects) {
this.singletonObjects.put(beanName, singletonObject);
this.singletonFactories.remove(beanName);
this.earlySingletonObjects.remove(beanName);
this.registeredSingletons.add(beanName);
}
}
~~~

### 3、观察者模式

spring中的时间event都采用的观察者模式
![20221226114253](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221226114253.png)

### 4、适配器模式

SpringMVC

### 5、代理模式

SpringAOP整个就采用的代理模式

### 6、模板方法模式

### 7、包装模式（装饰者模式）

在IOC容器中，反射创建了实例对象以后，会对其进行包装。参考`org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#instantiateBean`

```java

	/**
	 * Instantiate the given bean using its default constructor.
	 * @param beanName the name of the bean
	 * @param mbd the bean definition for the bean
	 * @return a BeanWrapper for the new instance
	 */
	protected BeanWrapper instantiateBean(final String beanName, final RootBeanDefinition mbd) {
		try {
			Object beanInstance;
			final BeanFactory parent = this;
			if (System.getSecurityManager() != null) {
				beanInstance = AccessController.doPrivileged((PrivilegedAction<Object>) () ->
						getInstantiationStrategy().instantiate(mbd, beanName, parent),
						getAccessControlContext());
			}
			else {
				beanInstance = getInstantiationStrategy().instantiate(mbd, beanName, parent);
			}
			BeanWrapper bw = new BeanWrapperImpl(beanInstance);
			initBeanWrapper(bw);
			return bw;
		}
		catch (Throwable ex) {
			throw new BeanCreationException(
					mbd.getResourceDescription(), beanName, "Instantiation of bean failed", ex);
		}
	}
```

### 8、原型模式

spring中prototype类型的bean采用的原型模式
