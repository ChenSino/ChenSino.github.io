import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{o,c as l,b as s,a as e,e as i,d as n,r}from"./app.6007ccf0.js";const c={},p=i(`<h3 id="_1\u3001\u964D\u7EA7\u8F6F\u4EF6\u5305" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u964D\u7EA7\u8F6F\u4EF6\u5305" aria-hidden="true">#</a> 1\u3001\u964D\u7EA7\u8F6F\u4EF6\u5305</h3><p>\u5B89\u88C5downgrade\u7A0B\u5E8F <code>sudo pacman -S downgrade</code> \u964D\u7EA7 <code>sudo DOWNGRADE_FROM_ALA=1 downgrade xxx\u5305</code> \u6CE8\u610FDOWNGRADE_FROM_ALA=1\u4E00\u5B9A\u8981\u6309\u7167\u6211\u4E0A\u8FB9\u8FD9\u6837\u5199\uFF0C\u4E0D\u80FD\u5355\u72ECexport DOWNGRADE_FROM_ALA=1 \u8BBE\u7F6E\u5FFD\u7565\u5347\u7EA7\u7684\u5305 \u7B2C\u4E8C\u6B65\u4F1A\u8BA9\u4F60\u9009\u62E9\u66F4\u65B0\u7684\u65F6\u5019\u662F\u5426\u8981\u5FFD\u7565\u66F4\u65B0\uFF0C\u9009\u62E9y\u7684\u8BDD\uFF0C\u5B83\u4F1A\u5728/etc/pacman.conf\u6DFB\u52A0\u4E00\u4E2A\u5FFD\u7565\uFF0C\u5982\u679C\u4E0D\u60F3\u6E56\u7EFF\uFF0C\u628A\u4E0B\u9762\u7684IgnorePkg\u6CE8\u91CA\u5373\u53EF</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322171440300.png" alt="image-20220322171440300" loading="lazy"></p><h3 id="_2\u3001\u5F00\u673A\u62A5\u9519failed-to-start-rotate-log-files" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u5F00\u673A\u62A5\u9519failed-to-start-rotate-log-files" aria-hidden="true">#</a> 2\u3001\u5F00\u673A\u62A5\u9519failed to start rotate log files</h3><h4 id="_2-1-\u5206\u6790\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5206\u6790\u95EE\u9898" aria-hidden="true">#</a> 2.1 \u5206\u6790\u95EE\u9898</h4><ol><li>logrotate\u662F\u4EC0\u4E48 \u6309\u7167\u8001\u5957\u8DEF\u5206\u6790\uFF0C\u5148\u767E\u5EA6\u4E86\u4E00\u4E0Blogrotate\u662F\u4EC0\u4E48\uFF0C\u53C2\u8003\uFF0C\u8BF4\u767D\u4E86\u5C31\u662F\u4E2A\u65E5\u5FD7\u5207\u5272\uFF0C\u548Cjava\u91CC\u9762\u7684\u5DEE\u4E0D\u591A\u3002\u5C31\u662F\u9632\u6B62\u5355\u6587\u4EF6\u65E5\u5FD7\u8FC7\u5927\uFF0C\u6309\u7167\u4E00\u5B9A\u7684\u89C4\u5219\u5207\u5272\u6210\u591A\u4E2A\u65E5\u5FD7\uFF0C\u6216\u8005\u5220\u9664\uFF0C\u6BD4\u5982\u8BBE\u7F6E\u8D85\u8FC7\u4E00\u4E2A\u6708\u76F4\u63A5\u5220\u9664\uFF0C\u6216\u8005\u8D85\u8FC710M\u76F4\u63A5\u5220\u9664\u7B49\u7B49\u3002</li><li>\u67E5\u770Blogrotate\u662F\u4EC0\u4E48\u65F6\u5019\u542F\u52A8\uFF0C\u4EE5\u53CA\u542F\u52A8\u540E\u7684\u72B6\u6001\u3002\u9996\u5148\u6211\u4EEC\u77E5\u9053\u5B83\u662F\u4E00\u4E2Asystemctl\u542F\u52A8\u7684service\u670D\u52A1\u3002\u90A3\u5C31\u5230/lib/systemd/system\u4E0B\u770B\u4E00\u4E0Bll |grep rotate</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> ll<span class="token operator">|</span><span class="token function">grep</span> rota
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">870</span>  <span class="token number">1</span>\u6708  <span class="token number">8</span>  <span class="token number">2021</span> logrotate.service
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">191</span>  <span class="token number">1</span>\u6708  <span class="token number">8</span>  <span class="token number">2021</span> logrotate.timer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),d=n("\u53EF\u4EE5\u770B\u5230\u548C"),u={href:"https://blog.csdn.net/chen462488588/article/details/118737574?spm=1001.2014.3001.5501",target:"_blank",rel:"noopener noreferrer"},m=n("\u8FD9\u4E2A\u95EE\u9898"),g=n("\u4E00\u6A21\u4E00\u6837\u7684\u5957\u8DEF\u3002"),v=i(`<ol start="3"><li>\u5230 logrotate.service\u67E5\u770B\u5B83\u5B9E\u9645\u4E0A\u6267\u884C\u7684\u662F\u4EC0\u4E48\u547D\u4EE4</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">cat</span> logrotate.service     
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Rotate log files
<span class="token assign-left variable">Documentation</span><span class="token operator">=</span>man:logrotate<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> man:logrotate.conf<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token assign-left variable">RequiresMountsFor</span><span class="token operator">=</span>/var/log
<span class="token assign-left variable">ConditionACPower</span><span class="token operator">=</span>true

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>oneshot
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/sbin/logrotate /etc/logrotate.conf

<span class="token comment"># performance options</span>
<span class="token assign-left variable">Nice</span><span class="token operator">=</span><span class="token number">19</span>
<span class="token assign-left variable">IOSchedulingClass</span><span class="token operator">=</span>best-effort
<span class="token assign-left variable">IOSchedulingPriority</span><span class="token operator">=</span><span class="token number">7</span>

<span class="token comment"># hardening options</span>
<span class="token comment">#  details: https://www.freedesktop.org/software/systemd/man/systemd.exec.html</span>
<span class="token comment">#  no ProtectHome for userdir logs</span>
<span class="token comment">#  no PrivateNetwork for mail deliviery</span>
<span class="token comment">#  no NoNewPrivileges for third party rotate scripts</span>
<span class="token comment">#  no RestrictSUIDSGID for creating setgid directories</span>
<span class="token assign-left variable">LockPersonality</span><span class="token operator">=</span>true
<span class="token assign-left variable">MemoryDenyWriteExecute</span><span class="token operator">=</span>true
<span class="token assign-left variable">PrivateDevices</span><span class="token operator">=</span>true
<span class="token assign-left variable">PrivateTmp</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectClock</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectControlGroups</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectHostname</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectKernelLogs</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectKernelModules</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectKernelTunables</span><span class="token operator">=</span>true
<span class="token assign-left variable">ProtectSystem</span><span class="token operator">=</span>full
<span class="token assign-left variable">RestrictNamespaces</span><span class="token operator">=</span>true
<span class="token assign-left variable">RestrictRealtime</span><span class="token operator">=</span>true


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230<code>ExecStart=/usr/sbin/logrotate /etc/logrotate.conf</code> \u6267\u884C\u7684\u662F\u8FD9\u4E2A\u547D\u4EE4\uFF0C\u90A3\u5C31\u597D\u529E\u4E86\uFF0C\u624B\u52A8\u4EE5debug\u6A21\u5F0F\u6267\u884C\u4E00\u4E0B\u6B64\u547D\u4EE4</p><ol start="4"><li>\u67E5\u770B\u6267\u884C\u7ED3\u679C</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">logrotate</span> --debug /etc/logrotate.conf                              
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> chenkun \u7684\u5BC6\u7801\uFF1A
WARNING: <span class="token function">logrotate</span> <span class="token keyword">in</span> debug mode does nothing except printing debug messages<span class="token operator">!</span>  Consider using verbose mode <span class="token punctuation">(</span>-v<span class="token punctuation">)</span> instead <span class="token keyword">if</span> this is not what you want.

reading config <span class="token function">file</span> /etc/logrotate.conf
including /etc/logrotate.d
reading config <span class="token function">file</span> cups
reading config <span class="token function">file</span> lirc
reading config <span class="token function">file</span> mysqlrouter
error: mysqlrouter:31 unknown option <span class="token string">&#39;var&#39;</span> -- ignoring line
error: mysqlrouter:45 unexpected <span class="token punctuation">}</span>
error: found error <span class="token keyword">in</span> <span class="token function">file</span> mysqlrouter, skipping
reading config <span class="token function">file</span> nginx
reading config <span class="token function">file</span> samba
warning: <span class="token string">&#39;monthly&#39;</span> overrides previously specified <span class="token string">&#39;weekly&#39;</span>
Reading state from file: /var/lib/logrotate.status
Allocating <span class="token builtin class-name">hash</span> table <span class="token keyword">for</span> state file, size <span class="token number">64</span> entries
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state
Creating new state

