---
title: 前端跨域(二)之JSONP跨域
date: 2022-04-25 16:57:01
categories: 
  - vue知识点
tags: 
  - 必会
---


### 一，什么是JSONP 

> Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。

为什么我们从不同的域（网站）访问数据需要一个特殊的技术( JSONP )呢？这是因为同源策略。
同源策略，它是由 Netscape 提出的一个著名的安全策略，现在所有支持 JavaScript 的浏览器都会使用这个策略。

### 二，JSONP的原理

```text
  我们知道，在页面上有三种资源是可以与页面本身不同源的。它们是：js脚本，css样式文件，图片。像taobao等大型网站，很定会将这些静态资源放入cdn中，然后在页面上链接。而jsonp就是利用了<script>标签可以链接到不同源的js脚本，来到达跨域目的。
  于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、Web socket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；
```



### 三,JSONP的具体实现

JSONP实现跨域请求的具体实现就是动态创建script标签，利用“src”不受同源策略约束的性质来实现跨域获取数据。

**1，服务端JSONP格式数据**

```text
如客户想访问 : https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction。

假设客户期望返回数据：["customername1","customername2"]。

真正返回到客户端的数据显示为: callbackFunction(["customername1","customername2"])。
```

```php
<?php
header('Content-type: application/json');
//获取回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
//json数据
$json_data = '["customername1","customername2"]';
//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")";
?>

```

**2，客户端接收**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSONP 实例</title>
</head>
<body>
<script>
  function callbackFunction(data){
    console.log("i got it")
    console.log(data);
  }
</script>
<script>
  window.onload=function(){
    var script=document.createElement("script");
    script.src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction";
    document.head.append(script)
  }
</script>
</body>
</html>
```


**2.2，用jQuery中$.getJSON()实现JSONP**

$.getJSON()方法允许通过使用JSONP形式的回调函数来加载其他网域的JSON数据.
使用$.getJSON()方法实现跨域请求，需要在请求路径URL后增加callback＝?, jQuery将自动替换“？”为正确的函数名，以执行回调函数。

  **注：下面代码中路径后是jsoncallback=？，因为服务端的代码中回调函数名为jsoncallback，前后端应该是一致的**


```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSONP 实例</title>
    <script src="https://cdn.static.runoob.com/libs/jquery/1.8.3/jquery.js"></script>    
</head>
<body>
<script>
$.getJSON("https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?",function(data){console.log(data);})
</script>
</body>
</html>

```

**2.3 用jQuery中$.ajax()实现JSONP**


$.ajax()方法同样可以实现JSONP跨域请求，我们主要来看看它的一些选项参数：

1. - url：请求地址
1. - type：请求方式
1. - dataType：“jsonp” 必写，设置服务器端返回的数据类型，这里是"jsonp"
1. - jsonp：获得jsonp回调函数名的参数名（跟服务端保持一致）
1. - success：请求成功后的回调函数。


```javascript
$.ajax({
        url: "https://www.runoob.com/try/ajax/jsonp.php",
        type: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(data){
            console.log(data); //["customername1","customername2"]
        }
    })
```


### 四,总结

1，我们知道 script，link, img 等等标签引入外部资源，都是 get 请求的，那么就决定了 jsonp 一定是 get请求。



![jsonp图片](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/1045378-20220426095036509-990636020.jpg)
