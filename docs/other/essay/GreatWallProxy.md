---
title: 墙外的世界
date: 2018-05-15
keys:
  - E10ADC3949BA59ABBE56E057F20F883E
---
### 1、使用原生v2ray

1. 前台启动

```bash
# 启动
sudo v2ray -config /etc/v2ray/config.json
```

2. 后台启动

```bash
 sudo systemctl start v2ray
```



> 1. 编辑 /etc/v2ray/config.json 文件来配置你需要的代理方式；
>
> 2. 运行 service v2ray start 来启动 V2Ray 进程；
>
> 3. 之后可以使用 service v2ray start|stop|status|reload|restart|force-reload 控制 V2Ray 的运行。
>
>    （systemctl兼容service服务）



### 2、Manjaro使用v2raya

```shell
#启动
sudo systemctl start v2raya.service
# web管理界面
http://127.0.0.1:2017/
#忘记web管理密码
sudo systemctl stop v2raya.service
sudo v2raya --reset-password
```



### 3、手动编译qv2ray

> 因qv2ray放弃维护，导致每次升级我的manjaro系统时，qv2ray因为依赖包版本问题无法启动，所以需要在自己的电脑上手动编译出和当前系统兼容的软件。

参考文档：https://qv2ray.net/lang/zh/hacking/manuallybuild.html#_0-%E6%9E%84%E5%BB%BA%E4%BE%9D%E8%B5%96

```bash
# 1. 下载指定的tag,并且使用--recursive下载依赖包
git clone --recursive --branch v2.7.0  https://github.com/Qv2ray/Qv2ray.git
# 2. 创建一个build目录防止污染原来的文件
cd Qv2ray
## 若已存在build目录,则先删除 rm -rf build
mkdir build; cd build;
# 3. 执行
cmake ..
# 4. cmake --build .
cmake --build .
# 5. sudo cmake --install .
sudo cmake --install .
# 6. 复制编译好的二进制文件qv2ray到/usr/local/bin
sudo cp qv2ray /usr/local/bin
```

### 4、代理工具的关系

