---
title: Idea多线程调试
date:  2022/07/29
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

## 1、多线程debug遇到的问题
多线程调试需要把Thread选上，至于Thread和All的区别请查看[官方文档](https://www.jetbrains.com/help/idea/using-breakpoints.html#breakpoint-properties)  

- All: all threads are suspended when any of the threads hits the breakpoint.

- Thread: only the thread which hits the breakpoint is suspended.
  

![](afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729150247.png)

今天用idea调试mybatis-plus多数据源切换时，遇到一个有趣的问题，我有两个线程，分别进入了两个方法，因为多数据源切换使用的ThreadLocal，我想调试为何数据源切换会失败的问题。在调试过程中，我在两个方法分别获取ThreadLocalMap，调试过程如下：  
1. 我先执行了线程1，然后断点停留，查看第一个方法中`threadLocalMap`的结果，符合预期
2. 然后执行线程2，查看第二个方法中`threadLocalMap`的结果，也符合预期
3. 此时我又用Ctrl+鼠标左键去查看线程1中的`threadLocalMap`，发现变成和线程2中一样了

![](afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729145847.png)

经过第三步测试，我蒙蔽了，ThreadLocal不是线程之间不会互相干扰吗？怎么线程2修改了线程1的结果？  
这里说一下，debug中，Ctrl+鼠标左键点击字段确实能快捷查看字段值，但是其实它的本质还是查看当前线程的xxx字段，只要你没切换线程，直接用鼠标点到另一个线程中的字段，它其实只是用了你用快捷键点的那个字段名，实际还是差的当前线程的这个字段
![](afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729151140.png)

如果想看另一个线程的同名字段，需要先切换线程  
![](afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729151320.png)  


另外如果你把两个线程中的字段名改成不一样，你会发现在线程2中用快捷键点线程1的字段，是取不到值的
