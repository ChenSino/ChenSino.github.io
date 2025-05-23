---
title: Paddle库加载的问题
date: 2025-03-21
author: chensino
publish: true
isOriginal: true
---

### 背景

> 使用Java调用同事c++的库进行ocr图片识别，在我本机(linux)下是正常加载他提供的各种so库，但是放到公司服务器上就报错。

他提供的库如下：

~~~shell
drwxr-xr-x 2 root root      4096 3月  21 15:02 ./
drwxr-xr-x 8 root root      4096 3月  21 17:28 ../
-rwxr-xr-x 1 root root  42580992 3月  20 15:45 HiAi.so*
-rwxr-xr-x 1 root root  33875640 3月  21 09:56 libdnnl.so.2*
-rwxr-xr-x 1 root root    191744 3月  21 15:02 libgomp.so.1*
-rwxr-xr-x 1 root root   1932448 3月  21 09:56 libiomp5.so*
-rwxr-xr-x 1 root root   1103376 3月  21 11:04 libjava_KOcr.so*
-rwxr-xr-x 1 root root     58216 3月  20 15:45 libjbig.so.0*
-rwxr-xr-x 1 root root    424648 3月  20 15:45 libjpeg.so.8*
-rwxr-xr-x 1 root root  11766384 10月 23 17:51 liblept.so*
-rwxr-xr-x 1 root root  11766384 10月 23 17:43 liblept.so.5*
-rwxr-xr-x 1 root root 130096544 3月  21 09:56 libmklml_intel.so*
-rwxr-xr-x 1 root root  15086128 3月  21 09:56 libonnxruntime.so.1.11.1*
-rwxr-xr-x 1 root root   5522040 3月  21 09:56 libopencv_core.so.406*
-rwxr-xr-x 1 root root   3703992 3月  21 09:56 libopencv_imgcodecs.so.406*
-rwxr-xr-x 1 root root   8085520 3月  21 09:56 libopencv_imgproc.so.406*
-rwxr-xr-x 1 root root  18371152 3月  20 15:45 libopencv_java.so*
-rwxr-xr-x 1 root root   6376520 3月  21 09:56 libpaddle2onnx.so*
-rwxr-xr-x 1 root root   6376520 3月  21 09:56 libpaddle2onnx.so.1.0.0rc2*
-rwxr-xr-x 1 root root 104892096 3月  21 09:56 libpaddle_inference.so*
-rwxr-xr-x 1 root root    149904 3月  21 15:00 libpng12.so.0*
-rwxr-xr-x 1 root root    202672 3月  20 15:46 libpng16.so.16*
-rwxr-xr-x 1 root root    681920 3月  21 09:56 libppocr.so*
-rwxr-xr-x 1 root root  50015272 10月 23 17:43 libtesseract.so*
-rwxr-xr-x 1 root root    485864 3月  20 15:46 libtiff.so.5*
-rwxr-xr-x 1 root root    420216 3月  20 15:46 libwebp.so.6*
~~~

我的demo代码如下：

~~~java
import java.io.File;


public class Hello {


    public static void main(String... args) {
	    System.out.println("enter....");
          String nativeLibraryDir = "/home/tools/native";
                 // String nativeLibraryDir = "/home/data/SonoProjects/labeltools/sono_ai_task/native";
        try {

            //加载顺序不可乱
            System.load(nativeLibraryDir + "/libpng16.so.16");
            System.load(nativeLibraryDir + "/libjpeg.so.8");
            System.load(nativeLibraryDir + "/libjbig.so.0");
            System.load(nativeLibraryDir + "/libtiff.so.5");
            System.load(nativeLibraryDir + "/libwebp.so.6");
            System.load(nativeLibraryDir + "/libopencv_core.so.406");
            System.load(nativeLibraryDir + "/libopencv_imgproc.so.406");
            System.load(nativeLibraryDir + "/libopencv_imgcodecs.so.406");
            System.load(nativeLibraryDir + "/libdnnl.so.2");
            System.load(nativeLibraryDir + "/libpaddle2onnx.so.1.0.0rc2");
            System.load(nativeLibraryDir + "/libonnxruntime.so.1.11.1");
            System.load(nativeLibraryDir + "/libiomp5.so");
            System.load(nativeLibraryDir + "/libmklml_intel.so");
            System.load(nativeLibraryDir + "/libpaddle_inference.so");
            System.load(nativeLibraryDir + "/libppocr.so");
            System.load(nativeLibraryDir + "/libopencv_java.so");
            System.load(nativeLibraryDir + "/libjava_KOcr.so");
            System.load(nativeLibraryDir + "/HiAi.so");
        } catch (Exception e) {
           e.printStackTrace();
        }
	System.out.println("loaded...");
    }
}
~~~

当加载libpaddle_inference.so时就报错，报错如下：

~~~shell
#
# A fatal error has been detected by the Java Runtime Environment:
#
#  SIGILL (0x4) at pc=0x00007fccffc65f92, pid=13224, tid=0x00007fcd6a181700
#
# JRE version: OpenJDK Runtime Environment (8.0_362-b09) (build 1.8.0_362-8u372-ga~us1-0ubuntu1~18.04-b09)
# Java VM: OpenJDK 64-Bit Server VM (25.362-b09 mixed mode linux-amd64 compressed oops)
# Problematic frame:
# C  [libpaddle_inference.so+0x15d6f92]
#
# Failed to write core dump. Core dumps have been disabled. To enable core dumping, try "ulimit -c unlimited" before starting Java again
#
# An error report file with more information is saved as:
# /home/tools/hs_err_pid13224.log
#
# If you would like to submit a bug report, please visit:
#   http://bugreport.java.com/bugreport/crash.jsp
# The crash happened outside the Java Virtual Machine in native code.
# See problematic frame for where to report the bug.
#
已放弃
~~~

### 排查

deepseek解释如下，经过查看服务器确实没有avx

1. 检查 CPU 指令集兼容性
**问题原因：**
SIGILL 通常是因为编译的库文件 (libpaddle_inference.so) 使用了目标机器 CPU 不支持的指令集（如 AVX2、AVX512 等）。例如：

​编译环境的 CPU 支持 AVX2，但运行环境的 CPU 不支持。
PaddlePaddle 默认会根据编译环境的 CPU 启用高性能指令优化。
解决方法：

​步骤 1: 检查运行环境的 CPU 支持哪些指令集：

bash
cat /proc/cpuinfo | grep avx
查看输出中是否包含 avx2、avx512 等关键字。


起初以为是公司服务器不支持这个指令，网上搜索发现这个cpu支持avx，然后想到可能是因为公司服务器都是虚拟机的缘故，为了验证猜测，我在物理机上查看`cat /proc/cpuinfo|grep avx`，发现是支持的，然后同样运行demo代码，一切ok。所以问题基本可以确定就是因为虚拟机cpu不支持avx指令引起的。

### 解决方法

1. 关闭虚拟机系统
2. 根据虚拟机平台（PVE、ESXI）自行修改cpu硬件设置。

pve设置如下：
![](https://ddns.chensina.cn:2032/afatpig/blog/2025-03-21_17-48.png)

ESXI设置自行百度，若没有类似host的选项可以看看有没有 硬件直通选项。