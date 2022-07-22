---
title: 软件分享
date: 2022/7/22
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

### 1、Beyond Compare3

#### 1.1、下载

[资源地址](https://afatpig.oss-cn-chengdu.aliyuncs.com/software/beyond_compare3.zip)

#### 1.2 、集成到git 对比

[参考此处](https://www.cnblogs.com/ayseeing/p/4268729.html)配置，主要有两步，

第一步，设置：

```shell
 git config --global merge.tool bc3
$ git config --global mergetool.bc3.path "c:/program files/beyond compare 3/bcomp.exe"
```

第二部，使用：

```shell
#注意对比使用git difftool不要用git diff
git difftool [xxx]
```

