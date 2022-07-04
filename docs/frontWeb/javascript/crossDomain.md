---
title: 前端跨域(一)之vue项目中proxy配置
date: 2022-04-25 16:57:01
categories: 
  - vue知识点
tags: 
  - 必会


---

### **一，同源策略**

 所谓同源是指：当浏览器向后端发送请求时其请求的协议、域名、端口要和当前服务完全一致。比如前端项目的服务位于`http://localhost:8080`，则其发送的所有请求必须是`http://localhost:8080/xxx/xxx`这种格式，否则就会被同源策略拦截。

### **二，什么是跨域**

跨域就是不同源，就是不满足协议、域名、端口都相同的约定。

> **注意**
>
> 发生跨域时，浏览器的请求是已经发送到后端服务了，只是响应被同源策略所拦截。跨域本质上是浏览器行为，和后端没有关系。

### **三，跨域的解决方案**

#### 3.1 前端解决方案

虽然浏览器对于不符合同源策略的访问是禁止的，但是仍然存在例外的情况，如以下资源引用的标签不受同源策略的限制：

- html的script标签
- html的link标签
- html的img标签
- html的iframe标签：对于使用jsp、freemarker开发的项目，这是实现跨域访问最常见的方法，

除了基于HTML本身的特性实现跨域访问，我们还可以使用jsonp、window的postMessage实现跨域访问。这些都是前端实现跨域访问的方式。

#### 3.2 后端解决方案（比如SpringBoot配置CORS注解）

跨域资源共享（CORS）：通过修改Http协议header的方式，实现跨域。说的简单点就是，通过设置HTTP的响应头信息，在浏览器收到响应时告知浏览器哪些情况在不符合同源策略的条件下也可以跨域访问，浏览器通过解析Http协议中的Header执行具体判断。具体的Header如下：

**CROS跨域常用header**

- Access-Control-Allow-Origin: 允许哪些ip或域名可以跨域访问
- Access-Control-Max-Age: 表示在多少秒之内不需要重复校验该请求的跨域访问权限
- Access-Control-Allow-Methods: 表示允许跨域请求的HTTP方法，如：GET,POST,PUT,DELETE
- Access-Control-Allow-Headers: 表示访问请求中允许携带



#### 3.3 反向代理（Nginx、nodejs）

CORS支持所有类型的HTTP请求，是跨域HTTP请求的根本解决方案

JSONP只支持GET请求，JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。

不管是Node中间件代理还是nginx反向代理，主要是通过同源策略对服务器不加限制。

日常工作中，生产环境用得比较多的跨域方案是cors和nginx反向代理。

本地项目中调试用的最多的就是 node 代理，当然像 nginx、charles（抓包工具）做代理也可以，只要你会配置。

其实实现代理跨域的逻辑非常简单：就是在不同的资源服务：js资源、html资源、css资源、接口数据资源服务的前端搭建一个中间层，所有的浏览器及客户端访问都通过代理转发。所以在浏览器、客户端看来，它们访问的都是同一个ip、同一个端口的资源，从而符合同源策略实现跨域访问。

![image-20220704100300804](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220704100300804.png)

### 四，vue项目中跨域请求devServer代理的几种配置

> **温馨提示**
>
> webpack中的devserver.proxy，这个代理拦截的是当前服务，就是说你当前服务是`http://localhost:8080`那么它只会拦截`http://localhost:8080/xx/xx/x`请求，和Nginx的逻辑一模一样。Nginx中配置了一个Server，那么Server中的拦截只会针对当前端口下的url。所以如果你前端地址是`http://localhost:8080`，然后你在axios中的请求地址是`http://otherhost:ip/xxx/xx`那么这个请求是不会被devserver中的proxy拦截的，直接就报跨域了。

作为前端在写vue项目最常见的遇到的就是在devServer中配置代理

> 假如我们要在本地 http://localhost:9001 请求接口地址 http://dx.wh.com:9000 那么会存在跨域。

 **解决跨域**

例如 http://localhost:9001/api/TokenAuth/GetCodeImage中的域名换成 dx.wh.com:9000

