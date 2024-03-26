import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as e,e as s}from"./app-eaM1OiHO.js";const i={},t=s(`<p>使用c++实现一个native方法供java调用</p><div class="hint-container note"><p class="hint-container-title">环境</p><pre><code>实验环境linux、jdk11、gcc
</code></pre></div><h2 id="_1、native方法" tabindex="-1"><a class="header-anchor" href="#_1、native方法"><span>1、native方法</span></a></h2><h2 id="_2、自定义实现native方法" tabindex="-1"><a class="header-anchor" href="#_2、自定义实现native方法"><span>2、自定义实现native方法</span></a></h2><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>用c++实现一个动态链接库，使用java调用链接库中的方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-1-定义java源文件" tabindex="-1"><a class="header-anchor" href="#_2-1-定义java源文件"><span>2.1 定义java源文件</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestMain</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//加载指定的链接库</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&quot;/home/chenkun/FleetProjects/Hello.so&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//申明native方法</span>
    <span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用jdk自带工具生成c-头文件" tabindex="-1"><a class="header-anchor" href="#_2-2-使用jdk自带工具生成c-头文件"><span>2.2 使用jdk自带工具生成c++头文件</span></a></h3><ol><li>编译源文件，<code>javac Testmain.java</code>得到TestMain.class文件</li><li>使用<code>javac -h . TestMain.java</code>生成头文件</li></ol><p>在java8及之前，jdk中自带的javah可以用来生成头文件，但是在java9之后，此命令被去掉了，取而代之的是<code>javac -h</code>，其中-h后面要跟一个目录，代表生成的头文件存放的位置。</p><h3 id="_2-3-添加cpp文件" tabindex="-1"><a class="header-anchor" href="#_2-3-添加cpp文件"><span>2.3 添加cpp文件</span></a></h3><p>在上一步生成的头文件有点类似java中的接口定义，我们还需要提供实现类</p><div class="language-c++ line-numbers-mode" data-ext="c++" data-title="c++"><pre class="language-c++"><code>#include &lt;iostream&gt;
#include &quot;TestMain.h&quot;
 
using namespace std;
 
JNIEXPORT void JNICALL Java_TestMain_Hello
  (JNIEnv *, jclass)
{
    cout &lt;&lt; &quot;Hello,wolrd!&quot; &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-编译c-源码为动态库" tabindex="-1"><a class="header-anchor" href="#_2-4-编译c-源码为动态库"><span>2.4 编译C++源码为动态库</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>g++ Hello.cpp <span class="token parameter variable">-fpic</span> <span class="token parameter variable">-shared</span> <span class="token parameter variable">-o</span> Hello.so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一步编译，报错如下，</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ g++ Hello.cpp <span class="token parameter variable">-fpic</span> <span class="token parameter variable">-shared</span> <span class="token parameter variable">-o</span> Hello.so
In <span class="token function">file</span> included from Hello.cpp:2:
TestMain.h:2:10: 致命错误：jni.h：没有那个文件或目录
    <span class="token number">2</span> <span class="token operator">|</span> <span class="token comment">#include &lt;jni.h&gt;</span>
      <span class="token operator">|</span>          ^~~~~~~
编译中断。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错原因是jni.h和TestMain.h不再一个路径，此处需要改成正确的路径， 修改TestMain.h头文件路径。将 #include &lt;jin.h&gt; 修改为 #include &quot;/usr/lib/jvm/java-11-openjdk/include/jni.h&quot;，到你的jdk安装目录去找对应的文件</p><p>修改后重新执行编译<code>g++ Hello.cpp -fpic -shared -o Hello.so</code>，依然报错，这次报错是jni_md.h找不到，这里不用想肯定是jni.h中引用了jni_md.h,然后在jni.h中路径不对，如下图所示。 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230111165112.png" alt="20230111165112"></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>In <span class="token function">file</span> included from TestMain.h:2,
                 from Hello.cpp:2:
/usr/lib/jvm/java-11-openjdk/include/jni.h:45:10: 致命错误：jni_md.h：没有那个文件或目录
   <span class="token number">45</span> <span class="token operator">|</span> <span class="token comment">#include &quot;jni_md.h&quot;</span>
      <span class="token operator">|</span>          ^~~~~~~~~~
编译中断。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实jni_md.h,这个文件位于和jni.h同级目录的linux目录下，在jni.h中直接使用#include &quot;jni_md.h&quot;肯定不行，这里我尝试了在同级目录建立软连接，但是莫名其妙的报错，所以我索性直接吧linux路径下的两个文件全部拷贝到和jni.h同级目录，执行编译就ok了，编译好了以后在当前目录就生成了一个Hello.so，这就是我们需要的动态链接库。</p><h3 id="_2-5-执行java程序验证" tabindex="-1"><a class="header-anchor" href="#_2-5-执行java程序验证"><span>2.5 执行java程序验证</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> TestMain           
Hello,wolrd<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、总结" tabindex="-1"><a class="header-anchor" href="#_3、总结"><span>3、总结</span></a></h2><p>有些方法对性能要求很高，或者需要直接调用系统内核等，可以使用native方法，调用c++的库来实现。 实现方法：</p><ol><li>编写java源文件并编译</li><li>使用jdk自带工具生成头文件</li><li>编写c++的具体实现</li><li>修改头文件中路径问题</li><li>编译动态链接库</li><li>执行java代码</li></ol>`,26),l=[t];function c(d,o){return n(),e("div",null,l)}const v=a(i,[["render",c],["__file","NativeMethod.html.vue"]]),u=JSON.parse('{"path":"/java/advance/NativeMethod.html","title":"自定义native方法","lang":"zh-CN","frontmatter":{"title":"自定义native方法","date":"2023-01-11T00:00:00.000Z","publish":true,"keys":null,"description":"使用c++实现一个native方法供java调用 环境 1、native方法 2、自定义实现native方法 2.1 定义java源文件 2.2 使用jdk自带工具生成c++头文件 编译源文件，javac Testmain.java得到TestMain.class文件 使用javac -h . TestMain.java生成头文件 在java8及之前，...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/advance/NativeMethod.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"自定义native方法"}],["meta",{"property":"og:description","content":"使用c++实现一个native方法供java调用 环境 1、native方法 2、自定义实现native方法 2.1 定义java源文件 2.2 使用jdk自带工具生成c++头文件 编译源文件，javac Testmain.java得到TestMain.class文件 使用javac -h . TestMain.java生成头文件 在java8及之前，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230111165112.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-29T02:35:09.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2023-01-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-29T02:35:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自定义native方法\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230111165112.png\\"],\\"datePublished\\":\\"2023-01-11T00:00:00.000Z\\",\\"dateModified\\":\\"2023-01-29T02:35:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、native方法","slug":"_1、native方法","link":"#_1、native方法","children":[]},{"level":2,"title":"2、自定义实现native方法","slug":"_2、自定义实现native方法","link":"#_2、自定义实现native方法","children":[{"level":3,"title":"2.1 定义java源文件","slug":"_2-1-定义java源文件","link":"#_2-1-定义java源文件","children":[]},{"level":3,"title":"2.2 使用jdk自带工具生成c++头文件","slug":"_2-2-使用jdk自带工具生成c-头文件","link":"#_2-2-使用jdk自带工具生成c-头文件","children":[]},{"level":3,"title":"2.3 添加cpp文件","slug":"_2-3-添加cpp文件","link":"#_2-3-添加cpp文件","children":[]},{"level":3,"title":"2.4 编译C++源码为动态库","slug":"_2-4-编译c-源码为动态库","link":"#_2-4-编译c-源码为动态库","children":[]},{"level":3,"title":"2.5 执行java程序验证","slug":"_2-5-执行java程序验证","link":"#_2-5-执行java程序验证","children":[]}]},{"level":2,"title":"3、总结","slug":"_3、总结","link":"#_3、总结","children":[]}],"git":{"createdTime":1673427639000,"updatedTime":1674959709000,"contributors":[{"name":"ChenSino","email":"chenxk@sonoscape.net","commits":2}]},"readingTime":{"minutes":2.45,"words":734},"filePathRelative":"java/advance/NativeMethod.md","localizedDate":"2023年1月11日","excerpt":"<p>使用c++实现一个native方法供java调用</p>\\n <!--more-->\\n<div class=\\"hint-container note\\">\\n<p class=\\"hint-container-title\\">环境</p>\\n<pre><code>实验环境linux、jdk11、gcc\\n</code></pre>\\n</div>\\n<h2>1、native方法</h2>\\n<h2>2、自定义实现native方法</h2>\\n<div class=\\"language-markdown\\" data-ext=\\"md\\" data-title=\\"md\\"><pre class=\\"language-markdown\\"><code>用c++实现一个动态链接库，使用java调用链接库中的方法\\n</code></pre></div>","autoDesc":true}');export{v as comp,u as data};