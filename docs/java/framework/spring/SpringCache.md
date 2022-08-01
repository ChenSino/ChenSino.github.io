---
title: Spring缓存
date: 2019-09-22
sticky: 100
---
Spring缓存大揭秘
<!-- more -->

### 1、背景

使用springboot项目时看到很多对spring缓存注解的使用，比如@Cacheable、@Evict、@CachePut等，之前一直都是知道个大概，使用方式也就局限于配置好redisTemplate然后直接开始使用，但是一直不明白为什么我配置好redisTemplate就可以用了，甚至不配置redis也能有缓存效果。之前还一直有个疑问，新增数据spring把返回结果缓存后，那么下次如果更新了数据，如何同时更新缓存列表呢？

### 2、spring-cache介绍

springcache不是一个单独的jar包，它位于spring-context的org.springframework.cache包下，spring提供了各种注解来使用缓存，并且提供了多种缓存实现，比如常见的redis,EhCache等。



![image-20211014105423666](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20211014105423666-16341800740101.png)

### 3、springcache的实现

如果不引入redis等第三方包，则spring默认采用的是ConcurrentMapCache来管理缓存，它里面有个ConcurrentMap（具体实现是ConcurrentHashMap，在ConcurrentMapCacheManager类中传入的），**如果引入第三方比如redis,则会自动使用redis**

![image-20211014105857365](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20211014105857365-16341803387362.png)

![image-20211014110150052](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20211014110150052-16341805111993.png)

在上图中可以看到ConcurrentMapCacheManager创建了一个ConcurrentHashMap对象，用来初始化ConcurrentMapCache，**所以由此我们可以知道spring默认缓存实际上是一个Map对象，占用的是JVM内存，一旦创建后就永不消失，因为它不像redis有过期时间，所以使用默认缓存要慎重，注意OOM**

总结一下spring缓存默认实现：

1. SimpleCacheConfiguration是一个springboot的配置类，类中会实例化一个ConcurrentMapCacheManager的Bean,

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnMissingBean(CacheManager.class)
@Conditional(CacheCondition.class)
class SimpleCacheConfiguration {

	@Bean
	ConcurrentMapCacheManager cacheManager(CacheProperties cacheProperties,
			CacheManagerCustomizers cacheManagerCustomizers) {
		ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager();
		List<String> cacheNames = cacheProperties.getCacheNames();
		if (!cacheNames.isEmpty()) {
			cacheManager.setCacheNames(cacheNames);
		}
		return cacheManagerCustomizers.customize(cacheManager);
	}

}
```

2. ConcurrentMapCacheManager会创建一个Cache对象（具体实现其实是ConcurrentMapCache），创建ConcurrentMapCache时传递的是一个ConcurrentHashMap，所以底层默认保存对象的其实就是一个Map而已

   ```java
   	//源码位置org.springframework.cache.CacheManager
   
   	protected Cache createConcurrentMapCache(String name) {
   		SerializationDelegate actualSerialization = (isStoreByValue() ? this.serialization : null);
   		return new ConcurrentMapCache(name, new ConcurrentHashMap<>(256), isAllowNullValues(), actualSerialization);
   	}
   ```

   

### 4、springcache的注解使用

##### 4.1 Cacheable注解

此注解可以用于类或方法上，表示开启注解功能，开启后，方法的返回值会放到缓存里面
