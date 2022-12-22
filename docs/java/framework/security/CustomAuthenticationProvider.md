---
title: Security扩展自定义登录方式
date:  2022-12-22
author: chensino
keys:
category:
    - Security
tag:
---

## 1、需求

～～～markdown
前后分离项目使用不同登录方式进行登录
    1. 使用最近本的帐号/密码登录
    2. 使用手机号/验证码登录
～～～

## 2、实现方法

Security是一个扩展性很强的框架，预留了各种端点进行扩展，多种方式登录需要扩展AuthenticationProvider，进行自定义实现。默认情况
Security使用的是DAOAuthenticationProvider，就是从数据库中读取用户名/密码进行校验。