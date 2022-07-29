---
title: git rebase的使用
date: 2022-03-09 16:57:01
author: zxf
categories: 
  - git 操作
tags: 
  - 必会
---

### 一，用于合并当前分支的多个commit记录

应用场景，如下第2-4次提交是对同一功能的代码提交记录，完全可以合并成一次提交记录。这个时候rebase就很有用了。

![image-20220724180044950](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724180044950.png)

1. #### **找到想要合并的commit, 使用rebase -i**

   ```
   git rebase -i bd0d758(第一次提交的commitId)
   ```

   > 注意 git rebase -i [startPonit] [endPoint]
   >
   > 前开后闭 区间 这里的 [startPonit] 是指需要合并的commit的前一个commit (即当前示例中的 “bd0d758: 第一次提交”)。 因为, 三个commit肯定要基于上一个commit合并成了新的commit。
   > 谨慎使用[endPoint] 省略, 即默认表示从起始commit一直到最后一个，但是一旦你填写了, 则表示 [endPoint]后面的commit全部不要了!

![image-20220724181559992](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724181559992.png)

![image-20220724181803651](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724181803651.png)

#### 2，进入Interact交互界面

![image-20220724181831357](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724181831357.png)

**`说明`**

- 最上面三行, 就是刚刚选中的三个commit, 按时间顺序依次往下排序(和git log的展示顺序是反的, 大家查看的时候要注意)
- 前面的三个Pick 其实就是下面 **Commands展示的7种命令中的第一个p**, 也就是使用commit。

#### 3，使用s命令 合并到上一个commit

![image-20220724182138971](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724182138971.png)

#### 4.修改commit记录

### ![image-20220724182435924](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724182435924.png)

再此执行git log 可以发现234此提交合并为一个了

![image-20220724182807371](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724182807371.png)

![image-20220724182912368](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724182912368.png)

### 二、使用rebase替代merge合并分支

2.1 使用merge合并分支代码

**注意：当只有dev分支有提交，master分支没有任何提交，dev分支merge到master分支上，依旧是保持一条直线，也没有多余的提交。**

![image-20220724212609039](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724212609039.png)


**给master新增两个提交，dev分支与master分支立即就会不重合，不在一条直线上。**

![image-20220724213219850](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724213219850.png)

再给dev分支新增一个commit  "dev新增代码1"可以看出提交节点是按事件排序的，可以看到dev分支的节点显示再master前面。

![image-20220724213304415](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724213304415.png)

3,切换到master分支，直接merge dev

![image-20220724213729960](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724213729960.png)

提示产生冲突，因为master前两次提交，与dev最后一次提交都更改过了readme.txt文件，所以合并分支会产生冲突。

![image-20220724214028599](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724214028599.png)

合并代码，->commit "合并分支dev到master上面"

![image-20220724214057554](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724214057554.png)

git 分支就显示如下图所示

!(https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724214320960.png)

![image-20220724214614292](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724214614292.png)

总之，merge dev分支到master上会出现以下结果：

1. 会保留所有的commit(hashId不变)

2. 按提交顺序排序

3. 产生新的commit点(Merge branch ‘XXX’ into develop)（这里的我的显是合并分支dev到master上面）

   

2.2 使用rebase合并dev分支到master上



**1,切换当前分支为dev**

```` bash
git switch  dev
````

**2，给dev变基到master (如果有冲突需解决冲突)**

``` bash
git rebase master
```

![image-20220724220033035](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724220033035.png)



**3，提示解决冲突，去冲突文件解决冲突。解决冲突后，执行命令**

``` bash
git add '冲突文件'
git rebase --continue
```
执行完`git rebase --continue` 进入以下界面
![image-20220724220336167](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724220336167.png)

这里是修改commit 信息

修改完按`:wq`保存退出。

![image-20220724220742643](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724220742643.png)

此时`dev`分支和`master`分支已经重合


![image-20220724221217031](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724221217031.png)



**4，合并dev代码到master上**

``` bash
git switch master
git merge dev
```
此时master分支与dev分支在同一个提交节点了。

![image-20220724221734501](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220724221734501.png)





