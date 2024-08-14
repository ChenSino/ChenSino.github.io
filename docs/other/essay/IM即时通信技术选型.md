---
title: IM即时通信选型
date: 2024-08-12
author: chensino
publish: true
isOriginal: true
---

## 1. 背景

    在已有的uni-app项目添加im功能，要求兼容多端（Web、H5、App、小程序），需要选择合适的技术方案。

## 2. 需求分析

针对聊天本身来说，最核心的需求就是：发送文字、图片、文件、语音、视频、消息缓存、消息存储、消息未读、已读、撤回，离线消息、历史消息、单聊、群聊，多端同步，以及其他一些需求。

对用户管理来说，存在的需求包含：添加好友、查看好友列表、删除好友、查看好友信息、创建群聊、加入群聊、查看群成员信息、退出群聊、修改群昵称、拉人进群、踢人出群、解散群聊、填写群公告、修改群备注以及其他用户相关的需求等。

权限管理： 针对群聊不同用户有不同的权限，比如群主、管理员、普通成员，普通成员可以发送消息、撤回消息、删除消息、修改消息、查看消息等，管理员可以管理群成员，修改群昵称、拉人进群、踢人出群、解散群聊、填写群公告、修改群备注等。

## 2. 技术选型目标

![20240812175557](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240812175557.png)

1）业务目标：满足需求分析篇章中的各类需求场景；
2）技术目标：支持扩容，前期最大要能支持万级别用户同时在线聊天；
3）架构目标：高性能、高可用、可监控、可预警、可伸缩，支持扩展。

## 3. 原有方案评估

远程会诊的通信技术使用的是WebRTC技术SFU架构，聊天功能模块是基于WebSocket的通信，WebRTC的优势是音视频通信，其即时聊天的多方建立连接需要依赖于信令服务器。现有架构

## 4. 候选方案

### 4.1 uni-im

### 4.1.1 简介

地址：<https://doc.dcloud.net.cn/uniCloud/uni-im.html>

uni-im是云端一体的、全平台的、免费的、开源即时通讯系统。

- 基于uni-app，App、小程序、web全端兼容
- 基于uniCloud，前后端都使用js开发
- 基于uni-push2，专业稳定的全端推送系统
- 基于uni-id，完善的账户体系
- 支持服务端为非uniCloud（比如：应用服务端的开发语言是php、java、go、.net、python、c#等）或 不基于uni-id-pages 开发的项目接入

### 4.1.2 优势

- 性价比高；前后端代码均免费开源，相比同类产品使用uni-im仅需花费极少的托管在uniCloud（serverless服务器）产生的费用详情查看

- 比较详细的文档支持
- 前端工作量大大减少
- 全端可用
- App端支持nvue，更好的长列表性能。list组件性能优势详情参考
- 中心化响应式数据管理，切换会话无需重新加载数据，更流畅的体验
- App端聚合多个手机厂商推送通道，app不在线也可以收到消息

### 4.1.3 劣势

- 收费
- 无自己的服务端
- 服务端的开发语言java，用户登录所获得的token，与uni-im所需的token不是同一个账号体系； 需要在传统服务器端，通过uni-id的外部系统联登同步你项目的账号数据到uni-im用户体系并获得uni-id的token
- 使用第三方服务器，数据安全性问题

> CDN流量、出网流量、存储费用比较贵

### 4.1.4 费用

按量计费：

- 调用10000次云函数0.0133元
- 调用10000次数据库查询仅0.015元

私聊一次： `1次云函数请求、2次数据库读操作、2次数据库写操作、1次uni-push2推送操作，即 (1 * 0.0133 + 2 * 0.015 + 2 * 0.05 + 1 * 0.0283)/10000 ≈ 0.000017元`

500人的群聊：`1次云函数请求、4次数据库读操作、2次数据库写操作、1次uni-push2推送操作，即 (1 * 0.0133 + 4 * 0.015 + 2 * 0.05 + 1 * 0.0283)/10000 ≈ 0.000020元`

