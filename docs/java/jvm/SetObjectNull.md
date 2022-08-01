---
title: 给对象设置null的意义
date: 2022-03-14  
sticky: 2
category:
  - java
  - jvm
---
> 前言：是否需要把不用的对象设置为null？



### 1、开始写代码测试（所有测试都要加上以下指令）

jvm参数`-Xms20m -Xmx20m -Xmn10m -XX:+PrintGCDetails -XX:SurvivorRatio=8 -XX:PretenureSizeThreshold=2097152`

简单解释一下：

- `-Xms20m -Xmx20m`这两个指令限制堆内存固定为20m不允许扩容
- `-Xmn10m`代表分配给新生代的总内存为10m
- `-XX:SurvivorRatio=8`代表Eden区和Survivor的比例8:1,即新生代被分为3部分，分别8m,1m,1m
- `XX:PretenureSizeThreshold=2097152`,这个指令用的比较少，在虚拟机中，普通对象都在新生代分配内存，但是大对象是直接在老年代分配，至于多大算大对象，就是这个参数来设置的，我设置的是2m用来测试（2097152 =2 * 1024 * 1024 ），设置2m是方便我测试，保证我在下面代码设置1m的MB_1对象，内存是在新生代分配，而不是直接进入老年代
- `-XX:+PrintGCDetails`打印垃圾回收日志

#### 1.1 第一次测试，直接创建一个512kb的数组，调用回收

```java
  public static void main(String[] args) throws InterruptedException {
        byte[] KB_512 = new byte[1 * 1024 * 512];
        System.gc();
    }
```
**结果：**

```shell

GC (System.gc()) [PSYoungGen: 2229K->992K(9216K)] 2229K->1008K(19456K), 0.0027934 secs] [Times: user=0.01 sys=0.00, real=0.01 secs]
```

```shell
[GC (System.gc()) [PSYoungGen: 2229K->992K(9216K)] 2229K->1000K(19456K), 0.0014906 secs] [Times: user=0.01 sys=0.00, real=0.00 secs] 
```



> 多次运行测试，垃圾回收差不多都是2229K->992K，一定要多次运行，因为System.gc()并不是100%触发到此对象的回收

#### 1.2 第二次测试，把KB_512设置null

```java
  public static void main(String[] args) throws InterruptedException {
        byte[] KB_512 = new byte[1 * 1024 * 512];
        KB_512 = null;
        System.gc();
    }
```

**结果：**

```shell
[GC (System.gc()) [PSYoungGen: 2063K->416K(9216K)] 2063K->424K(19456K), 0.0016337 secs] [Times: user=0.00 sys=0.00, real=0.01 secs] 
```

```shell
[GC (System.gc()) [PSYoungGen: 1899K->480K(9216K)] 1899K->488K(19456K), 0.0027343 secs] [Times: user=0.01 sys=0.00, real=0.00 secs] 
```

> 测试多次，发现新生代从2063K->416K （每次测试有一点误差，差别不大），确实比不设置null回收更多



#### 1.3 第三次测试，把本地变量放到代码快

```java
   public static void main(String[] args) throws InterruptedException {
        {
            byte[] KB_512 = new byte[1 * 1024 * 512];
        }
        byte[] temp = new byte[0];
        System.gc();
    }
```

**结果：**

```shell
[GC (System.gc()) [PSYoungGen: 1899K->464K(9216K)] 1899K->472K(19456K), 0.0041090 secs] [Times: user=0.01 sys=0.00, real=0.00 secs] 
```

```shell
GC (System.gc()) [PSYoungGen: 1899K->480K(9216K)] 1899K->488K(19456K), 0.0031194 secs] [Times: user=0.01 sys=0.00, real=0.01 secs] 
```

> 测试结果和第二次大致一样

### 2、结论

经过以上三次测试的出结论如下：

1. 当有大对象`KB_512`使用完后，把其设置为null,是值得是把它在栈中的本地变量那个引用值设置为null,让其失去对堆内存中`new byte[1 * 1024 * 512]`的引用，当没有其他变量 引用到`new byte[1 * 1024 * 512];`时，这个`new byte[1 * 1024 * 512];`对象在垃圾回收触发时是有机会被回收的，注意有机会被回收，不等于这次回收一定会被回收，可能是下次gc时回收，也可能是下下次。

   另外补充一点：栈内存是不用回收的，用完自动释放，所以一般情况下我们不用特意去把用完的对象设置为null。那这种适合在什么时候用呢？比如在方法中我们有一个大对象，这个大对象占用内大内存，在大对象用完后，其后面还有很多耗时的业务代码，正常情况下这个大对象回收要等到耗时的业务代码执行完后才会释放内存，如果想提前释放，可以考虑把他的引用设置为`null`。

   ```java
    public static void main(String[] args) throws InterruptedException {
           Object bigObject = new Object();
        	//模拟使用bigObject
        	use(bigObject);
        	//用完大对象设置null,让其在此函数执行完之前就有机会被回收
        	bigObject = null;
        
           //模拟一些耗时代码
           xxxxxx
       }
   ```

2. 栈帧中的局部变量表中的槽位是可以重用的，如果一个局部变量过了其作用域，那么在其作用域之后申明的新的局部变量就很有可能会复用过期局部变量的槽位，从而达到节省资源的目的。

   在第三次测试中我们用代码块包围了`KB_512`，来限制其作用于，我们发现也能达到在main方法执行前就释放内存的目的。原因就是`KB_512`这个变量的作用于限制在代码块，代码快执行完后，就用不上它了，那么它在栈帧中的局部变量那个地址是可被别的局部变量复用，即`temp`复用了。当temp把引用指向`new byte[0];`时，原来的`new byte[1 * 1024 * 512];`就没有变量去引用它了，所以它可以被回收。

### 3、参考

[jvm内存结构](https://pdai.tech/md/java/jvm/java-jvm-struct.html)
