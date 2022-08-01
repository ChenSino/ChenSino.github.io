---
title: Mysql CPU负载过高
date: 2022-07-20
author: chenkun
publish: true
keys:
category:
  - 数据库
---

<!-- more-->

### 问题

> 某天突然收到预警邮件，服务器CPU超过阈值，并且一直持续居高不下

### 分析原因

1. 使用`htop`查看资源消耗，按照CPU使用率降序排列，发现都是mysqld进程占用CPU很高
2. 进入mysql命令行使用`show processlist;`查看当前正在执行的命令，经过多次执行`show processlist`发现有几条固定的sql一直在执行，并且每次传递的参数害不一样

```shell
mysql> show processlist;
+--------+------+-------------------+--------------------------+---------+------+--------------+-----------------------------------------------------------------------------------------------+
| Id     | User | Host              | db                       | Command | Time | State        | Info                                                                                          |
+--------+------+-------------------+--------------------------+---------+------+--------------+-----------------------------------------------------------------------------------------------+
| 130878 | root | localhost:43314   | bomconfig                | Sleep   |   77 |              | NULL                                                                                          |
| 132762 | root | localhost:34342   | ccsx_weibao              | Query   |    0 | Sending data | SELECT vir.*, 1 as business_type
                FROM ccsx_data.v_install_record vir
                WHERE vir.id = 1948  |
| 132841 | root | localhost:42218   | ccsx                     | Sleep   |  574 |              | NULL                                                                                          |
| 132955 | root | localhost:54332   | ccsx                     | Sleep   |  693 |              | NULL                                                                                          |
| 133058 | root | localhost:38132   | bomconfig                | Sleep   |  434 |              | NULL                                                                                          |
| 133243 | root | localhost:58272   | ccsx_data                | Sleep   |  539 |              | NULL                                                                                          |
| 133347 | root | localhost:41100   | ccsx_weibao              | Query   |    0 | Sending data | select * from ccsx_weibao.install_record_accessory where host_id=2106                         |
| 133416 | root | localhost:47832   | international_ccsx_data  | Sleep   |  519 |              | NULL                                                                                          |
| 133454 | root | localhost:51226   | internatinal_ccsx_weibao | Sleep   | 1194 |              | NULL                                                                                          |
| 133459 | root | localhost:51642   | ccsx                     | Sleep   |    1 |              | NULL                                                                                          |
| 133466 | root | localhost:51956   | bomconfig                | Sleep   |  488 |              | NULL                                                                                          |
| 133467 | root | localhost:51958   | bomconfig                | Sleep   |   77 |              | NULL                                                                                          |
| 133469 | root | localhost:52616   | ccsx_data                | Sleep   |  540 |              | NULL                                                                                          |
| 133519 | root | localhost:57874   | ccsx_weibao              | Query   |    0 | Sending data | SELECT vir.*, 1 as business_type
                FROM ccsx_data.v_install_record vir
                WHERE vir.id = 19042 |

```

  经过第2步的执行，猜测有人在for循环中调用了查询，每次传递了不同的参数

3. 为了确定我的分析正确性，复制`show processlist`结果中的sql，到项目代码查询，最终跟踪到如下代码，确实在循环中使用了查询，fuck！

   ```java
   	@Override
   	public List<InstallRecordVO> getInstalls(List<Integer> ids) {
   		List<InstallRecordVO> installRecords = new ArrayList<>();
   		if (CollectionUtil.isNotEmpty(ids)){
   			ids.forEach(t->{
   				InstallRecordVO installRecordVO = installRecordMapper.queryById(t);
   				if(installRecordVO!=null){
   					List<InstallRecordAccessory> installRecordAccessories = installRecordAccessoryMapper.queryByHostId(installRecordVO.getId());
   		//……省略部分代码
   					List<SysFile> sysFileList = sysFileMapper.queryByBusinessInfo(paramMap);
   		//……省略部分代码
   				}
   			});
   		}
   		return installRecords;
   	}
   ```
   
4. 光有以上代码还不能完全确定，这个循环在线上一直在执行，所以我决定使用arthas来进一步确定，于是我把arths attach到生产环境的项目上使用`trace`分别跟踪循环中的三个查询，看看是否正在执行，结果三个全在执行，印证了循环一直在执行，所以cpu问题就出现在这里了。

```shell
trace com.sonoscape.ccs.data.mapper.InstallRecordMapper queryById  -n 5 --skipJDKMethod false 
```

```shell
trace com.sonoscape.ccs.data.mapper.InstallRecordAccessoryMapper queryByHostId  -n 5 --skipJDKMethod false 
```

```shell
trace com.sonoscape.ccs.data.mapper.SysFileMapper queryByBusinessInfo  -n 5 --skipJDKMethod false 
```

5. 最后我找到这部分代码负责人，他的ids参数本应该是个过滤后的，理论上不会太多，结果因为调用函数不严谨导致查询出ids实际上是全表的，吐

### 结论

不要轻易在循环执行sql
