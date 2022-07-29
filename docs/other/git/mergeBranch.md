---
title: git pull产生临时Merge branch的问题
date: 2022-03-09 16:57:01
categories: 
  - git 操作
tags: 
  - 必会

---



### **一，问题**

​				在git log中往往会发现在log中出现`Merge branch 'master of .....'`这种合并节点，造成日志的污染

![image-20220726115529360](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726115529360.png)



### 二，产生的原因

当多人合作开发一个项目时，本地仓库落后于远程仓库是一个非常正常的事情，可参考下图
![在这里插入图片描述](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20190719174211701.png)

具体情境如下：

我当前拉取的远端版本为 B，此时修改了代码，并在本地仓库 commit 一次，但并未 push 到远端仓库。
		另一位开发者在 B 的基础上，同样 commit 了一次并 push 到远端仓库。那么这个时候，我再 push 自己的代码就会发生错误。

``` bash
To github.com:xxx/xxx.git
! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@github.com:xxx/xxx.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.

```

这个时候我们会选择，先 pull（如果有冲突需要先解决冲突，再 push。push 成功，但是此时我们查看 log 就会发现除了我们自己提交的那条日志之外，会多出一条 “Merge branch ‘master’ of …”。

那么，为什么会出现这种现象呢？其实是与 Git 的工作原理有关，对 Git 比较了解的人应该会知道，无论是 pull、push 亦或是 merge 操作，其实背后都是有很多的不同的模式的。

在进行 pull 操作的同时，其实就是 **`fetch+merge`** 的一个过程。我们从 remote 分支中拉取新的更新，然后再合并到本地分支中去。

如果 `remote `分支超前于本地分支，**并且本地分支没有任何 commit 的，直接从 remote 进行 pull 操作，默认会采用 fast-forward 模式**，这种模式下，并 不会产生合并节点，也就是说不会产生多余的那条 log 信息。

**如果本地先commit后再去pull,那么此时，remote分支和本地分支会出现分叉，这个时候使用pull操作拉取更新时，就会进行分支合并，产生合并节点和log信息**。（总之如果本地有commit记录，只要出现本地分支落后远程分支，那么无论本地文件与远程文件是否有冲突，pull代码都会产生merge节点,本地分支落后于远程分支是无法push代码的)



### 三，解决方法

方法一:   在执行`git pull`的时候加上`–rebase`参数。这参数的意思就是在合并代码之前，先执行变基操作，成功后在进行真正的merge操作。(如果有冲突需要手动解决)

方法二： 在你的`git bash`里执行`git config --global pull.rebase true`。这个配置就是告诉git在每次pull前先进行rebase操作。这种方法和方法1原理一样，只不过方法1是每次pull前都要手动操作。

方法三：修改任何代码之前，先pull代码到本地。

