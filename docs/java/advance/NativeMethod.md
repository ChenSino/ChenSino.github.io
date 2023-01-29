---
title: 自定义native方法
date: 2023-01-11
publish: true
keys:
---
使用c++实现一个native方法供java调用
 <!--more-->

::: note 环境
    实验环境linux、jdk11、gcc
:::

## 1、native方法

## 2、自定义实现native方法

~~~markdown
用c++实现一个动态链接库，使用java调用链接库中的方法
~~~

### 2.1 定义java源文件

~~~java
public class TestMain
{
    static
    {
        //加载指定的链接库
        System.load("/home/chenkun/FleetProjects/Hello.so");
    }

    //申明native方法
    public native static void Hello();

    public static void main(String[] args)
    {
        Hello();
    }
}
~~~

### 2.2 使用jdk自带工具生成c++头文件

1. 编译源文件，`javac Testmain.java`得到TestMain.class文件
2. 使用`javac -h . TestMain.java`生成头文件

在java8及之前，jdk中自带的javah可以用来生成头文件，但是在java9之后，此命令被去掉了，取而代之的是`javac -h`，其中-h后面要跟一个目录，代表生成的头文件存放的位置。

### 2.3 添加cpp文件

在上一步生成的头文件有点类似java中的接口定义，我们还需要提供实现类

~~~c++
#include <iostream>
#include "TestMain.h"
 
using namespace std;
 
JNIEXPORT void JNICALL Java_TestMain_Hello
  (JNIEnv *, jclass)
{
    cout << "Hello,wolrd!" << endl;
}
~~~

### 2.4 编译C++源码为动态库

~~~shell
g++ Hello.cpp -fpic -shared -o Hello.so
~~~

这一步编译，报错如下，

~~~shell
$ g++ Hello.cpp -fpic -shared -o Hello.so
In file included from Hello.cpp:2:
TestMain.h:2:10: 致命错误：jni.h：没有那个文件或目录
    2 | #include <jni.h>
      |          ^~~~~~~
编译中断。
~~~

报错原因是jni.h和TestMain.h不再一个路径，此处需要改成正确的路径，
修改TestMain.h头文件路径。将 #include <jin.h> 修改为 #include "/usr/lib/jvm/java-11-openjdk/include/jni.h"，到你的jdk安装目录去找对应的文件

修改后重新执行编译`g++ Hello.cpp -fpic -shared -o Hello.so`，依然报错，这次报错是jni_md.h找不到，这里不用想肯定是jni.h中引用了jni_md.h,然后在jni.h中路径不对，如下图所示。
![20230111165112](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230111165112.png)

~~~shell
In file included from TestMain.h:2,
                 from Hello.cpp:2:
/usr/lib/jvm/java-11-openjdk/include/jni.h:45:10: 致命错误：jni_md.h：没有那个文件或目录
   45 | #include "jni_md.h"
      |          ^~~~~~~~~~
编译中断。
~~~

其实jni_md.h,这个文件位于和jni.h同级目录的linux目录下，在jni.h中直接使用#include "jni_md.h"肯定不行，这里我尝试了在同级目录建立软连接，但是莫名其妙的报错，所以我索性直接吧linux路径下的两个文件全部拷贝到和jni.h同级目录，执行编译就ok了，编译好了以后在当前目录就生成了一个Hello.so，这就是我们需要的动态链接库。

### 2.5 执行java程序验证

~~~shell
$ java TestMain           
Hello,wolrd!
~~~

## 3、总结

有些方法对性能要求很高，或者需要直接调用系统内核等，可以使用native方法，调用c++的库来实现。
实现方法：

1. 编写java源文件并编译
2. 使用jdk自带工具生成头文件
3. 编写c++的具体实现
4. 修改头文件中路径问题
5. 编译动态链接库
6. 执行java代码
