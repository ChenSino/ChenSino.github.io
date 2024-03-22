---
title: refresh_token
date: 2023-05-08
isOriginal: true
---

## 1、 refresh_token介绍

==refresh_token是OAuth2协议中的一个概念==，用于在access_token过期时获取新的access_token，说道token续签大多博客上来就refresh_token巴拉巴拉。在OAuth2协议中，通过客户端以授权服务器的名义请求access_token，客户端会收到access_token和refresh_token，并在access_token过期时使用refresh_token申请新的access_token。refresh_token的安全性非常重要，授权服务器会根据设定的有效期对refresh_token进行管理，以确保对用户的信息和资源进行保护。同时，在使用refresh_token时，也需要进行国家或行业标准的数据保护和安全性认证，以避免出现不必要的风险和隐私泄漏。

## 2、token过期处理

### 2.1 方式一，重新登录

  让用户重新登录，获得新的Token，但是这种方式体验很差，通常Token过期时间都比较短，每次都要重新登录操作。

### 2.2 方式二，续签（刷新）token

续签token,避免用户在操作的过程中被强制下线，续签也有多种方式

1. 在每个请求响应后进行拦截，如果发现请求失败（Token过期导致的）时，刷新Token再刷新请求接口。这种方式的优点是无需Token过期时间字段且无需判断时间，缺点在于多消耗一次请求。
2. 在每个请求发起前进行拦截，根据expires_in判断token是否过期，如果过期则会刷新后再继续请求接口。这个方法的优点是请求前拦截处理，能节省请求次数，缺点是后端需要提供Token过期时间字段，并且需要结合计算机本地时间判断，如果计算机时间被篡改，拦截就会失败。
3. 添加一个过滤器，每个请求进来都重置token的过期时间，这种方式对服务器资源消耗增加了
4. 在OAuth2.0协议中，可以使用refresh_token实现自动续期token。这个方案需要你的应用程序使用OAuth2.0的认证机制，并且获取到了refresh_token。
5. 使用JSON Web Token：对于使用JSON Web Token (JWT)的应用程序，可以在JWT中设置token的过期时间，预先考虑过期时间，合理设置有效期，通常情况下，token的有效期建议短一些，这样更安全。在即将到期时，在后端进行更新或延长有效期。
