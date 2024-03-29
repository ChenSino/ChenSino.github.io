---
title: SpringAOP
date: 2017-09-22
sticky: 100
---

## 1、SpringAOP

```markdown
> SpringAOP的本质就是动态代理，底层使用JDK动态代理或者CGlib动态代理，通过代理框架生成代理类，实现对目标类的增强，Spring代理是方法级别的代理，是对方法增强，
> 
> 代理有四个要素：
> 1. 目标类 
> 2. 额外功能（增强）
> 3. 切入点（被增强的方法）
> 4. 组装（把切入点和额外功能进行整合，就是确认哪些方法需要增强）
```

## 2、SpringAOP - 非注解实现

### 2.1 演示1（有接口实现）

```java
//接口
public interface UserService {
    void login(String username,String password);
}
//实现
public class UserServiceImpl implements UserService{

    private String username;



    @Override
    public String toString() {
        return "UserServiceImpl{" +
                "name='" + username + '\'' +
                '}';
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public void login(String username, String password) {
        System.out.println("login: username " + username);
    }
}

//增强
public class LogInterceptor implements MethodBeforeAdvice {
    @Override
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println("before advice");
        //注意此处不用调用 原方法，原方法会自行调用，调用会导致原方法重复调用
        //  method.invoke(target,args);
    }
}

//测试

public class Main {

    @Test
    public void test1() {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) applicationContext.getBean("userService");
        userService.login("zhangsan", "123456");
    }

}
```

```xml
    <bean id="userService" class="org.example.UserServiceImpl" >
        <property name="username">
            <value>吴彦祖</value>
        </property>
    </bean>
    <bean id="logInterceptor" class="org.example.LogInterceptor" />

    <aop:config>
        <aop:pointcut id="pc" expression="execution(* *(..))"/>
        <aop:advisor advice-ref="logInterceptor" pointcut-ref="pc"></aop:advisor>
    </aop:config>
    <!--proxy-target-class默认为false，代表默认使用jdk动态代理，true代表使用cglib代理-->
    <aop:aspectj-autoproxy proxy-target-class="false"></aop:aspectj-autoproxy>
```

当proxy-target-class="false"，可以看到使用的是jdk动态代理
![20221221092013](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092013.png)

当proxy-target-class="true"，可以看到使用的是CGlib动态代理
![20221221092114](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092114.png)

### 2.2 演示2（无接口实现）

```java
//原目标类
public class UserServiceImpl {

    private String username;



    @Override
    public String toString() {
        return "UserServiceImpl{" +
                "name='" + username + '\'' +
                '}';
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public void login(String username, String password) {
        System.out.println("login: username " + username);
    }
}

//增强类不变


//测试类
    @Test
    public void test1() {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserServiceImpl userService = (UserServiceImpl) applicationContext.getBean("userService");
        userService.login("zhangsan", "123456");
    }

```

结果proxy-target-class的值无论是true还是false,都使用的是CGlib代理，其实也好理解，因为JDK动态代理只支持带接口实现的类增强，而CGlib还可以增强
普通的类。

![20221221092444](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092444.png)

## 3、SpringAOP注解实现

SpringAOP注解实现主要是引入了AspectJ包，AspectJ本身是一个强大的代理框架，使用acj编译器在编译器间生成代理类，是使用asm对字节码进行操作，使用SpringAOP用
注解开发时，要引入AspectJ包，其实Spring仅仅是想使用它的注解类而已，并没有真正使用它的代理功能，SpringAOP底层只用了JDK动态代理或者CGlib动态代理，
这一点很多人都不知道。

注解的本质和xml一样，不过是把解析xml变成解析注解而已。

## 4、 SpringAOP实现原理

### 4.1 SpringAOP是如何产生代理类的

![Bean的生命周期](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221223120124.png)

::: danger 结论
    SpringAOP底层实现的原理是使用的BeanPostProcessor，BeanPostProcessor的核心功能就是可以对一个bean进行再加工，参考上面bean的生命周期可知BeanPostProcessor执行实际是在bean初始化前后，而SpringAOP的原理就是在BeanPostProcessor的后置方法中对bean进行修改，同时把修改后的代理对象替换原对象。
:::

~~~markdown
    当配置了AOP后，spring容器会自动配置一个叫做AnnotationAwareAspectJAutoProxyCreator的类，它也是一个BeanPostProcessor，最终会调用后置方法
    @Override
	public Object postProcessAfterInitialization(@Nullable Object bean, String beanName) {
		if (bean != null) {
			Object cacheKey = getCacheKey(bean.getClass(), beanName);
			if (this.earlyProxyReferences.remove(cacheKey) != bean) {
				return wrapIfNecessary(bean, beanName, cacheKey);
			}
		}
		return bean;
	}


    protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) {
		if (StringUtils.hasLength(beanName) && this.targetSourcedBeans.contains(beanName)) {
			return bean;
		}
		if (Boolean.FALSE.equals(this.advisedBeans.get(cacheKey))) {
			return bean;
		}
		if (isInfrastructureClass(bean.getClass()) || shouldSkip(bean.getClass(), beanName)) {
			this.advisedBeans.put(cacheKey, Boolean.FALSE);
			return bean;
		}

		// Create proxy if we have advice.
		Object[] specificInterceptors = getAdvicesAndAdvisorsForBean(bean.getClass(), beanName, null);
		if (specificInterceptors != DO_NOT_PROXY) {
			this.advisedBeans.put(cacheKey, Boolean.TRUE);
            //返回代理对象
			Object proxy = createProxy(
					bean.getClass(), beanName, specificInterceptors, new SingletonTargetSource(bean));
            //用代理对象替换原生对象
			this.proxyTypes.put(cacheKey, proxy.getClass());
			return proxy;
		}

		this.advisedBeans.put(cacheKey, Boolean.FALSE);
		return bean;
	}
~~~


### 4.2 源码层面查看SpringAOP是使用JDK动态代理还是CGlib

~~~java
//org.springframework.aop.framework.DefaultAopProxyFactory#createAopProxy
    @Override
public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {
    if (!NativeDetector.inNativeImage() &&
            (config.isOptimize() || config.isProxyTargetClass() || hasNoUserSuppliedProxyInterfaces(config))) {
        Class<?> targetClass = config.getTargetClass();
        if (targetClass == null) {
            throw new AopConfigException("TargetSource cannot determine target class: " +
                    "Either an interface or a target is required for proxy creation.");
        }
        if (targetClass.isInterface() || Proxy.isProxyClass(targetClass) || ClassUtils.isLambdaClass(targetClass)) {
            return new JdkDynamicAopProxy(config);
        }
        return new ObjenesisCglibAopProxy(config);
    }
    else {
        return new JdkDynamicAopProxy(config);
    }
}
~~~

### 4.3 时序图

