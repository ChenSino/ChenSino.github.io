---
title: Mysql主从复制部署
date: 2021-11-27
author: chensino
publish: true
isOriginal: true
---

## 参考博客

<https://juejin.cn/post/7160580280682545166#heading-23>

<https://blog.csdn.net/qq_36357242/article/details/136211471>

## compose地址

<https://github.com/ChenSino/mysql-replica.git>

## 部署单向主从

~~~shell
#启动容器
docker compose up -d
~~~

**主库中操作**

~~~shell
#进入主库
docker exec -it mysql-master mysql -uroot -p123456

#为了避免从服务复制出现权限不足的情况需要执行
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

# 查看状态
SHOW MASTER STATUS;

+-------------------+----------+--------------+------------------+------------------------------------------------------------------------------------+
| File              | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                                                                  |
+-------------------+----------+--------------+------------------+------------------------------------------------------------------------------------+
| master-bin.000003 |     1492 | test_db      |                  | efa1b6c2-ac9d-11ef-9800-0242ac120002:1-3,
efbc16db-ac9d-11ef-9665-0242ac120003:1-3 |
+-------------------+----------+--------------+------------------+------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

~~~

上面`SHOW MASTER STATUS;`结果中的File 和 Position 的值需要记下，在从库中会用到

**从库中的操作**

~~~shell
#进入从库
docker exec -it mysql-slave mysql -uroot -p123456

# 进入从库mysql后执行，指定主库的信息，这里注意host使用的容器名字，port是容器内端口，SOURCE_LOG_FILE和SOURCE_LOG_POS就是在主库获取的，mysql8以上版本使用CHANGE REPLICATION SOURCE 代替CHANGE MASTER
CHANGE REPLICATION SOURCE TO 
    SOURCE_HOST='mysql-master', 
    SOURCE_USER='root', 
    SOURCE_PASSWORD='123456',   #
    SOURCE_PORT=3306, 
    SOURCE_LOG_FILE='master-bin.000003', 
    SOURCE_LOG_POS=479;
START REPLICA;

#查看主从配置状态
SHOW REPLICA STATUS\G;
~~~
 
当`SHOW REPLICA STATUS\G;`结果的以下字段为yes就ok了，若不是yes会在返回的而信息提供错误信息
 
 ~~~shell
  Slave_IO_Running: Yes
  Slave_SQL_Running: Yes
~~~




## 部署主主复制（互为主从）

在以上步骤基础上，把从库也复制到主库，需要把主库的源指向从库

**在从库中执行**
~~~shell
#为了避免从服务复制出现权限不足的情况需要执行
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
 
# 查看状态
SHOW MASTER STATUS;
~~~

**在主库执行**
SOURCE_LOG_FILE和SOURCE_LOG_POS是在从库获取到的
~~~shell
#配置主服务器复制
CHANGE REPLICATION SOURCE TO 
    SOURCE_HOST='mysql-slave', 
    SOURCE_USER='root', 
    SOURCE_PASSWORD='123456', 
    SOURCE_PORT=3306, 
    SOURCE_LOG_FILE='slave-bin.000003', 
    SOURCE_LOG_POS=761;
START REPLICA;

 
#开始复制
START SLAVE;
 
#查看主从配置状态
SHOW REPLICA STATUS\G;
~~~


## 重启操作

当mysql重启后，在从库查看`show slave status`会发现状态不对，需要重新操作

~~~shell
#在从库中执行
stop slave;
reset slave;

#在主库执行
show master status;


# 在从库重新执行（SOURCE_LOG_FILE，SOURCE_LOG_POS要切换为主库的）
CHANGE REPLICATION SOURCE TO 
    SOURCE_HOST='mysql-slave', 
    SOURCE_USER='root', 
    SOURCE_PASSWORD='123456', 
    SOURCE_PORT=3306, 
    SOURCE_LOG_FILE='slave-bin.000003', 
    SOURCE_LOG_POS=761;
START REPLICA;
~~~
