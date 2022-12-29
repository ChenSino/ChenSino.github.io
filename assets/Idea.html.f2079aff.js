import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o,c as s,b as e,a as i,d as a,e as t,r as l}from"./app.5a33c45d.js";const c={},r=e("h2",{id:"_1\u3001\u591A\u7EBF\u7A0Bdebug\u9047\u5230\u7684\u95EE\u9898",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1\u3001\u591A\u7EBF\u7A0Bdebug\u9047\u5230\u7684\u95EE\u9898","aria-hidden":"true"},"#"),a(" 1\u3001\u591A\u7EBF\u7A0Bdebug\u9047\u5230\u7684\u95EE\u9898")],-1),h=a("\u591A\u7EBF\u7A0B\u8C03\u8BD5\u9700\u8981\u628AThread\u9009\u4E0A\uFF0C\u81F3\u4E8EThread\u548CAll\u7684\u533A\u522B\u8BF7\u67E5\u770B"),p={href:"https://www.jetbrains.com/help/idea/using-breakpoints.html#breakpoint-properties",target:"_blank",rel:"noopener noreferrer"},g=a("\u5B98\u65B9\u6587\u6863"),u=t('<ul><li><p>All: all threads are suspended when any of the threads hits the breakpoint.</p></li><li><p>Thread: only the thread which hits the breakpoint is suspended.</p></li></ul><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729150247.png" alt="1" loading="lazy"></p><p>\u4ECA\u5929\u7528idea\u8C03\u8BD5mybatis-plus\u591A\u6570\u636E\u6E90\u5207\u6362\u65F6\uFF0C\u9047\u5230\u4E00\u4E2A\u6709\u8DA3\u7684\u95EE\u9898\uFF0C\u6211\u6709\u4E24\u4E2A\u7EBF\u7A0B\uFF0C\u5206\u522B\u8FDB\u5165\u4E86\u4E24\u4E2A\u65B9\u6CD5\uFF0C\u56E0\u4E3A\u591A\u6570\u636E\u6E90\u5207\u6362\u4F7F\u7528\u7684ThreadLocal\uFF0C\u6211\u60F3\u8C03\u8BD5\u4E3A\u4F55\u6570\u636E\u6E90\u5207\u6362\u4F1A\u5931\u8D25\u7684\u95EE\u9898\u3002\u5728\u8C03\u8BD5\u8FC7\u7A0B\u4E2D\uFF0C\u6211\u5728\u4E24\u4E2A\u65B9\u6CD5\u5206\u522B\u83B7\u53D6ThreadLocalMap\uFF0C\u8C03\u8BD5\u8FC7\u7A0B\u5982\u4E0B\uFF1A</p><ol><li>\u6211\u5148\u6267\u884C\u4E86\u7EBF\u7A0B1\uFF0C\u7136\u540E\u65AD\u70B9\u505C\u7559\uFF0C\u67E5\u770B\u7B2C\u4E00\u4E2A\u65B9\u6CD5\u4E2D<code>threadLocalMap</code>\u7684\u7ED3\u679C\uFF0C\u7B26\u5408\u9884\u671F</li><li>\u7136\u540E\u6267\u884C\u7EBF\u7A0B2\uFF0C\u67E5\u770B\u7B2C\u4E8C\u4E2A\u65B9\u6CD5\u4E2D<code>threadLocalMap</code>\u7684\u7ED3\u679C\uFF0C\u4E5F\u7B26\u5408\u9884\u671F</li><li>\u6B64\u65F6\u6211\u53C8\u7528Ctrl+\u9F20\u6807\u5DE6\u952E\u53BB\u67E5\u770B\u7EBF\u7A0B1\u4E2D\u7684<code>threadLocalMap</code>\uFF0C\u53D1\u73B0\u53D8\u6210\u548C\u7EBF\u7A0B2\u4E2D\u4E00\u6837\u4E86 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729145847.png" alt="2" loading="lazy"></li></ol><p>\u7ECF\u8FC7\u7B2C\u4E09\u6B65\u6D4B\u8BD5\uFF0C\u6211\u8499\u853D\u4E86\uFF0CThreadLocal\u4E0D\u662F\u7EBF\u7A0B\u4E4B\u95F4\u4E0D\u4F1A\u4E92\u76F8\u5E72\u6270\u5417\uFF1F\u600E\u4E48\u7EBF\u7A0B2\u4FEE\u6539\u4E86\u7EBF\u7A0B1\u7684\u7ED3\u679C\uFF1F<br> \u8FD9\u91CC\u8BF4\u4E00\u4E0B\uFF0Cdebug\u4E2D\uFF0CCtrl+\u9F20\u6807\u5DE6\u952E\u70B9\u51FB\u5B57\u6BB5\u786E\u5B9E\u80FD\u5FEB\u6377\u67E5\u770B\u5B57\u6BB5\u503C\uFF0C\u4F46\u662F\u5176\u5B9E\u5B83\u7684\u672C\u8D28\u8FD8\u662F\u67E5\u770B\u5F53\u524D\u7EBF\u7A0B\u7684xxx\u5B57\u6BB5\uFF0C\u53EA\u8981\u4F60\u6CA1\u5207\u6362\u7EBF\u7A0B\uFF0C\u76F4\u63A5\u7528\u9F20\u6807\u70B9\u5230\u53E6\u4E00\u4E2A\u7EBF\u7A0B\u4E2D\u7684\u5B57\u6BB5\uFF0C\u5B83\u5176\u5B9E\u53EA\u662F\u7528\u4E86\u4F60\u7528\u5FEB\u6377\u952E\u70B9\u7684\u90A3\u4E2A\u5B57\u6BB5\u540D\uFF0C\u5B9E\u9645\u8FD8\u662F\u5DEE\u7684\u5F53\u524D\u7EBF\u7A0B\u7684\u8FD9\u4E2A\u5B57\u6BB5 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729151140.png" alt="3" loading="lazy"></p><p>\u5982\u679C\u60F3\u770B\u53E6\u4E00\u4E2A\u7EBF\u7A0B\u7684\u540C\u540D\u5B57\u6BB5\uFF0C\u9700\u8981\u5148\u5207\u6362\u7EBF\u7A0B<br><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220729151320.png" alt="4" loading="lazy"></p><p>\u53E6\u5916\u5982\u679C\u4F60\u628A\u4E24\u4E2A\u7EBF\u7A0B\u4E2D\u7684\u5B57\u6BB5\u540D\u6539\u6210\u4E0D\u4E00\u6837\uFF0C\u4F60\u4F1A\u53D1\u73B0\u5728\u7EBF\u7A0B2\u4E2D\u7528\u5FEB\u6377\u952E\u70B9\u7EBF\u7A0B1\u7684\u5B57\u6BB5\uFF0C\u662F\u53D6\u4E0D\u5230\u503C\u7684</p><h2 id="_2\u3001idea\u6307\u5B9Ajdk\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#_2\u3001idea\u6307\u5B9Ajdk\u542F\u52A8" aria-hidden="true">#</a> 2\u3001Idea\u6307\u5B9Ajdk\u542F\u52A8</h2><p>Idea\u5347\u7EA7\u540E\u65E0\u6CD5\u542F\u52A8\uFF0C\u67E5\u770B\u65E5\u5FD7\u62A5\u9519\u660E\u663E\u7684\u662Fjdk\u7248\u672C\u4E0D\u517C\u5BB9\uFF0C\u9700\u8981\u7528\u6700\u65B0\u7684jdk17\uFF0C\u89E3\u51B3\u65B9\u6CD5\u6709\u591A\u4E2A\u3002</p><blockquote><p>\u65B9\u6CD51\uFF1A\u8BBE\u7F6E\u5168\u5C40jdk\u4E3A17,\u8FD9\u4E2A\u65B9\u6CD5\u53EF\u4EE5\u542F\u52A8idea\uFF0C\u4F46\u662F\u4E0D\u592A\u597D\uFF0C\u6BD5\u7ADF\u5176\u4ED6\u8F6F\u4EF6\u53EF\u80FD\u4E0D\u80FD\u4F7F\u7528\u6700\u65B0\u7684jdk</p></blockquote>',10),_=a("\u65B9\u6CD52\uFF1A\u5355\u72EC\u7ED9idea\u914D\u7F6Ejdk,\u6211\u8BB0\u5F97\u4EE5\u524D\u4F7F\u7528eclipse\u6709\u4E2A\u865A\u62DF\u673A\u53C2\u6570"),m=e("code",null,"-vm",-1),b=a("\u53EF\u4EE5\u6307\u5B9A\uFF0C\u4F46\u662F\u5728idea\u4E2D\u5E76\u4E0D\u597D\u4F7F\uFF0C "),k={href:"http://xn--ideaidea-z09lrd54dt6a514a1td62b509dksvmiuju0e6gck78f.sh",target:"_blank",rel:"noopener noreferrer"},f=a("\u6240\u4EE5\u5C31\u53BB\u770B\u4E86\u4E00\u4E0Bidea\u7684\u542F\u52A8\u811A\u672Cidea.sh"),y=a(",\u770B\u4E00\u4E0B\u542F\u52A8\u811A\u672C\uFF0C\u5C31\u77E5idea\u542F\u52A8\u65F6\u5230\u5E95\u4F7F\u7528\u7684\u662F\u90A3\u4E2Ajdk\uFF0C\u6839\u636Eidea\u8BFB\u53D6 \u7684\u914D\u7F6E\u6587\u4EF6\u53BB\u914D\u7F6E\u5C31\u597D\u4E86\uFF0C\u53EF\u4EE5\u8BBE\u7F6EJRE\u73AF\u5883\u53D8\u91CF\u3001\u53EF\u4EE5\u6307\u5B9AJDK_HOME\u73AF\u5883\u53D8\u91CF\uFF0C\u6211\u8FD9\u91CC\u4F7F\u7528\u7684\u662F\u914D\u7F6E\u6587\u4EF6\u7684\u65B9\u5F0F\uFF0C\u914D\u7F6E idea.jdk"),j=t(`<p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221202112129.png" alt="20221202112129" loading="lazy"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">cat</span> ~/.config/JetBrains/IntelliJIdea2022.3/idea.jdk                                      
/usr/lib/jvm/java-17-openjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3\u3001idea\u4E2Dgit\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_3\u3001idea\u4E2Dgit\u64CD\u4F5C" aria-hidden="true">#</a> 3\u3001idea\u4E2Dgit\u64CD\u4F5C</h2><h3 id="_3-1-\u5BF9\u6BD4\u4EFB\u610F\u975E\u8FDE\u7EED\u7684\u4E24\u6B21\u63D0\u4EA4\u6587\u4EF6\u5DEE\u5F02" tabindex="-1"><a class="header-anchor" href="#_3-1-\u5BF9\u6BD4\u4EFB\u610F\u975E\u8FDE\u7EED\u7684\u4E24\u6B21\u63D0\u4EA4\u6587\u4EF6\u5DEE\u5F02" aria-hidden="true">#</a> 3.1 \u5BF9\u6BD4\u4EFB\u610F\u975E\u8FDE\u7EED\u7684\u4E24\u6B21\u63D0\u4EA4\u6587\u4EF6\u5DEE\u5F02</h3><p>\u9009\u4E2D\u4E24\u6B21\u63D0\u4EA4\uFF0C\u53F3\u952ECompare Versions\uFF0C</p><p><img src="http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20221229215718576.png" alt="image-20221229215718576" loading="lazy"></p><p>\u4F1A\u51FA\u73B0\u4E00\u4E2Achange log\u7684\u89C6\u56FE\uFF0C\u8FD9\u5C31\u662F\u4E24\u6B21\u63D0\u4EF7\u7684\u5DEE\u5F02\u6587\u4EF6</p><p><img src="http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20221229215820791.png" alt="image-20221229215820791" loading="lazy"></p>`,8);function v(x,z){const d=l("ExternalLinkIcon");return o(),s("div",null,[r,e("p",null,[h,e("a",p,[g,i(d)])]),u,e("blockquote",null,[e("p",null,[_,m,b,e("a",k,[f,i(d)]),y])]),j])}var T=n(c,[["render",v],["__file","Idea.html.vue"]]);export{T as default};
