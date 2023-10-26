---
title: Linux挂载windows共享目录
date:  2023-10-26
author: chenkun
publish: true
keys:
category:
tag:
---

### 1、在windows设置共享目录

设置过程省略……

### 2、在linux下挂载

~~~shell
    ## 1. 创建空白目录
        mkdir /home/data/share
    ## 2. 修改/etc/fstab开机自动挂载
    //10.10.102.97/tempfile    /home/data/share  cifs    defaults,user=xxx,password=xxx,uid=1000,gid=1000  0 0
~~~
解释：
 `//10.10.102.97/tempfile`是在windows设置的共享目录，设置好了可以用其他windows电脑测试下看是否共享成功
 `/home/data/share` 挂载的位置，一定要是个空目录，
`cifs` 不要修改
`user`  windows帐户，
`password` windows密码
`uid` 挂载的目录所属用户，在linux终端用`id 你的用户名`查看  `gid`  用户组，和`uid`一个道理，这两个一定要指定，不然就被挂到root了

### 参考博客
[参考](https://blog.csdn.net/wifi74262580/article/details/90648892)