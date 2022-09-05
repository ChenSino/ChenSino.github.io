---
title: 前后分离项目搭建
date: 2022-07-14
author: chenkun
publish: true
keys:
category:
  - web
tag:	
  - web
  - springboot
---

::: danger 温馨提示

[项目地址](https://github.com/ChenSino/ChenSino.git)，每个节点的代码使用commitId作为区分，想看某个节点代码，直接还原到对应commitid即可，执行git reset --hard commitId

:::

## 1、后端篇

### 1.1 初始化springboot项目

`git reset --hard 20e22c237e51fb9c7f01bdfd589a90f47fa73c34`

#### 1.1.1 使用maven聚合模块以及parent依赖的方式初始化好了项目

> 问题1  
> 分模块后，如何读取到其他模块中的bean，比如全局异常处理放在了common模块，在业务模块依赖了common，如何让common中的全局异常拦截生效？  
> 首先要明白无法common模块的component在core-biz不生效的原因是在biz模块默认扫描的component的包范围是启动类所在的包，也就是`com.chensino.core`，而全局异常类所在的包是`com.chensino.common.security.exception`，根本没有被扫描到。  

![1](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220728165959.png)

解决方法有三种  
[参考此处文档](https://afatpig.oss-cn-chengdu.aliyuncs.com/ebooks/Springboot.pdf)

1. 把扫描范围搞大一点  

```java
package com.chensino.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author 204506
 */
@SpringBootApplication
@ComponentScan("com.chensino")
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}
```

2. 在原有的基础上加上新的包，和方法1本质一样都是增加包的扫描范围

```java
@ComponentScan({"com.chensino.core","com.chensino.common"})
```

3. 使用spi，利用自动装配

在resource目录新建META-INF/spring.factories，内容如下

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.chensino.common.security.exception.GlobalExceptionHandlerResolver
```

![1](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220728171332.png)

4. 使用`@import`注解(会把import的实体加入ioc)  

import作用  
![2](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220728171753.png)  

```java
@SpringBootApplication
@Import(GlobalExceptionHandlerResolver.class)
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}
```

5. 对`@import`进行封装  

在原common模块加上注解`EnableGlobalExceptionHandlerConfiguration`，在注解中import全局异常处理类
![](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220728172557.png)  
在启动类加上注解`EnableGlobalExceptionHandlerConfiguration`

```java
@SpringBootApplication
@EnableGlobalExceptionHandlerConfiguration
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}
```

本次项目采用spi的方式

### 1.2 全局异常处理

```bash
git reset --hard feb6a4a830a9c323dd58427e8aa0be9af0eb1ef3
```

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandlerResolver {

    /**
     * 全局异常
     * @param e 异常
     * @return 返回统一实体
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handlerGlobalException(Exception e){
        log.error("全局异常信息 exception={}",e.getMessage(),e);
        return ResponseEntity.fail(e.getLocalizedMessage());
    }
}
```

springboot全局异常处理比较简单，直接拦截Exception，设置response响应码为500，然后返回统一实体。

### 1.3 aop统一日志处理

#### 1.3.1 添加基础日志

```bash
git reset --hard 1c4d8022ba4b34187a1627534e05ec69399fc4a9
```

springboot作为开箱即用的框架，默认使用slfj+logback日志框架
![](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220728180403.png)  
即使不添加logback.xml配置，springboot也会默认输出console上的日志，生产环境肯定还是需要把日志写入到文件的，所以先添加一下logback.xml配置，这个模板可以直接用，要改的就是日志存储位置以及包名

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
    小技巧: 在根pom里面设置统一存放路径，统一管理方便维护
    <properties>
        <log-path>/Users/ccs</log-path>
    </properties>
    1. 其他模块加日志输出，直接copy本文件放在resources 目录即可
    2. 注意修改 <property name="${log-path}/log.path" value=""/> 的value模块
