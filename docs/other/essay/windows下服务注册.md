---
title: windows下服务注册
date: 2024-03-29
author: chensino
publish: true
isOriginal: true
---

## 1.需求

~~~markdown
    1. windows下没有像linux的`nohup xxx &`的后台启动命令，springboot项目就无法后台运行
    2. 把任意一个命令注册为服务
~~~

## 2. 实现方式

### 2.1 使用nssm

使用nssm把一个exe命令注册为服务可以直接执行`nssm install ServiceName "Path\to\your\executable" "arguments"`，arguments可以没有，注册
为服务，在服务管理就可以看到，也可以直接在命令行启动`ServiceName start`

### 2.2 使用winsw

winsw也差不多，不过他要配置一个xml文件

~~~xml

<!-- 这里的根元素必须是service节点 -->
<service>
<!-- 指定在Windows系统内部使用的识别服务的ID,唯一 -->
<id>HomeinnWorkOrder</id>
<!-- 服务的简短名称,唯一 -->
<name>HomeinnWorkOrder</name>
<!-- 描述 -->
<description>This is HomeinnWorkOrder service.</description>
<!-- 指定要启动的可执行文件。 -->
<executable>java</executable>
<!-- 指定启动的Jar及环境 -->
<arguments>-jar HomeinnWorkOrder.jar --spring.profiles.active=dev</arguments>
<!-- 开机启动 -->
<startmode>Automatic</startmode>
<!-- 日志配置，项目中以及配置了logback，所以在这里就不输出日志了 -->
<logmode>none</logmode>
</service>

~~~

然后安装服务：

~~~sh

<!--项目名.exe install-->
HomeinnWorkOrder.exe install

~~~

删除服务：

~~~
<!--项目名.exe uninstall-->
HomeinnWorkOrder.exe uninstall
~~~
