---
title: git reset命令使用
date:  2022-07-29
author: chenkun
publish: true
keys:
category:
---


### 1、几种reset介绍

git reset 命令用于回退版本，可以指定退回某一次提交的版本。

git reset 命令语法格式如下：

```bash
git reset [--soft | --mixed | --hard] [HEAD]
```

**--mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变**。

相当于取消该文件的暂存，去除git add .命令的效果

```bash
git reset HEAD 
```

实例：

```bash
git reset HEAD^            # 回退所有内容到上一个版本  
git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  
git  reset  052e           # 回退到指定版本
```



**--soft 参数用于回退到某个版本：保留暂存区和工作区，让仓库恢复到执行git commit之前的状态。**

```bash
$ git reset --soft HEAD~3   # 回退上上上一个版本 
```



**--hard 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有提交信息**

```bash
$ git reset --hard HEAD~3  # 回退上上上一个版本  
$ git reset –hard bae128  # 回退到某个版本回退点之前的所有信息。 
$ git reset --hard origin/master    # 将本地的状态回退到和远程的一样 
```

**注意：谨慎使用 –hard 参数，它会删除回退点之前的所有信息。**



> **HEAD 说明：**
>
> - HEAD 表示当前版本
>
> - HEAD^ 上一个版本
>
> - HEAD^^ 上上一个版本
>
> - HEAD^^^ 上上上一个版本
>
> - 以此类推...
>
>   
>
> 也可以使用 ～数字表示
>
> - HEAD~0 表示当前版本
> - HEAD~1 上一个版本
> - HEAD^2 上上一个版本
> - HEAD^3 上上上一个版本
> - 以此类推...