<table><thead><tr><th style="text-align:center;">资源分类</th> <th style="text-align:center;">资源细项</th> <th style="text-align:center;">售价（元）</th></tr></thead> <tbody><tr><td rowspan="3" style="text-align:center;">云函数</td> <td style="text-align:center;">资源使用量（GBs）</td> <td style="text-align:center;">0.000110592</td></tr> <tr><td style="text-align:center;">调用次数（万次）</td> <td style="text-align:center;">0.0133</td></tr> <tr><td style="text-align:center;">出网流量（GB）</td> <td style="text-align:center;">0.8</td></tr> <tr><td rowspan="3" style="text-align:center;">云数据库</td> <td style="text-align:center;">容量（GB/天）</td> <td style="text-align:center;">0.07</td></tr> <tr><td style="text-align:center;">读操作使用量（万RU）</td> <td style="text-align:center;">0.015</td></tr> <tr><td style="text-align:center;">写操作使用量（万RU）</td> <td style="text-align:center;">0.05</td></tr> <tr><td rowspan="4" style="text-align:center;">云存储</td> <td style="text-align:center;">容量（GB/天）</td> <td style="text-align:center;">0.0043</td></tr> <tr><td style="text-align:center;">下载操作次数（万次）</td> <td style="text-align:center;">0.01</td></tr> <tr><td style="text-align:center;">上传操作次数（万次）</td> <td style="text-align:center;">0.01</td></tr> <tr><td style="text-align:center;">CDN 流量（GB）</td> <td style="text-align:center;">0.18</td></tr> <tr><td rowspan="2" style="text-align:center;">前端网站托管</td> <td style="text-align:center;">容量（GB/天）</td> <td style="text-align:center;">0.0043</td></tr> <tr><td style="text-align:center;">流量（GB）</td> <td style="text-align:center;">0.18</td></tr></tbody></table>

套餐计费：

