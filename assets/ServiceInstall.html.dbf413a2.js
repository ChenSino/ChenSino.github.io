import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as a,e}from"./app.c91928b8.js";const c={},i=e(`<h2 id="_1-docker\u5B89\u88C5redis" tabindex="-1"><a class="header-anchor" href="#_1-docker\u5B89\u88C5redis" aria-hidden="true">#</a> 1. docker\u5B89\u88C5Redis</h2><blockquote><p>\u8D77\u521D\u7684\u9700\u6C42\u662F\u7528docker\u542F\u52A8\u4E00\u4E2Aredis\uFF0C\u5E76\u4E14\u6307\u5B9A\u4E00\u4E2A\u914D\u7F6E\uFF0C\u6B7B\u6D3B\u4E0D\u6210\u529F\uFF0C\u4E3B\u8981\u662F\u5C11\u8BBE\u7F6E\u4E86data\u76EE\u5F55\u7684\u6620\u5C04</p></blockquote><div class="custom-container danger"><p class="custom-container-title">\u6CE8\u610F</p><p>\u4F7F\u7528docker-compose\u5B89\u88C5redis\u65F6\uFF0C\u82E5\u6307\u5B9A\u5916\u7F6Eredis.conf\u914D\u7F6E\u6587\u4EF6\uFF0C\u8981\u5207\u8BB0\u540C\u65F6\u8BBE\u7F6Edata\u5B58\u50A8\u76EE\u5F55\uFF0C\u9ED8\u8BA4docker\u4E2D\u7684\u6570\u636E\u5B58\u5728/data\u4E0B\uFF0C\u6240\u4EE5 \u4F7F\u7528\u5377\u6620\u5C04\u65F6\u9700\u8981\u6620\u5C04\u5230\u5BB9\u5668\u5185\u7684/data docker-compose.yml</p></div><p>\u76EE\u5F55\u7ED3\u6784\u5982\u4E0B\uFF0C\u9700\u8981\u4E8B\u5148\u51C6\u5907\u4E00\u4E2Aredis.conf\u653E\u5230\u9879\u76EEsuc/redis/conf\uFF0C\u53E6\u5916\u9700\u8981\u521B\u5EFA\u76EE\u5F55suc/redis/data</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>suc
\u251C\u2500\u2500 redis
\u2502   \u251C\u2500\u2500 conf
\u2502   \u2502   \u2514\u2500\u2500 redis.conf
\u2502   \u2514\u2500\u2500 data
\u251C\u2500\u2500 docker-compose.yml

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">suc-redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> suc<span class="token punctuation">-</span>redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>6.2.6
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server /etc/redis/redis.conf
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./redis/conf<span class="token punctuation">:</span>/etc/redis  <span class="token comment">#\u6307\u5B9A\u5916\u90E8\u914D\u7F6E</span>
      <span class="token punctuation">-</span> ./redis/data<span class="token punctuation">:</span>/data <span class="token comment">#\u6307\u5B9A\u6570\u636E\u76EE\u5F55\uFF0C\u6B64\u914D\u7F6E\u4E00\u5B9A\u8981\u6709</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 6379<span class="token punctuation">:</span><span class="token number">6379</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> custom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),t=[i];function l(o,d){return n(),a("div",null,t)}var u=s(c,[["render",l],["__file","ServiceInstall.html.vue"]]);export{u as default};
