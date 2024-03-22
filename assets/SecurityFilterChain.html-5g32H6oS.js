import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-Cf-knFG-.js";const e={},i=t(`<h2 id="_1、配置类" tabindex="-1"><a class="header-anchor" href="#_1、配置类"><span>1、配置类</span></a></h2><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> 5.7版本后Security把WebSecurityConfigurerAdapter标记为废弃，鼓励程序员使用SecurityFilterChain进行配置，如果看过官网Security的架构图对SecurityFilterChain一定不会陌生，此类是Security过滤器的核心，所以用它来配置寓意更为明显。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token comment">//省略其他配置</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/user/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">&quot;USER&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token comment">//新版本配置获取AuthenticationMaager的方式</span>
  	<span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationConfiguration</span> authenticationConfiguration<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authenticationConfiguration<span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、在配置类配置和在controller方法注解上使用-preauthorized有何区别" tabindex="-1"><a class="header-anchor" href="#_2、在配置类配置和在controller方法注解上使用-preauthorized有何区别"><span>2、在配置类配置和在Controller方法注解上使用@PreAuthorized有何区别</span></a></h2><h3 id="_2-1-在配置配给资源配置权限" tabindex="-1"><a class="header-anchor" href="#_2-1-在配置配给资源配置权限"><span>2.1 在配置配给资源配置权限</span></a></h3><p>经过源码跟踪，发现在配置类配置hasRole、hasAnyAuthority等，这是Security过滤器层面的权限校验，比如有如下配置：<code>http.authorizeRequests().antMatchers(&quot;/user/**&quot;).hasRole(&quot;USER&quot;)</code>，当一个匿名用户访问/user/list时，最终会被Security的</p><p>安全校验的过滤器FilterSecurityInterceptor拦截，抛出AccessDeniedException,最终会抛出到ExceptionTranslationFilter中，交给AccessDenyHandler进行处理，默认的AccessDenyHandler会直接响应一个403到前端。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span>
			<span class="token class-name">AccessDeniedException</span> accessDeniedException<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">isCommitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token string">&quot;Did not write to response since already committed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorPage <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Responding with 403 status code&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			response<span class="token punctuation">.</span><span class="token function">sendError</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">FORBIDDEN</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">FORBIDDEN</span><span class="token punctuation">.</span><span class="token function">getReasonPhrase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Put exception into request scope (perhaps of use to a view)</span>
		request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token class-name">WebAttributes</span><span class="token punctuation">.</span><span class="token constant">ACCESS_DENIED_403</span><span class="token punctuation">,</span> accessDeniedException<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// Set the 403 status code.</span>
		response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">FORBIDDEN</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// forward to error page.</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token class-name">LogMessage</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Forwarding to %s with status code 403&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>errorPage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		request<span class="token punctuation">.</span><span class="token function">getRequestDispatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorPage<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用注解-preauthorized" tabindex="-1"><a class="header-anchor" href="#_2-2-使用注解-preauthorized"><span>2.2 使用注解@PreAuthorized</span></a></h3><p>使用注解对接口进行权限设置时，权限校验会最终由MethodSecurityInterceptor进行校验，此类和FileterSecurityInterceptor一样，都是AbstractSecurityInterceptor的实现类，不同的是FilterSecurityInterceptor还实现了Filter接口，是一个真正的Filter，MethodSecurityInterceptor没有实现Filter接口。因此，使用@PreAuthorized注解的Controller方法校验，是在DispatchServlet执行的时候，调用Controller方法前，先调用MethodSecurityInterceptor中的beforeInvocation方法进行权限校验。所以，这里可以看出，使用@PreAuthorized注解的方法，权限校验是在Sevlet业务方法执行过程被调用，而在配置类中配置的权限，是在过滤器执行过程中，一个Servlet一个Filter,这里就看出了区别，以及执行的时机。</p><blockquote><p>注意：</p><p>因为在配置类中配置的权限，校验是在过滤器层面，所以，如果出现异常，在我们定义的全局异常是无法捕获到的，我们定义的全局异常GlobalExceptionHandler是接口层面的，也就是Servlet层面，在过滤器中抛出的异常，是无法延迟到Controller层面进行捕获的。</p></blockquote><h2 id="_3、新版本配置" tabindex="-1"><a class="header-anchor" href="#_3、新版本配置"><span>3、新版本配置</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token annotation punctuation">@EnableGlobalMethodSecurity</span><span class="token punctuation">(</span>prePostEnabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TokenAuthenticationFilter</span> tokenAuthenticationFilter<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">CustomAuthenticationEntryPoint</span> customAuthenticationEntryPoint<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 自定义密码加密方式，解密会自动调用PasswordEncoder的match方法
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * WebSecurity 处理静态资源不走过滤器，注意区别HttpSecurity,HttpSecurity主要用来处理后端接口，比如login接口虽然可以ignore,但是
     * 还有其他逻辑还要走过滤器，如果使用WebSecurity，则login直接就不会受到任何过滤器处理，代表这个接口已经超脱于Security之外了。一句话：
     * WebSecurity负责过滤不需要处理的静态资源，HttpSecurity负责处理普通的api接口。
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">WebSecurityCustomizer</span> <span class="token function">webSecurityCustomizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> web <span class="token operator">-&gt;</span> web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/user/jumpAllFilterTest&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/user/getSession&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">antMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/user/**&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain1</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/user/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 处理接口权限
     */</span>
    <span class="token comment">/*@Bean
    @Order(22)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .mvcMatchers(&quot;/login&quot;)
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
*/</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">UserDetailsService</span> <span class="token function">userDetailsService</span><span class="token punctuation">(</span><span class="token class-name">SysUserService</span> sysUserService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CustomUserDetailsService</span><span class="token punctuation">(</span>sysUserService<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 新版本security获取AuthenticationManager的方法
     * <span class="token keyword">@param</span> <span class="token parameter">authenticationConfiguration</span>
     * <span class="token keyword">@return</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationConfiguration</span> authenticationConfiguration<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authenticationConfiguration<span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> SecurityFilterChain可以有多个，但是只有一个SecurityFilterChain会被匹配，请求进来后，根据请求的url进行匹配，匹配到以后直接返回，不再和后面的SeecurityFilterChain进行匹配。如果一个请求的url同时匹配上多个SecurityFilterChain,此时就要注意设置@Order了


