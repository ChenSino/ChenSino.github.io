---
title: Manjaro问题搜集
date: 2022-03-22
author: chenkun
publish: true
keys:
category:
---

### 1、降级软件包

安装downgrade程序
`sudo pacman -S downgrade`
降级
`sudo DOWNGRADE_FROM_ALA=1 downgrade xxx包`
注意DOWNGRADE_FROM_ALA=1一定要按照我上边这样写，不能单独export DOWNGRADE_FROM_ALA=1
设置忽略升级的包
第二步会让你选择更新的时候是否要忽略更新，选择y的话，它会在/etc/pacman.conf添加一个忽略，如果不想湖绿，把下面的IgnorePkg注释即可

![image-20220322171440300](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322171440300.png)

### 2、开机报错failed to start rotate log files

#### 2.1 分析问题

1. logrotate是什么
   按照老套路分析，先百度了一下logrotate是什么，参考，说白了就是个日志切割，和java里面的差不多。就是防止单文件日志过大，按照一定的规则切割成多个日志，或者删除，比如设置超过一个月直接删除，或者超过10M直接删除等等。
2. 查看logrotate是什么时候启动，以及启动后的状态。首先我们知道它是一个systemctl启动的service服务。那就到/lib/systemd/system下看一下ll |grep rotate

```shell
 ll|grep rota
-rw-r--r-- 1 root root  870  1月  8  2021 logrotate.service
-rw-r--r-- 1 root root  191  1月  8  2021 logrotate.timer
```

