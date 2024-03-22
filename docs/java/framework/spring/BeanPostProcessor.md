---
title: BeanPostProcessor介绍
date: 2019-10-22
author: chenkun
publish: true
keys:
---

<!--more-->

### 1. BeanPostProcessor介绍

打开源码里面有两个方法，分别是postProcessBeforeInitialization和postProcessAfterInitialization。

```java

public interface BeanPostProcessor {
	@Nullable
	default Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

	@Nullable
	default Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

}
```

#### 1.1 postProcessBeforeInitialization方法和postProcessAfterInitialization方法调用时机

通过方法名字看，它的执行时间是在对象初始化之前，**这个初始化指的是bean对象的initMethod方法**，也就是说postProcessBeforeInitialization只保证在自定义的initMethod之前执行。

```java
//org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory的initializeBean方法
//注意此方法是在容器初始化后，实例化bean会自动调用，需要使用ApplicationContext容器才会自动初始化bean对象，BeanFacotry容器不会自动初始化对象，
//BeanFacotry只初始化容器，并且定义BeanDefinition，只有调用getBean才会触发对象初始化
protected Object initializeBean(final String beanName, final Object bean, @Nullable RootBeanDefinition mbd) {
		if (System.getSecurityManager() != null) {
			AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
				invokeAwareMethods(beanName, bean);
				return null;
			}, getAccessControlContext());
		}
		else {
			invokeAwareMethods(beanName, bean);
		}

		Object wrappedBean = bean;
		if (mbd == null || !mbd.isSynthetic()) {
            //调用了postProcessBeforeInitialization，读者朋友请自行打开applyBeanPostProcessorsBeforeInitialization跟踪源码，会发现里面调用了BeanPostProcessor的postProcessBeforeInitialization方法
			wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
		}

		try {
            //调用出initMethod方法
			invokeInitMethods(beanName, wrappedBean, mbd);
		}
		catch (Throwable ex) {
			throw new BeanCreationException(
					(mbd != null ? mbd.getResourceDescription() : null),
					beanName, "Invocation of init method failed", ex);
		}
		if (mbd == null || !mbd.isSynthetic()) {
            //调用postProcessAfterInitialization，和上面的调用了postProcessBeforeInitialization一个道理
			wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
		}

		return wrappedBean;
	}
```

一开始我以为这个所谓的初始化之前和初始化之后值得是bean对象填充属性值的前后，比如下面初始化一个bean,填充对象name 和age,我一开始以为是先通过反射创建了一个空的（指的是name为null,age为0,并不是说对象是null）sonoBean对象，然后调用postProcessBeforeInitialization，**这个理解是错误的**，通过以上源码可以看出实际上是值得调用initMethod之前。

```xml
    <bean id="sonoscape" class="com.chen.ioc.bean.SonoBean" scope="singleton" init-method="init">
        <property name="age" value="3"></property>
        <property name="name" value="tom"></property>
    </bean>
```

### 2. 再看看BeanPostProcessor能做什么，有什么使用场景

一下自定义了一个BeanPostProcessor，我们使用postProcessBeforeInitialization来介绍一下使用场景，postProcessBeforeInitialization有两个参数，

- bean：代表通过反射创建的对象，这个对象还未调用其initMethod方法

- beanName：这个bean的名字

  我们知道**每个对象**调用初始化方法之前都会调用BeanPostProcessor的postProcessBeforeInitialization方法，那么我们在postProcessBeforeInitialization方法既然能拿到bean对象，当然可以对它进行修改，比如，我想通过注解来给对对象属性设置默认值，可以看到在xml给bean设置了name和age,但是在postProcessBeforeInitialization中通过注解修改了name值，那么实际生效的name值实际上是注解上的那个。

  **总的来说BeanPostProcessor就是用来修改bean对象，可以通过实现接口或者注解的方式来实现修改对象，达到我们想要的效果**

```java
@Slf4j
public class MyBeanPostProcessor implements BeanPostProcessor {
    public MyBeanPostProcessor() {
        log.warn("MyBeanPostProcessor init....");
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        log.warn("[日志标志]:  postProcessBeforeInitialization");
        if (bean instanceof SonoBean) {
            //获取注解
            Custom custom = bean.getClass().getAnnotation(Custom.class);
            SonoBean sonoBean = (SonoBean) bean;
            //修改对象
            sonoBean.setName(custom.name());
        }
        //返回修改后的对象
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return BeanPostProcessor.super.postProcessAfterInitialization(bean, beanName);
    }
}
```

```java

//Bean对象
@Custom(name = "zhangsan111", age = 22)
@Data
@Slf4j
public class SonoBean {

    private String name;

    private int age;

    public SonoBean() {
        log.warn("sono bean init..");
    }
}
```

```java
//自定义注解

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Custom {
    String value() default "";

    int order() default 3;

    String name() default "";

    int age() default -1;
}
```

```xml
  <bean id="sonoscape" class="com.chen.ioc.bean.SonoBean" scope="singleton" init-method="getAge">
        <property name="age" value="3"></property>
        <property name="name" value="tom"></property>
    </bean>
```

postProcessAfterInitialization是在initMethod后执行，就不做过多分析了

### 3. bean实例化过程

![image-20211018150608365](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20211018150608365.png)

```java
//org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods   
//InitializingBean的方法，是在invokeInitMethod方法中检查执行的，并且放在最前，所以它的afterPropertiesSet方法是在init-method之前。
//就是因为使用InitializingBean对代码有入侵性，所以spring才提供的initMethod方法，所以实际开发中我们只需要使用init-method指定初始化方法即可，不推荐使用InitializingBean
protected void invokeInitMethods(String beanName, final Object bean, @Nullable RootBeanDefinition mbd)
			throws Throwable {

		boolean isInitializingBean = (bean instanceof InitializingBean);
		if (isInitializingBean && (mbd == null || !mbd.isExternallyManagedInitMethod("afterPropertiesSet"))) {
			if (logger.isDebugEnabled()) {
				logger.debug("Invoking afterPropertiesSet() on bean with name '" + beanName + "'");
			}
			if (System.getSecurityManager() != null) {
				try {
					AccessController.doPrivileged((PrivilegedExceptionAction<Object>) () -> {
						((InitializingBean) bean).afterPropertiesSet();
						return null;
					}, getAccessControlContext());
				}
				catch (PrivilegedActionException pae) {
					throw pae.getException();
				}
			}
			else {
                //调用了InitializingBean的afterPropertiesSet
				((InitializingBean的) bean).afterPropertiesSet();
			}
		}

		if (mbd != null) {
			String initMethodName = mbd.getInitMethodName();
			if (StringUtils.hasLength(initMethodName) &&
					!(isInitializingBean && "afterPropertiesSet".equals(initMethodName)) &&
					!mbd.isExternallyManagedInitMethod(initMethodName)) {
				invokeCustomInitMethod(beanName, bean, mbd);
			}
		}
	}
```
