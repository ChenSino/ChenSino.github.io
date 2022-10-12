---
title: I/O模型
date:  2022-08-07
keys:
tag:
category:
---

## 1、参考

- [100%弄明白5种IO模型](https://zhuanlan.zhihu.com/p/115912936)  
- [NIO优化原理和Tomcat线程模型](https://segmentfault.com/a/1190000024540660)  
- [IO 模型详解](https://www.51cto.com/article/693213.html)
- [系统线程状态和jvm线程状态](https://cloud.tencent.com/developer/article/1517734)
- [系统之间通信](https://blog.csdn.net/yinwenjie/article/details/48274255)
- [top命令查看CPU状态](https://www.cnblogs.com/ggjucheng/archive/2012/01/08/2316399.html)
- [NIO详解——美团](https://tech.meituan.com/2016/11/04/nio.html)
- [Java线程和操作系统的线程之间的关系](https://www.geeksforgeeks.org/difference-between-java-threads-and-os-threads/)

## 2、模型分类

![IO模型分类](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220808093204.png)

|IO模型||
|-----------|----------|
| 阻塞I/O模型 | 同步阻塞   |
| 非阻塞I/O模型 | 同步非阻塞 |
| I/O多路复用模型 | 同步非阻塞 |
| 信号驱动I/O模型 | 同步非阻塞 |
| 异步IO（AIO）模型 | 异步非阻塞 |  

## 3、形象生活例子

- 小明去吃同仁四季的椰子鸡，就这样在那里排队，等了一小时，然后才开始吃火锅。(BIO)  
- 小红也去同仁四季的椰子鸡，她一看要等挺久的，于是去逛会商场，每次逛一下，就跑回来看看，是不是轮到她了。于是最后她既购了物，又吃上椰子鸡了。(NIO)  
- 小华一样，去吃椰子鸡，由于他是高级会员，所以店长说，你去商场随便逛会吧，等下有位置，我立马打电话给你。于是小华不用干巴巴坐着等，也不用每过一会儿就跑回来看有没有等到，最后也吃上了美味的椰子鸡(AIO)  

## 4、同步阻塞I/O（传统BIO）

本节主要参考了以下博客：

[架构设计：系统间通信（1）——概述从“聊天”开始上篇](https://blog.csdn.net/yinwenjie/article/details/48274255)  
[多线程中的上下文切换](https://cloud.tencent.com/developer/article/1752788)  
[多线程中的上下文切换性能开销](https://zhuanlan.zhihu.com/p/79772089)  
[系统线程状态和jvm线程状态](https://cloud.tencent.com/developer/article/1517734)

### 4.1 介绍

> 假设一种场景，有一个CPU只有一个核心，有个简单的java程序要上传文件，当有个线程执行时遇到了I/O操作，一直等待文件上传(此时系统线程会休眠，让出cpu使用权，而java线程依然时RUNNABLE状态，参考[系统线程状态和jvm线程状态](https://cloud.tencent.com/developer/article/1517734))，这就是典型的同步阻塞。这里同步指的是java代码卡在这无法执行后面的代码，阻塞指的是应用程序一直等待内核提供数据。

### 4.2 传统BIO存在的问题

- 同一时间，服务器只能接受来自于客户端A的请求信息；虽然客户端A和客户端B的请求是同时进行的，但客户端B发送的请求信息只能等到服务器接受完A的请求数据后，才能被接受。
- 由于服务器一次只能处理一个客户端请求，当处理完成并返回后（或者异常时），才能进行第二次请求的处理。很显然，这样的处理方式在高并发的情况下，是不能采用的。

### 4.3 使用多线程改进BIO

1. 虽然在服务器端，请求的处理交给了一个独立线程进行，但是操作系统通知accept()的方式还是单个的。也就是，实际上是服务器接收到数据报文后的“业务处理过程”可以多线程，但是数据报文的接受还是需要一个一个的来（下文的示例代码和debug过程我们可以明确看到这一点）

2. 在linux系统中，可以创建的线程是有限的。我们可以通过cat /proc/sys/kernel/threads-max 命令查看可以创建的最大线程数。当然这个值是可以更改的，但是线程越多，CPU切换所需的时间也就越长，用来处理真正业务的需求也就越少。

3. 创建一个线程是有较大的资源消耗的。JVM创建一个线程的时候，即使这个线程不做任何的工作，JVM都会分配一个堆栈空间。这个空间的大小默认为128K，您可以通过-Xss参数进行调整。

4. 当然您还可以使用ThreadPoolExecutor线程池来缓解线程的创建问题，但是又会造成BlockingQueue积压任务的持续增加，同样消耗了大量资源。

- 另外，如果您的应用程序大量使用长连接的话，线程是不会关闭的。这样系统资源的消耗更容易失控。
那么，如果你真想单纯使用线程解决阻塞的问题，那么您自己都可以算出来您一个服务器节点可以一次接受多大的并发了。看来，单纯使用线程解决这个问题不是最好的办法

### 4.4 验证上下文切换带来的CPU消耗巨大

在一个线程和多个线程分别操作相同次数的业务逻辑，比较耗时

```java

public class DemoApplication {
       public static void main(String[] args) {
              //运行多线程
              MultiThreadTester test1 = new MultiThreadTester();
              test1.Start();
              //运行单线程
              SerialTester test2 = new SerialTester();
              test2.Start();
       }
       
       
       static class MultiThreadTester extends ThreadContextSwitchTester {
              @Override
              public void Start() {
                     long start = System.currentTimeMillis();
                     MyRunnable myRunnable1 = new MyRunnable();
                     Thread[] threads = new Thread[4];
                     //创建多个线程
                     for (int i = 0; i < 4; i++) {
                           threads[i] = new Thread(myRunnable1);
                           threads[i].start();
                     }
                     for (int i = 0; i < 4; i++) {
                           try {
                                  //等待一起运行完
                                  threads[i].join();
                           } catch (InterruptedException e) {
                                  // TODO Auto-generated catch block
                                  e.printStackTrace();
                           }
                     }
                     long end = System.currentTimeMillis();
                     System.out.println("multi thread exce time: " + (end - start) + "s");
                     System.out.println("counter: " + counter);
              }
              // 创建一个实现Runnable的类
              class MyRunnable implements Runnable {
                     public void run() {
                           while (counter < 100000000) {
                                  synchronized (this) {
                                         if(counter < 100000000) {
                                                increaseCounter();
                                         }
                                  }
                           }
                     }
              }
       }
       
      //创建一个单线程
       static class SerialTester extends ThreadContextSwitchTester{
              @Override
              public void Start() {
                     long start = System.currentTimeMillis();
                     for (long i = 0; i < count; i++) {
                           increaseCounter();
                     }
                     long end = System.currentTimeMillis();
                     System.out.println("serial exec time: " + (end - start) + "s");
                     System.out.println("counter: " + counter);
              }
       }

       //父类
       static abstract class ThreadContextSwitchTester {
              public static final int count = 100000000;
              public volatile int counter = 0;
              public int getCount() {
                     return this.counter;
              }
              public void increaseCounter() {
                     
                     this.counter += 1;
              }
              public abstract void Start();
       }
}
```

执行结果：

```shell
multi thread exce time: 5149s
counter: 100000000
serial exec time: 956s
counter: 100000000
```

### 4.5 NIO

[NIO浅析](https://tech.meituan.com/2016/11/04/nio.html)

#### 4.5.1 NIO解决了什么问题

NIO是用较少的线程，可以实现以前较多线程的并发量，并且对资源的占用少了很多。
以前是一个连接一个线程，并发上来以后，线程会特别多。NIO是少量线程处理大量连接。
以前一个连接进来后，只要数据没有传输完成，这个线程就会一直停在这，不能释放。NIO是用一个线程去处理所有连接，有数据进来才会通知业务线程去处理。收到多少数据就读多少，读完就释放了，不会一直停在这，对资源的利用率更高。所以在面对高并发的时候，NIO 更省资源，换句话说，同样的资源下，NIO 可以处理更多的并发， 这也是为什么一提到NIO总是说他的并发高。
