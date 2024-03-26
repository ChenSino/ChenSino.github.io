import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o,c,a as s,b as n,d as t,e as l}from"./app-eaM1OiHO.js";const i={},u={href:"https://zhuanlan.zhihu.com/p/115912936",target:"_blank",rel:"noopener noreferrer"},r={href:"https://www.zhihu.com/people/duan-pan-ykjym",target:"_blank",rel:"noopener noreferrer"},d=l(`<h2 id="_1、从tcp发送数据的流程说起" tabindex="-1"><a class="header-anchor" href="#_1、从tcp发送数据的流程说起"><span>1、从TCP发送数据的流程说起</span></a></h2><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>所有的系统I/O都分为两个阶段：等待就绪和操作。举例来说，读函数，分为等待系统可读和真正的读；同理，写函数分为等待网卡可以写和真正的写。

需要说明的是等待就绪的阻塞是不使用CPU的，是在“空等”；而真正的读写操作的阻塞是使用CPU的，真正在”干活”，而且这个过程非常快，属于memory copy，带宽通常在1GB/s级别以上，可以理解为基本不耗时。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要深入的理解各种IO模型，那么必须先了解下产生各种IO的原因是什么，要知道这其中的本质问题那么我们就必须要知道一条消息是如何从一个人发送到另外一个人的；</p><p>以两个应用程序通讯为例，我们来了解一下当“A”向&quot;B&quot; 发送一条消息，简单来说会经过如下流程：</p><p>第一步：应用A把消息发送到 TCP发送缓冲区。</p><p>第二步： TCP发送缓冲区再把消息发送出去，经过网络传递后，消息会发送到B服务器的TCP接收缓冲区。</p><p>第三步：B再从TCP接收缓冲区去读取属于自己的数据。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100621.png" alt="20221227100621"></p><p>根据上图我们基本上了解消息发送要经过 应用A、应用A对应服务器的TCP发送缓冲区、经过网络传输后消息发送到了应用B对应服务器TCP接收缓冲区、然后最终B应用读取到消息。</p><p>如果理解了上面的消息发送流程，那么我们下面开始进入文章的主题；</p><h2 id="_2、阻塞io-非阻塞io" tabindex="-1"><a class="header-anchor" href="#_2、阻塞io-非阻塞io"><span>2、阻塞IO |非阻塞IO</span></a></h2><p>们把视角切换到上面图中的第三步， 也就是应用B从TCP缓冲区中读取数据。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100706.png" alt="20221227100706"></p><p>思考一个问题：</p><p>因为应用之间发送消息是间断性的，也就是说在上图中TCP缓冲区还没有接收到属于应用B该读取的消息时，那么此时应用B向TCP缓冲区发起读取申请，TCP接收缓冲区是应该马上告诉应用B 现在没有你的数据，还是说让应用B在这里等着，直到有数据再把数据交给应用B。</p><p>把这个问题应用到第一个步骤也是一样，应用A在向TCP发送缓冲区发送数据时，如果TCP发送缓冲区已经满了，那么是告诉应用A现在没空间了，还是让应用A等待着，等TCP发送缓冲区有空间了再把应用A的数据访拷贝到发送缓冲区。</p><h3 id="_2-1-什么是阻塞io" tabindex="-1"><a class="header-anchor" href="#_2-1-什么是阻塞io"><span>2.1 什么是阻塞IO</span></a></h3><p>如果上面的问题你已经思考过了，那么其实你已经明白了什么是阻塞IO了，所谓阻塞IO就是当应用B发起读取数据申请时，在内核数据没有准备好之前，应用B会一直处于等待数据状态，直到内核把数据准备好了交给应用B才结束。</p><p>术语描述：在应用调用recvfrom读取数据时，其系统调用直到数据包到达且被复制到应用缓冲区中或者发送错误时才返回，在此期间一直会等待，进程从调用到返回这段时间内都是被阻塞的称为阻塞IO；</p><p>流程：</p><p>1、应用进程向内核发起recfrom读取数据。</p><p>2、准备数据报（应用进程阻塞）。</p><p>3、将数据从内核负责到应用空间。</p><p>4、复制完成后，返回成功提示。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100729.png" alt="20221227100729"></p><h4 id="_2-1-1-阻塞io存在的问题" tabindex="-1"><a class="header-anchor" href="#_2-1-1-阻塞io存在的问题"><span>2.1.1 阻塞IO存在的问题</span></a></h4><p>如果IO阻塞了，用户线程会变成阻塞态，此时会让出CPU的使用权限，即使让出CPU使用权，也需要在寄存器中记录用户线程当前的状态（也就是上下文）， 因为要保证，当用户线程恢复执行时能够正常运行（这里就是常说的线程上下文切换），那么问题就产生了。</p><p>线程是很”贵”的资源，主要表现在：</p><ol><li>线程的创建和销毁成本很高，在Linux这样的操作系统中，线程本质上就是一个进程。创建和销毁都是重量级的系统函数</li><li>线程本身占用较大内存，像Java的线程栈，一般至少分配512K～1M的空间，如果系统中的线程数过千，恐怕整个JVM的内存都会被吃掉一半</li><li>线程的切换成本是很高的。操作系统发生线程切换的时候，需要保留线程的上下文，然后执行系统调用。如果线程数过高，可能执行线程切换的时间甚至会大于线程执行的时间，这时候带来的表现往往是系统load偏高、CPU sy使用率特别高（超过20%以上)，导致系统几乎陷入不可用的状态</li><li>容易造成锯齿状的系统负载。因为系统负载是用活动线程数或CPU核心数，一旦线程数量高但外部网络环境不是很稳定，就很容易造成大量请求的结果同时返回，激活大量阻塞线程从而使系统负载压力过大</li></ol><h4 id="_2-1-1-阻塞io模型demo" tabindex="-1"><a class="header-anchor" href="#_2-1-1-阻塞io模型demo"><span>2.1.1 阻塞IO模型demo</span></a></h4><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">InputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">OutputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">ServerSocket</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">Socket</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * io模型——阻塞io,每请求一线程模型
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SocketIOMultiThread</span> <span class="token punctuation">{</span>  <span class="token comment">//blocking</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 服务端开启一个端口进行监听</span>
        <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token number">9999</span><span class="token punctuation">;</span>
        <span class="token class-name">ServerSocket</span> serverSocket <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>   <span class="token comment">//服务端</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            serverSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerSocket</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//通过构造函数创建ServerSocket，指定监听端口，如果端口合法且空闲，服务器就会监听成功</span>

            <span class="token comment">// 通过无限循环监听客户端连接，如果没有客户端接入，则会阻塞在accept操作</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Socket</span> socket<span class="token punctuation">;</span>  <span class="token comment">//客户端</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Waiting for a new Socket to establish&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                socket <span class="token operator">=</span> serverSocket<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//阻塞  三次握手</span>

                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot; a new Socket to established ,port is &quot;</span> <span class="token operator">+</span> socket<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//每连接一线程</span>
                <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                    <span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token class-name">OutputStream</span> out <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        in <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        <span class="token keyword">int</span> length<span class="token punctuation">;</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>length <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//阻塞</span>
                            out <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">String</span> inputString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;input is:&quot;</span> <span class="token operator">+</span> inputString<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;success\\n&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>in <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                in<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>out <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>

                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 必要的清理活动</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>serverSocket <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    serverSocket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-什么是非阻塞io" tabindex="-1"><a class="header-anchor" href="#_2-2-什么是非阻塞io"><span>2.2 什么是非阻塞IO</span></a></h3><p>我敢保证如果你已经理解了阻塞IO，那么必定已经知道了什么是非阻塞IO。按照上面的思路，所谓非阻塞IO就是当应用B发起读取数据申请时，如果内核数据没有准备好会即刻告诉应用B，不会让B在这里等待。</p><p>术语：非阻塞IO是在应用调用recvfrom读取数据时，如果该缓冲区没有数据的话，就会直接返回一个EWOULDBLOCK错误，不会让应用一直等待中。在没有数据的时候会即刻返回错误标识，那也意味着如果应用要读取数据就需要不断的调用recvfrom请求，直到读取到它数据要的数据为止。</p><p>流程：</p><p>1、应用进程向内核发起recvfrom读取数据。</p><p>2、没有数据报准备好，即刻返回EWOULDBLOCK错误码。</p><p>3、应用进程向内核发起recvfrom读取数据。</p><p>4、已有数据包准备好就进行一下 步骤，否则还是返回错误码。</p><p>5、将数据从内核拷贝到用户空间。</p><p>6、完成后，返回成功提示。</p><h2 id="_3、io复用模型" tabindex="-1"><a class="header-anchor" href="#_3、io复用模型"><span>3、IO复用模型</span></a></h2><p>如果你已经明白了非阻塞IO的工作模式，那么接下来我们继续了解IO复用模型的产生原因和思路。</p><p>思考一个问题：</p><p>我们还是把视角放到应用B从TCP缓冲区中读取数据这个环节来。如果在并发的环境下，可能会N个人向应用B发送消息，这种情况下我们的应用就必须创建多个线程去读取数据，每个线程都会自己调用recvfrom 去读取数据。那么此时情况可能如下图：</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100808.png" alt="20221227100808"></p><p>如上图一样，并发情况下服务器很可能一瞬间会收到几十上百万的请求，这种情况下应用B就需要创建几十上百万的线程去读取数据，同时又因为应用线程是不知道什么时候会有数据读取，为了保证消息能及时读取到，那么这些线程自己必须不断的向内核发送recvfrom 请求来读取数据；</p><p>那么问题来了，这么多的线程不断调用recvfrom 请求数据，先不说服务器能不能扛得住这么多线程，就算扛得住那么很明显这种方式是不是太浪费资源了，线程是我们操作系统的宝贵资源，大量的线程用来去读取数据了，那么就意味着能做其它事情的线程就会少。</p><p>所以，有人就提出了一个思路，能不能提供一种方式，可以由一个线程监控多个网络请求（我们后面将称为fd文件描述符，linux系统把所有网络请求以一个fd来标识），这样就可以只需要一个或几个线程就可以完成数据状态询问的操作，当有数据准备就绪之后再分配对应的线程去读取数据，这么做就可以节省出大量的线程资源出来，这个就是IO复用模型的思路。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100820.png" alt="20221227100820"></p><p>正如上图，IO复用模型的思路就是系统提供了一种函数可以同时监控多个fd的操作，这个函数就是我们常说到的select、poll、epoll函数，有了这个函数后，应用线程通过调用select函数就可以同时监控多个fd，select函数监控的fd中只要有任何一个数据状态准备就绪了，select函数就会返回可读状态，这时询问线程再去通知处理数据的线程，对应线程此时再发起recvfrom请求去读取数据。</p><p>术语描述：进程通过将一个或多个fd传递给select，阻塞在select操作上，select帮我们侦测多个fd是否准备就绪，当有fd准备就绪时，select返回数据可读状态，应用程序再调用recvfrom读取数据。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100834.png" alt="20221227100834"></p><p>总结：复用IO的基本思路就是通过slect或poll、epoll 来监控多fd ，来达到不必为每个fd创建一个对应的监控线程，从而减少线程资源创建的目的。</p><h3 id="_3-1-io多路复用模型扩展" tabindex="-1"><a class="header-anchor" href="#_3-1-io多路复用模型扩展"><span>3.1 IO多路复用模型扩展</span></a></h3><p>IO多路复用是利用了系统内核提供的select、poll、epoll等函数来实现的。</p><h4 id="_3-1-1-select" tabindex="-1"><a class="header-anchor" href="#_3-1-1-select"><span>3.1.1 select</span></a></h4><p>select会将TCP中的全连接队列中的Socket对应生成的文件描述符放入到一个集合中，然后复制到内核中，让内核不断去轮询是否有读写事件的产生，一旦有，就把对应的Socket标记为可读/可写，再将全部的文件描述符集合拷贝到用户空间，select函数返回，应用程序需要再一次对文件描述符集合进行遍历，检查是否为可读/可写，对其进行处理。</p><p>具体过程</p><p>其实这里说细一点，就涉及到了操作系统调度和中断知识了~ 当应用进程调用select函数时会陷入内核态，内核程序会去轮询有无产生读写事件的socket，如果没有的话，会将当前应用进程停靠在需要检查的socket的等待队列中（补充：socket的结构有三块：写缓存，读缓存，等待队列），也就是挂起该进程了，CPU切换其他进程运行。 一旦任意一个socket有事件产生，也就是网络数据包到达时，会触发网络数据传输完毕对应的中断，CPU转而执行中断处理程序，分析出该数据包是属于哪个socket，将数据包（根据TCP首部的端口号）放入对应的socket的读缓存中，然后去检查socket的等待队列是否有等待进程，有的话把等待进程移回工作队列中，中断结束。CPU的使用权交还给用户态。刚刚挂起的进程又回到工作队列中，又有机会获得CPU的运行时间片了，然后再次执行select函数，检查是否有读写事件发生的socket，有的话标记为可读，就接下去上面说的步骤啦~</p><p>几个缺点：</p><p>使用固定长度的 BitsMap，表示文件描述符集合，而且所支持的文件描述符的个数是有限制的，在 Linux 系统中，由内核中的 FD_SETSIZE 限制， 默认最大值为 1024，只能监听 0~1023 的文件描述符。 将文件描述符集合从用户态到内核态，有拷贝的开销 当有数据时select就会返回，但是select函数并不知道哪个文件描述符有数据，后面还需要再次对文件描述符进行遍历，效率比较低。</p><h4 id="_3-1-2-poll" tabindex="-1"><a class="header-anchor" href="#_3-1-2-poll"><span>3.1.2 poll</span></a></h4><p>poll是对select的增强。它采用链表的形式来存储文件描述符，突破了select对文件描述符的限制，只受内核内存大小的限制。</p><p>但还是需要经历内核、应用进程对文件描述符集合的遍历检查，内核到应用进程的拷贝开销。</p><h4 id="_3-1-3-epoll" tabindex="-1"><a class="header-anchor" href="#_3-1-3-epoll"><span>3.1.3 epoll</span></a></h4><p>它使用了两种红黑树和就绪链表两种数据结构解决了select/poll的缺点。在Linux2.5.44版本中就使用了这种I/O复用机制。 主要有三个系统调用API： // 内核创建epoll实例，包括红黑树和就绪链表 int epoll_create(int size);</p><p>// 对红黑树进行修改、删除、增加一个socket节点 int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);</p><p>// 内核利用红黑树，快速查找活跃的socket，放入就绪链表 // 再将就绪链表中一定数量的内容拷贝到events int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);<br> 复制代码 首先应用进程调用epoll_create创建epoll实例，同时在内核中建立红黑树和就绪链表； 调用epoll_ctl将会对红黑树增删改一个socket节点：</p><p>ADD 会检查红黑树有无这个socket，有的话加入就绪链表中，没有就会插入该红黑树中维护。 DEL 从epoll实例的各个资源删除。 MOD 会修改对应socket的状态，并再次检查红黑树，有活跃的socket会加入就绪链表中，没有就注册事件回调函数，每当有事件发生时就通过回调函数把这些socket放入就绪链表中。</p><p>epoll_wait会去检查就绪链表有无已经就绪的socket，没有就等待唤醒，有的话就拷贝回用户空间。 由于epoll从内核态仅需要拷贝活跃的socket到用户态，就解决了select/poll的大量socket拷贝开销和无效遍历的缺点。</p><p>适用场景</p><p>并不是说epoll就一定比select/poll好，每种技术都有适合的场景。如果是并发量比较低且socket都比较活跃的情况下，无需创建红黑树和就绪链表的开销，两次遍历的时间开销不会很大并且充分利用了每个遍历节点，所以select/poll会更适合。而如果是高并发且任一时间只有少数socket是活跃的，那epoll会更适合，因为它每次只拷贝活跃的socket到用户态。</p><h2 id="_4、信号驱动io模型" tabindex="-1"><a class="header-anchor" href="#_4、信号驱动io模型"><span>4、信号驱动IO模型</span></a></h2><p>复用IO模型解决了一个线程可以监控多个fd的问题，但是select是采用轮询的方式来监控多个fd的，通过不断的轮询fd的可读状态来知道是否有可读的数据，而无脑的轮询就显得有点暴力，因为大部分情况下的轮询都是无效的，所以有人就想，能不能不要我总是去问你是否数据准备就绪，能不能我发出请求后等你数据准备好了就通知我，所以就衍生了信号驱动IO模型。</p><p>于是信号驱动IO不是用循环请求询问的方式去监控数据就绪状态，而是在调用sigaction时候建立一个SIGIO的信号联系，当内核数据准备好之后再通过SIGIO信号通知线程数据准备好后的可读状态，当线程收到可读状态的信号后，此时再向内核发起recvfrom读取数据的请求，因为信号驱动IO的模型下应用线程在发出信号监控后即可返回，不会阻塞，所以这样的方式下，一个应用线程也可以同时监控多个fd。</p><p>类似于下图描述： <img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100856.png" alt="20221227100856"></p><p>术语描述：首先开启套接口信号驱动IO功能，并通过系统调用sigaction执行一个信号处理函数，此时请求即刻返回，当数据准备就绪时，就生成对应进程的SIGIO信号，通过信号回调通知应用线程调用recvfrom来读取数据。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100909.png" alt="20221227100909"></p><p>总结： IO复用模型里面的select虽然可以监控多个fd了，但select其实现的本质上还是通过不断的轮询fd来监控数据状态， 因为大部分轮询请求其实都是无效的，所以信号驱动IO意在通过这种建立信号关联的方式，实现了发出请求后只需要等待数据就绪的通知即可，这样就可以避免大量无效的数据状态轮询操作。</p><h2 id="_5、异步io" tabindex="-1"><a class="header-anchor" href="#_5、异步io"><span>5、异步IO</span></a></h2><p>其实经过了上面两个模型的优化，我们的效率有了很大的提升，但是我们当然不会就这样满足了，有没有更好的办法，通过观察我们发现，不管是IO复用还是信号驱动，我们要读取一个数据总是要发起两阶段的请求，第一次发送select请求，询问数据状态是否准备好，第二次发送recevform请求读取数据。</p><p>思考一个问题：</p><p>也许你一开始就有一个疑问，为什么我们明明是想读取数据，而却非得要先发起一个select询问数据状态的请求，然后再发起真正的读取数据请求,能不能有一种一劳永逸的方式，我只要发送一个请求我告诉内核我要读取数据，然后我就什么都不管了，然后内核去帮我去完成剩下的所有事情？</p><p>当然既然你想得出来，那么就会有人做得到，有人设计了一种方案，应用只需要向内核发送一个read 请求,告诉内核它要读取数据后即刻返回；内核收到请求后会建立一个信号联系，当数据准备就绪，内核会主动把数据从内核复制到用户空间，等所有操作都完成之后，内核会发起一个通知告诉应用，我们称这种一劳永逸的模式为异步IO模型。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100942.png" alt="20221227100942"></p><p>术语描述： 应用告知内核启动某个操作，并让内核在整个操作完成之后，通知应用，这种模型与信号驱动模型的主要区别在于，信号驱动IO只是由内核通知我们合适可以开始下一个IO操作，而异步IO模型是由内核通知我们操作什么时候完成。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100952.png" alt="20221227100952"></p><p>总结：异步IO的优化思路是解决了应用程序需要先后发送询问请求、发送接收数据请求两个阶段的模式，在异步IO的模式下，只需要向内核发送一次请求就可以完成状态询问和数拷贝的所有操作。</p><h2 id="_6、再谈io模型里面的同步异步" tabindex="-1"><a class="header-anchor" href="#_6、再谈io模型里面的同步异步"><span>6、再谈IO模型里面的同步异步</span></a></h2><p>我们通常会说到同步阻塞IO、同步非阻塞IO，异步IO几种术语，通过上面的内容，那么我想你现在肯定已经理解了什么是阻塞什么是非阻塞了，所谓阻塞就是发起读取数据请求的时，当数据还没准备就绪的时候，这时请求是即刻返回，还是在这里等待数据的就绪，如果需要等待的话就是阻塞，反之如果即刻返回就是非阻塞。</p><p>我们区分了阻塞和非阻塞后再来分别下同步和异步，在IO模型里面如果请求方从发起请求到数据最后完成的这一段过程中都需要自己参与，那么这种我们就称为同步请求；反之，如果应用发送完指令后就不再参与过程了，只需要等待最终完成结果的通知，那么这就属于异步。</p><p>我们再看同步阻塞、同步非阻塞，他们不同的只是发起读取请求的时候一个请求阻塞，一个请求不阻塞，但是相同的是，他们都需要应用自己监控整个数据完成的过程。而为什么只有异步非阻塞 而没有异步阻塞呢，因为异步模型下请求指定发送完后就即刻返回了，没有任何后续流程了，所以它注定不会阻塞，所以也就只会有异步非阻塞模型了。</p><h2 id="_7、tomcat中的io模型" tabindex="-1"><a class="header-anchor" href="#_7、tomcat中的io模型"><span>7、tomcat中的IO模型</span></a></h2><table><thead><tr><th>模型</th><th>描述</th></tr></thead><tbody><tr><td>BIO</td><td>阻塞式IO，即Tomcat使用传统的java.io进行操作。该模式下每个请求都会创建一个线程，对性能开销大，不适合高并发场景。优点是稳定，适合连接数目小且固定架构。</td></tr><tr><td>NIO</td><td>非阻塞式IO，jdk1.4 之后实现的新IO。该模式基于多路复用选择器监测连接状态在通知线程处理，从而达到非阻塞的目的。比传统BIO能更好的支持并发性能。Tomcat 8.0之后默认采用该模式</td></tr><tr><td>APR</td><td>全称是 Apache Portable Runtime/Apache可移植运行库)，是Apache HTTP服务器的支持库。可以简单地理解为，Tomcat将以JNI的形式调用Apache HTTP服务器的核心动态链接库来处理文件读取或网络传输操作。使用需要编译安装APR 库</td></tr><tr><td>AIO</td><td>异步非阻塞式IO，jdk1.7后之支持 。与nio不同在于不需要多路复用选择器，而是请求处理线程执行完程进行回调调知，已继续执行后续操作。Tomcat 8之后支持。</td></tr></tbody></table><h2 id="_8、redis中的io模型" tabindex="-1"><a class="header-anchor" href="#_8、redis中的io模型"><span>8、Redis中的IO模型</span></a></h2><p>IO多路复用-epoll</p><h2 id="_9、nginx中的io模型" tabindex="-1"><a class="header-anchor" href="#_9、nginx中的io模型"><span>9、Nginx中的IO模型</span></a></h2><p>select：IO多路复用、标准并发模型。在编译 nginx 时，如果所使用的系统平台没有更高效的并发模型，select 模块将被自动编译。configure 脚本的选项：–with-select_module 和 --without-select_module 可被用来强制性地开启或禁止 select 模块的编译</p><p>poll:IO多路复用、标准并发模型。与 select 类似，在编译 nginx 时，如果所使用的系统平台没有更高效的并发模型，poll 模块将被自动编译。configure 脚本的选项：–with-poll_module 和 --without-poll_module 可用于强制性地开启或禁止 poll 模块的编译</p><p>epoll:IO多路复用、高效并发模型，可在 Linux 2.6+ 及以上内核可以使用</p><p>kqueue:IO多路复用、高效并发模型，可在 FreeBSD 4.1+, OpenBSD 2.9+, NetBSD 2.0, and Mac OS X 平台中使用</p><p>/dev/poll:高效并发模型，可在 Solaris 7 11/99+, HP/UX 11.22+ (eventport), IRIX 6.5.15+, and Tru64 UNIX 5.1A+ 平台使用</p><p>eventport:高效并发模型，可用于 Solaris 10 平台，PS：由于一些已知的问题，建议 使用/dev/poll替代。</p><p>为什么epoll快？ 比较一下Apache常用的select和Nginx常用的epoll</p><p>select： 1、最大并发数限制，因为一个进程所打开的 FD （文件描述符）是有限制的，由 FD_SETSIZE 设置，默认值是 1024/2048 ，因此 Select 模型的最大并发数就被相应限制了。自己改改这个 FD_SETSIZE ？想法虽好，可是先看看下面吧。 2、效率问题， select 每次调用都会线性扫描全部的 FD 集合，这样效率就会呈现线性下降，把 FD_SETSIZE 改大的后果就是，大家都慢慢来，什么？都超时了。 3、内核 / 用户空间 内存拷贝问题，如何让内核把 FD 消息通知给用户空间呢？在这个问题上 select 采取了内存拷贝方法，在FD非常多的时候，非常的耗费时间。 总结为：1、连接数受限 2、查找配对速度慢 3、数据由内核拷贝到用户态消耗时间</p><p>epoll： 1、Epoll 没有最大并发连接的限制，上限是最大可以打开文件的数目，这个数字一般远大于 2048, 一般来说这个数目和系统内存关系很大 ，具体数目可以 cat /proc/sys/fs/file-max 查看。 2、效率提升， Epoll 最大的优点就在于它只管你“活跃”的连接 ，而跟连接总数无关，因此在实际的网络环境中， Epoll的效率就会远远高于 select 和 poll 。 3、内存共享， Epoll 在这点上使用了“共享内存 ”，这个内存拷贝也省略了。</p><h2 id="_10、java中的io模型" tabindex="-1"><a class="header-anchor" href="#_10、java中的io模型"><span>10、java中的IO模型</span></a></h2><p>提起IO模型大家都知道在java中有io和nio（java1.4+），包括我在内的很多人起初都认为io就是阻塞io模型，nio就是非阻塞的io模型，其实这是完全错误的观点。事实上无论在java中无论使用bio还是nio都可以实现非阻塞io模型。</p>`,109),k=s("a",{href:"%E9%98%BB%E5%A1%9Eio%E6%A8%A1%E5%9E%8B"},"阻塞io模型",-1),m={href:"https://gist.github.com/85f429733200b7c2babddbf008855087",target:"_blank",rel:"noopener noreferrer"},h={href:"https://gist.github.com/083fbe957011ae3c96a7573551e26822",target:"_blank",rel:"noopener noreferrer"},v={href:"https://gist.github.com/fdb70d4ee7b65dd5ee54f4c4df362996",target:"_blank",rel:"noopener noreferrer"},g={href:"https://gist.github.com/53ee1e9aba30fd3319ad94394e2613c3",target:"_blank",rel:"noopener noreferrer"},b={href:"https://gist.github.com/53ee1e9aba30fd3319ad94394e2613c3",target:"_blank",rel:"noopener noreferrer"},f=s("h2",{id:"_10、netty中的io模型",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_10、netty中的io模型"},[s("span",null,"10、netty中的io模型")])],-1);function _(I,O){const a=p("ExternalLinkIcon");return o(),c("div",null,[s("p",null,[n("本文是转载于"),s("a",u,[n("知乎100%弄明白5种IO模型"),t(a)]),n("，原作者"),s("a",r,[n("勤劳的小手"),t(a)]),n("，在原博客基础上整理了其他 与IO模型相关的优质内容。")]),d,s("p",null,[n("在java中，使用io可以实现"),k,n("，也可以实现非阻塞io模型,"),s("a",m,[n("非阻塞io模型-残缺版"),t(a)]),n("、"),s("a",h,[n("非阻塞io模型——新增非阻塞"),t(a)]),n("，"),s("a",v,[n("非阻塞io模型-新增多线程，解决并发请求"),t(a)])]),s("p",null,[n("nio在java.nio这个包中指的是 new io，而在linux系统内核中nio指的是non-blockingio,所以很多人笼统的说nio既可以翻译为new io 也可以翻译为non-blockingio是非常扯淡的，说明他对io根本不了解。"),s("a",g,[n("nio实现io多路复用模型"),t(a)])]),s("p",null,[n("在"),s("a",b,[n("nio实现io多路复用模型"),t(a)]),n("的demo中，仅仅使用一个main线程就实现了并发请求处理")]),f])}const S=e(i,[["render",_],["__file","IO-Model.html.vue"]]),x=JSON.parse('{"path":"/java/advance/IO-Model.html","title":"100%搞懂5中I/O模型","lang":"zh-CN","frontmatter":{"title":"100%搞懂5中I/O模型","date":"2022-12-27T00:00:00.000Z","author":"勤劳的小手","keys":null,"description":"本文是转载于知乎100%弄明白5种IO模型，原作者勤劳的小手，在原博客基础上整理了其他 与IO模型相关的优质内容。 1、从TCP发送数据的流程说起 要深入的理解各种IO模型，那么必须先了解下产生各种IO的原因是什么，要知道这其中的本质问题那么我们就必须要知道一条消息是如何从一个人发送到另外一个人的； 以两个应用程序通讯为例，我们来了解一下当“A”向\\"B...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/advance/IO-Model.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"100%搞懂5中I/O模型"}],["meta",{"property":"og:description","content":"本文是转载于知乎100%弄明白5种IO模型，原作者勤劳的小手，在原博客基础上整理了其他 与IO模型相关的优质内容。 1、从TCP发送数据的流程说起 要深入的理解各种IO模型，那么必须先了解下产生各种IO的原因是什么，要知道这其中的本质问题那么我们就必须要知道一条消息是如何从一个人发送到另外一个人的； 以两个应用程序通讯为例，我们来了解一下当“A”向\\"B..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100621.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"勤劳的小手"}],["meta",{"property":"article:published_time","content":"2022-12-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"100%搞懂5中I/O模型\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100621.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100706.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100729.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100808.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100820.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100834.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100856.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100909.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100942.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221227100952.png\\"],\\"datePublished\\":\\"2022-12-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"勤劳的小手\\"}]}"]]},"headers":[{"level":2,"title":"1、从TCP发送数据的流程说起","slug":"_1、从tcp发送数据的流程说起","link":"#_1、从tcp发送数据的流程说起","children":[]},{"level":2,"title":"2、阻塞IO |非阻塞IO","slug":"_2、阻塞io-非阻塞io","link":"#_2、阻塞io-非阻塞io","children":[{"level":3,"title":"2.1 什么是阻塞IO","slug":"_2-1-什么是阻塞io","link":"#_2-1-什么是阻塞io","children":[]},{"level":3,"title":"2.2 什么是非阻塞IO","slug":"_2-2-什么是非阻塞io","link":"#_2-2-什么是非阻塞io","children":[]}]},{"level":2,"title":"3、IO复用模型","slug":"_3、io复用模型","link":"#_3、io复用模型","children":[{"level":3,"title":"3.1 IO多路复用模型扩展","slug":"_3-1-io多路复用模型扩展","link":"#_3-1-io多路复用模型扩展","children":[]}]},{"level":2,"title":"4、信号驱动IO模型","slug":"_4、信号驱动io模型","link":"#_4、信号驱动io模型","children":[]},{"level":2,"title":"5、异步IO","slug":"_5、异步io","link":"#_5、异步io","children":[]},{"level":2,"title":"6、再谈IO模型里面的同步异步","slug":"_6、再谈io模型里面的同步异步","link":"#_6、再谈io模型里面的同步异步","children":[]},{"level":2,"title":"7、tomcat中的IO模型","slug":"_7、tomcat中的io模型","link":"#_7、tomcat中的io模型","children":[]},{"level":2,"title":"8、Redis中的IO模型","slug":"_8、redis中的io模型","link":"#_8、redis中的io模型","children":[]},{"level":2,"title":"9、Nginx中的IO模型","slug":"_9、nginx中的io模型","link":"#_9、nginx中的io模型","children":[]},{"level":2,"title":"10、java中的IO模型","slug":"_10、java中的io模型","link":"#_10、java中的io模型","children":[]},{"level":2,"title":"10、netty中的io模型","slug":"_10、netty中的io模型","link":"#_10、netty中的io模型","children":[]}],"git":{"createdTime":1672107129000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"chenxk@sonoscape.net","commits":5},{"name":"ChenSino","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":23.01,"words":6903},"filePathRelative":"java/advance/IO-Model.md","localizedDate":"2022年12月27日","excerpt":"<p>本文是转载于<a href=\\"https://zhuanlan.zhihu.com/p/115912936\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">知乎100%弄明白5种IO模型</a>，原作者<a href=\\"https://www.zhihu.com/people/duan-pan-ykjym\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">勤劳的小手</a>，在原博客基础上整理了其他\\n与IO模型相关的优质内容。</p>\\n<h2>1、从TCP发送数据的流程说起</h2>\\n<div class=\\"language-markdown\\" data-ext=\\"md\\" data-title=\\"md\\"><pre class=\\"language-markdown\\"><code>所有的系统I/O都分为两个阶段：等待就绪和操作。举例来说，读函数，分为等待系统可读和真正的读；同理，写函数分为等待网卡可以写和真正的写。\\n\\n需要说明的是等待就绪的阻塞是不使用CPU的，是在“空等”；而真正的读写操作的阻塞是使用CPU的，真正在”干活”，而且这个过程非常快，属于memory copy，带宽通常在1GB/s级别以上，可以理解为基本不耗时。\\n</code></pre></div>","autoDesc":true}');export{S as comp,x as data};