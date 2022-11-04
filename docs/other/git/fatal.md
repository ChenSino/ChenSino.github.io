---
title: git冲突出现的原因
date: 2022-03-09 16:57:01
author: zxf
category: 
  - git 操作
tag: 
  - 必会

---

## 如何解决 fatal: unable to access...的问题

一，在终端输入

```bash
ping github.com
```

二，试试这个

```bash

git config --global --unset http.proxy

git config --global --unset https.proxy

```

