---
title: git分支操作
date: 2022-08-03 16:57:01
category: 
  - git 操作
tag: 
  - 必会

---



###  **一，推送本地分支到远程**

昨天我在自家电脑创建了一个分支search_dev.写搜索功能。

**1，在本地创建并切换到search_dev分支**

```bash
git checkout -b search_dev
```

**2，推送本地search_dev分支到远程**

```bash
git push origin search_dev(本地):search_dev(远程)
```

或者

```bash
git push --set-upstream origin dev(分支名)
```



###  **二，从远程拉取分支到d本地**

 第二天，我到公司写搜索功能，我需要从远程拉取search_dev到本地。

  **1,简写命令**

```bash
git checkout -b search_dev origin/search_dev //check出远程dev分支到本地
```

**2，分写的命令**

在公司电脑本地先创建search_dev分支

```bash
git checkout -b search_dev
```

拉取远程search_dev到本地（完成）

```bash
git pull origin search_dev
```





 ###  **三，删除本地分支**

 假设要删除**search_dev**远程分支，我们需要先把分支切换到master，因为你现在所在的分支就是**search_dev**，在这个分支下， 是不能删除。

```bash
git branch -d (分支名称)
```

删除远程分支

```bash
git push origin -d 分支名
```





###  **四，合并分支到master上**

假如我们现在在dev分支上，可以用下面命令查看当前分支

```bash
git branch
```

刚开发完项目，执行了下列命令

```bash
git add .
git commit -m ‘dev’
git push -u origin dev
```

然后我们要把dev分支的代码合并到master分支上 该如何？首先切换到master分支上

```bash
git checkout master
```

如果是多人开发的话 需要把远程master上的代码pull下来

```bash
git pull origin master
```

如果是自己一个开发就没有必要了，为了保险期间还是pull。然后我们把dev分支的代码合并到master上

```bash
git merge dev
```

此时或许跟我一样会遇到冲突。先看git 提示冲突文件，然后手动去解决冲突，然后提交，推送。

```bash
git status
git commit -m "提交"
git push origin master

```

