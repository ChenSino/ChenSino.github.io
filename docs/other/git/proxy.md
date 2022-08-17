---
title: git代理
date:  2022-08-17
author: chenkun
keys:
category:
tag:
---

## 1、全局代理

```shell
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
##取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 2、部分代理

```shell
#只对github.com
git config --global http.https://github.com.proxy http://127.0.0.1:1080

#取消代理
git config --global --unset http.https://github.com.proxy
```

## 3、参考

[git代理](https://gist.github.com/laispace/666dd7b27e9116faece6)