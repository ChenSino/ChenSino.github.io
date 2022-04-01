---
title: 打破双亲委派模式
date: 2022/3/30
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---
为什么说spi打破了双亲委派机制？
<!--more-->
# 1、什么是双亲委派？

![image-20220330170731913](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220330170731913.png)

*注：此处直接摘抄周志明老师的《深入理解java虚拟机》*

>​		站在Java虚拟机的角度来看,只存在两种不同的类加载器:一种是启动类加载器(Bootstrap
>ClassLoader),这个类加载器使用C++语言实现[1] ,是虚拟机自身的一部分;另外一种就是其他所有
>的类加载器,这些类加载器都由Java语言实现,独立存在于虚拟机外部,并且全都继承自抽象类
>java.lang.ClassLoader。
>​		站在Java开发人员的角度来看,类加载器就应当划分得更细致一些。自JDK 1.2以来,Java一直保
>持着三层类加载器、双亲委派的类加载架构,尽管这套架构在Java模块化系统出现后有了一些调整变
>动,但依然未改变其主体结构,我们将在7.5节中专门讨论模块化系统下的类加载器。
>本节内容将针对JDK 8及之前版本的Java来介绍什么是三层类加载器,以及什么是双亲委派模型。
>对于这个时期的Java应用,绝大多数Java程序都会使用到以下3个系统提供的类加载器来进行加载。
>·启动类加载器(Bootstrap Class Loader):前面已经介绍过,这个类加载器负责加载存放在
><JAVA_HOM E>\lib目录,或者被-Xbootclasspath参数所指定的路径中存放的,而且是Java虚拟机能够
>识别的(按照文件名识别,如rt.jar、tools.jar,名字不符合的类库即使放在lib目录中也不会被加载)类
>库加载到虚拟机的内存中。启动类加载器无法被Java程序直接引用,用户在编写自定义类加载器时,
>如果需要把加载请求委派给引导类加载器去处理,那直接使用null代替即可,代码清单7-9展示的就是
>java.lang.ClassLoader.getClassLoader()方法的代码片段,其中的注释和代码实现都明确地说明了以null值
>来代表引导类加载器的约定规则。
>
>·		扩展类加载器(Extension Class Loader):这个类加载器是在类sun.misc.Launcher$ExtClassLoader
>中以Java代码的形式实现的。它负责加载<JAVA_HOM E>\lib\ext目录中,或者被java.ext.dirs系统变量所
>指定的路径中所有的类库。根据“扩展类加载器”这个名称,就可以推断出这是一种Java系统类库的扩
>展机制,JDK的开发团队允许用户将具有通用性的类库放置在ext目录里以扩展Java SE的功能,在JDK
>9之后,这种扩展机制被模块化带来的天然的扩展能力所取代。由于扩展类加载器是由Java代码实现
>的,开发者可以直接在程序中使用扩展类加载器来加载Class文件。
>·应用程序类加载器(Application Class Loader):这个类加载器由
>sun.misc.Launcher$AppClassLoader来实现。由于应用程序类加载器是ClassLoader类中的getSystem-
>ClassLoader()方法的返回值,所以有些场合中也称它为“系统类加载器”。它负责加载用户类路径
>(ClassPath)上所有的类库,开发者同样可以直接在代码中使用这个类加载器。如果应用程序中没有
>自定义过自己的类加载器,一般情况下这个就是程序中默认的类加载器。
>
>​		JDK 9之前的Java应用都是由这三种类加载器互相配合来完成加载的,如果用户认为有必要,还可
>以加入自定义的类加载器来进行拓展,典型的如增加除了磁盘位置之外的Class文件来源,或者通过类
>加载器实现类的隔离、重载等功能。这些类加载器之间的协作关系“通常”会如图7-2所示。
>图7-2中展示的各种类加载器之间的层次关系被称为类加载器的“双亲委派模型(Parents Delegation
>M odel)”。双亲委派模型要求除了顶层的启动类加载器外,其余的类加载器都应有自己的父类加载
>器。不过这里类加载器之间的父子关系一般不是以继承(Inheritance)的关系来实现的,而是通常使用
>组合(Composition)关系来复用父加载器的代码。
>读者可能注意到前面描述这种类加载器协作关系时,笔者专门用双引号强调这是“通常”的协作关
>系。类加载器的双亲委派模型在JDK 1.2时期被引入,并被广泛应用于此后几乎所有的Java程序中,但
>它并不是一个具有强制性约束力的模型,而是Java设计者们推荐给开发者的一种类加载器实现的最佳
>实践。
>​		双亲委派模型的工作过程是:如果一个类加载器收到了类加载的请求,它首先不会自己去尝试加
>载这个类,而是把这个请求委派给父类加载器去完成,每一个层次的类加载器都是如此,因此所有的
>加载请求最终都应该传送到最顶层的启动类加载器中,只有当父加载器反馈自己无法完成这个加载请
>求(它的搜索范围中没有找到所需的类)时,子加载器才会尝试自己去完成加载。
>使用双亲委派模型来组织类加载器之间的关系,一个显而易见的好处就是Java中的类随着它的类
>加载器一起具备了一种带有优先级的层次关系。例如类java.lang.Object,它存放在rt.jar之中,无论哪一
>个类加载器要加载这个类,最终都是委派给处于模型最顶端的启动类加载器进行加载,因此Object类
>在程序的各种类加载器环境中都能够保证是同一个类。反之,如果没有使用双亲委派模型,都由各个
>类加载器自行去加载的话,如果用户自己也编写了一个名为java.lang.Object的类,并放在程序的
>ClassPath中,那系统中就会出现多个不同的Object类,Java类型体系中最基础的行为也就无从保证,应
>用程序将会变得一片混乱。如果读者有兴趣的话,可以尝试去写一个与rt.jar类库中已有类重名的Java
>类,将会发现它可以正常编译,但永远无法被加载运行[2]。
>​		双亲委派模型对于保证Java程序的稳定运作极为重要,但它的实现却异常简单,用以实现双亲委
>派的代码只有短短十余行,全部集中在java.lang.ClassLoader的loadClass()方法之中。



