import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.6007ccf0.js";const t={},i=e(`<h2 id="_1\u3001-githubpage\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_1\u3001-githubpage\u4ECB\u7ECD" aria-hidden="true">#</a> 1\u3001 GitHubPage\u4ECB\u7ECD</h2><h3 id="_1-1-ok" tabindex="-1"><a class="header-anchor" href="#_1-1-ok" aria-hidden="true">#</a> 1.1 ok</h3><h3 id="_1-2-\u642D\u5EFA\u4E2A\u4EBAgithubpage" tabindex="-1"><a class="header-anchor" href="#_1-2-\u642D\u5EFA\u4E2A\u4EBAgithubpage" aria-hidden="true">#</a> 1.2 \u642D\u5EFA\u4E2A\u4EBAgithubpage</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u4E2A\u4EBApage\u548C\u9879\u76EEpage\u7684\u533A\u522B\u5C31\u662F\u4E2A\u4EBApage\u53EA\u6709\u4E00\u4E2A\uFF0C\u6240\u8C13\u7684\u4E2A\u4EBAPage\u8BF4\u767D\u4E86\u4E5F\u662F\u4E00\u4E2A\u7279\u6B8A\u7684\u9879\u76EEPage,\u65E0\u975E\u5C31\u662F\u5B83\u7684\u4ED3\u5E93\u540D\u5B57\u6BD4\u8F83\u7279\u6B8A\uFF0C\u5FC5\u987B\u4E3A&lt;username&gt;.github.io\uFF0C\u6BD4\u5982java\u6846\u67B6\`spring-cloud.github.io\`\u3001\`facebook.github.io\`\uFF0C\u6CE8\u610F\u4E2A\u4EBApage\u7684\u4ED3\u5E93\u540D\u4E00\u5B9A\u8981\u52A0\u4E0A \`.github.io\`\u624D\u7B97\u4E2A\u4EBAPage\uFF0C\u4E0D\u52A0\u7684\u8BDD\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u9879\u76EE\u4E86\u3002
\u4E2A\u4EBApage\u6709\u5565\u7279\u6B8A\u4E4B\u5904\u5462\uFF1F
\u5728\u8BBF\u95EE\u9875\u9762\u65F6\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528https://&lt;username&gt;.github.io,\u4E0D\u7528\u52A0\u4ED3\u5E93\u540D\uFF0C\u666E\u901A\u7684\u9879\u76EEpage,\u8BBF\u95EE\u65F6\u9700\u8981\u52A0\u4ED3\u5E93\u540D\uFF0C\u6BD4\u5982https://&lt;username&gt;.github.io/&lt;reponame&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2\u3001\u914D\u5408github\u7684action\u5B9E\u73B0\u81EA\u52A8\u5316\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u914D\u5408github\u7684action\u5B9E\u73B0\u81EA\u52A8\u5316\u90E8\u7F72" aria-hidden="true">#</a> 2\u3001\u914D\u5408github\u7684Action\u5B9E\u73B0\u81EA\u52A8\u5316\u90E8\u7F72</h2><h3 id="_2-1-\u81EA\u52A8\u90E8\u7F72\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#_2-1-\u81EA\u52A8\u90E8\u7F72\u811A\u672C" aria-hidden="true">#</a> 2.1 \u81EA\u52A8\u90E8\u7F72\u811A\u672C</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># \u6BCF\u5F53 push \u5230 main \u5206\u652F\u65F6\u89E6\u53D1\u90E8\u7F72</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># \u624B\u52A8\u89E6\u53D1\u90E8\u7F72</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest <span class="token comment">#\u5728github\u670D\u52A1\u5668\u4F7F\u7528ubuntu\u73AF\u5883</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u201C\u6700\u8FD1\u66F4\u65B0\u65F6\u95F4\u201D \u7B49 git \u65E5\u5FD7\u76F8\u5173\u4FE1\u606F\uFF0C\u9700\u8981\u62C9\u53D6\u5168\u90E8\u63D0\u4EA4\u8BB0\u5F55</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u9009\u62E9\u8981\u4F7F\u7528\u7684 node \u7248\u672C</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&quot;14&quot;</span>

      <span class="token comment"># \u7F13\u5B58 node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> npm<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>npm<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/package-lock.json&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            \${{ runner.os }}-npm-</span>

      <span class="token comment"># \u5982\u679C\u7F13\u5B58\u6CA1\u6709\u547D\u4E2D\uFF0C\u5B89\u88C5\u4F9D\u8D56</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.npm<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install

      <span class="token comment"># \u8FD0\u884C\u6784\u5EFA\u811A\u672C</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run build  <span class="token comment">#\u547D\u4EE4\u548Cpackage.json\u4FDD\u6301\u4E00\u76F4\uFF0C\u672C\u5730\u6253\u5305\u7528\u4EC0\u4E48\uFF0C\u8FD9\u91CC\u5199\u4EC0\u4E48</span>

      <span class="token comment"># \u67E5\u770B workflow \u7684\u6587\u6863\u6765\u83B7\u53D6\u66F4\u591A\u4FE1\u606F</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@3.7.1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>secrets.xxx<span class="token punctuation">}</span> <span class="token comment">#\u5728github\u8BBE\u7F6E\uFF0C\u8FD9\u91CC\u540D\u5B57\u8981\u548C\u4F60\u8BBE\u7F6E\u7684\u4FDD\u6301\u4E00\u81F4,\u6CE8\u610F\u8FD9\u91CC\u4E0D\u662F\u8981\u4F60\u76F4\u63A5\u5199token,\u662F\u628Axxx\u6539\u6210\u4F60\u8BBE\u7F6E\u7684\u90A3\u4E2A\u540D\u5B57\u5C31ok\u4E86</span>
          <span class="token comment"># \u90E8\u7F72\u5230 gh-pages \u5206\u652F</span>
          <span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># \u90E8\u7F72\u76EE\u5F55\u4E3A VuePress \u7684\u9ED8\u8BA4\u8F93\u51FA\u76EE\u5F55</span>
          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> public

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>\u6CE8\u610F</strong></em></p><ol><li>\u5728\u9879\u76EE\u6839\u8DEF\u5F84\u65B0\u5EFA\u4E00\u4E2A.github/workflows/main.yml\uFF0Cyml\u4E2D\u653E\u4EE5\u4E0A\u5185\u5BB9</li><li>\u73B0\u5728github\u4E3B\u5206\u652F\u6539\u6210\u4E86main,\u6240\u4EE5\u9700\u8981\u5728\u672C\u5730\u628A\u5206\u652F\u4FEE\u6539\u4E00\u4E0B<code>git branch -M main</code></li><li>\u6E90\u7801\u548C\u6253\u5305\u540E\u7684public(\u4E00\u822C\u662Fdist)\u6587\u4EF6\u5939\u5206\u522B\u653E\u5728\u4E24\u4E2A\u5206\u652F\uFF0C\u6211\u8FD9\u91CC\u6E90\u7801\u5728main\u5206\u652F\uFF0C\u90E8\u7F72\u662F\u5728gh-pages\u5206\u652F\uFF0C\u90E8\u7F72\u811A\u672C\u4F1A\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2Agh-pages\u5206\u652F\u3002</li><li>ACCESS_TOKEN\u8FD9\u91CC\u4E0D\u8981\u76F4\u63A5\u653E\u5BC6\u94A5\uFF0C\u800C\u662F\u653E\u4F60\u751F\u6210\u7684\u5BC6\u94A5\u5BF9\u5E94\u7684\u540D\u5B57\uFF08github\u8BBE\u7F6E\u4E2D\u90A3\u4E2Anote\u5B57\u6BB5\uFF09</li></ol>`,9),p=[i];function l(c,u){return s(),a("div",null,p)}var r=n(t,[["render",l],["__file","DeployGithubPage.html.vue"]]);export{r as default};
