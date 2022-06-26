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
## 若已存在build目录,则先删除 rm
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



