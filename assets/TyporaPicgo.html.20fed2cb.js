import{_ as o}from"./plugin-vue_export-helper.21dcd24c.js";import{o as t,c as p,b as n,a as e,d as s,e as i,r as c}from"./app.bf18804d.js";const r={},l=n("h3",{id:"\u524D\u8A00",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u524D\u8A00","aria-hidden":"true"},"#"),s(" \u524D\u8A00")],-1),u=n("p",null,"\u5E73\u65F6\u7528MarkDown\u5199\u535A\u5BA2\u5C11\u4E0D\u4E86\u9700\u8981\u622A\u56FE\uFF0C\u6211\u7528\u7684\u662FTypora,\u521A\u5F00\u59CB\u622A\u56FE\u662F\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u6709\u65F6\u60F3\u628A\u535A\u5BA2\u5206\u4EAB\u5230\u7F51\u4E0A\uFF0C\u5C31\u53D1\u73B0\u5404\u79CD\u56FE\u5168\u6302\u4E86\uFF0C\u9700\u8981\u624B\u52A8\u4E00\u4E2A\u4E00\u4E2A\u518D\u590D\u5236\u4E00\u4E0B\uFF0C\u7740\u5B9E\u9EBB\u70E6\uFF0C\u4ECA\u5929\u65E0\u610F\u95F4\u53D1\u73B0\u6709\u4E2A\u53EBPicGo\u7684\u5DE5\u5177\uFF0C\u6B64\u5DE5\u5177\u4E13\u95E8\u4E0A\u4F20\u56FE\u5230\u5404\u5927\u56FE\u5E8A\uFF0C\u7740\u5B9E\u65B9\u4FBF\u3002",-1),d={href:"https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html#picbed-github",target:"_blank",rel:"noopener noreferrer"},m=s("picgo\u914D\u7F6E"),g={href:"https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html#picbed-tcyun",target:"_blank",rel:"noopener noreferrer"},h=s("picgo-core"),v=i(`<p><mark>picgo\u7684ui\u526A\u8D34\u677F\u4E0A\u4F20\u529F\u80FD\uFF0C\u9700\u8981win10+</mark></p><h3 id="_1\u3001\u642D\u5EFAtypora-picgo-gitee" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u642D\u5EFAtypora-picgo-gitee" aria-hidden="true">#</a> 1\u3001\u642D\u5EFATypora + PicGo + gitee</h3><p>\u6211\u7684\u7535\u8111\u73AF\u5883\u5982\u4E0B\uFF0C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>								  OS: Manjaro <span class="token number">21.2</span>.4 Qonos
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Kernel: x86_64 Linux <span class="token number">5.15</span>.25-1-MANJARO
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Uptime: 5h 26m
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588            \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Packages: <span class="token number">1556</span>
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Shell: <span class="token function">zsh</span> <span class="token number">5.8</span>.1
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Resolution: 1920x1080
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     DE: KDE <span class="token number">5.91</span>.0 / Plasma <span class="token number">5.24</span>.2
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     WM: KWin
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     GTK Theme: Breath <span class="token punctuation">[</span>GTK2/3<span class="token punctuation">]</span>
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Icon Theme: WhiteSur
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     Disk: 112G / 245G <span class="token punctuation">(</span><span class="token number">49</span>%<span class="token punctuation">)</span>
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     CPU: Intel Core i7-6700HQ @ 8x <span class="token number">3</span>.5GHz <span class="token punctuation">[</span><span class="token number">61.0</span>\xB0C<span class="token punctuation">]</span>
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588     GPU: NVIDIA GeForce GTX 960M
                                  RAM: 8315MiB / 15428MiB

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-\u3001\u7B2C\u4E00\u6B65" tabindex="-1"><a class="header-anchor" href="#_1-1-\u3001\u7B2C\u4E00\u6B65" aria-hidden="true">#</a> 1.1 \u3001\u7B2C\u4E00\u6B65</h4><p>\u6253\u5F00typora\u7684\u914D\u7F6E\uFF0C\u6309\u7167\u5982\u4E0B\u56FE\u914D\u7F6E\uFF0C\u9009\u62E9PicGo-Core,\u70B9\u51FB\u4E0B\u8F7D\uFF0C\u6B64\u65F6\u4F1A\u81EA\u52A8\u4E0B\u8F7DPicGo-Core\uFF0C</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220309141611583.png" alt="image-20220309141611583" loading="lazy"></p><h4 id="_1-2-\u3001\u7B2C\u4E8C\u6B65" tabindex="-1"><a class="header-anchor" href="#_1-2-\u3001\u7B2C\u4E8C\u6B65" aria-hidden="true">#</a> 1.2 \u3001\u7B2C\u4E8C\u6B65</h4><p>\u5B89\u88C5picgo \u4E3B\u7A0B\u5E8F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> picgo -g <span class="token comment"># yarn global add picgo </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-3-\u3001\u7B2C\u4E09\u6B65" tabindex="-1"><a class="header-anchor" href="#_1-3-\u3001\u7B2C\u4E09\u6B65" aria-hidden="true">#</a> 1.3 \u3001\u7B2C\u4E09\u6B65</h4><p>\u5B89\u88C5gitee\u63D2\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>picgo <span class="token function">install</span> gitee-uploader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-4\u3001-\u7B2C\u56DB\u6B65" tabindex="-1"><a class="header-anchor" href="#_1-4\u3001-\u7B2C\u56DB\u6B65" aria-hidden="true">#</a> 1.4\u3001 \u7B2C\u56DB\u6B65</h4><p>\u4ECEtypora\u6253\u5F00\u914D\u7F6E\uFF0C\u4FEE\u6539\u914D\u7F6E</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220309145003089.png" alt="image-20220309145003089" loading="lazy"></p><p>\u7528\u5982\u4E0B\u914D\u7F6E\u8986\u76D6\u539F\u6765\u7684\uFF0C\u540C\u65F6\u8BB0\u5F97\u628A\u5E26\u6709\u6CE8\u91CA\u4FE1\u606F\u7684\u90E8\u5206\u4FEE\u6539\u6210\u81EA\u5DF1\u7684</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;picBed&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;uploader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gitee&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;gitee&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;branch&quot;</span><span class="token operator">:</span> <span class="token string">&quot;master&quot;</span><span class="token punctuation">,</span> <span class="token comment">//\u5206\u652F\u540D</span>
      <span class="token property">&quot;customPath&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> 
      <span class="token property">&quot;customUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;img&quot;</span><span class="token punctuation">,</span>;<span class="token comment">//\u4E0A\u4F20\u7684\u65F6\u5019\u521B\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939\u7528\u6765\u653E\u56FE\u7247</span>
      <span class="token property">&quot;repo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ChenSino/blogimages&quot;</span><span class="token punctuation">,</span><span class="token comment">//\u4F60\u7684gitee\u7528\u6237\u540D/\u4ED3\u5E93\u540D</span>
      <span class="token property">&quot;token&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token comment">//gitee\u7684token</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;picgoPlugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;picgo-plugin-gitee-uploader&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;picgo-plugin-gitee-uploader&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;lastSync&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022-03-09 02:50:05&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-5-\u3001-\u7B2C\u4E94\u6B65" tabindex="-1"><a class="header-anchor" href="#_1-5-\u3001-\u7B2C\u4E94\u6B65" aria-hidden="true">#</a> 1.5 \u3001 \u7B2C\u4E94\u6B65</h4><p>\u6D4B\u8BD5\u4E0A\u4F20\u56FE\u7247</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220309145521751.png" alt="image-20220309145521751" loading="lazy"></p><h3 id="_2\u3001\u7ED9typora\u4E2Dpicgo\u8BBE\u7F6E\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u7ED9typora\u4E2Dpicgo\u8BBE\u7F6E\u4EE3\u7406" aria-hidden="true">#</a> 2\u3001\u7ED9typora\u4E2Dpicgo\u8BBE\u7F6E\u4EE3\u7406</h3><p>\u6700\u7B80\u5355\u7684\u65B9\u6CD5\u662F\u7528gui\u5148\u8BBE\u7F6E\u597D\u4EE3\u7406\uFF0C\u7136\u540E\u901A\u8FC7ui\u6253\u5F00\u914D\u7F6E\uFF0C\u518D\u590D\u5236\u5230typora\u4E2Dpicgo\u914D\u7F6E\u6587\u4EF6\u4E0B</p><p>PicGo\u7684\u914D\u7F6E\u6587\u4EF6\u5728\u4E0D\u540C\u7CFB\u7EDF\u91CC\u662F\u4E0D\u4E00\u6837\u7684\u3002</p><p>Windows: %APPDATA%\\picgo\\data.json Linux: $XDG_CONFIG_HOME/picgo/data.json or ~/.config/picgo/data.json macOS: ~/Library/Application\\ Support/picgo/data.json</p>`,25);function k(b,_){const a=c("ExternalLinkIcon");return t(),p("div",null,[l,u,n("p",null,[n("a",d,[m,e(a)])]),n("p",null,[n("a",g,[h,e(a)])]),v])}var f=o(r,[["render",k],["__file","TyporaPicgo.html.vue"]]);export{f as default};