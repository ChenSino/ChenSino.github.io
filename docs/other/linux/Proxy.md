---
title: 梯子搭建
date: 2023-11-10
author: chensino
publish: true
---

## 需求

局域网内部有个电脑可以同时访问内外网（把他叫做梯子电脑），但是其他电脑只能访问内网，要求实现其他电脑通过梯子电脑实现访问百度，并且实现访问谷歌。

这里其实有两个墙，第一道墙是实现访问外网这个墙是公司内部的墙，即百度等这些网站，第二道墙是实现访问谷歌，这个墙是我党的墙。

~~~sh
# run v2raya
docker run -d \
  --restart=always \
  --privileged \
  --network=host \
  --name v2raya \
  -e V2RAYA_ADDRESS=0.0.0.0:2017 \
  -v /lib/modules:/lib/modules:ro \
  -v /etc/resolv.conf:/etc/resolv.conf \
  -v /etc/localtime:/etc/localtime \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2raya
~~~

~~~sh
##xray
 docker run -d -p 7777:9000 --name xray --restart=always -v /etc/xray:/etc/xray -v /etc/localtime:/etc/localtime  teddysun/xray
~~~
