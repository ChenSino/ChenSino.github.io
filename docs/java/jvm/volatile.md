---
title: volatile关键字
date: 2023-02-01
category: 
tag: 
---

## 1、双重检查的单例模式是否真的线程安全？

~~~java
public class Single{
    public static Single single;

    private Single(){

    }

    public static Single getSingle{
        if(single == null){
            synchronized(Single.class){
                if(single == null){
                    single = new Single();
                }
            }
        }
        return single;
    }
}
~~~

## 2、问题剖析

在java中使用new关键字创建对象时，虚拟机会执行以下操作（并不完整，比如若new指令执行发现类还未加载，会触发类加载）：

1. 在堆上给对象分配内存
2. 为内存空间初始化零值
3. 调用&lt;init>方法初始化
4. 把对象引用返回给变量single，single不再是null

而实际情况，是为了提升执行效率，cpu指令会重排序，变成了：

1. 在堆上给对象分配内存
2. 把对象引用返回给变量single，single不再是null
3. 为内存空间初始化零值
4. 调用&lt;init>方法初始化

假设场景如下：
有两个线程A、B，同时调用getSingle,A先抢到cpu执行权，执行了new指令，此时分配了内存，并且把内存地址返回给了single变量，还没来得及初始化，而此时B也进入getSingle方法，判断第一个if条件，得到的single不是null,就直接返回了single,这就会有问题，因为这个single所指向的地址是一个还未初始化的，有可能甚至连零值都还没来得及填充，这里就出现了bug，这就是以上双重检查存在的问题。

> 提到volatile总会说道主内存和工作内存，如何理解主内存和工作内存？
> 主内存就是物理内存（不仅仅是堆或栈），工作内存就是cpu实际处理指令时工作的地方，也就是cpu缓存

以上问题的根本原因，就是一个线程看到了另一个线程未正确初始化的对象。解决这个问题就要用到volatile关键字，此关键字特性：

1. 有序性
2. 可见性

有序性，synchronized保证代码有序，而使用volatile修饰的变量会禁止指令重排，保证的是指令有序，禁止single变量提前获取到对象引用；
可见性，不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。

### 2.1 另一个例子

1.volatile关键字的两层语义

　　一旦一个共享变量（类的成员变量、类的静态成员变量）被volatile修饰之后，那么就具备了两层语义：

　　1）保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。

　　2）禁止进行指令重排序。

　　先看一段代码，假如线程1先执行，线程2后执行：

~~~java
//线程1
boolean stop = false;
while(!stop){
    doSomething();
}
//线程2
stop = true;
~~~

 　　这段代码是很典型的一段代码，很多人在中断线程时可能都会采用这种标记办法。但是事实上，这段代码会完全运行正确么？即一定会将线程中断么？不一定，也许在大多数时候，这个代码能够把线程中断，但是也有可能会导致无法中断线程（虽然这个可能性很小，但是只要一旦发生这种情况就会造成死循环了）。

　　下面解释一下这段代码为何有可能导致无法中断线程。在前面已经解释过，每个线程在运行过程中都有自己的工作内存，那么线程1在运行的时候，会将stop变量的值拷贝一份放在自己的工作内存当中。

　　那么当线程2更改了stop变量的值之后，但是还没来得及写入主存当中，线程2转去做其他事情了，那么线程1由于不知道线程2对stop变量的更改，因此还会一直循环下去。

　　但是用volatile修饰之后就变得不一样了：

　　第一：使用volatile关键字会强制将修改的值立即写入主存；

　　第二：使用volatile关键字的话，当线程2进行修改时，会导致线程1的工作内存中缓存变量stop的缓存行无效（反映到硬件层的话，就是CPU的L1或者L2缓存中对应的缓存行无效）；

　　第三：由于线程1的工作内存中缓存变量stop的缓存行无效，所以线程1再次读取变量stop的值时会去主存读取。

　　那么在线程2修改stop值时（当然这里包括2个操作，修改线程2工作内存中的值，然后将修改后的值写入内存），会使得线程1的工作内存中缓存变量stop的缓存行无效，然后线程1读取时，发现自己的缓存行无效，它会等待缓存行对应的主存地址被更新之后，然后去对应的主存读取最新的值。

　　那么线程1读取到的就是最新的正确的值。

## 3、正确的双重检查单例模式写法

~~~java
public class Single{
    public volatile static Single single;

    private Single(){

    }

    public static Single getSingle{
        if(single == null){
            synchronized(Single.class){
                if(single == null){
                    single = new Single();
                }
            }
        }
        return single;
    }
}
~~~

## 4、参考

[Java并发编程之volatile关键字](https://www.cnblogs.com/dolphin0520/p/3920373.html)
