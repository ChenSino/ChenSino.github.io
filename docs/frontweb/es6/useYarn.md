---
title: npm与yarn的区别
date: 2022-10-14 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

## 一，yarn简介

yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个*新的 JS 包管理工具*，yarn 是为了弥补 npm 的一些缺陷而出现的。

## 二，npm的缺陷

- `npm install` **下载速度慢**，重新 install 时速度依旧慢

- 同一个项目，**安装的无法保持一致性**。原因是因为 package.json 文件中版本号的特点导致的，下面三个版本号在安装的时候代表不同的含义。

  ```
  "5.0.3"     # 表示安装指定的5.0.3版本
  "~5.0.3"    # 表示安装5.0.X中最新的版本
  "^5.0.3"    # 表示安装5.X.X中最新的版本
  ```

- 使用 npm 安装多个 js 包时，包会在同一时间下载和安装。安装过程中，其中一个包抛出了一个异常，但 npm 会继续安装其他包，所以错误信息就会在一大堆提示信息中丢失掉，以至于**直到执行前，都不会发现实际发生的错误**。

  

##  三，yarn优点

![image-20221014114909514](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20221014114909514.png)

之前一直有个误区，就是yarn不用设置淘宝镜像，速度慢的话，依旧需要设置

```

yarn config set registry 'https://registry.npm.taobao.org' 

```

[yarn 中文文档](https://yarn.bootcss.com/docs)
