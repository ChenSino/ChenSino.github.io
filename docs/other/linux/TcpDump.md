---
title: tcpdump抓包
date: 2021-05-07
author: chenkun
publish: true
keys:
---
简要介绍Linux抓报
<!--more-->

> 作为web开发我抓报主要是针对http请求，主要是看请求行，请求头，请求体，以及响应

### 1、所用抓报命令

~~~bash
sudo tcpdump tcp -i eth1 -t -s 0 -c 100 and dst port ! 22 and src net 192.168.1.0/24 -w ./target.cap
~~~

(1)tcp: ip icmp arp rarp 和 tcp、udp、icmp这些选项等都要放到第一个参数的位置，用来过滤数据报的类型
(2)-i enp3s0f1 : 只抓经过接口eth1的包
(3)-t : 不显示时间戳
(4)-s 0 : 抓取数据包时默认抓取长度为68字节。加上-S 0 后可以抓到完整的数据包
(5)-c 100 : 只抓取100个数据包
(6)dst port ! 22 : 不抓取目标端口是22的数据包
(7)src net 192.168.1.0/24 : 数据包的源网络地址为192.168.1.0/24
(8)-w ./target.cap : 保存成cap文件，方便用ethereal(即wireshark)分析

### 2、抓包后的处理

~~~sh
#把所抓的报文解析成可阅读的文本
strings target.cap>temp.txt
~~~

### 3、其他使用实例

~~~sh
# port指定要抓包端口，
sudo tcpdump tcp -i enp3s0f1  -t -s 0 -c 100 and port 6061 -w  ./target.cap
~~~

~~~shell
#抓包dns解析
 tcpdump -n -i any port 53

# 返回结果

09:18:34.758122 IP 172.30.172.203.57281 > 39.96.153.39.domain: 60693+ A? ddns.chensina.cn. (34)
09:18:34.785945 IP 39.96.153.39.domain > 172.30.172.203.57281: 60693*- 1/0/0 A 111.175.28.51 (50)
09:18:47.417797 IP 172.30.172.203.53346 > 100.100.2.136.domain: 59542+ [1au] A? cn-hangzhou.axt.aliyun.com. (55)
09:18:47.417828 IP 172.30.172.203.54727 > 100.100.2.136.domain: 43247+ [1au] AAAA? cn-hangzhou.axt.aliyun.com. (55)
~~~
