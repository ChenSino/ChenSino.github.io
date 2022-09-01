import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,c as l,b as n,a as t,d as e,e as d,r as c}from"./app.21ab3a8c.js";const r={},v=n("h5",{id:"_1\u3001string\u7C7B",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1\u3001string\u7C7B","aria-hidden":"true"},"#"),e(" 1\u3001String\u7C7B")],-1),o=n("p",null,"\u4E3A\u4EC0\u4E48String\u7C7B\u8981\u88AB\u8BBE\u8BA1\u4E3A\u4E0D\u53EF\u53D8\uFF1F",-1),u={href:"https://www.programcreek.com/2013/04/why-string-is-immutable-in-java/",target:"_blank",rel:"noopener noreferrer"},m=e("string\u4E3A\u4EC0\u4E48\u4E0D\u53EF\u53D8"),b=d(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Thanks to the immutability of Strings in Java, the JVM can optimize the amount of memory allocated for them by storing only one copy of each literal String in the pool. This process is called interning.

When we create a String variable and assign a value to it, the JVM searches the pool for a String of equal value.

If found, the Java compiler will simply return a reference to its memory address, without allocating additional memory.

If not found, it&#39;ll be added to the pool (interned) and its reference will be returned.

Let&#39;s write a small test to verify this:

String constantString1 = &quot;Baeldung&quot;;
String constantString2 = &quot;Baeldung&quot;;
        
assertThat(constantString1)
  .isSameAs(constantString2);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">//\u540C\u4E00\u4E2Astring\u5B57\u9762\u91CF\uFF0C\u5751\u80FD\u88AB\u4F7F\u7528\u5F88\u591A\u6B21\uFF0C\u4E3A\u4E86\u8282\u7701\u5185\u5B58\uFF0C\u51E1\u662F\u8C03\u7528equals\u76F8\u7B49\u7684\u5B57\u7B26\u4E32\uFF0C\u5B9E\u9645\u90FD\u662F\u76F4\u63A5\u5F15\u7528\u7684String pool\u4E2D\u540C\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u6240\u4EE5String\u4E00\u65E6\u88AB\u521B\u5EFA\u540E\u4E0D\u80FD\u88AB\u6539\u53D8\uFF0C\u56E0\u4E3A\u4E00\u65E6\u6539\u53D8\u540E\uFF0C\u5176\u4ED6\u7684\u5F15\u7528\u83B7\u53D6\u5230\u7684\u5B57\u7B26\u4E32\u7684\u503C\u4E5F\u53D8\u4E86\u3002</span>
<span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//\u4EE5\u4E0A\u4E24\u4E2A\u5B57\u7B26\u4E32\u8FD4\u56DE\u7684\u90FD\u662FString pool \u4E2D\u540C\u4E00\u4E2A\u4F4D\u7F6E\u4E0A\u7684\u5B57\u7B26\u4E32\uFF0C\u8FD9\u6837\u53EA\u9700\u8981\u4E00\u4E2A\u5185\u5B58\u5C31\u591F\u4E86\uFF0C\u5047\u8BBEs1\u80FD\u6539\u53D8\u8FD9\u4E2A\u503C\uFF0C\u4F1A\u5BFC\u81F4s2\u5F15\u7528\u7684\u503C\u4E5F\u53D8</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2\u3001new-string-xxxx-\u521B\u5EFA\u4E86\u51E0\u4E2A\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#_2\u3001new-string-xxxx-\u521B\u5EFA\u4E86\u51E0\u4E2A\u5BF9\u8C61" aria-hidden="true">#</a> 2\u3001new String(&quot;xxxx&quot;)\u521B\u5EFA\u4E86\u51E0\u4E2A\u5BF9\u8C61</h5><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>chen<span class="token punctuation">.</span>base</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> afatpig
 * <span class="token keyword">@date</span> 2021/9/21 \u4E0A\u534810:19
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JavaBase</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> myName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;chenkun&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE5\u4E0A\u8FB9\u4F8B\u5B50\u6765\u8BB2\u89E3\uFF0C\u4F7F\u7528<code> javap -verbose JavaBase</code> \u53CD\u6C47\u7F16class\u6587\u4EF6\uFF0C\u7ED3\u679C\u5982\u4E0B\uFF0C\u5728#3\uFF0814\u884C\uFF09\u53EF\u4EE5\u770B\u5230 #3 = String #21 // chenkun\uFF0C</p><p>\u5728#21\uFF0832\u884C\uFF09\u4E5F\u6709\u4E2A #21 = Utf8 chenkun\uFF0C \u7B2C\u4E8C\u4E2Achenkun\u4EE3\u8868\u7684\u662F\u5B57\u9762\u91CF\uFF0C\u7B2C\u4E00\u4E2A\u662F\u4EE3\u8868\u7684\u5E38\u91CF\u6C60\u4E2D\u7684\u5B57\u7B26\u4E32\u5BF9\u8C61\uFF0C\u5B83\u6307\u5411#21\u4E5F\u5C31\u662F\u5B57\u9762\u91CF\u3002</p><p>\u4ECE57\u884C\u5F00\u59CBnew\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5E76\u628A\u5176\u5730\u5740\u538B\u5165\u6808\u9876\uFF0Cdup\u662F\u590D\u5236\u6808\u9876\u503C\u5E76\u538B\u5165\u6808\u9876\uFF0Cldc\u662F\u4ECE\u5E38\u91CF\u6C60\u53D6\u51FA\u5B57\u7B26\u4E32chenkun,\u5E76 \u538B\u5165\u6808\u9876\uFF0Cinvokespecial\u8C03\u7528string\u6784\u9020\u65B9\u6CD5\uFF0C\u6784\u9020\u4E00\u4E2A\u503C\u4E3Achenkun\u7684\u5BF9\u8C61\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ javap -verbose JavaBase
\u8B66\u544A: \u4E8C\u8FDB\u5236\u6587\u4EF6JavaBase\u5305\u542Bcom.chen.base.JavaBase
Classfile /home/chenkun/IdeaProjects/afatpig/out/production/java-base/com/chen/base/JavaBase.class
  Last modified 2021-9-21; size 470 bytes
  MD5 checksum 8f4ede21baad54f0ede6e0e51819ff99
  Compiled from &quot;JavaBase.java&quot;
public class com.chen.base.JavaBase
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #6.#19         // java/lang/Object.&quot;&lt;init&gt;&quot;:()V
   #2 = Class              #20            // java/lang/String
   #3 = String             #21            // chenkun
   #4 = Methodref          #2.#22         // java/lang/String.&quot;&lt;init&gt;&quot;:(Ljava/lang/String;)V
   #5 = Class              #23            // com/chen/base/JavaBase
   #6 = Class              #24            // java/lang/Object
   #7 = Utf8               &lt;init&gt;
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/chen/base/JavaBase;
  #14 = Utf8               testString
  #15 = Utf8               myName
  #16 = Utf8               Ljava/lang/String;
  #17 = Utf8               SourceFile
  #18 = Utf8               JavaBase.java
  #19 = NameAndType        #7:#8          // &quot;&lt;init&gt;&quot;:()V
  #20 = Utf8               java/lang/String
  #21 = Utf8               chenkun
  #22 = NameAndType        #7:#25         // &quot;&lt;init&gt;&quot;:(Ljava/lang/String;)V
  #23 = Utf8               com/chen/base/JavaBase
  #24 = Utf8               java/lang/Object
  #25 = Utf8               (Ljava/lang/String;)V
{
  public com.chen.base.JavaBase();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
         4: return
      LineNumberTable:
        line 7: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/chen/base/JavaBase;

  public void testString();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=3, locals=2, args_size=1
         0: new           #2                  // class java/lang/String
         3: dup
         4: ldc           #3                  // String chenkun
         6: invokespecial #4                  // Method java/lang/String.&quot;&lt;init&gt;&quot;:(Ljava/lang/String;)V
         9: astore_1
        10: return
      LineNumberTable:
        line 11: 0
        line 12: 10
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      11     0  this   Lcom/chen/base/JavaBase;
           10       1     1 myName   Ljava/lang/String;
}
SourceFile: &quot;JavaBase.java&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function p(g,h){const a=c("ExternalLinkIcon");return i(),l("div",null,[v,n("ol",null,[n("li",null,[o,n("p",null,[n("a",u,[m,t(a)])]),b])])])}var S=s(r,[["render",p],["__file","String.html.vue"]]);export{S as default};
