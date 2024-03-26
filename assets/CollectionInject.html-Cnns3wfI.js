import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e}from"./app-eaM1OiHO.js";const t={},o=e(`<h2 id="_1、测试" tabindex="-1"><a class="header-anchor" href="#_1、测试"><span>1、测试</span></a></h2><p>加入有以下代码，~MyProcessor~是一个接口，没有提供任何实现，然后启动容器会发现执行Bean1的构造方法时并不会空指针，容器会自动提供一个Collection的实现类~LinkedHashMap$LinkedValues~，那么容器如何注入我自己的MyProcessor呢？</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bean1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Bean1</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyProcessor</span><span class="token punctuation">&gt;</span></span> processors<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>processors<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;执行构造方法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>processors<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、实现方法" tabindex="-1"><a class="header-anchor" href="#_2、实现方法"><span>2、实现方法</span></a></h2><p>直接提供MyProcessor的实现类，并且让其成为bean（就是加入容器），则实力化Bean1时就会自动注入到构造方法中的processors中，这里注入并不是根据Collection类型注入的，而是根据其集合中元素的类型来注入的。比如提供以下两个实现，重新启动服务，就会看到Bean1的构造方法拿到了2个元素。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyProcessorImpl1</span> <span class="token keyword">implements</span> <span class="token class-name">MyProcessor</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyProcessorImpl2</span> <span class="token keyword">implements</span> <span class="token class-name">MyProcessor</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、以上方法如何保证只注入部分的实现类呢" tabindex="-1"><a class="header-anchor" href="#_3、以上方法如何保证只注入部分的实现类呢"><span>3、以上方法如何保证只注入部分的实现类呢？</span></a></h2><p>可以使用属性注入，或者setter注入，配合@Qualifier注解，在需要注入的bean上加上@Qualifier同时在setter方法也加上，不需要注入的bean上就不加就行了。以下演示setter方法注入集合，字段注入也是一样的</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bean1</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyProcessor</span><span class="token punctuation">&gt;</span></span> processors<span class="token punctuation">;</span>
<span class="token comment">//    @Autowired</span>
<span class="token comment">//    public Bean1(Collection&lt;MyProcessor&gt; processors){</span>
<span class="token comment">//        System.out.println(processors);</span>
<span class="token comment">//        System.out.println(&quot;执行构造方法&quot;);</span>
<span class="token comment">//        System.out.println(processors.size());</span>
<span class="token comment">//    }</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token annotation punctuation">@Qualifier</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setProcessors</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyProcessor</span><span class="token punctuation">&gt;</span></span> processors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>processors <span class="token operator">=</span> processors<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//需要注入进去的就加上@Qualifier</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Qualifier</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyProcessorImpl1</span> <span class="token keyword">implements</span> <span class="token class-name">MyProcessor</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//无需注入的就不用加</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyProcessorImpl2</span> <span class="token keyword">implements</span> <span class="token class-name">MyProcessor</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","CollectionInject.html.vue"]]),k=JSON.parse('{"path":"/java/framework/springboot/CollectionInject.html","title":"注入集合","lang":"zh-CN","frontmatter":{"title":"注入集合","date":"2023-01-02T00:00:00.000Z","category":["Spring"],"description":"1、测试 加入有以下代码，~MyProcessor~是一个接口，没有提供任何实现，然后启动容器会发现执行Bean1的构造方法时并不会空指针，容器会自动提供一个Collection的实现类~LinkedHashMap$LinkedValues~，那么容器如何注入我自己的MyProcessor呢？ 2、实现方法 直接提供MyProcessor的实现类，并且...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/framework/springboot/CollectionInject.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"注入集合"}],["meta",{"property":"og:description","content":"1、测试 加入有以下代码，~MyProcessor~是一个接口，没有提供任何实现，然后启动容器会发现执行Bean1的构造方法时并不会空指针，容器会自动提供一个Collection的实现类~LinkedHashMap$LinkedValues~，那么容器如何注入我自己的MyProcessor呢？ 2、实现方法 直接提供MyProcessor的实现类，并且..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-03T13:56:27.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2023-01-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-03T13:56:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"注入集合\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-02T00:00:00.000Z\\",\\"dateModified\\":\\"2023-01-03T13:56:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、测试","slug":"_1、测试","link":"#_1、测试","children":[]},{"level":2,"title":"2、实现方法","slug":"_2、实现方法","link":"#_2、实现方法","children":[]},{"level":2,"title":"3、以上方法如何保证只注入部分的实现类呢？","slug":"_3、以上方法如何保证只注入部分的实现类呢","link":"#_3、以上方法如何保证只注入部分的实现类呢","children":[]}],"git":{"createdTime":1672754187000,"updatedTime":1672754187000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":1.35,"words":404},"filePathRelative":"java/framework/springboot/CollectionInject.md","localizedDate":"2023年1月2日","excerpt":"<h2>1、测试</h2>\\n<p>加入有以下代码，~MyProcessor~是一个接口，没有提供任何实现，然后启动容器会发现执行Bean1的构造方法时并不会空指针，容器会自动提供一个Collection的实现类~LinkedHashMap$LinkedValues~，那么容器如何注入我自己的MyProcessor呢？</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Component</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Bean1</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Bean1</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Collection</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">MyProcessor</span><span class=\\"token punctuation\\">&gt;</span></span> processors<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>processors<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"执行构造方法\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>processors<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};