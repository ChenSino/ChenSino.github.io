---
title: 常用的命令
date: 2022/3/17
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

<!--more-->
### 1、降级包（Arch）
   有时太新的包会有bug，我们希望降级到更老版本的包，并且降级后我们希望下次检查更新的时候跳过此包的检查。

### 2、解决方法
1. 安装downgrade程序
`sudo pacman -S downgrade`
2. 降级
`sudo DOWNGRADE_FROM_ALA=1 downgrade ${packagename}`
注意DOWNGRADE_FROM_ALA=1一定要按照我上边这样写，不能单独export DOWNGRADE_FROM_ALA=1
设置忽略升级的包
第二步会让你选择更新的时候是否要忽略更新，选择y的话，它会在/etc/pacman.conf添加一个忽略，如果不想湖绿，把下面的IgnorePkg注释即可
