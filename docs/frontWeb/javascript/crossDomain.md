---
title: 前端跨域(一)之vue项目中proxy配置
date: 2022-04-25 16:57:01
categories: 
  - vue知识点
tags: 
  - 必会


---

### **一，同源策略**

 所谓同源是指：协议、域名、端口都相同

### **二，什么是跨域**

跨域就是不同源，就是不满足协议、域名、端口都相同的约定

### **三，跨域的解决方案**

1，jsonp

2，CORS

3，Node中间件代理(两次跨域)

4，nginx反向代理



CORS支持所有类型的HTTP请求，是跨域HTTP请求的根本解决方案

JSONP只支持GET请求，JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。

不管是Node中间件代理还是nginx反向代理，主要是通过同源策略对服务器不加限制。

日常工作中，生产环境用得比较多的跨域方案是cors和nginx反向代理。

本地项目中调试用的最多的就是 node 代理，当然像 nginx、charles（抓包工具）做代理也可以，只要你会配置。



### 四，**vue项目中跨域请求devServer代理的几种配置**

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
