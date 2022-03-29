---
title: 线程池总结
date: 2022/3/28
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
 - 线程池
 - 多线程
tags:
 - 多线程
---
线程池
<!--more-->

**前言：**

> 线程池使用submit提交任务若遇到异常，线程不会直接抛出异常，在开发中要注意处理异常情况

## 1、先上测试代码

```java
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        executorService.submit(() -> {
            System.out.println(Thread.currentThread().getName());
        });

        executorService.submit(() -> {
            int a = 3/0;
            System.out.println(Thread.currentThread().getName());
        });

        Thread.sleep(2000000);
    }
```

测试结果：

![image-20220329145737001](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329145737001.png)

测试发现异常并未抛出，如果不知道这个知识点线上遇到问题就不好排查，我因为在测试环境使用`executorService.submit`,submit方法提交后就没管了，结果在submit有异常，一直没往这里想，搞了俩小时才定位到。

## 2、 源码解析

```java
    /**
     * Submits a Runnable task for execution and returns a Future
     * representing that task. The Future's {@code get} method will
     * return {@code null} upon <em>successful</em> completion.
     *
     * @param task the task to submit
     * @return a Future representing pending completion of the task
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if the task is null
     */
    Future<?> submit(Runnable task);
```

注释中有说明，

1. `submit`方法执行成功时其返回的`Future.get()`应该是空；
2. 当传入的task为`null`会直接在主进程抛出`NPE`，异常后调用它的进程后续代码就不会执行了；

### 2.1 修改测试代码继续测试

修改代码，在后面调用`Future.get()`看看

```java
   public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        Future<?> future1 = executorService.submit(() -> {
            System.out.println(Thread.currentThread().getName() + "正常线程");
        });

        Future<?> future2 = executorService.submit(() -> {
            int a = 3 / 0;
            System.out.println(Thread.currentThread().getName() + "异常线程");
        });

//        Runnable runnable = null;
//        Future<?> future3 = executorService.submit(runnable);

        Object o = future1.get();
        System.out.println(o);

        Object o1 = future2.get();
        System.out.println(o1);


    }
```



![image-20220329151313405](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329151313405.png)

可以看到第一次执行成功的任务返回得到的是`null`，第二次抛出了异常，所以调用`submit`是要注意，此方法是带返回值的，和`execute`有区别，`execute`是没有返回值。



再看看为什么调用`java.util.concurrent.Future#get()`抛出异常，在以下源码注释写的很清楚了，当任务本身抛出异常，则调用`get`也会抛出一个`ExecutionException`

![image-20220329152103052](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329152103052.png)



如果仅仅是为了能够抛出异常，直接使用`execute`即可，那么`submit`的`Future`有什么作用呢？

> 有时我们执行多线程任务时，希望得到返回结果，而直接提交Runnable类型的任务话，是没有返回值的，java提供了另一个接口叫做Callable，它可以执行一个带返回值的任务

### 2.2 测试带返回值的多线程任务

```java
   public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
       //lambda写法，此处传入的是一个Caller匿名实现类
        String s = executorService.submit(() -> "ok hello").get();
        System.out.println(s);
    }
```

![image-20220329153946950](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329153946950.png)

可以看到调用get方法获取到了caller接口实现类中的返回值

![image-20220329153915843](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329153915843.png)



`java.util.concurrent.ExecutorService#submit(java.util.concurrent.Callable<T>)`源码

![image-20220329154106854](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329154106854.png)



## 3、线程池的总结

### 3.1 不建议使用官方工具类直接创建

`Executors`工具类实际上只是对`ThreadPoolExecutor`进行了简单的封装，所以还是有必要对`ThreadPoolExecutor`进行学习

![image-20220329155120825](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329155120825.png)

### 3.2 `java.util.concurrent.ThreadPoolExecutor`

#### 3.2.1 构造方法

![image-20220329161315724](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329161315724.png)

表面上看有4个，实际上就一个在干活，最终都调用的是下面这个，无非就是传递不同的构造参数，这里点开`java.util.concurrent.Executors#newFixedThreadPool(int)`看一下就知道了

![image-20220329161738207](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220329161738207.png)

**构造参数说明：**

corePoolSize：初始化时给该池子的线程数，无论有无任务需要执行都会启动corePoolSize个线程放在池子；

maximumPoolSize：当任务队列过多时最大能扩展的线程数；

keepAliveTime：当任务执行完了以后，空闲线程最大能空闲的时间，超过该时间则回收。比如corePoolSize为2，maximumPoolSize为4，BlockingQueue队列为2个长度，此时来了10个任务，则前2个任务交给corePoolSize 那两个线程来执行，3、4任务缓存在BlockingQueue队列中，第5个任务到来的时候，就要再起一个线程，第6个任务来了再起一个线程，此时总线程数已经达到了maximumPoolSize，有新任务来了也不能再起新的线程了（后面的7、8、9、10 任务请求再来的话就要根据设置的RejectedExecutionHandler策略来处理，此处先不考虑），当任务执行完后，新启动的两个线程也就空闲下来，这时就开始计时，空闲时间达到了keepAliveTime则把线程回收了，这是就是剩下corePoolSize个线程存活了。

缓冲队列参考：https://blog.csdn.net/ican87/article/details/80874933

workQueue：缓存的队列，有多重实现队列。实现1：ArrayBlockingQueue，有界队列，可以限制缓存队列的大小；实现二：LinkedBlockingQueue，无界队列，能无限缓存队列，理论上可以缓存一直到内存耗尽，使用该队列后则maximumPoolSize就失效了；实现三：SynchronousQueue，直接提交策略表示线程池不对任务进行缓存。新进任务直接提交给线程池，当线程池中没有空闲线程时，创建一个新的线程处理此任务。这种策略需要线程池具有无限增长的可能性。

handler：任务过多（缓存队列已满，并且已扩展到maximumPoolSize个线程，后续再来新的任务就会触发）触发拒绝策略。ThreadPoolExecutor内置了多中静态内部类，对应各种拒绝策略。

（1）AbortPolicy
拒绝策略：抛出运行时异常RejectedExecutionException。
这种策略丢弃任务，并抛出异常。（jdk默认策略）
（2）DiscardPolicy
拒绝策略：不能执行的任务将被丢弃。
这种策略什么都没做。
（3）DiscardOldestPolicy
拒绝策略：如果执行程序尚未关闭，则位于工作队列头部的任务将被删除，然后重试执行程序。

![](https://img2018.cnblogs.com/blog/940289/201903/940289-20190317160324929-400052712.png)

#### 3.2.2 几种线程池的实现

```java
//缓存池，初始化0个线程，使用SynchronousQueue队列每次来了新任务马上起一个新的线程，而不是缓存下来，最大可以起Integer.MAX_VALUE个线程（内存够用前提下）  
public static ExecutorService newCachedThreadPool() {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
    }
```



```java
//单个线程池，相当于把固定池的线程数设置成1个  public static ExecutorService newSingleThreadExecutor() {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>()));
    }
```



```java
//固定线程数的线程池，注意他的初始化线程数和最大线程数是一样，一旦任务超过线程数就开始无限缓存，等线程处理完其他任务后再从无界队列中取任务来处理  
public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>());
    }
```

#### 3.2.3 线程池中任务执行流程

![](https://img2018.cnblogs.com/blog/940289/201903/940289-20190317152802067-348051138.png)
