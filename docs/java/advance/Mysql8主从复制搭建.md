---
title: mysql8搭建主从复制
permalink: /pages/256670/
categories:
  - java
  - middle
tags:
  - 
---
### 1、mysql主从复制

##### 1.1 搭建主从复制目的？

> 为了实现读写分离，解决数据库性能问题，读写分离中，“读”的数据是从哪里来呢？其实他是从“写”库copy过来的

##### 1.2 使用docker搭建基于mysql8的主从复制

1. 创建容器

   ```shell
   docker run --name mysql_master -p 3001:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
   ```

   这一步创建容器的目的是查看那以及获取mysql配置文件，然后把它的配置文件copy到宿主机，这样方便直接在宿主机修改mysql配置，如果不事先把mysql配置文件获取出来，直接用docker的-v去挂载的话会有问题，无法达到把docker容器配置映射到宿主机的目的（可能是我的方式不对）

2. 把容器内mysql配置copy到宿主机，配置文件在/etc/mysql，直接把整个目录copy到宿主机

   ```shell
   docker cp 容器ID@:/etc/mysql /home/user/master #master 库的配置，路径可以自由在指定
   docker cp 容器ID@:/etc/mysql /home/user/slave  #slave库配置
   ```

3. 分别修改master和slave的配置文件my.cnf，在mysqld下增加以下内容

   master配置

   ```shell
   [mysqld]
   ## 设置server_id，一般设置为IP最后一位，直接写ip会报错，同一局域网内注意要唯一
   server_id=100  
   ## 复制过滤：也就是指定哪个数据库不用同步（mysql库一般不同步）
   binlog-ignore-db=mysql  
   ## 开启二进制日志功能，可以随便取，最好有含义（关键就是这里了）
   log-bin=edu-mysql-bin  
   ## 为每个session 分配的内存，在事务过程中用来存储二进制日志的缓存
   binlog_cache_size=1M  
   ## 主从复制的格式（mixed,statement,row，默认格式是statement）
   binlog_format=mixed  
   ## 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
   expire_logs_days=7  
   ## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
   ## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
   slave_skip_errors=1062  
   ```

   slave配置

   ```shell
   [mysqld]
   ## 设置server_id，一般设置为IP最后一位，直接写ip会报错，同一局域网内注意要唯一
   server_id=101  
   ## 复制过滤：也就是指定哪个数据库不用同步（mysql库一般不同步）
   binlog-ignore-db=mysql  
   ## 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
   log-bin=edu-mysql-slave1-bin  
   ## 为每个session 分配的内存，在事务过程中用来存储二进制日志的缓存
   binlog_cache_size=1M  
   ## 主从复制的格式（mixed,statement,row，默认格式是statement）
   binlog_format=mixed  
   ## 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
   expire_logs_days=7  
   ## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
   ## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
   slave_skip_errors=1062  
   ## relay_log配置中继日志
   relay_log=edu-mysql-relay-bin  
   ## log_slave_updates表示slave将复制事件写进自己的二进制日志
   log_slave_updates=1  
   ## 防止改变数据(除了特殊的线程)
   read_only=1  
   ```

4. 删除刚启动的容器，当然不删除也无所谓，我们启动它主要是获取里面的mysql配置，好方便映射出来

   ```shell
   docker ps #查看容器id
   docker rm -f mysql容器id
   ```

5. 启动master

   ```/home/chenkun/DockerConfigs/mysql-cluster/master/mysql```是第二步设置的

   ```shell
   docker run --name mysql_master -p 3001:3306 -e MYSQL_ROOT_PASSWORD=root -v /home/chenkun/DockerConfigs/mysql-cluster/master/mysql:/etc/mysql -d mysql:latest
   ```

6. 查看master的状态，这一步查询结果后续第9步slave会用到

   ```shell
   $ mysql -h 127.0.0.1 -P 3001 -uroot -proot
   
   mysql> show master status;
   +----------------------+----------+--------------+------------------+-------------------+
   | File                 | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
   +----------------------+----------+--------------+------------------+-------------------+
   | edu-mysql-bin.000003 |      396 |              | mysql            |                   |
   +----------------------+----------+--------------+------------------+-------------------+
   1 row in set (0.00 sec)
   ```

7. 在master添加一个账户，并给用户授权，目的是给slave用来从master同步数据用的（创建用户建议用navicat，因为要选择插件为mysql_native_password）

   ![image-20210930101337807](/home/chenkun/TyporaProjects/学习/mysql8搭建主从复制.assets/image-20210930101337807.png)

   ```shell
   #如果非要使用命令行创建用户使用以下命令（推荐使用navicat）
   mysql>CREATE USER 'slave'@'%' IDENTIFIED BY 'root';
   mysql>user mysql
   mysql>update user set plugin='mysql_native_password' where user = slave;
   ```
   
   
   
   ```shell
   mysql> GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';   # 授权给slave
   ```
   
8. 启动slave

   ```shell
   # 映射到宿主机3002端口，挂载其对应的配置目录
   docker run --name mysql_slave -p 3002:3306 -e MYSQL_ROOT_PASSWORD=root -v /home/chenkun/DockerConfigs/mysql-cluster/slave/mysql:/etc/mysql -d mysql:latest
   ```

9. 查看宿主机的ip,设置和master的关联（注意此处不能用localhost以及127.0.0.1，在容器中使用localhost指向的是容器而不是宿主机）

   ```shell
   docker inspect 容器id #在返回结果找ip,172.17.x.x
   ```

   172.17.0.2是master容器的ip,slave是第7步在master建立的用户，root是密码  ，edu-mysql-bin.000003和master_log_pos是第6步查询的解雇哦

   ```shell
   ##记得先进入先进入slave库，在mysql命令行执行以下
   mysql> change master to master_host='172.17.0.2', master_user='slave', master_password='root', master_port=3306, master_log_file='edu-mysql-bin.000003', master_log_pos=156, master_connect_retry=30; 
   ```

