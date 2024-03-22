---
title: 深入理解TCP/IP
date: 2023-01-30
---


## 1、TCP/IP与OSI的关系

网上学习网络模型时一会是七层osi模型，一会又五层，一会又是四层模型，着实五花八门让人费解，实际上七层模型是osi的标准，目前大家所讲的tcp/ip也是符合osi的标准的，不过是把其中几层合并到一层了而已，[点击查看tcp/ip和osi的关系](https://cloud.tencent.com/developer/article/2003231)。TCP/IP实际上是一个协议簇，包含很多协议，比如TCP、IP、UDP、ICMP、RIP、TELNETFTP、SMTP、ARP、TFTP等，这些协议一起称为TCP/IP协议。常见协议简单介绍：

TCP(Transport Control Protocol)传输控制协议

IP(Internetworking Protocol)网间网协议 

UDP(User Datagram Protocol)用户数据报协议 

ICMP(Internet Control Message Protocol)互联网控制信息协议 

SMTP(Simple Mail Transfer Protocol)简单邮件传输协议 

SNMP(Simple Network manage Protocol)简单网络管理协议 

FTP(File Transfer Protocol)文件传输协议 

ARP(Address Resolation Protocol)地址解析协议 

![20230130104228](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230130104228.png)

![20230130103942](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230130103942.png)

## 2、TCP/IP

完整的osi七层模型，在tcp/ip中被简化为了4层模型，其中应用层、表示层、会话层被压缩成了一个应用层，数据链路层、物理层被压缩为数据链路层。

```mermaid
flowchart LR
    应用层 --> 传输控制层 --> 网络层 --> 链路层
```

### 2.1 应用层

应用层顾名思义退就是和应用相关，既然和应用相关，那么不同应用肯定就不一样，这一部分的东西需要自定义，就是程序员需要实现的，比如HTTP、FTP、SMTP、NFS等。既然是互联网应用，数据传输肯定得有双方，就是我们说的客户端应用、服务端应用，而应用层这里就是制定客户端和服务端交互的规范，说白了就是保证客户端发的东西服务端能识别，服务端发的东西客户端也能识别。以http为例，http中就制定了请求行、请求体、请求头等，发送的时候必须有这些东西，服务端才能够解析，而相应的服务端响应时也得有对应的东西，这样客户端才能够解析出响应信息。这里只是制定规范，真正的传输还要用到后面的tcp,所以通常说http是基于tcp，就是这个道理。

### 2.2 传输控制层（TCP，不讲UDP）

> 关键词： 可靠性、三次握手四次挥手、拆包

tcp负责建立连接，断开连接，控制数据包大小等，建立连接就是常说的三次握手四次挥手。建立连接的过程分为3步：

1. 客户端发送连接请求的标识符SYN
2. 服务端回复SYN+ACK
3. 客户端回复ACK

具体的交互可以使用抓包工具wireshark查看，或者使用tcpdump命令行工具。

```shell
# 先打开监听
sudo tcpdump -nn -i <网卡> port 80
# 访问baidu，端口80
curl https://www.baidu.com
```

[S]： SYN --------发送建立连接请求标志
[.]:  ACK-----点代表ACK
[P]： ---------发送

如下前三行就是三次握手过程，注意看握手成功后，每次客户端给服务端发消息，服务端都会给客户端回复一个[.]，代表确认，这就是为什么说tcp是可靠的连接，反过来也一样，服务端给客户端响应消息，客户端也会回复 一个[.]，
注意看，服务端给客户端发消息时，分了好几次，这就是控制数据包，不是说一次性把所有的数据都返回到客户端，这个大小是受到网卡控制的，体现了tcp对数据包大小的“控制”，

```shell
#客户端发送连接SYN
11:13:07.566166 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [S], seq 889820627, win 64240, options [mss 1460,sackOK,TS val 412117082 ecr 0,nop,wscale 7], length 0
#服务端回复SYN+ACK
11:13:07.609539 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [S.], seq 4077951874, ack 889820628, win 8192, options [mss 1380,sackOK,nop,nop,nop,nop,nop,nop,nop,nop,nop,nop,nop,wscale 5], length 0
#客户端回复ACK连接建立成功
11:13:07.609598 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [.], ack 1, win 502, length 0


#客户端正式发送GET请求
11:13:07.609870 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [P.], seq 1:78, ack 1, win 502, length 77: HTTP: GET / HTTP/1.1
#服务端给客户端回复ack,代表服务端告诉客户端，我收到了你的消息，--------tcp可靠性的体现
11:13:07.648210 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [.], ack 78, win 908, length 0
11:13:07.651005 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [.], seq 1:2721, ack 78, win 908, length 2720: HTTP: HTTP/1.1 200 OK
11:13:07.651006 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [P.], seq 2721:2782, ack 78, win 908, length 61: HTTP
11:13:07.651038 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [.], ack 2721, win 497, length 0
11:13:07.651070 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [.], ack 2782, win 497, length 0
11:13:07.657940 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [P.], seq 2721:2782, ack 78, win 908, length 61: HTTP
11:13:07.657979 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [.], ack 2782, win 501, options [nop,nop,sack 1 {2721:2782}], length 0
11:13:08.652666 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [F.], seq 78, ack 2782, win 501, length 0
11:13:08.788214 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [.], ack 79, win 908, length 0
11:13:08.788215 IP 14.215.177.38.80 > 192.168.189.36.48460: Flags [F.], seq 2782, ack 79, win 908, length 0
11:13:08.788268 IP 192.168.189.36.48460 > 14.215.177.38.80: Flags [.], ack 2783, win 501, length 0
```

### 2.3 网络层

> 关键词：路由表、下一跳

```shell
#查看路由表
route -n
```

传输控制层建立好连接后，对收据也拆好包后，应该把数据包丢给谁呢？
当数据包准备好以后，要从路由表中找到下一跳的位置，如下是我的路由表，我们来举例说明网络层的工作原理。

```shell
$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.189.137 0.0.0.0         UG    20600  0        0 wlp5s0
10.10.0.0       192.168.93.1    255.255.0.0     UG    100    0        0 enp4s0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
192.168.0.0     192.168.93.1    255.255.0.0     UG    100    0        0 enp4s0
192.168.92.0    0.0.0.0         255.255.255.0   U     100    0        0 enp4s0
192.168.93.1    0.0.0.0         255.255.255.255 UH    100    0        0 enp4s0
192.168.189.0   0.0.0.0         255.255.255.0   U     600    0        0 wlp5s0
```

#### 2.3.1 实例1,访问内网走enp4s0网卡

当我们执行`ping 192.168.92.33`，网络层会拿这个ip分别和路由表子网掩码（mask）从大到小分字节按位与计算，

1. 先和第6行255.255.255.255进行与计算，得到的还是192.168.92.33，然后看这个结果是否和网络号Destination是否一致，192.168.92.33和0.0.0.0不一样，继续找下一个路由按照同样的方式计算，直到找到相等的
2. 接下来和第7行255.255.255.0计算，依然不行
3. 接下来和第5行 255.255.255.0计算得到192.168.92.0匹配上了，匹配上之后，再看网关是0.0.0.0代表没有下一跳了，直接把数据包通过对应的enp4s0网卡把数据发出去了

#### 2.3.2 实例2,访问外网走wlp5s0网卡

当我们执行`ping baidu.com`，经过dns拿到百度的ip：110.242.68.66，网络层会拿这个ip分别和路由表子网掩码（mask）从大到小分字节按位与计算，

1. 先和第6行255.255.255.255进行与计算，得到的还是110.242.68.66，然后看这个结果是否和网络号Destination是否一致，110.242.68.66和0.0.0.0不一样，继续找下一个路由按照同样的方式计算，直到找到相等的
2. 接下来和第7行255.255.255.0计算，依然不行
3. 接下来和第5行 255.255.255.0计算得到110.242.68.0 还是不行
4. 一直到和第一行0.0.0.0进行与计算得到0.0.0.0,才匹配上，这时确定到下一跳是192.168.189.137，这个也是我的手机无限热点
那么数据包如何才能准确发送到192.168.189.137这个地址上？这就要用到链路层，继续查看后续章节

### 2.4 数据链路层

> 关键词：arp广播

```shell
## 查看arp缓存
arp -a

## 抓arp类型的包
sudo tcpdump -nn -i <网卡> arp
```

实战抓取wlp5s0网卡上的arp广播

```shell
## 1.  开启抓包
sudo tcpdump -nn  -i wlp5s0 arp

## 2. 使用另一个windows电脑也连接到我的手机热点，随便ping一个wlp5s0网卡能处理的ip,
ping 192.168.189.55
```

此时在看抓包的日志打印如下：

```shell
$ sudo tcpdump -nn  -i wlp5s0 arp      
[sudo] chenkun 的密码：tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on wlp5s0, link-type EN10MB (Ethernet), snapshot length 262144 bytes

11:49:41.819450 ARP, Request who-has 192.168.189.55 tell 192.168.189.36, length 28
11:49:42.824331 ARP, Request who-has 192.168.189.55 tell 192.168.189.36, length 28
11:49:43.837669 ARP, Request who-has 192.168.189.55 tell 192.168.189.36, length 28
11:49:43.837669 ARP, Request who-has 192.168.189.55 tell 192.168.189.36, length 28
```

接上面的2.3.2章节最后，数据如何准确发到192.168.189.137上？
为了实验清晰，我上面还特意用了另一个电脑（和抓包电脑区别开来），但是抓包电脑依然能获取到广播来的日志，说明了网关是无差别的给所有连接到此网段的电脑都发了消息，谁有这个ip,则谁把自己的mac地址返回去。
上面实验是我ping了一个不存在的ip,所以没有正常返回，如果ping一个存在的ip正常返回如下，会响应一个mac地址给请求方，在实际网络环境中，一般情况不可能让你直连服务器，会有很多层路由器，所以一层一层的返回
mac地址，就形成了一个链，所以这就是链路层名字的 由来。

```shell
$ sudo tcpdump -nn  -i wlp5s0 arp 
tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on wlp5s0, link-type EN10MB (Ethernet), snapshot length 262144 bytes


12:02:01.497715 ARP, Request who-has 192.168.189.36 tell 192.168.189.137, length 28
12:02:01.497733 ARP, Reply 192.168.189.36 is-at 00:93:37:25:27:0e, length 28

```

## 3、参考资料

[bilibli教程](https://www.bilibili.com/video/BV1Gr4y1F7UV?p=1&vd_source=523a6b1564b9991b67e685b80d67975a)
