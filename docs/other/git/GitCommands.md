---
title: git命令
date: 2022-03-09 16:57:01
author: ChenSino
categories: 
  - git 操作
tags: 
  - 必会

---
## 一、善用手册
```shell
$ git --help
用法：git [--version] [--help] [-C <路径>] [-c <名称>=<取值>]
           [--exec-path[=<路径>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<路径>] [--work-tree=<路径>] [--namespace=<名称>]
           [--super-prefix=<路径>] [--config-env=<名称>=<环境变量>]
           <命令> [<参数>]

这些是各种场合常见的 Git 命令：

开始一个工作区（参见：git help tutorial）
   clone     克隆仓库到一个新目录
   init      创建一个空的 Git 仓库或重新初始化一个已存在的仓库

在当前变更上工作（参见：git help everyday）
   add       添加文件内容至索引
   mv        移动或重命名一个文件、目录或符号链接
   restore   恢复工作区文件
   rm        从工作区和索引中删除文件

检查历史和状态（参见：git help revisions）
   bisect    通过二分查找定位引入 bug 的提交
   diff      显示提交之间、提交和工作区之间等的差异
   grep      输出和模式匹配的行
   log       显示提交日志
   show      显示各种类型的对象
   status    显示工作区状态

扩展、标记和调校您的历史记录
   branch    列出、创建或删除分支
   commit    记录变更到仓库
   merge     合并两个或更多开发历史
   rebase    在另一个分支上重新应用提交
   reset     重置当前 HEAD 到指定状态
   switch    切换分支
   tag       创建、列出、删除或校验一个 GPG 签名的标签对象

协同（参见：git help workflows）
   fetch     从另外一个仓库下载对象和引用
   pull      获取并整合另外的仓库或一个本地分支
   push      更新远程引用和相关的对象

命令 'git help -a' 和 'git help -g' 显示可用的子命令和一些概念帮助。
查看 'git help <命令>' 或 'git help <概念>' 以获取给定子命令或概念的
帮助。
有关系统的概述，查看 'git help git'。

```

一般情况在每个子命令下使用--help能查看更详细的文档，例如`git pull --help`，或者在linux环境使用`man git pull`，其他命令使用一样方式查看

![git pull --help](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220707154502.png)

---
## 二、 本地基本命令使用

---
### 1、撤销修改
> **使用场景：**
> 
> 适用于修改了一个版本库中的文件，想还原
```shell
#在老版本git是git checkout -- <file>...
git restore <file>...
```
使用git status会有提示
```shell
# root @ localhost in /home/chenkun/ChenSino.github.io on git:main x [10:45:12] 
$ git status
位于分支 main
您的分支与上游分支 'origin/main' 一致。

尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
        修改：     package-lock.json

未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
        docs/git/GitCommands.md

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）
```

---
### 2、使用`git reflog`在各个commit中穿梭
> **使用场景：**  
> 使用了`git reset`命令重置了git指针，比如使用`git reset --hard HEAD^`还原到上一个版本后，想再还原到最新的一次提交，再使用`git log`是看不到最新的commit log的，但使用`git reflog`可以看到所有log
```bash
git reflog <commitid>
```

---
### 3、`git rm`
> `git rm file`和直接删除文件的区别？  
> `git rm <file>` 相当于是操作版本库中的文件，删除后直接commit就可以提交，无需执行`git add <file>`，而直接删除文件相当于操作工作目录中的文件，删除 后需要执行`git add <file> `才能commit

图一图片使用git rm 把文件移除版本库后，使用git status查看是绿色的，代表该文件已经在暂存空间

![图一](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220707135422.png)

图二手动直接删除文件后，git status看到的文件是红色的，代表没有在暂存空间，所以需要使用git add才能提交

![图二](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220707135355.png)


## 三、 远程命令使用
*第一章节介绍的是本地版本库操作，没有关联远程仓库，本章节将介绍远程操作，对接gitlab或者github*

### 1、把一个本地仓库关联到远程
步骤：
1. 本地有一个仓库，并且已经纳入git版本库管理
2. 在远程仓库已经建好一个库
3. 把本地的库和远程建立连接

