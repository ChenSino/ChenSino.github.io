---
title: 多模块maven项目的搭建
date:  2022-07-28
author: chenkun
publish: true
keys:
---

## 1、一个真实的多模块maven项目

```bash
$ tree -d -L 2
.———————————————————————————————————最顶级pom所在目录
├── ccs-auth
│   ├── src
│   └── target
├── ccs-common——————————————————————通用模块聚合
│   ├── ccs-common-bom——————————————此模块是个pom类型的，负责管理整个项目jar包版本
│   ├── ccs-common-core
│   ├── ccs-common-data
│   ├── ccs-common-datasource
│   ├── ccs-common-feign
│   ├── ccs-common-gateway
│   ├── ccs-common-gray
│   ├── ccs-common-log
│   ├── ccs-common-oss
│   ├── ccs-common-security
│   ├── ccs-common-sentinel
│   ├── ccs-common-sequence
│   ├── ccs-common-swagger
│   └── ccs-common-transaction
├── ccs-data——————————————————————业务模块data，按照api和biz聚合
│   ├── ccs-data-api
│   └── ccs-data-biz
├── ccs-gateway
│   ├── src
│   └── target
├── ccs-panel
│   ├── ccs-panel-api
│   └── ccs-panel-biz
├── ccs-register
│   ├── src
│   └── target
├── ccs-upms
│   ├── ccs-upms-api
│   └── ccs-upms-biz
├── ccs-visual
│   ├── ccs-codegen
│   ├── ccs-oa-platform
│   └── ccs-tx-manager
├── ccs-weibao
    ├── ccs-weibao-api
    └── ccs-weibao-biz

```

说明：  
通用模块common是一个多模块聚合的，其中有个common-bom是专门负责管理整个项目jar包版本。其他的data和weibao等是业务模块，业务模块一般分为两个子模块聚合在一起，分别是api和biz