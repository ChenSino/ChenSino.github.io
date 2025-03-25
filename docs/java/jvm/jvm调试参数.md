---
title: 垃圾回收的一些参数
date: 2018-03-06
author: chensino
publish: true
isOriginal: true
---

#### 1 垃圾回收日志打印参数

打印垃圾回收详情：`-Xlog:gc*`

```shell
[0.003s][warning][gc] -XX:+PrintGCDetails is deprecated. Will use -Xlog:gc* instead.
```

#### 2 Jdk8默认的垃圾回收器

默认使用的`-XX:+UseParallelGC`，同时它会自动启用`-XX:+UseParallelOldGC`，反之亦然。可以使用`-XX:+PrintCommandLineFlags`参数查看到所有设置（包括默认的）

在 JDK8 之前，UseParallelGC 的老年代可能搭配 Serial Old，但从 JDK8 开始，-XX:+UseParallelOldGC 参数被隐式启用，形成完整的并行组合.若需进一步优化吞吐量或停顿时间，可通过 -XX:ParallelGCThreads 调整线程数，或结合 -XX:+UseAdaptiveSizePolicy 启用自适应内存调整策略。

`-XX：UseParallelGC` 对应年轻代和老年代的回收器分别是什么？

**年轻代：** Parallel Scavenge 回收器
这是 JDK8 默认的年轻代回收器，采用多线程并行回收，使用复制算法，核心目标是最大化系统吞吐量（Throughput）。它支持自适应调整堆内存大小，通过参数 -XX:MaxGCPauseMillis（最大停顿时间）和 -XX:GCTimeRatio（吞吐量比例）动态优化性能。

**老年代：**Parallel Old 回收器（JDK8 及之后的默认搭配）
在 JDK8 中，启用 -XX:+UseParallelGC 参数时，老年代默认使用 Parallel Old 回收器（而非早期版本的 Serial Old），两者组合成 Parallel Scavenge + Parallel Old 的吞吐量优先组合。Parallel Old 采用标记-整理算法，支持多线程并行回收，适合后台计算类应用

#### 3.大对象直接进入老年代？

`-XX:PretenureSizeThreshold`可以设置大对象比如：`-XX:PretenureSizeThreshold=5m`
但是在默认的UseParallelGC场景下测试垃圾回收，发现大对象是先进了年轻代，在第一次触发垃圾回收时才进入老年代，说明PretenureSizeThreshold对UseParallelGC不生效？（存疑）

经过测试使用其他收集器和预期一样，大对象直接进入了老年代
方案一（更换收集器）：
添加参数 -XX:+UseParNewGC 强制使用ParNew收集器，此时PretenureSizeThreshold会生效，大对象将直接进入老年代。
方案二（G1收集器验证）：
使用G1收集器（参数 -XX:+UseG1GC），其通过 Humongous对象机制 自动处理大对象（超过Region 50%直接进老年代），但需注意G1的Region大小默认是堆的1/2000，需结合堆配置调整。