-->
<configuration debug="false" scan="false">
    <property name="log.path" value="logs/core-biz}"/>
    <!-- 彩色日志格式 -->
    <property name="CONSOLE_LOG_PATTERN"
              value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>
    <!-- 彩色日志依赖的渲染类 -->
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter"/>
    <conversionRule conversionWord="wex"
                    converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter"/>
    <conversionRule conversionWord="wEx"
                    converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter"/>
    <!-- Console log output -->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- Log file debug output -->
    <appender name="info" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/info.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/%d{yyyy-MM, aux}/info.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>50MB</maxFileSize>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>info</level>
        </filter>
    </appender>

    <!-- Log file error output -->
    <appender name="error" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/error.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/%d{yyyy-MM}/error.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>50MB</maxFileSize>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
    </appender>

    <logger name="com.chensino">
        <appender-ref ref="error"/>
    </logger>
    <logger name="com.chensino">
        <appender-ref ref="info"/>
    </logger>
    <!-- Level: FATAL 0  ERROR 3  WARN 4  INFO 6  DEBUG 7 -->
    <root level="INFO">
        <appender-ref ref="console"/>
    </root>
</configuration>
```

### 1.4 添加Mybatis-plus

#### 1.4.1 maven依赖

```xml
<!-- mybatis-plus-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>${mybatis-plus.version}</version>
</dependency>
<!-- 开发环境sql监控性能分析-->
<dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
    <version>${p6spy.version}</version>
</dependency>
<!-- jdbc驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${jdbc.version}</version>
</dependency>
```

#### 1.4.2 springboot配置

```yaml
spring:
  datasource:
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver #此处用p6sy驱动代替原jdbc驱动
#    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
    url: jdbc:p6spy:mysql://${MYSQL_HOST:chensino-mysql}:${MYSQL_PORT:3306}/${MYSQL_DB:chensino}?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8&allowMultiQueries=true&allowPublicKeyRetrieval=true&rewriteBatchedStatements=true

mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: delFlag  #逻辑删除
      logic-delete-value: 1 
      logic-not-delete-value: 0
```

#### 1.4.3 其他配置

最重要的是开启注解扫描，指定mapper所在的包

```java
@SpringBootApplication()
@MapperScan("com.chensino.core.mapper")
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}
```

其他的service、mapper.xml、entity推荐使用idea插件连接数据库自动生成，插件名字是MybatisX-Generator，下载好后连接数据库，在对应表上右键选择MybatisX-Generator，再填写相应信息即可自动生成相应的文件

![20220901150908](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220901150908.png)

spy.properties配置：

```yaml
#3.2.1以上使用
modulelist=com.baomidou.mybatisplus.extension.p6spy.MybatisPlusLogFactory,com.p6spy.engine.outage.P6OutageFactory

# 自定义日志打印
logMessageFormat=com.baomidou.mybatisplus.extension.p6spy.P6SpyLogger
#日志输出到控制台
appender=com.baomidou.mybatisplus.extension.p6spy.StdoutLogger
# 使用日志系统记录 sql
#appender=com.p6spy.engine.spy.appender.Slf4JLogger
# 设置 p6spy driver 代理
deregisterdrivers=true
# 取消JDBC URL前缀
useprefix=true
# 配置记录 Log 例外,可去掉的结果集有error,info,batch,debug,statement,commit,rollback,result,resultset.
excludecategories=info,debug,result,commit,resultset
# 日期格式
dateformat=yyyy-MM-dd HH:mm:ss
# 实际驱动可多个
#driverlist=org.h2.Driver
# 是否开启慢SQL记录
outagedetection=true
# 慢SQL记录标准 2 秒
outagedetectioninterval=2
```

### 1.5 添加Redis

#### 1.5.1 maven依赖以及配置

```xml
      <!--缓存依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

```yaml
spring:
  redis:
    database: 0
    password: 123456
    host: chensino-redis
    port: 6379
    timeout: 1000
    jedis:
      pool:
        enabled: true
        max-active: 8 #池中最大连接数
        max-idle: 8 #最大空闲连接数
        max-wait: 1000
        min-idle: 0
```

