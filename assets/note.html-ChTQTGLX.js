import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as c,o as i,c as p,a as n,b as s,d as e,e as t}from"./app-eaM1OiHO.js";const l={},r=n("h2",{id:"_1、加密解密流程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1、加密解密流程"},[n("span",null,"1、加密解密流程")])],-1),d=n("code",null,"PasswordEncoder",-1),u={href:"https://gist.github.com/e33a902140c1ded695c0a782a6875b69",target:"_blank",rel:"noopener noreferrer"},k=n("code",null,"encode",-1),v=n("code",null,"PasswordEncoder",-1),m=n("code",null,"matches",-1),b=t(`<p>总结一下： 加密：是新建用户时调用加密方法，把密文写入数据库或者内存； 解密：登陆时，根据用户名从系统查找对应密文A，然后在把登陆时用户传递过来的明文密码使用相同加密方式加密得到密文B，把A和B对比。（这里体现了密文不可反向解密，只能正向加密，再做对比）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PasswordEncoder</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/**
	 * Encode the raw password. Generally, a good encoding algorithm applies a SHA-1 or
	 * greater hash combined with an 8-byte or greater randomly generated salt.
	 */</span>
	<span class="token class-name">String</span> <span class="token function">encode</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> rawPassword<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * Verify the encoded password obtained from storage matches the submitted raw
	 * password after it too is encoded. Returns true if the passwords match, false if
	 * they do not. The stored password itself is never decoded.
	 * <span class="token keyword">@param</span> <span class="token parameter">rawPassword</span> the raw password to encode and match
	 * <span class="token keyword">@param</span> <span class="token parameter">encodedPassword</span> the encoded password from storage to compare with
	 * <span class="token keyword">@return</span> true if the raw password, after encoding, matches the encoded password from
	 * storage
	 */</span>
	<span class="token keyword">boolean</span> <span class="token function">matches</span><span class="token punctuation">(</span><span class="token class-name">CharSequence</span> rawPassword<span class="token punctuation">,</span> <span class="token class-name">String</span> encodedPassword<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/**
	 * Returns true if the encoded password should be encoded again for better security,
	 * else false. The default implementation always returns false.
	 * <span class="token keyword">@param</span> <span class="token parameter">encodedPassword</span> the encoded password to check
	 * <span class="token keyword">@return</span> true if the encoded password should be encoded again for better security,
	 * else false.
	 */</span>
	<span class="token keyword">default</span> <span class="token keyword">boolean</span> <span class="token function">upgradeEncoding</span><span class="token punctuation">(</span><span class="token class-name">String</span> encodedPassword<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、httpsecurity和websecurity区别" tabindex="-1"><a class="header-anchor" href="#_2、httpsecurity和websecurity区别"><span>2、HttpSecurity和WebSecurity区别</span></a></h2>`,3),h={href:"https://stackoverflow.com/questions/56388865/spring-security-configuration-httpsecurity-vs-websecurity",target:"_blank",rel:"noopener noreferrer"},y={href:"http://blog.itpub.net/69923331/viewspace-2695120/",target:"_blank",rel:"noopener noreferrer"},g=t(`<p>Spring Security 中，到底该怎么样给资源额外放行？</p><p>1.两种思路</p><p>在 Spring Security 中，有一个资源，如果你希望用户不用登录就能访问，那么一般来说，你有两种配置策略：</p><p>第一种就是在 configure(WebSecurity web) 方法中配置放行，像下面这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span>
    <span class="token string">&quot;/css/**&quot;</span><span class="token punctuation">,</span> 
    <span class="token string">&quot;/js/**&quot;</span><span class="token punctuation">,</span> 
    <span class="token string">&quot;/index.html&quot;</span><span class="token punctuation">,</span> 
    <span class="token string">&quot;/img/**&quot;</span><span class="token punctuation">,</span> 
    <span class="token string">&quot;/fonts/**&quot;</span><span class="token punctuation">,</span> 
    <span class="token string">&quot;/favicon.ico&quot;</span><span class="token punctuation">,</span> 
    <span class="token string">&quot;/verifyCode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种方式是在 configure(HttpSecurity http) 方法中进行配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    http
    <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两种方式最大的区别在于，第一种方式是不走 Spring Security 过滤器链，而第二种方式走 Spring Security 过滤器链，在过滤器链中，给请求放行。</p><p>在我们使用 Spring Security 的时候，有的资源可以使用第一种方式额外放行，不需要验证，例如前端页面的静态资源，就可以按照第一种方式配置放行。</p><p>有的资源放行，则必须使用第二种方式，例如登录接口。大家知道，登录接口也是必须要暴露出来的，不需要登录就能访问到的，但是我们却不能将登录接口用第一种方式暴露出来，登录请求必须要走 Spring Security 过滤器链，因为在这个过程中，还有其他事情要做。</p><p>总结：</p><ul><li>前端静态资源放行时，可以直接不走 Spring Security 过滤器链</li><li>后端的接口要额外放行，就需要仔细考虑场景了，一般使用httpsecurity；</li></ul><h2 id="_3、springsecurity中user实体中lock和enabled区别" tabindex="-1"><a class="header-anchor" href="#_3、springsecurity中user实体中lock和enabled区别"><span>3、SpringSecurity中User实体中Lock和enabled区别</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">implements</span> <span class="token class-name">UserDetails</span><span class="token punctuation">,</span> <span class="token class-name">CredentialsContainer</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token class-name">SpringSecurityCoreVersion</span><span class="token punctuation">.</span><span class="token constant">SERIAL_VERSION_UID</span><span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Log</span> logger <span class="token operator">=</span> <span class="token class-name">LogFactory</span><span class="token punctuation">.</span><span class="token function">getLog</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GrantedAuthority</span><span class="token punctuation">&gt;</span></span> authorities<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> accountNonExpired<span class="token punctuation">;</span>

	<span class="token comment">//lock指的是账号由于一些原因被自动锁定，比如密码尝试次数超过限制，设置为true,会提示用户被锁定</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> accountNonLocked<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> credentialsNonExpired<span class="token punctuation">;</span>
	<span class="token comment">//账号因为一些原因被管理员禁用，如果把enabled设置为true，security默认会提示用户已失效</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> enabled<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、开启方法级别的权限控制" tabindex="-1"><a class="header-anchor" href="#_4、开启方法级别的权限控制"><span>4、开启方法级别的权限控制</span></a></h2><p><code>@EnableGlobalMethodSecurity(prePostEnabled=true)</code>在配置类要开启方法级别权限控制后，就可以使用<code>@PreAuthorize</code>, <code>@PostAuthorize</code>, <code>@Secured</code>等配合上el表达式，对方法进行鉴权。</p>`,16);function w(f,_){const a=c("ExternalLinkIcon");return i(),p("div",null,[r,n("p",null,[s("在项目中引入security依赖后，项目启动会自动生成一个账号密码，账号固定为user,密码为控制台随机生成的。账号密码可以自定义加解密方式，一般情况我们的账号密码都是放在数据库中，一个正常的业务流程是，先定义好密码加解密方式，加密方式需要实现"),d,s("接口，比如这里我用"),n("a",u,[s("默认的加解密"),e(a)]),s("，然后在新增用户插入到数据库时，需要调用"),k,s("方法来加密密码。在请求后端接口时如果需要登陆权限，则会自动跳转到登陆页面，登陆接口会自动调用"),v,s("的"),m,s("方法拿明文密码加密后和密文密码（根据用户名获取已经存到系统的密文）进行匹配，匹配成功则登陆通过。")]),b,n("p",null,[n("a",h,[s("参考1"),e(a)])]),n("p",null,[n("a",y,[s("参考2"),e(a)])]),g])}const j=o(l,[["render",w],["__file","note.html.vue"]]),x=JSON.parse('{"path":"/java/framework/security/note.html","title":"Security入门笔记","lang":"zh-CN","frontmatter":{"title":"Security入门笔记","date":"2022-09-05T00:00:00.000Z","author":"chenkun","keys":null,"description":"1、加密解密流程 在项目中引入security依赖后，项目启动会自动生成一个账号密码，账号固定为user,密码为控制台随机生成的。账号密码可以自定义加解密方式，一般情况我们的账号密码都是放在数据库中，一个正常的业务流程是，先定义好密码加解密方式，加密方式需要实现PasswordEncoder接口，比如这里我用默认的加解密，然后在新增用户插入到数据库时，...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/framework/security/note.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"Security入门笔记"}],["meta",{"property":"og:description","content":"1、加密解密流程 在项目中引入security依赖后，项目启动会自动生成一个账号密码，账号固定为user,密码为控制台随机生成的。账号密码可以自定义加解密方式，一般情况我们的账号密码都是放在数据库中，一个正常的业务流程是，先定义好密码加解密方式，加密方式需要实现PasswordEncoder接口，比如这里我用默认的加解密，然后在新增用户插入到数据库时，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"chenkun"}],["meta",{"property":"article:published_time","content":"2022-09-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Security入门笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chenkun\\"}]}"]]},"headers":[{"level":2,"title":"1、加密解密流程","slug":"_1、加密解密流程","link":"#_1、加密解密流程","children":[]},{"level":2,"title":"2、HttpSecurity和WebSecurity区别","slug":"_2、httpsecurity和websecurity区别","link":"#_2、httpsecurity和websecurity区别","children":[]},{"level":2,"title":"3、SpringSecurity中User实体中Lock和enabled区别","slug":"_3、springsecurity中user实体中lock和enabled区别","link":"#_3、springsecurity中user实体中lock和enabled区别","children":[]},{"level":2,"title":"4、开启方法级别的权限控制","slug":"_4、开启方法级别的权限控制","link":"#_4、开启方法级别的权限控制","children":[]}],"git":{"createdTime":1662369998000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":3}]},"readingTime":{"minutes":3.75,"words":1125},"filePathRelative":"java/framework/security/note.md","localizedDate":"2022年9月5日","excerpt":"<h2>1、加密解密流程</h2>\\n<p>在项目中引入security依赖后，项目启动会自动生成一个账号密码，账号固定为user,密码为控制台随机生成的。账号密码可以自定义加解密方式，一般情况我们的账号密码都是放在数据库中，一个正常的业务流程是，先定义好密码加解密方式，加密方式需要实现<code>PasswordEncoder</code>接口，比如这里我用<a href=\\"https://gist.github.com/e33a902140c1ded695c0a782a6875b69\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">默认的加解密</a>，然后在新增用户插入到数据库时，需要调用<code>encode</code>方法来加密密码。在请求后端接口时如果需要登陆权限，则会自动跳转到登陆页面，登陆接口会自动调用<code>PasswordEncoder</code>的<code>matches</code>方法拿明文密码加密后和密文密码（根据用户名获取已经存到系统的密文）进行匹配，匹配成功则登陆通过。</p>","autoDesc":true}');export{j as comp,x as data};