<table><thead><tr><th style="text-align:center;">资源分类</th> <th style="text-align:center;">资源细项</th> <th style="text-align:center;">免费版</th> <th style="text-align:center;">基础版</th> <th style="text-align:center;">标准版</th> <th style="text-align:center;">专业版</th> <th style="text-align:center;">企业版</th> <th style="text-align:center;">旗舰版</th></tr></thead> <tbody><tr><td rowspan="3" style="text-align:center;">云函数	</td> <td style="text-align:center;">资源使用量（GBs/月）</td> <td style="text-align:center;">1000</td> <td style="text-align:center;">1万</td> <td style="text-align:center;">20万</td> <td style="text-align:center;">40万</td> <td style="text-align:center;">150万</td> <td style="text-align:center;">400万</td></tr> <tr><td style="text-align:center;">调用次数（万次/月）</td> <td style="text-align:center;">1.5</td> <td style="text-align:center;">15</td> <td style="text-align:center;">300</td> <td style="text-align:center;">600</td> <td style="text-align:center;">2400</td> <td style="text-align:center;">6000</td></tr> <tr><td style="text-align:center;">出网流量（GB/月）</td> <td style="text-align:center;">1</td> <td style="text-align:center;">1</td> <td style="text-align:center;">20</td> <td style="text-align:center;">40</td> <td style="text-align:center;">160</td> <td style="text-align:center;">500</td></tr> <tr><td rowspan="5" style="text-align:center;">云数据库	</td> <td style="text-align:center;">容量（GB）</td> <td style="text-align:center;">2</td> <td style="text-align:center;">2</td> <td style="text-align:center;">3</td> <td style="text-align:center;">5</td> <td style="text-align:center;">10</td> <td style="text-align:center;">10</td></tr> <tr><td style="text-align:center;">读操作使用量（万RU/天）</td> <td style="text-align:center;">0.05</td> <td style="text-align:center;">5</td> <td style="text-align:center;">25</td> <td style="text-align:center;">50</td> <td style="text-align:center;">150</td> <td style="text-align:center;">500</td></tr> <tr><td style="text-align:center;">写操作使用量（万WU/天）</td> <td style="text-align:center;">0.03</td> <td style="text-align:center;">3</td> <td style="text-align:center;">15</td> <td style="text-align:center;">30</td> <td style="text-align:center;">100</td> <td style="text-align:center;">300</td></tr> <tr><td style="text-align:center;">集合数量</td> <td style="text-align:center;">100</td> <td style="text-align:center;">100</td> <td style="text-align:center;">100</td> <td style="text-align:center;">100</td> <td style="text-align:center;">100</td> <td style="text-align:center;">100</td></tr> <tr><td style="text-align:center;">索引数量</td> <td style="text-align:center;">400</td> <td style="text-align:center;">400</td> <td style="text-align:center;">400</td> <td style="text-align:center;">400</td> <td style="text-align:center;">400</td> <td style="text-align:center;">400</td></tr> <tr><td rowspan="4" style="text-align:center;">云存储	</td> <td style="text-align:center;">容量（GB）</td> <td style="text-align:center;">5</td> <td style="text-align:center;">8</td> <td style="text-align:center;">10</td> <td style="text-align:center;">50</td> <td style="text-align:center;">100</td> <td style="text-align:center;">500</td></tr> <tr><td style="text-align:center;">下载操作次数（万次/月）</td> <td style="text-align:center;">0.2</td> <td style="text-align:center;">10</td> <td style="text-align:center;">200</td> <td style="text-align:center;">750</td> <td style="text-align:center;">1500</td> <td style="text-align:center;">3750</td></tr> <tr><td style="text-align:center;">上传操作次数（万次/月）</td> <td style="text-align:center;">0.1</td> <td style="text-align:center;">5</td> <td style="text-align:center;">100</td> <td style="text-align:center;">300</td> <td style="text-align:center;">600</td> <td style="text-align:center;">1500</td></tr> <tr><td style="text-align:center;">CDN流量（GB/月）</td> <td style="text-align:center;">1</td> <td style="text-align:center;">2</td> <td style="text-align:center;">10</td> <td style="text-align:center;">50</td> <td style="text-align:center;">150</td> <td style="text-align:center;">500</td></tr> <tr><td rowspan="2" style="text-align:center;">前端网页托管</td> <td style="text-align:center;">容量（GB）</td> <td style="text-align:center;">5</td> <td style="text-align:center;">8</td> <td style="text-align:center;">10</td> <td style="text-align:center;">50</td> <td style="text-align:center;">100</td> <td style="text-align:center;">500</td></tr> <tr><td style="text-align:center;">CDN流量（GB/月）</td> <td style="text-align:center;">1</td> <td style="text-align:center;">2</td> <td style="text-align:center;">10</td> <td style="text-align:center;">50</td> <td style="text-align:center;">150</td> <td style="text-align:center;">500</td></tr> <tr><td colspan="2" style="text-align:center;">售价（元/月）</td> <td style="text-align:center;">免费</td> <td style="text-align:center;">5</td> <td style="text-align:center;">24</td> <td style="text-align:center;">82</td> <td style="text-align:center;">316</td> <td style="text-align:center;">688</td></tr></tbody></table>

名词解释：