# 2、什么是SPI

## 2.1 定义

SPI（Service provide interface），直译过来是服务提供接口，在这里指的是厂商负责定义一个接口但不负责提供实现类，定义完接口后厂商直接使用这个接口的方法，但是如果不给此接口提供实现肯定运行要报错的，所以谁要想用厂商这个接口，谁负责实现。最典型的是jdbc,java可以连接各种数据库，比如mysql、oracle、h2……若是让各个数据库厂商都去实现自己的数据库连接方式，那么非常不利于统一管理，所以sun公司为了避免这种各自为战的乱象，他们就规定了一个规范，这就是jdbc了，在`java.sql`包下，sun指定一个接口叫做`Driver`,各大厂商负责实现这个Driver就可以了，只要你实现按要求这个接口的方法，那么你就可以直接连接到你的数据库。此处不得不说一句“一流的公司卖标准，二流公司卖实物，三流公司卖服务”

## 2.2 使用场景

1. jdbc4(jdbc4是随着jdk1.6发布的,此版本才开始支持SPI)
2. springboot的自动话配置也是同样的原理
3. 阿里的dubbo
4. 其他

## 2.3 自己写一个SPI模拟jdbc的spi

### 2.3.1 定义规范（sun公司定义的jdbc规范在java.sql包）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>JdbcSPI</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

</project>
```



```java
//定义驱动规范，各数据库厂商自行实现
public interface Driver {
    String getDriver();
}
```

```java
public class DriverManager {
    //使用厂商是实现的驱动连接他的数据库
    public void connect(){
        ServiceLoader<Driver> load = ServiceLoader.load(Driver.class);
        Iterator<Driver> iterator = load.iterator();
        while (iterator.hasNext()) {
            Driver next = iterator.next();
            String driver = next.getDriver();
            //假装业务处理
            System.out.println("我拿到了用户实现的driver,可以进行连接数据库了，用户用的driver是：" + driver);
        }
    }
}

