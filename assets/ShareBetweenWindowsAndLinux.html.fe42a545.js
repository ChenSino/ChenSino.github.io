import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as o,a as e,b as d,e as r,d as c,r as i}from"./app.59c3abb7.js";const t={},l=r(`<h3 id="_1\u3001\u5728windows\u8BBE\u7F6E\u5171\u4EAB\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u5728windows\u8BBE\u7F6E\u5171\u4EAB\u76EE\u5F55" aria-hidden="true">#</a> 1\u3001\u5728windows\u8BBE\u7F6E\u5171\u4EAB\u76EE\u5F55</h3><p>\u8BBE\u7F6E\u8FC7\u7A0B\u7701\u7565\u2026\u2026</p><h3 id="_2\u3001\u5728linux\u4E0B\u6302\u8F7D" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u5728linux\u4E0B\u6302\u8F7D" aria-hidden="true">#</a> 2\u3001\u5728linux\u4E0B\u6302\u8F7D</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>    <span class="token comment">## 1. \u521B\u5EFA\u7A7A\u767D\u76EE\u5F55</span>
        <span class="token function">mkdir</span> /home/data/share
    <span class="token comment">## 2. \u4FEE\u6539/etc/fstab\u5F00\u673A\u81EA\u52A8\u6302\u8F7D</span>
    //10.10.102.97/tempfile    /home/data/share  cifs    defaults,user<span class="token operator">=</span>xxx,password<span class="token operator">=</span>xxx,uid<span class="token operator">=</span><span class="token number">1000</span>,gid<span class="token operator">=</span><span class="token number">1000</span>  <span class="token number">0</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u89E3\u91CA\uFF1A <code>//10.10.102.97/tempfile</code>\u662F\u5728windows\u8BBE\u7F6E\u7684\u5171\u4EAB\u76EE\u5F55\uFF0C\u8BBE\u7F6E\u597D\u4E86\u53EF\u4EE5\u7528\u5176\u4ED6windows\u7535\u8111\u6D4B\u8BD5\u4E0B\u770B\u662F\u5426\u5171\u4EAB\u6210\u529F <code>/home/data/share</code> \u6302\u8F7D\u7684\u4F4D\u7F6E\uFF0C\u4E00\u5B9A\u8981\u662F\u4E2A\u7A7A\u76EE\u5F55\uFF0C <code>cifs</code> \u4E0D\u8981\u4FEE\u6539 <code>user</code> windows\u5E10\u6237\uFF0C <code>password</code> windows\u5BC6\u7801 <code>uid</code> \u6302\u8F7D\u7684\u76EE\u5F55\u6240\u5C5E\u7528\u6237\uFF0C\u5728linux\u7EC8\u7AEF\u7528<code>id \u4F60\u7684\u7528\u6237\u540D</code>\u67E5\u770B <code>gid</code> \u7528\u6237\u7EC4\uFF0C\u548C<code>uid</code>\u4E00\u4E2A\u9053\u7406\uFF0C\u8FD9\u4E24\u4E2A\u4E00\u5B9A\u8981\u6307\u5B9A\uFF0C\u4E0D\u7136\u5C31\u88AB\u6302\u5230root\u4E86</p><h3 id="\u53C2\u8003\u535A\u5BA2" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u535A\u5BA2" aria-hidden="true">#</a> \u53C2\u8003\u535A\u5BA2</h3>`,6),p={href:"https://blog.csdn.net/wifi74262580/article/details/90648892",target:"_blank",rel:"noopener noreferrer"},h=c("\u53C2\u8003");function u(m,_){const a=i("ExternalLinkIcon");return s(),o("div",null,[l,e("p",null,[e("a",p,[h,d(a)])])])}var w=n(t,[["render",u],["__file","ShareBetweenWindowsAndLinux.html.vue"]]);export{w as default};
