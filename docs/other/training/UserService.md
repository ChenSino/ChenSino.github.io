---
title: 用服项目交接
date: 2023-03-14
isOriginal: true
---


## 1、用服中控

### 1.1 源码

> **仓库有权限，访问需要事先申请帐号权限**

| 项目                 | 代码地址                                                     | 备注 |
| -------------------- | ------------------------------------------------------------ | ---- |
| web前端              | http://gitlab.sonoscape.com/general_software/web/aftermarket/central_control_system_front.git |      |
| 开立GO工程师版小程序 | http://gitlab.sonoscape.com/general_software/web/aftermarket/mina-ccm.git |      |
| 开立GO（医生端）     | http://gitlab.sonoscape.com/general_software/web/aftermarket/wechat-hospital.git |      |
| 后端                 | http://gitlab.sonoscape.com/general_software/web/aftermarket/central_control_system_back.git |      |



### 1.2 各个子项目说明

如下图，中控共 包含4个子项目，数据的来源是在两个小程序，经过后端处理写入数据库，中控前端是最终系统的管理页面，其中各子项目的作用如下表：

| 项目            | 说明                                                         | 备注                                     |
| --------------- | ------------------------------------------------------------ | ---------------------------------------- |
| 开立GO-工程师版 | 1. 现场工程师录单（装机、保养、维修、备件安装）<br />2. 数据查看（医院数据、历史工单等）<br />3. 主机制造数据查看<br />4.医院管理（在小程序新增、编辑医院） | 主机制造数据是中控调用另一个系统接口获得 |
| 开立GO-医生版   | 医生扫机器上的保修二维码进行报修                             |                                          |
| 中控web前端     | 1. 管理员对系统进行管理<br />2. 领导对员工工单进行查看和管理<br />3. 简单报表统计 |                                          |
| 中控后端        | 业务逻辑处理                                                 |                                          |

![1.2-1](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230216095845968.png)



| 模块           | 功能                       | 备注 |
| -------------- | -------------------------- | ---- |
| ccs-register   | nacos注册中心              |      |
| ccs-tx-manager | 分布式事务                 |      |
| ccs-upms-biz   | 系统权限管理               |      |
| ccs-auth       | oauth授权中心              |      |
| ccs-gateway    | 网关                       |      |
| ccs-panel-biz  | 首页大看板对应的后端微服务 |      |
| ccs-data-biz   | 核心业务模块               |      |



### 1.3 文档

《用服中控平台设计文档》

https://pig4cloud.com/data/doc

### 1.4 部署运维

#### 1.4.1 帐号密码

| 服务器                 | 帐号 | 密码      | 备注 |
| ---------------------- | ---- | --------- | ---- |
| 10.10.102.106 测试环境 | root | sonoscape |      |
| 159.135.46.48 生产环境 | root | Sono@bom  |      |

**系统帐号**

| 访问地址                             | 帐号  | 密码          | 备注                                                         |
| ------------------------------------ | ----- | ------------- | ------------------------------------------------------------ |
| http://h.sonoscape.com/ 生产环境     | admin | 2021Sonoscape |                                                              |
| http://10.10.102.106:18888/ 测试环境 | admin | 123456        |                                                              |
| http://domain:9999/swagger-ui.html |       |               | 1. 用户帐号+密文，需自行加密获得密文；2.客户端id和密钥为test/test,具体请参考数据库中oauth的客户端信息表 |

![image-20230216141620566](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230216141620566.png)

**中间件帐号**

| 中间件         | 服务器        | 帐号 | 密码         | 端口 | 备注                                                         |
| -------------- | ------------- | ---- | ------------ | ---- | ------------------------------------------------------------ |
| redis 生产环境 | 159.135.45.48 |      | sonoscape    | 6379 | 仅内网访问                                                   |
| redis 测试环境 | 10.10.102.105 |      | sonoscape    | 6379 |                                                              |
| mysql 生产环境 | 159.138.45.48 | root | Sono@web2022 | 3388 |                                                              |
| frp生产环境    | 159.138.45.48 |      | sonoscape    | 7000 | 内网穿透，目录地址`/usr/local/webserver/frp_0.35.1_linux_amd64` |



#### 1.4.2 部署

**测试环境**

~~~markdown

后端部署路径:`/home/ccs`

后端日志：`/home/ccs/logs`

前端路径：`/home/ccs/dist`

前端nginx配置路径：`/usr/local/webserver/nginx/conf/sites-enabled/ccs-18888-106.conf`
~~~

**生产环境**

```markdown
后端部署路径:`/home/central_control_system_back`

后端日志：`/home/central_control_system_back/logs`

前端路径：`/home/central_control_system_front/dist`

前端nginx配置路径：`/usr/local/webserver/nginx/conf/site-enable/ccs.conf`
```