相当于把请求换成 

http://dx.wh.com:9000/api/TokenAuth/GetCodeImage

**第一种代理方式：**

  把请求的url写成 /api/TokenAuth/GetCodeImage  (这样调是自动请求的当前域名)

**注意**

请求的地址必须是/api/TokenAuth/GetCodeImage，而不是http://localhost:9001/api/TokenAuth/GetCodeImage，（下面的几种方式也是同样的）因为代理会检查请求开头是否为/api，如果以http开头，则检查不匹配，则不走代理.

```javascript
devServer: {
    proxy: {
        '/api': {
            //要访问的跨域的域名
            target: 'http://dx.wh.com:9000',
            ws: true, // 是否启用websockets
    	     /*开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
          //这样客户端端和服务端进行数据的交互就不会有跨域问题*/
            changOrigin: true,
        }
    }
}
```



相当于遇见/api才做代理，则会把默认域名http://localhost:9001地址改成 target 对应的http://dx.wh.com:9000地址，但是在浏览器的F12下，Network->Headers中看到还是http://localhost:9001/api/TokenAuth/GetCodeImage， 但是真正的请求的地址则是http://dx.wh.com:9000/api/TokenAuth/GetCodeImage.

 **注意：通常我们会在axios里做如下配置**

> axios.defaults.baseURL = 'http://dx.wh.com:9000'

**请求的url如下：**

```javascript
export function getVerifyCodes(params: object) {
    return request({
        url: '/api/TokenAuth/GetCodeImage',
        method: 'get',
        params: params
    })
}
```

那么发出的请求地址就是 http://dx.wh.com:9000/api/TokenAuth/GetCodeImage。是以http开头的并不能匹配上代理。所以并不会走代理。

如果只是修改域名，则不需要写pathRewrite，但如果要写，则必须写成pathRewrite: {’^/api’: ‘/api’}，相当于把/api标识还替换成/api



**第二种代理方式**

把请求的url写成/api/allin/policy/getProductInfo

```javascript
 devServer: {
     proxy: {
         '/api': {
             //要访问的跨域的域名
             target: 'http://www.test.com',
             ws: true,
             changOrigin: true,
             pathRewrite: {
                 '^/api': ''
             }
         }
     }
 }
相当于遇见/api才做代理，但真实的请求中没有/api，
所以在pathRewrite中把’/api’去掉, 这样既有了标识, 又能在请求接口中把/api去掉
```

**第三种代理方式**

 把请求的url写成/allin/getProductInfo。这里请求时我没有写/policy，目的是在拦截跨域是我再加上

```javascript
devServer: {
    proxy: {
        '/allin': {
            //要访问的跨域的api的域名
            target: 'http://www.test.com',
            ws: true,
            changOrigin: true,
            pathRewrite: {
                '^/allin': '/allin/policy'
            }
        }
    }
}

```

 相当于遇见/allin则替换成/allin/policy，注意/policy后边没有/，这样拼接成功才会是http://www.test.com/allin/policy/getProductInfo



**第四种代理方式**

把请求的url写成/allin/getProductInfo。这里请求时我没有写/policy，目的是在拦截跨域是我再加上

```javascript
devServer: {
     proxy: {
         '/allin': {
             //要访问的跨域的api的域名
             target: 'http://www.test.com/allin/policy',
             ws: true,
             changOrigin: true,
             pathRewrite: {
                 '^/allin': '/'  //必须这样写
             }
         }
     }
 }
```

这里/allin相当于http://www.test.com/allin/policy

这里必须要写pathRewrite: { ‘^/allin’: ‘/’}，而且里边必须要写成’^/allin’: ‘/’，这里的斜杠代表的意思就是使用target中的/allin/policy，否则就要使用上面的方式把斜杠写成/allin/policy，并把target中只写域名，如果不写pathRewrite则请求不会成功。


pathRewrite：如果不写则只能修改代理的域名，如果写则可以修改代理的域名和后边的路径

### 五 参考

[详解SpringBoot应用跨域访问解决方案](https://juejin.cn/post/6844903991558537223#heading-4)

[webpack document](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)
