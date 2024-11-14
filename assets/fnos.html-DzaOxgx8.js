import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as e,e as s}from"./app-BCcpStCA.js";const i={},t=s(`<h4 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h4><blockquote><p>nas端口暴露到公网，存在被扫描爆破的风险，使用fail2ban对账号进行保护</p></blockquote><h4 id="_1-安装fail2ban" tabindex="-1"><a class="header-anchor" href="#_1-安装fail2ban"><span>1.安装fail2ban</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#1. 安装fail2ban</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> fail2ban
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-添加日志过滤的配置" tabindex="-1"><a class="header-anchor" href="#_2-添加日志过滤的配置"><span>2. 添加日志过滤的配置</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##新建trim_main.conf文件</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/fail2ban/filter.d/trim_main.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-conf line-numbers-mode" data-ext="conf" data-title="conf"><pre class="language-conf"><code>#以下内容写入到/etc/fail2ban/filter.d/trim_main.conf
[Definition]
failregex = MAINEVENT:.*&quot;template&quot;:&quot;LoginFail&quot;.*&quot;IP&quot;:&quot;&lt;HOST&gt;&quot;
ignoreregex =
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-设置要ban的规则" tabindex="-1"><a class="header-anchor" href="#_3-设置要ban的规则"><span>3. 设置要ban的规则</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##添加配置文件jail.local</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/fail2ban/jail.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-conf line-numbers-mode" data-ext="conf" data-title="conf"><pre class="language-conf"><code>#把下面配置写入jail.local
[DEFAULT]
# 忽略的IP地址列表，局域网内的ip不做限制
ignoreip = 127.0.0.1/8 192.168.1.0/24
# 默认的禁用时间（秒）
bantime = 3600
# 最大失败尝试次数
maxretry = 5

# 日志级别
loglevel = 3

[trim_main]
enabled  = true
filter   = trim_main
logpath  = /var/log/syslog
maxretry = 5
bantime  = 3600
findtime = 600
#action   = iptables-allports[name=trim_main, port=&quot;all&quot;]
action = iptables-multiport[name=trim_main, port=&quot;5667&quot;, protocol=tcp]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上参数可根据自己的需求做调整，比如密码错误次数，ban的时间长短，还有ban的端口，因为我对外暴露的就一个5667端口，所以这里我就ban了5667</p><h4 id="_4-fail2ban基本用法" tabindex="-1"><a class="header-anchor" href="#_4-fail2ban基本用法"><span>4. fail2ban基本用法</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#启动</span>
 <span class="token function">sudo</span> systemctl start fail2ban
<span class="token comment">#停止</span>
<span class="token function">sudo</span> systemctl stop fail2ban
<span class="token comment"># 重启</span>
<span class="token function">sudo</span> systemctl stop fail2ban
<span class="token comment"># 查看被ban的ip</span>
 <span class="token function">sudo</span> fail2ban-client banned
<span class="token comment"># 解除某个被ban的ip</span>
<span class="token function">sudo</span> fail2ban-client <span class="token builtin class-name">set</span> trim_main unbanip x.x.x.x
<span class="token comment">#开机启动fail2ban</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> fail2ban
<span class="token comment"># 禁止开机启动</span>
<span class="token function">sudo</span> systemctl disable fail2ban
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-飞牛的服务日志查看" tabindex="-1"><a class="header-anchor" href="#_5-飞牛的服务日志查看"><span>5.飞牛的服务日志查看</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/syslog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),l=[t];function c(d,o){return a(),e("div",null,l)}const p=n(i,[["render",c],["__file","fnos.html.vue"]]),u=JSON.parse('{"path":"/myserver/fnos.html","title":"飞牛NAS","lang":"zh-CN","frontmatter":{"title":"飞牛NAS","date":"2024-11-09T00:00:00.000Z","author":"chensino","publish":true,"isOriginal":true,"description":"背景 nas端口暴露到公网，存在被扫描爆破的风险，使用fail2ban对账号进行保护 1.安装fail2ban 2. 添加日志过滤的配置 3. 设置要ban的规则 以上参数可根据自己的需求做调整，比如密码错误次数，ban的时间长短，还有ban的端口，因为我对外暴露的就一个5667端口，所以这里我就ban了5667 4. fail2ban基本用法 5.飞...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/myserver/fnos.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"飞牛NAS"}],["meta",{"property":"og:description","content":"背景 nas端口暴露到公网，存在被扫描爆破的风险，使用fail2ban对账号进行保护 1.安装fail2ban 2. 添加日志过滤的配置 3. 设置要ban的规则 以上参数可根据自己的需求做调整，比如密码错误次数，ban的时间长短，还有ban的端口，因为我对外暴露的就一个5667端口，所以这里我就ban了5667 4. fail2ban基本用法 5.飞..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-09T07:44:09.000Z"}],["meta",{"property":"article:author","content":"chensino"}],["meta",{"property":"article:published_time","content":"2024-11-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-09T07:44:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"飞牛NAS\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-09T07:44:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chensino\\"}]}"]]},"headers":[],"git":{"createdTime":1731137994000,"updatedTime":1731138249000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":2}]},"readingTime":{"minutes":1.14,"words":342},"filePathRelative":"myserver/fnos.md","localizedDate":"2024年11月9日","excerpt":"<h4>背景</h4>\\n<blockquote>\\n<p>nas端口暴露到公网，存在被扫描爆破的风险，使用fail2ban对账号进行保护</p>\\n</blockquote>\\n<h4>1.安装fail2ban</h4>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\">#1. 安装fail2ban</span>\\n<span class=\\"token function\\">sudo</span> <span class=\\"token function\\">apt</span> <span class=\\"token function\\">install</span> fail2ban\\n</code></pre></div>","autoDesc":true}');export{p as comp,u as data};