```

### 2.3.2 厂商实现

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>MysqlDriver</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.example</groupId>
            <artifactId>JdbcSPI</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
</project>
```



```java
public class MysqlDriver implements Driver {
    @Override
    public String getDriver() {
        return "MysqlDriver";
    }
}

```

按照SPI规范配置好具体实现类

![image-20220331151619068](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220331151619068.png)

```java
public class Client {
    //客户端使用
    public static void main(String[] args) {
        new DriverManager().connect();
    }
}

```

输出：

![image-20220331151531624](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220331151531624.png)

# 3、为什么SPI打破了双亲委派
## 3.1 ContextClassLoader
Thread context class loader存在的目的主要是为了解决parent delegation机制下无法干净的解决的问题。假如有下述委派链：



```mermaid
graph LR;
A[Custom ClassLoader]-->B[Application classloader]-->C[Extension classloader]--> d[Bootstrap class loader]
```


那么委派链左边的ClassLoader就可以很自然的使用右边的ClassLoader所加载的类。

但如果情况要反过来，是右边的ClassLoader所加载的代码需要反过来去找委派链靠左边的ClassLoader去加载东西怎么办呢？没辙，parent delegation是单向的，没办法反过来从右边找左边.

就是说当我们this.getClass().getClassLoader();可以获取到所有已经加载过的文件,
但是Application class loader -> Extension class loader -> Bootstrap class loader 就获取不到Custom ClassLoader 能加载到的信息,那么怎么办呢? 于是,Thread就把当前的类加载器,给保存下来了,其他加载器,需要的时候,就把当前线程的加载器,获取到.

## 4、从源码来分析jdbc的SPI

### 4.1 jdbc介绍

> jdbc是java标准的一部分,并不是一开始就支持SPI的,是从JDBC4开始支持,Jdbc4是随着jdk1.6发布的,目前最新的也就是jdbc4.3,随着jdk9发布的, jdbc规范从4.0开始支持SPI,如果要使用spi连接mysql的数据库,那么需要mysql驱动版本至少为5.1.6,之前版本是适配jdbc4.0之前的规范的.
>
> 打开

