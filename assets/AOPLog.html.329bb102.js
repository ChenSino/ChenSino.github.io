import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e as t}from"./app.273e6562.js";const e={},p=t(`<h4 id="_1-\u535A\u5BA2\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u535A\u5BA2\u80CC\u666F" aria-hidden="true">#</a> 1. \u535A\u5BA2\u80CC\u666F</h4><p>\u6700\u8FD1\u4E1A\u52A1\u63D0\u4E86\u4E00\u4E2A\u9700\u6C42\uFF0C\u8BA9\u8BB0\u5F55\u6BCF\u4E2A\u7528\u6237\u7684\u6BCF\u4E2A\u64CD\u4F5C\u8BF7\u6C42\u5230\u6570\u636E\u5E93\uFF0C\u4FDD\u8BC1\u6BCF\u4E2A\u64CD\u4F5C\u90FD\u53EF\u8FFD\u6EAF\uFF0C\u8FD9\u4E2A\u9700\u6C42\u5F88\u5178\u578B\uFF0C\u5B9E\u73B0\u8D77\u6765\u4E5F\u4E0D\u96BE\uFF0C\u4E00\u4E2A\u81EA\u5B9A\u4E49\u6CE8\u89E3\u5C31\u641E\u5B9A\u4E86\u3002</p><h4 id="_2-\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-\u5B9E\u73B0" aria-hidden="true">#</a> 2. \u5B9E\u73B0</h4><blockquote><p>\u5B9E\u73B0\u601D\u8DEF\u6BD4\u8F83\u7B80\u5355\uFF0C\u91C7\u7528AOP\uFF0C\u5148\u81EA\u5B9A\u4E49\u4E00\u4E2A\u6CE8\u89E3\uFF0C\u5728\u9700\u8981\u8BB0\u5F55\u7684\u5730\u65B9\u5C31\u4F7F\u7528\u6CE8\u89E3</p></blockquote><h5 id="_2-1-\u81EA\u5B9A\u4E49\u6CE8\u89E3syslog" tabindex="-1"><a class="header-anchor" href="#_2-1-\u81EA\u5B9A\u4E49\u6CE8\u89E3syslog" aria-hidden="true">#</a> 2.1 \u81EA\u5B9A\u4E49\u6CE8\u89E3SysLog</h5><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>METHOD<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SysLog</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/**
	 * \u63CF\u8FF0
	 * <span class="token keyword">@return</span> <span class="token punctuation">{</span>String<span class="token punctuation">}</span>
	 */</span>
	<span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-2-\u65E5\u5FD7\u5B9E\u4F53\u7C7B" tabindex="-1"><a class="header-anchor" href="#_2-2-\u65E5\u5FD7\u5B9E\u4F53\u7C7B" aria-hidden="true">#</a> 2.2 \u65E5\u5FD7\u5B9E\u4F53\u7C7B</h5><p>@Data\u662FLombok\u4E2D\u7684</p><p>@ApiModel\u662Fswagger\u4E2D\u7684</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ApiModel</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u65E5\u5FD7&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysLog</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u7F16\u53F7
	 */</span>
	<span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u65E5\u5FD7\u7F16\u53F7&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u65E5\u5FD7\u7C7B\u578B
	 */</span>
	<span class="token annotation punctuation">@NotBlank</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">&quot;\u65E5\u5FD7\u7C7B\u578B\u4E0D\u80FD\u4E3A\u7A7A&quot;</span><span class="token punctuation">)</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u65E5\u5FD7\u7C7B\u578B&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u65E5\u5FD7\u6807\u9898
	 */</span>
	<span class="token annotation punctuation">@NotBlank</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">&quot;\u65E5\u5FD7\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A&quot;</span><span class="token punctuation">)</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u65E5\u5FD7\u6807\u9898&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u521B\u5EFA\u8005
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u521B\u5EFA\u4EBA&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> createBy<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u521B\u5EFA\u65F6\u95F4
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u521B\u5EFA\u65F6\u95F4&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u66F4\u65B0\u65F6\u95F4
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u66F4\u65B0\u65F6\u95F4&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> updateTime<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u64CD\u4F5CIP\u5730\u5740
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u64CD\u4F5Cip\u5730\u5740&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> remoteAddr<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u7528\u6237\u4EE3\u7406
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u7528\u6237\u4EE3\u7406&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> userAgent<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u8BF7\u6C42URI
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u8BF7\u6C42uri&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> requestUri<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u64CD\u4F5C\u65B9\u5F0F
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u64CD\u4F5C\u65B9\u5F0F&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> method<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u64CD\u4F5C\u63D0\u4EA4\u7684\u6570\u636E
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u63D0\u4EA4\u6570\u636E&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> params<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u6267\u884C\u65F6\u95F4
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u65B9\u6CD5\u6267\u884C\u65F6\u95F4&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> time<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u5F02\u5E38\u4FE1\u606F
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u5F02\u5E38\u4FE1\u606F&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> exception<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u670D\u52A1ID
	 */</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u5E94\u7528\u6807\u8BC6&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> serviceId<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * \u5220\u9664\u6807\u8BB0
	 */</span>
	<span class="token annotation punctuation">@TableLogic</span>
	<span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;\u5220\u9664\u6807\u8BB0,1:\u5DF2\u5220\u9664,0:\u6B63\u5E38&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> delFlag<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-2-aop\u62E6\u622A" tabindex="-1"><a class="header-anchor" href="#_2-2-aop\u62E6\u622A" aria-hidden="true">#</a> 2.2 AOP\u62E6\u622A</h5><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysLogAspect</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ApplicationEventPublisher</span> publisher<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@SneakyThrows</span>
	<span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(sysLog)&quot;</span><span class="token punctuation">)</span><span class="token comment">//\u8868\u793A\u62E6\u622A@SysLog\u6CE8\u89E3\u7684\u65B9\u6CD5</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> point<span class="token punctuation">,</span> <span class="token class-name">SysLog</span> sysLog<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">String</span> strClassName <span class="token operator">=</span> point<span class="token punctuation">.</span><span class="token function">getTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">String</span> strMethodName <span class="token operator">=</span> point<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;[\u7C7B\u540D]:{},[\u65B9\u6CD5]:{}&quot;</span><span class="token punctuation">,</span> strClassName<span class="token punctuation">,</span> strMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//\u6B64\u5904\u7684SysLog\u6307\u7684\u662F\u65E5\u5FD7\u5B9E\u4F53\u7C7B</span>
		<span class="token class-name">SysLog</span> logVo <span class="token operator">=</span> <span class="token class-name">SysLogUtils</span><span class="token punctuation">.</span><span class="token function">getSysLog</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">;</span>
		logVo<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span>sysLog<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// \u53D1\u9001\u5F02\u6B65\u65E5\u5FD7\u4E8B\u4EF6</span>
		<span class="token class-name">Long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Object</span> obj <span class="token operator">=</span> point<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		logVo<span class="token punctuation">.</span><span class="token function">setTime</span><span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u56E0\u4E3A\u6211\u7CFB\u7EDF\u662F\u5206\u5E03\u5F0F\u4E0D\u662F\u5355\u673A\uFF0C\u6240\u4EE5\u6B64\u5904\u53D1\u9001\u4E00\u4E2A\u4E8B\u4EF6\uFF0C\u4E8B\u4EF6\u901A\u8FC7feign\u8FDC\u7A0B\u8C03\u7528\u65E5\u5FD7\u670D\u52A1</span>
		publisher<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SysLogEvent</span><span class="token punctuation">(</span>logVo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> obj<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-3-\u901A\u8FC7\u4E8B\u4EF6\u8C03\u7528\u8FDC\u7A0B\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#_2-3-\u901A\u8FC7\u4E8B\u4EF6\u8C03\u7528\u8FDC\u7A0B\u65E5\u5FD7" aria-hidden="true">#</a> 2.3 \u901A\u8FC7\u4E8B\u4EF6\u8C03\u7528\u8FDC\u7A0B\u65E5\u5FD7</h5><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysLogListener</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RemoteLogService</span> remoteLogService<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Async</span>
	<span class="token annotation punctuation">@Order</span>
	<span class="token annotation punctuation">@EventListener</span><span class="token punctuation">(</span><span class="token class-name">SysLogEvent</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveSysLog</span><span class="token punctuation">(</span><span class="token class-name">SysLogEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">SysLog</span> sysLog <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getSysLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		remoteLogService<span class="token punctuation">.</span><span class="token function">saveLog</span><span class="token punctuation">(</span>sysLog<span class="token punctuation">,</span> <span class="token class-name">SecurityConstants</span><span class="token punctuation">.</span>FROM_IN<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),o=[p];function i(c,l){return s(),a("div",null,o)}var r=n(e,[["render",i],["__file","AOPLog.html.vue"]]);export{r as default};
