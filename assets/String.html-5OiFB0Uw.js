import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as t,c as i,a as n,b as l,d as c,e as o}from"./app-TdR3A7lU.js";const r={},d=n("h5",{id:"_1、string类",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1、string类"},[n("span",null,"1、String类")])],-1),v=n("p",null,"为什么String类要被设计为不可变？",-1),p={href:"https://www.programcreek.com/2013/04/why-string-is-immutable-in-java/",target:"_blank",rel:"noopener noreferrer"},u=o(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Thanks to the immutability of Strings in Java, the JVM can optimize the amount of memory allocated for them by storing only one copy of each literal String in the pool. This process is called interning.

When we create a String variable and assign a value to it, the JVM searches the pool for a String of equal value.

If found, the Java compiler will simply return a reference to its memory address, without allocating additional memory.

If not found, it&#39;ll be added to the pool (interned) and its reference will be returned.

Let&#39;s write a small test to verify this:

String constantString1 = &quot;Baeldung&quot;;
String constantString2 = &quot;Baeldung&quot;;
        
assertThat(constantString1)
  .isSameAs(constantString2);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//同一个string字面量，坑能被使用很多次，为了节省内存，凡是调用equals相等的字符串，实际都是直接引用的String pool中同一个字符串，所以String一旦被创建后不能被改变，因为一旦改变后，其他的引用获取到的字符串的值也变了。</span>
<span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//以上两个字符串返回的都是String pool 中同一个位置上的字符串，这样只需要一个内存就够了，假设s1能改变这个值，会导致s2引用的值也变</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2、new-string-xxxx-创建了几个对象" tabindex="-1"><a class="header-anchor" href="#_2、new-string-xxxx-创建了几个对象"><span>2、new String(&quot;xxxx&quot;)创建了几个对象</span></a></h5><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>chen<span class="token punctuation">.</span>base</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> afatpig
 * <span class="token keyword">@date</span> 2021/9/21 上午10:19
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JavaBase</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> myName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;chenkun&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上边例子来讲解，使用<code> javap -verbose JavaBase</code> 反汇编class文件，结果如下，在#3（14行）可以看到 #3 = String #21 // chenkun，</p><p>在#21（32行）也有个 #21 = Utf8 chenkun， 第二个chenkun代表的是字面量，第一个是代表的常量池中的字符串对象，它指向#21也就是字面量。</p><p>从57行开始new会创建一个对象，并把其地址压入栈顶，dup是复制栈顶值并压入栈顶，ldc是从常量池取出字符串chenkun,并 压入栈顶，invokespecial调用string构造方法，构造一个值为chenkun的对象。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ javap -verbose JavaBase
警告: 二进制文件JavaBase包含com.chen.base.JavaBase
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function m(g,b){const a=s("ExternalLinkIcon");return t(),i("div",null,[d,n("ol",null,[n("li",null,[v,n("p",null,[n("a",p,[l("string为什么不可变"),c(a)])]),u])])])}const S=e(r,[["render",m],["__file","String.html.vue"]]),f=JSON.parse(`{"path":"/java/base/String.html","title":"字符串设计","lang":"zh-CN","frontmatter":{"title":"字符串设计","date":"2019-08-08T00:00:00.000Z","category":["java基础"],"description":"1、String类 为什么String类要被设计为不可变？ string为什么不可变 2、new String(\\"xxxx\\")创建了几个对象 以上边例子来讲解，使用 javap -verbose JavaBase 反汇编class文件，结果如下，在#3（14行）可以看到 #3 = String #21 // chenkun， 在#21（32行）也有个 ...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/base/String.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"字符串设计"}],["meta",{"property":"og:description","content":"1、String类 为什么String类要被设计为不可变？ string为什么不可变 2、new String(\\"xxxx\\")创建了几个对象 以上边例子来讲解，使用 javap -verbose JavaBase 反汇编class文件，结果如下，在#3（14行）可以看到 #3 = String #21 // chenkun， 在#21（32行）也有个 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T13:56:59.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2019-08-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-01T13:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串设计\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-08-08T00:00:00.000Z\\",\\"dateModified\\":\\"2022-08-01T13:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1659362219000,"updatedTime":1659362219000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":2.52,"words":755},"filePathRelative":"java/base/String.md","localizedDate":"2019年8月8日","excerpt":"<h5>1、String类</h5>\\n<ol>\\n<li>\\n<p>为什么String类要被设计为不可变？</p>\\n<p><a href=\\"https://www.programcreek.com/2013/04/why-string-is-immutable-in-java/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">string为什么不可变</a></p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Thanks to the immutability of Strings in Java, the JVM can optimize the amount of memory allocated for them by storing only one copy of each literal String in the pool. This process is called interning.\\n\\nWhen we create a String variable and assign a value to it, the JVM searches the pool for a String of equal value.\\n\\nIf found, the Java compiler will simply return a reference to its memory address, without allocating additional memory.\\n\\nIf not found, it'll be added to the pool (interned) and its reference will be returned.\\n\\nLet's write a small test to verify this:\\n\\nString constantString1 = \\"Baeldung\\";\\nString constantString2 = \\"Baeldung\\";\\n        \\nassertThat(constantString1)\\n  .isSameAs(constantString2);\\n\\n</code></pre></div><div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token comment\\">//同一个string字面量，坑能被使用很多次，为了节省内存，凡是调用equals相等的字符串，实际都是直接引用的String pool中同一个字符串，所以String一旦被创建后不能被改变，因为一旦改变后，其他的引用获取到的字符串的值也变了。</span>\\n<span class=\\"token class-name\\">String</span> s1 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"a\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span> s2 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"a\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">//以上两个字符串返回的都是String pool 中同一个位置上的字符串，这样只需要一个内存就够了，假设s1能改变这个值，会导致s2引用的值也变</span>\\n\\n</code></pre></div><h5>2、new String(\\"xxxx\\")创建了几个对象</h5>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">package</span> <span class=\\"token namespace\\">com<span class=\\"token punctuation\\">.</span>chen<span class=\\"token punctuation\\">.</span>base</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token doc-comment comment\\">/**\\n * <span class=\\"token keyword\\">@author</span> afatpig\\n * <span class=\\"token keyword\\">@date</span> 2021/9/21 上午10:19\\n */</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">JavaBase</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">testString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">String</span> myName <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"chenkun\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n</code></pre></div><p>以上边例子来讲解，使用<code> javap -verbose JavaBase</code> 反汇编class文件，结果如下，在#3（14行）可以看到 #3 = String             #21            // chenkun，</p>\\n<p>在#21（32行）也有个 #21 = Utf8               chenkun， 第二个chenkun代表的是字面量，第一个是代表的常量池中的字符串对象，它指向#21也就是字面量。</p>\\n<p>从57行开始new会创建一个对象，并把其地址压入栈顶，dup是复制栈顶值并压入栈顶，ldc是从常量池取出字符串chenkun,并 压入栈顶，invokespecial调用string构造方法，构造一个值为chenkun的对象。</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>$ javap -verbose JavaBase\\n警告: 二进制文件JavaBase包含com.chen.base.JavaBase\\nClassfile /home/chenkun/IdeaProjects/afatpig/out/production/java-base/com/chen/base/JavaBase.class\\n  Last modified 2021-9-21; size 470 bytes\\n  MD5 checksum 8f4ede21baad54f0ede6e0e51819ff99\\n  Compiled from \\"JavaBase.java\\"\\npublic class com.chen.base.JavaBase\\n  minor version: 0\\n  major version: 52\\n  flags: ACC_PUBLIC, ACC_SUPER\\nConstant pool:\\n   #1 = Methodref          #6.#19         // java/lang/Object.\\"&lt;init&gt;\\":()V\\n   #2 = Class              #20            // java/lang/String\\n   #3 = String             #21            // chenkun\\n   #4 = Methodref          #2.#22         // java/lang/String.\\"&lt;init&gt;\\":(Ljava/lang/String;)V\\n   #5 = Class              #23            // com/chen/base/JavaBase\\n   #6 = Class              #24            // java/lang/Object\\n   #7 = Utf8               &lt;init&gt;\\n   #8 = Utf8               ()V\\n   #9 = Utf8               Code\\n  #10 = Utf8               LineNumberTable\\n  #11 = Utf8               LocalVariableTable\\n  #12 = Utf8               this\\n  #13 = Utf8               Lcom/chen/base/JavaBase;\\n  #14 = Utf8               testString\\n  #15 = Utf8               myName\\n  #16 = Utf8               Ljava/lang/String;\\n  #17 = Utf8               SourceFile\\n  #18 = Utf8               JavaBase.java\\n  #19 = NameAndType        #7:#8          // \\"&lt;init&gt;\\":()V\\n  #20 = Utf8               java/lang/String\\n  #21 = Utf8               chenkun\\n  #22 = NameAndType        #7:#25         // \\"&lt;init&gt;\\":(Ljava/lang/String;)V\\n  #23 = Utf8               com/chen/base/JavaBase\\n  #24 = Utf8               java/lang/Object\\n  #25 = Utf8               (Ljava/lang/String;)V\\n{\\n  public com.chen.base.JavaBase();\\n    descriptor: ()V\\n    flags: ACC_PUBLIC\\n    Code:\\n      stack=1, locals=1, args_size=1\\n         0: aload_0\\n         1: invokespecial #1                  // Method java/lang/Object.\\"&lt;init&gt;\\":()V\\n         4: return\\n      LineNumberTable:\\n        line 7: 0\\n      LocalVariableTable:\\n        Start  Length  Slot  Name   Signature\\n            0       5     0  this   Lcom/chen/base/JavaBase;\\n\\n  public void testString();\\n    descriptor: ()V\\n    flags: ACC_PUBLIC\\n    Code:\\n      stack=3, locals=2, args_size=1\\n         0: new           #2                  // class java/lang/String\\n         3: dup\\n         4: ldc           #3                  // String chenkun\\n         6: invokespecial #4                  // Method java/lang/String.\\"&lt;init&gt;\\":(Ljava/lang/String;)V\\n         9: astore_1\\n        10: return\\n      LineNumberTable:\\n        line 11: 0\\n        line 12: 10\\n      LocalVariableTable:\\n        Start  Length  Slot  Name   Signature\\n            0      11     0  this   Lcom/chen/base/JavaBase;\\n           10       1     1 myName   Ljava/lang/String;\\n}\\nSourceFile: \\"JavaBase.java\\"\\n\\n</code></pre></div></li>\\n</ol>","autoDesc":true}`);export{S as comp,f as data};
