---
title: MySQL的MVCC机制
date: 2025-04-18
author: chensino
publish: true
isOriginal: true
---


## MVCC(多版本并发控制)

 undo log是一种逻辑日志，当一个事务对记录做了变更操作就会产生undo log，也就是说undo log记录了记录变更的逻辑过程。当一个事务要更新一行记录时，会把当前记录当做历史快照保存下来，多个历史快照会用两个隐藏字段trx_id和roll_pointer串起来（关于隐藏字段，这里不用考虑隐式主键id:DB_ROW_ID），形成一个历史版本链。可以用于MVCC和事务回滚。
  比如多个事务对id为1的数据做了更新，会形成如下图这种历史版本链：

![mvcc版本控制](https://ddns.chensina.cn:2032/afatpig/blog/20250418151238128.png)

## Read View

### 什么是read View?

MySQL中的Read View（读视图）​是MVCC（多版本并发控制）的核心机制之一，它决定了事务在读取数据时能看到哪些版本的数据记录。**注意：Read View中的所有事务id集合，是产生这个ReadView这个时刻的所有事务id集合，并不是数据库中实时的，并且它不一定是连续的，如果提交过的事务，他的id不会在这里面的**。以下是Read View的具体规则及其工作机制的详细说明：

一、Read View的核心属性  
Read View在事务启动时生成（具体时机由隔离级别决定），包含以下关键信息：

​**m_ids​
生成Read View时，系统中所有活跃事务的事务ID列表**​（即已启动但未提交的事务）
​**min_trx_id**​
活跃事务中的最小事务ID（即m_ids中的最小值）
​**max_trx_id**​
生成Read View时，系统即将分配给下一个事务的ID（当前最大事务ID +1）
​**creator_trx_id**​
创建该Read View的事务自身ID（若事务未执行写操作，可能为0）

### Read View的可见性规则

当事务通过快照读（如普通SELECT）访问某条数据时，会根据该行记录的trx_id（事务ID）与Read View的字段进行比对，判断数据是否可见。**如果不可见，则根据undolog历史数据记录链继续匹配下一条数据直到找到满足条件的数据。**具体规则如下：

**​1. 已提交的旧版本可见​**
若记录的trx_id小于min_trx_id，说明该版本由已提交的事务生成，对当前事务可见。
​示例​：事务A的Read View中min_trx_id=100，若某行记录的trx_id=90，说明该版本在事务A启动前已提交，可读。

**​2. 未来事务的版本不可见​**
若记录的trx_id大于或等于max_trx_id，说明该版本由生成Read View后启动的事务修改，不可见，此时需要继续匹配历史数据中下一条。

**​3. 活跃事务的版本不可见​**

若数据行中的事务id介于min_trx_id和max_trx_id之间，则按照如下规则匹配：

情况1：数据行中事务id=creator_trx_id，代表这个数据是当前事务产生的，当然可以访问
情况2：数据行中事务id不在活跃事务id集合中，则代表这个事务已经提交过了，当然可以访问
情况3：数据行中事务id在以上两个情况之外，则代表这个数据被其他事务修改了，且还没提交，则不能访问，需要继续找下一条数据进行匹配。

三、隔离级别对Read View生成的影响
​读已提交（RC）​​
​每次快照读生成新Read View，因此能看到其他事务已提交的最新修改，可能导致不可重复读
。
​可重复读（RR）​​
​仅在第一次快照读时生成Read View，后续复用该视图，保证事务内数据一致性，避免不可重复读

## GPT

[](https://yuanbao.tencent.com/bot/app/share/chat/dOpyINibZsgA)