Handling <span class="token number">6</span> logs

rotating pattern: /var/log/cups/*_log  weekly <span class="token punctuation">(</span><span class="token number">4</span> rotations<span class="token punctuation">)</span>
empty log files are not rotated, old logs are removed
considering log /var/log/cups/access_log
  Now: <span class="token number">2021</span>-07-15 09:24
  Last rotated at <span class="token number">2021</span>-07-11 <span class="token number">16</span>:22
  log does not need rotating <span class="token punctuation">(</span>log has been rotated at <span class="token number">2021</span>-07-11 <span class="token number">16</span>:22, <span class="token function">which</span> is <span class="token function">less</span> than a week ago<span class="token punctuation">)</span>
considering log /var/log/cups/error_log
  Now: <span class="token number">2021</span>-07-15 09:24
  Last rotated at <span class="token number">2021</span>-07-11 <span class="token number">16</span>:22
  log does not need rotating <span class="token punctuation">(</span>log has been rotated at <span class="token number">2021</span>-07-11 <span class="token number">16</span>:22, <span class="token function">which</span> is <span class="token function">less</span> than a week ago<span class="token punctuation">)</span>

rotating pattern: /var/log/lircd  weekly <span class="token punctuation">(</span><span class="token number">4</span> rotations<span class="token punctuation">)</span>
empty log files are not rotated, old logs are removed
considering log /var/log/lircd
  log /var/log/lircd does not exist -- skipping

rotating pattern: /var/log/nginx/*log  weekly <span class="token punctuation">(</span><span class="token number">4</span> rotations<span class="token punctuation">)</span>
empty log files are not rotated, old logs are removed
considering log /var/log/nginx/access.log
  Now: <span class="token number">2021</span>-07-15 09:24
  Last rotated at <span class="token number">2021</span>-06-02 08:34
  log does not need rotating <span class="token punctuation">(</span>log is empty<span class="token punctuation">)</span>
not running postrotate script, since no logs were rotated

rotating pattern: /var/log/samba/log.smbd /var/log/samba/log.nmbd /var/log/samba/*.log  weekly <span class="token punctuation">(</span><span class="token number">4</span> rotations<span class="token punctuation">)</span>
empty log files are not rotated, old logs are removed
considering log /var/log/samba/log.smbd
  log /var/log/samba/log.smbd does not exist -- skipping
considering log /var/log/samba/log.nmbd
  log /var/log/samba/log.nmbd does not exist -- skipping
considering log /var/log/samba/*.log
  log /var/log/samba/*.log does not exist -- skipping

rotating pattern: /var/log/wtmp  monthly <span class="token punctuation">(</span><span class="token number">1</span> rotations<span class="token punctuation">)</span>
empty log files are rotated, only log files <span class="token operator">&gt;=</span> <span class="token number">1048576</span> bytes are rotated, old logs are removed
considering log /var/log/wtmp
  Now: <span class="token number">2021</span>-07-15 09:24
  Last rotated at <span class="token number">2021</span>-03-20 <span class="token number">18</span>:00
  log does not need rotating <span class="token punctuation">(</span><span class="token string">&#39;minsize&#39;</span> directive is used and the log size is smaller than the minsize value<span class="token punctuation">)</span>

rotating pattern: /var/log/btmp  monthly <span class="token punctuation">(</span><span class="token number">1</span> rotations<span class="token punctuation">)</span>
empty log files are rotated, old logs are removed
considering log /var/log/btmp
  Now: <span class="token number">2021</span>-07-15 09:24
  Last rotated at <span class="token number">2021</span>-07-01 <span class="token number">19</span>:33
  log does not need rotating <span class="token punctuation">(</span>log has been rotated at <span class="token number">2021</span>-07-01 <span class="token number">19</span>:33, <span class="token function">which</span> is <span class="token function">less</span> than a month ago<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li><p>\u5728\u65E5\u5FD7\u4E2D\u627Eerror</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322171948840.png" alt="image-20220322171948840" loading="lazy"></p></li><li><p>\u62A5\u9519\u5F88\u660E\u663E\u4E86\u662Fmysqlroute\u7684\u65E5\u5FD7\u5207\u5272\u5931\u8D25\u4E86\u3002</p></li><li><p>logrotate\u5176\u5B9E\u662F\u88AB\u5F88\u591A\u7A0B\u5E8F\u90FD\u4F7F\u7528\u4E86\uFF0C\u5176\u914D\u7F6E\u6587\u4EF6\u5728/etc/logrotate.d\u4E0B</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322172023905.png" alt="image-20220322172023905" loading="lazy"></p></li></ol><p>\u53EF\u4EE5\u770B\u5230nginx \uFF0Cmysqlrouter\uFF0CSamba\u7B49\u90FD\u7528\u4E86logrotate\uFF0C\u5E76\u4E14\u4ED6\u4EEC\u90FD\u6709\u81EA\u5DF1\u7684\u914D\u7F6E\uFF0C\u6839\u636E\u4E0A\u9762\u6211\u4EEC\u5DF2\u7ECF\u77E5\u9053\u4E86\u662Fmysqlrouter\u914D\u7F6E\u6709\u95EE\u9898\uFF0C\u6211\u4EEC\u53EA\u9700\u8981\u6253\u5F00nginx\u7684\u914D\u7F6E\u548Cmysqlrouter\u5BF9\u6BD4\u5C31\u77E5\u9053\u4E86\u3002\u7ECF\u8FC7\u6BD4\u6211\u6211\u7684mysqlrouter\u7684\u914D\u7F6E\u6587\u4EF6\u5728var\u524D\u9762\u5C11\u4E86\u4E00\u4E2A/ \u52A0\u4E0A\u5C31\u597D\u4E86</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220322172038617.png" alt="image-20220322172038617" loading="lazy"></p><h3 id="linux\u4E0B\u8F93\u5165\u6CD5\u65E0\u6CD5\u8F93\u5165\u4E2D\u6587\u4E2D\u62EC\u53F7\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#linux\u4E0B\u8F93\u5165\u6CD5\u65E0\u6CD5\u8F93\u5165\u4E2D\u6587\u4E2D\u62EC\u53F7\u95EE\u9898" aria-hidden="true">#</a> linux\u4E0B\u8F93\u5165\u6CD5\u65E0\u6CD5\u8F93\u5165\u4E2D\u6587\u4E2D\u62EC\u53F7\u95EE\u9898</h3><p>\u5982\u679C\u4F7F\u7528\u7684\u662Ffcitx5\uFF0C\u4FEE\u6539/usr/share/fcitx5/punctuation/punc.mb.zh_CN\u4E0B\u7684\u5BF9\u5E94\u7B26\u53F7\u5373\u53EF\uFF0C\u6253\u5F00\u6587\u4EF6\u6709\u4E24\u5217\uFF0C\u7B2C\u4E00\u5217\u4EE3\u8868\u82F1\u6587 \u72B6\u6001\u4E0B\u7684\u7B26\u53F7\uFF0C\u7B2C\u4E8C\u5217\u662F\u4E2D\u6587\u4E0B\u7B26\u53F7\u3002 \u6709\u65F6\u53D1\u73B0\u65E0\u8BBA\u600E\u4E48\u8F93\u5165\u90FD\u53EA\u6709\u82F1\u6587\uFF0C\u90A3\u4E48\u5C31\u7EED\u5440\u70B9\u51FB\u4E00\u4E0B\u8F93\u5165\u6CD5\u4E0A\u7684\u534A\u89D2\u7B26\u53F7</p><h3 id="_3\u3001\u7F8E\u5316" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u7F8E\u5316" aria-hidden="true">#</a> 3\u3001\u7F8E\u5316</h3><p>kde\u8BBE\u7F6Eproxy\u6709\u4E2A\u5F88\u5927\u7684bug,\u5C31\u662F\u65E0\u6CD5\u5168\u5C40\uFF0C\u641E\u7B11\u7684\u662F\u901A\u8FC7kde\u8BBE\u7F6E\u7684proxy,\u5B83\u81EA\u5DF1\u90FD\u65E0\u6CD5\u4F7F\u7528\uFF0C\u5728\u56FD\u5185\u7528kde\u4E0B\u8F7D\u4E3B\u9898\u3001\u56FE\u6807\u7B49\u6839\u672C\u4E0B\u8F7D\u4E0D\u52A8\u3002</p><p>\u89E3\u51B3\u529E\u6CD5\u5C31\u662F\u6302\u68AF\u5B50\uFF0C\u4E0B\u8F7D\u540E\u624B\u52A8\u5B89\u88C5\uFF0C</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155819498.png" alt="image-20220418155819498" loading="lazy"></p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155847045.png" alt="image-20220418155847045" loading="lazy"></p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155927678.png" alt="image-20220418155927678" loading="lazy"></p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220418155956979.png" alt="image-20220418155956979" loading="lazy"></p><h3 id="_4\u3001\u8BBE\u7F6Eyakuake\u63D0\u793A\u6CA1\u6709\u6743\u9650\u4FEE\u6539\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_4\u3001\u8BBE\u7F6Eyakuake\u63D0\u793A\u6CA1\u6709\u6743\u9650\u4FEE\u6539\u6587\u4EF6" aria-hidden="true">#</a> 4\u3001\u8BBE\u7F6Eyakuake\u63D0\u793A\u6CA1\u6709\u6743\u9650\u4FEE\u6539\u6587\u4EF6</h3><ol><li>\u4FEE\u6539yakuake\u7684\u6587\u5B57\u5927\u5C0F</li></ol><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220419110311199.png" alt="image-20220419110311199" loading="lazy"></p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220419110401735.png" alt="image-20220419110401735" loading="lazy"></p><ol start="2"><li>\u4FDD\u5B58\u65F6\u4F1A\u62A5\u9519\uFF0C\u5927\u6982\u662F\u6CA1\u6709<code>/usr/share/konsole</code>\u7684\u6743\u9650</li><li>\u6DFB\u52A0\u4E00\u4E0B\u6743\u9650\u5C31\u884C\u4E86</li></ol><p>\u200B \u7ED9\u5F53\u524D\u7528\u6237\u6DFB\u52A0\u4E00\u4E0B\u6743\u9650\uFF0C<code>chmod 666 xxx</code></p><h3 id="_3\u3001manjaro\u4E0D\u652F\u6301mysql" tabindex="-1"><a class="header-anchor" href="#_3\u3001manjaro\u4E0D\u652F\u6301mysql" aria-hidden="true">#</a> 3\u3001Manjaro\u4E0D\u652F\u6301Mysql</h3><blockquote><p>\u5728Manjaro\u4E0A\u4F7F\u7528mysql,\u7ECF\u5E38\u4F1A\u9047\u5230libicu\u4E0D\u517C\u5BB9\u95EE\u9898\uFF0C\u5373\u4F7F\u89E3\u51B3\u4E86\uFF0C\u4E0B\u6B21\u7CFB\u7EDF\u6EDA\u52A8\u5347\u7EA7\u53EF\u80FD\u53C8\u4F1A\u51FA\u73B0</p></blockquote><h4 id="_3-1-\u4F7F\u7528mariadb\u4EE3\u66FFmysql" tabindex="-1"><a class="header-anchor" href="#_3-1-\u4F7F\u7528mariadb\u4EE3\u66FFmysql" aria-hidden="true">#</a> 3.1 \u4F7F\u7528MariaDB\u4EE3\u66FFmysql</h4><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220502211444881.png" alt="image-20220502211444881" loading="lazy"></p><h4 id="_3-2-\u4F7F\u7528docker\u5B89\u88C5mysql" tabindex="-1"><a class="header-anchor" href="#_3-2-\u4F7F\u7528docker\u5B89\u88C5mysql" aria-hidden="true">#</a> 3.2 \u4F7F\u7528docker\u5B89\u88C5Mysql</h4><h3 id="_4\u3001manjaro\u8BBE\u7F6Edns" tabindex="-1"><a class="header-anchor" href="#_4\u3001manjaro\u8BBE\u7F6Edns" aria-hidden="true">#</a> 4\u3001Manjaro\u8BBE\u7F6EDNS</h3><p><strong>\u80CC\u666F</strong></p>`,30),b=n("\u7528\u53CC\u7F51\u5361\u540C\u65F6\u4E0A\u5185\u5916\u7F51\uFF0C\u6709\u65F6\u4E00\u4E2A\u57DF\u540D\u662F\u5185\u7F51\u624D\u80FD\u89E3\u6790\u7684\uFF0C"),k={href:"http://xn--iccm-uh1gk70ahspfnsw5v.sonoscape.com",target:"_blank",rel:"noopener noreferrer"},h=n("\u6BD4\u5982\u6211\u53F8\u7684iccm.sonoscape.com"),f=n("\uFF0C\u8FD9\u4E2A\u662F\u4E00\u4E2A\u5185\u7F51\u57DF\u540D\uFF0C\u8981\u8D70\u5185\u90E8DNS\u624D\u80FD\u8BBF\u95EE\u5230\uFF0C"),y=n("\u4F46\u662F\u516C\u53F8\u56E0\u8BE5\u662F\u6709\u4E24\u4E2ADNS\u670D\u52A1\u5668\uFF0C"),_={href:"http://xn--xxx-p18dohj53dutx3ja275hiivns0akxels2b.sonoscape.com",target:"_blank",rel:"noopener noreferrer"},x=n("\u4E00\u4E2A\u7528\u6765\u89E3\u6790\u5916\u7F51\u8BBF\u95EExxx.sonoscape.com"),w=n("\uFF0C"),q={href:"http://xn--xxx-p18dohy4qzze989bzjcts6cpedpq0b309a213a.sonoscape.com",target:"_blank",rel:"noopener noreferrer"},N=n("\u53E6\u4E00\u4E2A\u662F\u7528\u6765\u8BBF\u95EE\u5185\u7F51\u7684xxx.sonoscape.com"),z=n(",");function C(D,P){const a=r("ExternalLinkIcon");return o(),l("div",null,[p,s("p",null,[d,s("a",u,[m,e(a)]),g]),v,s("blockquote",null,[s("p",null,[b,s("a",k,[h,e(a)]),f]),s("p",null,[y,s("a",_,[x,e(a)]),w,s("a",q,[N,e(a)]),z])])])}var S=t(c,[["render",C],["__file","Manjaro.html.vue"]]);export{S as default};
