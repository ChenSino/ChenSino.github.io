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

![Jwt认证](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2020.cnblogs.com%2Fnews%2F2169646%2F202101%2F2169646-20210118002912071-1277173978.jpg&refer=http%3A%2F%2Fimg2020.cnblogs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669274568&t=4074fa30a1f60ddac4f3a668c38b0353)

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

## 3、Jwt VS 普通token

我一直认为Jwt能做的，普通token都能做，比如过期时间，普通token只需要设置redis过期时间
就可以，好像jwt并没有太大的优势，但是今天做Oauth客户端登录，我发先jwt还是有它自己的独到之处的。

:::danger 优势一
    在Oauth服务中，jwt可以自校验，这样当授权成功后，授权服务器返回jwt重定向到请求的接口时，客户端在过滤器中就可以很方便的校验token合法性。假如使用普通token,我们在客户端校验token势必要去授权服务器的redis中查询token是否存在，以此来确认合法性，这里就存在一个不合理的地方，客户端必须连接服务端的redis,这是一种耦合，如果项目不大，可能客户端和服务端都是一个redis还好，如果是不同redis就比较麻烦。
:::

:::danger 优势二
    jwt中包含用户信息，当授权服务器返回jwt时，我们在客户端过滤器中根据jwt很方便的解析出里面的用户信息，比如username,拿到username我在客户端就可以很方便的把username转换为本地用户信息（当然前提jwt校验成功我们才给他做转换）和权限信息。如果使用普通token我们就无法根据token获取用户信息，和上面的问题差不多。
:::
