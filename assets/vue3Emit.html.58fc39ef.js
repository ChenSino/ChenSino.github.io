import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e as t}from"./app.1d39af88.js";const e={},p=t(`<h2 id="vue3-\u4F7F\u7528\u7EC4\u5408\u5F0Fapi\u65F6\u5982\u4F55\u8FDB\u884C\u7236\u5B50\u7EC4\u4EF6\u901A\u4FE1" tabindex="-1"><a class="header-anchor" href="#vue3-\u4F7F\u7528\u7EC4\u5408\u5F0Fapi\u65F6\u5982\u4F55\u8FDB\u884C\u7236\u5B50\u7EC4\u4EF6\u901A\u4FE1" aria-hidden="true">#</a> vue3 \u4F7F\u7528\u7EC4\u5408\u5F0Fapi\u65F6\u5982\u4F55\u8FDB\u884C\u7236\u5B50\u7EC4\u4EF6\u901A\u4FE1</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 1.\u5728vue\u7EC4\u4EF6\u4E2D\u5B9A\u4E49\u4E8B\u4EF6</span>
<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;update:hospitalDept&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">//2. \u8C03\u7528userXXXControl\u65F6\uFF0C\u628Aemit\u5F53\u505A\u53C2\u6570\u4F20\u9012\u8FDB\u53BB\uFF0CuseCreateHospitalDeptControl(emit)\u5B9E\u9645\u4E5F\u5C31\u7C7B\u4F3C\u4E00\u4E2A\u51FD\u6570</span>
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

<span class="token comment">//3. \u5728useXXXContrl.tx\u6587\u4EF6\u4E2D\u8BA9\u51FD\u6570\u63A5\u6536\u4E00\u4E2A\u53C2\u6570</span>
<span class="token keyword">const</span> <span class="token function-variable function">useCreateHospitalDeptControl</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">emit</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    
    <span class="token comment">//\u8FD9\u91CC\u53EF\u4EE5\u4F7F\u7528vue\u7EC4\u4EF6\u4F20\u9012\u8FC7\u6765\u7684emit\u53C2\u6570\u4E86.....</span>
   	<span class="token keyword">const</span> <span class="token function-variable function">testEmit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
         <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;update:hospitalDept&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        testEmit<span class="token punctuation">,</span>
        <span class="token operator">...</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//4. \u7236\u7EC4\u4EF6xx.vue\u4E2D\u5C31\u53EF\u4EE5\u4F7F\u7528@update:hospital-depth</span>
   <span class="token operator">&lt;</span>CreateHospitalDept
      ref<span class="token operator">=</span><span class="token string">&quot;createHospitalDeptRef&quot;</span>
      @update<span class="token operator">:</span>hospital<span class="token operator">-</span>dept<span class="token operator">=</span><span class="token string">&quot;updateHospitalDeptList&quot;</span>
    <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function i(c,l){return s(),a("div",null,o)}var d=n(e,[["render",i],["__file","vue3Emit.html.vue"]]);export{d as default};
