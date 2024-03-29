---
title: import使用
date:  2022-09-02
author: chenkun
keys:
---

## 1. import介绍

[官方介绍](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#Importing_Dependencies)

maven中的import是解决maven只能单个继承的问题，有时候我们的maven项目已经有了一个公司所自定义parent，但是我们想引入另一个项目中的dependencyManagement，此时可以用import,可以理解为把另一个项目中的dependencyManagement内容直接复制到本项目。

## 2. 使用方式

scope=import只能用在dependencyManagement并且type必须为pom,作用就是把另一个项目中dependencyManagement内容直接复制到本项目。以下就是一个最经典的使用方式，把springboot的版本管理直接引入本项目，在idea工具中可以直接点开看看里面管理了很多依赖，对每个依赖设置了version,以后在子项目引入依赖就不要version了。不仅仅springboot家族本身项目可以这样引入，包括其他依赖，只要在spring-boot-dependencies定义了的都可以无需版本引入，我在实际项目开发时有一次导入jedis就遇到过依赖问题，起初我是手动指定jedis版本，一直报错class undefine,后来去掉版本号，直接用spring-boot-dependencies中的就解决了问题。

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## 3.使用parent

使用parent也能实现类似上面import的功能，但是parent只能有一个，所以以上方式是对parent的补充，类似java单继承多实现

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <!--此处无需写version，因为parent已经包含了版本信息-->
                <!-- <version></version> -->
            </plugin>
        </plugins>
    </build>
</project>
```
