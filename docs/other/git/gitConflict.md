---
title: git冲突出现的原因
date: 2022-03-09 16:57:01
author: zxf
categories: 
  - git 操作
tags: 
  - 必会

---



## 一，git冲突出现的原因及解决方案

**简单来说就是本地修改的文件和目标远程库的同一个文件都有修改，这时无论是pull,push,merge时都会产生冲突。**

**1.1 本地代码没有commit. 修改同一文件的不同处，依旧会产生冲突。**

- 修改component.html本地文件第11行，既没有add,也没有commit
- 然后修改远程component.html远程文件第14行
- 本地执行git pull,拉取代码提示，同时修改component.html，提示发生冲突

![image-20220723162517914](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723162517914.png)

 此时，有以下3种解决办法。

1. 丢弃本地的发生冲突的文件(`git checkout -- component.html`),然后重新git pull代码

2. 按照提示，先`commit`本地修改，然后再次执行pull操作，得到如下丑陋的提交记录。此时本地`commit`记录便会显示如下的丑陋的`commit`记录。由于发生了冲突，但是由于是修改的不同行，git直接帮我们把本地修改和远程修改直接合并了，并产生了一个新的提交节点 Merge branch.....

   ![img](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/clipboard.png)

   

3. 采用`git stash`先暂存本地代码->然后`git pull` 代码->`git stash pop` 把暂存文件恢复->`git add xxx->git commit -m “xxx”`-> `git push origin master`

   本地没有`commit`的情况下此时采用第3种解决方式会更好，`commit`记录不会产生一个丑陋的合并节点。




**1.2  本地代码已经`commit`但是还没有`push`.  有时候经常会忘记先pull远程代码，直接push代码.如果本地和远程同时修改了同一文件，会产生提示**。

![image-20220723172630686](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723172630686.png)

 看到这个提示:远程代码有修改，本地代码先要合并远程的代码才可以push.

不敢随便点按钮，毕竟不知道编辑器不知道隐藏了什么诡异的操作，给代码搞丢了。

我的操作，先关闭提示框。先执行git pull 同步远程代码，此时编辑器提示我有文件发生了冲突。

![image-20220723173039634](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173039634.png)

点击Merge,选择手动合并冲突的代码。此时也会产生一个合并节点。

![image-20220723173207361](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173207361.png)

然后git add ->git commit -> git push.



**1.3 就算本地和远程没有同时修改同一个文件。只要出现本地分支落后远程分支，就会出现该提示 push rejected的提示，此时我们就要先pull远程代码，然后再push代码即可。**

例如，我在远程新增一个文件，本地没有pull代码，此时本地分支是落后于远程分支的。如果你此时不知情，commit一些代码并准备push代码到远程会收到如下提示：

![image-20220726104412089](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726104412089.png)



此时我的操作是，依旧是关闭这个弹框，执行`git pull` 同步远程代码，这时会产生一个丑陋合并节点，因为远程和本地其实并没有发生冲突，这个merge节点也不会有任何提交内容。



![image-20220726105156403](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105156403.png)

![image-20220726105424098](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105424098.png)



