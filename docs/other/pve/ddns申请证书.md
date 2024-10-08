---
title: ddns证书
date: 2024-09-30
author: chensino
publish: true
isOriginal: true
---

<https://blog.20200202.best/dynv6acmednsapihowto/>

## 1. 申请动态域名（省略）

## 2. 使用acme申请免费的

### 2.1 使用acme申请证书

1 安装很简单, 一个命令:

```shell
curl  https://get.acme.sh | sh
```

2 当前终端，创建 一个 bash 的 alias, 方便你的使用:

```shell
alias acme.sh=~/.acme.sh/acme.sh
```

### 2.2 使用openssl创建密钥对

 1. 创建.ssh文件夹(若没有)
 2. 创建ed25519算法证书

 ```shell
 ssh-keygen -t ed25519 -f chensino -C <462488588@qq.com>
 ```
一直回车

### 2.3 上传公钥到dynv6

1. 登陆dynv6账户生成一个token用于请求dynv6的api:

点击  https://dynv6.com/keys/token/new

2. 复制pub公钥到dynv6

点击链接: <https://dynv6.com/keys/ssh/new>

### 2.4 执行申请证书

~~~markdown

#指定证书的ssh key的绝对路径 :

export KEY="/root/.ssh/chensino"

*我们之前建立的key文件位置: /root/.ssh/chensino

#dynv6的token
export DYNV6_TOKEN="xxxx"

最后使用命令:
acme.sh --issue --dns dns_dynv6 -d chensino.dynv6.net
~~~

执行`acme.sh --issue --dns dns_dynv6 -d chensino.dynv6.net`有报错，

![20240930113754](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240930113754.png)

根据他的提示执行`acme.sh --register-account -m  462488588@qq.com`即可
![20240930113831](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240930113831.png)

再次执行`acme.sh --issue --dns dns_dynv6 -d chensino.dynv6.net`就可以了
![20240930113903](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240930113903.png)

证书生成路径：
![20240930114008](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240930114008.png)

## 3.给pve的web管理配置证书

参考：<https://blog.51cto.com/picker/5393676>

1. pve需要pem格式证书，需要把申请的证书转化

```shell
#到证书生成的路径下执行
openssl x509 -in chensino.dynv6.net.cer -out chensino.dynv6.net.pem -outform PEM
```

2. 把证书复制到pve

```
scp chensino.dynv6.net.key root@192.168.1.120:/etc/pve/nodes/chensino
```

3. 把原来的证书pve-ssl.key、pve-ssl.pem备份后，把我们新的证书改成对应的这个名字
```

mv chensino.dynv6.net.pem pve-ssl.pem
mv chensino.dynv6.net.key pve-ssl.key
```

4. 重启pveproxy

~~~shell
 systemctl restart pveproxy
 ~~~

 ## 4. 自动续签

 这种免费的证书时间很短，3个月，到期需要续签

 TODO 自动续签


