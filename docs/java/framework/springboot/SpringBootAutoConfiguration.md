---
title: springboot自动配置原理
date: 2019-10-12
author: chenkun
publish: true
keys:
---


#### 1. springboot自动配置的原理初探

​以下注解都在springboot的自动化配置包中：spring-boot-autoconfigure

1. springboot程序的入口是在启动类，该类有个关键注解SpringBootApplication

   ```java
   @Target(ElementType.TYPE)
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   @Inherited
   @SpringBootConfiguration
   @EnableAutoConfiguration
   @ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
   		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
   public @interface SpringBootApplication {
       //略……
   }Destruction 
   ```

   

2. 打开SpringBootApplication注解，上面有个关键注解EnableAutoConfiguration

   ```java
   @Target(ElementType.TYPE)
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   @Inherited
   @AutoConfigurationPackage
   @Import(AutoConfigurationImportSelector.class)
   public @interface EnableAutoConfiguration {
       //……
   }
   ```

   

3. EnableAutoConfiguration上有个@Import(AutoConfigurationImportSelector.class)，注意AutoConfigurationImportSelector，

   @Import作用创建一个AutoConfigurationImportSelector的bean对象，并且加入IoC容器

   ```java
   	//org.springframework.boot.autoconfigure.AutoConfigurationImportSelector
   //此处只贴了关键方法
   protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
   		List<String> configurations = SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(),
   				getBeanClassLoader());
   		Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you "
   				+ "are using a custom packaging, make sure that file is correct.");
   		return configurations;
   	}
   ```

   

4. AutoConfigurationImportSelector类中的getCandidateConfigurations方法代码如上，其调用了SpringFactoriesLoader的loadFactoryNames方法，来获取

configurations，此configurations列表其实就是要被自动花配置的类。SpringFactoriesLoader的两个重要方法如下：

```java
//org.springframework.core.io.support.SpringFactoriesLoader
//只贴了两个关键方法
	public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";

//此方法返回的是即将要被自动化配置的类的全限定类名，是从META-INF/spring.factories配置的，配置文件中有个org.springframework.boot.autoconfigure.EnableAutoConfiguration 其后面可配置多个想被自动花配置的类
    public static List<String> loadFactoryNames(Class<?> factoryType, @Nullab等le ClassLoader classLoader) {
            String factoryTypeName = factoryType.getName();
            return loadSpringFactories(classLoader).getOrDefault(factoryTypeName, Collections.emptyList());
     }


	private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
		MultiValueMap<String, String> result = cache.get(classLoader);
		if (result != null) {
			return result;
		}

		try {
			Enumeration<URL> urls = (classLoader != null ?
					classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
					ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));//META-INF/spring.factories
			result = new LinkedMultiValueMap<>();
			while (urls.hasMoreElements()) {
				URL url = urls.nextElement();
				UrlResource resource = new UrlResource(url);
				Properties properties = PropertiesLoaderUtils.loadProperties(resource);
				for (Map.Entry<?, ?> entry : properties.entrySet()) {
					String factoryTypeName = ((String) entry.getKey()).trim();
					for (String factoryImplementationName : StringUtils.commaDelimitedListToStringArray((String) entry.getValue())) {
						result.add(factoryTypeName, factoryImplementationName.trim());
					}
				}
			}
			cache.put(classLoader, result);
			return result;
		}
		catch (IOException ex) {
			throw new IllegalArgumentException("Unable to load factories from location [" +
					FACTORIES_RESOURCE_LOCATION + "]", ex);
		}
	}
```

5. 举例分析，我们在spring.factories中可以看到org.springframework.boot.autoconfigure.EnableAutoConfiguration后有一个org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration，说明springboot希望redis能够自动化配置。接着我们打开RedisAutoConfiguration源码查看。此处我故意没复制源码，用的截图，可以看到截图直接有报错，编译错误，错误的原因是我们还没添加spring-boot-starter-data-redis的依赖。**这里有个问题，为什么明明代码都报错，Cannot resolve symbol xxx（未找到类），但是我们的项目依然可以启动？不信你建立一个简单的springboot项目，只添加web依赖，手动打开RedisAutoConfiguration，发现是报红错的，但是你启动项目，发现没任何问题，why？？**这个问题后面再解答，先接着看自动配置的问题。


