---
title: token自动刷新
date: 2018-03-28  
publish: true
---
#### 问题
 token设置过期时间后，如果不做其他处理，那么会存在一点小问题，比如把token设置有效期为一小时，有个用户登录系统后一直在操作，当到一小时后，突然该用户就被报401，这个体验是非常不好的。
 #### 解决方法
1. 后端解决
思路：后端拦截器中拦截每个请求，每次请求过来，都调用redis重新设置过期，当然redis的key要设计好，每次刷新的都是当前登录用户的key，这样如果你一直操作，则你的过期时间一直在刷新，这个方法比较简单直接。
参考：[后端刷新token](https://gitee.com/y_project/RuoYi-Cloud/blob/0e21fab9785fcdb9e69513dedaf166673ca155e4/ruoyi-gateway/src/main/java/com/ruoyi/gateway/filter/AuthFilter.java)
2. 使用refresh_token
此方法需要前端来实现，后端需要在用户登陆成功后除了返回access_token外还要返回refresh_token，另外还要多提供一个刷新token的接口，前端去判断何时调用该接口。
参考：[refresh_token来自动刷新token](https://blog.csdn.net/cc007cc009/article/details/106820201)