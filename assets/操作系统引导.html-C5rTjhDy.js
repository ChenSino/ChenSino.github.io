import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as i,c as e,e as d}from"./app-yzx2sXBW.js";const s={},t=d(`<h3 id="对应关系" tabindex="-1"><a class="header-anchor" href="#对应关系"><span>对应关系</span></a></h3><table><thead><tr><th></th><th></th><th></th><th>备注</th></tr></thead><tbody><tr><td>固件</td><td>UEFI/EFI</td><td>BIOS</td><td></td></tr><tr><td>分区格式</td><td>GPT</td><td>MBR</td><td></td></tr><tr><td>启动引导程序</td><td>windows:Windows Boot Manager</td><td>linux:GRUB</td><td></td></tr></tbody></table><p>老版本的组合是BIOS+MBR启动引导，BIOS是写在主板中的程序，老版本的引导方式有诸多限制，</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> BIOS和uefi区别</span>

BIOS（基本输入输出系统）和UEFI（统一可扩展固件接口）是两种不同的计算机固件接口，它们在启动计算机时起到了至关重要的作用。以下是BIOS和UEFI之间的主要区别：

启动机制：

BIOS：采用传统的启动方式，读取并执行硬盘上的MBR来启动操作系统。
UEFI：采用模块化的设计，能够直接加载EFI（可扩展固件接口）应用程序，如操作系统加载程序或硬件诊断程序。
图形界面：

BIOS：通常只有基本的文本界面。
UEFI：支持图形用户界面（GUI），操作更为直观和友好。
启动速度：

BIOS：启动过程中需要更多的时间进行硬件检测。
UEFI：启动速度通常更快，因为它能够更加高效地管理硬件启动过程。
硬盘支持：

BIOS：仅支持MBR分区的硬盘，最大支持2TB。
UEFI：支持GPT分区的硬盘，能够支持超过2TB的大容量硬盘。
安全功能：

BIOS：没有内建的安全功能来防止启动过程中的恶意软件攻击。
UEFI：提供安全启动功能，可以防止未签名的驱动程序和操作系统加载，从而提高系统的安全性。
兼容性：

BIOS：与老旧的操作系统和硬件有良好的兼容性。
UEFI：设计用来替代BIOS，与新的操作系统和硬件兼容性更好。
网络支持：

UEFI：可以在没有操作系统的情况下连接网络，进行远程诊断和修复。
综上所述，UEFI是BIOS的现代替代品，它提供了更多的特性和功能，更好地适应了现代计算机技术的发展。随着时间的推移，越来越多的新电脑都采用UEFI作为其固件接口标准。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> MBR和GPT分区的区别</span>

MBR（主引导记录）和GPT（GUID分区表）是两种不同的硬盘分区方案，它们在结构和功能上有以下主要区别：

分区数量限制：

MBR：最多支持4个主分区，或者3个主分区加一个扩展分区，扩展分区内可以包含多个逻辑分区。
GPT：支持多达128个分区（在某些操作系统中可能更多），没有主分区和扩展分区的概念。
硬盘容量支持：

MBR：最大支持2TB的硬盘。
GPT：理论上可以支持超过9.4ZB（Zettabytes）的硬盘。
数据安全性：

MBR：没有冗余或备份，一旦分区表损坏，数据恢复会比较困难。
GPT：包含冗余的分区表和分区表校验，提高了数据的安全性和恢复能力。
兼容性：

MBR：与老旧的BIOS兼容性好。
GPT：与UEFI（统一可扩展固件接口）兼容，是现代计算机的标准。
分区表结构：

MBR：分区表存储在硬盘的第一个扇区，容易受到破坏。
GPT：分区表在硬盘上有多个副本，即使一个损坏也可以使用其他副本恢复。
总的来说，GPT是MBR的改进版，提供了更好的数据安全性、支持更大的硬盘容量和更多的分区数量。随着技术的发展，GPT正逐渐成为新的硬盘分区标准。如果你的计算机支持UEFI启动，那么推荐使用GPT分区方案
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 主分区和扩展分区的区别</span>

主分区（Primary Partition）和扩展分区（Extended Partition）是硬盘上的两种类型的分区，它们的区别主要在于分区结构和用途：

主分区（Primary Partition）：

在一个硬盘上最多可以有四个主分区。
主分区可以直接被操作系统用来安装系统，即可以作为系统启动分区。
每个主分区都是独立的，可以被格式化和分配一个驱动器字母。
通常，操作系统安装在主分区上。
扩展分区（Extended Partition）：

如果需要在一个硬盘上创建超过四个分区，那么可以创建一个扩展分区。
扩展分区本身不可以直接存储文件，它是一种特殊的分区，可以被分割成多个逻辑分区（Logical Partitions）。
在扩展分区内部，可以创建多个逻辑分区，逻辑分区内可以存储文件，可以被格式化和分配驱动器字母。
扩展分区不可以用来直接安装操作系统，但逻辑分区可以用来存储数据。
总的来说，主分区用于安装操作系统或存储数据，而扩展分区是为了突破硬盘上只能有四个分区的限制，可以在其中创建多个逻辑分区来存储数据。扩展分区不能直接安装操作系统，但是它内部的逻辑分区可以用于存储数据。

<span class="token title important"><span class="token punctuation">#</span> GPT分区上不需要扩展分区</span>

是的，使用GUID分区表（GPT）格式的硬盘不再需要扩展分区。GPT是一种新的硬盘分区结构，它是为现代计算机而设计的，用来替代传统的主引导记录（MBR）分区表。

GPT的优点包括：

支持超过2TB的大容量硬盘。
允许创建多达128个分区（在某些操作系统中这个数目可能更多），而不是MBR限制的4个主分区。
每个分区都可以作为启动分区，不存在主分区和扩展分区的区分。
包含冗余的分区表，有助于数据恢复。
分区和分区表中包含的数据结构更加先进和灵活。
因此，在GPT分区表中，你可以直接创建多个分区，而不需要像在MBR分区表中那样划分扩展分区和逻辑分区。这使得磁盘管理更为简单和高效。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),l=[t];function a(r,v){return i(),e("div",null,l)}const u=n(s,[["render",a],["__file","操作系统引导.html.vue"]]),o=JSON.parse('{"path":"/other/essay/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%BC%95%E5%AF%BC.html","title":"系统引导基本名词BIOS/EFI/MBR/GPT/GRUB","lang":"zh-CN","frontmatter":{"title":"系统引导基本名词BIOS/EFI/MBR/GPT/GRUB","date":"2024-04-03T00:00:00.000Z","author":"chensino","publish":true,"isOriginal":true,"description":"对应关系 老版本的组合是BIOS+MBR启动引导，BIOS是写在主板中的程序，老版本的引导方式有诸多限制，","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/essay/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%BC%95%E5%AF%BC.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"系统引导基本名词BIOS/EFI/MBR/GPT/GRUB"}],["meta",{"property":"og:description","content":"对应关系 老版本的组合是BIOS+MBR启动引导，BIOS是写在主板中的程序，老版本的引导方式有诸多限制，"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-03T03:14:35.000Z"}],["meta",{"property":"article:author","content":"chensino"}],["meta",{"property":"article:published_time","content":"2024-04-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-03T03:14:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统引导基本名词BIOS/EFI/MBR/GPT/GRUB\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-03T03:14:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chensino\\"}]}"]]},"headers":[{"level":3,"title":"对应关系","slug":"对应关系","link":"#对应关系","children":[]}],"git":{"createdTime":1712114075000,"updatedTime":1712114075000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":5.29,"words":1586},"filePathRelative":"other/essay/操作系统引导.md","localizedDate":"2024年4月3日","excerpt":"<h3>对应关系</h3>\\n<table>\\n<thead>\\n<tr>\\n<th></th>\\n<th></th>\\n<th></th>\\n<th>备注</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>固件</td>\\n<td>UEFI/EFI</td>\\n<td>BIOS</td>\\n<td></td>\\n</tr>\\n<tr>\\n<td>分区格式</td>\\n<td>GPT</td>\\n<td>MBR</td>\\n<td></td>\\n</tr>\\n<tr>\\n<td>启动引导程序</td>\\n<td>windows:Windows Boot Manager</td>\\n<td>linux:GRUB</td>\\n<td></td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{u as comp,o as data};
