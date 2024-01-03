---
title: docker compose部署elasticsearch和kibana（版本8.11）
tags: docker
categories: docker
date: 2024-01-03
author: chensino
publish: true
---

### 1、流程

1. 启动elasticsearch和kibana服务，仅做临时使用
2. 从临时容器中复制出所需的文件到容器外到指定位置（目的是方便在容器外修改配置，映射数据到容器外防丢失）
3. 根据需要分别修改elasticsearch和kibana的配置文件
4. 添加volums映射，在docker compose中映射第二步复制出来的文件到容器内
5. docker compose启动
6. 到elastic容器中设置密码
7. 修改kibana配置，设置elastic对应账号密码等必要字段

### 2、准备 docker compose

```yml
version: '3'
services:
  chensino-elasticsearch:
    restart: no
    container_name: chensino-elasticsearch
    image: elasticsearch:8.11.3
    hostname: chensino-elasticsearch
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      - bootstrap.memory_lock=true
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits: # 栈内存的上限
      memlock:
        soft: -1    # 不限制
        hard: -1    # 不限制
    volumes:
      - ./elasticsearch/data:/usr/share/elasticsearch/data
      - ./elasticsearch/logs:/usr/share/elasticsearch/logs
      - ./elasticsearch/config:/usr/share/elasticsearch/config
      - ./elasticsearch/plugins:/usr/share/elasticsearch/plugins
    networks:
      - custom

  chensino-kibana:
    restart: no
    container_name: chensino-kibana
    image: kibana:8.11.3
    environment:
      - ELASTICSEARCH_HOSTS=http://chensino-elasticsearch:9200
    ports:
      - "5601:5601"
    volumes:
      - ./kibana/config:/usr/share/kibana/config
    networks:
      - custom
    depends_on:
      - chensino-elasticsearch
networks:
  custom:
    driver: bridge
    ipam:
      config:
        - subnet: 172.55.0.0/16
          gateway: 172.55.0.1
```

### 3、开始部署

按照第一节的流程部署

#### 3.1  部署临时elastic和kibana（目的是从容器获取配置）

直接在我们写好的compose文件基础上把volumes先去掉，直接启动`docker compose up`

```yml
version: '3'
services:
  chensino-elasticsearch:
    restart: no
    container_name: chensino-elasticsearch
    image: elasticsearch:8.11.3
    hostname: chensino-elasticsearch
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      - bootstrap.memory_lock=true
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits: # 栈内存的上限
      memlock:
        soft: -1    # 不限制
        hard: -1    # 不限制
    networks:
      - custom

  chensino-kibana:
    restart: no
    container_name: chensino-kibana
    image: kibana:8.11.3
    environment:
      - ELASTICSEARCH_HOSTS=http://chensino-elasticsearch:9200
    ports:
      - "5601:5601"
    networks:
      - custom
    depends_on:
      - chensino-elasticsearch


networks:
  custom:
    driver: bridge
    ipam:
      config:
        - subnet: 172.55.0.0/16
          gateway: 172.55.0.1
```

#### 3.2 从容器复制文件到宿主机

```shell
##准备好文件夹
mkdir elasticsearch
mkdir kibana
```



```shell
##elasticsearch
docker cp chensino-elasticsearch:/usr/share/elasticsearch/config  ./elasticsearch
docker cp chensino-elasticsearch:/usr/share/elasticsearch/data  ./elasticsearch
docker cp chensino-elasticsearch:/usr/share/elasticsearch/plugins  ./elasticsearch
docker cp chensino-elasticsearch:/usr/share/elasticsearch/logs  ./elasticsearch
```



```yml
#kibana
docker cp chensino-kibana:/usr/share/kibana/config  ./kibana
```

```shell
#清除临时容器
docker compose down
```

#### 3.3 修改配置



