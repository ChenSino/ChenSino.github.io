---
title: springcloudgateway获取客户端真实IP
date: 2024-01-08
author: chensino
publish: true
---

### 场景

在分布式微服务场景下，前后端都是分离的，并且他们一般都是通过nginx反向代理出去，在网关是无法直接通过request对象获取到真实的ip，因为对网关来说
他的客户端是nginx，而非用户真实的ip。

### 准备测试用例

![image-20240108173345473](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20240108173345473.png)

为了测试，我建立了上面的服务，10.10.102.106部署了nginx，仅仅是为了测试，它什么也没做，就是把所有请求转到下一个nginx，第二个nginx和网关在同一服务器上，它负责把请求转到网关，他们的配置如下：


第一个nginx配置：

~~~conf

server{

    listen 8095;
    server_name 10.10.102.106;


    client_max_body_size 1024m;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 2;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
    gzip_disable "MSIE [1-6]\.";



    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_pass http://192.168.93.220:8095;
    }

}

~~~

第二个nginx配置：

~~~conf
server{

    listen 8095;
    server_name 192.168.93.220;
    client_max_body_size 1024m;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 2;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
    gzip_disable "MSIE [1-6]\.";


    location /auth {
        alias  /home/data/SonoProjects/CenterControl/auth-web/dist;
        try_files $uri $uri/ /auth/index.html;
        index index.html index.htm;
        error_page 405 =200 $uri;
    }


    location /api/ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_pass http://127.0.0.1:8005/;
    }

}

~~~


### 解决方案

#### nginx配置

nginx中需要添加两个请求头，分别为X-Real-IP和X-Forwarded-For，配置如下：

~~~
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;


~~~

#### 网关获取

~~~java
//ServerWebExchange
ServerHttpRequest request = exchange.getRequest();
            org.springframework.http.HttpHeaders headers = request.getHeaders();
            //从请求头获取的ip列表就是经过多层代理的ip，通过逗号分割的，但是不会包含localhost，127.0.0.1，因此上面第二个nginx和网关在统一主机上，就不会被记录，

            //最终的X-Forwarded-For: 192.168.93.111,10.10.102.106，理论上应该是192.168.93.111,10.10.102.106,127.0.0.1
            List<String> ipList = Optional.ofNullable(headers.get("X-Forwarded-For"))
                    .map(List::stream)
                    .orElseGet(Stream::empty)
                    .collect(toList());
~~~

获取到ipList的第一个ip就是客户端真实的ip