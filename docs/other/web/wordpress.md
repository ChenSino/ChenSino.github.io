---
title: wordpress
date: 2025-05-23
author: chensino
publish: true
isOriginal: false
category:
  - wordpres
---

## 同时使用IP地址和域名访问WordPress

默认情况下配置好了访问域名后只能通过域名访问，即使使用ip访问也会重定向到域名访问，如下图，
![图一](https://ddns.chensina.cn:2032/afatpig/blog/20250523203808283.png)

我的wordpress是部署在内网服务器，通过ddns进行访问，因ddns无法使用443端口，所以走了一个公网进行转发，我希望实现的效果是可以同时公网访问，另外还要可以内网访问（方便我远程debug），架构如下
![图二](https://ddns.chensina.cn:2032/afatpig/blog/20250523212731796.png)

实现方式如下：

1. 配置wordpress使用域名访问，参考图一
2. 修改${wordpress路径}/wp-includes/option.php代码
~~~php
//找到get_option函数，修改其名字为get_option_origin，再新建一个get_option函数，
function get_option( $option, $default = false ) {                          //自己写一个get_option函数
    $my_option=get_option_origin($option,$default);                         //调用原来的函数
    if($option=="siteurl" || $option == "home"){                        //针对siteurl和home做修改，其他不变
        if($_SERVER['HTTP_HOST']!="nuofeng.chensina.cn"){                  //如果不是用域名访问的
            $my_option="http://".$_SERVER['HTTP_HOST'];  //就跳转到当前URL里的服务器地址，比如本地的localhost或局域网访问的192.168.1.105，这里注意不能拼接端口
        }
    }
    return $my_option;
}
~~~

![图三](https://ddns.chensina.cn:2032/afatpig/blog/20250523213404503.png)