import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e as i}from"./app.abc7cfa7.js";const a={},d=i(`<h2 id="_1\u3001\u5B89\u88C5\u8FC7\u7A0B\u7701\u7565" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u5B89\u88C5\u8FC7\u7A0B\u7701\u7565" aria-hidden="true">#</a> 1\u3001\u5B89\u88C5\u8FC7\u7A0B\u7701\u7565</h2><h2 id="_2\u3001\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u914D\u7F6E" aria-hidden="true">#</a> 2\u3001\u914D\u7F6E</h2><h3 id="_2-1-\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-1-\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 2.1 \u914D\u7F6E\u6587\u4EF6</h3><p>\u914D\u7F6E\u76EE\u5F55\u5728<code> /etc/samba</code>\uFF0C\u4FEE\u6539<code>smb.conf</code>\u5728\u6700\u540E\u52A0\u4E00\u7EC4[test]\uFF0C\u540C\u65F6\u4FEE\u6539[global]\u5728\u91CC\u9762\u52A0\u4E0A<code>ntlm auth = yes</code>\uFF0C\u6700\u7EC8\u52A0\u5B8C\u5982\u4E0B</p><div class="language-conf ext-conf line-numbers-mode"><pre class="language-conf"><code># See smb.conf.example for a more detailed config file or
# read the smb.conf manpage.
# Run &#39;testparm&#39; to verify the config is correct after
# you modified it.

[global]
        ntlm auth = yes  ###\u8FD9\u4E2A\u5F88\u91CD\u8981
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
        path = /  # \u5B9E\u9645\u7684\u5171\u4EAB\u8DEF\u5F84\uFF0C\u8FD9\u91CC\u76F4\u63A5\u5171\u4EAB\u6240\u6709\uFF0C\u6839\u636E\u81EA\u5DF1\u9700\u6C42\u4FEE\u6539
        writable = yes  
        browseable = yes
        guest ok = yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-\u521B\u5EFAsamba\u7528\u6237" tabindex="-1"><a class="header-anchor" href="#_2-2-\u521B\u5EFAsamba\u7528\u6237" aria-hidden="true">#</a> 2.2 \u521B\u5EFAsamba\u7528\u6237</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>useadd <span class="token builtin class-name">test</span>  <span class="token comment">#\u6DFB\u52A0\u7CFB\u7EDF\u7528\u6237</span>
smbpaswd -a <span class="token builtin class-name">test</span>  <span class="token comment">#\u7ED9\u65B0\u52A0\u7684\u7CFB\u7EDF\u7528\u6237\u8BBE\u7F6Esamba\u5BC6\u7801\uFF0C\u8FD9\u4E2A\u5BC6\u7801\u548C\u7CFB\u7EDF\u5BC6\u7801\u4E0D\u662F\u4E00\u56DE\u4E8B</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-windows\u8FDE\u63A5samba" tabindex="-1"><a class="header-anchor" href="#_2-3-windows\u8FDE\u63A5samba" aria-hidden="true">#</a> 2.3 windows\u8FDE\u63A5samba</h3><p>windows\u5F00\u542Fsamba\u8FC7\u7A0B\u7701\u7565\u2026\u2026</p><p>\u8FDE\u63A5\u65F6\u7684\u8DEF\u5F84\u683C\u5F0F\u4E3A<code>\\\\IP\\test</code>\uFF0CIP\u662F\u4F60\u7684samba\u5730\u5740\uFF0Ctest\u662F\u5728smb.conf\u914D\u7F6E\u7684\u90A3\u4E2A [test]</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220627134822676.png" alt="image-20220627134822676" loading="lazy"></p>`,11),l=[d];function r(c,m){return n(),s("div",null,l)}var o=e(a,[["render",r],["__file","Samba.html.vue"]]);export{o as default};
