---
title: 使用Arthas定位线上问题
date: 2022-04-28  
author: chenkun
publish: true
keys:
category:
  - 问题定位
---

<!--more-->

> 背景：有一个导出PDF的功能，在本地运行正常，在线上异常，抛出的异常无法直接定位到问题。

## 1、使用arthas来跟踪

1. 进入arths,attach进入项目

```bash
$ as.sh
Arthas script version: 3.5.5
[INFO] JAVA_HOME: /usr/local/jdk1.8.0_72
[INFO] Process 57135 already using port 3658
[INFO] Process 57135 already using port 8563
Found existing java process, please choose one and input the serial number of the process, eg : 1. Then hit ENTER.
  [1]: 134242 ccs-gateway.jar
  [2]: 47802 ccs-data-biz.jar
2

```

2. 根据线上log定位到异常大致的位置

![image-20220428111351818](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220428111351818.png)

3. 到本地IDE打开源码

![image-20220428111556978](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220428111556978.png)

createPDF方法空指针，那首先肯定想到的是参数htmlStr是null

4. 进入freemarkerRender方法查看，为何返回null

![image-20220428112248916](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220428112248916.png)

5. 直接查看关键处理函数`template.process(dataMap, out);`

6. 使用arthas的watch命令，追踪参数、返回值、异常信息

```bash
watch freemarker.template.Template process '{params,returnObj,throwExp}'  -n 5  -x 3 '1==1'
```

追踪发现

![image-20220428113034007](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220428113034007.png)

7. 源码中因为异常未指定捕获`TemplateModelException`所以`template.process(dataMap, out);`方法报错后直接返回了null，所以直接把异常捕获改成`ExcelpTion`即可

   ![image-20220428113408828](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220428113408828.png)