10. 启动slave

    ```shell
    mysql>start slave;
    ```

11. 查看slave状态，13、14行为yes就ok了，如果连接失败在47行Slave_SQL_Running_State会报失败原因

```shell
mysql> show slave status\G;
*************************** 1. row ***************************
               Slave_IO_State: Waiting for source to send event
                  Master_Host: 172.17.0.2
                  Master_User: slave
                  Master_Port: 3306
                Connect_Retry: 30
              Master_Log_File: edu-mysql-bin.000003
          Read_Master_Log_Pos: 396
               Relay_Log_File: edu-mysql-relay-bin.000002
                Relay_Log_Pos: 568
        Relay_Master_Log_File: edu-mysql-bin.000003
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes啦v哦
              Replicate_Do_DB:
          Replicate_Ignore_DB:
           Replicate_Do_Table:
       Replicate_Ignore_Table:
      Replicate_Wild_Do_Table:
  Replicate_Wild_Ignore_Table:
                   Last_Errno: 0
                   Last_Error:
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 396
              Relay_Log_Space: 781
              Until_Condition: None
               Until_Log_File:
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File:
           Master_SSL_CA_Path:
              Master_SSL_Cert:
            Master_SSL_Cipher:
               Master_SSL_Key:
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error:
               Last_SQL_Errno: 0
               Last_SQL_Error:
  Replicate_Ignore_Server_Ids:
             Master_Server_Id: 2
                  Master_UUID: dc6dff8a-218e-11ec-b936-0242ac110002
             Master_Info_File: mysql.slave_master_info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: Replica has read all relay log; waiting for more updates
           Master_Retry_Count: 86400
                  Master_Bind:
      Last_IO_Error_Timestamp:
     Last_SQL_Error_Timestamp:
               Master_SSL_Crl:
           Master_SSL_Crlpath:
           Retrieved_Gtid_Set:
            Executed_Gtid_Set:
                Auto_Position: 0
         Replicate_Rewrite_DB:
                 Channel_Name:
           Master_TLS_Version:
       Master_public_key_path:
        Get_master_public_key: 0
            Network_Namespace:
1 row in set, 1 warning (0.01 sec)
```

12. 测试主从同步

    在master随便加一个库看看能否自动同步到slave

### 2、使用mybatis-plus实现读写分离（mysql的主从复制是实现读写分离的基础）

##### 2.1 参考文档

[mybatis-plus多数据源](https://mp.baomidou.com/guide/dynamic-datasource.html#%E6%96%87%E6%A1%A3-documentation)

##### 2.2 java工程

mybatis-plus实现多数据源特别简单，只需要引入多数据源的包，再到springboot配置文件配置一下就ok了

```xml
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
  <version>${version}</version>
</dependency>
```



```yml
spring:
  application:
    name: mybatisplus
  datasource:
    dynamic:
      primary: master
      strict: false
      datasource:
        master:
          #    url: jdbc:mysql:///mybatis_p
          #    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
          url: jdbc:p6spy:mysql://localhost:3001/mybatis_p  #使用p6spy在开发环境监控，生产环境不要使用
          username: root
          password: root
          driver-class-name: com.p6spy.engine.spy.P6SpyDriver
        slave_1:
          #    url: jdbc:mysql:///mybatis_p
          url: jdbc:p6spy:mysql://localhost:3002/mybatis_p
          username: queryUser
          password: 123456
          driver-class-name: com.p6spy.engine.spy.P6SpyDriver
```

##### 2.3 数据库设置

1. 在master库使用脚本创建一个数据库，会自动同步到slave

```sql
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '姓名',
  `age` int DEFAULT NULL COMMENT '年龄',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '邮箱',
  `grade` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1443412902525784067 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

2. 用管理员主那个胡登陆到slave库创建一个用户，给其设置只查询权限（和之前slave帐号是两回事）防止在slave库写入数据

   ```shell
   mysql> CREATE USER 'queryUser'@'host' IDENTIFIED BY '123456';  # 添加用户
   mysql> GRANT SElECT ON *.* TO 'queryUser'@'%';					# 设置查询权限
   ```

##### 2.4 测试通过java读写分离是否成功

1. 在master随便加一个user用户（会自动同步到slave）

2. 到slave库中用管理员用户修改一下同步过来的数据（和master进行区分，方便知道查询的哪个库）

3. 分别查询两个库，看看是否得到的不一样的结果。这一步用@DS("slave_1")切换到从库，**注意不要在单元测试中使用@DS,不会生效的**

   ```java
       @GetMapping("/slave-list")
       @DS("slave_1")
       public List<User> userListSlave() {
           return userService.list();
       }
   
       @GetMapping("/master-list")
       public List<User> userListMaster() {
           return userService.list();
       }
   ```

4. 对比请求结果，发现两次查询的name不一样，说明成功了

   http://192.168.92.31:8080/slave-list 访问结果

   ```json
   [
       {
           "id": 1443412093146714113,
           "name": "张三",
           "age": 10,
           "email": "aaa.@com",
           "grade": "SECONDARY"
       }
   ]
   ```

   http://192.168.92.31:8080/master-list 访问结果

```json
[
    {
        "id": 1443412093146714113,
        "name": "李四",
        "age": 10,
        "email": "aaa.@com",
        "grade": "SECONDARY"
    }
]

```

##### 2.5 、测试代码地址

[github](https://github.com/chen462488588/afatpig)

