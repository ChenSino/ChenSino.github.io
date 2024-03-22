import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,e as s}from"./app-TdR3A7lU.js";const i={},t=s(`<h2 id="_1、安装过程省略" tabindex="-1"><a class="header-anchor" href="#_1、安装过程省略"><span>1、安装过程省略</span></a></h2><h2 id="_2、配置" tabindex="-1"><a class="header-anchor" href="#_2、配置"><span>2、配置</span></a></h2><h3 id="_2-1-配置文件" tabindex="-1"><a class="header-anchor" href="#_2-1-配置文件"><span>2.1 配置文件</span></a></h3><p>配置目录在<code> /etc/samba</code>，修改<code>smb.conf</code>在最后加一组[test]，同时修改[global]在里面加上<code>ntlm auth = yes</code>，最终加完如下</p><div class="language-conf line-numbers-mode" data-ext="conf" data-title="conf"><pre class="language-conf"><code># See smb.conf.example for a more detailed config file or
# read the smb.conf manpage.
# Run &#39;testparm&#39; to verify the config is correct after
# you modified it.

[global]
        ntlm auth = yes  ###这个很重要
        workgroup = SAMBA
        security = user

        passdb backend = tdbsam

        printing = cups
        printcap name = cups
        load printers = yes
        cups options = raw

[homes]
        comment = Home Directories
        valid users = %S, %D%w%S
        browseable = No
        read only = No
        inherit acls = Yes

[printers]
        comment = All Printers
        path = /var/tmp
        printable = Yes
        create mask = 0600
        browseable = No

[test]
        valid users = root,test
        comment = my share directory
        path = /  # 实际的共享路径，这里直接共享所有，根据自己需求修改
        writable = yes  
        browseable = yes
        guest ok = yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-创建samba用户" tabindex="-1"><a class="header-anchor" href="#_2-2-创建samba用户"><span>2.2 创建samba用户</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>useadd <span class="token builtin class-name">test</span>  <span class="token comment">#添加系统用户</span>
smbpaswd <span class="token parameter variable">-a</span> <span class="token builtin class-name">test</span>  <span class="token comment">#给新加的系统用户设置samba密码，这个密码和系统密码不是一回事</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-windows连接samba" tabindex="-1"><a class="header-anchor" href="#_2-3-windows连接samba"><span>2.3 windows连接samba</span></a></h3><p>windows开启samba过程省略……</p><p>连接时的路径格式为<code>\\\\IP\\test</code>，IP是你的samba地址，test是在smb.conf配置的那个 [test]</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220627134822676.png" alt="image-20220627134822676"></p>`,11),l=[t];function r(o,d){return n(),a("div",null,l)}const b=e(i,[["render",r],["__file","Samba.html.vue"]]),p=JSON.parse(`{"path":"/other/linux/Samba.html","title":"部署Samba","lang":"zh-CN","frontmatter":{"title":"部署Samba","date":"2022-06-27T00:00:00.000Z","author":"chenkun","publish":true,"keys":null,"description":"1、安装过程省略 2、配置 2.1 配置文件 配置目录在 /etc/samba，修改smb.conf在最后加一组[test]，同时修改[global]在里面加上ntlm auth = yes，最终加完如下 2.2 创建samba用户 2.3 windows连接samba windows开启samba过程省略…… 连接时的路径格式为\\\\\\\\IP\\\\test，I...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/linux/Samba.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"部署Samba"}],["meta",{"property":"og:description","content":"1、安装过程省略 2、配置 2.1 配置文件 配置目录在 /etc/samba，修改smb.conf在最后加一组[test]，同时修改[global]在里面加上ntlm auth = yes，最终加完如下 2.2 创建samba用户 2.3 windows连接samba windows开启samba过程省略…… 连接时的路径格式为\\\\\\\\IP\\\\test，I..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220627134822676.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"chenkun"}],["meta",{"property":"article:published_time","content":"2022-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"部署Samba\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220627134822676.png\\"],\\"datePublished\\":\\"2022-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chenkun\\"}]}"]]},"headers":[{"level":2,"title":"1、安装过程省略","slug":"_1、安装过程省略","link":"#_1、安装过程省略","children":[]},{"level":2,"title":"2、配置","slug":"_2、配置","link":"#_2、配置","children":[{"level":3,"title":"2.1 配置文件","slug":"_2-1-配置文件","link":"#_2-1-配置文件","children":[]},{"level":3,"title":"2.2 创建samba用户","slug":"_2-2-创建samba用户","link":"#_2-2-创建samba用户","children":[]},{"level":3,"title":"2.3 windows连接samba","slug":"_2-3-windows连接samba","link":"#_2-3-windows连接samba","children":[]}]}],"git":{"createdTime":1659362219000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1},{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":0.94,"words":281},"filePathRelative":"other/linux/Samba.md","localizedDate":"2022年6月27日","excerpt":"<h2>1、安装过程省略</h2>\\n<h2>2、配置</h2>\\n<h3>2.1 配置文件</h3>\\n<p>配置目录在<code> /etc/samba</code>，修改<code>smb.conf</code>在最后加一组[test]，同时修改[global]在里面加上<code>ntlm auth = yes</code>，最终加完如下</p>\\n<div class=\\"language-conf\\" data-ext=\\"conf\\" data-title=\\"conf\\"><pre class=\\"language-conf\\"><code># See smb.conf.example for a more detailed config file or\\n# read the smb.conf manpage.\\n# Run 'testparm' to verify the config is correct after\\n# you modified it.\\n\\n[global]\\n        ntlm auth = yes  ###这个很重要\\n        workgroup = SAMBA\\n        security = user\\n\\n        passdb backend = tdbsam\\n\\n        printing = cups\\n        printcap name = cups\\n        load printers = yes\\n        cups options = raw\\n\\n[homes]\\n        comment = Home Directories\\n        valid users = %S, %D%w%S\\n        browseable = No\\n        read only = No\\n        inherit acls = Yes\\n\\n[printers]\\n        comment = All Printers\\n        path = /var/tmp\\n        printable = Yes\\n        create mask = 0600\\n        browseable = No\\n\\n[test]\\n        valid users = root,test\\n        comment = my share directory\\n        path = /  # 实际的共享路径，这里直接共享所有，根据自己需求修改\\n        writable = yes  \\n        browseable = yes\\n        guest ok = yes\\n</code></pre></div>","autoDesc":true}`);export{b as comp,p as data};
