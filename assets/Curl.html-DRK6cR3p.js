import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as l,c as r,a as e,b as s,d as t,e as o}from"./app-eaM1OiHO.js";const c={},d=e("h2",{id:"_1、使用curl分析接口请求耗时",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1、使用curl分析接口请求耗时"},[e("span",null,"1、使用CURL分析接口请求耗时")])],-1),u={href:"https://cizixs.com/2017/04/11/use-curl-to-analyze-request/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://blog.josephscott.org/2011/10/14/timing-details-with-curl/",target:"_blank",rel:"noopener noreferrer"},m=o(`<blockquote><p>在服务器上发送请求一般用四字命令<code>curl</code>，本博客记录一下如何用curl测试接口耗时</p></blockquote><h3 id="_1-1-构造curl命令" tabindex="-1"><a class="header-anchor" href="#_1-1-构造curl命令"><span>1.1 构造curl命令</span></a></h3><p>浏览器提供了快速构建各种curl请求的方式，直接复制，有需要再编辑即可 <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220812173254.png" alt="构造curl"></p><h3 id="_1-2、分析耗时" tabindex="-1"><a class="header-anchor" href="#_1-2、分析耗时"><span>1.2、分析耗时</span></a></h3><p>使用<code>curl</code>的-w选项，其手册如下：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-w, --write-out <span class="token operator">&lt;</span>format<span class="token operator">&gt;</span>
              Defines  what  to  display  on  stdout after a completed and successful operation. The <span class="token function">format</span> is a string that may contain plain text mixed with any number of variables. The string can be
              specified as <span class="token string">&quot;string&quot;</span>, to get <span class="token builtin class-name">read</span> from a particular <span class="token function">file</span> you specify it <span class="token string">&quot;@filename&quot;</span> and to tell <span class="token function">curl</span> to <span class="token builtin class-name">read</span> the <span class="token function">format</span> from stdin you <span class="token function">write</span> <span class="token string">&quot;@-&quot;</span><span class="token builtin class-name">.</span>

              The variables present <span class="token keyword">in</span> the output <span class="token function">format</span> will be substituted by the value or text that <span class="token function">curl</span> thinks fit, as described below. All variables are specified as %<span class="token punctuation">{</span>variable_name<span class="token punctuation">}</span> and to output
              a normal % you just <span class="token function">write</span> them as %%. You can output a newline by using <span class="token punctuation">\\</span>n, a carriage <span class="token builtin class-name">return</span> with <span class="token punctuation">\\</span>r and a tab space with <span class="token punctuation">\\</span>t.

              NOTE: The %-symbol is a special symbol <span class="token keyword">in</span> the win32-environment, where all occurrences of % must be doubled when using this option.

              The variables available are:

              content_type   The Content-Type of the requested document, <span class="token keyword">if</span> there was any.

              filename_effective
                             The  ultimate  filename  that  <span class="token function">curl</span> writes out to. This is only meaningful <span class="token keyword">if</span> <span class="token function">curl</span> is told to <span class="token function">write</span> to a <span class="token function">file</span> with the --remote-name or <span class="token parameter variable">--output</span> option. It<span class="token string">&#39;s most useful in
                             combination with the --remote-header-name option. (Added in 7.25.1)

              ftp_entry_path The initial path curl ended up in when logging on to the remote FTP server. (Added in 7.15.4)

              http_code      The numerical response code that was found in the last retrieved HTTP(S) or FTP(s) transfer. In 7.18.2 the alias response_code was added to show the same info.

              http_connect   The numerical code that was found in the last response (from a proxy) to a curl CONNECT request. (Added in 7.12.4)

              local_ip       The IP address of the local end of the most recently done connection - can be either IPv4 or IPv6 (Added in 7.29.0)

              local_port     The local port number of the most recently done connection (Added in 7.29.0)

              num_connects   Number of new connects made in the recent transfer. (Added in 7.12.3)

              num_redirects  Number of redirects that were followed in the request. (Added in 7.12.3)

              redirect_url   When an HTTP request was made without -L to follow redirects, this variable will show the actual URL a redirect would take you to. (Added in 7.18.2)

              remote_ip      The remote IP address of the most recently done connection - can be either IPv4 or IPv6 (Added in 7.29.0)

              remote_port    The remote port number of the most recently done connection (Added in 7.29.0)

              size_download  The total amount of bytes that were downloaded.

              size_header    The total amount of bytes of the downloaded headers.

              size_request   The total amount of bytes that were sent in the HTTP request.

              size_upload    The total amount of bytes that were uploaded.

              speed_download The average download speed that curl measured for the complete download. Bytes per second.

              speed_upload   The average upload speed that curl measured for the complete upload. Bytes per second.

              ssl_verify_result
                             The result of the SSL peer certificate verification that was requested. 0 means the verification was successful. (Added in 7.19.0)

              time_appconnect
                             The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed. (Added in 7.19.0)

              time_connect   The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed.

              time_namelookup
                             The time, in seconds, it took from the start until the name resolving was completed.

              time_pretransfer
                             The time, in seconds, it took from the start until the file transfer was just about to begin. This includes all pre-transfer commands and negotiations that are specific  to
                             the particular protocol(s) involved.

              time_redirect  The time, in seconds, it took for all redirection steps include name lookup, connect, pretransfer and transfer before the final transaction was started. time_redirect shows
                             the complete execution time for multiple redirections. (Added in 7.12.3)

              time_starttransfer
                             The time, in seconds, it took from the start until the first byte was just about to be transferred. This includes time_pretransfer and also the time the  server  needed  to
                             calculate the result.

              time_total     The total time, in seconds, that the full operation lasted. The time will be displayed with millisecond resolution.

              url_effective  The URL that was fetched last. This is most meaningful if you&#39;</span>ve told <span class="token function">curl</span> to follow location: headers.

       If this option is used several times, the last one will be used.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它能够按照指定的格式打印某些信息，里面可以使用某些特定的变量，而且支持 \\n、\\t和 \\r 转义字符。提供的变量很多，比如 status_code、local_port、size_download 等等，这篇文章我们只关注和请求时间有关的变量（以 time_ 开头的变量）。 先往文本文件 curl-format.txt 写入下面的内容</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>➜  ~ <span class="token function">cat</span> curl-format.txt
    time_namelookup:  %<span class="token punctuation">{</span>time_namelookup<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
       time_connect:  %<span class="token punctuation">{</span>time_connect<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
    time_appconnect:  %<span class="token punctuation">{</span>time_appconnect<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
      time_redirect:  %<span class="token punctuation">{</span>time_redirect<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
   time_pretransfer:  %<span class="token punctuation">{</span>time_pretransfer<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
 time_starttransfer:  %<span class="token punctuation">{</span>time_starttransfer<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
                    ----------<span class="token punctuation">\\</span>n
         time_total:  %<span class="token punctuation">{</span>time_total<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么这些变量都是什么意思呢？我解释一下：</p><p>time_namelookup：DNS 域名解析的时候，就是把<code>https://zhihu.com</code> 转换成 ip 地址的过程 time_connect：TCP 连接建立的时间，就是三次握手的时间 time_appconnect：SSL/SSH 等上层协议建立连接的时间，比如 connect/handshake 的时间 time_redirect：从开始到最后一个请求事务的时间 time_pretransfer：从请求开始到响应开始传输的时间 time_starttransfer：从请求开始到第一个字节将要传输的时间 time_total：这次请求花费的全部时间 我们先看看一个简单的请求，没有重定向，也没有 SSL 协议的时间：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>➜  ~ <span class="token function">curl</span> <span class="token parameter variable">-w</span> <span class="token string">&quot;@curl-format.txt&quot;</span> <span class="token parameter variable">-o</span> /dev/null <span class="token parameter variable">-s</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;http://cizixs.com&quot;</span>
    time_namelookup:  <span class="token number">0.012</span>
       time_connect:  <span class="token number">0.227</span>
    time_appconnect:  <span class="token number">0.000</span>
      time_redirect:  <span class="token number">0.000</span>
   time_pretransfer:  <span class="token number">0.227</span>
 time_starttransfer:  <span class="token number">0.443</span>
                    ----------
         time_total:  <span class="token number">0.867</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到这次请求各个步骤的时间都打印出来了，每个数字的单位都是秒（seconds），这样可以分析哪一步比较耗时，方便定位问题。这个命令各个参数的意义：</p><p>-w：从文件中读取要打印信息的格式 -o /dev/null：把响应的内容丢弃，因为我们这里并不关心它，只关心请求的耗时情况 -s：不要打印进度条 从这个输出，我们可以算出各个步骤的时间：</p><p>DNS 查询：12ms TCP 连接时间：pretransfter(227) - namelookup(12) = 215ms 服务器处理时间：starttransfter(443) - pretransfer(227) = 216ms 内容传输时间：total(867) - starttransfer(443) = 424ms 来个比较复杂的，访问某度首页，带有中间有重定向和 SSL 协议：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>➜  ~ <span class="token function">curl</span> <span class="token parameter variable">-w</span> <span class="token string">&quot;@curl-format.txt&quot;</span> <span class="token parameter variable">-o</span> /dev/null <span class="token parameter variable">-s</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;https://baidu.com&quot;</span>
    time_namelookup:  <span class="token number">0.012</span>
       time_connect:  <span class="token number">0.018</span>
    time_appconnect:  <span class="token number">0.328</span>
      time_redirect:  <span class="token number">0.356</span>
   time_pretransfer:  <span class="token number">0.018</span>
 time_starttransfer:  <span class="token number">0.027</span>
                    ----------
         time_total:  <span class="token number">0.384</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 time_appconnect 和 time_redirect 都不是 0 了，其中 SSL 协议处理时间为 328-18=310ms。而且 pretransfer 和 starttransfer 的时间都缩短了，这是重定向之后请求的时间。</p>`,16);function v(h,b){const n=i("ExternalLinkIcon");return l(),r("div",null,[d,e("ul",null,[e("li",null,[e("a",u,[s("本博客参考"),t(n)])]),e("li",null,[e("a",p,[s("本博客参考"),t(n)])])]),m])}const _=a(c,[["render",v],["__file","Curl.html.vue"]]),g=JSON.parse('{"path":"/other/linux/Curl.html","title":"Curl命令","lang":"zh-CN","frontmatter":{"title":"Curl命令","date":"2022-08-12T00:00:00.000Z","author":"chenkun","keys":null,"category":["linux"],"tag":["linux"],"description":"1、使用CURL分析接口请求耗时 本博客参考 本博客参考 在服务器上发送请求一般用四字命令curl，本博客记录一下如何用curl测试接口耗时 1.1 构造curl命令 浏览器提供了快速构建各种curl请求的方式，直接复制，有需要再编辑即可 构造curl 1.2、分析耗时 使用curl的-w选项，其手册如下： 它能够按照指定的格式打印某些信息，里面可以使...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/linux/Curl.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"Curl命令"}],["meta",{"property":"og:description","content":"1、使用CURL分析接口请求耗时 本博客参考 本博客参考 在服务器上发送请求一般用四字命令curl，本博客记录一下如何用curl测试接口耗时 1.1 构造curl命令 浏览器提供了快速构建各种curl请求的方式，直接复制，有需要再编辑即可 构造curl 1.2、分析耗时 使用curl的-w选项，其手册如下： 它能够按照指定的格式打印某些信息，里面可以使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220812173254.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-12T09:54:45.000Z"}],["meta",{"property":"article:author","content":"chenkun"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:published_time","content":"2022-08-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-12T09:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Curl命令\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220812173254.png\\"],\\"datePublished\\":\\"2022-08-12T00:00:00.000Z\\",\\"dateModified\\":\\"2022-08-12T09:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chenkun\\"}]}"]]},"headers":[{"level":2,"title":"1、使用CURL分析接口请求耗时","slug":"_1、使用curl分析接口请求耗时","link":"#_1、使用curl分析接口请求耗时","children":[{"level":3,"title":"1.1 构造curl命令","slug":"_1-1-构造curl命令","link":"#_1-1-构造curl命令","children":[]},{"level":3,"title":"1.2、分析耗时","slug":"_1-2、分析耗时","link":"#_1-2、分析耗时","children":[]}]}],"git":{"createdTime":1660298085000,"updatedTime":1660298085000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":4.8,"words":1439},"filePathRelative":"other/linux/Curl.md","localizedDate":"2022年8月12日","excerpt":"<h2>1、使用CURL分析接口请求耗时</h2>\\n<ul>\\n<li><a href=\\"https://cizixs.com/2017/04/11/use-curl-to-analyze-request/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">本博客参考</a></li>\\n<li><a href=\\"https://blog.josephscott.org/2011/10/14/timing-details-with-curl/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">本博客参考</a></li>\\n</ul>","autoDesc":true}');export{_ as comp,g as data};
