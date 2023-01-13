---
title: 在Manjaro中编译JDK11
date: 2023-01-13
author: chenkun
publish: true
keys:
category:
  - jdk
---

<!--more-->

## 1 下载源码

网上根据关键词查找jdk源码，查找出来很多可以下载源码的链接，这里我们使用github去官方仓库，openjdk是托管在github的[OpenJDK组织](https://github.com/openjdk?)下，该组织下有各个版本的openjdk源码，不要直接使用jdk仓库，这个仓库存放的是当前正在开发的最新版本代码，我们要用的是jdk11,因此我们搜索jdk11仓库，我这里选择的是jdk11u这个库。

![20230113095229](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230113095229.png)

~~~shell
git clone https://github.com/openjdk/jdk11u.git
~~~

## 2 编译

按照readme的文档进行编译

![20230113095821](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230113095821.png)

### 2.1 configure

首先执行进入源码目录，执行`bash configure`此命令会检查编译需要的环境，如果报错，根据错误提示安装必要的编译工具。

注意事项：

  1. 安装必要的环境，包括gcc、autoconf、boot JDK等 
  2. 编译一个jdk是需要依赖一个现有的jdk,另外对版本有要求，比如你编译的版本是N,则需要你电脑上有一个版本至少为N-1的版本，这里我编译jdk11时，我电脑事先安装了jdk11,理论上至少需要一个jdk10+
  3. gcc版本不能太老，也不能太新，这里一定要看你当前版本对应的文档，每个jdk版本对gcc版本要求也不一样，新版本jdk肯定能兼容更新的gcc,我在编译jdk11时，因为我的manjro是滚动更新，gcc版本是12,结果太新了导致编译报错。

~~~shell
bash configure
#……省略前边若干日志
#……
config.status: creating /home/chenkun/IdeaProjects/jdk11u/build/linux-x86_64-normal-server-release/buildjdk-spec.gmk
config.status: creating /home/chenkun/IdeaProjects/jdk11u/build/linux-x86_64-normal-server-release/compare.sh
config.status: creating /home/chenkun/IdeaProjects/jdk11u/build/linux-x86_64-normal-server-release/Makefile

====================================================
The existing configuration has been successfully updated in
/home/chenkun/IdeaProjects/jdk11u/build/linux-x86_64-normal-server-release
using default settings.

Configuration summary:
* Debug level:    release
* HS debug level: product
* JVM variants:   server
* JVM features:   server: 'aot cds cmsgc compiler1 compiler2 epsilongc g1gc graal jfr jni-check jvmci jvmti management nmt parallelgc serialgc services vm-structs zgc' 
* OpenJDK target: OS: linux, CPU architecture: x86, address length: 64
* Version string: 11.0.18-internal+0-adhoc.chenkun.jdk11u (11.0.18-internal)

Tools summary:
* Boot JDK:       openjdk version "11.0.17" 2022-10-18 OpenJDK Runtime Environment (build 11.0.17+1) OpenJDK 64-Bit Server VM (build 11.0.17+1, mixed mode) (at /usr/lib/jvm/java-11-openjdk)
* Toolchain:      gcc (GNU Compiler Collection)
* C Compiler:     Version 12.2.0 (at /usr/bin/gcc)
* C++ Compiler:   Version 12.2.0 (at /usr/bin/g++)

Build performance summary:
* Cores to use:   16
* Memory limit:   31876 MB

~~~

如上，执行`bash configure`后，检查了环境包括Boot JDK,Toochain,C Compiler,C++ Compiler，这里c和c++编译器版本要一致，可以看到上面我的版本是12.2.0，这个版本太新会导致编译有问题，在building文档中也有说明，最新支持到7.4,更新的版本没有测试，可能兼容可能不兼容。
![20230113101404](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230113101404.png)

### 2.2 执行编译make images

~~~shell
make images
##省略中间若干日志
/home/chenkun/IdeaProjects/jdk11u/src/hotspot/os/linux/cgroupV1Subsystem_linux.hpp:105:31: error: non-static data member initializers only available with '-std=c++11' or '-std=gnu++11' [-Werror=c++11-extensions]
  105 |     CgroupV1Controller* _pids = NULL;
   ... (rest of output omitted)
* For target hotspot_variant-server_libjvm_objs_cgroupV2Subsystem_linux.o:
In file included from /home/chenkun/IdeaProjects/jdk11u/src/hotspot/os/linux/cgroupV2Subsystem_linux.cpp:25:
/home/chenkun/IdeaProjects/jdk11u/src/hotspot/os/linux/cgroupV2Subsystem_linux.hpp:54:32: error: non-static data member initializers only available with '-std=c++11' or '-std=gnu++11' [-Werror=c++11-extensions]
   54 |     CgroupController* _unified = NULL;
      |                                ^
/home/chenkun/IdeaProjects/jdk11u/src/hotspot/os/linux/cgroupV2Subsystem_linux.hpp:56:38: error: non-static data member initializers only available with '-std=c++11' or '-std=gnu++11' [-Werror=c++11-extensions]
   56 |     CachingCgroupController* _memory = NULL;
      |                                      ^
/home/chenkun/IdeaProjects/jdk11u/src/hotspot/os/linux/cgroupV2Subsystem_linux.hpp:57:35: error: non-static data member initializers only available with '-std=c++11' or '-std=gnu++11' [-Werror=c++11-extensions]
   57 |     CachingCgroupController* _cpu = NULL;
      |                                   ^
cc1plus: all warnings being treated as errors

* All command lines available in /home/chenkun/IdeaProjects/jdk11u/build/linux-x86_64-normal-server-release/make-support/failure-logs.
=== End of repeated output ===

No indication of failed target found.
Hint: Try searching the build log for '] Error'.
Hint: See doc/building.html#troubleshooting for assistance.

make[1]: *** [/home/chenkun/IdeaProjects/jdk11u/make/Init.gmk:305：main] 错误 2
make: *** [/home/chenkun/IdeaProjects/jdk11u/make/Init.gmk:186：images] 错误 2

~~~

以上编译报错了，根据搞错大概也看出编译器的版本最大只能支持到11,所以我这里需要安装另一个版本的编译器，这里就体现arch系linux的缺点了，滚动版本太激进会导致有的老软件存在各种版本不兼容。

**解决编译器版本问题：**
使用yay安装老版本的gcc,这里我和文档保持一致，文档说目前最新的已测试通过的版本是gcc7,这里我就安装gcc7：

~~~shell
$ yay gcc7
8 aur/armeb-none-eabi-gcc75-linaro-bin 7.5_2019.12-1 (+0 0.00) 
    The GNU Compiler Collection - cross compiler for ARM EABI (bare-metal) big-endian target.
7 aur/arm-none-eabi-gcc73-linaro 7.3_2018.05-1 (+0 0.00) (过时的: 2021-11-02) 
    The GNU Compiler Collection - cross compiler for ARM EABI (bare-metal) target.
6 aur/aarch64-linux-gnu-gcc75-linaro-bin 2019.12-1 (+0 0.00) 
    The GNU Compiler Collection - cross compiler for ARM64 target
5 aur/arm-linux-gnueabi-gcc75-linaro-bin 7.5.0-1 (+1 0.00) 
    The GNU Compiler Collection - cross compiler for ARM target
4 aur/arm-linux-gnueabihf-gcc75-linaro-bin 7.5-0 (+2 0.57) 
    The GNU Compiler Collection- cross compiler for ARMv7 EABI hard float target. (Linaro)
3 aur/gcc7-libs 7.5.0-4 (+15 0.02) (已安装)
    Runtime libraries shipped by GCC (7.x.x)
2 aur/gcc7-fortran 7.5.0-4 (+15 0.02) 
    Fortran front-end for GCC (7.x.x)
1 aur/gcc7 7.5.0-4 (+15 0.02) (已安装)
    The GNU Compiler Collection - C and C++ frontends (7.x.x)
==> 要安装的包 (示例: 1 2 3, 1-3 或 ^4)
==> 
~~~

如上，选择第一个就行了，因为我已经安装过了，所以显示已安装。

安装好了以后，需要把默认的gcc改成7版本的。

~~~shell
##1. 查看当前默认的gcc在哪里
which gcc
/usr/bin/gcc

which g++ 
/usr/bin/g++

##2. 备份原来的12.2.0版本，编译完jdk后还原，防止系统其他软件出现问题
cd /usr/bin
sudo cp gcc gcc.bak
sudo cp g++ g++.bak

## 3. 把gcc7设为默认
sudo cp gcc-7 gcc
sudo cp g++-7 g++
~~~

设置默认gcc后，重新执行`bash configure` ，然后`make clean`，然后再`make images`就成功了，编译好的jdk默认在./build/linux-x86_64-normal-server-release/images/jdk
