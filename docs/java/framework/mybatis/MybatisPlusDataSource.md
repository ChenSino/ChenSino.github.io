---
title: MybatisPlus多线程数据源切换问题
date:  2022/07/29
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

## 1、问题的背景
> 有两个库，ccsx_data、ccsx_weibao，默认库是ccsx_data，我在代码中使用了>mybatis-pulus的`@DS()`注解，想切换到ccsx_weibao这个库，但是切换一直失败，代码如下：


```java
	@DS("ccsx_weibao")
	public IPage<InstallRecordVO> queryByPage(Page page, InstallRecordSearchVO installRecordSearchVO, DataScope dataScope) {
		Wrapper<InstallRecordSearchVO> wrapper = QueryWrapperUtil.getWrapper(installRecordSearchVO);
		IPage<InstallRecordVO> installRecordVOIPage = installRecordMapper.queryPageByDataScope(page, wrapper, dataScope);
		if (CollectionUtil.isNotEmpty(installRecordVOIPage.getRecords())) {
			installRecordVOIPage.getRecords().parallelStream().forEach(installRecordVO -> {
                //这一步要查询的数据位于ccsx_weibao库
				List<InstallRecordAccessory> installRecordAccessories = installRecordAccessoryMapper.queryByHostId(installRecordVO.getId());
                //……略  
			});
		}
		return installRecordVOIPage;
	}
```

## 2、问题产生的原因
原因是MybatisPlus多数据源切换使用的是ThreadLocal来保存的，ThreadLocal中存放的是一个栈，具体可以查看源码`com.baomidou.dynamic.datasource.toolkit.DynamicDataSourceContextHolder`，注释写的很详细
```java
import org.springframework.core.NamedThreadLocal;
import org.springframework.util.StringUtils;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * 核心基于ThreadLocal的切换数据源工具类
 *
 * @author TaoYu Kanyuxia
 * @since 1.0.0
 */
public final class DynamicDataSourceContextHolder {

    /**
     * 为什么要用链表存储(准确的是栈)
     * <pre>
     * 为了支持嵌套切换，如ABC三个service都是不同的数据源
     * 其中A的某个业务要调B的方法，B的方法需要调用C的方法。一级一级调用切换，形成了链。
     * 传统的只设置当前线程的方式不能满足此业务需求，必须使用栈，后进先出。
     * </pre>
     */
    private static final ThreadLocal<Deque<String>> LOOKUP_KEY_HOLDER = new NamedThreadLocal<Deque<String>>("dynamic-datasource") {
        @Override
        protected Deque<String> initialValue() {
            return new ArrayDeque<>();
        }
    };

    private DynamicDataSourceContextHolder() {
    }

    /**
     * 获得当前线程数据源
     *
     * @return 数据源名称
     */
    public static String peek() {
        return LOOKUP_KEY_HOLDER.get().peek();
    }

    /**
     * 设置当前线程数据源
     * <p>
     * 如非必要不要手动调用，调用后确保最终清除
     * </p>
     *
     * @param ds 数据源名称
     */
    public static String push(String ds) {
        String dataSourceStr = StringUtils.isEmpty(ds) ? "" : ds;
        LOOKUP_KEY_HOLDER.get().push(dataSourceStr);
        return dataSourceStr;
    }

    /**
     * 清空当前线程数据源
     * <p>
     * 如果当前线程是连续切换数据源 只会移除掉当前线程的数据源名称
     * </p>
     */
    public static void poll() {
        Deque<String> deque = LOOKUP_KEY_HOLDER.get();
        deque.poll();
        if (deque.isEmpty()) {
            LOOKUP_KEY_HOLDER.remove();
        }
    }

    /**
     * 强制清空本地线程
     * <p>
     * 防止内存泄漏，如手动调用了push可调用此方法确保清除
     * </p>
     */
    public static void clear() {
        LOOKUP_KEY_HOLDER.remove();
    }
}
```

使用`@DS`注解注解只能保证数据源在当前线程生效，而我们在代码使用了`parallelStream`，这个方法本质使用的是`ForkJoinPool`，是多线程操作，所以在新的线程里面使用ThreadLocal肯定获取不到数据源了，于是就使用默认数据源所以报错。

## 3、解决方法
> 在多线程内部使用`DynamicDataSourceContextHolder.push("<your datasource>");`，  
> 使用后务必调用`DynamicDataSourceContextHolder.clear();`


## 4、MybatisPlus多线程数据源切换的源码分析
测试代码：
```java
	@DS("ccsx_data")
	public Map<String, Object> getLifeCycleInfoByDeptId(Integer sysHospitalDeptId) {
		Map<ThreadLocal, Object> threadLocalMap = ThreadLocalUtil.getThreadLocalMap();
		DynamicDataSourceContextHolder.push("ccsx_test");
		DynamicDataSourceContextHolder.clear();
        //略
    }
```
使用 [ThreadLocalUtil.getThreadLocalMap()](https://chensino.github.io/docs/java/advance/ThreadLocal.html)获取所有的线程的ThreadLocalMap，debug模式查看每一行执行过后数据源的变化