<table><thead><tr><th style="text-align:center;">资源分类</th> <th style="text-align:center;">资源细项</th> <th style="text-align:center;">说明</th> <th style="text-align:center;">数据更新延迟时间</th></tr></thead> <tbody><tr><td rowspan="3" style="text-align:center;">云函数</td> <td style="text-align:center;">资源使用量（GBs）</td> <td style="text-align:center;">资源使用量GBs = 函数配置内存GB × 运行计费时长s。 例如，配置为256MB的函数，单次运行了1760ms，计费时长为1760ms，则单次运行的资源使用量为(256 / 1024) × (1760 / 1000) = 0.44GBs</td> <td style="text-align:center;">20分钟</td></tr> <tr><td style="text-align:center;">调用次数</td> <td style="text-align:center;">-</td> <td style="text-align:center;">20分钟</td></tr> <tr><td style="text-align:center;">出网流量（GB）</td> <td style="text-align:center;">在云函数中访问外网时产生的出网流量，包含请求三方服务器发送的数据和返回给客户端的数据。</td> <td style="text-align:center;">20分钟</td></tr> <tr><td rowspan="3" style="text-align:center;">云数据库</td> <td style="text-align:center;">容量（GB）</td> <td style="text-align:center;">-</td> <td style="text-align:center;">1小时</td></tr> <tr><td style="text-align:center;">读操作使用量（RU）</td> <td style="text-align:center;">读操作使用量（Read Unit）= ceil(查询数据量KB / 4)，即从数据表中读取一条4 KB数据（向上取整）计作1RU，例如读取7.6 KB的数据计作2RU。</td> <td style="text-align:center;">20分钟</td></tr> <tr><td style="text-align:center;">写操作使用量（WU）</td> <td style="text-align:center;">写操作使用量（Write Unit）= ceil(写入数据量KB / 1)，即向数据表中写入一条1 KB数据（向上取整）计作1WU，例如写入1.8 KB的数据计作2WU。</td> <td style="text-align:center;">20分钟</td></tr> <tr><td rowspan="4" style="text-align:center;">云存储</td> <td style="text-align:center;">容量（GB）</td> <td style="text-align:center;">-</td> <td style="text-align:center;">6小时</td></tr> <tr><td style="text-align:center;">下载操作次数</td> <td style="text-align:center;">通过CDN加速访问的次数，回源次数暂不收费。</td> <td style="text-align:center;">6小时</td></tr> <tr><td style="text-align:center;">上传操作次数</td> <td style="text-align:center;">-</td> <td style="text-align:center;">6小时</td></tr> <tr><td style="text-align:center;">CDN 流量（GB）</td> <td style="text-align:center;">通过CDN加速产生的流量，回源流量暂不收费。</td> <td style="text-align:center;">6小时</td></tr> <tr><td rowspan="2" style="text-align:center;">前端网站托管</td> <td style="text-align:center;">容量（GB）</td> <td style="text-align:center;">-</td> <td style="text-align:center;">6小时</td></tr> <tr><td style="text-align:center;">CDN 流量（GB）</td> <td style="text-align:center;">通过CDN加速产生的流量，回源流量暂不收费。</td> <td style="text-align:center;">6小时</td></tr></tbody></table>

### 4.2 J-IM

GIT地址：<https://gitee.com/xchao/j-im>

#### 4.2.1 简介

J-IM 是用JAVA语言开发的轻量、高性能、单机支持几十万至百万在线用户IM，主要目标降低即时通讯门槛，快速打造低成本接入在线IM系统，通过极简洁的消息格式就可以实现多端不同协议间的消息发送如内置(Http、Websocket、Tcp自定义IM协议)等，并提供通过http协议的api接口进行消息发送无需关心接收端属于什么协议，一个消息格式搞定一切！

#### 4.2.2 特性

> 1、高性能(单机可支持几十万至百万人同时在线)
> 2、轻量、可扩展性极强
> 3、支持集群多机部署
> 4、支持SSL/TLS加密传输
> 5、消息格式极其简洁(JSON)
> 6、一端口支持可插拔多种协议(Socket自定义IM协议、Websocket、Http),各协议可分别独立部署。
> 7、内置消息持久化(离线、历史、漫游)，保证消息可靠性，高性能存储
> 8、各种丰富的API接口。
> 9、零成本部署，一键启动。

#### 4.2.3 劣势

