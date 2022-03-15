---
title: 如何在github部署静态网站
date: 2022-03-15
author: Sino
sticky: 5

---

## 1、 GitHubPage介绍

### 1.1 

### 1.2 搭建个人githubpage

个人page和项目page的区别就是个人page只有一个，所谓的个人Page说白了也是一个特殊的项目Page,无非就是它的仓库名字比较特殊，必须为<username>.github.io，比如java框架`spring-cloud.github.io`、`facebook.github.io`，注意个人page的仓库名一定要加上 `.github.io`才算个人Page，不加的话就是一个普通项目了。

个人page有啥特殊之处呢？

在访问页面时可以直接使用https://<username>.github.io,不用加仓库名，普通的项目page,访问时需要加仓库名，比如https://<username>.github.io/<reponame>

## 2、配合github的Action实现自动化部署

### 2.1 自动部署脚本



```yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest #在github服务器使用ubuntu环境

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: "14"

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: npm-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-npm-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.npm-cache.outputs.cache-hit != 'true'
        run: npm install

      # 运行构建脚本
      - name: Build VuePress site
        run: npm run build  #命令和package.json保持一直，本地打包用什么，这里写什么

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: ${secrets.xxx} #在github设置，这里名字要和你设置的保持一致,注意这里不是要你直接写token,是把xxx改成你设置的那个名字就ok了
          # 部署到 gh-pages 分支
          BRANCH: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          FOLDER: public

```

***注意***

1. 在项目根路径新建一个.github/workflows/main.yml，yml中放以上内容
2. 现在github主分支改成了main,所以需要在本地把分支修改一下`git branch -M main`
3. 源码和打包后的public(一般是dist)文件夹分别放在两个分支，我这里源码在main分支，部署是在gh-pages分支，部署脚本会自动创建一个gh-pages分支。
4. ACCESS_TOKEN这里不要直接放密钥，而是放你生成的密钥对应的名字（github设置中那个note字段）
