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

**corePoolSize**：初始化时给该池子的线程数，当任务来了以后先初始化corePoolSize个线程放在池子（`new ThreadPoolExecutor`的时候还没有创建，是提交任务后才会初始化）；

**maximumPoolSize**：当任务队列过多时最大能扩展的线程数；

**keepAliveTime**：当任务执行完了以后，空闲线程最大能空闲的时间，超过该时间则回收。比如corePoolSize为2，maximumPoolSize为4，BlockingQueue队列为2个长度，此时来了10个任务，则前2个任务交给corePoolSize 那两个线程来执行，3、4任务缓存在BlockingQueue队列中，第5个任务到来的时候，就要再起一个线程，第6个任务来了再起一个线程，此时总线程数已经达到了maximumPoolSize，有新任务来了也不能再起新的线程了（后面的7、8、9、10 任务请求再来的话就要根据设置的RejectedExecutionHandler策略来处理，此处先不考虑），当任务执行完后，新启动的两个线程也就空闲下来，这时就开始计时，空闲时间达到了keepAliveTime则把线程回收了，这是就是剩下corePoolSize个线程存活了。

缓冲队列参考：https://blog.csdn.net/ican87/article/details/80874933

workQueue：缓存的队列，有多重实现队列。实现1：ArrayBlockingQueue，有界队列，可以限制缓存队列的大小；实现二：LinkedBlockingQueue，无界队列，能最多缓存`Integer.MAX_VALUE`个（当然也可以在构造函数中指定固定数量的缓存队列），理论上可以缓存一直到内存耗尽，使用该队列后则maximumPoolSize就失效了；实现三：SynchronousQueue，直接提交策略表示线程池不对任务进行缓存。新进任务直接提交给线程池，当线程池中没有空闲线程时，创建一个新的线程处理此任务。这种策略需要线程池具有无限增长的可能性。

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

#### 3.2.2 实验验证`ThreadPoolExecutor`各个参数的作用

##### 3.2.2.1 第一次测试

自定义线程工厂，线程名随便起，我这里直接用时间戳

```java
public class MyThreadFactory implements ThreadFactory {
    @Override
    public Thread newThread(Runnable r) {
        Thread t = new Thread(null, r, "xxxx" + System.nanoTime());
        return t;
    }
}

```

第一次测试参数：



| 参数            | 参数值                               |
| --------------- | ------------------------------------ |
| corePoolSize    | 1                                    |
| maximumPoolSize | 4                                    |
| keepAliveTime   | 100秒                                |
| workQueue       | new LinkedBlockingQueue<>(1)         |
| threadFactory   | 自定义工厂MyThreadFactory            |
| handler         | new ThreadPoolExecutor.AbortPolicy() |



```java
 public static void main(String[] args) throws InterruptedException {
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1, 4, 100L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(1), new MyThreadFactory(), new ThreadPoolExecutor.AbortPolicy());
     //为了方便描述把此任务叫做A任务，以下分别为B\C\D
        threadPoolExecutor.execute(() -> {
            System.out.println(Thread.currentThread().getName()+ "=============AAAAAAAAAAAAaa");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        threadPoolExecutor.execute(() -> {
                System.out.println(Thread.currentThread().getName() + "===========BBBBBBBBBB");
            try {
                Thread.sleep(1010);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadPoolExecutor.execute(() -> {
                System.out.println(Thread.currentThread().getName() + "===========CCCCCCCC");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadPoolExecutor.execute(() -> {
            System.out.println(Thread.currentThread().getName() + "=========DDDDD");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

    }
```

测试结果
```shell
xxxxxxx30832344860303=============AAAAAAAAAAAAaa
xxxxxxx30832345605562===========CCCCCCCC
xxxxxxx30832345942575=========DDDDD
xxxxxxx30832344860303===========BBBBBBBBBB
```

可以看到一共启动了3个线程，线程执行过程分析：

1. 提交A任务，先初始化`corePoolSize`个线程，并且分配一个线程执行A
2. 此时再提交B任务，因为`corePoolSize`只有一个，所以需要给他缓存到队列，`LinkedBlockingQueue`设置的1,刚好可以缓存一个任务，B被缓存，先不执行
3. 再提交C,此时发现`corePoolSize`初始化的线程用完了，`LinkedBlockingQueue`也用完了，而`maximumPoolSize`为4,还可以启动3个线程，所以在给C分配一个线程，运行任务
4. 再提交D,和第三步一样，在启动一个线程，此时就已经达到`maximumPoolSize`个线程
5. 空闲时间设置的100秒，意思是除了`corePoolSize`初始化的那个线程之外的另3个线程，在执行完自己的任务后，可以再等100秒，如果100秒内没有新的任务申请使用线程，那么就会被回收

>根据以上分析可以测试结果完全合理，运行过程为A-C-D-B，当B因为被放进了缓存队列，只有当其他线程执行完以后，有空闲的线程B才会有机会运行，所以它在最后执行，

**注意：**

*以上我们上有4个任务，但是最终启动的线程只有3个，因为有一个被放进缓存队列*

##### 3.2.2.2 第二次测试

在第一次测试基础上在加2个任务，测试拒绝策略，为什么加一个不行？自行思考一下

```
    public static void main(String[] args) throws InterruptedException {
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1, 4, 100L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(1), new MyThreadFactory(), new ThreadPoolExecutor.AbortPolicy());
        threadPoolExecutor.execute(() -> {
            System.out.println(Thread.currentThread().getName()+ "=============AAAAAAAAAAAAaa");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        threadPoolExecutor.execute(() -> {
                System.out.println(Thread.currentThread().getName() + "===========BBBBBBBBBB");
            try {
                Thread.sleep(1010);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadPoolExecutor.execute(() -> {
                System.out.println(Thread.currentThread().getName() + "===========CCCCCCCC");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadPoolExecutor.execute(() -> {
            System.out.println(Thread.currentThread().getName() + "=========DDDDD");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadPoolExecutor.execute(() -> {
            System.out.println(Thread.currentThread().getName() + "=========EEEEEE");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        threadPoolExecutor.execute(() -> {
            System.out.println(Thread.currentThread().getName() + "=========ffff");
            try {
                Thread.sleep(1001);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
```

