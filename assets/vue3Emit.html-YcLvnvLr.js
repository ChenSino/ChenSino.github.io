import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-eaM1OiHO.js";const e={},p=t(`<h2 id="vue3-使用组合式api时如何进行父子组件通信" tabindex="-1"><a class="header-anchor" href="#vue3-使用组合式api时如何进行父子组件通信"><span>vue3 使用组合式api时如何进行父子组件通信</span></a></h2><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 1.在vue组件中定义事件</span>
<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;update:hospitalDept&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">//2. 调用userXXXControl时，把emit当做参数传递进去，useCreateHospitalDeptControl(emit)实际也就类似一个函数</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
  deptForm<span class="token punctuation">,</span>
  formRules<span class="token punctuation">,</span>
  validDeptRef<span class="token punctuation">,</span>
  status<span class="token punctuation">,</span>
  deptCategoryList<span class="token punctuation">,</span>
  initColumn<span class="token punctuation">,</span>
  initData<span class="token punctuation">,</span>
  createHospitalDeptSubmit<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCreateHospitalDeptControl</span><span class="token punctuation">(</span>emit<span class="token punctuation">)</span>

<span class="token comment">//3. 在useXXXContrl.tx文件中让函数接收一个参数</span>
<span class="token keyword">const</span> <span class="token function-variable function">useCreateHospitalDeptControl</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">emit</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    
    <span class="token comment">//这里可以使用vue组件传递过来的emit参数了.....</span>
   	<span class="token keyword">const</span> <span class="token function-variable function">testEmit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
         <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;update:hospitalDept&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        testEmit<span class="token punctuation">,</span>
        <span class="token operator">...</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//4. 父组件xx.vue中就可以使用@update:hospital-depth</span>
   <span class="token operator">&lt;</span>CreateHospitalDept
      ref<span class="token operator">=</span><span class="token string">&quot;createHospitalDeptRef&quot;</span>
      @update<span class="token operator">:</span>hospital<span class="token operator">-</span>dept<span class="token operator">=</span><span class="token string">&quot;updateHospitalDeptList&quot;</span>
    <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function i(c,l){return s(),a("div",null,o)}const k=n(e,[["render",i],["__file","vue3Emit.html.vue"]]),d=JSON.parse(`{"path":"/frontweb/vue/vue3Emit.html","title":"vue3使用emit进行父子组件传值","lang":"zh-CN","frontmatter":{"title":"vue3使用emit进行父子组件传值","date":"2023-04-12T00:00:00.000Z","isOriginal":true,"tag":["ts","vue3"],"description":"vue3 使用组合式api时如何进行父子组件通信","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/frontweb/vue/vue3Emit.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"vue3使用emit进行父子组件传值"}],["meta",{"property":"og:description","content":"vue3 使用组合式api时如何进行父子组件通信"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:tag","content":"ts"}],["meta",{"property":"article:tag","content":"vue3"}],["meta",{"property":"article:published_time","content":"2023-04-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue3使用emit进行父子组件传值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"vue3 使用组合式api时如何进行父子组件通信","slug":"vue3-使用组合式api时如何进行父子组件通信","link":"#vue3-使用组合式api时如何进行父子组件通信","children":[]}],"git":{"createdTime":1681462754000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1},{"name":"chenxk","email":"chenxk@sonoscape.net","commits":1}]},"readingTime":{"minutes":0.55,"words":164},"filePathRelative":"frontweb/vue/vue3Emit.md","localizedDate":"2023年4月12日","excerpt":"<h2>vue3 使用组合式api时如何进行父子组件通信</h2>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token comment\\">// 1.在vue组件中定义事件</span>\\n<span class=\\"token keyword\\">const</span> emit <span class=\\"token operator\\">=</span> <span class=\\"token function\\">defineEmits</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token string\\">'update:hospitalDept'</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token comment\\">//2. 调用userXXXControl时，把emit当做参数传递进去，useCreateHospitalDeptControl(emit)实际也就类似一个函数</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span>\\n  deptForm<span class=\\"token punctuation\\">,</span>\\n  formRules<span class=\\"token punctuation\\">,</span>\\n  validDeptRef<span class=\\"token punctuation\\">,</span>\\n  status<span class=\\"token punctuation\\">,</span>\\n  deptCategoryList<span class=\\"token punctuation\\">,</span>\\n  initColumn<span class=\\"token punctuation\\">,</span>\\n  initData<span class=\\"token punctuation\\">,</span>\\n  createHospitalDeptSubmit<span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> <span class=\\"token function\\">useCreateHospitalDeptControl</span><span class=\\"token punctuation\\">(</span>emit<span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token comment\\">//3. 在useXXXContrl.tx文件中让函数接收一个参数</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">useCreateHospitalDeptControl</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><span class=\\"token literal-property property\\">emit</span><span class=\\"token operator\\">:</span> any</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">=&gt;</span><span class=\\"token punctuation\\">{</span>\\n    \\n    <span class=\\"token comment\\">//这里可以使用vue组件传递过来的emit参数了.....</span>\\n   \\t<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">testEmit</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">=&gt;</span><span class=\\"token punctuation\\">{</span>\\n         <span class=\\"token function\\">emit</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'update:hospitalDept'</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">{</span>\\n        testEmit<span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token operator\\">...</span><span class=\\"token punctuation\\">.</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token comment\\">//4. 父组件xx.vue中就可以使用@update:hospital-depth</span>\\n   <span class=\\"token operator\\">&lt;</span>CreateHospitalDept\\n      ref<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"createHospitalDeptRef\\"</span>\\n      @update<span class=\\"token operator\\">:</span>hospital<span class=\\"token operator\\">-</span>dept<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"updateHospitalDeptList\\"</span>\\n    <span class=\\"token operator\\">/</span><span class=\\"token operator\\">&gt;</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,d as data};