<span class="token list punctuation">2.</span> 静态资源过滤如下，Security会为每一个路径都生成一个SecurityFilterChain,如下例子，Security会额外生成两个SecurityFilterChain分别匹配/user/<span class="token bold"><span class="token punctuation">**</span><span class="token content">和/user/</span><span class="token punctuation">**</span></span>，
	 @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return web -&gt; web.ignoring().antMatchers(&quot;/user/<span class="token bold"><span class="token punctuation">**</span><span class="token content">&quot;, &quot;/user/</span><span class="token punctuation">**</span></span>&quot;);
    }

<span class="token list punctuation">2.</span> 新版本获取AuthenticationManager方式有变化
	 @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

<span class="token list punctuation">3.</span> SecurityFilterChain匹配，如下第一个SecurityFilterChain只会处理/order/xxx的请求，第二个用的authorizeRequests()会匹配所有请求。这里要注意设置第一个@Order的值比第二个小，不然所有请求都会被第二个处理，第一个就没有意义了。
 	 @Bean
    @Order(3)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.antMatcher(&quot;/order/<span class="token bold"><span class="token punctuation">**</span><span class="token content">&quot;)
                .authorizeRequests().antMatchers(&quot;/</span><span class="token punctuation">**</span></span>&quot;).hasRole(&quot;user&quot;).and().build();

