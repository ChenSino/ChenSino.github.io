---
title: Security配置类
date:  2021-11-03
author: chensino
keys:
category:
  - security
---

## 1、配置类

~~~markdown
1. 5.7版本后Security把WebSecurityConfigurerAdapter标记为废弃，鼓励程序员使用SecurityFilterChain进行配置，如果看过官网Security的架构图对SecurityFilterChain一定不会陌生，此类是Security过滤器的核心，所以用它来配置寓意更为明显。
~~~

```java
    @Bean
    @Order(3)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeRequests()
            	...//省略其他配置
                .antMatchers("/user/**").hasRole("USER")
                .anyRequest().authenticated().and().build();
    }

	//新版本配置获取AuthenticationMaager的方式
  	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
```

## 2、在配置类配置和在Controller方法注解上使用@PreAuthorized有何区别

### 2.1 在配置配给资源配置权限

经过源码跟踪，发现在配置类配置hasRole、hasAnyAuthority等，这是Security过滤器层面的权限校验，比如有如下配置：`http.authorizeRequests().antMatchers("/user/**").hasRole("USER")`，当一个匿名用户访问/user/list时，最终会被Security的

安全校验的过滤器FilterSecurityInterceptor拦截，抛出AccessDeniedException,最终会抛出到ExceptionTranslationFilter中，交给AccessDenyHandler进行处理，默认的AccessDenyHandler会直接响应一个403到前端。

```java
@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		if (response.isCommitted()) {
			logger.trace("Did not write to response since already committed");
			return;
		}
		if (this.errorPage == null) {
			logger.debug("Responding with 403 status code");
			response.sendError(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN.getReasonPhrase());
			return;
		}
		// Put exception into request scope (perhaps of use to a view)
		request.setAttribute(WebAttributes.ACCESS_DENIED_403, accessDeniedException);
		// Set the 403 status code.
		response.setStatus(HttpStatus.FORBIDDEN.value());
		// forward to error page.
		if (logger.isDebugEnabled()) {
			logger.debug(LogMessage.format("Forwarding to %s with status code 403", this.errorPage));
		}
		request.getRequestDispatcher(this.errorPage).forward(request, response);
	}
```



### 2.2 使用注解@PreAuthorized



使用注解对接口进行权限设置时，权限校验会最终由MethodSecurityInterceptor进行校验，此类和FileterSecurityInterceptor一样，都是AbstractSecurityInterceptor的实现类，不同的是FilterSecurityInterceptor还实现了Filter接口，是一个真正的Filter，MethodSecurityInterceptor没有实现Filter接口。因此，使用@PreAuthorized注解的Controller方法校验，是在DispatchServlet执行的时候，调用Controller方法前，先调用MethodSecurityInterceptor中的beforeInvocation方法进行权限校验。所以，这里可以看出，使用@PreAuthorized注解的方法，权限校验是在Sevlet业务方法执行过程被调用，而在配置类中配置的权限，是在过滤器执行过程中，一个Servlet一个Filter,这里就看出了区别，以及执行的时机。

> 注意：
>
> 因为在配置类中配置的权限，校验是在过滤器层面，所以，如果出现异常，在我们定义的全局异常是无法捕获到的，我们定义的全局异常GlobalExceptionHandler是接口层面的，也就是Servlet层面，在过滤器中抛出的异常，是无法延迟到Controller层面进行捕获的。

## 3、新版本配置

~~~java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private TokenAuthenticationFilter tokenAuthenticationFilter;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

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
     * WebSecurity 处理静态资源不走过滤器，注意区别HttpSecurity,HttpSecurity主要用来处理后端接口，比如login接口虽然可以ignore,但是
     * 还有其他逻辑还要走过滤器，如果使用WebSecurity，则login直接就不会受到任何过滤器处理，代表这个接口已经超脱于Security之外了。一句话：
     * WebSecurity负责过滤不需要处理的静态资源，HttpSecurity负责处理普通的api接口。
     *
     * @return
     */
    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().antMatchers("/user/jumpAllFilterTest", "/user/getSession");
    }


    @Bean
    @Order(3)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.antMatcher("/user/**")
                .authorizeRequests().antMatchers("/**").hasRole("user").and().build();

    }
    @Bean
    @Order(4)
    public SecurityFilterChain securityFilterChain1(HttpSecurity http) throws Exception {
        return http.authorizeRequests()
                .antMatchers("/user/**").permitAll()
                .anyRequest().authenticated().and().build();
    }
    /**
     * 处理接口权限
     */
    /*@Bean
    @Order(22)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .mvcMatchers("/login")
                .permitAll()
                .anyRequest()//剩下所有的请求
                .authenticated()  // 所有请求都必须要认证才可以访问

                .and()
                // 禁用csrf
                .csrf()
                .disable()
                // 启用表单登录
//                .formLogin()
//                .permitAll()

                // 异常处理
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //禁止生成session,也不会向客户端返回session
                .and()
                .build();
    }
*/
    @Bean
    UserDetailsService userDetailsService(SysUserService sysUserService) {
        return new CustomUserDetailsService(sysUserService);
    }

    /**
     * 新版本security获取AuthenticationManager的方法
     * @param authenticationConfiguration
     * @return
     * @throws Exception
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
~~~

~~~markdown
1. SecurityFilterChain可以有多个，但是只有一个SecurityFilterChain会被匹配，请求进来后，根据请求的url进行匹配，匹配到以后直接返回，不再和后面的SeecurityFilterChain进行匹配。如果一个请求的url同时匹配上多个SecurityFilterChain,此时就要注意设置@Order了


2. 静态资源过滤如下，Security会为每一个路径都生成一个SecurityFilterChain,如下例子，Security会额外生成两个SecurityFilterChain分别匹配/user/**和/user/**，
	 @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().antMatchers("/user/**", "/user/**");
    }

2. 新版本获取AuthenticationManager方式有变化
	 @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

3. SecurityFilterChain匹配，如下第一个SecurityFilterChain只会处理/order/xxx的请求，第二个用的authorizeRequests()会匹配所有请求。这里要注意设置第一个@Order的值比第二个小，不然所有请求都会被第二个处理，第一个就没有意义了。
 	 @Bean
    @Order(3)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.antMatcher("/order/**")
                .authorizeRequests().antMatchers("/**").hasRole("user").and().build();

    }
    @Bean
    @Order(4)
    public SecurityFilterChain securityFilterChain1(HttpSecurity http) throws Exception {
        return http.authorizeRequests()
                .antMatchers("/user/**").permitAll()
                .anyRequest().authenticated().and().build();
    }
    
  4. SecurityFilterChain的配置
   @Bean
    @Order(22)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)//指定位置添加自定义过滤器
                .authorizeRequests()//匹配所有请求
                .mvcMatchers("/login")
                .permitAll()
                .anyRequest()//剩下所有的请求
                .authenticated()  // 所有请求都必须要认证才可以访问

                .and()
                // 禁用csrf
                .csrf()
                .disable()
                // 启用表单登录（一般前后不分离的项目才用）
//                .formLogin()
//                .permitAll()

                // 异常处理
                .exceptionHandling()
                .accessDeniedHandler(x x x)//权限校验失败（403），这里处理的是配置类中配置的权限失败的处理，c
                .authenticationEntryPoint(customAuthenticationEntryPoint)//认证失败处理（401）

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //禁止生成session,也不会向客户端返回session（前后分离项目）
                .and()
                .build();
    }
~~~