```bash
# 把本地仓库和远程仓库进行关联，origin可以随便取，代表给远程仓库起了一个名字，因为一个仓库可能关联多个远程仓库，比如你的项目想同时发布到github和gitee以及gitlab，那么就需要给远程仓库起个别名，push的时候加上别名，推送到指定的远程仓库
git remote add gitlab <remote-url>
#把<当前>分支的内容推送到别名为gitlab的远程master分支，并且进行关联
git push -u gitlab master
#把<当前>分支的内容推送到别名为gitlab的远程dev分支，并且进行关联
git push -u gitlab dev
```

> **温馨提示：**  
> 为了免密码操作，设置远程url时需要使用ssh地址，比如`ssh://git@gitlab.sonoscape.com:1122/chenxk/gitstudyproject.git`这种。然后把自己的公钥复制到对应的远程仓库秘钥管理，即可进行免密码操作。



---
### 2、查看本地和远程分支关联关系
```shell
git branch -vv

<<<<<<< HEAD
* dev    21a759b [gitlab/dev] 更新Git1.md
  master 21a759b [github/master: 领先 3] 更新Git1.md
=======
  dev    6c63a89 [gitlab/dev] xx
* master f8d3a10 [gitlab/master: 领先 1，落后 1] ooo
>>>>>>> 552a186762f03e5a5d0b6a222db2d146d75c3a78
```

---
### 3、解除和远程仓库关联
```shell
#1.查看关联的远程仓库
$ git remote -v
origin  https://github.com/ChenSino/gitstudyproject.git (fetch)
origin  https://github.com/ChenSino/gitstudyproject.git (push)
sonoscape       ssh://git@gitlab.sonoscape.com:1122/chenxk/gitstudyproject.git (fetch)
sonoscape       ssh://git@gitlab.sonoscape.com:1122/chenxk/gitstudyproject.git (push)


#2. 解除关联
git remote rm origin
```

### 4、git pull
**冲突**  
在实际开发中，冲突发生最多的地方就是多个协同人员往同一个远程分支push代码，这种场景在pull、push非常容易发生冲突，那什么是冲突？
- 多个分支代码合并到一个分支时
- 多个分支向同一个远端分支推送
具体情况就是，多个分支修改了同一个文件(任何地方)或者多个分支修改了同一个文件的名称

如果两个分支中分别修改了不同文件中的部分，是不会产生冲突，直接合并即可

应用在命令中，就是push、pull、stash、rebase等命令下都有可能产生冲突情况，从本质上来讲，都是merge和patch(应用补丁)时产生冲突  


>git pull 相当于git fetch + git merge

当执行`git pull`本地和远程有冲突时会有以下提示，一下提示你指定git pull的默认行为，也可以直接git pull后加--rebase、--no-rebase、--ff-only取代默认行为，后续场景测试都是用的默认` git config pull.rebase false `
```$ git pull
提示：您有偏离的分支，需要指定如何调和它们。您可以在执行下一次
提示：pull 操作之前执行下面一条命令来抑制本消息：
提示：
提示：  git config pull.rebase false  # 合并
提示：  git config pull.rebase true   # 变基
提示：  git config pull.ff only       # 仅快进(ff=fast forward)
提示：
提示：您可以将 "git config" 替换为 "git config --global" 以便为所有仓库设置
提示：缺省的配置项。您也可以在每次执行 pull 命令时添加 --rebase、--no-rebase，
提示：或者 --ff-only 参数覆盖缺省设置。
fatal: 需要指定如何调和偏离的分支。

```
查看当前git默认行为可以用`git config -l`结果如下
```conf
user.name=chenkun
user.email=chenkun@xxx.net
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
remote.gitlab.url=ssh://git@gitlab.xx.com:1122/chenkun/gitstudyproject.git
remote.gitlab.fetch=+refs/heads/*:refs/remotes/gitlab/*
branch.dev.remote=gitlab
branch.dev.merge=refs/heads/dev
pull.rebase=false
```

> **场景1**  
> 本地修改了一个文件A，远程修改了文件B，此时pull是可以成功的  

> **场景2**  
> 本地修改了文件A，远程也修改了文件A ，并且本地修改A后还没有commit，会提示要么stash修改的文件，要么commit。  
> 执行两次git pull结果如下，第一次有一串remote日志代表从远程拉取，第二次则没有拉取了，因为第一次已经把最新的代码拉到暂存区了，侧面印证了git pull包含了git fetch


