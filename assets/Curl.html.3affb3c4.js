import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,c as l,b as e,a as t,d as n,e as o,r}from"./app.43ff45c1.js";const c={},d=e("h2",{id:"_1\u3001\u4F7F\u7528curl\u5206\u6790\u63A5\u53E3\u8BF7\u6C42\u8017\u65F6",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1\u3001\u4F7F\u7528curl\u5206\u6790\u63A5\u53E3\u8BF7\u6C42\u8017\u65F6","aria-hidden":"true"},"#"),n(" 1\u3001\u4F7F\u7528CURL\u5206\u6790\u63A5\u53E3\u8BF7\u6C42\u8017\u65F6")],-1),u={href:"https://cizixs.com/2017/04/11/use-curl-to-analyze-request/",target:"_blank",rel:"noopener noreferrer"},p=n("\u672C\u535A\u5BA2\u53C2\u8003"),m={href:"https://blog.josephscott.org/2011/10/14/timing-details-with-curl/",target:"_blank",rel:"noopener noreferrer"},v=n("\u672C\u535A\u5BA2\u53C2\u8003"),h=o(`<blockquote><p>\u5728\u670D\u52A1\u5668\u4E0A\u53D1\u9001\u8BF7\u6C42\u4E00\u822C\u7528\u56DB\u5B57\u547D\u4EE4<code>curl</code>\uFF0C\u672C\u535A\u5BA2\u8BB0\u5F55\u4E00\u4E0B\u5982\u4F55\u7528curl\u6D4B\u8BD5\u63A5\u53E3\u8017\u65F6</p></blockquote><h3 id="_1-1-\u6784\u9020curl\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_1-1-\u6784\u9020curl\u547D\u4EE4" aria-hidden="true">#</a> 1.1 \u6784\u9020curl\u547D\u4EE4</h3><p>\u6D4F\u89C8\u5668\u63D0\u4F9B\u4E86\u5FEB\u901F\u6784\u5EFA\u5404\u79CDcurl\u8BF7\u6C42\u7684\u65B9\u5F0F\uFF0C\u76F4\u63A5\u590D\u5236\uFF0C\u6709\u9700\u8981\u518D\u7F16\u8F91\u5373\u53EF <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220812173254.png" alt="\u6784\u9020curl" loading="lazy"></p><h3 id="_1-2\u3001\u5206\u6790\u8017\u65F6" tabindex="-1"><a class="header-anchor" href="#_1-2\u3001\u5206\u6790\u8017\u65F6" aria-hidden="true">#</a> 1.2\u3001\u5206\u6790\u8017\u65F6</h3><p>\u4F7F\u7528<code>curl</code>\u7684-w\u9009\u9879\uFF0C\u5176\u624B\u518C\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>-w, --write-out <span class="token operator">&lt;</span>format<span class="token operator">&gt;</span>
              Defines  what  to  display  on  stdout after a completed and successful operation. The <span class="token function">format</span> is a string that may contain plain text mixed with any number of variables. The string can be
              specified as <span class="token string">&quot;string&quot;</span>, to get <span class="token builtin class-name">read</span> from a particular <span class="token function">file</span> you specify it <span class="token string">&quot;@filename&quot;</span> and to tell <span class="token function">curl</span> to <span class="token builtin class-name">read</span> the <span class="token function">format</span> from stdin you <span class="token function">write</span> <span class="token string">&quot;@-&quot;</span><span class="token builtin class-name">.</span>

              The variables present <span class="token keyword">in</span> the output <span class="token function">format</span> will be substituted by the value or text that <span class="token function">curl</span> thinks fit, as described below. All variables are specified as %<span class="token punctuation">{</span>variable_name<span class="token punctuation">}</span> and to output
              a normal % you just <span class="token function">write</span> them as %%. You can output a newline by using <span class="token punctuation">\\</span>n, a carriage <span class="token builtin class-name">return</span> with <span class="token punctuation">\\</span>r and a tab space with <span class="token punctuation">\\</span>t.

              NOTE: The %-symbol is a special symbol <span class="token keyword">in</span> the win32-environment, where all occurrences of % must be doubled when using this option.

              The variables available are:

              content_type   The Content-Type of the requested document, <span class="token keyword">if</span> there was any.

              filename_effective
                             The  ultimate  filename  that  <span class="token function">curl</span> writes out to. This is only meaningful <span class="token keyword">if</span> <span class="token function">curl</span> is told to <span class="token function">write</span> to a <span class="token function">file</span> with the --remote-name or --output option. It<span class="token string">&#39;s most useful in
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B83\u80FD\u591F\u6309\u7167\u6307\u5B9A\u7684\u683C\u5F0F\u6253\u5370\u67D0\u4E9B\u4FE1\u606F\uFF0C\u91CC\u9762\u53EF\u4EE5\u4F7F\u7528\u67D0\u4E9B\u7279\u5B9A\u7684\u53D8\u91CF\uFF0C\u800C\u4E14\u652F\u6301 \\n\u3001\\t\u548C \\r \u8F6C\u4E49\u5B57\u7B26\u3002\u63D0\u4F9B\u7684\u53D8\u91CF\u5F88\u591A\uFF0C\u6BD4\u5982 status_code\u3001local_port\u3001size_download \u7B49\u7B49\uFF0C\u8FD9\u7BC7\u6587\u7AE0\u6211\u4EEC\u53EA\u5173\u6CE8\u548C\u8BF7\u6C42\u65F6\u95F4\u6709\u5173\u7684\u53D8\u91CF\uFF08\u4EE5 time_ \u5F00\u5934\u7684\u53D8\u91CF\uFF09\u3002 \u5148\u5F80\u6587\u672C\u6587\u4EF6 curl-format.txt \u5199\u5165\u4E0B\u9762\u7684\u5185\u5BB9</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u279C  ~ <span class="token function">cat</span> curl-format.txt
    time_namelookup:  %<span class="token punctuation">{</span>time_namelookup<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
       time_connect:  %<span class="token punctuation">{</span>time_connect<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
    time_appconnect:  %<span class="token punctuation">{</span>time_appconnect<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
      time_redirect:  %<span class="token punctuation">{</span>time_redirect<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
   time_pretransfer:  %<span class="token punctuation">{</span>time_pretransfer<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
 time_starttransfer:  %<span class="token punctuation">{</span>time_starttransfer<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
                    ----------<span class="token punctuation">\\</span>n
         time_total:  %<span class="token punctuation">{</span>time_total<span class="token punctuation">}</span><span class="token punctuation">\\</span>n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u90A3\u4E48\u8FD9\u4E9B\u53D8\u91CF\u90FD\u662F\u4EC0\u4E48\u610F\u601D\u5462\uFF1F\u6211\u89E3\u91CA\u4E00\u4E0B\uFF1A</p><p>time_namelookup\uFF1ADNS \u57DF\u540D\u89E3\u6790\u7684\u65F6\u5019\uFF0C\u5C31\u662F\u628A<code>https://zhihu.com</code> \u8F6C\u6362\u6210 ip \u5730\u5740\u7684\u8FC7\u7A0B time_connect\uFF1ATCP \u8FDE\u63A5\u5EFA\u7ACB\u7684\u65F6\u95F4\uFF0C\u5C31\u662F\u4E09\u6B21\u63E1\u624B\u7684\u65F6\u95F4 time_appconnect\uFF1ASSL/SSH \u7B49\u4E0A\u5C42\u534F\u8BAE\u5EFA\u7ACB\u8FDE\u63A5\u7684\u65F6\u95F4\uFF0C\u6BD4\u5982 connect/handshake \u7684\u65F6\u95F4 time_redirect\uFF1A\u4ECE\u5F00\u59CB\u5230\u6700\u540E\u4E00\u4E2A\u8BF7\u6C42\u4E8B\u52A1\u7684\u65F6\u95F4 time_pretransfer\uFF1A\u4ECE\u8BF7\u6C42\u5F00\u59CB\u5230\u54CD\u5E94\u5F00\u59CB\u4F20\u8F93\u7684\u65F6\u95F4 time_starttransfer\uFF1A\u4ECE\u8BF7\u6C42\u5F00\u59CB\u5230\u7B2C\u4E00\u4E2A\u5B57\u8282\u5C06\u8981\u4F20\u8F93\u7684\u65F6\u95F4 time_total\uFF1A\u8FD9\u6B21\u8BF7\u6C42\u82B1\u8D39\u7684\u5168\u90E8\u65F6\u95F4 \u6211\u4EEC\u5148\u770B\u770B\u4E00\u4E2A\u7B80\u5355\u7684\u8BF7\u6C42\uFF0C\u6CA1\u6709\u91CD\u5B9A\u5411\uFF0C\u4E5F\u6CA1\u6709 SSL \u534F\u8BAE\u7684\u65F6\u95F4\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u279C  ~ <span class="token function">curl</span> -w <span class="token string">&quot;@curl-format.txt&quot;</span> -o /dev/null -s -L <span class="token string">&quot;http://cizixs.com&quot;</span>
    time_namelookup:  <span class="token number">0.012</span>
       time_connect:  <span class="token number">0.227</span>
    time_appconnect:  <span class="token number">0.000</span>
      time_redirect:  <span class="token number">0.000</span>
   time_pretransfer:  <span class="token number">0.227</span>
 time_starttransfer:  <span class="token number">0.443</span>
                    ----------
         time_total:  <span class="token number">0.867</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\u8FD9\u6B21\u8BF7\u6C42\u5404\u4E2A\u6B65\u9AA4\u7684\u65F6\u95F4\u90FD\u6253\u5370\u51FA\u6765\u4E86\uFF0C\u6BCF\u4E2A\u6570\u5B57\u7684\u5355\u4F4D\u90FD\u662F\u79D2\uFF08seconds\uFF09\uFF0C\u8FD9\u6837\u53EF\u4EE5\u5206\u6790\u54EA\u4E00\u6B65\u6BD4\u8F83\u8017\u65F6\uFF0C\u65B9\u4FBF\u5B9A\u4F4D\u95EE\u9898\u3002\u8FD9\u4E2A\u547D\u4EE4\u5404\u4E2A\u53C2\u6570\u7684\u610F\u4E49\uFF1A</p><p>-w\uFF1A\u4ECE\u6587\u4EF6\u4E2D\u8BFB\u53D6\u8981\u6253\u5370\u4FE1\u606F\u7684\u683C\u5F0F -o /dev/null\uFF1A\u628A\u54CD\u5E94\u7684\u5185\u5BB9\u4E22\u5F03\uFF0C\u56E0\u4E3A\u6211\u4EEC\u8FD9\u91CC\u5E76\u4E0D\u5173\u5FC3\u5B83\uFF0C\u53EA\u5173\u5FC3\u8BF7\u6C42\u7684\u8017\u65F6\u60C5\u51B5 -s\uFF1A\u4E0D\u8981\u6253\u5370\u8FDB\u5EA6\u6761 \u4ECE\u8FD9\u4E2A\u8F93\u51FA\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7B97\u51FA\u5404\u4E2A\u6B65\u9AA4\u7684\u65F6\u95F4\uFF1A</p><p>DNS \u67E5\u8BE2\uFF1A12ms TCP \u8FDE\u63A5\u65F6\u95F4\uFF1Apretransfter(227) - namelookup(12) = 215ms \u670D\u52A1\u5668\u5904\u7406\u65F6\u95F4\uFF1Astarttransfter(443) - pretransfer(227) = 216ms \u5185\u5BB9\u4F20\u8F93\u65F6\u95F4\uFF1Atotal(867) - starttransfer(443) = 424ms \u6765\u4E2A\u6BD4\u8F83\u590D\u6742\u7684\uFF0C\u8BBF\u95EE\u67D0\u5EA6\u9996\u9875\uFF0C\u5E26\u6709\u4E2D\u95F4\u6709\u91CD\u5B9A\u5411\u548C SSL \u534F\u8BAE\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u279C  ~ <span class="token function">curl</span> -w <span class="token string">&quot;@curl-format.txt&quot;</span> -o /dev/null -s -L <span class="token string">&quot;https://baidu.com&quot;</span>
    time_namelookup:  <span class="token number">0.012</span>
       time_connect:  <span class="token number">0.018</span>
    time_appconnect:  <span class="token number">0.328</span>
      time_redirect:  <span class="token number">0.356</span>
   time_pretransfer:  <span class="token number">0.018</span>
 time_starttransfer:  <span class="token number">0.027</span>
                    ----------
         time_total:  <span class="token number">0.384</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230 time_appconnect \u548C time_redirect \u90FD\u4E0D\u662F 0 \u4E86\uFF0C\u5176\u4E2D SSL \u534F\u8BAE\u5904\u7406\u65F6\u95F4\u4E3A 328-18=310ms\u3002\u800C\u4E14 pretransfer \u548C starttransfer \u7684\u65F6\u95F4\u90FD\u7F29\u77ED\u4E86\uFF0C\u8FD9\u662F\u91CD\u5B9A\u5411\u4E4B\u540E\u8BF7\u6C42\u7684\u65F6\u95F4\u3002</p>`,16);function b(f,_){const s=r("ExternalLinkIcon");return i(),l("div",null,[d,e("ul",null,[e("li",null,[e("a",u,[p,t(s)])]),e("li",null,[e("a",m,[v,t(s)])])]),h])}var g=a(c,[["render",b],["__file","Curl.html.vue"]]);export{g as default};