可以看到和[这个问题](https://blog.csdn.net/chen462488588/article/details/118737574?spm=1001.2014.3001.5501)一模一样的套路。
3. 到 logrotate.service查看它实际上执行的是什么命令

```shell
$ cat logrotate.service     
[Unit]
Description=Rotate log files
Documentation=man:logrotate(8) man:logrotate.conf(5)
RequiresMountsFor=/var/log
ConditionACPower=true

[Service]
Type=oneshot
ExecStart=/usr/sbin/logrotate /etc/logrotate.conf

# performance options
Nice=19
IOSchedulingClass=best-effort
IOSchedulingPriority=7

# hardening options
#  details: https://www.freedesktop.org/software/systemd/man/systemd.exec.html
#  no ProtectHome for userdir logs
#  no PrivateNetwork for mail deliviery
#  no NoNewPrivileges for third party rotate scripts
#  no RestrictSUIDSGID for creating setgid directories
LockPersonality=true
MemoryDenyWriteExecute=true
PrivateDevices=true
PrivateTmp=true
ProtectClock=true
ProtectControlGroups=true
ProtectHostname=true
ProtectKernelLogs=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectSystem=full
RestrictNamespaces=true
RestrictRealtime=true
```

可以看到`ExecStart=/usr/sbin/logrotate /etc/logrotate.conf`
执行的是这个命令，那就好办了，手动以debug模式执行一下此命令
4. 查看执行结果

```shell
$ sudo logrotate --debug /etc/logrotate.conf                              
[sudo] chenkun 的密码：
WARNING: logrotate in debug mode does nothing except printing debug messages!  Consider using verbose mode (-v) instead if this is not what you want.

reading config file /etc/logrotate.conf
including /etc/logrotate.d
reading config file cups
reading config file lirc
reading config file mysqlrouter
error: mysqlrouter:31 unknown option 'var' -- ignoring line
error: mysqlrouter:45 unexpected }
error: found error in file mysqlrouter, skipping
reading config file nginx
reading config file samba
warning: 'monthly' overrides previously specified 'weekly'
Reading state from file: /var/lib/logrotate.status
Allocating hash table for state file, size 64 entries
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state

Handling 6 logs

rotating pattern: /var/log/cups/*_log  weekly (4 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/cups/access_log
  Now: 2021-07-15 09:24
  Last rotated at 2021-07-11 16:22
  log does not need rotating (log has been rotated at 2021-07-11 16:22, which is less than a week ago)
considering log /var/log/cups/error_log
  Now: 2021-07-15 09:24
  Last rotated at 2021-07-11 16:22
  log does not need rotating (log has been rotated at 2021-07-11 16:22, which is less than a week ago)

rotating pattern: /var/log/lircd  weekly (4 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/lircd
  log /var/log/lircd does not exist -- skipping

rotating pattern: /var/log/nginx/*log  weekly (4 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/access.log
  Now: 2021-07-15 09:24
  Last rotated at 2021-06-02 08:34
  log does not need rotating (log is empty)
not running postrotate script, since no logs were rotated

rotating pattern: /var/log/samba/log.smbd /var/log/samba/log.nmbd /var/log/samba/*.log  weekly (4 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/samba/log.smbd
  log /var/log/samba/log.smbd does not exist -- skipping
considering log /var/log/samba/log.nmbd
  log /var/log/samba/log.nmbd does not exist -- skipping
considering log /var/log/samba/*.log
  log /var/log/samba/*.log does not exist -- skipping

rotating pattern: /var/log/wtmp  monthly (1 rotations)
empty log files are rotated, only log files >= 1048576 bytes are rotated, old logs are removed
considering log /var/log/wtmp
  Now: 2021-07-15 09:24
  Last rotated at 2021-03-20 18:00
  log does not need rotating ('minsize' directive is used and the log size is smaller than the minsize value)

rotating pattern: /var/log/btmp  monthly (1 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/btmp
  Now: 2021-07-15 09:24
  Last rotated at 2021-07-01 19:33
  log does not need rotating (log has been rotated at 2021-07-01 19:33, which is less than a month ago)
```

5. 在日志中找error
   ![image-20220322171948840](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322171948840.png)
6. 报错很明显了是mysqlroute的日志切割失败了。
7. logrotate其实是被很多程序都使用了，其配置文件在/etc/logrotate.d下
   ![image-20220322172023905](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322172023905.png)

可以看到nginx ，mysqlrouter，Samba等都用了logrotate，并且他们都有自己的配置，根据上面我们已经知道了是mysqlrouter配置有问题，我们只需要打开nginx的配置和mysqlrouter对比就知道了。经过比我我的mysqlrouter的配置文件在var前面少了一个/ 加上就好了

![image-20220322172038617](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322172038617.png)

### linux下输入法无法输入中文中括号问题

如果使用的是fcitx5，修改/usr/share/fcitx5/punctuation/punc.mb.zh_CN下的对应符号即可，打开文件有两列，第一列代表英文
状态下的符号，第二列是中文下符号。
有时发现无论怎么输入都只有英文，那么就续呀点击一下输入法上的半角符号

### 3、美化

kde设置proxy有个很大的bug,就是无法全局，搞笑的是通过kde设置的proxy,它自己都无法使用，在国内用kde下载主题、图标等根本下载不动。

解决办法就是挂梯子，下载后手动安装，

![image-20220418155819498](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155819498.png)

![image-20220418155847045](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155847045.png)

![image-20220418155927678](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155927678.png)

![image-20220418155956979](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155956979.png)

### 4、设置yakuake提示没有权限修改文件

1. 修改yakuake的文字大小

![image-20220419110311199](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220419110311199.png)

![image-20220419110401735](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220419110401735.png)

2. 保存时会报错，大概是没有`/usr/share/konsole`的权限
3. 添加一下权限就行了

​		给当前用户添加一下权限，`chmod 666 xxx`

### 3、Manjaro不支持Mysql

> 在Manjaro上使用mysql,经常会遇到libicu不兼容问题，即使解决了，下次系统滚动升级可能又会出现

#### 3.1 使用MariaDB代替mysql

![image-20220502211444881](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220502211444881.png)

#### 3.2 使用docker安装Mysql

### 4、Manjaro设置DNS

> 用双网卡同时上内外网，有时一个域名是内网才能解析的，比如我司的iccm.sonoscape.com，这个是一个内网域名，要走内部DNS才能访问到，
>
> 但是公司因该是有两个DNS服务器，一个用来解析外网访问xxx.sonoscape.com，另一个是用来访问内网的xxx.sonoscape.com,

### 4、Manjaro fcitx5中文大括号问题

```shell
sudo vim /usr/share/fcitx5/punctuation/punc.mb.zh_CN
```

修改对应的行符号就可以了

```bash
[ 【
] 】
```

### 5、分支管理

#### 概述

Template:重要 One of the many features that sets Manjaro apart from other Arch-based distributions is that it uses its own dedicated software branches, rather than relying on those provided by Arch itself. In fact, to ensure continued stability and reliability, Manjaro actually uses three distinct branches:

- **Stable branch** : The packages that come to stable have gone through roughly a couple of weeks testing by the users of the Unstable/Testing repos, before they get the packages. These packages are usually free of any problems.
- **Testing branch**: This is the second line of defense. Being a larger number of users than those using Unstable, they refine the work done prior to them by providing feedback on the packages they recieve on updates.
- **Unstable branch** : Unstable is synced several times a day with Arch package releases. Only a subset of Arch packages are modified to suit Manjaro. Those that use Unstable need to have the skills to get themselves out of trouble when they move their system to this branch. They are the Manjaro users who are most likely to need to use such skills. Due to the feedback from the users of the Unstable repo, many issues are caught and fixed at this level. Although the very latest software will be located here, using the unstable branch is usually safe but - in rare cases - may cause issues with your system!

**Summing up** , Manjaro packages start their lives in the unstable branch. Once they are a deemed stable, they are moved to the testing branch, where more tests will be realized to ensure the package is ready to be submitted to the stable branch.

::: note Note on unstable branch
Remember: Manjaro specific packages such as kernels, kernel modules and Manjaro applications enter the repo on unstable branch and it is those packages which are considered unstable when they enter.
Unmodifed packages synced from Arch repo are considered stable as they have already been vetted by Archlinux Community.
:::

#### 切换分支

In order to access a branch, you need to change your pacman-mirrors configuration.

You should substitute the value colored in green (for illustrative purposes only) to one of the following: stable, testing or unstable.

```shell
sudo pacman-mirrors --api --set-branch {branch}
```

After you changed the branch, rebuild the mirrorlist and update your packages:

```shell
sudo pacman-mirrors --fasttrack 5 && sudo pacman -Syyu
```

#### How do I go back after changing to one of the testing branches?

Going back to the stable branch is easy. All you have to do is to repeat the above, and use stable as the branch value.

Be aware that after switching to a more stable branch you will receive messages from pacman, informing about newer packages installed than available in the repo. Don't be alarmed as the situation will resolve itself when the packages reaches your current branch.

If for whatever reason you do wish to also 'downgrade' packages while changing branches add an extra u to the pacman command:

```sudo pacman -Syyuu```
