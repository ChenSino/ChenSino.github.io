import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,e as s}from"./app-eaM1OiHO.js";const t={},i=s(`<h2 id="_1-docker安装redis" tabindex="-1"><a class="header-anchor" href="#_1-docker安装redis"><span>1. docker安装Redis</span></a></h2><blockquote><p>起初的需求是用docker启动一个redis，并且指定一个配置，死活不成功，主要是少设置了data目录的映射</p></blockquote><div class="hint-container caution"><p class="hint-container-title">注意</p><p>使用docker-compose安装redis时，若指定外置redis.conf配置文件，要切记同时设置data存储目录，默认docker中的数据存在/data下，所以 使用卷映射时需要映射到容器内的/data docker-compose.yml</p></div><p>目录结构如下，需要事先准备一个redis.conf放到项目suc/redis/conf，另外需要创建目录suc/redis/data</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>suc
├── redis
│   ├── conf
│   │   └── redis.conf
│   └── data
├── docker-compose.yml

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">suc-redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> suc<span class="token punctuation">-</span>redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>6.2.6
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server /etc/redis/redis.conf
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./redis/conf<span class="token punctuation">:</span>/etc/redis  <span class="token comment">#指定外部配置</span>
      <span class="token punctuation">-</span> ./redis/data<span class="token punctuation">:</span>/data <span class="token comment">#指定数据目录，此配置一定要有</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 6379<span class="token punctuation">:</span><span class="token number">6379</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> custom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[i];function o(r,d){return n(),a("div",null,c)}const u=e(t,[["render",o],["__file","ServiceInstall.html.vue"]]),m=JSON.parse('{"path":"/other/docker/ServiceInstall.html","title":"使用docker安装常见服务","lang":"zh-CN","frontmatter":{"title":"使用docker安装常见服务","date":"2022-11-28T00:00:00.000Z","headerDepth":4,"category":["docker"],"description":"1. docker安装Redis 起初的需求是用docker启动一个redis，并且指定一个配置，死活不成功，主要是少设置了data目录的映射 注意 使用docker-compose安装redis时，若指定外置redis.conf配置文件，要切记同时设置data存储目录，默认docker中的数据存在/data下，所以 使用卷映射时需要映射到容器内的/d...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/docker/ServiceInstall.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"使用docker安装常见服务"}],["meta",{"property":"og:description","content":"1. docker安装Redis 起初的需求是用docker启动一个redis，并且指定一个配置，死活不成功，主要是少设置了data目录的映射 注意 使用docker-compose安装redis时，若指定外置redis.conf配置文件，要切记同时设置data存储目录，默认docker中的数据存在/data下，所以 使用卷映射时需要映射到容器内的/d..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2022-11-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用docker安装常见服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1. docker安装Redis","slug":"_1-docker安装redis","link":"#_1-docker安装redis","children":[]}],"git":{"createdTime":1669618444000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1},{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":0.7,"words":210},"filePathRelative":"other/docker/ServiceInstall.md","localizedDate":"2022年11月28日","excerpt":"<h2>1. docker安装Redis</h2>\\n<blockquote>\\n<p>起初的需求是用docker启动一个redis，并且指定一个配置，死活不成功，主要是少设置了data目录的映射</p>\\n</blockquote>\\n<div class=\\"hint-container caution\\">\\n<p class=\\"hint-container-title\\">注意</p>\\n<p>使用docker-compose安装redis时，若指定外置redis.conf配置文件，要切记同时设置data存储目录，默认docker中的数据存在/data下，所以\\n使用卷映射时需要映射到容器内的/data docker-compose.yml</p>\\n</div>","autoDesc":true}');export{u as comp,m as data};