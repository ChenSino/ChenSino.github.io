import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as t,c as d,a as e,b as n,d as l,e as r}from"./app-COSs6b7v.js";const c={},u=r(`<h2 id="集中常用的防火墙配置工具" tabindex="-1"><a class="header-anchor" href="#集中常用的防火墙配置工具"><span>集中常用的防火墙配置工具</span></a></h2><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> netfilter
    集成在linux内核中
<span class="token list punctuation">2.</span> iptables
    比较底层的，基于 Netfilter 

<span class="token list punctuation">3.</span> ufw
    基于iptables

<span class="token list punctuation">4.</span> gufw 
    基于ufw的图形化客户端
<span class="token list punctuation">5.</span> firewalld
    底层也生成一个iptables表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关系图" tabindex="-1"><a class="header-anchor" href="#关系图"><span>关系图</span></a></h2><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230804165315.png" alt="20230804165315"></p><p>总结：</p><ol><li>netfilter是集成的linux内核的控制网络数据包的</li><li>iptables是提供给用户来操作linux内核，通过控制netfilter实现数据包管理，有点类似我们可以用shell来控制内核</li><li>ufw和firewalld是基于iptables的，简化了iptables的操作，因为直接操作iptables太复杂了</li><li>gufw是基于ufw的一个图形化管理工具，在ufw上更简化了操作</li></ol><h2 id="chatgpt中的回答" tabindex="-1"><a class="header-anchor" href="#chatgpt中的回答"><span>chatgpt中的回答</span></a></h2><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> iptables底层原理?</span>

iptables 是 Linux 系统上用于设置和管理防火墙规则的工具。它基于 Netfilter 框架，通过处理网络数据包来实现数据包过滤、网络地址转换（NAT）、端口转发等功能。下面是 iptables 的底层原理：

Netfilter 框架：Netfilter 是 Linux 内核中的一个网络数据包过滤框架，它允许在数据包通过网络协议栈时拦截、修改或丢弃这些数据包。Netfilter 使用钩子函数（hook function）机制，在数据包经过特定的处理点时触发执行用户定义的操作。

表（Table）：iptables 使用表来组织和管理规则。一个表是一种特定类型的规则集合，每个表都有不同的目的和功能。常见的表包括 filter 表（默认表，用于过滤数据包）、nat 表（用于地址转换）和 mangle 表（用于修改数据包头部信息）等。

链（Chain）：表由一系列链组成，每个链包含一组规则。链定义了数据包的流动路径，并确定了在某个处理点上执行的操作。常见的链包括 INPUT（接收进入系统的数据包）、FORWARD（转发数据包）和OUTPUT（发送离开系统的数据包）等。

规则（Rule）：规则是 iptables 最基本的单位，用于定义针对数据包的操作。每个规则包含一个匹配条件和一个动作，当数据包与匹配条件相符时，将执行指定的动作。匹配条件可以基于源/目标 IP 地址、端口、协议等各种属性。

表的优先级：iptables 规则按照表和链的顺序逐一匹配。一旦找到匹配的规则，将执行该规则指定的动作并结束处理流程。如果没有匹配的规则，将根据默认策略（默认允许或默认拒绝）来处理数据包。

动作：规则可以指定多种动作，如 ACCEPT（接受数据包）、DROP（丢弃数据包）、REJECT（拒绝数据包并发送响应）等。动作还可以包括跳转到其他链，以实现复杂的规则组合和处理流程。

状态跟踪：iptables 可以通过状态跟踪功能追踪网络连接的状态。它能够自动识别已建立的连接，并允许相关的数据包通过防火墙。

总体而言，iptables 是基于 Netfilter 框架的工具，通过使用表、链和规则来设置和管理防火墙规则。它利用钩子函数机制在数据包经过特定处理点时触发执行操作。iptables 的底层原理包括对数据包进行匹配、执行动作，并使用状态跟踪来管理网络连接的状态。

<span class="token title important"><span class="token punctuation">#</span> ufw 原理?</span>
UFW（Uncomplicated Firewall）是一个简化了 iptables 的前端工具，用于设置和管理防火墙规则。它在底层仍然使用 iptables，因此其原理与 iptables 类似。

下面是 UFW 的一般工作原理：

简化的命令接口：UFW 提供了一个更简单的命令行接口，用于配置和管理防火墙规则。它抽象出了许多 iptables 复杂的命令和选项，提供了简单易用的命令来管理规则。

配置文件：UFW 使用一个配置文件来存储规则。默认情况下，该文件位于 /etc/ufw 目录下，名为 ufw.conf。管理员可以通过编辑该配置文件来定义自定义的规则，以及指定默认的防火墙策略。

默认规则：UFW 具有默认的规则集，包括允许、拒绝和限制等。这些默认规则可以在配置文件中进行设置，并在没有匹配到其他规则时生效。管理员可以根据需要修改默认规则。

应用规则：管理员可以使用 UFW 提供的命令来创建、删除或修改规则。这些命令会将规则添加到底层的 iptables 中，或从 iptables 中删除规则。UFW 提供了一些简单易记的命令，如 ufw allow、ufw deny、ufw limit 等。

规则顺序和优先级：UFW 中的规则是按照其在配置文件中的顺序依次应用的。因此，规则的顺序非常重要。当数据包到达时，它们会按照规则的顺序进行匹配，直到找到第一个匹配的规则。因此，更具体的规则和需要更高优先级的规则应该放在前面。

系统状态：UFW 还考虑了系统的状态，如默认规则是否适用于入站和出站流量、网络接口是否启用等。根据这些条件，UFW 可以自动调整规则，以确保防火墙策略符合系统的实际需求。

总体而言，UFW 是一个简化了 iptables 的工具，通过提供简单易用的命令和配置文件来管理防火墙规则。它使用底层的 iptables 来实际处理网络数据包的过滤和控制，但隐藏了复杂的 iptables 命令和选项，使得管理员可以更轻松地配置和管理防火墙。

<span class="token title important"><span class="token punctuation">#</span> firewalld原理?</span>
Firewalld 是一个动态防火墙管理器，用于配置和管理网络防火墙规则。它是为了替代 iptables 且更加灵活而开发的。下面是 Firewalld 的一般工作原理：

基于 &quot;zones&quot; 和 &quot;services&quot;：Firewalld 使用&quot;zones&quot;和&quot;services&quot;的概念来管理规则。每个网络接口都可以分配给一个特定的 zone，而每个服务都可以分配给一个或多个 zone。Zone 定义了一组预定义规则，以及允许或拒绝特定服务的访问。

动态更新规则：Firewalld 具有动态更新规则的能力，这意味着在运行时可以添加、删除或修改规则，而无需重新加载整个防火墙配置。这样可以实现实时更新防火墙策略，而不会中断网络连接。

自动追踪连接状态：Firewalld 可以自动追踪网络连接的状态。它使用 NetworkManager 或直接监控网络接口来识别新的连接，并将其分类为已建立（established）、相关（related）或新的（new）连接。这样可以根据连接状态应用适当的规则。

rich rules：除了基本的端口和地址规则外，Firewalld 还支持 &quot;rich rules&quot;，这是一种更复杂和灵活的规则语法。使用 rich rules，可以根据协议、源和目标地址、端口范围等更精细地定义规则。

D-Bus 接口：Firewalld 提供了一个 D-Bus 接口，允许其他应用程序通过该接口与防火墙交互。这样可以实现与其他系统组件的集成，并使用 Firewalld 的功能进行安全策略管理。

命令行工具和图形界面：Firewalld 提供了命令行工具（firewall-cmd）和图形界面（firewall-config），用于配置和管理防火墙规则。可以使用这些工具来添加、删除和修改规则，管理 zone 和服务，查看和监控防火墙状态。

总体而言，Firewalld 是一个动态的防火墙管理器，基于 zones 和 services 的概念来管理规则。它支持动态更新规则、自动追踪连接状态，并提供了丰富的规则语法和 D-Bus 接口。通过命令行工具和图形界面，管理员可以方便地配置和管理防火墙策略。
<span class="token title important"><span class="token punctuation">#</span> ufw iptables的关系?</span>

UFW（Uncomplicated Firewall）是一个基于 iptables 的前端工具，用于简化 iptables 的配置和管理。它提供了一个用户友好的接口，使得非专业用户可以更轻松地设置和管理防火墙规则。下面是 UFW 和 iptables 之间的关系：

UFW 使用 iptables：UFW 在底层使用 iptables 工具集来实际处理网络数据包的过滤和控制。它利用 iptables 提供的功能来创建、删除和修改防火墙规则，以及进行网络地址转换（NAT）和端口转发等操作。

简化的配置：UFW 提供了一种更简化的方式来配置和管理防火墙规则。它抽象了 iptables 复杂的语法和选项，并提供了易于理解和使用的命令行接口。用户只需要使用简单的命令就可以设置规则，而不必直接操作 iptables 的命令和参数。

预定义的应用程序配置：UFW 还提供了对常见应用程序（如 SSH、HTTP、HTTPS）的预定义配置，使用户可以轻松地允许或拒绝与这些应用程序相关的网络流量。这样，用户无需了解具体的端口和协议，只需使用简单的命令设置规则。

状态管理：UFW 具有状态管理功能，可以跟踪网络连接的状态。它可以识别已建立的连接并允许相关的数据包通过防火墙。这样，用户无需手动配置复杂的规则来允许返回流量。

总结来说，UFW 是基于 iptables 的前端工具，旨在简化 iptables 的配置和管理。它使用 iptables 来实际处理网络数据包，并提供了更简单的接口和命令行工具来设置和管理防火墙规则。UFW 还提供了预定义的应用程序配置和状态管理功能，使用户可以更轻松地保护系统。

<span class="token title important"><span class="token punctuation">#</span> firewalld和iptables关系?</span>

Firewalld 和 iptables 是 Linux 系统上用于配置和管理防火墙的两个工具，它们之间存在以下关系：

Firewalld 是更高级的管理工具：Firewalld 是 Red Hat 系统中默认使用的防火墙管理工具，它提供了一个动态管理防火墙规则的接口。相比之下，iptables 是传统的静态防火墙规则管理工具。

Firewalld 使用 iptables：Firewalld 在底层使用 iptables 工具集来实际处理网络数据包的过滤和控制。它利用 iptables 提供的功能来创建、删除和修改防火墙规则，以及进行网络地址转换（NAT）和端口转发等操作。

高级功能和灵活性：Firewalld 提供了一些高级功能，如动态更新规则、支持网络区域的概念、服务和应用程序的定义等。它还支持直接对连接进行控制，而不仅仅是基于单个数据包的过滤。这些功能使得 Firewalld 更加灵活和适应复杂的网络环境。

兼容性：Firewalld 是在 iptables 之上构建的，因此它与 iptables 规则兼容。这意味着可以在 Firewalld 中使用 iptables 的规则，也可以将已经存在的 iptables 规则迁移到 Firewalld 中。

总结起来，Firewalld 是一个更高级和动态的防火墙管理工具，它在底层使用 iptables 工具集来实际处理网络数据包。Firewalld 提供了一些高级功能和灵活性，以满足复杂的网络环境需求，并与 iptables 规则兼容。

<span class="token title important"><span class="token punctuation">#</span> 是否所有的防火墙软件都需要用到iptables？</span>
不是所有的防火墙软件都需要使用 iptables。iptables 是 Linux 操作系统上一个功能强大的防火墙工具，它提供了对网络数据包进行过滤和控制的能力。一些防火墙软件使用 iptables 作为底层技术来实现防火墙功能，例如 Firewalld、UFW 等。

然而，也有其他防火墙软件不依赖于 iptables。例如，nftables 是一个新一代的 Linux 内核防火墙框架，它取代了传统的 iptables/iptables6 工具集。一些防火墙软件可能使用 nftables 作为底层技术，而不是 iptables。

此外，还有一些商业防火墙软件、硬件防火墙等，并不直接使用 iptables 或 nftables，而是采用自己独立开发的防火墙引擎来实现网络安全功能。

因此，并非所有的防火墙软件都需要使用 iptables，这取决于具体的防火墙实现和技术选型。不同的防火墙软件可能选择不同的底层技术来实现其功能。

<span class="token title important"><span class="token punctuation">#</span> firewalld到底是基于iptables还是nftables？</span>
Firewalld 是基于 nftables 技术的防火墙管理工具。从 Firewalld 0.6.0 版本开始，默认使用 nftables 作为底层防火墙规则引擎，而不再使用传统的 iptables。这意味着 Firewalld 在处理网络数据包过滤和控制时使用的是 nftables。

Firewalld 使用 nftables 提供的更强大和灵活的规则语言来配置和管理防火墙规则。它支持动态更新规则、定义网络区域、服务和应用程序，以及进行网络地址转换（NAT）、端口转发等操作。

需要注意的是，Firewalld 中仍然可以通过与 iptables 兼容的方式配置规则。它提供了一个兼容层，允许使用 iptables 规则语法在 nftables 上运行，以便逐步过渡到 nftables，并保留使用 iptables 的规则配置。这种兼容层在后台将 iptables 规则转换为 nftables 规则。

总结起来，Firewalld 是基于 nftables 技术的防火墙管理工具，在默认情况下使用 nftables 作为底层防火墙规则引擎。但它仍然兼容 iptables 规则，并提供了过渡和转换机制。
<span class="token title important"><span class="token punctuation">#</span> ufw能否使用nftables</span>
是的，从 UFW (Uncomplicated Firewall) 版本 0.35 开始，它开始支持 nftables 作为底层技术来实现防火墙功能。在之前的版本中，UFW 使用的是 iptables。

通过在 UFW 的配置文件中设置 IPV6=yes 和 IPT_BACKEND=nftables，可以启用 nftables 支持。这样，UFW 将使用 nftables 来管理 IPv6 规则，而不再使用 iptables。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><ol><li>如果想用界面操作，直接选择gufw,另外firewall也提供有界面</li><li>命令行操作可以使用ufw，或者wirewall,二选一就行了，他俩都是可以操作iptables或者nftables,具体使用哪个要自行配置</li><li>如果你是大神，或者你的要求比较高，那么直接使用iptables或者nftables</li></ol><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,11),v={href:"https://www.zsythink.net/archives/category/%e8%bf%90%e7%bb%b4%e7%9b%b8%e5%85%b3/iptables",target:"_blank",rel:"noopener noreferrer"},p={href:"https://help.ubuntu.com/community/UFW",target:"_blank",rel:"noopener noreferrer"};function b(o,m){const i=a("ExternalLinkIcon");return t(),d("div",null,[u,e("p",null,[e("a",v,[n("iptables详解"),l(i)])]),e("p",null,[e("a",p,[n("ufw"),l(i)])])])}const w=s(c,[["render",b],["__file","firewall.html.vue"]]),g=JSON.parse('{"path":"/other/linux/firewall.html","title":"linux中防火墙","lang":"zh-CN","frontmatter":{"title":"linux中防火墙","date":"2023-08-04T00:00:00.000Z","isOriginal":true,"description":"集中常用的防火墙配置工具 关系图 20230804165315 总结： netfilter是集成的linux内核的控制网络数据包的 iptables是提供给用户来操作linux内核，通过控制netfilter实现数据包管理，有点类似我们可以用shell来控制内核 ufw和firewalld是基于iptables的，简化了iptables的操作，因为直接...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/blog/other/linux/firewall.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"linux中防火墙"}],["meta",{"property":"og:description","content":"集中常用的防火墙配置工具 关系图 20230804165315 总结： netfilter是集成的linux内核的控制网络数据包的 iptables是提供给用户来操作linux内核，通过控制netfilter实现数据包管理，有点类似我们可以用shell来控制内核 ufw和firewalld是基于iptables的，简化了iptables的操作，因为直接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230804165315.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2023-08-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux中防火墙\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230804165315.png\\"],\\"datePublished\\":\\"2023-08-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"集中常用的防火墙配置工具","slug":"集中常用的防火墙配置工具","link":"#集中常用的防火墙配置工具","children":[]},{"level":2,"title":"关系图","slug":"关系图","link":"#关系图","children":[]},{"level":2,"title":"chatgpt中的回答","slug":"chatgpt中的回答","link":"#chatgpt中的回答","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1691138420000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":3}]},"readingTime":{"minutes":12.55,"words":3765},"filePathRelative":"other/linux/firewall.md","localizedDate":"2023年8月4日","excerpt":"<h2>集中常用的防火墙配置工具</h2>\\n<div class=\\"language-markdown\\" data-ext=\\"md\\" data-title=\\"md\\"><pre class=\\"language-markdown\\"><code><span class=\\"token list punctuation\\">1.</span> netfilter\\n    集成在linux内核中\\n<span class=\\"token list punctuation\\">2.</span> iptables\\n    比较底层的，基于 Netfilter \\n\\n<span class=\\"token list punctuation\\">3.</span> ufw\\n    基于iptables\\n\\n<span class=\\"token list punctuation\\">4.</span> gufw \\n    基于ufw的图形化客户端\\n<span class=\\"token list punctuation\\">5.</span> firewalld\\n    底层也生成一个iptables表\\n</code></pre></div>","autoDesc":true}');export{w as comp,g as data};
