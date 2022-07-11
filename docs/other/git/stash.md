---
title: git stash 暂存
date: 2022-03-09 16:57:01
categories: 
  - git 操作
tags: 
  - 必会

---

## 一，使用场景

在开发的过程中，经常会遇到，几个分支并行进行。当在A分支开发，突然发现有个线上bug，需要临时切换到B分支进行处理，同时，A分支上的代码还未编写完整，不想提交上去。这个时候，` git stash `的好处就提现出来了。

## 二，stash的作用

stash会跟踪文件的修改与暂存的改动——然后将未完成的修改保存到一个栈上， 而你可以在任何时候重新应用这些改动（甚至在不同的分支上）。

## 三，使用命令

1.  **git status**查看哪些文件发生变化

2. **git stash**把所有改动暂存起来，`git stash`等同于`git stash push`，可以给当前stash增加message方便后续查看

   `git stash push -m "message"`,执行完，会发现`git status`当前分支变得跟没有改动时一样干净

3. `git stash list`  查看当前栈中有多少暂存记录

4. 恢复栈最新的一个暂存可以`git stash pop`,取暂存中的某一份` git stash apply stash@{1}`

5. pop` 和`apply`都可以恢复暂存，但是，apply执行后，暂存记录还存在。`pop`则会从栈中移除

6. `git stash clear`  删除所有缓存的stash

7. `git stash drop stash@{$num}` ：丢弃stash@{$num}存储，从列表中删除这个存储

## 四，本地解决冲突

1. 把自己开发的代码储藏起来git stash
2. git pull 拉取最新代码
3. git stash pop 把暂存文件恢复
4. 查看冲突，解决冲突 git status -s
5. 解决完冲突后就可以像正常提交代码一样操作了，
6. git add xxx
7. git commit -m “xxx”
8. git push origin master:my_branch

