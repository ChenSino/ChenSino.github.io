---
title: Curl命令
date:  2022-08-12
author: chenkun
keys:
category:
  - linux
tag:
  - linux
---

## 1、使用CURL分析接口请求耗时

- [本博客参考](https://cizixs.com/2017/04/11/use-curl-to-analyze-request/)  
- [本博客参考](https://blog.josephscott.org/2011/10/14/timing-details-with-curl/)  

> 在服务器上发送请求一般用四字命令`curl`，本博客记录一下如何用curl测试接口耗时

### 1.1 构造curl命令

浏览器提供了快速构建各种curl请求的方式，直接复制，有需要再编辑即可
![构造curl](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220812173254.png)

### 1.2、分析耗时

使用`curl`的-w选项，其手册如下：

```bash
-w, --write-out <format>
              Defines  what  to  display  on  stdout after a completed and successful operation. The format is a string that may contain plain text mixed with any number of variables. The string can be
              specified as "string", to get read from a particular file you specify it "@filename" and to tell curl to read the format from stdin you write "@-".

              The variables present in the output format will be substituted by the value or text that curl thinks fit, as described below. All variables are specified as %{variable_name} and to output
              a normal % you just write them as %%. You can output a newline by using \n, a carriage return with \r and a tab space with \t.

              NOTE: The %-symbol is a special symbol in the win32-environment, where all occurrences of % must be doubled when using this option.

              The variables available are:

              content_type   The Content-Type of the requested document, if there was any.

              filename_effective
                             The  ultimate  filename  that  curl writes out to. This is only meaningful if curl is told to write to a file with the --remote-name or --output option. It's most useful in
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

              url_effective  The URL that was fetched last. This is most meaningful if you've told curl to follow location: headers.

       If this option is used several times, the last one will be used.
```

它能够按照指定的格式打印某些信息，里面可以使用某些特定的变量，而且支持 \n、\t和 \r 转义字符。提供的变量很多，比如 status_code、local_port、size_download 等等，这篇文章我们只关注和请求时间有关的变量（以 time_ 开头的变量）。
先往文本文件 curl-format.txt 写入下面的内容

```shell
➜  ~ cat curl-format.txt
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
      time_redirect:  %{time_redirect}\n
   time_pretransfer:  %{time_pretransfer}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
```

那么这些变量都是什么意思呢？我解释一下：

time_namelookup：DNS 域名解析的时候，就是把`https://zhihu.com` 转换成 ip 地址的过程
time_connect：TCP 连接建立的时间，就是三次握手的时间
time_appconnect：SSL/SSH 等上层协议建立连接的时间，比如 connect/handshake 的时间
time_redirect：从开始到最后一个请求事务的时间
time_pretransfer：从请求开始到响应开始传输的时间
time_starttransfer：从请求开始到第一个字节将要传输的时间
time_total：这次请求花费的全部时间
我们先看看一个简单的请求，没有重定向，也没有 SSL 协议的时间：

```shell
➜  ~ curl -w "@curl-format.txt" -o /dev/null -s -L "http://cizixs.com"
    time_namelookup:  0.012
       time_connect:  0.227
    time_appconnect:  0.000
      time_redirect:  0.000
   time_pretransfer:  0.227
 time_starttransfer:  0.443
                    ----------
         time_total:  0.867
```

可以看到这次请求各个步骤的时间都打印出来了，每个数字的单位都是秒（seconds），这样可以分析哪一步比较耗时，方便定位问题。这个命令各个参数的意义：

-w：从文件中读取要打印信息的格式
-o /dev/null：把响应的内容丢弃，因为我们这里并不关心它，只关心请求的耗时情况
-s：不要打印进度条
从这个输出，我们可以算出各个步骤的时间：

DNS 查询：12ms
TCP 连接时间：pretransfter(227) - namelookup(12) = 215ms
服务器处理时间：starttransfter(443) - pretransfer(227) = 216ms
内容传输时间：total(867) - starttransfer(443) = 424ms
来个比较复杂的，访问某度首页，带有中间有重定向和 SSL 协议：

```shell
➜  ~ curl -w "@curl-format.txt" -o /dev/null -s -L "https://baidu.com"
    time_namelookup:  0.012
       time_connect:  0.018
    time_appconnect:  0.328
      time_redirect:  0.356
   time_pretransfer:  0.018
 time_starttransfer:  0.027
                    ----------
         time_total:  0.384
```
可以看到 time_appconnect 和 time_redirect 都不是 0 了，其中 SSL 协议处理时间为 328-18=310ms。而且 pretransfer 和 starttransfer 的时间都缩短了，这是重定向之后请求的时间。
