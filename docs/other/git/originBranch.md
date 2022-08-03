---
title: git 拉取远程分支到本地
date: 2022-08-03 16:57:01
category: 
  - git 操作
tag: 
  - 必会

---



###  1，查看远程分支

可以查看远程分支名，查看要切换的远程分支是否存在。

```bash
git branch -a
```



### 2, 查看本地分支

查看本地是否已经有了要切换的分支，如果有，可以直接git checkout 分支名来切换分支。

```bash
git branch 
```



### 3,拉取远程分支

比如我把远程dev分支拉下来。

```bash
git fetch origin dev
```





### 4. 新建本地dev分支，并关联远程dev分支

```
git checkout -b dev origin/dev
```

