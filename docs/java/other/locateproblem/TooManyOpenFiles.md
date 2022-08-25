---
title: TooManyOpenFiles
date:  2022-08-25
author: chenkun
keys:
category:
tag:
  - 问题定位
---

## Linux服务器打开文件过多

### 线上异常

```shell
java.io.IOException: Too many open files
        at sun.nio.ch.ServerSocketChannelImpl.accept0(Native Method)
        at sun.nio.ch.ServerSocketChannelImpl.accept(ServerSocketChannelImpl.java:422)
        at sun.nio.ch.ServerSocketChannelImpl.accept(ServerSocketChannelImpl.java:250)
        at org.apache.tomcat.util.net.NioEndpoint.serverSocketAccept(NioEndpoint.java:446)
        at org.apache.tomcat.util.net.NioEndpoint.serverSocketAccept(NioEndpoint.java:70)
        at org.apache.tomcat.util.net.Acceptor.run(Acceptor.java:95)
        at java.lang.Thread.run(Thread.java:748)
```

### 问题原因分析

Linux中每个进程、每个用户打开的文件数量是有限制的，查看数量限制可使用`ulimit`命令，常使用命令如下：

- `ulimit -a`：查看系统资源设置
- `ulimit -n`：查看系统同一时间最多可打开的文件数量
- `lsof`：查看当前系统打开的所有文件
- `lsof | wc -l`： 统计系统已打开的文件数
- `lsof -p <pid>`：查看某个进程打开的文件
- `lsof -p <pid> | wc -l`：查看某个进程打开的文件数量

```shell
# root @ sono-bom in /home/sono_bom/logs [18:16:44] 
$ ulimit -a
-t: cpu time (seconds)              unlimited
-f: file size (blocks)              unlimited
-d: data seg size (kbytes)          unlimited
-s: stack size (kbytes)             8192
-c: core file size (blocks)         0
-m: resident set size (kbytes)      unlimited
-u: processes                       127964
-n: file descriptors                65535
-l: locked-in-memory size (kbytes)  64
-v: address space (kbytes)          unlimited
-x: file locks                      unlimited
-i: pending signals                 127964
-q: bytes in POSIX msg queues       819200
-e: max nice                        0
-r: max rt priority                 0
-N 15:                              unlimited
```

```shell
$ ulimit -n
65535
```

根据`ulimit -n`得知系统设置的最大打开文件为65535,然后通过`lsof|wc -l`发现，打开的文件已经超过65535,所以报错`Too many files open`是正常的。
接下来使用`jps -lv`查看报错的java服务进程id，再使用`lsof -p <pid>`查看打开的文件都有哪些，通过查看发现有一个文件ip2region.db被打开几万次，然后
到代码查找此文件名，定位到代码，发现一段代码打开文件后未调用close方法导致程序运行到一段时间就抛出Too many files open异常。
