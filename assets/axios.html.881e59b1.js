import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.cbe6b065.js";const t={},p=e(`<h2 id="\u9879\u76EE\u4E00" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u4E00" aria-hidden="true">#</a> \u9879\u76EE\u4E00</h2><p>\u6839\u636E\u540D\u79F0\u83B7\u53D6\u52A8\u6F2B\u5217\u8868</p><p>1,\u5B9A\u4E49api.type.ts \uFF08\u5B9A\u4E49\u540E\u53F0\u63A5\u53E3\u8FD4\u56DE\u7684\u7C7B\u578B\uFF09</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token keyword">interface</span> <span class="token class-name">ApiFormat<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** \u72B6\u6001\u7801 */</span>
  code<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token doc-comment comment">/** \u72B6\u6001\u6587\u5B57 */</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** \u6570\u636E */</span>
  data<span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Search</span> <span class="token operator">=</span> ApiFormat<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** \u5F53\u524D\u8FD4\u56DE\u9875\u6570 */</span>
  pageindex<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token doc-comment comment">/** \u603B\u9875\u6570 */</span>
  pagetotal<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token doc-comment comment">/** \u52A8\u6F2B\u5217\u8868 */</span>
  results<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/** \u5206\u7C7B\u5217\u8868 */</span>
    category<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** \u5C01\u9762 */</span>
    cover<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** \u9996\u53D1\u65F6\u95F4 */</span>
    date<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** \u4ECB\u7ECD */</span>
    description<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** \u52A8\u6F2Bid */</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** \u52A8\u6F2B\u72B6\u6001\uFF08\u66F4\u65B0\u3001\u5B8C\u7ED3...\uFF09 */</span>
    season<span class="token operator">:</span> <span class="token builtin">string</span>
    <span class="token doc-comment comment">/** \u52A8\u6F2B\u540D\u79F0 */</span>
    title<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token operator">&gt;</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2\uFF0C\u91CD\u65B0\u5B9A\u4E49\uFF0C\u6211\u4EEC\u524D\u7AEF\u9700\u8981\u7684\u6570\u636E\u7C7B\u578B\u3002type.ts</p><p>\uFF08\u6BD4\u5982\u540E\u53F0\u63A5\u53E3\u8FD4\u56DE\u7684\u662Fpagetotal\u603B\u9875\u6570\uFF0C\u6211\u4EEC\u524D\u7AEF\u9700\u8981\u7684\u662Ftotal\u603B\u6761\u6570\uFF09 \u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u91CD\u65B0\u5B9A\u4E49\u6211\u4EEC\u524D\u7AEF\u9700\u8981\u7684\u6570\u636E\u7ED3\u6784.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * \u5206\u9875
 */</span>
<span class="token keyword">type</span> <span class="token class-name">Page<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** \u5F53\u524D\u9875\u6570\u636E */</span>
  data<span class="token operator">:</span> <span class="token constant">T</span>
  <span class="token doc-comment comment">/** \u603B\u6570 */</span>
  total<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * \u52A8\u6F2B\u5206\u9875\u5217\u8868
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ComicPageList</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** \u5C01\u9762 */</span>
  cover<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** id */</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** \u6742\u9879 */</span>
  season<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token doc-comment comment">/** \u540D\u79F0 */</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * \u52A8\u6F2B\u641C\u7D22-\u8FD4\u56DE\u503C
 */</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">SearchComicReturn</span> <span class="token operator">=</span> Page<span class="token operator">&lt;</span>ComicPageList<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3, \u5B9A\u4E49\u8BF7\u6C42\u63A5\u53E3 .index.ts\uFF08\u8FD9\u91CC\u60F3\u8981\u8FD4\u56DE\u7684\u6570\u636E\u7C7B\u578B\u4E3A SearchComicReturn\uFF0C\u800C\u4E0D\u662FApiType.Search\u7C7B\u578B\uFF09</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token doc-comment comment">/**
 * \u8BF7\u6C42 - get
 * <span class="token keyword">@param</span> <span class="token parameter">url</span> \u8BF7\u6C42\u5730\u5740
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getax</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> FnReturns <span class="token keyword">from</span> <span class="token string">&#39;./type&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> ApiType <span class="token keyword">from</span> <span class="token string">&#39;./api.type&#39;</span>

<span class="token doc-comment comment">/**
 * \u6839\u636E\u540D\u79F0\u83B7\u53D6\u52A8\u6F2B\u5217\u8868
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[p];function c(i,l){return s(),a("div",null,o)}var u=n(t,[["render",c],["__file","axios.html.vue"]]);export{u as default};
