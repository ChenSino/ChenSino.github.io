import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-COSs6b7v.js";const e={},p=t(`<h4 id="_1-博客背景" tabindex="-1"><a class="header-anchor" href="#_1-博客背景"><span>1. 博客背景</span></a></h4><p>最近业务提了一个需求，让记录每个用户的每个操作请求到数据库，保证每个操作都可追溯，这个需求很典型，实现起来也不难，一个自定义注解就搞定了。</p><h4 id="_2-实现" tabindex="-1"><a class="header-anchor" href="#_2-实现"><span>2. 实现</span></a></h4><blockquote><p>实现思路比较简单，采用AOP，先自定义一个注解，在需要记录的地方就使用注解</p></blockquote><h5 id="_2-1-自定义注解syslog" tabindex="-1"><a class="header-anchor" href="#_2-1-自定义注解syslog"><span>2.1 自定义注解SysLog</span></a></h5><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SysLog</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/**
	 * 描述
	 * <span class="token keyword">@return</span> <span class="token punctuation">{</span>String<span class="token punctuation">}</span>
	 */</span>
	<span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-2-日志实体类" tabindex="-1"><a class="header-anchor" href="#_2-2-日志实体类"><span>2.2 日志实体类</span></a></h5><p>@Data是Lombok中的</p><p>@ApiModel是swagger中的</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ApiModel</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;日志&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysLog</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 编号
	 */</span>
	<span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;日志编号&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 日志类型
	 */</span>
	<span class="token annotation punctuation">@NotBlank</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">&quot;日志类型不能为空&quot;</span><span class="token punctuation">)</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;日志类型&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 日志标题
	 */</span>
	<span class="token annotation punctuation">@NotBlank</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">&quot;日志标题不能为空&quot;</span><span class="token punctuation">)</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;日志标题&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 创建者
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;创建人&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> createBy<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 创建时间
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;创建时间&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 更新时间
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;更新时间&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> updateTime<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 操作IP地址
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;操作ip地址&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> remoteAddr<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 用户代理
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;用户代理&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> userAgent<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 请求URI
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;请求uri&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> requestUri<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 操作方式
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;操作方式&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> method<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 操作提交的数据
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;提交数据&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> params<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 执行时间
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;方法执行时间&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> time<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 异常信息
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;异常信息&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> exception<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 服务ID
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;应用标识&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> serviceId<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * 删除标记
	 */</span>
	<span class="token annotation punctuation">@TableLogic</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;删除标记,1:已删除,0:正常&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> delFlag<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-2-aop拦截" tabindex="-1"><a class="header-anchor" href="#_2-2-aop拦截"><span>2.2 AOP拦截</span></a></h5><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysLogAspect</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationEventPublisher</span> publisher<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@SneakyThrows</span>
	<span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(sysLog)&quot;</span><span class="token punctuation">)</span><span class="token comment">//表示拦截@SysLog注解的方法</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> point<span class="token punctuation">,</span> <span class="token class-name">SysLog</span> sysLog<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">String</span> strClassName <span class="token operator">=</span> point<span class="token punctuation">.</span><span class="token function">getTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">String</span> strMethodName <span class="token operator">=</span> point<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;[类名]:{},[方法]:{}&quot;</span><span class="token punctuation">,</span> strClassName<span class="token punctuation">,</span> strMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//此处的SysLog指的是日志实体类</span>
		<span class="token class-name">SysLog</span> logVo <span class="token operator">=</span> <span class="token class-name">SysLogUtils</span><span class="token punctuation">.</span><span class="token function">getSysLog</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">;</span>
		logVo<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span>sysLog<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 发送异步日志事件</span>
		<span class="token class-name">Long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Object</span> obj <span class="token operator">=</span> point<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		logVo<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 因为我系统是分布式不是单机，所以此处发送一个事件，事件通过feign远程调用日志服务</span>
		publisher<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SysLogEvent</span><span class="token punctuation">(</span>logVo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> obj<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-3-通过事件调用远程日志" tabindex="-1"><a class="header-anchor" href="#_2-3-通过事件调用远程日志"><span>2.3 通过事件调用远程日志</span></a></h5><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysLogListener</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RemoteLogService</span> remoteLogService<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Async</span>
	<span class="token annotation punctuation">@Order</span>
	<span class="token annotation punctuation">@EventListener</span><span class="token punctuation">(</span><span class="token class-name">SysLogEvent</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveSysLog</span><span class="token punctuation">(</span><span class="token class-name">SysLogEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">SysLog</span> sysLog <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getSysLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		remoteLogService<span class="token punctuation">.</span><span class="token function">saveLog</span><span class="token punctuation">(</span>sysLog<span class="token punctuation">,</span> <span class="token class-name">SecurityConstants</span><span class="token punctuation">.</span><span class="token constant">FROM_IN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","AOPLog.html.vue"]]),k=JSON.parse('{"path":"/java/framework/springboot/AOPLog.html","title":"使用aop记录请求log","lang":"zh-CN","frontmatter":{"title":"使用aop记录请求log","date":"2022-03-18T00:00:00.000Z","description":"1. 博客背景 最近业务提了一个需求，让记录每个用户的每个操作请求到数据库，保证每个操作都可追溯，这个需求很典型，实现起来也不难，一个自定义注解就搞定了。 2. 实现 实现思路比较简单，采用AOP，先自定义一个注解，在需要记录的地方就使用注解 2.1 自定义注解SysLog 2.2 日志实体类 @Data是Lombok中的 @ApiModel是swag...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/blog/java/framework/springboot/AOPLog.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"使用aop记录请求log"}],["meta",{"property":"og:description","content":"1. 博客背景 最近业务提了一个需求，让记录每个用户的每个操作请求到数据库，保证每个操作都可追溯，这个需求很典型，实现起来也不难，一个自定义注解就搞定了。 2. 实现 实现思路比较简单，采用AOP，先自定义一个注解，在需要记录的地方就使用注解 2.1 自定义注解SysLog 2.2 日志实体类 @Data是Lombok中的 @ApiModel是swag..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T13:56:59.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2022-03-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-01T13:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用aop记录请求log\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-18T00:00:00.000Z\\",\\"dateModified\\":\\"2022-08-01T13:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1659362219000,"updatedTime":1659362219000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":2,"words":601},"filePathRelative":"java/framework/springboot/AOPLog.md","localizedDate":"2022年3月18日","excerpt":"<h4>1. 博客背景</h4>\\n<p>最近业务提了一个需求，让记录每个用户的每个操作请求到数据库，保证每个操作都可追溯，这个需求很典型，实现起来也不难，一个自定义注解就搞定了。</p>\\n<h4>2. 实现</h4>\\n<blockquote>\\n<p>实现思路比较简单，采用AOP，先自定义一个注解，在需要记录的地方就使用注解</p>\\n</blockquote>\\n<h5>2.1 自定义注解SysLog</h5>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Target</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">ElementType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">METHOD</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token annotation punctuation\\">@Retention</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">RetentionPolicy</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">RUNTIME</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token annotation punctuation\\">@Documented</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token annotation punctuation\\">@interface</span> <span class=\\"token class-name\\">SysLog</span> <span class=\\"token punctuation\\">{</span>\\n\\n\\t<span class=\\"token doc-comment comment\\">/**\\n\\t * 描述\\n\\t * <span class=\\"token keyword\\">@return</span> <span class=\\"token punctuation\\">{</span>String<span class=\\"token punctuation\\">}</span>\\n\\t */</span>\\n\\t<span class=\\"token class-name\\">String</span> <span class=\\"token function\\">value</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
