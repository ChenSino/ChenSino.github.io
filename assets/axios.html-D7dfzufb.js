import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e}from"./app-xHrnIhLr.js";const t={},p=e(`<h2 id="项目一" tabindex="-1"><a class="header-anchor" href="#项目一"><span>项目一</span></a></h2><p>根据名称获取动漫列表</p><p>1,定义api.type.ts （定义后台接口返回的类型）</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code>
<span class="token keyword">interface</span> <span class="token class-name">ApiFormat<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** 状态码 */</span>
  code<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token doc-comment comment">/** 状态文字 */</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** 数据 */</span>
  data<span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Search</span> <span class="token operator">=</span> ApiFormat<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** 当前返回页数 */</span>
  pageindex<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token doc-comment comment">/** 总页数 */</span>
  pagetotal<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token doc-comment comment">/** 动漫列表 */</span>
  results<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/** 分类列表 */</span>
    category<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** 封面 */</span>
    cover<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** 首发时间 */</span>
    date<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** 介绍 */</span>
    description<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** 动漫id */</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** 动漫状态（更新、完结...） */</span>
    season<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** 动漫名称 */</span>
    title<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token operator">&gt;</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2，重新定义，我们前端需要的数据类型。type.ts</p><p>（比如后台接口返回的是pagetotal总页数，我们前端需要的是total总条数） 所以我们可以重新定义我们前端需要的数据结构.</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 分页
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Page<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** 当前页数据 */</span>
  data<span class="token operator">:</span> <span class="token constant">T</span>
  <span class="token doc-comment comment">/** 总数 */</span>
  total<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 动漫分页列表
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ComicPageList</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** 封面 */</span>
  cover<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** id */</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** 杂项 */</span>
  season<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** 名称 */</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 动漫搜索-返回值
 */</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">SearchComicReturn</span> <span class="token operator">=</span> Page<span class="token operator">&lt;</span>ComicPageList<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3, 定义请求接口 .index.ts（这里想要返回的数据类型为 SearchComicReturn，而不是ApiType.Search类型）</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code>
<span class="token doc-comment comment">/**
 * 请求 - get
 * <span class="token keyword">@param</span> <span class="token parameter">url</span> 请求地址
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getax</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> FnReturns <span class="token keyword">from</span> <span class="token string">&#39;./type&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> ApiType <span class="token keyword">from</span> <span class="token string">&#39;./api.type&#39;</span>

<span class="token doc-comment comment">/**
 * 根据名称获取动漫列表
 * <span class="token keyword">@param</span> <span class="token parameter">param</span>
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">searchComic</span><span class="token punctuation">(</span>param<span class="token operator">:</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  page<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>FnReturns<span class="token punctuation">.</span>SearchComicReturn<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>
      data<span class="token operator">:</span> <span class="token punctuation">{</span>
        data<span class="token operator">:</span> <span class="token punctuation">{</span> results<span class="token punctuation">,</span> pagetotal <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getax</span><span class="token generic class-name"><span class="token operator">&lt;</span>ApiType<span class="token punctuation">.</span>Search<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">api/search/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>param<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?page=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>param<span class="token punctuation">.</span>page<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>results <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        data<span class="token operator">:</span> results<span class="token punctuation">,</span>
        total<span class="token operator">:</span> <span class="token punctuation">(</span>pagetotal <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">20</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token function">newError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
    <span class="token function">badRequestNotify</span><span class="token punctuation">(</span><span class="token string">&#39;api/search&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      data<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      total<span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[p];function c(i,l){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","axios.html.vue"]]),m=JSON.parse('{"path":"/frontweb/typeScript/axios.html","title":"typeScript中使用axios","lang":"zh-CN","frontmatter":{"title":"typeScript中使用axios","date":"2022-11-08T16:57:01.000Z","author":"qianxun","category":["vue知识点"],"tag":["必会","vue中的 TypeScript"],"description":"项目一 根据名称获取动漫列表 1,定义api.type.ts （定义后台接口返回的类型） 2，重新定义，我们前端需要的数据类型。type.ts （比如后台接口返回的是pagetotal总页数，我们前端需要的是total总条数） 所以我们可以重新定义我们前端需要的数据结构. 3, 定义请求接口 .index.ts（这里想要返回的数据类型为 SearchC...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/frontweb/typeScript/axios.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"typeScript中使用axios"}],["meta",{"property":"og:description","content":"项目一 根据名称获取动漫列表 1,定义api.type.ts （定义后台接口返回的类型） 2，重新定义，我们前端需要的数据类型。type.ts （比如后台接口返回的是pagetotal总页数，我们前端需要的是total总条数） 所以我们可以重新定义我们前端需要的数据结构. 3, 定义请求接口 .index.ts（这里想要返回的数据类型为 SearchC..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-11-10T07:05:14.000Z"}],["meta",{"property":"article:author","content":"qianxun"}],["meta",{"property":"article:tag","content":"必会"}],["meta",{"property":"article:tag","content":"vue中的 TypeScript"}],["meta",{"property":"article:published_time","content":"2022-11-08T16:57:01.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-10T07:05:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"typeScript中使用axios\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-08T16:57:01.000Z\\",\\"dateModified\\":\\"2022-11-10T07:05:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"qianxun\\"}]}"]]},"headers":[{"level":2,"title":"项目一","slug":"项目一","link":"#项目一","children":[]}],"git":{"createdTime":1668063914000,"updatedTime":1668063914000,"contributors":[{"name":"zhu","email":"819508408@qq.com","commits":1}]},"readingTime":{"minutes":1.4,"words":421},"filePathRelative":"frontweb/typeScript/axios.md","localizedDate":"2022年11月8日","excerpt":"<h2>项目一</h2>\\n<p>根据名称获取动漫列表</p>\\n<p>1,定义api.type.ts （定义后台接口返回的类型）</p>\\n<div class=\\"language-typescript\\" data-ext=\\"ts\\" data-title=\\"ts\\"><pre class=\\"language-typescript\\"><code>\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">ApiFormat<span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">&gt;</span></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token doc-comment comment\\">/** 状态码 */</span>\\n  code<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span>\\n  <span class=\\"token doc-comment comment\\">/** 状态文字 */</span>\\n  message<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n  <span class=\\"token doc-comment comment\\">/** 数据 */</span>\\n  data<span class=\\"token operator\\">:</span> <span class=\\"token constant\\">T</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">Search</span> <span class=\\"token operator\\">=</span> ApiFormat<span class=\\"token operator\\">&lt;</span><span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token doc-comment comment\\">/** 当前返回页数 */</span>\\n  pageindex<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span>\\n  <span class=\\"token doc-comment comment\\">/** 总页数 */</span>\\n  pagetotal<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span>\\n  <span class=\\"token doc-comment comment\\">/** 动漫列表 */</span>\\n  results<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token doc-comment comment\\">/** 分类列表 */</span>\\n    category<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n    <span class=\\"token doc-comment comment\\">/** 封面 */</span>\\n    cover<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n    <span class=\\"token doc-comment comment\\">/** 首发时间 */</span>\\n    date<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n    <span class=\\"token doc-comment comment\\">/** 介绍 */</span>\\n    description<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n    <span class=\\"token doc-comment comment\\">/** 动漫id */</span>\\n    id<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n    <span class=\\"token doc-comment comment\\">/** 动漫状态（更新、完结...） */</span>\\n    season<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n    <span class=\\"token doc-comment comment\\">/** 动漫名称 */</span>\\n    title<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token operator\\">&gt;</span>\\n    \\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
