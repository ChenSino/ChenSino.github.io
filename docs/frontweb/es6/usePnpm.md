---
title: 搞懂npm与pnpm
date: 2022-10-14 16:57:01
author: qianxun
category: 
  - npm知识点
tag: 
  - 必会
---

一，什么是pnpm

performant npm ，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”

二，特点

1. 当使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 100 份该相同依赖包的副本。然而，如果是使用 pnpm，依赖包将被 存放在一个统一的位置，因此：

   1. 如果你对同一依赖包需要使用不同的版本，则仅有 版本之间不同的文件会被存储起来。例如，如果某个依赖包包含 100 个文件，其发布了一个新 版本，并且新版本中只有一个文件有修改，则 `pnpm update` 只需要添加一个 新文件到存储中，而不会因为一个文件的修改而保存依赖包的 所有文件。
   2. 所有文件都保存在硬盘上的统一的位置。当安装软件包时， 其包含的所有文件都会硬链接自此位置，而不会占用 额外的硬盘空间。这让你可以在项目之间方便地共享相同版本的 依赖包。

   最终结果就是以项目和依赖包的比例来看，你节省了大量的硬盘空间， 并且安装速度也大大提高了！



三，安装

全局安装

```

npm install pnpm -g

```

安装完成后若出现pnpm : 无法加载文件 C:\Users\hp\AppData\Roaming\npm\pnpm.ps1，因为在此系统上禁止运行脚本

```bash

在系统中搜索框输入 Windos PowerShell

点击[管理员身份运行]

输入[set-ExecutionPolicy RemoteSigned]回车

根据提示，输入A，回车

再次回到pnpm -v执行成功。

ps：不只是pnpm命令，包括cnpm、yarn等这些命令，如果执行时，报这样的错误，都可以通过此方法解决。
	前提是，如果是用npm命令来安装这些cli命令工具，必须安装到全局环境中，才能生效。

```

设置源

```bash
# 查看源
pnpm config get registry

# 切换淘宝源

pnpm config set registry http://registry.npm.taobao.org

```

使用

```bash

# 下载包(XXX)
pnpm install XXX
pnpm i XXX
# -S  默认写入dependencies
pnpm add XXX -S
# -D devDependencies
pnpm add -D
# 全局安装
pnpm add -g
# 移除包(XXX)
pnpm remove XXX
# 移除全局包(XXX)
pnpm remove XXX --global
# 更新所有依赖项
pnpm up                
# 更新包(XXX)
pnpm upgrade XXX
# 更新全局包(XXX)
pnpm upgrade XXX --global
# 设置存储路径
pnpm config set store-dir /path/to/.pnpm-store

```

[pnpm官方网站](https://www.pnpm.cn/motivation)
