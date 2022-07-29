---
title: 联合查询sql优化
date: 2022/4/28
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
  - 数据库
tags:
---

<!--more-->

**背景：**

> 最近在改一个老项目，其中使用到框架是mybatis，有一个业务表`install_record`,代表装机记录，一个`accessory`代表备件表，一个`sys_file`代表文件表，业务关系是一个install_record对应多个accessory、以及多个sys_file，在一开始使用的是mybatis的嵌套查询的方式，但此方式有N+1的问题，比如一个装机表对应10个accessory、20个sys_file，则就要查询1+10+20 = 31次数据库，效率是很低的，因此想改成嵌套查询的方式。

### 1、改造后的语句如下

```shell
SELECT xxx   FROM
	ccsx_weibao.install_record ir
	LEFT JOIN ccsx_weibao.install_record_accessory ira ON ira.host_id = ir.id
	LEFT JOIN ccsx.sys_file f ON f.business_type = 1 
	AND f.business_id = ir.id 	LIMIT 0,1000;
```

install_record表中有8000数据，accessory表20000数据，sys_file 表240000数据，执行sql直接卡死

### 2、原因分析

数据量其实很小，执行慢的原因是没有索引，使用`explain`分析sql

```bash
explain xxx
```

![image-20220428164618054](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220428164618054.png)

可以看到key那一列，只有两个PRIMARY被索引，所以所有用于关联字段加上索引即可，此处给`business_id`、`host_id`加上索引就ok了
