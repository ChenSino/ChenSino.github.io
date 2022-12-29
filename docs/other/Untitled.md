---
title: 客户端对接用户中心
name: chensino
category:
  - 公司业务

---

## 1、基础环境搭建

### 1.1 引入依赖

~~~xml
       <dependency>
            <groupId>org.springframework.security.oauth.boot</groupId>
            <artifactId>spring-security-oauth2-autoconfigure</artifactId>
            <version>2.1.2.RELEASE</version>
        </dependency>
~~~

### 1.2 配置

#### 1.2.1 application.yml

~~~yaml
security:
  oauth2:
    client:
      client-id: pig
      client-secret: pig
      user-authorization-uri: http://localhost:3000/oauth/authorize
      access-token-uri: http://localhost:3000/oauth/token
      scope: server
    resource:
      loadBalanced: true
      token-info-uri: http://localhost:3000/oauth/check_token
~~~

#### 1.2.2  Security配置demo

~~~java

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableOAuth2Sso
@Order(111)
public class SecurityConfigOAuth extends WebSecurityConfigurerAdapter {

    /**
     * 自定义密码加密方式，解密会自动调用PasswordEncoder的match方法
     *
     * @return
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 处理接口权限
     */

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/login**")
                .permitAll()
                .anyRequest()
                .authenticated();
        http.csrf().disable();
    }

    @Bean
    UserDetailsService userDetailsService(SysUserService sysUserService) {
        return new CustomUserDetailsService(sysUserService);
    }
}
~~~

## 2、用户中心用户转本地用户

### 2.1 过滤器进行拦截处理

~~~java
@Component
public class OAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //1. 根据token获取本地系统对应用户
        LoginUser loginUser = tokenService.getLoginUser(request);
        //2. 校验并设置用户信息到SecurityContext
        if (StringUtils.isNotNull(loginUser) && StringUtils.isNull(SecurityUtils.getAuthentication()))
        {
            tokenService.verifyToken(loginUser);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        //3. 校验通过放行
        chain.doFilter(request, response);
    }
}
~~~

~~~markdown
流程：
1. 不带token访问客户端接口
2. 客户端重定向到授权服务器认证页面，要求用户登录
3. 登录成功，授权中心返回code,并且会拿code到授权中心换取token
4. 拿到token,重定向到最初访问的接口，并且此次请求会携带token
5. 客户端过滤器拿到token后，先把token转化为本系统的用户信息
5. 通过过滤器验证，最终访问接口，返回接口数据
~~~
