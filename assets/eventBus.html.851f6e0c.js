import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e as i}from"./app.17db3226.js";const t={},a=i(`<p><strong>1,\u5B89\u88C5mitt\u5E93</strong></p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>npm install mitt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2,\u5728main.ts\u4E2D\u5F15\u5165mitt\u5E93</strong></p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>import mitt from &#39;mitt&#39;
app.config.globalProperties.mittBus = mitt()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3\uFF0C\u89E6\u53D1\u4E8B\u4EF6</strong></p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code> const { proxy } = <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>any</span><span class="token punctuation">&gt;</span></span>getCurrentInstance();
     
 proxy.mittBus.emit(&quot;event&quot;, {name: &quot;code&quot;, age: 18}); //\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u5411\u5916\u4F20\u9012\u53C2\u6570
     
 proxy.mittBus.emit(&quot;Add&quot;, callbackFun(res));  //\u89E6\u53D1add\u4E8B\u4EF6\uFF0C\u5E76\u5411\u5916\u4F20\u9012\u4E86\u4E00\u4E2A\u51FD\u6570\u5F62\u5F0F\u7684\u53C2\u6570
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4\uFF0C\u76D1\u542C\u4E8B\u4EF6</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  
  proxy.mittBus.on(&quot;event&quot;, (info) =&gt; { //\u63A5\u53D7\u53C2\u6570
        console.log(&quot;event:&quot;, info);
      });
 
 proxy.mittBus.on(&quot;Add&quot;, (callback: Function) =&gt; {  //\u76D1\u542C\u4E8B\u4EF6\u5E76\u63A5\u53D7\u51FD\u6570\u5F62\u5F0F\u7684\u53C2\u6570
            handleNewSubmit(callback); 
        });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),l=[a];function d(u,o){return n(),s("div",null,l)}var v=e(t,[["render",d],["__file","eventBus.html.vue"]]);export{v as default};
