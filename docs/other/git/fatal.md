---
title: Git克隆出现连接错误
date: 2022-03-09 16:57:01
author: zxf
category: 
  - git 操作
tag: 
  - 必会

---

## 如何解决 fatal: unable to access...的问题

### 现象

浏览器可正常访问github,终端无法clone

### 确定是否是因为代理问题

```shell
## 查看git所有配置，检查是否使用了代理
git config --list
```

检查浏览器是否使用了代理，例如下图中就是典型的浏览器走了本地代理，否则正常的应该是解析到远程github的ip

![20221104113900](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221104113900.png)

下图就是未使用代理（当然不能排除他使用了透明代理的可能）
![20221104114031](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221104114031.png)

### 解决问题

如果是因为代理的问题导致无法clone,那么根据情况设置或者取消代理即可

```shell
#设置代理，把代理服务器修改成自己的
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

#取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

##只对指定的git远程仓库进行代理，不让gitee等国内git走代理
#只对github.com
git config --global http.https://github.com.proxy <你的代理服务器>
#取消代理
git config --global --unset http.https://github.com.proxy

```
