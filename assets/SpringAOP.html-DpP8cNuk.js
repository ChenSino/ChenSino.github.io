import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-eaM1OiHO.js";const e={},p=t(`<h2 id="_1、springaop" tabindex="-1"><a class="header-anchor" href="#_1、springaop"><span>1、SpringAOP</span></a></h2><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token blockquote punctuation">&gt;</span> SpringAOP的本质就是动态代理，底层使用JDK动态代理或者CGlib动态代理，通过代理框架生成代理类，实现对目标类的增强，Spring代理是方法级别的代理，是对方法增强，
<span class="token blockquote punctuation">&gt;</span> 
<span class="token blockquote punctuation">&gt;</span> 代理有四个要素：
<span class="token blockquote punctuation">&gt;</span> <span class="token list punctuation">1.</span> 目标类 
<span class="token blockquote punctuation">&gt;</span> <span class="token list punctuation">2.</span> 额外功能（增强）
<span class="token blockquote punctuation">&gt;</span> <span class="token list punctuation">3.</span> 切入点（被增强的方法）
<span class="token blockquote punctuation">&gt;</span> <span class="token list punctuation">4.</span> 组装（把切入点和额外功能进行整合，就是确认哪些方法需要增强）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、springaop-非注解实现" tabindex="-1"><a class="header-anchor" href="#_2、springaop-非注解实现"><span>2、SpringAOP - 非注解实现</span></a></h2><h3 id="_2-1-演示1-有接口实现" tabindex="-1"><a class="header-anchor" href="#_2-1-演示1-有接口实现"><span>2.1 演示1（有接口实现）</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span><span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//实现</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserService</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>



    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;UserServiceImpl{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;name=&#39;&quot;</span> <span class="token operator">+</span> username <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;login: username &quot;</span> <span class="token operator">+</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//增强</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LogInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">MethodBeforeAdvice</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">,</span> <span class="token class-name">Object</span> target<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;before advice&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//注意此处不用调用 原方法，原方法会自行调用，调用会导致原方法重复调用</span>
        <span class="token comment">//  method.invoke(target,args);</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//测试</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContext</span> applicationContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">&quot;applicationContext.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">UserService</span> userService <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">UserService</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;userService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userService<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token string">&quot;zhangsan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>userService<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.example.UserServiceImpl<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>username<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>吴彦祖<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logInterceptor<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.example.LogInterceptor<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>pointcut</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pc<span class="token punctuation">&quot;</span></span> <span class="token attr-name">expression</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>execution(* *(..))<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>advisor</span> <span class="token attr-name">advice-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logInterceptor<span class="token punctuation">&quot;</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pc<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>advisor</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--proxy-target-class默认为false，代表默认使用jdk动态代理，true代表使用cglib代理--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>aspectj-autoproxy</span> <span class="token attr-name">proxy-target-class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>aspectj-autoproxy</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当proxy-target-class=&quot;false&quot;，可以看到使用的是jdk动态代理 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092013.png" alt="20221221092013"></p><p>当proxy-target-class=&quot;true&quot;，可以看到使用的是CGlib动态代理 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092114.png" alt="20221221092114"></p><h3 id="_2-2-演示2-无接口实现" tabindex="-1"><a class="header-anchor" href="#_2-2-演示2-无接口实现"><span>2.2 演示2（无接口实现）</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//原目标类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>



    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;UserServiceImpl{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;name=&#39;&quot;</span> <span class="token operator">+</span> username <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;login: username &quot;</span> <span class="token operator">+</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//增强类不变</span>


<span class="token comment">//测试类</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContext</span> applicationContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">&quot;applicationContext.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">UserServiceImpl</span> userService <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">UserServiceImpl</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;userService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userService<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token string">&quot;zhangsan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果proxy-target-class的值无论是true还是false,都使用的是CGlib代理，其实也好理解，因为JDK动态代理只支持带接口实现的类增强，而CGlib还可以增强 普通的类。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092444.png" alt="20221221092444"></p><h2 id="_3、springaop注解实现" tabindex="-1"><a class="header-anchor" href="#_3、springaop注解实现"><span>3、SpringAOP注解实现</span></a></h2><p>SpringAOP注解实现主要是引入了AspectJ包，AspectJ本身是一个强大的代理框架，使用acj编译器在编译器间生成代理类，是使用asm对字节码进行操作，使用SpringAOP用 注解开发时，要引入AspectJ包，其实Spring仅仅是想使用它的注解类而已，并没有真正使用它的代理功能，SpringAOP底层只用了JDK动态代理或者CGlib动态代理， 这一点很多人都不知道。</p><p>注解的本质和xml一样，不过是把解析xml变成解析注解而已。</p><h2 id="_4、-springaop实现原理" tabindex="-1"><a class="header-anchor" href="#_4、-springaop实现原理"><span>4、 SpringAOP实现原理</span></a></h2><h3 id="_4-1-springaop是如何产生代理类的" tabindex="-1"><a class="header-anchor" href="#_4-1-springaop是如何产生代理类的"><span>4.1 SpringAOP是如何产生代理类的</span></a></h3><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221223120124.png" alt="Bean的生命周期"></p><div class="hint-container caution"><p class="hint-container-title">结论</p><pre><code>SpringAOP底层实现的原理是使用的BeanPostProcessor，BeanPostProcessor的核心功能就是可以对一个bean进行再加工，参考上面bean的生命周期可知BeanPostProcessor执行实际是在bean初始化前后，而SpringAOP的原理就是在BeanPostProcessor的后置方法中对bean进行修改，同时把修改后的代理对象替换原对象。
</code></pre></div><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>    当配置了AOP后，spring容器会自动配置一个叫做AnnotationAwareAspectJAutoProxyCreator的类，它也是一个BeanPostProcessor，最终会调用后置方法
    @Override
	public Object postProcessAfterInitialization(@Nullable Object bean, String beanName) {
		if (bean != null) {
			Object cacheKey = getCacheKey(bean.getClass(), beanName);
			if (this.earlyProxyReferences.remove(cacheKey) != bean) {
				return wrapIfNecessary(bean, beanName, cacheKey);
			}
		}
		return bean;
	}


<span class="token code keyword">    protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) {
		if (StringUtils.hasLength(beanName) &amp;&amp; this.targetSourcedBeans.contains(beanName)) {
			return bean;
		}
		if (Boolean.FALSE.equals(this.advisedBeans.get(cacheKey))) {
			return bean;
		}
		if (isInfrastructureClass(bean.getClass()) || shouldSkip(bean.getClass(), beanName)) {
			this.advisedBeans.put(cacheKey, Boolean.FALSE);
			return bean;
		}</span>

<span class="token code keyword">		// Create proxy if we have advice.
		Object[] specificInterceptors = getAdvicesAndAdvisorsForBean(bean.getClass(), beanName, null);
		if (specificInterceptors != DO_NOT_PROXY) {
			this.advisedBeans.put(cacheKey, Boolean.TRUE);
            //返回代理对象
			Object proxy = createProxy(
					bean.getClass(), beanName, specificInterceptors, new SingletonTargetSource(bean));
            //用代理对象替换原生对象
			this.proxyTypes.put(cacheKey, proxy.getClass());
			return proxy;
		}</span>

<span class="token code keyword">		this.advisedBeans.put(cacheKey, Boolean.FALSE);
		return bean;
	}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-源码层面查看springaop是使用jdk动态代理还是cglib" tabindex="-1"><a class="header-anchor" href="#_4-2-源码层面查看springaop是使用jdk动态代理还是cglib"><span>4.2 源码层面查看SpringAOP是使用JDK动态代理还是CGlib</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//org.springframework.aop.framework.DefaultAopProxyFactory#createAopProxy</span>
    <span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">AopProxy</span> <span class="token function">createAopProxy</span><span class="token punctuation">(</span><span class="token class-name">AdvisedSupport</span> config<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AopConfigException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">NativeDetector</span><span class="token punctuation">.</span><span class="token function">inNativeImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
            <span class="token punctuation">(</span>config<span class="token punctuation">.</span><span class="token function">isOptimize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> config<span class="token punctuation">.</span><span class="token function">isProxyTargetClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">hasNoUserSuppliedProxyInterfaces</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> targetClass <span class="token operator">=</span> config<span class="token punctuation">.</span><span class="token function">getTargetClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>targetClass <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AopConfigException</span><span class="token punctuation">(</span><span class="token string">&quot;TargetSource cannot determine target class: &quot;</span> <span class="token operator">+</span>
                    <span class="token string">&quot;Either an interface or a target is required for proxy creation.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span><span class="token function">isInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">isProxyClass</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token class-name">ClassUtils</span><span class="token punctuation">.</span><span class="token function">isLambdaClass</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdkDynamicAopProxy</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ObjenesisCglibAopProxy</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdkDynamicAopProxy</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-时序图" tabindex="-1"><a class="header-anchor" href="#_4-3-时序图"><span>4.3 时序图</span></a></h3>`,23),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","SpringAOP.html.vue"]]),k=JSON.parse('{"path":"/java/framework/spring/SpringAOP.html","title":"SpringAOP","lang":"zh-CN","frontmatter":{"title":"SpringAOP","date":"2017-09-22T00:00:00.000Z","sticky":100,"description":"1、SpringAOP 2、SpringAOP - 非注解实现 2.1 演示1（有接口实现） 当proxy-target-class=\\"false\\"，可以看到使用的是jdk动态代理 20221221092013 当proxy-target-class=\\"true\\"，可以看到使用的是CGlib动态代理 20221221092114 2.2 演示2（无接口...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/framework/spring/SpringAOP.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"SpringAOP"}],["meta",{"property":"og:description","content":"1、SpringAOP 2、SpringAOP - 非注解实现 2.1 演示1（有接口实现） 当proxy-target-class=\\"false\\"，可以看到使用的是jdk动态代理 20221221092013 当proxy-target-class=\\"true\\"，可以看到使用的是CGlib动态代理 20221221092114 2.2 演示2（无接口..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092013.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-29T13:59:03.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2017-09-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-29T13:59:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringAOP\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092013.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092114.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221221092444.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221223120124.png\\"],\\"datePublished\\":\\"2017-09-22T00:00:00.000Z\\",\\"dateModified\\":\\"2022-12-29T13:59:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、SpringAOP","slug":"_1、springaop","link":"#_1、springaop","children":[]},{"level":2,"title":"2、SpringAOP - 非注解实现","slug":"_2、springaop-非注解实现","link":"#_2、springaop-非注解实现","children":[{"level":3,"title":"2.1 演示1（有接口实现）","slug":"_2-1-演示1-有接口实现","link":"#_2-1-演示1-有接口实现","children":[]},{"level":3,"title":"2.2 演示2（无接口实现）","slug":"_2-2-演示2-无接口实现","link":"#_2-2-演示2-无接口实现","children":[]}]},{"level":2,"title":"3、SpringAOP注解实现","slug":"_3、springaop注解实现","link":"#_3、springaop注解实现","children":[]},{"level":2,"title":"4、 SpringAOP实现原理","slug":"_4、-springaop实现原理","link":"#_4、-springaop实现原理","children":[{"level":3,"title":"4.1 SpringAOP是如何产生代理类的","slug":"_4-1-springaop是如何产生代理类的","link":"#_4-1-springaop是如何产生代理类的","children":[]},{"level":3,"title":"4.2 源码层面查看SpringAOP是使用JDK动态代理还是CGlib","slug":"_4-2-源码层面查看springaop是使用jdk动态代理还是cglib","link":"#_4-2-源码层面查看springaop是使用jdk动态代理还是cglib","children":[]},{"level":3,"title":"4.3 时序图","slug":"_4-3-时序图","link":"#_4-3-时序图","children":[]}]}],"git":{"createdTime":1671586736000,"updatedTime":1672322343000,"contributors":[{"name":"ChenSino","email":"chenxk@sonoscape.net","commits":2},{"name":"chenkun","email":"462488588@qq.com","commits":2}]},"readingTime":{"minutes":3.53,"words":1060},"filePathRelative":"java/framework/spring/SpringAOP.md","localizedDate":"2017年9月22日","excerpt":"<h2>1、SpringAOP</h2>\\n<div class=\\"language-markdown\\" data-ext=\\"md\\" data-title=\\"md\\"><pre class=\\"language-markdown\\"><code><span class=\\"token blockquote punctuation\\">&gt;</span> SpringAOP的本质就是动态代理，底层使用JDK动态代理或者CGlib动态代理，通过代理框架生成代理类，实现对目标类的增强，Spring代理是方法级别的代理，是对方法增强，\\n<span class=\\"token blockquote punctuation\\">&gt;</span> \\n<span class=\\"token blockquote punctuation\\">&gt;</span> 代理有四个要素：\\n<span class=\\"token blockquote punctuation\\">&gt;</span> <span class=\\"token list punctuation\\">1.</span> 目标类 \\n<span class=\\"token blockquote punctuation\\">&gt;</span> <span class=\\"token list punctuation\\">2.</span> 额外功能（增强）\\n<span class=\\"token blockquote punctuation\\">&gt;</span> <span class=\\"token list punctuation\\">3.</span> 切入点（被增强的方法）\\n<span class=\\"token blockquote punctuation\\">&gt;</span> <span class=\\"token list punctuation\\">4.</span> 组装（把切入点和额外功能进行整合，就是确认哪些方法需要增强）\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};