[jdbc版本](https://blog.csdn.net/teamlet/article/details/52389665)

[jdbc版本特性](https://blog.csdn.net/u011179993/article/details/47291827)

[jdbc版本主要特性](https://www.herongyang.com/JDBC/Overview-JDBC-Version.html)

5.1.6版本的mysql驱动,可以看到有一个META-INF/services/java.sql.Driver  就是SPI规范要求的文件

![image-20220401100944285](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401100944285.png)

5.1.5版本打开看看,就没有了META-INF/services/java.sql.Driver

![image-20220401101107751](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401101107751.png)

jdbc4.0规范说了，可以自动加载驱动，就是因为用了这个SPI，当然你的驱动必须是>=5.1.6版本

![image-20220401101430752](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401101430752.png)

### 4.2 jdbc一定打破双亲委派吗?

在[4.1小节](#4.1 jdbc介绍)介绍了很多jdbc的东西,这些东西在我们实际开发中其实并没人关注,说了这么多主要是为了搞清楚jdbc打破双亲委派机制问题.

我在看了很多博客包括周志明老师的《深入理解java虚拟机》都说了jdbc就打破双亲委派，其实这种说法不严谨，我在测试时用的mysql驱动时`5.1.5`版本，此版本还没支持SPI，只能用Class.forname("com.msyql.java.Driver")来加载驱动，使用这种方式其实并没有打破双亲委派。

现在很多新手刚使用jdbc时，随笔一搜《jdbc连接过程xxx》基本上出来的结果第一步都是让你`Class.forName("com.mysql.jdbc.Driver")`，其时压根不用写这一行，直接`DriverManager.getConnection("jdbc:mysqlxxxx")`就可以了（前提是你的jdk1.6+，mysql驱动5.1.6+，现在很少有jdk1.6以下的了吧）

```java
public static void main(String[] args) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
//            Connection connection = DriverManager.getConnection("jdbc:mysql://10.10.102.105:3306/abc123", "root", "sonoscape");
//            Statement statement = connection.createStatement();
//            ResultSet resultSet = statement.executeQuery("select * from users");
//            while (resultSet.next()) {
//                String string = resultSet.getString(7);
//                System.out.println(string);
//            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

真正的打破双亲委派是在jdbc4.0+，并且mysql驱动在5.1.6+才会使用SPI打破双亲委派

关于` Class.forName("com.mysql.jdbc.Driver");`这里调试类加载过程不再分析，调试中使用`-verbose:class`可以看到类加载过程，`Class.forName("com.mysql.jdbc.Driver");`执行完后，`com.mysql.jdbc.Driver`类就会被加载。

![image-20220401103855153](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401103855153.png)

### 4.3 调试jdbc4.0+、mysql5.1.6+版本的spi打破双亲委派

测试环境：

linux 、jdk8（jdbc4.2）、mysql驱动：5.1.6

```java
    public static void main(String[] args) throws SQLException {
        //测试代码就这一行，jvm参数：-verbose:class 
        Connection connection = DriverManager.getConnection("jdbc:mysql:///abc123", "root", "123");
    }
```



1. 记得打上断点开启debug之路，第一次进入断点输出的类加载信息如下，可以看到我们的Client类被加载了，看完了日志后清理，防止太多看起来烟花缭乱

![image-20220401112702397](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401112702397.png)

2. 接下来肯用到`DriverManager`，肯定要触发加载，在日志中可以看到

![image-20220401112907223](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401112907223.png)

3. 提前到`java.sql.DriverManager#loadInitialDrivers`打好断点，586行看到了熟悉的`ServiceLoader`，这就是SPI的核心，它要触发Driver.class的加载了。

   ==注意：此时我们还在`DriverManager`中这个类在jdk的核心包中lib下，也就是rt.jar中，[在第一节就说了](#1、什么是双亲委派？)，此包中的类是由启动类加载器BootStrapClassLoader负责的，这是由C++写的，java中看不到，这个类加载器就要委托其子孙加载器来加载`Driver`==，先到`java.util.ServiceLoader#load(java.lang.Class<S>)`提前打好断点继续调试，来证明

![image-20220401113115859](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401113115859.png)

![image-20220401113617886](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401113617886.png)

![image-20220401113707945](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401113707945.png)

4. 先加载了`java.sql.Driver`，这个肯定也是启动类加载器加载的，然后注意看`ClassLoader cl = Thread.currentThread().getContextClassLoader();`这里获取线程上下文加载器，默认就是AppClassLoader，然后用获取到的类加载器来加载Driver==>`ServiceLoader.load(service, cl);`

   ![image-20220401114332820](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401114332820.png)

5. 跟踪进入另一个load方法

![image-20220401114631784](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401114631784.png)

6. 继续跟踪，`java.util.ServiceLoader#load(java.lang.Class<S>)`执行完了回到此处

   ![image-20220401115310972](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401115310972.png)

7. 这里就是真正要加载`com.mysql.jdbc.Driver`了

![image-20220401115430364](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401115430364.png)

8. 跟踪进去，最后会进入`java.util.ServiceLoader.LazyIterator#nextService`，可以到这里用AppClassLoader加载了`com.mysql.jdbc.Driver`，这个类就是之前在`java.sql.DriverManager`的静态代码快中受到BootStrapClassLoader的委托而加载的。这就证明了父加载器委托子加载器加载，从而证明了spi打破了双亲委派机制

   ![image-20220401115555240](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220401115555240.png)
