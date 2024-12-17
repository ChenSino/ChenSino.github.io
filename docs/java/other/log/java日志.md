---
title: Java日志框架
date: 2018-03-28  
publish: true
---

##### 1. 常见的日志接口
1. Commons Logging（Apache Commons Logging、Jakarta Commons Logging maven），简称jcl
2. SLF4J
这两个相当于是定义的接口，类似JDBC
##### 2. 日志接口的具体实现
1. log4j
2. log4j2
3. logback
4.  jdk自带的logging（简称jul）
##### 3. 说明
- 一般使用是需要接口+实现配合使用，可以自由选择组合方式
- spring中使用的是jcl日志接口，如果直接从spring-core中排除jcl会报错，需要添加jcl-over-slf4j
- xxx-over-yyy代表，把原来的xxx改成用yyy，jcl-over-slf4j就是代表spring本来用的jcl框架实现的日志，现把它改成用slf4j来实现
##### 4. 在spring中使用SLF4J+Logback
1. 排除spring-core中的jcl（实测不排除也能运行）

```xml
在这里插入代码片
```

2. 添加依赖

```xml
<!-- Logback -->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.3</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-core</artifactId>
      <version>1.2.3</version>
    </dependency>
    <dependency>
      <groupId>org.logback-extensions</groupId>
      <artifactId>logback-ext-spring</artifactId>
      <version>0.1.4</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.25</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>jcl-over-slf4j</artifactId>
      <version>1.7.25</version>
    </dependency>
```
3. 添加logback配置文件，命名为logback.xml（默认会读取），放到resource下
这里的读取有个优先级logback.properties、logback-test.xml等等都可以读取到，具体的可以参考logback官网

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true">
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%-4relative [%thread] %-5level %logger{35} - %msg %n</pattern>
        </encoder>
        <!-- 日志输出编码 -->
        <layout class="ch.qos.logback.classic.PatternLayout">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n
            </pattern>
        </layout>
    </appender>
    　
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>testFile.log</file>
        <append>false</append>
        <encoder>
            <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
        </encoder>
        　　　　　　
    </appender>
    <logger name="org.springframework" level="info" additivity="false">
        <appender-ref ref="STDOUT"/>
    </logger>
    <!-- 日志输出级别 -->
    <root level="warn">
        <appender-ref ref="STDOUT"/>
<!--        <appender-ref ref="FILE"/>-->
    </root>
</configuration>
```
##### 5. logback.xml配置文件说明
###### 5.1  配置文件主要分三大部分appender、logger、root
 - appender简单理解就是定义日志输出的位置、日志格式、编码、日志切割策略等，可以设置输出到控制台或者输出到文件
 - logger就是设置哪一个类文件、或者包中的类需要输出日志
 - root是一个特殊的logger，是所有logger的父亲
 - 如果在普通的logger中设置additivity="true"，代表把普通logger的日志追加到其父logger中，造成的结果就是可能看到重复的日志。
