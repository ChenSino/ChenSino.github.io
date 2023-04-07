---
title: 递归下钻
date: 2023-04-06
isOriginal: true
category: 
tag: 
---

:::danger 注意！！!
只有在mysql8.0之后才有递归，5.7及之前是不支持的
:::

## 1、递归下钻

MySQL中的递归查询通常用于处理树形结构数据，如组织架构、文件目录、级联地址、多级菜单等。

## 2、示例

~~~sql
WITH RECURSIVE cte (id, parent_id, level) AS (
  -- 初始查询
  SELECT id, parent_id, 0 FROM your_table WHERE id = <your starting id>

  UNION ALL

  -- 递归查询
  SELECT t.id, t.parent_id, cte.level + 1
  FROM your_table AS t
  JOIN cte ON t.parent_id = cte.id
)
SELECT * FROM cte;
~~~

~~~markdown
1. 在上述查询中，WITH RECURSIVE定义了一个递归的通用表表达式。在这个表达式中，我们定义了一个递归查询，它首先从给定的起始点开始，然后逐步向下查找树形结构中所有的节点。
2. 关键的地方在于，这个查询有两个SELECT语句，第一个SELECT是初始查询，它将从起点开始。第二个SELECT是递归查询，它将连接到上一个查询的结果。
3. 在递归查询中，我们使用JOIN将另一个实例的表连接到我们正在创建的表中，然后根据两个表之间共享的信息递归向下查找树形结构中的每个节点。这就是递归下钻查询的核心部分。
4. 最后的SELECT将返回递归查询的结果。
5. 注意递归中参数个数要和select个数一致
~~~
