---
title: LogBack
date: 2023-05-22
isOriginal: true
tag: 
  - 日志
---


## 配置

~~~xml
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
    <!-- Log file trace output -->
    <appender name="trace" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/trace.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/%d{yyyy-MM, aux}/trace.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>50MB</maxFileSize>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
    </appender>
<!--    -->
    <logger name="com.chensino">
        <appender-ref ref="error"/>
    </logger>
    <logger name="com.chensino">
        <appender-ref ref="info"/>
    </logger>
    <logger name="org.springframework.security" level="trace" additivity="false">
        <appender-ref ref="trace"/>
    </logger>
    <!-- Level: FATAL 0  ERROR 3  WARN 4  INFO 6  DEBUG 7 -->
    <root level="INFO">
        <appender-ref ref="console"/>
    </root>
</configuration>
~~~

## 分解配置

### logger

~~~xml

    <logger name="org.springframework.security" level="trace" additivity="false">
        <appender-ref ref="trace"/>
    </logger>
~~~

- name：指定范围，可指定包名，或者精确到类名
- level： 日志级别，若不配置logback默认为error级别
- additivity： 是否把当前日志追加到根日志（root）

### appender

~~~xml
    <!-- Log file trace output -->
    <appender name="trace" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/trace.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/%d{yyyy-MM, aux}/trace.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>50MB</maxFileSize>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
    </appender>
~~~

- name: 指定此配置的名字，和spring的bean差不多，指定后可被其他组件引用
- level： 这里又出现了level,和logger是否冲突了？后面解释
- 其他标签： 不解释，看配置都能看出来大概作用

## 在logger 标签已经定义了level为什么在appender下的filter中还要定义？

在使用Logback时，其日志输出流程是从Logger -> Appender -> Filter。先根据Logger的级别过滤掉不需要的日志事件，然后将满足级别条件的日志事件交给Appender进行输出。最后，如果在Appender中定义了Filter，则会根据Filter中的条件再次过滤日志事件。

可以这样理解：Logger中的级别是起到一道默认的过滤作用的，只有满足Logger的级别要求的日志事件才能继续往下走，进入到Appender的处理流程和Filter的过滤流程中。

举个例子，在以下配置中：

~~~xml
<logger name="com.example" level="info" additivity="false">
    <appender-ref ref="console" />
</logger>

<appender name="console" class="ch.qos.logback.core.ConsoleAppender">
    <layout class="ch.qos.logback.classic.PatternLayout">
        <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
    </layout>

    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
        <level>debug</level>
    </filter>
</appender>
~~~

我们配置了一个logger，类名为com.example，级别为info，它引用了名为console的appender。在console这个appender中，我们定义了一个Filter，用于过滤掉级别为debug以外的日志事件。

假如我们在代码中输出了一条debug级别的日志事件，因为logger的级别是info，所以这条日志事件会被过滤掉，不会经过appender和filter的处理而直接被忽略掉。如果代码中输出的日志级别是info，这条日志事件就会被appender处理，并且filter也会检查该条日志是否符合要求，最终决定是否输出。

== 所以，并不是说在logger配置了一个info级别的日志，然后在代码打印一个info级别日志，就一定会输出这个日志，还要看最终输出时appender的日志级别，如果appender日志级别不满足照样不会输出
