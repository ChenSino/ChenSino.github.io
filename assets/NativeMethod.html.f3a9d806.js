import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";import{o as l,c,b as a,a as d,e as s,d as n,r as t}from"./app.d0f4ebc6.js";const o={},r=s(`<p>\u4F7F\u7528c++\u5B9E\u73B0\u4E00\u4E2Anative\u65B9\u6CD5\u4F9Bjava\u8C03\u7528</p><div class="custom-container note"><p class="custom-container-title">\u73AF\u5883</p><pre><code>\u5B9E\u9A8C\u73AF\u5883linux\u3001jdk11\u3001gcc
</code></pre></div><h2 id="_1\u3001native\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1\u3001native\u65B9\u6CD5" aria-hidden="true">#</a> 1\u3001native\u65B9\u6CD5</h2><h2 id="_2\u3001\u81EA\u5B9A\u4E49\u5B9E\u73B0native\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u81EA\u5B9A\u4E49\u5B9E\u73B0native\u65B9\u6CD5" aria-hidden="true">#</a> 2\u3001\u81EA\u5B9A\u4E49\u5B9E\u73B0native\u65B9\u6CD5</h2><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>\u7528c++\u5B9E\u73B0\u4E00\u4E2A\u52A8\u6001\u94FE\u63A5\u5E93\uFF0C\u4F7F\u7528java\u8C03\u7528\u94FE\u63A5\u5E93\u4E2D\u7684\u65B9\u6CD5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-1-\u5B9A\u4E49java\u6E90\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5B9A\u4E49java\u6E90\u6587\u4EF6" aria-hidden="true">#</a> 2.1 \u5B9A\u4E49java\u6E90\u6587\u4EF6</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestMain</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//\u52A0\u8F7D\u6307\u5B9A\u7684\u94FE\u63A5\u5E93</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&quot;/home/chenkun/FleetProjects/Hello.so&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//\u7533\u660Enative\u65B9\u6CD5</span>
    <span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-\u4F7F\u7528jdk\u81EA\u5E26\u5DE5\u5177\u751F\u6210c-\u5934\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-2-\u4F7F\u7528jdk\u81EA\u5E26\u5DE5\u5177\u751F\u6210c-\u5934\u6587\u4EF6" aria-hidden="true">#</a> 2.2 \u4F7F\u7528jdk\u81EA\u5E26\u5DE5\u5177\u751F\u6210c++\u5934\u6587\u4EF6</h3><ol><li>\u7F16\u8BD1\u6E90\u6587\u4EF6\uFF0C<code>javac Testmain.java</code>\u5F97\u5230TestMain.class\u6587\u4EF6</li><li>\u4F7F\u7528<code>javac -h . TestMain.java</code>\u751F\u6210\u5934\u6587\u4EF6</li></ol><p>\u5728java8\u53CA\u4E4B\u524D\uFF0Cjdk\u4E2D\u81EA\u5E26\u7684javah\u53EF\u4EE5\u7528\u6765\u751F\u6210\u5934\u6587\u4EF6\uFF0C\u4F46\u662F\u5728java9\u4E4B\u540E\uFF0C\u6B64\u547D\u4EE4\u88AB\u53BB\u6389\u4E86\uFF0C\u53D6\u800C\u4EE3\u4E4B\u7684\u662F<code>javac -h</code>\uFF0C\u5176\u4E2D-h\u540E\u9762\u8981\u8DDF\u4E00\u4E2A\u76EE\u5F55\uFF0C\u4EE3\u8868\u751F\u6210\u7684\u5934\u6587\u4EF6\u5B58\u653E\u7684\u4F4D\u7F6E\u3002</p><h3 id="_2-3-\u6DFB\u52A0cpp\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-3-\u6DFB\u52A0cpp\u6587\u4EF6" aria-hidden="true">#</a> 2.3 \u6DFB\u52A0cpp\u6587\u4EF6</h3><p>\u5728\u4E0A\u4E00\u6B65\u751F\u6210\u7684\u5934\u6587\u4EF6\u6709\u70B9\u7C7B\u4F3Cjava\u4E2D\u7684\u63A5\u53E3\u5B9A\u4E49\uFF0C\u6211\u4EEC\u8FD8\u9700\u8981\u63D0\u4F9B\u5B9E\u73B0\u7C7B</p><div class="language-c++ ext-c++ line-numbers-mode"><pre class="language-c++"><code>#include &lt;iostream&gt;