1. 项目不活跃长期不更新
2. 没有完善的文档支持，官网打不开

### 4.3 cim

GIT地址: <https://gitee.com/farsunset/cim>

#### 4.3.1 简介

CIM是一套完善的消息推送框架，可应用于信令推送，即时聊天，移动设备指令推送等领域。开发者可沉浸于业务开发，不用关心消息通道长连接、消息编解码协议等繁杂处理。

CIM采用业内主流开源技术构建，易于扩展和使用，并完美支持集群部署支持海量链接，目前支持websocket，android，ios，桌面应用，系统应用等多端接入持,可应用于移动应用，物联网，智能家居，嵌入式开发，桌面应用，WEB应用即时消服务。

#### 4.3.2 优势

1. 维护时间比较长，10年了 ，目前还在活跃提交代码
2. 提供多个客户端SDK（android/.net/fluttter/ios/swift/uniapp/web）
3. 有web/vue/android的demo，有后台管理
4. 文档详细，开发起来会比较方便

#### 4.3.3 劣势

1. 按照平台SDK收费，uni-app（h5,android,ios）价格20000元

#### 4.3.4 收费

![20240813112230](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240813112230.png)

### 4.4 V-IM

GIT地址:<https://gitee.com/alyouge/V-IM>

#### 4.4.1 简介

开源与企业版功能点对比
![20240813112349](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240813112349.png)

企业版优势

> 多终端支持：PC(windows、linux、mac、web)
手机（安卓、IOS、H5、小程序）；
上传支持两种方案(直接存服务器和minio)；
私有云代码仓库永久更新，无加密部分，不依赖第三方。
一对一技术支持。
bug修复优先级最高。
支持付费定制化需求。
功能更新频率高。
聊天记录存储在mongoDB；
支持国产化部署，服务端已对接到snowy开源项目（分支版本）。

#### 4.4.2 企业版收费情况

    2980元，交付源码

### 4.5 MobileIMSDK

#### 4.5.1 简介

> 历经10年、久经考验；
超轻量级、高度提炼，lib包50KB以内；
精心封装，一套API同时支持UDP、TCP、WebSocket三种协议（可能是全网唯一开源的）；
客户端支持iOS、Android、标准Java、H5(暂未开源)、微信小程序(暂未开源)、Uniap(暂未开源)；
服务端基于Netty，性能卓越、易于扩展 new；
可与姊妹工程 MobileIMSDK-Web 无缝互通实现网页端聊天或推送等；
可应用于跨设备、跨网络的聊天APP、企业OA、消息推送等各种场景。

![20240813114025](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20240813114025.png)

#### 4.5.2 优势

1. 轻量级，可支持多端多协议，可扩展性极强
2. 源码价格便宜，源码注释详细

#### 4.5.3 劣势

1. 仅有源码和注释没有技术支持 

### 4.6 野火IM/im-server

GIT地址：<https://gitee.com/wfchat/im-server>

#### 4.6.1 简介

野火IM是一套通用的即时通讯和实时音视频组件，能够更加容易地赋予客户IM和RTC能力，使客户可以快速的在自有产品上添加聊天和通话功能或者直接使用野火提供的应用。使用野火可以替代云通讯产品或减少自研即时通讯和实时音视频的工作量，降低客户研发成本和难度。

#### 4.6.2 提供产品

1. 即时通讯服务(IM Server)
2. 应用服务
3. 推送服务
4. Android 客户端
5. iOS 客户端
6. PC 客户端
7. Web 客户端
8. 小程序 Demo
9. uni-app Demo
10. 机器人服务
11. 开发平台
12. 频道（公众号）管理系统
13. IM 管理后台系统

#### 4.6.3 优势

1. 核心功能免费开源
2. 文档齐全
3. 支持多端

## 5. 技术评估标准

## 6. 风险评估

### 6.1 鸿蒙系统的兼容性

## 7. 最终建议
