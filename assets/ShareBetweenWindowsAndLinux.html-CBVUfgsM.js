import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as t,c as o,a as e,b as i,d as r,e as d}from"./app-Cs38sdJl.js";const c={},l=d(`<h3 id="_1、在windows设置共享目录" tabindex="-1"><a class="header-anchor" href="#_1、在windows设置共享目录"><span>1、在windows设置共享目录</span></a></h3><p>设置过程省略……</p><h3 id="_2、在linux下挂载" tabindex="-1"><a class="header-anchor" href="#_2、在linux下挂载"><span>2、在linux下挂载</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>    <span class="token comment">## 1. 创建空白目录</span>
        <span class="token function">mkdir</span> /home/data/share
    <span class="token comment">## 2. 修改/etc/fstab开机自动挂载</span>
    //10.10.102.97/tempfile    /home/data/share  cifs    defaults,user<span class="token operator">=</span>xxx,password<span class="token operator">=</span>xxx,uid<span class="token operator">=</span><span class="token number">1000</span>,gid<span class="token operator">=</span><span class="token number">1000</span>  <span class="token number">0</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释： <code>//10.10.102.97/tempfile</code>是在windows设置的共享目录，设置好了可以用其他windows电脑测试下看是否共享成功 <code>/home/data/share</code> 挂载的位置，一定要是个空目录， <code>cifs</code> 不要修改 <code>user</code> windows帐户， <code>password</code> windows密码 <code>uid</code> 挂载的目录所属用户，在linux终端用<code>id 你的用户名</code>查看 <code>gid</code> 用户组，和<code>uid</code>一个道理，这两个一定要指定，不然就被挂到root了</p><h3 id="参考博客" tabindex="-1"><a class="header-anchor" href="#参考博客"><span>参考博客</span></a></h3>`,6),p={href:"https://blog.csdn.net/wifi74262580/article/details/90648892",target:"_blank",rel:"noopener noreferrer"};function h(u,m){const n=s("ExternalLinkIcon");return t(),o("div",null,[l,e("p",null,[e("a",p,[i("参考"),r(n)])])])}const k=a(c,[["render",h],["__file","ShareBetweenWindowsAndLinux.html.vue"]]),f=JSON.parse('{"path":"/other/linux/ShareBetweenWindowsAndLinux.html","title":"Linux挂载windows共享目录","lang":"zh-CN","frontmatter":{"title":"Linux挂载windows共享目录","date":"2023-10-26T00:00:00.000Z","author":"chenkun","publish":true,"keys":null,"description":"1、在windows设置共享目录 设置过程省略…… 2、在linux下挂载 解释： //10.10.102.97/tempfile是在windows设置的共享目录，设置好了可以用其他windows电脑测试下看是否共享成功 /home/data/share 挂载的位置，一定要是个空目录， cifs 不要修改 user windows帐户， passwor...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/linux/ShareBetweenWindowsAndLinux.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"Linux挂载windows共享目录"}],["meta",{"property":"og:description","content":"1、在windows设置共享目录 设置过程省略…… 2、在linux下挂载 解释： //10.10.102.97/tempfile是在windows设置的共享目录，设置好了可以用其他windows电脑测试下看是否共享成功 /home/data/share 挂载的位置，一定要是个空目录， cifs 不要修改 user windows帐户， passwor..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-26T05:38:26.000Z"}],["meta",{"property":"article:author","content":"chenkun"}],["meta",{"property":"article:published_time","content":"2023-10-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-26T05:38:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux挂载windows共享目录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-26T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-26T05:38:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chenkun\\"}]}"]]},"headers":[{"level":3,"title":"1、在windows设置共享目录","slug":"_1、在windows设置共享目录","link":"#_1、在windows设置共享目录","children":[]},{"level":3,"title":"2、在linux下挂载","slug":"_2、在linux下挂载","link":"#_2、在linux下挂载","children":[]},{"level":3,"title":"参考博客","slug":"参考博客","link":"#参考博客","children":[]}],"git":{"createdTime":1698298706000,"updatedTime":1698298706000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":0.65,"words":194},"filePathRelative":"other/linux/ShareBetweenWindowsAndLinux.md","localizedDate":"2023年10月26日","excerpt":"<h3>1、在windows设置共享目录</h3>\\n<p>设置过程省略……</p>\\n<h3>2、在linux下挂载</h3>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>    <span class=\\"token comment\\">## 1. 创建空白目录</span>\\n        <span class=\\"token function\\">mkdir</span> /home/data/share\\n    <span class=\\"token comment\\">## 2. 修改/etc/fstab开机自动挂载</span>\\n    //10.10.102.97/tempfile    /home/data/share  cifs    defaults,user<span class=\\"token operator\\">=</span>xxx,password<span class=\\"token operator\\">=</span>xxx,uid<span class=\\"token operator\\">=</span><span class=\\"token number\\">1000</span>,gid<span class=\\"token operator\\">=</span><span class=\\"token number\\">1000</span>  <span class=\\"token number\\">0</span> <span class=\\"token number\\">0</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,f as data};
