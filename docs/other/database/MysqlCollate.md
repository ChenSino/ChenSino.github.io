---
title: Mysql中的Collate和charset
date: 2023-02-17
category: 
isOriginal: true
tag: 
  - mysql
---

本文转载自[此处](https://cloud.tencent.com/developer/article/1366841)

在mysql中执行show create table &lt tablename>指令，可以看到一张表的建表语句，example如下：

~~~sql
CREATE TABLE `table1` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `field1` text COLLATE utf8_unicode_ci NOT NULL COMMENT '字段1',
    `field2` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '字段2',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8_unicode_ci;
~~~

大部分字段我们都能看懂，但是今天要讨论的是COLLATE关键字。这个值后面对应的utf8_unicode_ci是什么意思呢？面试的时候用这个题目考一考DBA，应该可以难倒一大部分人。

### COLLATE是用来做什么的？

使用phpmyadmin的开发可能会非常眼熟，因为其中的中文表头已经给出了答案：

![20230217113252](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230217113252.png)

所谓utf8_unicode_ci，其实是用来排序的规则。对于mysql中那些字符类型的列，如VARCHAR，CHAR，TEXT类型的列，都需要有一个COLLATE类型来告知mysql如何对该列进行排序和比较。简而言之，COLLATE会影响到ORDER BY语句的顺序，会影响到WHERE条件中大于小于号筛选出来的结果，会影响DISTINCT、GROUP BY、HAVING语句的查询结果。另外，mysql建索引的时候，如果索引列是字符类型，也会影响索引创建，只不过这种影响我们感知不到。总之，凡是涉及到字符类型比较或排序的地方，都会和COLLATE有关。

### 各种COLLATE的区别

COLLATE通常是和数据编码（CHARSET）相关的，一般来说每种CHARSET都有多种它所支持的COLLATE，并且每种CHARSET都指定一种COLLATE为默认值。例如Latin1编码的默认COLLATE为latin1_swedish_ci，GBK编码的默认COLLATE为gbk_chinese_ci，utf8mb4编码的默认值为utf8mb4_general_ci。

这里顺便讲个题外话，mysql中有utf8和utf8mb4两种编码，在mysql中请大家忘记utf8，永远使用utf8mb4。这是mysql的一个遗留问题，mysql中的utf8最多只能支持3bytes长度的字符编码，对于一些需要占据4bytes的文字，mysql的utf8就不支持了，要使用utf8mb4才行。

很多COLLATE都带有_ci字样，这是Case Insensitive的缩写，即大小写无关，也就是说"A"和"a"在排序和比较的时候是一视同仁的。selection * from table1 where field1="a"同样可以把field1为"A"的值选出来。与此同时，对于那些_cs后缀的COLLATE，则是Case Sensitive，即大小写敏感的。

在mysql中使用show collation指令可以查看到mysql所支持的所有COLLATE。以utf8mb4为例，该编码所支持的所有COLLATE如下图所示。
![mysql中和utf8mb4相关的所有COLLATE](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230217113305.png)

图中我们能看到很多国家的语言自己的排序规则。在国内比较常用的是utf8mb4_general_ci（默认）、utf8mb4_unicode_ci、utf8mb4_bin这三个。我们来探究一下这三个的区别：

首先utf8mb4_bin的比较方法其实就是直接将所有字符看作二进制串，然后从最高位往最低位比对。所以很显然它是区分大小写的。

而utf8mb4_unicode_ci和utf8mb4_general_ci对于中文和英文来说，其实是没有任何区别的。对于我们开发的国内使用的系统来说，随便选哪个都行。只是对于某些西方国家的字母来说，utf8mb4_unicode_ci会比utf8mb4_general_ci更符合他们的语言习惯一些，general是mysql一个比较老的标准了。例如，德语字母“ß”，在utf8mb4_unicode_ci中是等价于"ss"两个字母的（这是符合德国人习惯的做法），而在utf8mb4_general_ci中，它却和字母“s”等价。不过，这两种编码的那些微小的区别，对于正常的开发来说，很难感知到。本身我们也很少直接用文字字段去排序，退一步说，即使这个字母排错了一两个，真的能给系统带来灾难性后果么？从网上找的各种帖子讨论来说，更多人推荐使用utf8mb4_unicode_ci，但是对于使用了默认值的系统，也并没有非常排斥，并不认为有什么大问题。结论：推荐使用utf8mb4_unicode_ci，对于已经用了utf8mb4_general_ci的系统，也没有必要花时间改造。

另外需要注意的一点是，从mysql 8.0开始，mysql默认的CHARSET已经不再是Latin1了，改为了utf8mb4（参考链接），并且默认的COLLATE也改为了utf8mb4_0900_ai_ci。utf8mb4_0900_ai_ci大体上就是unicode的进一步细分，0900指代unicode比较算法的编号（ Unicode Collation Algorithm version），ai表示accent insensitive（发音无关），例如e, è, é, ê 和 ë是一视同仁的。相关参考链接1，相关参考链接2

### COLLATE设置级别及其优先级

设置COLLATE可以在示例级别、库级别、表级别、列级别、以及SQL指定。实例级别的COLLATE设置就是mysql配置文件或启动指令中的collation_connection系统变量。

库级别设置COLLATE的语句如下：

~~~sql
CREATE DATABASE <db_name> DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
~~~

如果库级别没有设置CHARSET和COLLATE，则库级别默认的CHARSET和COLLATE使用实例级别的设置。在mysql8.0以下版本中，你如果什么都不修改，默认的CHARSET是Latin1，默认的COLLATE是latin1_swedish_ci。从mysql8.0开始，默认的CHARSET已经改为了utf8mb4，默认的COLLATE改为了utf8mb4_0900_ai_ci。

表级别的COLLATE设置，则是在CREATE TABLE的时候加上相关设置语句，例如：

~~~sql
CREATE TABLE (

……

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
~~~

如果表级别没有设置CHARSET和COLLATE，则表级别会继承库级别的CHARSET与COLLATE。

列级别的设置，则在CREATE TABLE中声明列的时候指定，例如

~~~sql
CREATE TABLE (

`field1` VARCHAR（64） CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',

……

) ……
~~~

如果列级别没有设置CHARSET和COLATE，则列级别会继承表级别的CHARSET与COLLATE。

最后，你也可以在写SQL查询的时候显示声明COLLATE来覆盖任何库表列的COLLATE设置，不太常用，了解即可：

~~~sql
SELECT DISTINCT field1 COLLATE utf8mb4_general_ci FROM table1;

SELECT field1, field2 FROM table1 ORDER BY field1 COLLATE utf8mb4_unicode_ci;
~~~

如果全都显示设置了，那么优先级顺序是 SQL语句 > 列级别设置 > 表级别设置 > 库级别设置 > 实例级别设置。也就是说列上所指定的COLLATE可以覆盖表上指定的COLLATE，表上指定的COLLATE可以覆盖库级别的COLLATE。如果没有指定，则继承下一级的设置。即列上面没有指定COLLATE，则该列的COLLATE和表上设置的一样。

以上就是关于mysql的COLLATE相关知识。不过，在系统设计中，我们还是要尽量避免让系统严重依赖中文字段的排序结果，在mysql的查询中也应该尽量避免使用中文做查询条件。