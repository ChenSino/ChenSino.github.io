import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,e}from"./app-Cs38sdJl.js";const t={},i=e(`<h2 id="_1、-githubpage介绍" tabindex="-1"><a class="header-anchor" href="#_1、-githubpage介绍"><span>1、 GitHubPage介绍</span></a></h2><h3 id="_1-1-ok" tabindex="-1"><a class="header-anchor" href="#_1-1-ok"><span>1.1 ok</span></a></h3><h3 id="_1-2-搭建个人githubpage" tabindex="-1"><a class="header-anchor" href="#_1-2-搭建个人githubpage"><span>1.2 搭建个人githubpage</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>个人page和项目page的区别就是个人page只有一个，所谓的个人Page说白了也是一个特殊的项目Page,无非就是它的仓库名字比较特殊，必须为&lt;username&gt;.github.io，比如java框架\`spring-cloud.github.io\`、\`facebook.github.io\`，注意个人page的仓库名一定要加上 \`.github.io\`才算个人Page，不加的话就是一个普通项目了。
个人page有啥特殊之处呢？
在访问页面时可以直接使用https://&lt;username&gt;.github.io,不用加仓库名，普通的项目page,访问时需要加仓库名，比如https://&lt;username&gt;.github.io/&lt;reponame&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、配合github的action实现自动化部署" tabindex="-1"><a class="header-anchor" href="#_2、配合github的action实现自动化部署"><span>2、配合github的Action实现自动化部署</span></a></h2><h3 id="_2-1-自动部署脚本" tabindex="-1"><a class="header-anchor" href="#_2-1-自动部署脚本"><span>2.1 自动部署脚本</span></a></h3><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># 手动触发部署</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest <span class="token comment">#在github服务器使用ubuntu环境</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&quot;14&quot;</span>

      <span class="token comment"># 缓存 node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> npm<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>npm<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/package-lock.json&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            \${{ runner.os }}-npm-</span>

      <span class="token comment"># 如果缓存没有命中，安装依赖</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.npm<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run build  <span class="token comment">#命令和package.json保持一直，本地打包用什么，这里写什么</span>

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@3.7.1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>secrets.xxx<span class="token punctuation">}</span> <span class="token comment">#在github设置，这里名字要和你设置的保持一致,注意这里不是要你直接写token,是把xxx改成你设置的那个名字就ok了</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> public

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>注意</strong></em></p><ol><li>在项目根路径新建一个.github/workflows/main.yml，yml中放以上内容</li><li>现在github主分支改成了main,所以需要在本地把分支修改一下<code>git branch -M main</code></li><li>源码和打包后的public(一般是dist)文件夹分别放在两个分支，我这里源码在main分支，部署是在gh-pages分支，部署脚本会自动创建一个gh-pages分支。</li><li>ACCESS_TOKEN这里不要直接放密钥，而是放你生成的密钥对应的名字（github设置中那个note字段）</li></ol>`,9),p=[i];function l(c,o){return a(),s("div",null,p)}const d=n(t,[["render",l],["__file","DeployGithubPage.html.vue"]]),k=JSON.parse('{"path":"/other/essay/DeployGithubPage.html","title":"如何在github部署静态网站","lang":"zh-CN","frontmatter":{"title":"如何在github部署静态网站","date":"2022-03-15T00:00:00.000Z","author":"Sino","sticky":5,"tag":["部署搭建"],"description":"1、 GitHubPage介绍 1.1 ok 1.2 搭建个人githubpage 2、配合github的Action实现自动化部署 2.1 自动部署脚本 注意 在项目根路径新建一个.github/workflows/main.yml，yml中放以上内容 现在github主分支改成了main,所以需要在本地把分支修改一下git branch -M ma...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/essay/DeployGithubPage.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"如何在github部署静态网站"}],["meta",{"property":"og:description","content":"1、 GitHubPage介绍 1.1 ok 1.2 搭建个人githubpage 2、配合github的Action实现自动化部署 2.1 自动部署脚本 注意 在项目根路径新建一个.github/workflows/main.yml，yml中放以上内容 现在github主分支改成了main,所以需要在本地把分支修改一下git branch -M ma..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T13:56:59.000Z"}],["meta",{"property":"article:author","content":"Sino"}],["meta",{"property":"article:tag","content":"部署搭建"}],["meta",{"property":"article:published_time","content":"2022-03-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-01T13:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在github部署静态网站\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-15T00:00:00.000Z\\",\\"dateModified\\":\\"2022-08-01T13:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Sino\\"}]}"]]},"headers":[{"level":2,"title":"1、 GitHubPage介绍","slug":"_1、-githubpage介绍","link":"#_1、-githubpage介绍","children":[{"level":3,"title":"1.1 ok","slug":"_1-1-ok","link":"#_1-1-ok","children":[]},{"level":3,"title":"1.2 搭建个人githubpage","slug":"_1-2-搭建个人githubpage","link":"#_1-2-搭建个人githubpage","children":[]}]},{"level":2,"title":"2、配合github的Action实现自动化部署","slug":"_2、配合github的action实现自动化部署","link":"#_2、配合github的action实现自动化部署","children":[{"level":3,"title":"2.1 自动部署脚本","slug":"_2-1-自动部署脚本","link":"#_2-1-自动部署脚本","children":[]}]}],"git":{"createdTime":1659362219000,"updatedTime":1659362219000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":2.08,"words":625},"filePathRelative":"other/essay/DeployGithubPage.md","localizedDate":"2022年3月15日","excerpt":"<h2>1、 GitHubPage介绍</h2>\\n<h3>1.1 ok</h3>\\n<h3>1.2 搭建个人githubpage</h3>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>个人page和项目page的区别就是个人page只有一个，所谓的个人Page说白了也是一个特殊的项目Page,无非就是它的仓库名字比较特殊，必须为&lt;username&gt;.github.io，比如java框架`spring-cloud.github.io`、`facebook.github.io`，注意个人page的仓库名一定要加上 `.github.io`才算个人Page，不加的话就是一个普通项目了。\\n个人page有啥特殊之处呢？\\n在访问页面时可以直接使用https://&lt;username&gt;.github.io,不用加仓库名，普通的项目page,访问时需要加仓库名，比如https://&lt;username&gt;.github.io/&lt;reponame&gt;\\n\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
