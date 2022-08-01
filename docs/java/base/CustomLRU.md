---
title: 自定义LRU实现
date: 2022-03-22
category: 
  - java基础
tag: 
  - 必会
---

<!--more-->

## LRU介绍

lru(latest recently used)最近最少使用，在缓存中可以使用LRU算法移除最近最少使用的



## 自定义lru算法

> 在java中LinkedHashMap已经实现了LRU算法，在使用时只需要继承此类，然后重写`removeEldestEntry`方法即可

```java
public class MyLRU<K, V> extends LinkedHashMap<K, V> {

    private int cacheCount;

    public MyLRU(int initialCapacity) {
        //必须指定accessOrder为true,true代表会重新排序，刚被访问的元素会被放到头部，false则按照插入顺序排序
        super(initialCapacity, .75f, true);
        this.cacheCount = initialCapacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        //当集合中实际数量超过最大缓存，就移除最老的元素
        return size() > cacheCount;
    }
}

```

以上定义一个map,指定其缓存容量为3,size超过3时，会自动移除，下面进行测试

### 第一次测试

```java
    public static void main(String[] args) {
        MyLRU<String, String> my = new MyLRU<>(3);
        my.put("aa", "11");
        my.put("bb", "22");
        my.put("ccc", "33");
        my.put("dd", "44");

        Set<Map.Entry<String, String>> entries = my.entrySet();
        for (Map.Entry<String, String> entry : entries) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }

    }
```

输出：

```shell
bb:22
ccc:33
dd:44
```

发现最早放进的aa被删除了

### 第二次测试

```java
    public static void main(String[] args) {
        MyLRU<String, String> my = new MyLRU<>(3);
        my.put("aa", "11");
        my.put("bb", "22");
        my.put("ccc", "33");
        //主动使用一次aa
        my.get("aa");
        my.put("dd", "44");

        Set<Map.Entry<String, String>> entries = my.entrySet();
        for (Map.Entry<String, String> entry : entries) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }

    }
```

输出：

```shell
ccc:33
aa:11
dd:44

```

发现当使用一次aa后，这次被删除的是bb,说明当刚加入aa,bb,cc时的排序是aa-bb-cc,当我们使用一次aa,则aa被放到头部，变成了bb-cc-aa,当在加入dd时，需要移除尾部的bb,就变成了cc-aa-dd
