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

### 1.4 添加Security

### 1.5 角色权限控制

### 1.6 菜单权限

## 2、前端篇

### 2.1 初始化vue2

### 2.2 axios统一处理