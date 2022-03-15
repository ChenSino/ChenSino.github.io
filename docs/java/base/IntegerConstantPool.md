---
title: Integer常量池
date: 2019-08-08 08:00:00
sidebar: auto
categories: 
  - java基础
tags: 
  - 
---
### 1. Integer常量池默认的范围

范围：[-128,127]，Integer内部有个缓存池，最小值-128是固定的，最大的值127是可以调整的，看源码知道，最大值是和integerCacheHighPropValue有关，这个值是可以通过```java.lang.Integer.IntegerCache.high```属性指定，实际测试```System.setProperty("java.lang.Integer.IntegerCache.high","300")```不生效，使用-XX:AutoBoxCacheMax=300可以。

```java
private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer cache[];

        static {
            // high value may be configured by property
            int h = 127;
            String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                try {
                    int i = parseInt(integerCacheHighPropValue);
                    i = Math.max(i, 127);
                    // Maximum array size is Integer.MAX_VALUE
                    h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
                } catch( NumberFormatException nfe) {
                    // If the property cannot be parsed into an int, ignore it.
                }
            }
            high = h;

            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);

            // range [-128, 127] must be interned (JLS7 5.1.7)
            assert IntegerCache.high >= 127;
        }

        private IntegerCache() {}
    }
```

### 2、测试

```java
// jvm参数-XX:AutoBoxCacheMax=300
public static void main(String[] args) {
        String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        System.out.println(integerCacheHighPropValue);
        Integer c = 200;
        Integer d = 200;
        System.out.println(c == d);
    }
//输出：300     true
```

```java
//不指定-XX:AutoBoxCacheMax
public static void main(String[] args) {
        String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        System.out.println(integerCacheHighPropValue);
        Integer c = 200;
        Integer d = 200;
        System.out.println(c == d);
    }
//输出： null false
```

