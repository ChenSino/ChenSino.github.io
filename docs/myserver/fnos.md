---
title: 飞牛NAS
date: 2024-11-09
author: chensino
publish: true
isOriginal: true
---

#### 1.安装fail2ban

~~~shell
#1. 安装fail2ban
sudo apt install fail2ban
~~~

#### 2. 添加日志过滤的配置

~~~shell
##新建trim_main.conf文件
sudo vim /etc/fail2ban/filter.d/trim_main.conf
~~~

~~~conf
#以下内容写入到/etc/fail2ban/filter.d/trim_main.conf
[Definition]
failregex = MAINEVENT:.*"template":"LoginFail".*"IP":"<HOST>"
ignoreregex =
~~~

#### 3. 设置要ban的规则

~~~shell
##添加配置文件jail.local
sudo vim /etc/fail2ban/jail.local
~~~

~~~conf
#把下面配置写入jail.local
[DEFAULT]
# 忽略的IP地址列表，局域网内的ip不做限制
ignoreip = 127.0.0.1/8 192.168.1.0/24
# 默认的禁用时间（秒）
bantime = 3600
# 最大失败尝试次数
maxretry = 5

# 日志级别
loglevel = 3

[trim_main]
enabled  = true
filter   = trim_main
logpath  = /var/log/syslog
maxretry = 5
bantime  = 3600
findtime = 600
#action   = iptables-allports[name=trim_main, port="all"]
action = iptables-multiport[name=trim_main, port="5667", protocol=tcp]
~~~

以上参数可根据自己的需求做调整，比如密码错误次数，ban的时间长短，还有ban的端口，因为我对外暴露的就一个5667端口，所以这里我就ban了5667

#### 4. fail2ban基本用法

~~~shell
#启动
 sudo systemctl start fail2ban
#停止
sudo systemctl stop fail2ban
# 重启
sudo systemctl stop fail2ban
# 查看被ban的ip
 sudo fail2ban-client banned
# 解除某个被ban的ip
sudo fail2ban-client set trim_main unbanip x.x.x.x
#开机启动fail2ban
sudo systemctl enable fail2ban
# 禁止开机启动
sudo systemctl disable fail2ban
~~~

#### 5.飞牛的服务日志查看

~~~shell
sudo tail -f /var/log/syslog
~~~
