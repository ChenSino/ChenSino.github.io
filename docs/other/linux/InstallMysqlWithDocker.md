---
title: 使用docker安装mysql
date: 2022-10-08
author: chenkun
publish: true
keys:
category:
---

## 1. 不要用太新的版本

安装一定要选对版本，刚开始我使用的8.0.30镜像，一直无法启动，日志报错大概意思是我映射的目录有问题，应该是新版本mysql的安装文件有变动，
我也懒得去深究，直接换了一个版本就好了了。

## 2 安装

```bash
# 1. 下载镜像
docker pull mysql:8.0.23
# 2. 启动
docker run -p 3306:3306 --name mysql \
-v /usr/local/docker/mysql/mysql-files:/var/lib/mysql-files \
-v /usr/local/docker/mysql/conf:/etc/mysql \
-v /usr/local/docker/mysql/logs:/var/log/mysql \
-v /usr/local/docker/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:8.0.23
```
