---
title: 字符串设计
date: 2019-08-08
category: 
  - java基础
---
##### 1、String类

1. 为什么String类要被设计为不可变？

   [string为什么不可变](https://www.programcreek.com/2013/04/why-string-is-immutable-in-java/)

   ```text
   Thanks to the immutability of Strings in Java, the JVM can optimize the amount of memory allocated for them by storing only one copy of each literal String in the pool. This process is called interning.
   
   When we create a String variable and assign a value to it, the JVM searches the pool for a String of equal value.
   
   If found, the Java compiler will simply return a reference to its memory address, without allocating additional memory.
   
   If not found, it'll be added to the pool (interned) and its reference will be returned.
   
   Let's write a small test to verify this:
   
   String constantString1 = "Baeldung";
   String constantString2 = "Baeldung";
           
   assertThat(constantString1)
     .isSameAs(constantString2);
   
   ```

   

   ```java
   //同一个string字面量，坑能被使用很多次，为了节省内存，凡是调用equals相等的字符串，实际都是直接引用的String pool中同一个字符串，所以String一旦被创建后不能被改变，因为一旦改变后，其他的引用获取到的字符串的值也变了。
   String s1 = "a";
   String s2 = "a";
   //以上两个字符串返回的都是String pool 中同一个位置上的字符串，这样只需要一个内存就够了，假设s1能改变这个值，会导致s2引用的值也变
   
   ```

   ##### 2、new String("xxxx")创建了几个对象

   ```java
   package com.chen.base;
   
   /**
    * @author afatpig
    * @date 2021/9/21 上午10:19
    */
   public class JavaBase {
       public void testString(){
           String myName = new String("chenkun");
       }
   }
   
   ```

   以上边例子来讲解，使用``` javap -verbose JavaBase``` 反汇编class文件，结果如下，在#3（14行）可以看到 #3 = String             #21            // chenkun，

   在#21（32行）也有个 #21 = Utf8               chenkun， 第二个chenkun代表的是字面量，第一个是代表的常量池中的字符串对象，它指向#21也就是字面量。

   从57行开始new会创建一个对象，并把其地址压入栈顶，dup是复制栈顶值并压入栈顶，ldc是从常量池取出字符串chenkun,并 压入栈顶，invokespecial调用string构造方法，构造一个值为chenkun的对象。

   ```
   $ javap -verbose JavaBase
   警告: 二进制文件JavaBase包含com.chen.base.JavaBase
   Classfile /home/chenkun/IdeaProjects/afatpig/out/production/java-base/com/chen/base/JavaBase.class
     Last modified 2021-9-21; size 470 bytes
     MD5 checksum 8f4ede21baad54f0ede6e0e51819ff99
     Compiled from "JavaBase.java"
   public class com.chen.base.JavaBase
     minor version: 0
     major version: 52
     flags: ACC_PUBLIC, ACC_SUPER
   Constant pool:
      #1 = Methodref          #6.#19         // java/lang/Object."<init>":()V
      #2 = Class              #20            // java/lang/String
      #3 = String             #21            // chenkun
      #4 = Methodref          #2.#22         // java/lang/String."<init>":(Ljava/lang/String;)V
      #5 = Class              #23            // com/chen/base/JavaBase
      #6 = Class              #24            // java/lang/Object
      #7 = Utf8               <init>
      #8 = Utf8               ()V
      #9 = Utf8               Code
     #10 = Utf8               LineNumberTable
     #11 = Utf8               LocalVariableTable
     #12 = Utf8               this
     #13 = Utf8               Lcom/chen/base/JavaBase;
     #14 = Utf8               testString
     #15 = Utf8               myName
     #16 = Utf8               Ljava/lang/String;
     #17 = Utf8               SourceFile
     #18 = Utf8               JavaBase.java
     #19 = NameAndType        #7:#8          // "<init>":()V
     #20 = Utf8               java/lang/String
     #21 = Utf8               chenkun
     #22 = NameAndType        #7:#25         // "<init>":(Ljava/lang/String;)V
     #23 = Utf8               com/chen/base/JavaBase
     #24 = Utf8               java/lang/Object
     #25 = Utf8               (Ljava/lang/String;)V
   {
     public com.chen.base.JavaBase();
       descriptor: ()V
       flags: ACC_PUBLIC
       Code:
         stack=1, locals=1, args_size=1
            0: aload_0
            1: invokespecial #1                  // Method java/lang/Object."<init>":()V
            4: return
         LineNumberTable:
           line 7: 0
         LocalVariableTable:
           Start  Length  Slot  Name   Signature
               0       5     0  this   Lcom/chen/base/JavaBase;
   
     public void testString();
       descriptor: ()V
       flags: ACC_PUBLIC
       Code:
         stack=3, locals=2, args_size=1
            0: new           #2                  // class java/lang/String
            3: dup
            4: ldc           #3                  // String chenkun
            6: invokespecial #4                  // Method java/lang/String."<init>":(Ljava/lang/String;)V
            9: astore_1
           10: return
         LineNumberTable:
           line 11: 0
           line 12: 10
         LocalVariableTable:
           Start  Length  Slot  Name   Signature
               0      11     0  this   Lcom/chen/base/JavaBase;
              10       1     1 myName   Ljava/lang/String;
   }
   SourceFile: "JavaBase.java"
   
   ```

