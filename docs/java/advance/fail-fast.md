---
title: 集合Fail-Fast
date: 2022-12-17
author: chensino
publish: true
isOriginal: false
---

转自<https://www.cnblogs.com/54chensongxia/p/12470446.html>

### fail-fast

在网上搜了下fail-fast的解释，很多人说fail-fast是Java中集合的一种错误检测机制，比如下面这个网友的解释：

> fail-fast 机制是java集合(Collection)中的一种错误机制。当多个线程对同一个集合的内容进行操作时，就可能会产生fail-fast事件。

其实fail-fast机制并不是Java集合特有的机制，它是一个通用的系统设计思想。看下维基百科的解释

> In systems design, a fail-fast system is one which immediately reports at its interface any condition that is likely to indicate a failure. Fail-fast systems are usually designed to stop normal operation rather than attempt to continue a possibly flawed process. Such designs often check the system’s state at several points in an operation, so any failures can be detected early. The responsibility of a fail-fast module is detecting errors, then letting the next-highest level of the system handle them.

从上面的解释中可以了解到：fail-fast是一种错误检测机制，一旦检测到可能发生错误，就立马抛出异常，程序不继续往下执行。

~~~java
public UserDomain queryUserById(String userId){
    if(userId==null||"".equals(userId)){
        throw new RuntimeException("error params...");
    }
    //do something
}
~~~

上面的列子就是一个快速失败的列子，而且是我们开发中经常会用到的错误检测的方式。这样做能及早发现问题，不让明显错误的代码继续往下运行，而且自己抛出的异常更更容易定位问题。

### 集合中的fail-fast机制#


下面来复现下异常

~~~java
List<String> userNames = new ArrayList<String>() {{
    add("Hollis");
    add("hollis");
    add("HollisChuang");
    add("H");
}};

for (String userName : userNames) {
    if (userName.equals("Hollis")) {
        userNames.remove(userName);
    }
}

System.out.println(userNames);
~~~

以上代码，使用增强for循环遍历元素，并尝试删除其中的Hollis字符串元素。运行以上代码，会抛出以下异常：

~~~shell
Exception in thread "main" java.util.ConcurrentModificationException
at java.util.ArrayList$Itr.checkForComodification(ArrayList.java:909)
at java.util.ArrayList$Itr.next(ArrayList.java:859)
at com.hollis.ForEach.main(ForEach.java:22)
~~~

同样的，读者可以尝试下在增强for循环中使用add方法添加元素，结果也会同样抛出该异常。

异常产生的原因

增强for循环其实是Java提供的一个语法糖，我们将代码反编译后可以看到增强for循环其实是用的是Iterator迭代器。

~~~java
public static void main(String[] args) {
    // 使用ImmutableList初始化一个List
    List<String> userNames = new ArrayList<String>() {{
        add("Hollis");
        add("hollis");
        add("HollisChuang");
        add("H");
    }};

    Iterator iterator = userNames.iterator();
    do
    {
        if(!iterator.hasNext())
            break;
        String userName = (String)iterator.next();
        if(userName.equals("Hollis"))
            userNames.remove(userName);
    } while(true);
    System.out.println(userNames);
}
~~~

通过以上代码的异常堆栈，我们可以跟踪到真正抛出异常的代码是：

`java.util.ArrayList$Itr.checkForComodification(ArrayList.java:909)`

该方法是在iterator.next()方法中调用的。我们看下该方法的实现：

~~~java
final void checkForComodification() {
    if (modCount != expectedModCount)
        throw new ConcurrentModificationException();
}
~~~

如上，在该方法中对modCount和expectedModCount进行了比较，如果二者不想等，则抛出CMException。

那么，modCount和expectedModCount是什么？是什么原因导致他们的值不想等的呢？

modCount是ArrayList中的一个成员变量。它表示该集合实际被修改的次数。

~~~java
List<String> userNames = new ArrayList<String>() {{
    add("Hollis");
    add("hollis");
    add("HollisChuang");
    add("H");
}};
~~~

当使用以上代码初始化集合之后该变量就有了。初始值为0。

expectedModCount 是 ArrayList中的一个内部类——Itr中的成员变量。

`Iterator iterator = userNames.iterator();`

以上代码，即可得到一个 Itr类，该类实现了Iterator接口。

expectedModCount表示这个迭代器预期该集合被修改的次数。其值随着Itr被创建而初始化。只有通过迭代器对集合进行操作，该值才会改变。

那么，接着我们看下userNames.remove(userName);方法里面做了什么事情，为什么会导致expectedModCount和modCount的值不一样。

通过翻阅代码，我们也可以发现，remove方法核心逻辑如下：

~~~java
private void fastRemove(int index) {
    modCount++;
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    elementData[--size] = null; // clear to let GC do its work
}
~~~

