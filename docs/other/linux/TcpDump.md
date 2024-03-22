---
title: tcpdump抓包
date: 2022-05-07
author: chenkun
publish: true
keys:
---
简要介绍Linux抓报
<!--more-->

> 作为web开发我抓报主要是针对http请求，主要是看请求行，请求头，请求体，以及响应

### 1、所用抓报命令

```bash
sudo tcpdump tcp -i eth1 -t -s 0 -c 100 and dst port ! 22 and src net 192.168.1.0/24 -w ./target.cap
```

(1)tcp: ip icmp arp rarp 和 tcp、udp、icmp这些选项等都要放到第一个参数的位置，用来过滤数据报的类型
(2)-i enp3s0f1 : 只抓经过接口eth1的包
(3)-t : 不显示时间戳
(4)-s 0 : 抓取数据包时默认抓取长度为68字节。加上-S 0 后可以抓到完整的数据包
(5)-c 100 : 只抓取100个数据包
(6)dst port ! 22 : 不抓取目标端口是22的数据包
(7)src net 192.168.1.0/24 : 数据包的源网络地址为192.168.1.0/24
(8)-w ./target.cap : 保存成cap文件，方便用ethereal(即wireshark)分析

### 2、抓包后的处理

```sh
#把所抓的报文解析成可阅读的文本
strings target.cap>temp.txt
```

### 3、其他使用实例

```sh
# port指定要抓包端口，
sudo tcpdump tcp -i enp3s0f1  -t -s 0 -c 100 and port 6061 -w  ./target.cap
```
