---
title: 使用docker安装常见服务
date:  2022-11-28
keys:
tag:
headerDepth: 4
category:
    - docker
---

## 1. docker安装Redis

> 起初的需求是用docker启动一个redis，并且指定一个配置，死活不成功，主要是少设置了data目录的映射

::: danger 注意
使用docker-compose安装redis时，若指定外置redis.conf配置文件，要切记同时设置data存储目录，默认docker中的数据存在/data下，所以
使用卷映射时需要映射到容器内的/data docker-compose.yml
:::

目录结构如下，需要事先准备一个redis.conf放到项目suc/redis/conf，另外需要创建目录suc/redis/data

```shell
suc
├── redis
│   ├── conf
│   │   └── redis.conf
│   └── data
├── docker-compose.yml

```

```yaml
version: '3'
services:
  suc-redis:
    container_name: suc-redis
    image: redis:6.2.6
    restart: always
    command: redis-server /etc/redis/redis.conf
    volumes:
      - ./redis/conf:/etc/redis  #指定外部配置
      - ./redis/data:/data #指定数据目录，此配置一定要有
    ports:
      - 6379:6379
    networks:
      - custom
```
