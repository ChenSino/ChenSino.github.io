---
title: undertow.xxx not found
date: 2023-05-06
isOriginal: true
category: 
tag: 
---


## 背景

用户反馈上传图片失败，查看日志报错`上传文件提示：java.nio.file.NoSuchFileException: /tmp/undertow.xxxx.xxxxx，解决方案`，问题是这个问题之前用户就反馈过，之前是直接重启就好了，之后也没深究。最近用户又反馈不行了，所以花了点时间深究一下从根源解决问题。

## 原因

在 Linux 系统中，Spring Boot 应用以 java -jar 命令启动时，会在操作系统的 /tmp 目录下随机生成一个 tomcat（或 undertow ）临时目录，上传的文件先要转换成临时文件保存在这个文件夹中。
由于临时 /tmp 目录下的文件，在长时间（默认10天）没有使用的情况下，操作系统会执行 tmp 目录清理服务（systemd-tmpfiles-clean.service），导致 /tmp/undertow.xxxx.xxxxxxx 文件被清理；
导致在上传文件时，java调用 Files.createFile(…) 在目录/tmp/undertow.xxxx.xxxxxxx下创建临时文件时，发现找不到目录，就会抛出以上的错误。

## 解决方法

### 方法一

可以根据报错信息，新建 /tmp/undertow.xxxx.xxxxxxxx 目录，不影响用户正常使用。
执行 mkdir -p /tmp/undertow.8760.570269926767628882命令;

### 方法二

先创建好文件，配置问yml中

```yml
spring:
  servlet:
    multipart:
      location: xxxx
```

### 方法三

`java -jar -Dspring.servlet.multipart.location=xxxx`

## 验证是否生效

### 方式1

使用以上几个方法发现创建的目录在程序启动后里面还是空白，是因为还没有上传文件当然就没有东西了，可以使用`watch -n 1 'ls -l'`来查看，方法如下：

1. 先在对应路径下执行`watch -n 1 'ls -l'`,每秒打印一次
2. 上传文件
3. 运气好会看到watch的命令会打印出一个tmp文件，但是会马上被删除

### 方式2

删除你新建的目录，上传文件，再次报之前的错误，说明我们的配置是生效的