```yml
##elasticsearch.yml

cluster.name: "docker-cluster"
network.host: 0.0.0.0

#----------------------- BEGIN SECURITY AUTO CONFIGURATION -----------------------
#
# The following settings, TLS certificates, and keys have been automatically      
# generated to configure Elasticsearch security features on 03-01-2024 00:55:03
#
# --------------------------------------------------------------------------------

# Enable security features
xpack.security.enabled: true

xpack.security.enrollment.enabled: true

# Enable encryption for HTTP API client connections, such as Kibana, Logstash, and Agents
xpack.security.http.ssl:
  enabled: false

# Enable encryption and mutual authentication between cluster nodes
xpack.security.transport.ssl:
  enabled: false
#----------------------- END SECURITY AUTO CONFIGURATION -------------------------

# 是否支持跨域
http.cors.enabled: true
# 表示支持所有域名
http.cors.allow-origin: "*"
# 内存交换的选项，官网建议为true
bootstrap.memory_lock: true
```



```yml
####kibana.yml 
#
# ** THIS IS AN AUTO-GENERATED FILE **
#
i18n.locale: zh-CN
# Default Kibana configuration for docker target
server.host: "0.0.0.0"
server.shutdownTimeout: "5s"
elasticsearch.hosts: [ "http://chensino-elasticsearch:9200" ]
monitoring.ui.container.elasticsearch.enabled: true

elasticsearch.username: kibana_system
elasticsearch.password: "123456"
```

#### 3.4 把volumes映射加上，重新启动容器

使用如下compose文件`docker compose up`启动

```yml
version: '3'
services:
  chensino-elasticsearch:
    restart: no
    container_name: chensino-elasticsearch
    image: elasticsearch:8.11.3
    hostname: chensino-elasticsearch
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      - bootstrap.memory_lock=true
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits: # 栈内存的上限
      memlock:
        soft: -1    # 不限制
        hard: -1    # 不限制
    volumes:
      - ./elasticsearch/data:/usr/share/elasticsearch/data
      - ./elasticsearch/logs:/usr/share/elasticsearch/logs
      - ./elasticsearch/config:/usr/share/elasticsearch/config
      - ./elasticsearch/plugins:/usr/share/elasticsearch/plugins
    networks:
      - custom

  chensino-kibana:
    restart: no
    container_name: chensino-kibana
    image: kibana:8.11.3
    environment:
      - ELASTICSEARCH_HOSTS=http://chensino-elasticsearch:9200
    ports:
      - "5601:5601"
    volumes:
      - ./kibana/config:/usr/share/kibana/config
    networks:
      - custom
    depends_on:
      - chensino-elasticsearch
networks:
  custom:
    driver: bridge
    ipam:
      config:
        - subnet: 172.55.0.0/16
          gateway: 172.55.0.1
```



#### 3.5 进入elastic容器修改密码

```shell
# 重置 elastic 用户密码
docker exec -it chensino-elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -uelastic

# 提示如下 输入 y：
This tool will reset the password of the [elastic] user to an autogenerated value.
The password will be printed in the console.
Please confirm that you would like to continue [y/N]

# 输入后显示结果 xxxxxx 即为密码（这里注意elastic账号的密码和kibana.yml是要一致）
Password for the [elastic] user successfully reset.
New value: xxxxxx


```



#### 3.6 重启服务

```shell
docker compose down 
docker compose up
```



### 5、解决datagrip无法连接elasticsearch的问题

#### 5.1 驱动问题

1. 从[官网](https://www.elastic.co/cn/downloads/jdbc-client)下载最新驱动

![image-20240103101223298](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20240103101223298.png)

2. 在DataGrip使用刚下载的包

   ![image-20240103101340693](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20240103101340693.png)![image-20240103101359834](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20240103101359834.png)

#### 5.2 license问题

使用datagrip连elastic报错`current license is non-compliant for [jdbc]`，参考[此处博客](https://blog.csdn.net/JavaBigData/article/details/134126024)做一些调整，他的这个无需账号密码，最新的8.11.3需要带密码，密码就是在elasticsearch容器设置的，在他的 基础上携带用户名密码（密码修改为自己的），如下：

```shell
 curl  -k --header "Content-Type: application/json;charset=UTF-8" --user elastic:123456 -X POST "localhost:9200/_license/start_trial?acknowledge=true&pretty"
 
 
 ##响应
 {
  "acknowledged" : true,
  "trial_was_started" : true,
  "type" : "trial"
}
```

