---
title: RedHat系
date:  2022-08-10
author: chenkun
publish: true
keys:
---

## 1、安装JDK11

```bash
sudo yum -y install java-11-openjdk java-11-openjdk-devel
```

## 2、多版本JDK切换

[参考博客](https://computingforgeeks.com/how-to-install-java-11-openjdk-11-on-rhel-8/)

```bash
sudo alternatives --config javac
```
