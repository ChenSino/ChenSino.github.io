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

![mvcc版本控制](https://ddns.chensina.cn:29000/afatpig/blog/20250418151238128.png)

## Read View

### 什么是read View?

MySQL中的Read View（读视图）​是MVCC（多版本并发控制）的核心机制之一，它决定了事务在读取数据时能看到哪些版本的数据记录。**注意：Read View中的所有事务id集合，是产生这个ReadView这个时刻的所有事务id集合，并不是数据库中实时的**。以下是Read View的具体规则及其工作机制的详细说明：

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

当事务通过快照读（如普通SELECT）访问某条数据时，会根据该行记录的trx_id（事务ID）与Read View的字段进行比对，判断数据是否可见。具体规则如下：

**1. 当前事务自身修改的版本可见​**
若记录的trx_id等于creator_trx_id，说明该版本是当前事务修改的，直接可见。
​示例​：事务A修改某行后，在同一个事务中查询该行，会直接读取最新修改的版本。

**​2. 已提交的旧版本可见​**
若记录的trx_id小于min_trx_id，说明该版本由已提交的事务生成，对当前事务可见。
​示例​：事务A的Read View中min_trx_id=100，若某行记录的trx_id=90，说明该版本在事务A启动前已提交，可读。

**​3. 未来事务的版本不可见​**
若记录的trx_id大于或等于max_trx_id，说明该版本由生成Read View后启动的事务修改，不可见。此时需通过roll_pointer查找更早的版本。
​示例​：事务A的max_trx_id=200，若某行记录的trx_id=210，需沿版本链回退到trx_id<200的版本。

**​4. 活跃事务的版本不可见​**

1. 若记录的trx_id介于min_trx_id和max_trx_id之间：
​在m_ids列表中​：说明生成该版本的事务仍活跃（未提交），不可见。 此时会按照如下逻辑定位到可见记录

![](https://ddns.chensina.cn:29000/afatpig/blog/20250418151100714.png)

2. ​不在m_ids列表中​：说明生成该版本的事务已提交，可见。
​示例​：事务A的m_ids=[100, 150]，若某行记录的trx_id=120且120在m_ids中，则不可见；若trx_id=130且不在m_ids中，则可见。

三、隔离级别对Read View生成的影响
​读已提交（RC）​​
​每次快照读生成新Read View，因此能看到其他事务已提交的最新修改，可能导致不可重复读
。
​可重复读（RR）​​
​仅在第一次快照读时生成Read View，后续复用该视图，保证事务内数据一致性，避免不可重复读

## GPT

[](https://yuanbao.tencent.com/bot/app/share/chat/dOpyINibZsgA)