本文完全复制 [Rui的博客](https://imgki.com/archives/526.html)，仅作备份学习，如有侵权请留言删除！

#### 4.1 Xray 和 Project X 项目的由来

Xray诞生事件的大致经过：由于Debian包的维护人员发现[XTLS库](https://github.com/XTLS/Go)不是BSD许可后，希望作者 [@rprx](https://github.com/rprx) 能修改LISENCE许可，这样方便打包。这个问题在社区引发了大家非常广泛的讨论，但rprx坚持认为目前LISENCE不是什么问题。但由于V2Ray一直遵循MIT协议，Project V 项目社区(V2fly社区)的维护团队发起投票，并最终认定XTLS不符合协议要求，于是在V2ray-core 4.33.0版移除了XTLS黑科技。随后， rprx和其支持者另起炉灶，很快就创建了 [Project X](https://github.com/XTLS) 项目 和其核心 [Xray](https://github.com/XTLS/Xray-core)，并以XTLS为核心协议陆续发布了 Xray-core 的多个版本，于是Xray诞生了。

也许你已经发现，Xray 和 Project X 项目与 V2Ray 和 Project V 项目几乎是一一对应的。

没错，就是如此。其实，Xray是V2Ray的超集，就是包含V2Ray所有的功能，并完全兼容V2Ray；而 Project X 就是 Project V 的超集，也是完全兼容，所以跟称呼V2Ray一样，我们以后也用Xray代指 Project X 项目及其相关技术。因此，我可以把Xray看成V2Ray的增强版，以XTLS为核心协议。也许你跟我有一样的感觉，没有XTLS的VLESS好像缺少点什么，这个需要V2fly社区现有的大佬努力创造了，毕竟现在VMess协议已显颓势。我完全相信XTLS不是唯一一个科学上网黑科技，也不会是最后的一个，科学上网代理技术领域百花齐放总归是一件太大的好事，所以我更看好Xray独立发展的前景。

#### 4.2 Xray-Core 的版本发布历史

Xray-Core 自2020年11月份创立以来，仅历时一个多月就发布了七个版本。Xray-Core目前已发布版本的简要介绍：

Xray-core 1.0.0版本：项目创建，提供完整的VLESS和XTLS支持，对V2ray-core性能优化，并将v2ray和v2ctl可执行文件合并为xray，功能得到增强，功能上成为V2ray-core的超集。
Xray-core 1.1.0和1.1.1版本：测试过渡版本，未提供详细发行说明；
Xray-core 1.1.2版本：引入了Linux Kernel Splice技术，适用于Android安卓、路由器等Linux环境。Splice技术减少了数据拷贝次数和内存占用，拥有更强的性能。需要说明的是，只适用于类Linux环境的客户端出栈，服务端入栈仍然是direct；
Xray-core 1.1.3版本：重构了透明代理的 REDIRECT 模式，使之同时支持 IPv4 和 IPv6，解决了V2ray和trojan遗留的问题；
Xray-core 1.1.4版本：优化内存占用，TLS更多选项配置，使服务端伪装站的TLS设置在[SSL Labs](https://www.ssllabs.com/ssltest/)能达到A+评分；
Xray-core 1.1.5版本：测试过渡版本，支持YAML等配置文件，支持OCSP Stapling等功能，官方安装脚本大更新。

#### 4.3 Xray和V2Ray的区别和关系

Xray完全模仿V2Ray的模式，所以只要我们搞清楚了V2Ray，那么Xray就很好理解了。一灯不是和尚先来跟大家说一下V2Ray、Projcet V 和 V2fly社区三者之间的关系。

**V2Ray的由来：**  V2Ray 是 继 Shadowsocks 作者[@clowwindy](https://github.com/clowwindy)被请去喝茶之后，V2Ray 项目组为表示抗议而开发的，后破娃酱[@breakwa11](https://github.com/breakwa11)也被请喝茶，V2Ray项目原作者隐匿，项目长期停滞不前。于是，原V2Ray社区成员组建了V2fly社区，并继续V2Ray的维护开发，同时 Project V 项目由此诞生。

**V2Ray 和 Project V 项目：** V2Ray 是构建特定网络环境工具的项目 Project V 下的最核心的工具之一（因为其核心不只有V2Ray），而 Project V 其实是一个工具集，它可以帮助你打造专属的基础通信网络。V2Ray内核模块用于实际的网络交互、路由等针对网络数据的处理，而外围的用户界面程序提供了方便直接的操作流程，这从根本上解决了V2Ray搭建和使用对于新手小白特别不友好的问题。目前，Project V 项目支持 Socks5、Shadowsocks、VMess、VLESS 和 Trojan 等协议，其中只有VMess和VLESS协议为V2fly社区原创，其它均为整合的已经成熟的科学上网协议。

从时间上来说，先有 V2Ray 才有 Project V，在 V2Ray 得到普遍认可的时候才开发的 Project V 框架，然后才有了V2fly社区。简单地说，V2Ray 是 Projcet V 项目的一个核心模块，V2fly社区是维护 Project V 项目的核心团队。一直以来，由于 V2Ray 名气太大，所以现在大家都习惯称 Project V 为 V2Ray，也就是说我们通常所说的 V2Ray 实际上是指以 V2Ray 为核心的 Project V 项目。

V2ray官网：https://v2ray.com/
Github项目主页：https://github.com/v2ray
TG讨论组：@projectv2ray；
说到这里，我相信大多数小伙伴已经明白了。

**Xray：** 与V2Ray完全类同，Xray 是 Project X 项目的核心模块。因为Xray和XTLS黑科技的作者rprx曾经是V2fly社区的重要成员，所以Xray直接Fork全部V2Ray的功能，然后进行性能优化，并增加了新功能，使Xray在功能上成为了V2Ray的超集，且完全兼容V2Ray。

**简而言之**， Xray是V2Ray的项目分支，Xray是V2Ray的超集，就跟Trojan-Go和Trojan-GFW的关系类似，而且Xray性能更好、速度更快，更新迭代也更频繁。由于自V2ray-core 4.33.0 版本起，删除了XTLS黑科技，但仍然支持VLESS，所以是否原生支持XTLS是Xray和V2Ray最大的区别之一。

最近，Xray真的是非常火，尤其XTLS黑科技让其成为在科学上网技术领域最耀眼的明星，星光熠熠，一时间簇拥者不可胜数。鉴于此，如果你非常喜欢XTLS黑科技的话，你只能使用 V2ray-Core 4.29.0 ～ 4.32.1版，或直接使用 Xray-core 就行了。当然，我是非常建议您直接使用 Xray-core 就OK了。

在Xray跟V2Ray分家之后，就一直有人说，“Xray和V2Ray有可能再次合并”。我认为可能性几乎为零，因为开弓没有回头箭，而且真没有重新回去的必要，自立门户对于支持Xray的社区开发者也是一件非常激动人心的事情，以后会在科学上网领域“青史留名”的，这是一种至高的荣誉。我相信任何一个社区开发者都喜欢这种成就感，因为这是自己参与并支持过的正确的道路，这也是一种持续创作的动力，是不可能再回头了。
