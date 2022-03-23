---
title: 常用的命令
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

