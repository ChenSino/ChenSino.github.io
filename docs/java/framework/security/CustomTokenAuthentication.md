---
title: 前后分离项目自定义token认证
date:  2022-12-22
author: chensino
keys:
---

::: danger 注意
网上很难精准找到一个前后端分离项目自定义Token认证的教程，找了很久终于找到，特此记录

:::

## 1、Security配置注意事项

~~~markdown
1. 我在很多教程中都看到他们有讲解自定义登录页面，但是我想说的是，都21世纪了，早都前后分离了，
   所以在Security配置中不要配置formLogin了，前后分离项目会直接在Controller自定义登录逻辑，
   一旦配置这个万一Security会自动生成表单登录那几个过滤器。这里重点强调一下，前后分离项目和前
   后不分离在Security中是大大的不一样！！大家学习的时候关键词检索要记得加上前后分离！！

2. 配置自定义过滤器，自定义过滤器用来处理请求，识别请求中是否有我们自定义的合法token,当然合不合法就要在过滤器的doFilter中自己写了。
~~~

~~~java
    @Bean
    @Order(2)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .mvcMatchers("/login","/login/phone")
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
//                .and()
                // 异常处理
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)

                .and()
//                .authenticationProvider(customMobileAuthenticationProvider)
//                .authenticationProvider(new DaoAuthenticationProvider())
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //禁止生成session,也不会向客户端返回session
                .and()
                .build();
    }
    ~~~

## 2、自定义登录逻辑

~~~java
//Controller
   @PostMapping
    public ResponseEntity login(@RequestBody SysUser sysUser){
        return loginService.login(sysUser);
    }

~~~

~~~java
//Service
    @Override
    public ResponseEntity login(SysUser sysUser) {
        //TODO 重复登录逻辑

        //构造一个未认证的对象
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(sysUser.getUserName(), sysUser.getPassword());
        //1. 使用AuthenticationManager认证用户
        Authentication authenticate = null;
        try {

            authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (Exception e) {
            //2. 认证失败
            log.error("认证失败，{}",e.getMessage());
            throw e;
        }

        //3. 认证通过，生成token,key->token,value->username
        String token = UUID.fastUUID().toString(true);
        CustomSecurityUser customSecurityUser = (CustomSecurityUser) authenticate.getPrincipal();
        //4. token存入redis
        redisTemplate.set(CacheConst.TOKEN_PREFIX + StrPool.COLON + token, customSecurityUser, expiration);
        Map<String, Object> data = new HashMap<>(4);
        data.put("access_token", token);
        data.put("authorities", authenticate.getAuthorities());
        return ResponseEntity.ok(data);
    }
 ~~~

## 3、自定义过滤器

::: note 提示
    在过滤器中把token转换为Authentication并且设置到SecurityContext，设置到上下文后，后续的过滤器中就可以直接使用，
    要注意过滤器的设置位置，在Security的配置类中把自定义过滤器放在UsernamePasswordAuthenticationFilter之前
:::

 ~~~java
 @Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private IGlobalCache redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //1. 解析token
        String token = request.getHeader("X-token");
        //2. token不存在直接放行，后续的FilterInterceptor会校验权限，没有权限依然无法访问接口
        if (!StringUtils.hasText(token)) {
            filterChain.doFilter(request, response);
            return;
        }
        //3. 根据token查询用户信息，目标是设置SecurityContext
        CustomSecurityUser customSecurityUser = redisTemplate.get(CacheConst.TOKEN_PREFIX + StrPool.COLON + token);
        if (Objects.nonNull(customSecurityUser)) {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(customSecurityUser.getUsername(), customSecurityUser.getPassword(), customSecurityUser.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }

        filterChain.doFilter(request, response);
    }
}
~~~
