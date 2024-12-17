---
title: 前后端分离项目OAUTH2.0
date: 2018-03-28  
publish: true
---

#### OAUTH2.0 业务需求
因业务需求，需要把两个不相干的系统帐号打通，要求A系统的帐号能登录B系统。从网上找的教程都千篇一律，廖雪峰老师的讲的算是比较透彻，不过没有提怎么实现前后端分离的项目。网上的教程都是前后端放一起，后端在oauth流程结束后很容易把token以及获取到的三方帐号给到前端，然后对于完全前后端分离的项目来说，前后端都是独立的服务，存在跨域，前端如果不主动请求后端，那么后端拿到的oauth信息是无法给到前端了。
#### 解决方法
最后通过强大的谷歌找到了方法，参考的[OAUTH2.0前后分离](https://www.jianshu.com/p/da54bad42b30)，最终用的这个博主的方法实现了前端获取后端传送来的token，以及三方用户信息。

##### 补充
oauth流程结束后，拿到的token是第三方的token（比如github，微信），这个token是不能直接登录我们自己的系统的，所以拿到三方token后，需要在后端做一些业务逻辑工作，网上的教程基本都没有提到这点，所以很多第一次用OAUTH的用户有很多疑惑。
以微信为例，我们拿到微信的token后，可以在后端带上这个token去请求微信的开放接口，获取这个token对应的微信用户名（id），邮箱等。 然后，有了微信id，我们需要把这个id和我们自己的系统id对应起来，这里就是我们常见的页面，比如你用微信登录一个网站，登录进去一般自动跳转到一个页面，这个页面回让你把微信和你之前已经注册过的帐号进行绑定，如果以前没注册就注册一个……
	想一下，如果不把微信id和已有的帐号绑定会存在什么问题，一个人相当于在同一个系统有了两个帐号使用微信登录和原系统的帐号登录得到不同的结果，太可怕了。。。

##### 代码
1. 前端
前端使用window.open弹出一个窗口，该窗口显示的内容是需要从后端获取，即调用githubUrl去请求
```html
<a @click="githubLogin">使用github账号登录</a>
```

```javascript
  githubLogin() {
      const githubUrl = 'http://localhost:8000/auth/githubLogin'
      //  弹出 500 * 500 的窗口
      window.open(githubUrl, 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
      //  通过监听，父页面可以拿到子页面传递的token，父(前端页面)，子(小窗)
      window.addEventListener('message', function(e) {
        console.log('e:', e.data)
      }, false)
    }
```
2. 后端
后端采用的Java语言，视图使用的FreeMarker 模板引擎。记得clientid和secret，以及回调地址换成自己的。前端请求的是http://localhost:8000/auth/githubLogin，进入后端会重定向到http://localhost:8000/auth/githubCallback，这么做的目的是因为Oauth的请求url是有格式的，比如
```bash
GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz
        &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
Host: server.example.com
```
我个人更喜欢把clientid在后台拼接，不想让它直接显示在浏览器的地址栏。

重定向到http://localhost:8000/auth/githubCallback后，它会返回下面的前端页面，同时会向它的父页面postMessage，同时前端监听“message”事件，这样前端页面就能拿到后端传送的message了，message可以包含token，或者用户信息等。这个地方很像websocket里面的事件驱动~
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>oauth github</title>
</head>
<body>
登陆中...
${token }, ${domain }
<script>
    window.onload = function () {
        window.opener.postMessage(${token}, "https://192.168.92.133:8888")
        // window.close();
    }
</script>
</body>
</html>
```


```java
@ApiOperation("github授权，oauth2登录")
    @AnonymousAccess
    @RequestMapping("githubLogin")
    public void githubLogin(HttpServletResponse response) throws Exception {
        // Github认证服务器地址
        String url = "https://github.com/login/oauth/authorize";
//         传递参数response_type、client_id、state、redirect_uri
        String param = "response_type=code&" + "client_id=" + GITHUB_CLIENT_ID
                + "&redirect_uri=" + GITHUB_REDIRECT_URL;

        // 1、请求Github认证服务器
        response.sendRedirect(url + "?" + param);
    }


    @RequestMapping("/githubCallback")
    @AnonymousAccess
    public ModelAndView githubCallback(String code) throws Exception {
        ModelAndView mv = new ModelAndView("githubLogin");
        // 2、向GitHub认证服务器申请令牌
        String url = "https://github.com/login/oauth/access_token";
        // 传递参数grant_type、code、redirect_uri、client_id
        String param = "grant_type=authorization_code&code=" + code + "&redirect_uri=" +
                GITHUB_REDIRECT_URL + "&client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET;

        // 申请令牌，注意此处为post请求
        String result = HttpClientUtils.sendPostRequest(url, param);

       /*
         * result示例：
         * 失败：error=incorrect_client_credentials&error_description=The+client_id+and%2For+client_secret+passed+are+incorrect.&
         * error_uri=https%3A%2F%2Fdeveloper.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-oauth-app-access-token-request-errors%2F%23incorrect-client-credentials
         * 成功：access_token=7c76186067e20d6309654c2bcc1545e41bac9c61&scope=&token_type=bearer
         */
        Map<String, String> resultMap = HttpClientUtils.params2Map(result);
        // 如果返回的map中包含error，表示失败，错误原因存储在error_description
        if(resultMap.containsKey("error")) {
            throw  new Exception(resultMap.get("error_description"));
        }

        // 如果返回结果中包含access_token，表示成功
        if(!resultMap.containsKey("access_token")) {
            throw  new Exception("获取token失败");
        }

        // 得到token和token_type
        String accessToken = resultMap.get("access_token");
        String tokenType = resultMap.get("token_type");

        // 3、向资源服务器请求用户信息，携带access_token和tokenType
        String userUrl = "https://api.github.com/user";

        // 请求github资源
        String userResult = HttpClientUtils.sendGetRequest(userUrl, accessToken);

        //github的信息和本地用户信息进行关联
        mv.addObject("token",accessToken);
        mv.addObject("domain","http://localhost:8013");
        return mv;
    }
```