6. 先把RedisAutoConfiguration源码复制出来方便我写注释，上面用截图主要是让大家看到报错

   ```java
   @Configuration(proxyBeanMethods = false)
   @ConditionalOnClass(RedisOperations.class)
   @EnableConfigurationProperties(RedisProperties.class)
   @Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
   public class RedisAutoConfiguration {
   
   	@Bean
   	@ConditionalOnMissingBean(name = "redisTemplate")
   	public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
   			throws UnknownHostException {
   		RedisTemplate<Object, Object> template = new RedisTemplate<>();
   		template.setConnectionFactory(redisConnectionFactory);
   		return template;
   	}
   
   	@Bean
   	@ConditionalOnMissingBean
   	public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory)
   			throws UnknownHostException {
   		StringRedisTemplate template = new StringRedisTemplate();
   		template.setConnectionFactory(redisConnectionFactory);
   		return template;
   	}
   
   }
   ```

   看源码可知RedisAutoConfiguration上有一个Configuration和ConditionalOnClass注解，先分析这两个。首先Configuration注解，代表这是个Java config配置类，和spring配置bean的xml文件是一个作用，都是用来实例化bean的，**但是注意还有个@ConditionalOnClass(RedisOperations.class)注解，这个注解的作用是当RedisOperations.class这个类被找到后才会生效，如果没找到此类，那么整个RedisAutoConfiguration就不会生效。**所以当我们引入了redis的依赖，springboot首先会通过RedisAutoConfiguration的方法redisTemplate给我们设置一个默认的redis配置，当然这个方法上也有个注解```	@ConditionalOnMissingBean(name = "redisTemplate")```，就是当我们没有手动配redisTemplate这个bean它才会调用这个默认的方法，注入一个redisTemplate到IoC容器，所以一般情况我们都是手动配置这个redisTemplate，方便我们设置序列化器，如下：

   ```java
   @Configuration
   public class RedisConfig {
   
       /**
        * 设置 redisTemplate 的序列化设置
        *
        * @param redisConnectionFactory
        * @return
        */
       @Bean
       public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
           // 1.创建 redisTemplate 模版
           RedisTemplate<String, Object> template = new RedisTemplate<>();
           // 2.关联 redisConnectionFactory
           template.setConnectionFactory(redisConnectionFactory);
           // 3.创建 序列化类
           Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
           ObjectMapper om = new ObjectMapper();
           // 4.设置可见度
           om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
           // 5.启动默认的类型
           om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
           // 6.序列化类，对象映射设置
           jackson2JsonRedisSerializer.setObjectMapper(om);
           // 7.设置 value 的转化格式和 key 的转化格式
           template.setValueSerializer(jackson2JsonRedisSerializer);
           template.setKeySerializer(new StringRedisSerializer());
           template.afterPropertiesSet();
           return template;
       }
   }
   ```

   

   RedisAutoConfiguration上还有一下两个注解，作用是从配置文件读取redis相关的信息，ip、端口、密码等

   ```
   @EnableConfigurationProperties(RedisProperties.class)
   @Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
   ```

#### 2. 补充扩展（解释为什么引用的包都报红错了，项目还能启动）

所有的@Condition注解（包括衍生的）其实都对应一个具体的实现，这个实现类里面有个判断方法叫做matches,返回的是个布尔类型判断值。

打开ConditionalOnClass源码如下，其Conditional注解传递的是个OnClassCondition.class，这就其对应的判断类，也就是说，当我们使用ConditionalOnClass注解时，其实际上调用的是OnClassCondition来判断的。重点就是以下翻译的注释部分，**因为注解元数据是用ASM解析的，并且其解析是在类加载之前就进行了**，我们再百度以下说明是ASM，可以看到ASM是能直接操作二进制文件，所以对应到我们这里RedisAutoConfiguretion上，当OnClassCondition满足classpath中已经有了RedisOperations类时才会/才会触发类加载，当RedisOperations不存在时，就不加载RedisAutoConfiguretion类，既然不加载你，即使你编译报错又关我虚拟机屁事，爱报不报。



> ASM 是一个 Java 字节码操控框架。它能被用来动态生成类或者增强既有类的功能。ASM 可以直接产生二进制 class 文件，也可以在类被加载入 Java 虚拟机之前动态改变类行为。Java class 被存储在严格格式定义的 .class 文件里，这些类文件拥有足够的元数据来解析类中的所有元素：类名称、方法、属性以及 Java 字节码（指令）。ASM 从类文件中读入信息后，能够改变类行为，分析类信息，甚至能够根据用户要求生成新类。
>
> ASM 能够通过改造既有类，直接生成需要的代码。增强的代码是硬编码在新生成的类文件内部的，没有反射带来性能上的付出。同时，ASM 与 Proxy 编程不同，不需要为增强代码而新定义一个接口，生成的代码可以覆盖原来的类，或者是原始类的子类。它是一个普通的 Java 类而不是 proxy 类，甚至可以在应用程序的类框架中拥有自己的位置，派生自己的子类。
>
> 相比于其他流行的 Java 字节码操纵工具，ASM 更小更快。ASM 具有类似于 BCEL 或者 SERP 的功能，而只有 33k 大小，而后者分别有 350k 和 150k。同时，同样类转换的负载，如果 ASM 是 60% 的话，BCEL 需要 700%，而 SERP 需要 1100% 或者更多。
>

