---
title: Security入门笔记
date:  2022-09-05
author: chenkun
keys:
category:
tag:
---

## 1、加密解密流程

在项目中引入security依赖后，项目启动会自动生成一个账号密码，账号固定为user,密码为控制台随机生成的。账号密码可以自定义加解密方式，一般情况我们的账号密码都是放在数据库中，一个正常的业务流程是，先定义好密码加解密方式，加密方式需要实现`PasswordEncoder`接口，比如这里我用[默认的加解密](https://gist.github.com/e33a902140c1ded695c0a782a6875b69)，然后在新增用户插入到数据库时，需要调用`encode`方法来加密密码。在请求后端接口时如果需要登陆权限，则会自动跳转到登陆页面，登陆接口会自动调用`PasswordEncoder`的`matches`方法拿明文密码加密后和密文密码（根据用户名获取已经存到系统的密文）进行匹配，匹配成功则登陆通过。

总结一下：
加密：是新建用户时调用加密方法，把密文写入数据库或者内存；
解密：登陆时，根据用户名从系统查找对应密文A，然后在把登陆时用户传递过来的明文密码使用相同加密方式加密得到密文B，把A和B对比。（这里体现了密文不可反向解密，只能正向加密，再做对比）

```java
public interface PasswordEncoder {

	/**
	 * Encode the raw password. Generally, a good encoding algorithm applies a SHA-1 or
	 * greater hash combined with an 8-byte or greater randomly generated salt.
	 */
	String encode(CharSequence rawPassword);

	/**
	 * Verify the encoded password obtained from storage matches the submitted raw
	 * password after it too is encoded. Returns true if the passwords match, false if
	 * they do not. The stored password itself is never decoded.
	 * @param rawPassword the raw password to encode and match
	 * @param encodedPassword the encoded password from storage to compare with
	 * @return true if the raw password, after encoding, matches the encoded password from
	 * storage
	 */
	boolean matches(CharSequence rawPassword, String encodedPassword);

	/**
	 * Returns true if the encoded password should be encoded again for better security,
	 * else false. The default implementation always returns false.
	 * @param encodedPassword the encoded password to check
	 * @return true if the encoded password should be encoded again for better security,
	 * else false.
	 */
	default boolean upgradeEncoding(String encodedPassword) {
		return false;
	}

}
```

## 2、HttpSecurity和WebSecurity区别

[参考1](https://stackoverflow.com/questions/56388865/spring-security-configuration-httpsecurity-vs-websecurity)

[参考2](http://blog.itpub.net/69923331/viewspace-2695120/)

Spring Security 中，到底该怎么样给资源额外放行？

1.两种思路

在 Spring Security 中，有一个资源，如果你希望用户不用登录就能访问，那么一般来说，你有两种配置策略：

第一种就是在 configure(WebSecurity web) 方法中配置放行，像下面这样：

```java
@Override
public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers(
    "/css/**", 
    "/js/**", 
    "/index.html", 
    "/img/**", 
    "/fonts/**", 
    "/favicon.ico", 
    "/verifyCode");
}
```

第二种方式是在 configure(HttpSecurity http) 方法中进行配置：

```java
@Override
public void configure(HttpSecurity http) throws Exception {
    http
    .authorizeRequests() 
    .antMatchers("/hello")
    .permitAll()
    .anyRequest()
    .authenticated()
}
```

两种方式最大的区别在于，第一种方式是不走 Spring Security 过滤器链，而第二种方式走 Spring Security 过滤器链，在过滤器链中，给请求放行。

在我们使用 Spring Security 的时候，有的资源可以使用第一种方式额外放行，不需要验证，例如前端页面的静态资源，就可以按照第一种方式配置放行。

有的资源放行，则必须使用第二种方式，例如登录接口。大家知道，登录接口也是必须要暴露出来的，不需要登录就能访问到的，但是我们却不能将登录接口用第一种方式暴露出来，登录请求必须要走 Spring Security 过滤器链，因为在这个过程中，还有其他事情要做。

总结：

- 前端静态资源放行时，可以直接不走 Spring Security 过滤器链
- 后端的接口要额外放行，就需要仔细考虑场景了，一般使用httpsecurity；

## 3、SpringSecurity中User实体中Lock和enabled区别

```java
public class User implements UserDetails, CredentialsContainer {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private static final Log logger = LogFactory.getLog(User.class);

	private String password;

	private final String username;

	private final Set<GrantedAuthority> authorities;

	private final boolean accountNonExpired;

	//lock指的是账号由于一些原因被自动锁定，比如密码尝试次数超过限制，设置为true,会提示用户被锁定
	private final boolean accountNonLocked;

	private final boolean credentialsNonExpired;
	//账号因为一些原因被管理员禁用，如果把enabled设置为true，security默认会提示用户已失效
	private final boolean enabled;
}
```