#### 1.5.2 redis封装

redis配置直接[参考此作者代码](https://blog.csdn.net/yu102655/article/details/112217778)，主要是封装reids方法，实现序列化反序列化

[代码参考此处](https://github.com/ChenSino/ChenSino/tree/main/common/common-data/src/main/java/com/chensino/common/data/configuration/cache)

#### 1.5.3 遇到的坑

##### 坑1

在EnableAutoConfiguration配置时，在最后多了一个逗号，如下，最后有个逗号，会导致项目无法启动，启动直接报错

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.chensino.common.data.configuration.mybatis.MybatisPlusConfiguration,\
  com.chensino.common.data.configuration.cache.RedisConfiguration,\ # 此处手抖加了一个逗号
```

报错内容

```shell
Caused by: java.io.FileNotFoundException: class path resource [.class] cannot be opened because it does not exist
	at org.springframework.core.io.ClassPathResource.getInputStream(ClassPathResource.java:199)
	at org.springframework.core.type.classreading.SimpleMetadataReader.getClassReader(SimpleMetadataReader.java:55)
	at org.springframework.core.type.classreading.SimpleMetadataReader.<init>(SimpleMetadataReader.java:49)
	at org.springframework.core.type.classreading.SimpleMetadataReaderFactory.getMetadataReader(SimpleMetadataReaderFactory.java:103)
	at org.springframework.boot.type.classreading.ConcurrentReferenceCachingMetadataReaderFactory.createMetadataReader(ConcurrentReferenceCachingMetadataReaderFactory.java:86)
	at org.springframework.boot.type.classreading.ConcurrentReferenceCachingMetadataReaderFactory.getMetadataReader(ConcurrentReferenceCachingMetadataReaderFactory.java:73)
	at org.springframework.core.type.classreading.SimpleMetadataReaderFactory.getMetadataReader(SimpleMetadataReaderFactory.java:81)
	at org.springframework.boot.autoconfigure.AutoConfigurationSorter$AutoConfigurationClass.getAnnotationMetadata(AutoConfigurationSorter.java:233)
	... 27 common frames omitted
```
根据idea的提示，直接在报错位置打断点会看到如下异常
![20220901174408](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220901174408.png)

##### 坑2

我想把user对象存入redis报错，jackson序列化失败了

```shell
Caused by: com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDateTime` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.chensino.core.api.entity.SysUser["createTime"])
```

解决方法就是在LocalDateTime字段加上序列化和反序列化的注解，让jackson知道如何进行序列化和反序列化

```java
 /**
     * 创建时间
     */
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime updateTime;
```

### 1.6 添加swagger

#### 1.6.1 依赖

使用3.0.0只需要下面这一个依赖

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

#### 1.6.2 swagger配置

[swagger基本配置](https://gist.github.com/ChenSino/0572236b3bbbbff7a40d7e2737205c24)

#### 1.6.3 使用

1. 在Controller添加注解`@Api(value = "用户管理",tags = {"用户管理"})`
2. 在方法上添加注解`@ApiOperation(value = "根据id查询-value")`

注意，Controller上注解中的tags是一个逻辑分组，比如如果把两个不同的Contrller都用同样的tags,则这两个不同Controller中的接口会被放到一个分组下，一般情况下我们只需要按照上面配置即可，没必要高的过于复杂
![20220902135942](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220902135942.png)

### 1.7 添加Security

#### 1.7.1 maven依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

#### 1.7.2 启动

引入依赖后直接启动项目在控制台会生成随机密码，用户名：user 密码：xx登陆。此时swagger也需要用户名和密码才能访问

![20220902155557](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220902155557.png)

#### 1.7.3 


### 1.8 角色权限控制

### 1.9 菜单权限

## 2、前端篇

### 2.1 初始化vue2

### 2.2 axios统一处理
