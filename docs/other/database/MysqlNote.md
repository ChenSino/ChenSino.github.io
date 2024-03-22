---
title: Mysql知识点记录
date: 2022-06-07
author: chenkun
publish: true
keys:
---

<!--more-->

### 1、批量插入速度慢

> 项目使用的MyBatis-plus批量插入效率很低，遂百度一下原因

在jdbc的链接上加上`rewriteBatchedStatements=true`参数，可以解决此问题。

默认情况下`rewriteBatchedStatements=false`，jdbc批量插入会判断`rewriteBatchedStatements`，当为`true`才会执行批量语句，以下从源码(以下jdbc驱动源码版本为8.0.20)角度分析：

1.  `com.mysql.cj.jdbc.StatementImpl#executeBatch`

```java
  @Override
    public int[] executeBatch() throws SQLException {
        //注意此处打开executeBatchInternal()源码要进入ClientPreparedStatement的executeBatchInternal方法,别进入StatementImpl的executeBatchInternal方法
        return Util.truncateAndConvertToInt(executeBatchInternal()源码要进入());
    }
```

2. `com.mysql.cj.jdbc.ClientPreparedStatement#executeBatchInternal`

```java
protected long[] executeBatchInternal() throws SQLException {
        synchronized (checkClosed().getConnectionMutex()) {

            if (this.connection.isReadOnly()) {
                throw new SQLException(Messages.getString("PreparedStatement.25") + Messages.getString("PreparedStatement.26"),
                        MysqlErrorNumbers.SQL_STATE_ILLEGAL_ARGUMENT);
            }

            if (this.query.getBatchedArgs() == null || this.query.getBatchedArgs().size() == 0) {
                return new long[0];
            }

            // we timeout the entire batch, not individual statements
            int batchTimeout = getTimeoutInMillis();
            setTimeoutInMillis(0);

            resetCancelledState();

            try {
                statementBegins();

                clearWarnings();
				//这里会判断rewriteBatchedStatements的值,只有为true,才会真正进入批量操作
                if (!this.batchHasPlainStatements && this.rewriteBatchedStatements的值,只有为true,才会真正进入批量操作.getValue()) {

                    if (((PreparedQuery<?>) this.query).getParseInfo().canRewriteAsMultiValueInsertAtSqlLevel()) {
                        return executeBatchedInserts(batchTimeout);
                    }

                    if (!this.batchHasPlainStatements && this.query.getBatchedArgs() != null
                            && this.query.getBatchedArgs().size() > 3 /* cost of option setting rt-wise */) {
                        return executePreparedBatchAsMultiStatement(batchTimeout);
                    }
                }
				//如果rewriteBatchedStatements为false则走到这里,看名字中的Serially就知道这个是逐条插入
                return executeBatchSerially(batchTimeout);
            } finally {
                this.query.getStatementExecuting().set(false);

                clearBatch();
            }
        }
    }
```

3. `com.mysql.cj.jdbc.ClientPreparedStatement#executeBatchSerially`

打开源码可看到注释写的很清楚了,是逐条插入

![image-20220607182512020](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220607182512020.png)

**结论:**

使用Mybatis时,批量插入慢,需要在jdbc的url上拼接`rewriteBatchedStatements=true`

### 2、唯一索引

> 唯一索引指的是一个字段的值在表中只能有一个，唯一索引可以有多个字段，比如用户表有姓名、年龄、性别等，当新建一个唯一索引，把姓名、年龄放在同一个唯一索引，代表用户表不允许存在姓名和年龄同时相等记录，姓名和年龄可以有一个相同。
