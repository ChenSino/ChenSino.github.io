---
title: ddns证书
date: 2024-09-30
author: chensino
publish: true
isOriginal: true
---

acme官方文档：<https://github.com/acmesh-official/acme.sh>
pve官方文档：<https://pve-doc-cn.readthedocs.io/zh-cn/latest/chapter_system_administration/certmgr.html>

## 1. 申请动态域名（省略）

## 2. 使用acme申请免费的

### 2.1 使用acme申请证书

1 安装很简单:
国内用户参考<https://github.com/acmesh-official/acme.sh/wiki/Install-in-China>

~~~shell
git clone https://gitee.com/neilpang/acme.sh.git
cd acme.sh
./acme.sh --install -m my@example.com
~~~

2 当前终端，创建 一个 bash 的 alias, 方便你的使用:

~~~shell
alias acme.sh=~/.acme.sh/acme.sh
~~~

### 2.2 使用openssl创建密钥对

 1. 创建.ssh文件夹(若没有)
 2. 创建ed25519算法证书

 ~~~shell
 ssh-keygen -t ed25519 -f chensino -C <邮箱>
 ~~~

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

![20240930113754](http://ddns.chensina.cn:29000/afatpig/blog/20240930113754.png)

根据他的提示执行`acme.sh --register-account -m  462488588@qq.com`即可
![20240930113831](http://ddns.chensina.cn:29000/afatpig/blog/20240930113831.png)

再次执行`acme.sh --issue --dns dns_dynv6 -d chensino.dynv6.net`就可以了
![20240930113903](http://ddns.chensina.cn:29000/afatpig/blog/20240930113903.png)

证书生成路径：
![20240930114008](http://ddns.chensina.cn:29000/afatpig/blog/20240930114008.png)

## 3.给pve的web管理配置证书

参考：<https://blog.51cto.com/picker/5393676>

1. pve需要pem格式证书，需要把申请的证书转化

~~~shell
#到证书生成的路径下执行
openssl x509 -in chensino.dynv6.net.cer -out chensino.dynv6.net.pem -outform PEM
~~~

2. 把证书复制到pve

~~~
scp chensino.dynv6.net.key root@192.168.1.120:/etc/pve/nodes/chensino
~~~

3. 把原来的证书pve-ssl.key、pve-ssl.pem备份后，把我们新的证书改成对应的这个名字
~~~

mv chensino.dynv6.net.pem pve-ssl.pem
mv chensino.dynv6.net.key pve-ssl.key
~~~

4. 重启pveproxy

~~~shell
 systemctl restart pveproxy
 ~~~

## 4. 自动续签

 这种免费的证书时间很短，acme.sh会帮我们自动创建一个crontab定时任务更新证书

##  pve的webui界面自带的acme插件

<https://gist.github.com/tavinus/15ea64c50ac5fb7cea918e7786c94a95>

1. 数据中心——ACME，添加账户chensino
![20241009155933](http://ddns.chensina.cn:29000/afatpig/blog/20241009155933.png)

2. 数据中心——ACME，添加质询插件，名字还是chenisno，API数据是dynv6中生成的token，格式如下

![20241009160021](http://ddns.chensina.cn:29000/afatpig/blog/20241009160021.png)

3. 到对应的pve节点（我的节点叫chensino）——凭证，添加凭证，质询类型DNS，插件选择之前创建的
![20241009160140](http://ddns.chensina.cn:29000/afatpig/blog/20241009160140.png)

4. pve节点——凭证，选择域名，点击立即预定凭证

:::note 注意
若报错找不到了对应的key什么的，需要事先创建好，名字要对应上，比如报错叫dynv6的key没有，那么就要到～/.ssh下生成对应的名字的key，生成方法请参考之前的
:::

![20241009160816](http://ddns.chensina.cn:29000/afatpig/blog/20241009160816.png)