import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as p,c as i,a as n,b as t,d as l,e as c}from"./app-xHrnIhLr.js";const m={},o=c(`<p>一，什么是pnpm</p><p>performant npm ，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”</p><p>二，特点</p><ol><li><p>当使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 100 份该相同依赖包的副本。然而，如果是使用 pnpm，依赖包将被 存放在一个统一的位置，因此：</p><ol><li>如果你对同一依赖包需要使用不同的版本，则仅有 版本之间不同的文件会被存储起来。例如，如果某个依赖包包含 100 个文件，其发布了一个新 版本，并且新版本中只有一个文件有修改，则 <code>pnpm update</code> 只需要添加一个 新文件到存储中，而不会因为一个文件的修改而保存依赖包的 所有文件。</li><li>所有文件都保存在硬盘上的统一的位置。当安装软件包时， 其包含的所有文件都会硬链接自此位置，而不会占用 额外的硬盘空间。这让你可以在项目之间方便地共享相同版本的 依赖包。</li></ol><p>最终结果就是以项目和依赖包的比例来看，你节省了大量的硬盘空间， 并且安装速度也大大提高了！</p></li></ol><p>三，安装</p><p>全局安装</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
npm install pnpm -g

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后若出现pnpm : 无法加载文件 C:\\Users\\hp\\AppData\\Roaming\\npm\\pnpm.ps1，因为在此系统上禁止运行脚本</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>
在系统中搜索框输入 Windos PowerShell

点击<span class="token punctuation">[</span>管理员身份运行<span class="token punctuation">]</span>

输入<span class="token punctuation">[</span>set-ExecutionPolicy RemoteSigned<span class="token punctuation">]</span>回车

根据提示，输入A，回车

再次回到pnpm -v执行成功。

ps：不只是pnpm命令，包括cnpm、yarn等这些命令，如果执行时，报这样的错误，都可以通过此方法解决。
	前提是，如果是用npm命令来安装这些cli命令工具，必须安装到全局环境中，才能生效。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置源</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看源</span>
<span class="token function">pnpm</span> config get registry

<span class="token comment"># 切换淘宝源</span>

<span class="token function">pnpm</span> config <span class="token builtin class-name">set</span> registry http://registry.npm.taobao.org

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>
<span class="token comment"># 下载包(XXX)</span>
<span class="token function">pnpm</span> <span class="token function">install</span> XXX
<span class="token function">pnpm</span> i XXX
<span class="token comment"># -S  默认写入dependencies</span>
<span class="token function">pnpm</span> <span class="token function">add</span> XXX <span class="token parameter variable">-S</span>
<span class="token comment"># -D devDependencies</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span>
<span class="token comment"># 全局安装</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-g</span>
<span class="token comment"># 移除包(XXX)</span>
<span class="token function">pnpm</span> remove XXX
<span class="token comment"># 移除全局包(XXX)</span>
<span class="token function">pnpm</span> remove XXX <span class="token parameter variable">--global</span>
<span class="token comment"># 更新所有依赖项</span>
<span class="token function">pnpm</span> up                
<span class="token comment"># 更新包(XXX)</span>
<span class="token function">pnpm</span> upgrade XXX
<span class="token comment"># 更新全局包(XXX)</span>
<span class="token function">pnpm</span> upgrade XXX <span class="token parameter variable">--global</span>
<span class="token comment"># 设置存储路径</span>
<span class="token function">pnpm</span> config <span class="token builtin class-name">set</span> store-dir /path/to/.pnpm-store

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),r={href:"https://www.pnpm.cn/motivation",target:"_blank",rel:"noopener noreferrer"};function d(u,v){const e=a("ExternalLinkIcon");return p(),i("div",null,[o,n("p",null,[n("a",r,[t("pnpm官方网站"),l(e)])])])}const h=s(m,[["render",d],["__file","usePnpm.html.vue"]]),k=JSON.parse('{"path":"/frontweb/es6/usePnpm.html","title":"搞懂npm与pnpm","lang":"zh-CN","frontmatter":{"title":"搞懂npm与pnpm","date":"2022-10-14T16:57:01.000Z","author":"qianxun","category":["npm知识点"],"tag":["必会"],"description":"一，什么是pnpm performant npm ，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具” 二，特点 当使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 1...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/frontweb/es6/usePnpm.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"搞懂npm与pnpm"}],["meta",{"property":"og:description","content":"一，什么是pnpm performant npm ，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具” 二，特点 当使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-14T07:21:08.000Z"}],["meta",{"property":"article:author","content":"qianxun"}],["meta",{"property":"article:tag","content":"必会"}],["meta",{"property":"article:published_time","content":"2022-10-14T16:57:01.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-14T07:21:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"搞懂npm与pnpm\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-14T16:57:01.000Z\\",\\"dateModified\\":\\"2022-10-14T07:21:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"qianxun\\"}]}"]]},"headers":[],"git":{"createdTime":1665732068000,"updatedTime":1665732068000,"contributors":[{"name":"zhu","email":"819508408@qq.com","commits":1}]},"readingTime":{"minutes":2.27,"words":682},"filePathRelative":"frontweb/es6/usePnpm.md","localizedDate":"2022年10月14日","excerpt":"<p>一，什么是pnpm</p>\\n<p>performant npm ，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”</p>\\n<p>二，特点</p>\\n<ol>\\n<li>\\n<p>当使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 100 份该相同依赖包的副本。然而，如果是使用 pnpm，依赖包将被 存放在一个统一的位置，因此：</p>\\n<ol>\\n<li>如果你对同一依赖包需要使用不同的版本，则仅有 版本之间不同的文件会被存储起来。例如，如果某个依赖包包含 100 个文件，其发布了一个新 版本，并且新版本中只有一个文件有修改，则 <code>pnpm update</code> 只需要添加一个 新文件到存储中，而不会因为一个文件的修改而保存依赖包的 所有文件。</li>\\n<li>所有文件都保存在硬盘上的统一的位置。当安装软件包时， 其包含的所有文件都会硬链接自此位置，而不会占用 额外的硬盘空间。这让你可以在项目之间方便地共享相同版本的 依赖包。</li>\\n</ol>\\n<p>最终结果就是以项目和依赖包的比例来看，你节省了大量的硬盘空间， 并且安装速度也大大提高了！</p>\\n</li>\\n</ol>","autoDesc":true}');export{h as comp,k as data};
