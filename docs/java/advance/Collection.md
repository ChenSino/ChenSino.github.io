---
title: java集合
date: 2018-03-28  
publish: true
keys:
category:
 - 集合
tag:
 - 集合
---
 分析集合数据结构，HashMap、ArrayList、LinkedList扩容原理等
 <!--more-->

### 1、Queue 队列

#### 1.1 queue类图

![](https://ddns.chensina.cn:29000/afatpig/blog/20241217162443633.png)

queue是java中的队列，可以实现队列特性，即：**先进先出**，先进先出这里就说明了要从队列中移除元素，**只能从头部移除**，因为要保证**先进先出**

#### 1.2 api介绍

每个方法都有一个抛出异常（新增时空间不足、为空时获取元素），一个不抛出异常

| 方法     |                             描述                             |
| -------- | :----------------------------------------------------------: |
| add      | 向插入数据，继承自Collectoin，在容量已满的情况下，会抛出IllegalStateException异常 |
| offer    |          在容量已满的情况下仅仅返回false不抛出异常           |
| remove   |                      移除元素、抛出异常                      |
| poll     |               移除元素、不抛出异常（返回null）               |
| elemtent |                     不移除元素、抛出异常                     |
| peek     |               不移除元素、不抛异常（返回null）               |

### 2、Deque （double ended queue）双向队列

实现了Queue，在其基础上扩充了一些自定义方法以及栈

![](https://ddns.chensina.cn:29000/afatpig/blog/20241217162603559.png)

#### 2.1 栈方法

push ，从栈顶（头）加入一个元素，pop从栈顶弹出一个元素。这里要注意理解栈的head和队列的head区别，因为栈是单向，可理解为一个桶，桶只有一个口，要取东西只能从口取。队列（有单向队列和双向队列）可理解为一个两边都是通的管道，单向队列只能从一个口进，另一个口出，双向则两个口都可进出。

Stack中只有一个push方法以及pop方法，下图左边演示了为什么push和pop都是操作的head

![](https://ddns.chensina.cn:29000/afatpig/blog/20241217162625530.png)

#### 2.2、Dequeue的实现类LinkedList 

![](https://ddns.chensina.cn:29000/afatpig/blog/20241217162640790.png)

linkedlist中实现栈的push方法，可以看到实际就是在头部加了一个元素

```java
   public void push(E e) {
        addFirst(e);
    }
```

linkedlist中实现栈的pop方法也是，直接移除的是第一个元素

```java
public E pop() {
    return removeFirst();
}
```

### 4、HashMap知识

#### 4.1 基础

![](https://ddns.chensina.cn:29000/afatpig/blog/20241217162659370.png)


1. HashMap 数据结构组成：数组（桶）、单向链表、红黑树
2. 初始化时数组默认长度16,负载因子0.75，若有设置长度，长度要为2的若干次方，如果不是，则自动取最接近的一个，比如设置7,则自动取8,设置14,自动取16以此类推
3. 数组中存储的实际元素是Node,实现了Map.Entry，是一个key,value结构，的单向列表，只有next没有pre

#### 4.2 扩容原理

默认16个长度的数组，如果数组中某一个单向列表的长度超过8,此时会出发数组扩容，扩容也是2的若干次方，先扩容到32,然后重新计算元素的hash,重新排列，所以扩容是很耗费性能的。扩容后如果某一个单向列表长度再次超过8,则再次触发扩容到64。如果此时又有列表长度超过8,则那个列表就会转化为红黑树结构，如果后来删除导致列表少于6个，则红黑树会转换为单向列表。**注意：**这里很多博客都直接说列表长度超过8就转换为红黑树，是不准确的，要数组总长度在64之后才会转红黑树

```java
    /**
     * Replaces all linked nodes in bin at index for given hash unless
     * table is too small, in which case resizes instead.
     */
    final void treeifyBin(Node<K,V>[] tab, int hash) {
        int n, index; Node<K,V> e;
        //MIN_TREEIFY_CAPACITY = 64
        if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
            //数组扩容
            resize();
        else if ((e = tab[index = (n - 1) & hash]) != null) {
            TreeNode<K,V> hd = null, tl = null;
            do {
                TreeNode<K,V> p = replacementTreeNode(e, null);
                if (tl == null)
                    hd = p;
                else {
                    p.prev = tl;
                    tl.next = p;
                }
                tl = p;
            } while ((e = e.next) != null);
            if ((tab[index] = hd) != null)
                hd.treeify(tab);
        }
    }
```