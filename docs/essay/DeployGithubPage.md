---
title: 如何在github部署静态网站
date: 2022-03-15
author: Sino
sticky: 5

---

## 1、 GitHubPage介绍

### 1.1 

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
          ACCESS_TOKEN: ${secrets.ACCESS_TOKEN} #在github设置，这里名字要和你设置的保持一致,当
          # 部署到 gh-pages 分支
          BRANCH: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          FOLDER: public

```

***注意***

1. 
