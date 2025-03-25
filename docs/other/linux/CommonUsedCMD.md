---
title: 常用命令
date: 2021-03-17
author: chenkun
publish: true
keys:
---

<!--more-->
### 1、查找多个文件中是否包含字符串

~~~shell
grep -r targetString targetDirectory
# -r 表示递归查询
# targetString  表示目标字符串
# targetDirectory 表示目录
~~~

更多功能：
-r 是递归查找
-n 是显示行号
-R 查找所有文件包含子目录
-i 忽略大小写
xargs配合grep查找

~~~shell
find -type f -name '*.php'|xargs grep 'message'
~~~

### 2、高亮关键字

在生产环境查看日志时高亮`ERROR`关键字，方便定位问题，这里利用linux管道加上`perl`在管道中替换

~~~bash
tail -f xxx.log | perl -pe 's/(ERROR)/\e[1;31m$1\e[0m/g'  
~~~

参考：https://www.cnblogs.com/Detector/p/7246377.html

### 3、查询大文件

~~~bash
#查看当前路径下各目录占用空间大小
du -h --max-depth=1
# 查看文件大小
find / -type f -size +50M
~~~

### 4、查看文件被哪个进程占用

~~~bash
$ lsof sentinel-record.log.2022-04-28.0
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
java    28789 root   23w   REG  253,1    17941 132492 sentinel-record.log.2022-04-28.0

~~~

### 5、看开机启动项启动耗时

~~~shell
$ systemd-analyze blame        
6.925s NetworkManager-wait-online.service
2.583s snapd.service
2.027s systemd-modules-load.service
1.928s linux-module-cleanup.service
1.744s mariadb.service
1.168s systemd-random-seed.service
~~~

### 6、Curl命令

*更详细的用法请参考手册`man curl`*

1. 示例1,发送post请求，携带请求头，并且请求体中带form-data

~~~
curl -X POST -F "file=@/home/test/installrecorc.xlsx" -H "Authorization:Bearer 92e1622a-1fc8-40ea-b70a-937be40a3347" localhost:6061/import/installRecord
~~~
​	-X: 指定请求方法

​	-F：带表单的请求，指定文件

​	-H：带请求头

2. 示例2,下载文件

   ~~~shell
   #   使用-o，修改下载下载的文件名
   curl -o manjaro-kde-21.2.6-220416-linux515.iso  https://download.manjaro.org/kde/21.2.6/manjaro-kde-21.2.6-220416-linux515.iso
   # -O,不修改文件名，直接使用服务器上的文件吗
   curl -O https://download.manjaro.org/kde/21.2.6/manjaro-kde-21.2.6-220416-linux515.iso
   ~~~

### 7、strace命令

strace常用来跟踪进程执行时的系统调用和所接收的信号。 在Linux世界，进程不能直接访问硬件设备，当进程需要访问硬件设备(比如读取磁盘文件，接收网络数据等等)时，必须由用户态模式切换至内核态模式，通 过系统调用访问硬件设备。strace可以跟踪到一个进程产生的系统调用,包括参数，返回值，执行消耗的时间。

~~~shell
strace -ff -o <prefix> <comand>
### 查看java执行时，内核调用情况
# 把内核调用的日志，按照线程分别记录到xxx开头的文件中，在linux中线程其实就是一个进程
strace -ff -o xxxx java -jar Hello
~~~

### 8、 nc命令

nc命令可以扮演http三次握手的连接过程，执行一下nc命令就等于建立连接，连接后
enter就可以发送内容，发送的内容只要服务端能解析即可（这里就需要客户端和服务端约定好一个大家都认识的协议，我发的内容你可以解析，你发的内容我也可以解析，达到交互目的）

这里扩展一下http和tcp,上面说了nc负责建立连接，至于连接之后发送的内容其实就需要两端约定好，这个数据格式的约定就是http所负责的。在浏览器中，一个http请求我们可以看到请求行、请求头、请求体等内容，这就是http的约定的格式，你按照这个格式去发送，我服务端和客户端才都可以解析。http是基于tcp的，由tcp负责连接（三次握手），然后http按照指定的格式发送，所以http和tcp并不是同一个层面的东西，一句话总结，http负责报文格式约定，tcp负责建立连接，发送数据。

~~~shell
# manjaro先安装
sudo pacman -S netcat

## 连接指定主机的某个端口，
nc <ip> <port>

#
nc localhost 8080
~~~

### 9、tcpdump抓包

~~~shell
##监听指定网卡，指定的端口，配合nc命令可以清晰的查看tcp的三次握手情况
tcpdump -nn -i <网卡id> port <port>
~~~

### 10、查找某个进程的执行目录

场景：某同事A启动了一个进程，有一天同事B想去重启，他只知道端口号，不知道服务具体工作目录在哪里。

~~~shell
#1.根据端口查看进程号，发现是个node进程
root@master:~# netstat -tunpl|grep 3000
tcp6       0      0 :::3000                 :::*                    LISTEN      55153/node
~~~

~~~shell
# 2.查看工作进程目录ll /proc/<PID>
root@master:~# ll /proc/55153
总用量 0
dr-xr-xr-x   9 root root 0 2月  28 14:56 ./
dr-xr-xr-x 261 root root 0 12月 23 21:13 ../
dr-xr-xr-x   2 root root 0 3月  10 09:20 attr/
-rw-r--r--   1 root root 0 3月  10 09:20 autogroup
-r--------   1 root root 0 3月  10 09:20 auxv
-r--r--r--   1 root root 0 3月  10 09:20 cgroup
--w-------   1 root root 0 3月  10 09:20 clear_refs
-r--r--r--   1 root root 0 2月  28 14:56 cmdline
-rw-r--r--   1 root root 0 3月  10 09:20 comm
-rw-r--r--   1 root root 0 3月  10 09:20 coredump_filter
-r--r--r--   1 root root 0 3月  10 09:20 cpuset
lrwxrwxrwx   1 root root 0 3月   3 09:10 cwd -> /home/web/jiaoben/
-r--------   1 root root 0 3月  10 09:20 environ
lrwxrwxrwx   1 root root 0 2月  28 14:56 exe -> /root/.nvm/versions/node/v16.17.0/bin/node*
dr-x------   2 root root 0 2月  28 14:56 fd/
dr-x------   2 root root 0 3月  10 09:20 fdinfo/
-rw-r--r--   1 root root 0 3月  10 09:20 gid_map
-r--------   1 root root 0 3月  10 09:20 io
-r--r--r--   1 root root 0 3月  10 09:20 limits
-rw-r--r--   1 root root 0 3月  10 09:20 loginuid
dr-x------   2 root root 0 3月  10 09:20 map_files/
-r--r--r--   1 root root 0 3月  10 09:20 maps
-rw-------   1 root root 0 3月  10 09:20 mem
-r--r--r--   1 root root 0 3月  10 09:20 mountinfo
-r--r--r--   1 root root 0 3月  10 09:20 mounts
-r--------   1 root root 0 3月  10 09:20 mountstats
dr-xr-xr-x   5 root root 0 3月  10 09:20 net/
dr-x--x--x   2 root root 0 3月  10 09:20 ns/
##....略
~~~

在这个目录可以看到两个软链接分别是：`exe`,`cwd`，其中`exe`对应的是可执行程序，`cwd`对应的是工作目录