<span class="token code keyword">    }
    @Bean
    @Order(4)
    public SecurityFilterChain securityFilterChain1(HttpSecurity http) throws Exception {
        return http.authorizeRequests()
                .antMatchers(&quot;/user/**&quot;).permitAll()
                .anyRequest().authenticated().and().build();
    }</span>
    
  <span class="token list punctuation">4.</span> SecurityFilterChain的配置
   @Bean
    @Order(22)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)//指定位置添加自定义过滤器
                .authorizeRequests()//匹配所有请求
                .mvcMatchers(&quot;/login&quot;)
                .permitAll()
                .anyRequest()//剩下所有的请求
                .authenticated()  // 所有请求都必须要认证才可以访问

<span class="token code keyword">                .and()
                // 禁用csrf
                .csrf()
                .disable()
                // 启用表单登录（一般前后不分离的项目才用）</span>
//                .formLogin()
//                .permitAll()

<span class="token code keyword">                // 异常处理
                .exceptionHandling()
                .accessDeniedHandler(x x x)//权限校验失败（403），这里处理的是配置类中配置的权限失败的处理，c
                .authenticationEntryPoint(customAuthenticationEntryPoint)//认证失败处理（401）</span>

<span class="token code keyword">                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //禁止生成session,也不会向客户端返回session（前后分离项目）
                .and()
                .build();
    }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),c=[i];function p(o,l){return s(),a("div",null,c)}const d=n(e,[["render",p],["__file","SecurityFilterChain.html.vue"]]),k=JSON.parse('{"path":"/java/framework/security/SecurityFilterChain.html","title":"Security配置类","lang":"zh-CN","frontmatter":{"title":"Security配置类","date":"2021-11-03T00:00:00.000Z","author":"chensino","keys":null,"category":["security"],"description":"1、配置类 2、在配置类配置和在Controller方法注解上使用@PreAuthorized有何区别 2.1 在配置配给资源配置权限 经过源码跟踪，发现在配置类配置hasRole、hasAnyAuthority等，这是Security过滤器层面的权限校验，比如有如下配置：http.authorizeRequests().antMatchers(\\"/u...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/framework/security/SecurityFilterChain.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"Security配置类"}],["meta",{"property":"og:description","content":"1、配置类 2、在配置类配置和在Controller方法注解上使用@PreAuthorized有何区别 2.1 在配置配给资源配置权限 经过源码跟踪，发现在配置类配置hasRole、hasAnyAuthority等，这是Security过滤器层面的权限校验，比如有如下配置：http.authorizeRequests().antMatchers(\\"/u..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"chensino"}],["meta",{"property":"article:published_time","content":"2021-11-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Security配置类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chensino\\"}]}"]]},"headers":[{"level":2,"title":"1、配置类","slug":"_1、配置类","link":"#_1、配置类","children":[]},{"level":2,"title":"2、在配置类配置和在Controller方法注解上使用@PreAuthorized有何区别","slug":"_2、在配置类配置和在controller方法注解上使用-preauthorized有何区别","link":"#_2、在配置类配置和在controller方法注解上使用-preauthorized有何区别","children":[{"level":3,"title":"2.1 在配置配给资源配置权限","slug":"_2-1-在配置配给资源配置权限","link":"#_2-1-在配置配给资源配置权限","children":[]},{"level":3,"title":"2.2 使用注解@PreAuthorized","slug":"_2-2-使用注解-preauthorized","link":"#_2-2-使用注解-preauthorized","children":[]}]},{"level":2,"title":"3、新版本配置","slug":"_3、新版本配置","link":"#_3、新版本配置","children":[]}],"git":{"createdTime":1671611047000,"updatedTime":1711079112000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":2},{"name":"ChenSino","email":"462488588@qq.com","commits":1},{"name":"ChenSino","email":"chenxk@sonoscape.net","commits":1}]},"readingTime":{"minutes":4.81,"words":1444},"filePathRelative":"java/framework/security/SecurityFilterChain.md","localizedDate":"2021年11月3日","excerpt":"<h2>1、配置类</h2>\\n<div class=\\"language-markdown\\" data-ext=\\"md\\" data-title=\\"md\\"><pre class=\\"language-markdown\\"><code><span class=\\"token list punctuation\\">1.</span> 5.7版本后Security把WebSecurityConfigurerAdapter标记为废弃，鼓励程序员使用SecurityFilterChain进行配置，如果看过官网Security的架构图对SecurityFilterChain一定不会陌生，此类是Security过滤器的核心，所以用它来配置寓意更为明显。\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
