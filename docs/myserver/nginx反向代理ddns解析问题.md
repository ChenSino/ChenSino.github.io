---
title: nginx反向代理ddns问题
date: 2024-12-03
author: chensino
publish: true
isOriginal: true
---

## 问题

nginx反向代理到ddns服务器，当ddns域名绑定ip变化时，ngixn就无法反代了，默认情况下是nginx启动时解析一次域名，缓存下来后面就从缓存获取，所以当ddns绑定ip变化就会出现无法访问

## 解决方法

设置`resovlver`，并且把ddns域名要设置为变量形式，在各自的`location`
模块进行设置

~~~conf
 location / {
            set $ddns "example.com";
            resolver dns29.hichina.com dns30.hichina.com valid=30s ipv6=off;
            proxy_pass https://$ddns:5667;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

~~~

~~如果有多个`location`下都使用了同一个ddns域名，不想重复设置怎么办？
在http模块设置一个map（http模块不支持set），关于map用法这里不做详细介绍，以下map配置只需要把ddns改成你想要的名字即可，在引用的位置也要改成一样，$request不能少~~
==以上多余了，因为同一个ddns，只要在一个地方解析后，其他地方肯定也使用的是新解析的ip了，所以在随便一个location配置一次就行了==

~~~conf
http {
    map $request $ddns {
        default "ddns.chensina.cn";
    }
    #解决ddns绑定ip变化问题
    resolver dns29.hichina.com dns30.hichina.com valid=30s ipv6=off;

      #pve面板
    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name bb.cn;

        ssl_certificate "/etc/nginx/ssl/ssl.pem";
        ssl_certificate_key "/etc/nginx/ssl/ssl.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout 10m;
        ssl_ciphers PROFILE=SYSTEM;
        ssl_prefer_server_ciphers on;

        location / {
            proxy_pass https://$ddns:8006;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

 server {
        listen 9003 ssl http2;
        server_name aa.cn;

        ssl_certificate "/etc/nginx/ssl/ssl.pem";
        ssl_certificate_key "/etc/nginx/ssl/ssl.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout 10m;
        ssl_ciphers PROFILE=SYSTEM;
        ssl_prefer_server_ciphers on;

        location / {
            proxy_pass http://$ddns:9003;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
~~~
