---
title: SpringSecurityOAuth流程
date:  2023-01-03
author: chenkun
keys:
category:
    - Security
    - OAuth
tag:
---

## 1、时序图

![时序图](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/oauth.drawio.png)

## 2、流程解析

> 本流程是以使用Ruoyi对接Pig授权中心为例，进行讲解，其他网站的的oauth的原理都和这个一样，所以只要把这个流程搞懂了即可，接下来就按照真实的流程进行逐步解析。

### 2.1 第1步

用户还未登录，访问ruoyi前端，ruoyi会自动跳转到自己的登录首页  
![20230104105625](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104105625.png)

### 2.2 第2步

   点击SSO登录会访问如下这样子的一个url,申请授权,(127.0.0.1:3000就是授权服务器)
  `https://127.0.0.1:3000/oauth/authorize?client_id=ruyi&response_type=code&scope=server&redirect_uri=http://127.0.0.1:1024/sso&TENANT-ID=1`，当授权服务收到这个请求时会发现用户还未登录授权服务器，会重定向到授权服务器的登录页面`http://127.0.0.1:3000/token/login`，大概就是下面这样

  ![20230104105039](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104105039.png)

### 2.3 第3步

用户输入帐号密码提交后pig授权中心会校验ruoyi客户端是否合法，就是验证你这个客户端是否在pigx中已经注册，验证通过再验证你输入的用户名密码是否正确，验证通过后再生成一个授权页面，就是和平时我们微信授权给第三方小程序弹出一个让你确认授权的那个界面差不多，参考下一步

### 2.4 第4步

用户点击授权，
![20230104105954](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104105954.png)

### 2.5 第5步

pig授权中心生成授权码

### 2.6 第6步

pig产生授权码后，会带着这个授权码重定向到注册客户端时填的那个地址，这里就是`http://127.0.0.1:1024/sso?code=U1wLD7` 这个地址是在数据库注册好的，它是ruoyi前端的一个页面，并不是后端接口

![20230104110557](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104110557.png)

![20230104110449](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104110449.png)

### 2.7 第7步

ruoyi前端构造一个请求，并且携带code请求ruoyi后端接口，
![20230104110909](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104110909.png)
![20230104110921](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104110921.png)

### 2.8 第8步

ruoyi后端拿到code,发送post请求到`http://127.0.0.1:3000/oauth/token`获取token,注意这是个oauth的默认端点，不是用户写的，在TokenEndPoint类中
![20230104111117](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104111117.png)


### 2.9 第9步

pig授权中心生成token,这里生成token的逻辑可以自定义实现，具体的请参考pig的源码TokenService类
![20230104111420](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104111420.png)

### 2.10 第10步

pig授权中心生成的token返回到ruoyi后端，ruoyi后端拿到token
![20230104111504](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230104111504.png)

### 2.11 第11步

有了token后面的就不再赘述，可以拿token访问资源了，这里其实仅仅用了oauth2的特性来做了一个sso单点登录，并没有用到oauth2的核心来进行资源服务器的访问，oauth2的核心其实是用来无需帐号密码即可访问资源服务器的资源。
