import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,e as t}from"./app-Cs38sdJl.js";const n={},r=t(`<blockquote><p>背景：</p><p>我有一个库A,这个库同时被两个服务使用（serviceA、serviceB），某天，因serviceA业务需要，必须更改数据库结构，导致serviceB无法使用，但是serviceB又不能停机，所以就考虑把数据库克隆一份给serviceB使用。在克隆使用的是mysqldump直接导出，然后再新建另一个库B,在库B导入sql，结果就悲剧了。</p></blockquote><h2 id="_1、库a导出" tabindex="-1"><a class="header-anchor" href="#_1、库a导出"><span>1、库A导出</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 在服务器把写了个定时备份脚本，这个databaseA是未更新前备份的库</span>
mysqldump <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span> databaseA<span class="token operator">&gt;</span>databaseA.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、使用source导入" tabindex="-1"><a class="header-anchor" href="#_2、使用source导入"><span>2、使用source导入</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 1. 先创建databaseB（此步省略）</span>

<span class="token comment"># 2. source命令导入</span>
use databaseB<span class="token punctuation">;</span>
<span class="token builtin class-name">source</span> databaseA.sql<span class="token punctuation">;</span>  <span class="token comment"># 这一步就杯具了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里对导出的sql文件不熟悉，导出的时候里面会自动有个<code>use 原数据库名</code>，所以即使你在导入到新库之前切换到了库B,但是当使用source命令时，它会自动切换到原库，所以实际上直接<code>source databaseA.sql</code>是导入到了原来的A库中，这就很苦比了，这个库会直接覆盖databaseA,前面我们说过，此时的A库因业务需要表结构已经发生变化了，然后source时又被覆盖，之前修改的表结构相当于白改了。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220412100355169.png" alt="image-20220412100355169"></p>`,7),c=[r];function o(i,l){return a(),s("div",null,c)}const m=e(n,[["render",o],["__file","2022-04-12.html.vue"]]),u=JSON.parse('{"path":"/other/essay/2022-04-12.html","title":"Sat Apr 02 2022 00:00:00 GMT+0000 (Coordinated Universal Time)","lang":"zh-CN","frontmatter":{"date":"2022-04-02T00:00:00.000Z","author":"chenkun","publish":true,"keys":null,"category":["数据库"],"tag":["数据库"],"description":"背景： 我有一个库A,这个库同时被两个服务使用（serviceA、serviceB），某天，因serviceA业务需要，必须更改数据库结构，导致serviceB无法使用，但是serviceB又不能停机，所以就考虑把数据库克隆一份给serviceB使用。在克隆使用的是mysqldump直接导出，然后再新建另一个库B,在库B导入sql，结果就悲剧了。 1、...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/essay/2022-04-12.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"Sat Apr 02 2022 00:00:00 GMT+0000 (Coordinated Universal Time)"}],["meta",{"property":"og:description","content":"背景： 我有一个库A,这个库同时被两个服务使用（serviceA、serviceB），某天，因serviceA业务需要，必须更改数据库结构，导致serviceB无法使用，但是serviceB又不能停机，所以就考虑把数据库克隆一份给serviceB使用。在克隆使用的是mysqldump直接导出，然后再新建另一个库B,在库B导入sql，结果就悲剧了。 1、..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220412100355169.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T13:56:59.000Z"}],["meta",{"property":"article:author","content":"chenkun"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:published_time","content":"2022-04-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-01T13:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Sat Apr 02 2022 00:00:00 GMT+0000 (Coordinated Universal Time)\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220412100355169.png\\"],\\"datePublished\\":\\"2022-04-02T00:00:00.000Z\\",\\"dateModified\\":\\"2022-08-01T13:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chenkun\\"}]}"]]},"headers":[{"level":2,"title":"1、库A导出","slug":"_1、库a导出","link":"#_1、库a导出","children":[]},{"level":2,"title":"2、使用source导入","slug":"_2、使用source导入","link":"#_2、使用source导入","children":[]}],"git":{"createdTime":1659362219000,"updatedTime":1659362219000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":1.19,"words":356},"filePathRelative":"other/essay/2022-04-12.md","localizedDate":"2022年4月2日","excerpt":"<!--more-->\\n<blockquote>\\n<p>背景：</p>\\n<p>我有一个库A,这个库同时被两个服务使用（serviceA、serviceB），某天，因serviceA业务需要，必须更改数据库结构，导致serviceB无法使用，但是serviceB又不能停机，所以就考虑把数据库克隆一份给serviceB使用。在克隆使用的是mysqldump直接导出，然后再新建另一个库B,在库B导入sql，结果就悲剧了。</p>\\n</blockquote>\\n<h2>1、库A导出</h2>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\"># 在服务器把写了个定时备份脚本，这个databaseA是未更新前备份的库</span>\\nmysqldump <span class=\\"token parameter variable\\">-h</span> localhost <span class=\\"token parameter variable\\">-uroot</span> <span class=\\"token parameter variable\\">-p123456</span> databaseA<span class=\\"token operator\\">&gt;</span>databaseA.sql\\n</code></pre></div>","autoDesc":true}');export{m as comp,u as data};
