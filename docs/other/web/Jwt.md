---
title: jwt
author: chenkun
publish: true
keys:
category:
  - web
tag:	
  - web
---



## 1、jwt在服务端如何校验的？

之前一直用jwt但是仅仅了解他的基本原理没有去思考一个问题——服务端是如何校验jwt的？

了解过jwt原理的同学都知道jwt是可以自校验的，token里面有header，payload,我有个想法就是如果用户随便生成一个token,那后端是如何知道这个token不能用？或者我把开发环境的token拿到生产环境使用 是否可行？

jwt用户认证流程如下，因jwt的token是无状态的，所以每次请求都要经过过滤器进行校验，第一次登陆后把生成的token缓存到redis，当校验时如果找到对应token则继续，解析head中userid信息，根据userid查用户角色权限等信息，然后再设置到security的context中，具体代码如下

![](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2020.cnblogs.com%2Fnews%2F2169646%2F202101%2F2169646-20210118002912071-1277173978.jpg&refer=http%3A%2F%2Fimg2020.cnblogs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669274568&t=4074fa30a1f60ddac4f3a668c38b0353)

```java
@Slf4j
@Component
public class JwtAuthorizationTokenFilter extends OncePerRequestFilter {


    @Value("${jwt.online}")
    private String onlineKey;

    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisTemplate redisTemplate;

    public JwtAuthorizationTokenFilter(@Qualifier("jwtUserDetailsService") UserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil, RedisTemplate redisTemplate) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.redisTemplate = redisTemplate;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String authToken = jwtTokenUtil.getToken(request);
        OnlineUser onlineUser = null;
        try {
            onlineUser = (OnlineUser)redisTemplate.opsForValue().get(onlineKey + authToken);
        } catch (ExpiredJwtException e) {
            log.error(e.getMessage());
        }
        if (onlineUser != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // It is not compelling necessary to load the use details from the database. You could also store the information
            // in the token and read it from it. It's up to you ;)
            JwtUser userDetails = (JwtUser)this.userDetailsService.loadUserByUsername(onlineUser.getUserName());
            // For simple validation it is completely sufficient to just check the token integrity. You don't have to call
            // the database compellingly. Again it's up to you ;)
            if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }
}
```

## 2、为什么相同用户每次登陆得到的jwt token不一样？

一般登录后生成token都会在里面设置过期时间，后端生成token时会在payload添加这个字段，不同时间下，经过签名后得到的token肯定不一样