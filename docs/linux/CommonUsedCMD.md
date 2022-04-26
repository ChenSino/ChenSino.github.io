---
title: Linux命令使用小技巧
date: 2022/3/17
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

<!--more-->
### 1、查找多个文件中是否包含字符串

```shell
grep -r targetString targetDirectory
# -r 表示递归查询
# targetString  表示目标字符串
# targetDirectory 表示目录
```

更多功能：
-r 是递归查找
-n 是显示行号
-R 查找所有文件包含子目录
-i 忽略大小写
xargs配合grep查找

```shell
find -type f -name '*.php'|xargs grep 'message'
```

### 2、高亮关键字

在生产环境查看日志时高亮`ERROR`关键字，方便定位问题，这里利用linux管道加上`perl`在管道中替换

```bash
tail -f xxx.log | perl -pe 's/(ERROR)/\e[1;31m$1\e[0m/g'  
```

参考：https://www.cnblogs.com/Detector/p/7246377.html

![测试](https://github.com/ChenSino/ChenSino.github.io/blob/main/docs/frontWeb/images/jsonp.jpg)