```java
//重点看注释，简单翻译一下：
//value()可以安全在指定在一个被@Configuration注释的类上，比如我们的RedisAutoConfiguretion，因为注解元数据是用ASM解析的，并且其解析是在
//类加载之前就进行了……
/**
 * {@link Conditional @Conditional} that only matches when the specified classes are on
 * the classpath.
 * <p>
 * A {@link #value()} can be safely specified on {@code @Configuration} classes as the
 * annotation metadata is parsed by using ASM before the class is loaded. Extra care is
 * required when placed on {@code @Bean} methods, consider isolating the condition in a
 * separate {@code Configuration} class, in particular if the return type of the method
 * matches the {@link #value target of the condition}.
 *
 * @author Phillip Webb
 * @since 1.0.0
 */
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(OnClassCondition.class)
public @interface ConditionalOnClass {

	/**
	 * The classes that must be present. Since this annotation is parsed by loading class
	 * bytecode, it is safe to specify classes here that may ultimately not be on the
	 * classpath, only if this annotation is directly on the affected component and
	 * <b>not</b> if this annotation is used as a composed, meta-annotation. In order to
	 * use this annotation as a meta-annotation, only use the {@link #name} attribute.
	 * @return the classes that must be present
	 */
	Class<?>[] value() default {};

	/**
	 * The classes names that must be present.
	 * @return the class names that must be present.
	 */
	String[] name() default {};

}

```



ConditionalOnClass类图如下，它继承了condition接口


打开Condition接口如下，查看注释，注释中有说明 **条件判断是在bean定义即将注册到容器之前进行的，**看过springIoC源码的同学应该知道，spring创建一个对象的过程是当服务启动后，先读取xml配置文件（或者通过注解），根据配置文件先定义一个BeanDefinition，然后把这个bean给放到容器（在spring中实际就是一个Map），然后在根据bean定义，通过反射创建真正的对象。反射会触发类加载，当condition条件不满足时，根据如下注释可知，bean定义后续都被拦截了，连注册都不行，所以自然就不可能通过反射创建对象，不反射自然不会触发类加载，不触发类加载那么RedisAutoConfiguration当然啊不会加载，它不加载，那么即使它里面引用了一个不存在的类也不会有啥问题。




上面说的很绕，表达的不是很好，要想看懂以上部分需要掌握两方面的知识：

- 类加载原理，推荐看周志明老师的《深入理解JVM虚拟机》
- spring IoC容器创建bean的原理，推荐《spring揭秘》，详细看看IoC部分

#### 3、又一个问题

spring-boot-autoconfigure.jar这个包中的RedisAutoConfiguration都报红色错误了，那么spring官方是怎么打包出来spring-boot-autoconfigure.jar的？？怎么给我们提供了一个报错的包呢

```
答：因为springboot包中引入了redis的包，不过在pomx中使用的是optional,optional的作用就是当前项目（spring-boot-autoconfigure.）编译class时会使用此包，但是打jar包时不会把他包含进来，并且如果项目依赖spring-boot-autoconfigure，也不会自动import被optional修饰的包，因此我们项目如果不显示指定spring-boot-starter-data-redis依赖就会报红，至于报红为啥项目还能启动深层原理下一节再看源码分析。
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
            <optional>true</optional>
        </dependency>
```

#### 4. @ConditionalOnClass的原理

我们到自己的springboot项目中先引入redis依赖，方便看RedisAutoConfiguration源码

```xml
     <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
```

通过前几章，我们知道在spring-boot-autoconfigure.jar中的META-INF/spring.factories中配置了RedisAutoConfiguration的自动配置

```properties
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration打开RedisAutoConfiguration的源码，可以看到它有一个@ConditionalOnClass(RedisOperations.class)注解
```

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RedisOperations.class)
@EnableConfigurationProperties(RedisProperties.class)
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
public class RedisAutoConfiguration {

	@Bean
	@ConditionalOnMissingBean(name = "redisTemplate")
	public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
			throws UnknownHostException {
		RedisTemplate<Object, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

	@Bean
	@ConditionalOnMissingBean
	public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory)
			throws UnknownHostException {
		StringRedisTemplate template = new StringRedisTemplate();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

}
```



接下来我们在`org.springframework.boot.autoconfigure.AutoConfigurationImportSelector#getAutoConfigurationEntry`方法打上断点准备debug,因springboot项目启动时会自动调用它，至于为什么，以后再研究。

先说一下debug时方法调用链（只列举关键方法），大家先在调用这些方法的位置打好断点：

`org.springframework.boot.autoconfigure.AutoConfigurationImportSelector#getAutoConfigurationEntry`


`org.springframework.boot.autoconfigure.AutoConfigurationImportSelector.ConfigurationClassFilter#filter`


`org.springframework.boot.autoconfigure.condition.FilteringSpringBootCondition#match`


`org.springframework.boot.autoconfigure.condition.OnBeanCondition#getOutcomes`


`org.springframework.boot.autoconfigure.condition.OnBeanCondition#getOutcome`