#include &quot;TestMain.h&quot;
 
using namespace std;
 
JNIEXPORT void JNICALL Java_TestMain_Hello
  (JNIEnv *, jclass)
{
    cout &lt;&lt; &quot;Hello,wolrd!&quot; &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-\u7F16\u8BD1c-\u6E90\u7801\u4E3A\u52A8\u6001\u5E93" tabindex="-1"><a class="header-anchor" href="#_2-4-\u7F16\u8BD1c-\u6E90\u7801\u4E3A\u52A8\u6001\u5E93" aria-hidden="true">#</a> 2.4 \u7F16\u8BD1C++\u6E90\u7801\u4E3A\u52A8\u6001\u5E93</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>g++ Hello.cpp -fpic -shared -o Hello.so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u4E00\u6B65\u7F16\u8BD1\uFF0C\u62A5\u9519\u5982\u4E0B\uFF0C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ g++ Hello.cpp -fpic -shared -o Hello.so
In <span class="token function">file</span> included from Hello.cpp:2:
TestMain.h:2:10: \u81F4\u547D\u9519\u8BEF\uFF1Ajni.h\uFF1A\u6CA1\u6709\u90A3\u4E2A\u6587\u4EF6\u6216\u76EE\u5F55
    <span class="token number">2</span> <span class="token operator">|</span> <span class="token comment">#include &lt;jni.h&gt;</span>
      <span class="token operator">|</span>          ^~~~~~~
\u7F16\u8BD1\u4E2D\u65AD\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u62A5\u9519\u539F\u56E0\u662Fjni.h\u548CTestMain.h\u4E0D\u518D\u4E00\u4E2A\u8DEF\u5F84\uFF0C\u6B64\u5904\u9700\u8981\u6539\u6210\u6B63\u786E\u7684\u8DEF\u5F84\uFF0C \u4FEE\u6539TestMain.h\u5934\u6587\u4EF6\u8DEF\u5F84\u3002\u5C06 #include &lt;jin.h&gt; \u4FEE\u6539\u4E3A #include &quot;/usr/lib/jvm/java-11-openjdk/include/jni.h&quot;\uFF0C\u5230\u4F60\u7684jdk\u5B89\u88C5\u76EE\u5F55\u53BB\u627E\u5BF9\u5E94\u7684\u6587\u4EF6</p><p>\u4FEE\u6539\u540E\u91CD\u65B0\u6267\u884C\u7F16\u8BD1<code>g++ Hello.cpp -fpic -shared -o Hello.so</code>\uFF0C\u4F9D\u7136\u62A5\u9519\uFF0C\u8FD9\u6B21\u62A5\u9519\u662Fjni_md.h\u627E\u4E0D\u5230\uFF0C\u8FD9\u91CC\u4E0D\u7528\u60F3\u80AF\u5B9A\u662Fjni.h\u4E2D\u5F15\u7528\u4E86jni_md.h,\u7136\u540E\u5728jni.h\u4E2D\u8DEF\u5F84\u4E0D\u5BF9\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\u3002 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230111165112.png" alt="20230111165112" loading="lazy"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>In <span class="token function">file</span> included from TestMain.h:2,
                 from Hello.cpp:2:
/usr/lib/jvm/java-11-openjdk/include/jni.h:45:10: \u81F4\u547D\u9519\u8BEF\uFF1Ajni_md.h\uFF1A\u6CA1\u6709\u90A3\u4E2A\u6587\u4EF6\u6216\u76EE\u5F55
   <span class="token number">45</span> <span class="token operator">|</span> <span class="token comment">#include &quot;jni_md.h&quot;</span>
      <span class="token operator">|</span>          ^~~~~~~~~~
\u7F16\u8BD1\u4E2D\u65AD\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),p=n('\u5176\u5B9Ejni_md.h,\u8FD9\u4E2A\u6587\u4EF6\u4F4D\u4E8E\u548Cjni.h\u540C\u7EA7\u76EE\u5F55\u7684linux\u76EE\u5F55\u4E0B\uFF0C\u5728jni.h\u4E2D\u76F4\u63A5\u4F7F\u7528#include "jni_md.h"\u80AF\u5B9A\u4E0D\u884C\uFF0C\u8FD9\u91CC\u6211\u5C1D\u8BD5\u4E86\u5728\u540C\u7EA7\u76EE\u5F55\u5EFA\u7ACB\u8F6F\u8FDE\u63A5\uFF0C\u4F46\u662F\u83AB\u540D\u5176\u5999\u7684\u62A5\u9519\uFF0C\u6240\u4EE5\u6211\u7D22\u6027\u76F4\u63A5\u5427linux\u8DEF\u5F84\u4E0B\u7684\u4E24\u4E2A\u6587\u4EF6\u5168\u90E8\u62F7\u8D1D\u5230\u548Cjni.h\u540C\u7EA7\u76EE\u5F55\uFF0C\u6267\u884C\u7F16\u8BD1\u5C31ok\u4E86\uFF0C'),u={href:"http://xn--Hello-fg1hyjjza36gc8y6nf64ly9hz0kusm9a655iuj5grthuu8bsszd.so",target:"_blank",rel:"noopener noreferrer"},v=n("\u7F16\u8BD1\u597D\u4E86\u4EE5\u540E\u5728\u5F53\u524D\u76EE\u5F55\u5C31\u751F\u6210\u4E86\u4E00\u4E2AHello.so"),h=n("\uFF0C\u8FD9\u5C31\u662F\u6211\u4EEC\u9700\u8981\u7684\u52A8\u6001\u94FE\u63A5\u5E93\u3002"),m=s(`<h3 id="_2-5-\u6267\u884Cjava\u7A0B\u5E8F\u9A8C\u8BC1" tabindex="-1"><a class="header-anchor" href="#_2-5-\u6267\u884Cjava\u7A0B\u5E8F\u9A8C\u8BC1" aria-hidden="true">#</a> 2.5 \u6267\u884Cjava\u7A0B\u5E8F\u9A8C\u8BC1</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ java TestMain           
Hello,wolrd<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3\u3001\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u603B\u7ED3" aria-hidden="true">#</a> 3\u3001\u603B\u7ED3</h2><p>\u6709\u4E9B\u65B9\u6CD5\u5BF9\u6027\u80FD\u8981\u6C42\u5F88\u9AD8\uFF0C\u6216\u8005\u9700\u8981\u76F4\u63A5\u8C03\u7528\u7CFB\u7EDF\u5185\u6838\u7B49\uFF0C\u53EF\u4EE5\u4F7F\u7528native\u65B9\u6CD5\uFF0C\u8C03\u7528c++\u7684\u5E93\u6765\u5B9E\u73B0\u3002 \u5B9E\u73B0\u65B9\u6CD5\uFF1A</p><ol><li>\u7F16\u5199java\u6E90\u6587\u4EF6\u5E76\u7F16\u8BD1</li><li>\u4F7F\u7528jdk\u81EA\u5E26\u5DE5\u5177\u751F\u6210\u5934\u6587\u4EF6</li><li>\u7F16\u5199c++\u7684\u5177\u4F53\u5B9E\u73B0</li><li>\u4FEE\u6539\u5934\u6587\u4EF6\u4E2D\u8DEF\u5F84\u95EE\u9898</li><li>\u7F16\u8BD1\u52A8\u6001\u94FE\u63A5\u5E93</li><li>\u6267\u884Cjava\u4EE3\u7801</li></ol>`,5);function b(k,j){const e=t("ExternalLinkIcon");return l(),c("div",null,[r,a("p",null,[p,a("a",u,[v,d(e)]),h]),m])}var f=i(o,[["render",b],["__file","NativeMethod.html.vue"]]);export{f as default};