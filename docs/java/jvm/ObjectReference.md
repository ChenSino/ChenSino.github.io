---
title: 对象引用类型
date: 2023-01-31
category: 
tag: 
---

## 1、强引用

    StrongReference，java中默认的引用类型都是强引用，比如`Objectg obj = new Object()`，这个obj就是强引用。强引用的特性是只要引用存在，被引用的对象就不会被垃圾回收器回收，这个比较简单，不做测试。

## 2、软引用

SoftReference，软引用代码比较简单，直接调用其构造函数即可构造一个软引用对象。软引用的特性是只要虚拟机内存够用，则这个对象会 一直存在，不会被垃圾回收器回收，当内存不够时会触发垃圾回收，当回收后内存够用则不会回收软引用的对象，当执行了一次回收后内存依然不够才会考虑回收软引用的对象。

```java
    /**
     * 堆内存分配30m,默认情况老年代和新生代2:1,eden和survivor是8:1,因此老年代是
     * 20m,新生代10m，其中eden是8m,suvivor是1m,因此新生代总共8+1=9m,还有1m是浪* 费的
     * -XX:+PrintGCDetails -Xmx30m -Xms30m -Xmn10m
     */
    public static void main(String[] args) throws IOException {
        //建立一个5m的对象，大对象直接进入老年代
        byte[] DATA_5M = new byte[5 * 1024 * 1024];
        SoftReference<byte[]> softReference = new SoftReference<>(DATA_5M);
        DATA_5M = null;
        System.gc();
    }
```
如下日志可以看到最终老年代有26%的内存占用，差不多刚好5m,就是大对象，说明当内存足够时，软件用的对象不会被回收。
![20230131112235](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230131112235.png)

继续测试，当内存不够时，软引用对象会被回收掉
```java
   /**
     * -XX:+PrintGCDetails -Xmx30m -Xms30m -Xmn10m
     */
    public static void main(String[] args) throws IOException {
        //建立一个5m的对象，大对象直接进入老年代
        byte[] DATA_5M = new byte[5 * 1024 * 1024];
        SoftReference<byte[]> softReference = new SoftReference<>(DATA_5M);
        DATA_5M = null;
        //再创建一个大对象，让老年代内存不够容纳此对象从而触发垃圾回收
        byte[] DATA_15M = new byte[15 * 1024 * 1024];
    }
```
下图可以清晰看到，最终老年代有75%占用，差不多刚好15m,就是后来创建的大对象，说明之前那个被回收了
![20230131112554](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230131112554.png)

## 3、弱引用

WeakReference,下次垃圾回收时，弱引用的对象一定会被回收

## 4、虚引用
