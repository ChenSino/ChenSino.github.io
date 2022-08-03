import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{o as e,c as n,e as a}from"./app.39509b3c.js";const i={},d=a(`<h3 id="\u4E00-\u63A8\u9001\u672C\u5730\u5206\u652F\u5230\u8FDC\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u4E00-\u63A8\u9001\u672C\u5730\u5206\u652F\u5230\u8FDC\u7A0B" aria-hidden="true">#</a> <strong>\u4E00\uFF0C\u63A8\u9001\u672C\u5730\u5206\u652F\u5230\u8FDC\u7A0B</strong></h3><p>\u6628\u5929\u6211\u5728\u81EA\u5BB6\u7535\u8111\u521B\u5EFA\u4E86\u4E00\u4E2A\u5206\u652Fsearch_dev.\u5199\u641C\u7D22\u529F\u80FD\u3002</p><p><strong>1\uFF0C\u5728\u672C\u5730\u521B\u5EFA\u5E76\u5207\u6362\u5230search_dev\u5206\u652F</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout -b search_dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2\uFF0C\u63A8\u9001\u672C\u5730search_dev\u5206\u652F\u5230\u8FDC\u7A0B</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> push origin search_dev<span class="token punctuation">(</span>\u672C\u5730<span class="token punctuation">)</span>:search_dev<span class="token punctuation">(</span>\u8FDC\u7A0B<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6216\u8005</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> push --set-upstream origin dev<span class="token punctuation">(</span>\u5206\u652F\u540D<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u4E8C-\u4ECE\u8FDC\u7A0B\u62C9\u53D6\u5206\u652F\u5230d\u672C\u5730" tabindex="-1"><a class="header-anchor" href="#\u4E8C-\u4ECE\u8FDC\u7A0B\u62C9\u53D6\u5206\u652F\u5230d\u672C\u5730" aria-hidden="true">#</a> <strong>\u4E8C\uFF0C\u4ECE\u8FDC\u7A0B\u62C9\u53D6\u5206\u652F\u5230d\u672C\u5730</strong></h3><p>\u7B2C\u4E8C\u5929\uFF0C\u6211\u5230\u516C\u53F8\u5199\u641C\u7D22\u529F\u80FD\uFF0C\u6211\u9700\u8981\u4ECE\u8FDC\u7A0B\u62C9\u53D6search_dev\u5230\u672C\u5730\u3002</p><p><strong>1,\u7B80\u5199\u547D\u4EE4</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout -b search_dev origin/search_dev //check\u51FA\u8FDC\u7A0Bdev\u5206\u652F\u5230\u672C\u5730
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2\uFF0C\u5206\u5199\u7684\u547D\u4EE4</strong></p><p>\u5728\u516C\u53F8\u7535\u8111\u672C\u5730\u5148\u521B\u5EFAsearch_dev\u5206\u652F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout -b search_dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u62C9\u53D6\u8FDC\u7A0Bsearch_dev\u5230\u672C\u5730\uFF08\u5B8C\u6210\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> pull origin search_dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u4E09-\u5220\u9664\u672C\u5730\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u4E09-\u5220\u9664\u672C\u5730\u5206\u652F" aria-hidden="true">#</a> <strong>\u4E09\uFF0C\u5220\u9664\u672C\u5730\u5206\u652F</strong></h3><p>\u5047\u8BBE\u8981\u5220\u9664<strong>search_dev</strong>\u8FDC\u7A0B\u5206\u652F\uFF0C\u6211\u4EEC\u9700\u8981\u5148\u628A\u5206\u652F\u5207\u6362\u5230master\uFF0C\u56E0\u4E3A\u4F60\u73B0\u5728\u6240\u5728\u7684\u5206\u652F\u5C31\u662F<strong>search_dev</strong>\uFF0C\u5728\u8FD9\u4E2A\u5206\u652F\u4E0B\uFF0C \u662F\u4E0D\u80FD\u5220\u9664\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> branch -d <span class="token punctuation">(</span>\u5206\u652F\u540D\u79F0<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u8FDC\u7A0B\u5206\u652F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> push origin -d \u5206\u652F\u540D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u56DB-\u5408\u5E76\u5206\u652F\u5230master\u4E0A" tabindex="-1"><a class="header-anchor" href="#\u56DB-\u5408\u5E76\u5206\u652F\u5230master\u4E0A" aria-hidden="true">#</a> <strong>\u56DB\uFF0C\u5408\u5E76\u5206\u652F\u5230master\u4E0A</strong></h3><p>\u5047\u5982\u6211\u4EEC\u73B0\u5728\u5728dev\u5206\u652F\u4E0A\uFF0C\u53EF\u4EE5\u7528\u4E0B\u9762\u547D\u4EE4\u67E5\u770B\u5F53\u524D\u5206\u652F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u521A\u5F00\u53D1\u5B8C\u9879\u76EE\uFF0C\u6267\u884C\u4E86\u4E0B\u5217\u547D\u4EE4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m \u2018dev\u2019
<span class="token function">git</span> push -u origin dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u6211\u4EEC\u8981\u628Adev\u5206\u652F\u7684\u4EE3\u7801\u5408\u5E76\u5230master\u5206\u652F\u4E0A \u8BE5\u5982\u4F55\uFF1F\u9996\u5148\u5207\u6362\u5230master\u5206\u652F\u4E0A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u662F\u591A\u4EBA\u5F00\u53D1\u7684\u8BDD \u9700\u8981\u628A\u8FDC\u7A0Bmaster\u4E0A\u7684\u4EE3\u7801pull\u4E0B\u6765</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> pull origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u662F\u81EA\u5DF1\u4E00\u4E2A\u5F00\u53D1\u5C31\u6CA1\u6709\u5FC5\u8981\u4E86\uFF0C\u4E3A\u4E86\u4FDD\u9669\u671F\u95F4\u8FD8\u662Fpull\u3002\u7136\u540E\u6211\u4EEC\u628Adev\u5206\u652F\u7684\u4EE3\u7801\u5408\u5E76\u5230master\u4E0A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> merge dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6B64\u65F6\u6216\u8BB8\u8DDF\u6211\u4E00\u6837\u4F1A\u9047\u5230\u51B2\u7A81\u3002\u5148\u770Bgit \u63D0\u793A\u51B2\u7A81\u6587\u4EF6\uFF0C\u7136\u540E\u624B\u52A8\u53BB\u89E3\u51B3\u51B2\u7A81\uFF0C\u7136\u540E\u63D0\u4EA4\uFF0C\u63A8\u9001\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> status
<span class="token function">git</span> commit -m <span class="token string">&quot;\u63D0\u4EA4&quot;</span>
<span class="token function">git</span> push origin master

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),c=[d];function r(l,t){return e(),n("div",null,c)}var p=s(i,[["render",r],["__file","branch02.html.vue"]]);export{p as default};