**部署**

```markdown
1. 部署前配置hosts
	127.0.0.1 ccs-register ccs-gateway ccs-redis ccs-mysql ccm-mysql device-mysql
2. 前端启动nginx即可访问
3. 后端基于SpringCloud+Spring Gateway + Nacos，启动顺序如下：
    ccs-register.jar -> ccs-tx-manager.jar -> ccs-upms-biz.jar -> ccs-auth.jar -> ccs-gateway.jar -> ccs-data-biz.jar -> 
    ccs-panel-biz.jar -> ccs-ccmoa-biz.jar
    理论上只要保证前4个启动顺序即可，其他随意
4. 目前测试环境针对核心业务模块ccs-data做了jenkins自动化部署，提交代码会自动触发，具体可以查看jenkins流水线
	后端：http://10.10.102.105:8899/jenkins/user/chenxk/my-views/view/%E9%99%88%E5%85%88%E6%98%86/job/ccs_back/
	前端：http://10.10.102.105:8899/jenkins/user/chenxk/my-views/view/%E9%99%88%E5%85%88%E6%98%86/job/ccs_front/
```

## 2、用服bom

### 2.1 源码

| 模块 | 仓库地址                                                     |      |      |
| ---- | ------------------------------------------------------------ | ---- | ---- |
| 前端 | http://gitlab.sonoscape.com/general_software/web/aftermarket/sono_bom_web |      |      |
| 后端 | http://gitlab.sonoscape.com/general_software/web/aftermarket/sono_bom_config |      |      |

### 2.2 文档

### 2.3 部署运维

#### 2.3.1 帐号密码

| 服务器                 | 帐号 | 密码      | 备注 |
| ---------------------- | ---- | --------- | ---- |
| 10.10.102.106 测试环境 | root | sonoscape |      |
| 159.135.46.48 生产环境 | root | Sono@bom  |      |

**系统帐号**

| 访问地址                             | 帐号  | 密码   | 备注 |
| ------------------------------------ | ----- | ------ | ---- |
| http://serbom.sonoscape.net 生产环境 | admin | 123456 |      |

**中间件帐号**

| 中间件         | 服务器        | 帐号 | 密码         | 端口 | 备注       |
| -------------- | ------------- | ---- | ------------ | ---- | ---------- |
| redis 生产环境 | 159.135.45.48 |      | sonoscape    | 6379 | 仅内网访问 |
| redis 测试环境 | 10.10.102.105 |      | sonoscape    | 6379 |            |
| mysql 生产环境 | 159.138.45.48 | root | Sono@web2022 | 3388 | 2.3.2      |

#### 2.3.2 部署

```markdown
1. 前端
	部署路径：`/home/sono_bom_web/dist`
	nginx配置： `/usr/local/webserver/nginx/conf/nginx.conf`
2. 后端
	部署路径：`/home/sono_bom`
	springboot配置： `/home/sono_bom/config`
	日志路径：`/home/sono_bom/logs`
	启动脚本： `/home/sono_bom/startBom.sh`
	
```

## 3.预算编辑工具

### 3.1源码

| 模块 | 仓库路径                                                     |
| ---- | ------------------------------------------------------------ |
| 前端 | http://gitlab.sonoscape.com/general_software/web/aftermarket/central_control_system_front.git |
| 后端 | http://gitlab.sonoscape.com/general_software/web/aftermarket/budget_edit_back.git |

### 3.2文档

### 3.3.1部署

| 中间件        | 服务器        | 账号 | 密码      | 端口 | 备注 |
| ------------- | ------------- | ---- | --------- | ---- | ---- |
| mysql测试环境 | 10.10.102.105 | root | sonoscope | 3306 | 内网 |
| redis测试环境 | 10.10.102.105 |      | sonoscope | 6379 |      |

## 4.ERP条码-设备追踪同步功能

### 4.1源码

| 模块 | 仓库路径                                                     |
| ---- | ------------------------------------------------------------ |
| 后端 | http://webgit.sonoscape.com/administrator/sono_barcode_timer |

### 4.2文档

#### 4.2.1交接文档

《ERP条码-设备追踪同步功能》

#### 4.2.2接口文档

http://10.10.102.85:6024/swagger-ui.html#/

## 5、其他

### 5.1 数据备份

数据库备份使用的crontab,具体请查看脚本

```shell
$ crontab -l
0 3 * * * sh /home/data/mysqlbackup/bom/bombackup.sh
0 0 * * * sh /home/data/mysqlbackup/ccs/ccsbackup.sh
```

