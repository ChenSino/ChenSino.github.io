---
title: wsl问题
date: 2024-09-23
author: chensino
publish: true
isOriginal: true
---

## 1. wsl系统设置桥接网络

参考：<https://www.cnblogs.com/cheyunhua/p/17577895.html>

### 1.1 开启hyper-v

桥接功能需要windows的hyper-v组件支持，但是win10/11家庭版是不包含hyper-v的，专业版才包含。网上也有文章提到家庭版安装hyper-v的方法，但是我没有测试，以下内容都是在win11专业版上进行的测试，win10专业版应该也是一样的。
首先，进入控制面板—程序—启用或关闭windows功能，勾选hyper-v，确认后重启电脑。

### 1.2 桥接网络

WSL2 默认采用了一个 NAT 网络，这对于大多数情况而言都是没有问题的，但是如果想要把 WSL 中的服务直接暴露出来，就不得不考虑做端口转发等问题。以及如果要使用 IPv6，自带的 NAT 方案也不能满足。

因此，这种时候如果能让 WSL2 使用直接接在 NIC 上自然是最好的，可惜 Windows 中没有直接提供这样的配置选项，如果在 Hyper-V 管理器中配置 WSL 网卡为外部网络则会直接报错。

万幸的是，可以使用 PowerShell 直接进行配置，本文则记录使用 PowerShell 让 WSL2 用上桥接网络的方法。

以下内容需要以管理员身份在PowerShell内执行。

一切开始之前首先需要启动 WSL，直接运行 wsl 即可，这样 WSL 的网卡才会被自动创建出来。

重启后首先运行wsl2（这样才能出现WSL的虚拟网卡），以管理员方式打开powershell，执行Get-NetAdapter，可以列出系统所有的网卡，记住想要桥接的网卡名称，比如我想桥接到有线网络其名称为“以太网”。

桥接网卡输入以下代码：

~~~PowerShell
Set-VMSwitch WSL -NetAdapterName <你的网卡名字>
~~~

将wsl虚拟网络和主机有线网络桥接起来。

### 1.3 修改wsl

接下来进入 WSL 配置 IP 地址和网关，假设WSL的有线网络为eth0，网关为 192.168.1.1，IP 设置为 192.168.1.64/24：

~~~PowerShell
ip addr del $(ip addr show eth0 | grep 'inet\b' | awk '{print $2}' | head -n 1) dev eth0
ip addr add 192.168.1.64/24 broadcast 192.168.1.255 dev eth0
ip route add 0.0.0.0/0 via 192.168.1.1 dev eth0
~~~

接下来更新名称解析服务器地址，执行 nano /etc/resolv.conf，修改其中内容为 nameserver 192.168.1.1，

### 1.4 取消桥接

在windows中管理员方式打开powershell，执行以下指令：

~~~PowerShell
Set-VMSwitch WSL -SwitchType Internal
~~~

然后执行 wsl --shutdown 重启wsl，即可恢复原有的虚拟内部网络。


