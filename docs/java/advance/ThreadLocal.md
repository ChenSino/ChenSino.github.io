---
title: ThreadLocal
date:  2022-07-29
author: chenkun
publish: true
keys:
---

## 1、介绍

## 2、使用

## 3、 使用反射在当前线程获取所有的ThreadLocal

> 一个线程是可能有多个ThreadLocal的，所以源码中字段使用的复数形式`threadLocals`  

```java
public class ThreadLocalUtil {

    public static Map<ThreadLocal, Object> getThreadLocalMap(){
        Map<ThreadLocal, Object> threadLocals = new HashMap<>();
        Thread thread = Thread.currentThread();
        try{
            Field threadLocalsField = Thread.class.getDeclaredField("threadLocals");
            threadLocalsField.setAccessible(true);
            Object threadLocalMap = threadLocalsField.get(thread);
            Field tableField = threadLocalMap.getClass().getDeclaredField("table");
            tableField.setAccessible(true);
            Object[] table = (Object[])tableField.get(threadLocalMap);
            for(int i=0;i<table.length;i++){
                Object entry = table[i];
                if(entry != null){
                    WeakReference<ThreadLocal> threadLocalRef = (WeakReference<ThreadLocal>)entry;
                    ThreadLocal threadLocal = threadLocalRef.get();
                    if(threadLocal != null){
                        Object threadLocalValue = threadLocal.get();
                        threadLocals.put(threadLocal, threadLocalValue);
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return threadLocals;
    }

    public static void resetThreadLocals(Map<ThreadLocal, Object> threadLocals){
        if(threadLocals == null){
            return;
        }
        for(Map.Entry<ThreadLocal, Object> entry : threadLocals.entrySet()){
            ThreadLocal tl = entry.getKey();
            Object value = entry.getValue();
            tl.set(value);
        }
        threadLocals.clear();
    }

    public static class ThreadLocalRunnable implements Runnable{
        private Map<ThreadLocal, Object> threadLocals;
        private Runnable runnable;
        public ThreadLocalRunnable(Runnable runnable){
            this.threadLocals = getThreadLocalMap();
            this.runnable = runnable;
        }
        @Override
        public void run() {
            resetThreadLocals(threadLocals);
            this.runnable.run();
        }
    }

    public static class ThreadLocalCallable<T> implements Callable<T> {
        private Map<ThreadLocal, Object> threadLocals;
        private Callable<T> runnable;
        public ThreadLocalCallable(Callable<T> runnable){
            this.threadLocals = getThreadLocalMap();
            this.runnable = runnable;
        }
        @Override
        public T call()throws Exception {
            resetThreadLocals(threadLocals);
            return this.runnable.call();
        }
    }
}
```