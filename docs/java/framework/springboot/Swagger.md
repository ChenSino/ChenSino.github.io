---
title: Swagger
date: 2023-05-09
isOriginal: true
category: 
tag: 
---

## Swagger和SpringFox关系

java项目在引入swagger的时候，一般会引入如下依赖，当时只知道照着博客抄，也有好奇为啥叫springfox,怎么没有swagger,不知你是否有同样的疑问？直到今天问了一下GPT

~~~xml
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-boot-starter</artifactId>
    </dependency>
~~~

~~~markdown
问：springfox过时了吗？
    是的，Springfox已经过时了，官方已经停止了对该项目的维护和更新，取而代之的是Springdoc。Springdoc是一个基于Spring Boot的机制来文档化RESTful API的开源库，它遵循Swagger规范和OpenAPI规范。Springdoc相较于Springfox来说，有更好的性能和更严格的规范，同时还提供了更多易用的特性，比如支持Spring MVC验证注解、支持Kotlin语言等。

如果您是新的项目，我建议直接使用Springdoc，它不仅能够轻松集成Swagger 2和3，支持Java和Kotlin等多种语言，而且也提供了更灵活的配置方式和强大的文档生成功能。如果您现在正在使用Springfox，建议您尽快升级到Springdoc。

问：springfox和swagger的关系？
    答：Springfox 是一个在 Spring 框架下的、用于生成 Swagger API 文档的开源库，可以自动生成 Swagger 官方支持的 JSON 或 YAML 格式的 API 文档。Springfox 的目标是简化 API 文档的生成和维护工作。
    而 Swagger 是一套规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。它包括一些工具，可以帮助开发人员设计、构建、编写文档和消费 RESTful APIs。
    Springfox 是基于 Swagger 规范的产物，他是在 Swagger 的基础上实现了对 Spring 等相关框架的集成，使得我们可以更方便地在 Spring 应用中使用 Swagger 来生成 API 文档，因此间接实现了无状态的 API 设计与文档生成。Springfox 让生成和维护 API 文档变得简单，只需要加上几个注解，即可自动生成 Swagger API 文档。
    总结来说，Swagger为一种API文档规范和一套API开发框架；而Springfox是为了更方便Spring Boot集成Swagger而存在的一个开源库。两者的关系可以理解为Springfox是基于Swagger框架和规范的一种工具。
~~~

从以上回到明显可看出，springfox和swagger是两个东西，springfox不能代表swagger,其实也好理解，因为swagger不是java专有的，比如php也有swagger,总不能让php也用springfox吧。
还有一点，springfox官方已经放弃了维护，转为了springdoc,新项目使用springdoc。以下截图也可以看到springfox依赖于swagger。

![20230509092040](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230509092040.png)