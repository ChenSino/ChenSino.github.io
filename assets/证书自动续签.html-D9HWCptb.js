import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,e}from"./app-DKNkBVDL.js";const i={},l=e(`<h3 id="_1-场景" tabindex="-1"><a class="header-anchor" href="#_1-场景"><span>1.场景</span></a></h3><p>我有一个pve虚拟机系统，需要部署ssl证书，同时我还有其他的云服务器以及内网服务器都需要证书，这些证书的根域名都是chensina.cn，而使用acme.sh申请的证书一般都是免费90天，到期就需要重新生成。重新生成后又要复制到其他远程服务器，然后重启对应的服务， 比较麻烦，所以这里写一个脚本自动完成。</p><h3 id="_2-实现流程" tabindex="-1"><a class="header-anchor" href="#_2-实现流程"><span>2. 实现流程</span></a></h3><ol><li>在pve机器上写个定时脚本定时执行证书申请（配置定时任务一周一次即可）</li><li>安装证书到pve机器本地（需要重启pveproxy服务）</li><li>scp复制到其他远程服务器上</li><li>远程服务器上的服务重启（使用脚本监听证书，自动执行重启）</li></ol><h3 id="_3-acme-sh安装使用" tabindex="-1"><a class="header-anchor" href="#_3-acme-sh安装使用"><span>3. acme.sh安装使用</span></a></h3><p>略</p><h3 id="_4-脚本" tabindex="-1"><a class="header-anchor" href="#_4-脚本"><span>4.脚本</span></a></h3><h4 id="_4-1pve上的脚本" tabindex="-1"><a class="header-anchor" href="#_4-1pve上的脚本"><span>4.1pve上的脚本</span></a></h4><p>1.脚本</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 定义证书路径，chensino是我的pve节点名字，请换成自己的</span>
<span class="token assign-left variable">LOCAL_FILE_KEY</span><span class="token operator">=</span><span class="token string">&quot;/etc/pve/nodes/chensino/pveproxy-ssl.key&quot;</span>
<span class="token assign-left variable">LOCAL_FILE_PEM</span><span class="token operator">=</span><span class="token string">&quot;/etc/pve/nodes/chensino/pveproxy-ssl.pem&quot;</span>
<span class="token assign-left variable">ACME_SH_PATH</span><span class="token operator">=</span><span class="token string">&quot;/root/.acme.sh/acme.sh&quot;</span>

<span class="token comment"># 测试命令（测试脚本时使用这个，letsencrypt提供的测试环境，添加--staging即可，否则频繁请求他的正式环境接口很容易就被限制了，被限制后就无法请求，要等一天）</span>
<span class="token comment">#RESULT=$($ACME_SH_PATH --issue  --dns dns_ali -d &quot;*.chensina.cn&quot; -d chensina.cn --force --server letsencrypt --staging)</span>

<span class="token comment"># 更新证书，使用-d chensina.cn 指定根域名，-d &quot;*.chensina.cn&quot;指定泛域名证书，泛域名证书是不能用于根域名的，根域名必须单独申请</span>
<span class="token assign-left variable">RESULT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>$ACME_SH_PATH <span class="token parameter variable">--issue</span>  <span class="token parameter variable">--dns</span> dns_ali <span class="token parameter variable">-d</span> <span class="token string">&quot;*.chensina.cn&quot;</span> <span class="token parameter variable">-d</span> chensina.cn <span class="token parameter variable">--force</span> <span class="token parameter variable">--server</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;结果：<span class="token variable">$RESULT</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;证书更新失败，脚本退出。&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token comment">#等待证书生成</span>
<span class="token function">sleep</span> <span class="token number">30</span>

<span class="token comment"># 重新安装新证书到PVE</span>
<span class="token variable">$ACME_SH_PATH</span> --install-cert <span class="token parameter variable">-d</span> *.chensina.cn <span class="token punctuation">\\</span>
--key-file <span class="token variable">$LOCAL_FILE_KEY</span> <span class="token punctuation">\\</span>
--fullchain-file <span class="token variable">$LOCAL_FILE_PEM</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--reloadcmd</span> <span class="token string">&quot;systemctl restart pveproxy&quot;</span>

<span class="token comment"># 使用 scp 将文件传输到远程云服务，同时把证书文件改名为ssl.key和ssl.pem(和你的nginx配置的名字一致即可)</span>
<span class="token comment"># 192.168.1.105 nginx</span>
<span class="token function">scp</span> <span class="token parameter variable">-P</span> <span class="token number">2222</span> <span class="token variable">$LOCAL_FILE_KEY</span> root@192.168.1.105:/home/root/DockerServices/nginx/ssl/ssl.key
<span class="token function">scp</span> <span class="token parameter variable">-P</span> <span class="token number">2222</span> <span class="token variable">$LOCAL_FILE_PEM</span> root@192.168.1.105:/home/root/DockerServices/nginx/ssl/ssl.pem
<span class="token comment"># 192.168.1.105 minio（docker服务部署的minio不用重启，证书复制过去就立马生效）</span>
<span class="token function">scp</span> <span class="token parameter variable">-P</span> <span class="token number">2222</span> <span class="token variable">$LOCAL_FILE_KEY</span> root@192.168.1.105:/home/root/DockerServices/minio/minio/config/certs/private.key
<span class="token function">scp</span> <span class="token parameter variable">-P</span> <span class="token number">2222</span> <span class="token variable">$LOCAL_FILE_PEM</span> root@192.168.1.105:/home/root/DockerServices/minio/minio/config/certs/public.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置定时执行</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span> 

<span class="token comment">##输入内容定时每天凌晨一点执行更新</span>
<span class="token number">0</span> <span class="token number">1</span> * * * <span class="token function">bash</span> 你脚本路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2远程服务器192-168-1-105" tabindex="-1"><a class="header-anchor" href="#_4-2远程服务器192-168-1-105"><span>4.2远程服务器192.168.1.105</span></a></h4><ol><li>安装监听软件</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#.安装inotify-tools监听证书文件变化</span>
<span class="token comment">#debian系使用</span>
<span class="token function">apt</span> <span class="token function">install</span> inotify-tools
<span class="token comment"># redhat系使用</span>
<span class="token comment">#yum install inotify-tools</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>监听脚本，监听证书变化后重启服务，</li></ol><p>我的脚本名字watch_ssl.sh</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 要监控的证书文件路径</span>
<span class="token assign-left variable">CERT_PATH</span><span class="token operator">=</span><span class="token string">&quot;/etc/nginx/ssl/ssl.pem&quot;</span>
<span class="token assign-left variable">KEY_PATH</span><span class="token operator">=</span><span class="token string">&quot;/etc/nginx/ssl/ssl.key&quot;</span>

<span class="token comment"># 监控证书文件的修改事件</span>
inotifywait <span class="token parameter variable">-m</span> <span class="token parameter variable">-e</span> close_write <span class="token string">&quot;<span class="token variable">$CERT_PATH</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$KEY_PATH</span>&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> filename event<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Detected change in <span class="token variable">$filename</span>. Reloading NGINX...&quot;</span>
    <span class="token comment"># 重新加载 NGINX</span>
    nginx <span class="token parameter variable">-s</span> reload
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>启动监听脚本</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">bash</span> xxx.sh <span class="token operator">&amp;</span>
~~

<span class="token number">4</span>. 把监听脚本注册为系统服务（可选）

~~~shell
<span class="token function">vim</span> /etc/systemd/system/watch_ssl.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Watch SSL Certificate Changes and Reload NGINX
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/root/watch_ssl.sh
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>always

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#启动服务： </span>
systemctl start watch_ssl.service
<span class="token comment">#停止服务： </span>
systemctl stop watch_ssl.service
<span class="token comment">#开机自启动</span>
 systemctl <span class="token builtin class-name">enable</span> watch_ssl.service
 <span class="token comment">#取消开机自启动</span>
 systemctl disable watch_ssl.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),t=[l];function c(p,o){return n(),a("div",null,t)}const v=s(i,[["render",c],["__file","证书自动续签.html.vue"]]),m=JSON.parse('{"path":"/myserver/%E8%AF%81%E4%B9%A6%E8%87%AA%E5%8A%A8%E7%BB%AD%E7%AD%BE.html","title":"acme.sh证书自动续签","lang":"zh-CN","frontmatter":{"title":"acme.sh证书自动续签","date":"2023-11-14T00:00:00.000Z","author":"chensino","publish":true,"isOriginal":true,"description":"1.场景 我有一个pve虚拟机系统，需要部署ssl证书，同时我还有其他的云服务器以及内网服务器都需要证书，这些证书的根域名都是chensina.cn，而使用acme.sh申请的证书一般都是免费90天，到期就需要重新生成。重新生成后又要复制到其他远程服务器，然后重启对应的服务， 比较麻烦，所以这里写一个脚本自动完成。 2. 实现流程 在pve机器上写个定...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/myserver/%E8%AF%81%E4%B9%A6%E8%87%AA%E5%8A%A8%E7%BB%AD%E7%AD%BE.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"acme.sh证书自动续签"}],["meta",{"property":"og:description","content":"1.场景 我有一个pve虚拟机系统，需要部署ssl证书，同时我还有其他的云服务器以及内网服务器都需要证书，这些证书的根域名都是chensina.cn，而使用acme.sh申请的证书一般都是免费90天，到期就需要重新生成。重新生成后又要复制到其他远程服务器，然后重启对应的服务， 比较麻烦，所以这里写一个脚本自动完成。 2. 实现流程 在pve机器上写个定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-14T02:14:24.000Z"}],["meta",{"property":"article:author","content":"chensino"}],["meta",{"property":"article:published_time","content":"2023-11-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-14T02:14:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"acme.sh证书自动续签\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-14T02:14:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chensino\\"}]}"]]},"headers":[{"level":3,"title":"1.场景","slug":"_1-场景","link":"#_1-场景","children":[]},{"level":3,"title":"2. 实现流程","slug":"_2-实现流程","link":"#_2-实现流程","children":[]},{"level":3,"title":"3. acme.sh安装使用","slug":"_3-acme-sh安装使用","link":"#_3-acme-sh安装使用","children":[]},{"level":3,"title":"4.脚本","slug":"_4-脚本","link":"#_4-脚本","children":[]}],"git":{"createdTime":1731550238000,"updatedTime":1731550464000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":2}]},"readingTime":{"minutes":2.66,"words":798},"filePathRelative":"myserver/证书自动续签.md","localizedDate":"2023年11月14日","excerpt":"<h3>1.场景</h3>\\n<p>我有一个pve虚拟机系统，需要部署ssl证书，同时我还有其他的云服务器以及内网服务器都需要证书，这些证书的根域名都是chensina.cn，而使用acme.sh申请的证书一般都是免费90天，到期就需要重新生成。重新生成后又要复制到其他远程服务器，然后重启对应的服务，\\n比较麻烦，所以这里写一个脚本自动完成。</p>\\n<h3>2. 实现流程</h3>\\n<ol>\\n<li>在pve机器上写个定时脚本定时执行证书申请（配置定时任务一周一次即可）</li>\\n<li>安装证书到pve机器本地（需要重启pveproxy服务）</li>\\n<li>scp复制到其他远程服务器上</li>\\n<li>远程服务器上的服务重启（使用脚本监听证书，自动执行重启）</li>\\n</ol>","autoDesc":true}');export{v as comp,m as data};
