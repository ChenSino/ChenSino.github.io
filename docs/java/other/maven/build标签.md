---
title: build标签
date: 2023-06-08
isOriginal: true
category: 
    - maven
tag: 
---

## 配置解释

resource标签的操作是通过`maven-resource-plugin`插件来实现的,通过配置标签来实现资源文件的过滤替换。这个标签的作用是告诉Maven，在拷贝源文件到目标路径之前，对源文件内容进行参数替换。

~~~xml
    <build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>

                <filtering>false</filtering>
            </resource>
            <resource>
                <!--指定从directory下进行搜索-->
                <directory>src/main/resources</directory>
                <!--需要包含的文件-->
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.yml</include>
                    <include>**/*.xml</include>
                    <include>*.xml</include>
                    <include>META-INF/**</include>
                </includes>
                 <!--exclude和include相反,排除文件-->
                <excludes>
                    <exclude>xxx</exclude>
                </excludes>
                   <!--targetPath代从dirctory中筛选出文件,把他们放到targetPath指定的目录-->
                 <targetPath>targetPath</targetPath>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>

~~~

比如以下图中就是指定了`targetPath`的路径在项目下的一个叫做targetPath的目录,执行编译就可以看到确实把文件复制过去了

![20230608173626](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230608173626.png)