```shell$ git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
展开对象中: 100% (3/3), 254 字节 | 254.00 KiB/s, 完成.
来自 ssh://gitlab.sonoscape.com:1122/chenxk/gitstudyproject
   266c301..fbc7d85  dev        -> gitlab/dev
更新 266c301..fbc7d85
error: 您对下列文件的本地修改将被合并操作覆盖：
        test.add
请在合并前提交或贮藏您的修改。
正在终止

$ git pull
更新 266c301..fbc7d85
error: 您对下列文件的本地修改将被合并操作覆盖：
        test.add
请在合并前提交或贮藏您的修改。
正在终止

```

> **场景3**  
> 本地修改了文件A，远程也修改了文件A并且本地和远程修改的不是同一行代码 ，并且本地修改A后已经commit，执行git pull是可以直接成功的，pull的时候会自动快速合并，即fast forword模式可以自动判断是否冲突，并且会自动产生一个提交记录，提示类似如下日志

`Merge branch 'main' of github.com:ChenSino/ChenSino.github.io into main`


> **场景4**  
>  本地修改了文件A，远程也修改了文件A，远程如果有删除行、新增行、或远程和本地都修改了同一行，则fast forword模式就没那么智能了，需要人工判断解决冲突，从日志看test.add文件冲突了

```shell
$ git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
展开对象中: 100% (3/3), 276 字节 | 276.00 KiB/s, 完成.
来自 ssh://gitlab.sonoscape.com:1122/chenxk/gitstudyproject
   7a62b52..be452dc  dev        -> gitlab/dev
自动合并 test.add
冲突（内容）：合并冲突于 test.add
自动合并失败，修正冲突然后提交修正的结果。
```
打开冲突文件如下，此时需要手动编辑后再add、commit、push即可
```shell
gaaaaaaaaagaa edit first lineaaaaaaaaaaaaaaa
gaaaaaaagaa edit first lineaaaaaaaaaaaaaaaaa
asgdsg
>>>>>>> HEAD
aaaaasgedit last lineaaaaaaaaaaaaaaaaa
=======
asgedit last lineaaaaaaaaaaaaaaaaaaaa
>>>>>>> be452dc49163e6f8e950d8cd43ad2d79c491be3b

=======
```

**总结**

> 本地和远程未修改同一个文件，则本地无需提交即可pull成功，若本地和远程都修改了某个文件，则需要先把本地修改commit或者stash，然后再pull，若是刚好本地和远程修改了同一行，则pull后需要去手动解决冲突，若是没有修改同一行则无需解决冲突。

### 5、git rebase

#### 5.1 合并多次commit

> 本地有多次commit还没push，此时可以把多次commit记录改成一次，-i 指的是交互式进行(interactive)

```shell
#一下命令可以对当前分支的前n个commit进行进一步处理，
git rebase -i HEAD~n
```

#### 5.2 合并分支

> 合并两个分支，让commit历史保持一条直线，看起来更间接。
>
> 场景：现有两个分支master、dev，dev由master检出，检出后dev和master都分别有commit，现在想合并dev到master，同时要保持分支图谱是一条直线。

下图可看到，dev来自于master，并且之后dev和master都有一次commit

![](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/202207141557178.png)

```shell
#完成操作流程如下
#1. 切换到dev分支
git switch dev


#2. 在dev上rebase
git rebase master


#3. 若出现冲突，则提示如下
$ git rebase master
Auto-merging READM.md
CONFLICT (content): Merge conflict in READM.md
error: could not apply 6c064e6... Commit by branch dev
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply 6c064e6... Commit by branch dev


# 4. 当出现冲突时，在bash命令行分支会显示如下，在dev后面有个REBASE字样，还有1/1代表有一个冲突
204506@204506A MINGW64 /f/GitRepo/gitstudyproject (dev|REBASE 1/1)


#5. 按照提示进入文件解决冲突文件
解决前：
<<<<<<< HEAD
## git命令测试
   - 测试命令
   - 测试命令
   modify by master
=======

modify by dev
>>>>>>> 6c064e6 (Commit by branch dev)

解决后：
## git命令测试
   - 测试命令
   - 测试命令
   modify by master
modify by dev


# 6. 修改冲突后要git add
git add -A;

# 7. 继续rebase，此时会进入交互式命令行，让输入commit信息，因上一次add后还没commit，所以这一步要输入。
#第6步add后，还可以直接commit，那么这一步就不会进入交互式命令行让你输入c
git rebase --continue

#8. 这是dev就变成基于master的一条直线了，所以切换到master就可以直接快进合入
git switch master  
#这一步因为dev已经基于master了，所以肯定能快进合入
git merge dev  



```

