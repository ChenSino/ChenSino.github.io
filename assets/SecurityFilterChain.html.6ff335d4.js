import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e as t}from"./app.4bb00a87.js";const e={},i=t(`<h2 id="_1\u3001\u914D\u7F6E\u7C7B" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u914D\u7F6E\u7C7B" aria-hidden="true">#</a> 1\u3001\u914D\u7F6E\u7C7B</h2><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> \u5177\u4F53\u4E0D\u6B62\u4ECE\u4F55\u7248\u672C\u5F00\u59CB\uFF0CSecurity\u628AWebSecurityConfigurerAdapter\u6807\u8BB0\u4E3A\u5E9F\u5F03\uFF0C\u9F13\u52B1\u7A0B\u5E8F\u5458\u4F7F\u7528SecurityFilterChain\u8FDB\u884C\u914D\u7F6E\uFF0C\u5982\u679C\u770B\u8FC7\u5B98\u7F51Security\u7684\u67B6\u6784\u56FE\u5BF9SecurityFilterChain\u4E00\u5B9A\u4E0D\u4F1A\u964C\u751F\uFF0C\u6B64\u7C7B\u662FSecurity\u8FC7\u6EE4\u5668\u7684\u6838\u5FC3\uFF0C\u6240\u4EE5\u7528\u5B83\u6765\u914D\u7F6E\u5BD3\u610F\u66F4\u4E3A\u660E\u663E\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token comment">//\u7701\u7565\u5176\u4ED6\u914D\u7F6E</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/user/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">&quot;USER&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token comment">//\u65B0\u7248\u672C\u914D\u7F6E\u83B7\u53D6AuthenticationMaager\u7684\u65B9\u5F0F</span>
  	<span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationConfiguration</span> authenticationConfiguration<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authenticationConfiguration<span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2\u3001\u5728\u914D\u7F6E\u7C7B\u914D\u7F6E\u548C\u5728controller\u65B9\u6CD5\u6CE8\u89E3\u4E0A\u4F7F\u7528-preauthorized\u6709\u4F55\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u5728\u914D\u7F6E\u7C7B\u914D\u7F6E\u548C\u5728controller\u65B9\u6CD5\u6CE8\u89E3\u4E0A\u4F7F\u7528-preauthorized\u6709\u4F55\u533A\u522B" aria-hidden="true">#</a> 2\u3001\u5728\u914D\u7F6E\u7C7B\u914D\u7F6E\u548C\u5728Controller\u65B9\u6CD5\u6CE8\u89E3\u4E0A\u4F7F\u7528@PreAuthorized\u6709\u4F55\u533A\u522B</h2><h3 id="_2-1-\u5728\u914D\u7F6E\u914D\u7ED9\u8D44\u6E90\u914D\u7F6E\u6743\u9650" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5728\u914D\u7F6E\u914D\u7ED9\u8D44\u6E90\u914D\u7F6E\u6743\u9650" aria-hidden="true">#</a> 2.1 \u5728\u914D\u7F6E\u914D\u7ED9\u8D44\u6E90\u914D\u7F6E\u6743\u9650</h3><p>\u7ECF\u8FC7\u6E90\u7801\u8DDF\u8E2A\uFF0C\u53D1\u73B0\u5728\u914D\u7F6E\u7C7B\u914D\u7F6EhasRole\u3001hasAnyAuthority\u7B49\uFF0C\u8FD9\u662FSecurity\u8FC7\u6EE4\u5668\u5C42\u9762\u7684\u6743\u9650\u6821\u9A8C\uFF0C\u6BD4\u5982\u6709\u5982\u4E0B\u914D\u7F6E\uFF1A<code>http.authorizeRequests().antMatchers(&quot;/user/**&quot;).hasRole(&quot;USER&quot;)</code>\uFF0C\u5F53\u4E00\u4E2A\u533F\u540D\u7528\u6237\u8BBF\u95EE/user/list\u65F6\uFF0C\u6700\u7EC8\u4F1A\u88ABSecurity\u7684</p><p>\u5B89\u5168\u6821\u9A8C\u7684\u8FC7\u6EE4\u5668FilterSecurityInterceptor\u62E6\u622A\uFF0C\u629B\u51FAAccessDeniedException,\u6700\u7EC8\u4F1A\u629B\u51FA\u5230ExceptionTranslationFilter\u4E2D\uFF0C\u4EA4\u7ED9AccessDenyHandler\u8FDB\u884C\u5904\u7406\uFF0C\u9ED8\u8BA4\u7684AccessDenyHandler\u4F1A\u76F4\u63A5\u54CD\u5E94\u4E00\u4E2A403\u5230\u524D\u7AEF\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span>
			<span class="token class-name">AccessDeniedException</span> accessDeniedException<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">isCommitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token string">&quot;Did not write to response since already committed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorPage <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Responding with 403 status code&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			response<span class="token punctuation">.</span><span class="token function">sendError</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span>FORBIDDEN<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">HttpStatus</span><span class="token punctuation">.</span>FORBIDDEN<span class="token punctuation">.</span><span class="token function">getReasonPhrase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Put exception into request scope (perhaps of use to a view)</span>
		request<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token class-name">WebAttributes</span><span class="token punctuation">.</span>ACCESS_DENIED_403<span class="token punctuation">,</span> accessDeniedException<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// Set the 403 status code.</span>
		response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span>FORBIDDEN<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// forward to error page.</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token class-name">LogMessage</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Forwarding to %s with status code 403&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>errorPage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		request<span class="token punctuation">.</span><span class="token function">getRequestDispatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorPage<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-\u4F7F\u7528\u6CE8\u89E3-preauthorized" tabindex="-1"><a class="header-anchor" href="#_2-2-\u4F7F\u7528\u6CE8\u89E3-preauthorized" aria-hidden="true">#</a> 2.2 \u4F7F\u7528\u6CE8\u89E3@PreAuthorized</h3><p>\u4F7F\u7528\u6CE8\u89E3\u5BF9\u63A5\u53E3\u8FDB\u884C\u6743\u9650\u8BBE\u7F6E\u65F6\uFF0C\u6743\u9650\u6821\u9A8C\u4F1A\u6700\u7EC8\u7531MethodSecurityInterceptor\u8FDB\u884C\u6821\u9A8C\uFF0C\u6B64\u7C7B\u548CFileterSecurityInterceptor\u4E00\u6837\uFF0C\u90FD\u662FAbstractSecurityInterceptor\u7684\u5B9E\u73B0\u7C7B\uFF0C\u4E0D\u540C\u7684\u662FFilterSecurityInterceptor\u8FD8\u5B9E\u73B0\u4E86Filter\u63A5\u53E3\uFF0C\u662F\u4E00\u4E2A\u771F\u6B63\u7684Filter\uFF0CMethodSecurityInterceptor\u6CA1\u6709\u5B9E\u73B0Filter\u63A5\u53E3\u3002\u56E0\u6B64\uFF0C\u4F7F\u7528@PreAuthorized\u6CE8\u89E3\u7684Controller\u65B9\u6CD5\u6821\u9A8C\uFF0C\u662F\u5728DispatchServlet\u6267\u884C\u7684\u65F6\u5019\uFF0C\u8C03\u7528Controller\u65B9\u6CD5\u524D\uFF0C\u5148\u8C03\u7528MethodSecurityInterceptor\u4E2D\u7684beforeInvocation\u65B9\u6CD5\u8FDB\u884C\u6743\u9650\u6821\u9A8C\u3002\u6240\u4EE5\uFF0C\u8FD9\u91CC\u53EF\u4EE5\u770B\u51FA\uFF0C\u4F7F\u7528@PreAuthorized\u6CE8\u89E3\u7684\u65B9\u6CD5\uFF0C\u6743\u9650\u6821\u9A8C\u662F\u5728Sevlet\u4E1A\u52A1\u65B9\u6CD5\u6267\u884C\u8FC7\u7A0B\u88AB\u8C03\u7528\uFF0C\u800C\u5728\u914D\u7F6E\u7C7B\u4E2D\u914D\u7F6E\u7684\u6743\u9650\uFF0C\u662F\u5728\u8FC7\u6EE4\u5668\u6267\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u4E00\u4E2AServlet\u4E00\u4E2AFilter,\u8FD9\u91CC\u5C31\u770B\u51FA\u4E86\u533A\u522B\uFF0C\u4EE5\u53CA\u6267\u884C\u7684\u65F6\u673A\u3002</p><blockquote><p>\u6CE8\u610F\uFF1A</p><p>\u56E0\u4E3A\u5728\u914D\u7F6E\u7C7B\u4E2D\u914D\u7F6E\u7684\u6743\u9650\uFF0C\u6821\u9A8C\u662F\u5728\u8FC7\u6EE4\u5668\u5C42\u9762\uFF0C\u6240\u4EE5\uFF0C\u5982\u679C\u51FA\u73B0\u5F02\u5E38\uFF0C\u5728\u6211\u4EEC\u5B9A\u4E49\u7684\u5168\u5C40\u5F02\u5E38\u662F\u65E0\u6CD5\u6355\u83B7\u5230\u7684\uFF0C\u6211\u4EEC\u5B9A\u4E49\u7684\u5168\u5C40\u5F02\u5E38GlobalExceptionHandler\u662F\u63A5\u53E3\u5C42\u9762\u7684\uFF0C\u4E5F\u5C31\u662FServlet\u5C42\u9762\uFF0C\u5728\u8FC7\u6EE4\u5668\u4E2D\u629B\u51FA\u7684\u5F02\u5E38\uFF0C\u662F\u65E0\u6CD5\u5EF6\u8FDF\u5230Controller\u5C42\u9762\u8FDB\u884C\u6355\u83B7\u7684\u3002</p></blockquote><h2 id="_3\u3001\u65B0\u7248\u672C\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u65B0\u7248\u672C\u914D\u7F6E" aria-hidden="true">#</a> 3\u3001\u65B0\u7248\u672C\u914D\u7F6E</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token annotation punctuation">@EnableGlobalMethodSecurity</span><span class="token punctuation">(</span>prePostEnabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TokenAuthenticationFilter</span> tokenAuthenticationFilter<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">CustomAuthenticationEntryPoint</span> customAuthenticationEntryPoint<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u81EA\u5B9A\u4E49\u5BC6\u7801\u52A0\u5BC6\u65B9\u5F0F\uFF0C\u89E3\u5BC6\u4F1A\u81EA\u52A8\u8C03\u7528PasswordEncoder\u7684match\u65B9\u6CD5
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * WebSecurity \u5904\u7406\u9759\u6001\u8D44\u6E90\u4E0D\u8D70\u8FC7\u6EE4\u5668\uFF0C\u6CE8\u610F\u533A\u522BHttpSecurity,HttpSecurity\u4E3B\u8981\u7528\u6765\u5904\u7406\u540E\u7AEF\u63A5\u53E3\uFF0C\u6BD4\u5982login\u63A5\u53E3\u867D\u7136\u53EF\u4EE5ignore,\u4F46\u662F
     * \u8FD8\u6709\u5176\u4ED6\u903B\u8F91\u8FD8\u8981\u8D70\u8FC7\u6EE4\u5668\uFF0C\u5982\u679C\u4F7F\u7528WebSecurity\uFF0C\u5219login\u76F4\u63A5\u5C31\u4E0D\u4F1A\u53D7\u5230\u4EFB\u4F55\u8FC7\u6EE4\u5668\u5904\u7406\uFF0C\u4EE3\u8868\u8FD9\u4E2A\u63A5\u53E3\u5DF2\u7ECF\u8D85\u8131\u4E8ESecurity\u4E4B\u5916\u4E86\u3002\u4E00\u53E5\u8BDD\uFF1A
     * WebSecurity\u8D1F\u8D23\u8FC7\u6EE4\u4E0D\u9700\u8981\u5904\u7406\u7684\u9759\u6001\u8D44\u6E90\uFF0CHttpSecurity\u8D1F\u8D23\u5904\u7406\u666E\u901A\u7684api\u63A5\u53E3\u3002
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
     * \u5904\u7406\u63A5\u53E3\u6743\u9650
     */</span>
    <span class="token comment">/*@Bean
    @Order(22)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .mvcMatchers(&quot;/login&quot;)
                .permitAll()
                .anyRequest()//\u5269\u4E0B\u6240\u6709\u7684\u8BF7\u6C42
                .authenticated()  // \u6240\u6709\u8BF7\u6C42\u90FD\u5FC5\u987B\u8981\u8BA4\u8BC1\u624D\u53EF\u4EE5\u8BBF\u95EE

                .and()
                // \u7981\u7528csrf
                .csrf()
                .disable()
                // \u542F\u7528\u8868\u5355\u767B\u5F55
//                .formLogin()
//                .permitAll()

                // \u5F02\u5E38\u5904\u7406
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //\u7981\u6B62\u751F\u6210session,\u4E5F\u4E0D\u4F1A\u5411\u5BA2\u6237\u7AEF\u8FD4\u56DEsession
                .and()
                .build();
    }
*/</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">UserDetailsService</span> <span class="token function">userDetailsService</span><span class="token punctuation">(</span><span class="token class-name">SysUserService</span> sysUserService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CustomUserDetailsService</span><span class="token punctuation">(</span>sysUserService<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u65B0\u7248\u672Csecurity\u83B7\u53D6AuthenticationManager\u7684\u65B9\u6CD5
     * <span class="token keyword">@param</span> <span class="token parameter">authenticationConfiguration</span>
     * <span class="token keyword">@return</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationConfiguration</span> authenticationConfiguration<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authenticationConfiguration<span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> SecurityFilterChain\u53EF\u4EE5\u6709\u591A\u4E2A\uFF0C\u4F46\u662F\u53EA\u6709\u4E00\u4E2ASecurityFilterChain\u4F1A\u88AB\u5339\u914D\uFF0C\u8BF7\u6C42\u8FDB\u6765\u540E\uFF0C\u6839\u636E\u8BF7\u6C42\u7684url\u8FDB\u884C\u5339\u914D\uFF0C\u5339\u914D\u5230\u4EE5\u540E\u76F4\u63A5\u8FD4\u56DE\uFF0C\u4E0D\u518D\u548C\u540E\u9762\u7684SeecurityFilterChain\u8FDB\u884C\u5339\u914D\u3002\u5982\u679C\u4E00\u4E2A\u8BF7\u6C42\u7684url\u540C\u65F6\u5339\u914D\u4E0A\u591A\u4E2ASecurityFilterChain,\u6B64\u65F6\u5C31\u8981\u6CE8\u610F\u8BBE\u7F6E@Order\u4E86


<span class="token list punctuation">2.</span> \u9759\u6001\u8D44\u6E90\u8FC7\u6EE4\u5982\u4E0B\uFF0CSecurity\u4F1A\u4E3A\u6BCF\u4E00\u4E2A\u8DEF\u5F84\u90FD\u751F\u6210\u4E00\u4E2ASecurityFilterChain,\u5982\u4E0B\u4F8B\u5B50\uFF0CSecurity\u4F1A\u989D\u5916\u751F\u6210\u4E24\u4E2ASecurityFilterChain\u5206\u522B\u5339\u914D/user/<span class="token bold"><span class="token punctuation">**</span><span class="token content">\u548C/user/</span><span class="token punctuation">**</span></span>\uFF0C
	 @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return web -&gt; web.ignoring().antMatchers(&quot;/user/<span class="token bold"><span class="token punctuation">**</span><span class="token content">&quot;, &quot;/user/</span><span class="token punctuation">**</span></span>&quot;);
    }

<span class="token list punctuation">2.</span> \u65B0\u7248\u672C\u83B7\u53D6AuthenticationManager\u65B9\u5F0F\u6709\u53D8\u5316
	 @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

<span class="token list punctuation">3.</span> SecurityFilterChain\u5339\u914D\uFF0C\u5982\u4E0B\u7B2C\u4E00\u4E2ASecurityFilterChain\u53EA\u4F1A\u5904\u7406/order/xxx\u7684\u8BF7\u6C42\uFF0C\u7B2C\u4E8C\u4E2A\u7528\u7684authorizeRequests()\u4F1A\u5339\u914D\u6240\u6709\u8BF7\u6C42\u3002\u8FD9\u91CC\u8981\u6CE8\u610F\u8BBE\u7F6E\u7B2C\u4E00\u4E2A@Order\u7684\u503C\u6BD4\u7B2C\u4E8C\u4E2A\u5C0F\uFF0C\u4E0D\u7136\u6240\u6709\u8BF7\u6C42\u90FD\u4F1A\u88AB\u7B2C\u4E8C\u4E2A\u5904\u7406\uFF0C\u7B2C\u4E00\u4E2A\u5C31\u6CA1\u6709\u610F\u4E49\u4E86\u3002
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
    
  <span class="token list punctuation">4.</span> SecurityFilterChain\u7684\u914D\u7F6E
   @Bean
    @Order(22)
    public SecurityFilterChain webSiteSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)//\u6307\u5B9A\u4F4D\u7F6E\u6DFB\u52A0\u81EA\u5B9A\u4E49\u8FC7\u6EE4\u5668
                .authorizeRequests()//\u5339\u914D\u6240\u6709\u8BF7\u6C42
                .mvcMatchers(&quot;/login&quot;)
                .permitAll()
                .anyRequest()//\u5269\u4E0B\u6240\u6709\u7684\u8BF7\u6C42
                .authenticated()  // \u6240\u6709\u8BF7\u6C42\u90FD\u5FC5\u987B\u8981\u8BA4\u8BC1\u624D\u53EF\u4EE5\u8BBF\u95EE

<span class="token code keyword">                .and()
                // \u7981\u7528csrf
                .csrf()
                .disable()
                // \u542F\u7528\u8868\u5355\u767B\u5F55\uFF08\u4E00\u822C\u524D\u540E\u4E0D\u5206\u79BB\u7684\u9879\u76EE\u624D\u7528\uFF09</span>
//                .formLogin()
//                .permitAll()

<span class="token code keyword">                // \u5F02\u5E38\u5904\u7406
                .exceptionHandling()
                .accessDeniedHandler(x x x)//\u6743\u9650\u6821\u9A8C\u5931\u8D25\uFF08403\uFF09\uFF0C\u8FD9\u91CC\u5904\u7406\u7684\u662F\u914D\u7F6E\u7C7B\u4E2D\u914D\u7F6E\u7684\u6743\u9650\u5931\u8D25\u7684\u5904\u7406\uFF0Cc
                .authenticationEntryPoint(customAuthenticationEntryPoint)//\u8BA4\u8BC1\u5931\u8D25\u5904\u7406\uFF08401\uFF09</span>

<span class="token code keyword">                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //\u7981\u6B62\u751F\u6210session,\u4E5F\u4E0D\u4F1A\u5411\u5BA2\u6237\u7AEF\u8FD4\u56DEsession\uFF08\u524D\u540E\u5206\u79BB\u9879\u76EE\uFF09
                .and()
                .build();
    }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),c=[i];function p(o,u){return s(),a("div",null,c)}var d=n(e,[["render",p],["__file","SecurityFilterChain.html.vue"]]);export{d as default};
