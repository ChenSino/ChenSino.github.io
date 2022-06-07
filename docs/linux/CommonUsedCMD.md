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

### 3、查询大文件
```bash
#查看当前路径下各目录占用空间大小
du -h --max-depth=1
# 查看文件大小
find / -type f -size +50M
```
### 4、查看文件被哪个进程占用
```bash
$ lsof sentinel-record.log.2022-04-28.0
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
java    28789 root   23w   REG  253,1    17941 132492 sentinel-record.log.2022-04-28.0

```

### 5、看开机启动项启动耗时

```shell
$ systemd-analyze blame        
6.925s NetworkManager-wait-online.service
2.583s snapd.service
2.027s systemd-modules-load.service
1.928s linux-module-cleanup.service
1.744s mariadb.service
1.168s systemd-random-seed.service
```

### 6、Curl命令

*更详细的用法请参考手册`man curl`*

1. 示例1,发送post请求，携带请求头，并且请求体中带form-data

```
curl -X POST -F "file=@/home/test/installrecorc.xlsx" -H "Authorization:Bearer 92e1622a-1fc8-40ea-b70a-937be40a3347" localhost:6061/import/installRecord
```

​	-X: 指定请求方法

​	-F：带表单的请求，指定文件

​	-H：带请求头

2. 示例2,下载文件

   ```shell
   #   使用-o，修改下载下载的文件名
   curl -o manjaro-kde-21.2.6-220416-linux515.iso  https://download.manjaro.org/kde/21.2.6/manjaro-kde-21.2.6-220416-linux515.iso
   # -O,不修改文件名，直接使用服务器上的文件吗
   curl -O https://download.manjaro.org/kde/21.2.6/manjaro-kde-21.2.6-220416-linux515.iso
   ```

   
