---
title: 通过反汇编来看String的拼接
date: 2022-03-14 14:23:35
sticky: 2
categories:
  - java
  - jvm
tags:
  - 字节码
  - 反汇编
---

#### 1、先看问题，以下结果是什么？

```java
String s1 = "Hello";
String s2 = "Hello";
String s3 = "Hel" + "lo";
String s4 = "Hel" + new String("lo");
String s5 = new String("Hello");
String s6 = s5.intern();
String s7 = "H";
String s8 = "ello";
String s9 = s7 + s8;
System.out.println(s1 == s2);  
System.out.println(s1 == s3);  
System.out.println(s1 == s4);  
System.out.println(s1 == s9);  
System.out.println(s4 == s5); 
System.out.println(s1 == s6); 
```



#### 2、从字符串拼接学习字节码分析

```java
public class JvmTest {
    public void test() {
        String s4 = new String("hel") + "lo";
    }
}
```

先反汇编，到class文件所在目录打开控制台执行`javap -c 类名`

```shell
$ javap -c JvmTest
警告: 二进制文件JvmTest包含com.chen.base.jvm.JvmTest
Compiled from "JvmTest.java"
public class com.chen.base.jvm.JvmTest {
  public com.chen.base.jvm.JvmTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public void test();
    Code:
       0: new           #2                  // class java/lang/StringBuilder
       3: dup
       4: invokespecial #3                  // Method java/lang/StringBuilder."<init>":()V
       7: new           #4                  // class java/lang/String
      10: dup
      11: ldc           #5                  // String hel
      13: invokespecial #6                  // Method java/lang/String."<init>":(Ljava/lang/String;)V
      16: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      19: ldc           #8                  // String lo
      21: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      24: invokevirtual #9                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      27: astore_1
      28: return
}
```

接下来一个指令一个指令的分析，为什么`new String("hel") + "lo";`创建了两个对象。

| 行号 |     指令      |                             含义   |               
| :--: | :-----------: | :----------------------------------------------------------: |
|  13  |      new      |  堆中创建一个StringBuilder对象，并把堆中此对象地址压入栈顶   |
|  14  |      dup      |                    复制栈顶的值，压入栈顶                    |
|  15  | invokespecial |    初始化StringBuilder，对象创建都是先分配内存，再初始化     |
|  16  |      new      |      堆中创建一个String对象，并把堆中此对象地址压入栈顶      |
|  17  |      dup      |                    复制栈顶的值，压入栈顶                    |
|  18  |      ldc      |              从常量池取出字符串"hel"并压入栈顶               |
|  19  | invokespecial | `和前面一样，先分配地址，再调用String的初始化方法，把"hel"压入new的对象中，注意看19行注释，初始化时有传参(Ljava/lang/String;)，15行是"<init>":()V，无参的` |
|  20  | invokevirtual | 调用StringBuilder.append，并且也是有传参的，这一步是用之前创建并初始化过的StringBuilder空对象来和“hel”字符串先拼接 |
|  21  |      ldc      |                 把字符串“lo”从常量池压入栈顶                 |
|  22  | invokevirtual |         同上面一样，再用StringBuilder拼接“lo”字符串          |
|  23  | invokevirtual |           调用StringBuilder.toString,转化为String            |
|  24  |   astore_1    |                 把栈顶的值还原到本地变量s4中                 |
|  25  |    return     |                           方法结束                           |



小结：`new String("hel") + "lo";`该行代码在虚拟机执行时，是先创建一个StringBuilder并初始化（开始为空对象，注意空对象不是null），然后创建一个String对象并初始化（初始化后String对象内容是hel），然后调用用StringBuilder的append方法先把空对象和hel字符串拼接，然后再次调用append拼接lo.



问题：

```java
String s1 = "Hello";
String s2 = "Hello";
String s3 = "Hel" + "lo";
String s4 = "Hel" + new String("lo");
String s5 = new String("Hello");
String s6 = s5.intern();
String s7 = "H";
String s8 = "ello";
String s9 = s7 + s8;
System.out.println(s1 == s2);  
System.out.println(s1 == s3);  
System.out.println(s1 == s4);  
System.out.println(s1 == s9);  
System.out.println(s4 == s5); 
System.out.println(s1 == s6); 
```

为什么s1 == s3是true,s1 == s9 是false？

答案请[参考](http://www.ifcoding.com/archives/284.html)



算鸟还是i自己看一下字节码文件，写一个测试类

```java
public class JvmTest {
    public void test() {
        String s3 = "hel" + "lo";
    }
}
```

反汇编，发现确实没有new新对象，是因为纯字符串相加在编译期间已经被优化了```String s3 = "hel" + "lo";```优化后就是```String s3 = "hello"```

```shell
$ javap -c JvmTest
警告: 二进制文件JvmTest包含com.chen.base.jvm.JvmTest
Compiled from "JvmTest.java"
public class com.chen.base.jvm.JvmTest {
  public com.chen.base.jvm.JvmTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public void test();
    Code:
       0: ldc           #2                  // String hello
       2: astore_1
       3: return
}

```

为了验证以上说的不是信口开河，我们找到JvmTest.class文件，用十六进制编辑器打开，如下，可以清楚的看到有一个拼接好的字符窜hello



![在这里插入图片描述](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/7357c73b3cda41c0bd78dc7f0304b048.png)