测试结果：

```shell
xxxxxxx31891613408362=============AAAAAAAAAAAAaa
xxxxxxx31891614159432===========CCCCCCCC
xxxxxxx31891614545186=========DDDDD
xxxxxxx31891614917120=========EEEEEE
Exception in thread "main" java.util.concurrent.RejectedExecutionException: Task com.chen.base.thread.ThreadFactoryClient$$Lambda$6/1828972342@568db2f2 rejected from java.util.concurrent.ThreadPoolExecutor@378bf509[Running, pool size = 4, active threads = 4, queued tasks = 1, completed tasks = 0]
	at java.util.concurrent.ThreadPoolExecutor$AbortPolicy.rejectedExecution(ThreadPoolExecutor.java:2063)
	at java.util.concurrent.ThreadPoolExecutor.reject(ThreadPoolExecutor.java:830)
	at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1379)
	at com.chen.base.thread.ThreadFactoryClient.main(ThreadFactoryClient.java:56)
xxxxxxx31891613408362===========BBBBBBBBBB

```

可以看到触发了设置的拒绝策略，任务超出时直接抛出异常

#### 3.2.3 几种线程池的实现

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

### 3.3 线程池中的异常处理

线程池中提交任务的两种方法：`submit`、`execute`，submit方法的参数可以是`Runnable`、`Caller`，execute的参数类型只有`Runnable`，submit提交的方法可以获取返回值，要想获取返回值需要传递Caller类型

```java
//java.util.concurrent.ThreadPoolExecutor#execute
public void execute(Runnable command) {
        if (command == null)
            throw new NullPointerException();
        /*
         * Proceed in 3 steps:
         *
         * 1. If fewer than corePoolSize threads are running, try to
         * start a new thread with the given command as its first
         * task.  The call to addWorker atomically checks runState and
         * workerCount, and so prevents false alarms that would add
         * threads when it shouldn't, by returning false.
         *
         * 2. If a task can be successfully queued, then we still need
         * to double-check whether we should have added a thread
         * (because existing ones died since last checking) or that
         * the pool shut down since entry into this method. So we
         * recheck state and if necessary roll back the enqueuing if
         * stopped, or start a new thread if there are none.
         *
         * 3. If we cannot queue task, then we try to add a new
         * thread.  If it fails, we know we are shut down or saturated
         * and so reject the task.
         */
        int c = ctl.get();
        if (workerCountOf(c) < corePoolSize) {
            if (addWorker(command, true))
                return;
            c = ctl.get();
        }
        if (isRunning(c) && workQueue.offer(command)) {
            int recheck = ctl.get();
            if (! isRunning(recheck) && remove(command))
                reject(command);
            else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
        }
        else if (!addWorker(command, false))
            reject(command);
    }
```

```java

//继承自AbstractExecutorService
//java.util.concurrent.AbstractExecutorService#submit(java.util.concurrent.Callable<T>)
    public <T> Future<T> submit(Callable<T> task) {
        if (task == null) throw new NullPointerException();
        RunnableFuture<T> ftask = newTaskFor(task);
        execute(ftask);
        return ftask;
    }

```



```java
//继承自AbstractExecutorService
//java.util.concurrent.AbstractExecutorService#submit(java.lang.Runnable)
    public Future<?> submit(Runnable task) {
        if (task == null) throw new NullPointerException();
        RunnableFuture<Void> ftask = newTaskFor(task, null);
        execute(ftask);
        return ftask;
    }
```

#### 3.2.1 使用execute时的异常处理

使用execute提交有异常会正常的抛出，当然也可以自定义异常处理器

```java
public class MyThreadFactory implements ThreadFactory {
    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(null, r, "xxxxxxx" + System.nanoTime());
        thread.setUncaughtExceptionHandler((t, e) -> {
            System.out.println("enter into uncaughtException");
            System.out.println("异常信息:"+ e.getMessage());
        });
        return thread;
    }
}

```



```java
    public static void main(String[] args) {
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1, 11, 100L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(2), new MyThreadFactory());
        try {
            threadPoolExecutor.execute(() -> {
                System.out.println("enter into submit");
                throw new RuntimeException("我是一个异常信息。。。");
            });
        } catch (Exception e) {
            System.out.println("eee");
            System.out.println(e);
        }
    }
```

#### 3.2.2 使用submit时的异常处理

submit会返回一个future,需要主动调用这个future才会触发异常，如果正常执行传递的runnable类型从那还素，则返回null,如果是caller类型参数，会返回相应的值

```java
public class MyThreadFactory implements ThreadFactory {
    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(null, r, "xxxxxxx" + System.nanoTime());
        thread.setUncaughtExceptionHandler((t, e) -> {
            System.out.println("enter into uncaughtException");
            System.out.println("异常信息:"+ e.getMessage());
        });
        return thread;
    }
}

```



```java

 public static void main(String[] args) {
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1, 11, 100L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(2), new MyThreadFactory());
        try {
          Future future= threadPoolExecutor.submit(() -> {
                System.out.println("enter into submit");
                throw new RuntimeException("我是一个异常信息。。。");
            });
            future.get();
        } catch (Exception e) {
            System.out.println("eee");
            System.out.println(e);
        }
    }
```

