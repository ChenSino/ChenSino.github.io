---
title: 对象创建过程
date: 2022-03-22
author: chenkun
publish: true
keys:
category:
---


### 1、在类中本地变量引用自身类，会引发的问题

```java
public class BaseFormBean {
    private BaseFormBean baseBean = new BaseFormBean();
    {
         String bar = "非静态代码块中字段";
    }

    public BaseFormBean() {
        String foo = "构造方法中的字段";
        System.out.println("构造方法被调用.");
    }

    public static void main(String[] args)  {
        new BaseFormBean();
    }
}
```



此问题用于研究对象初始化的过程，以上程序运行结果如下：

```shell
Exception in thread "main" java.lang.StackOverflowError
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:4)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:4)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:4)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:4)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:4)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:4)
```

代码抛出的是栈溢出，和我第一想法不太一样，一般想的是程序会不停的new 自身对象，最终会导致OOM堆溢出，认为是这样说明对对象初始化原理掌握的还不够。要想搞明白此问题，需要反汇编查看jvm的指令到底是按照什么顺序执行的，采用```javap -c BaseFormBean```反汇编，结果如下：

```shell
# javap -c BaseFormBean.class
Compiled from "BaseFormBean.java"
public class com.chen.bean.BaseFormBean {
  public com.chen.bean.BaseFormBean();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: aload_0
       5: new           #2                  // class com/chen/bean/BaseFormBean
       8: dup
       9: invokespecial #3                  // Method "<init>":()V
      12: putfield      #4                  // Field baseBean:Lcom/chen/bean/BaseFormBean;
      15: ldc           #5                  // String 非静态代码块中字段
      17: astore_1
      18: ldc           #6                  // String 构造方法中的字段
      20: astore_1
      21: getstatic     #7                  // Field java/lang/System.out:Ljava/io/PrintStream;
      24: ldc           #8                  // String 构造方法被调用.
      26: invokevirtual #9                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      29: return

  public static void main(java.lang.String[]);
    Code:
       0: new           #2                  // class com/chen/bean/BaseFormBean
       3: dup
       4: invokespecial #3                  // Method "<init>":()V
       7: pop
       8: return
}
```

构造方法的汇编代码解析（需要对照JVM指令集手册查看指令代表的含义）

>      1. aload_0：将第一个引用类型本地变量推送至栈顶，此处指的其实是this，就是当前对象自身的地址
>      2. invokespecial ：调用构造方法，此处调用的是父类Object构造方法
>      3. new：创建一个自身对象, 并将其引用引用值压入栈顶
>      4. dup： 复制栈顶数值并将复制值压入栈顶
>      5. invokespecial这一指令后边注释Method "<init>":()V，此方法是真正的给对象进行赋值，在此之前只是给对象初始化一个空间，里面都是空值，此方法初始化对象，因此需要给baseBean字段进行赋值，赋值时会创建一个新的BaseFormBean对象，就要调用new BaseFormBean()，调用此方法后就会进入一个死循环，不停调用自身的构造方法，因此会抛出栈溢出。后续指令不会执行……，因此误会打印东西出来
>      6. putfield：如果上一步不抛出异常，正常的话是要执行putfield指令，把上一步创建的对象赋值给baseBean，

**注意：**

上面的非静态代码块也不会执行，原因是其放的位置是在```private BaseFormBean baseBean = new BaseFormBean();```后面，如果把它放到前面，它依然会执行的。

```java

public class BaseFormBean {

    {
        System.out.println("执行非静态代码块");
        String bar = "非静态代码块中字段";
    }
    private BaseFormBean baseBean = new BaseFormBean();

    public BaseFormBean() {
        String foo = "构造方法中的字段";
        System.out.println("构造方法被调用.");
    }

    public static void main(String[] args)  {
        new BaseFormBean();
    }
}
```

执行结果：

```shell
执行非静态代码块
执行非静态代码块
执行非静态代码块
执行非静态代码块
执行非静态代码块
Exception in thread "main" java.lang.StackOverflowError
	at sun.nio.cs.UTF_8$Encoder.encodeLoop(UTF_8.java:691)
	at java.nio.charset.CharsetEncoder.encode(CharsetEncoder.java:579)
	at sun.nio.cs.StreamEncoder.implWrite(StreamEncoder.java:271)
	at sun.nio.cs.StreamEncoder.write(StreamEncoder.java:125)
	at java.io.OutputStreamWriter.write(OutputStreamWriter.java:207)
	at java.io.BufferedWriter.flushBuffer(BufferedWriter.java:129)
	at java.io.PrintStream.write(PrintStream.java:526)
	at java.io.PrintStream.print(PrintStream.java:669)
	at java.io.PrintStream.println(PrintStream.java:806)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:6)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:9)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:9)
	at com.chen.bean.BaseFormBean.<init>(BaseFormBean.java:9)
```

