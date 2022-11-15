---
title: 自定义登陆页面
date:  2022-11-03
author: chenkun
keys:
category:
tag:
---

## 1、修改自定义的登陆页面以及登陆请求校验

:::note 官方文档
https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html
:::

### 1.1 Secutity配置

> 在Security配置文件配置loginPage指定登陆的页面，loginProcessingUrl指定用户名密码认证处理地址，同时一定要放行这两个页面，否则会一直被拦截导致重定向到登陆页面。
> 另外，还要准备自定义页面，以及自定义处理接口。

::: danger 注意
一般情况，无需自定义登陆处理逻辑，只需要修改登陆页面，在登陆页面把action保留原来的login即可
:::

```java
	protected void configure(HttpSecurity http) {
		http.formLogin().loginPage("/token/login").loginProcessingUrl("/token/custom")
				.successHandler(tenantSavedRequestAwareAuthenticationSuccessHandler())
				.failureHandler(authenticationFailureHandler()).and().logout()
				.logoutSuccessHandler(logoutSuccessHandler()).deleteCookies("JSESSIONID").invalidateHttpSession(true)
				.and().authorizeRequests().antMatchers("/token/**", "/actuator/**", "/mobile/**").permitAll()
				.anyRequest().authenticated().and().csrf().disable();
	}
```

```java
@Controller
@RequestMapping("token")
public class PageController {

    @GetMapping("/login")
    public String login(){
        System.out.println();
        return "login";
    }

    @PostMapping("/custom")
    public void ok(HttpServletResponse response ,@RequestParam("username")String username ,@RequestParam("password")String password){
        //自定义校验逻辑
        //...
        //处理完后重定向到之前的请求路径
        response.sendRedirect("https://www.baidu.com");
    }
}
```

### 1.2 自定义登陆页面

```html

<body class="sign_body">
<div class="container form-margin-top">
    <form class="form-signin" action="/token/custom" method="post">
        <h2 class="form-signin-heading" align="center">统一认证系统</h2>

        <#if tenantList??>
            <select class="form-control form-margin-top" placeholder="所属租户" name="TENANT-ID">
                <#list tenantList as tenant>
                    <option value="${tenant.id}">${tenant.name}</option>
                </#list>
            </select>
        </#if>

        <input type="hidden" name="clientId" class="form-control" value="pig" placeholder="所属客户端" >
        <input type="text" name="username" class="form-control" placeholder="账号" required autofocus>
        <input type="password" name="password" class="form-control" placeholder="密码" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">sign in</button>
        <#if error??>
            <span style="color: red; ">${error?html}</span>
        </#if>
    </form>
</div>
```

## 2、在Security和OAuth组合的项目中，自定义loginProcessingUrl不生效？
