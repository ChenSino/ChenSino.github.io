---
title: git reset命令使用
date:  2022/07/29
author: chenkun
sidebar: 'auto'
publish: true
keys:
categories:
tags:
---

### 1、几种reset介绍
`git reset --hard xxxx`  
重置工作区、暂存区（索引区）、工作空间区，此命令是一个破坏性的命令，使用前要注意工作区和暂存区是否还有需要的东西
`git reset --soft xxxx`  
仅仅把HEAD改变一下，不丢失任何东西
`git reset --mixed xxxx`
把HEAD重置，同时把暂存区的东西还原到工作区，和soft一样也不会丢失任何东西，只不过把暂存区的放到工作区