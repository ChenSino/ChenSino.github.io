---
title: 批量删除github仓库
date: 2023-02-22
isOriginal: true
---

## 背景

github上fork了很多仓库，但是平时又没看，所以索性删除，一个个删除又很慢，所以搞个脚本批量删除

## 方法

~~~markdown
1. 到github配置一个token,https://github.com/settings/tokens
2. 准备一个文件放置待删除的仓库，每行一个仓库名
3. 用脚本批量删除
~~~

脚本：

~~~shell
# 将 DELETE_KOKEN 和 GithubName 都替换为自己的
DELETE_KOKEN="你的token"
#GITHUB名字
GithubName="你的github名字"
#待删除仓库，每行一个
REPOS_FILE='待删除的仓库，一行一个仓库'

for repName in $(cat $REPOS_FILE)
do
    echo "Delete "$repName
    curl -XDELETE -H "Authorization: token ${DELETE_KOKEN}" https://api.github.com/repos/${GithubName}/${repName}
done
~~~