可以看到，它只修改了modCount，并没有对expectedModCount做任何操作。

所以导致产生异常的原因是：remove和add操作会导致modCount和迭代器中的expectedModCount不一致。

正确姿势#
至此，我们介绍清楚了不能在foreach循环体中直接对集合进行add/remove操作的原因。

但是，很多时候，我们是有需求需要过滤集合的，比如删除其中一部分元素，那么应该如何做呢？有几种方法可供参考：

1、直接使用普通for循环进行操作

我们说不能在foreach中进行，但是使用普通的for循环还是可以的，因为普通for循环并没有用到Iterator的遍历，所以压根就没有进行fail-fast的检验。

~~~java
    List<String> userNames = new ArrayList<String>() {{
        add("Hollis");
        add("hollis");
        add("HollisChuang");
        add("H");
    }};

    for (int i = 0; i < 1; i++) {
        if (userNames.get(i).equals("Hollis")) {
            userNames.remove(i);
        }
    }
    System.out.println(userNames);
~~~

这种方案其实存在一个问题，那就是remove操作会改变List中元素的下标，可能存在漏删的情况。

2、直接使用Iterator进行操作

除了直接使用普通for循环以外，我们还可以直接使用Iterator提供的remove方法。

~~~java
    List<String> userNames = new ArrayList<String>() {{
        add("Hollis");
        add("hollis");
        add("HollisChuang");
        add("H");
    }};

    Iterator iterator = userNames.iterator();

    while (iterator.hasNext()) {
        if (iterator.next().equals("Hollis")) {
            iterator.remove();
        }
    }
    System.out.println(userNames);
~~~

如果直接使用Iterator提供的remove方法，那么就可以修改到expectedModCount的值。那么就不会再抛出异常了。其实现代码如下：

-w375￼

3、使用Java 8中提供的filter过滤

Java 8中可以把集合转换成流，对于流有一种filter操作， 可以对原始 Stream 进行某项测试，通过测试的元素被留下来生成一个新 Stream。

~~~java
    List<String> userNames = new ArrayList<String>() {{
        add("Hollis");
        add("hollis");
        add("HollisChuang");
        add("H");
    }};

    userNames = userNames.stream().filter(userName -> !userName.equals("Hollis")).collect(Collectors.toList());
    System.out.println(userNames);
~~~

4、使用增强for循环其实也可以

如果，我们非常确定在一个集合中，某个即将删除的元素只包含一个的话， 比如对Set进行操作，那么其实也是可以使用增强for循环的，只要在删除之后，立刻结束循环体，不要再继续进行遍历就可以了，也就是说不让代码执行到下一次的next方法。

~~~java
    List<String> userNames = new ArrayList<String>() {{
        add("Hollis");
        add("hollis");
        add("HollisChuang");
        add("H");
    }};

    for (String userName : userNames) {
        if (userName.equals("Hollis")) {
            userNames.remove(userName);
            break;
        }
    }
    System.out.println(userNames);
~~~

5、直接使用fail-safe的集合类

在Java中，除了一些普通的集合类以外，还有一些采用了fail-safe机制的集合类。这样的集合容器在遍历时不是直接在集合内容上访问的，而是先复制原有集合内容，在拷贝的集合上进行遍历。

由于迭代时是对原集合的拷贝进行遍历，所以在遍历过程中对原集合所作的修改并不能被迭代器检测到，所以不会触发ConcurrentModificationException。

~~~java
ConcurrentLinkedDeque<String> userNames = new ConcurrentLinkedDeque<String>() {{
    add("Hollis");
    add("hollis");
    add("HollisChuang");
    add("H");
}};

for (String userName : userNames) {
    if (userName.equals("Hollis")) {
        userNames.remove();
    }
}
~~~

基于拷贝内容的优点是避免了ConcurrentModificationException，但同样地，迭代器并不能访问到修改后的内容，即：迭代器遍历的是开始遍历那一刻拿到的集合拷贝，在遍历期间原集合发生的修改迭代器是不知道的。

java.util.concurrent包下的容器都是安全失败，可以在多线程下并发使用，并发修改。

总结#
我们使用的增强for循环，其实是Java提供的语法糖，其实现原理是借助Iterator进行元素的遍历。

但是如果在遍历过程中，不通过Iterator，而是通过集合类自身的方法对集合进行添加/删除操作。那么在Iterator进行下一次的遍历时，经检测发现有一次集合的修改操作并未通过自身进行，那么可能是发生了并发被其他线程执行的，这时候就会抛出异常，来提示用户可能发生了并发修改，这就是所谓的fail-fast机制。

当然还是有很多种方法可以解决这类问题的。比如使用普通for循环、使用Iterator进行元素删除、使用Stream的filter、使用fail-safe的类等。

### 参考

<https://www.hollischuang.com/archives/3542>
<https://www.hollischuang.com/archives/3304>
