import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as d,c as l,b as e,a as t,d as i,e as a,r}from"./app.41aa8c08.js";const v={},c=e("h2",{id:"\u53C2\u8003",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u53C2\u8003","aria-hidden":"true"},"#"),i(" \u53C2\u8003")],-1),o={href:"https://support.huaweicloud.com/qs-evs/evs_01_0033.html",target:"_blank",rel:"noopener noreferrer"},m=i("\u521D\u59CB\u5316Linux\u6570\u636E\u76D8\uFF08fdisk\uFF09"),u=a(`<h2 id="\u6302\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u6302\u8F7D" aria-hidden="true">#</a> \u6302\u8F7D</h2><h3 id="\u5212\u5206\u5206\u533A\u5E76\u6302\u8F7D\u78C1\u76D8" tabindex="-1"><a class="header-anchor" href="#\u5212\u5206\u5206\u533A\u5E76\u6302\u8F7D\u78C1\u76D8" aria-hidden="true">#</a> \u5212\u5206\u5206\u533A\u5E76\u6302\u8F7D\u78C1\u76D8</h3><p>\u672C\u64CD\u4F5C\u4EE5\u8BE5\u573A\u666F\u4E3A\u4F8B\uFF0C\u5F53\u4E91\u670D\u52A1\u5668\u6302\u8F7D\u4E86\u4E00\u5757\u65B0\u7684\u6570\u636E\u76D8\u65F6\uFF0C\u4F7F\u7528fdisk\u5206\u533A\u5DE5\u5177\u5C06\u8BE5\u6570\u636E\u76D8\u8BBE\u4E3A\u4E3B\u5206\u533A\uFF0C\u5206\u533A\u5F62\u5F0F\u9ED8\u8BA4\u8BBE\u7F6E\u4E3AMBR\uFF0C\u6587\u4EF6\u7CFB\u7EDF\u8BBE\u4E3Aext4\u683C\u5F0F\uFF0C\u6302\u8F7D\u5728\u201C/mnt/sdc\u201D\u4E0B\uFF0C\u5E76\u8BBE\u7F6E\u5F00\u673A\u542F\u52A8\u81EA\u52A8\u6302\u8F7D\u3002</p><ol><li>fdisk -l \u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[root@ecs-test-0001 ~]# fdisk -l

Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bcb4e

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048    83886079    41942016   83  Linux

Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u5F53\u524D\u7684\u4E91\u670D\u52A1\u5668\u6709\u4E24\u5757\u78C1\u76D8\uFF0C\u201C/dev/vda\u201D\u662F\u7CFB\u7EDF\u76D8\uFF0C\u201C/dev/vdb\u201D\u662F\u65B0\u589E\u6570\u636E\u76D8\u3002</p><ol start="2"><li>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u8FDB\u5165fdisk\u5206\u533A\u5DE5\u5177\uFF0C\u5F00\u59CB\u5BF9\u65B0\u589E\u6570\u636E\u76D8\u6267\u884C\u5206\u533A\u64CD\u4F5C\u3002</li></ol><p><strong>fdisk \u65B0\u589E\u6570\u636E\u76D8</strong></p><p>\u4EE5\u65B0\u6302\u8F7D\u7684\u6570\u636E\u76D8\u201C/dev/vdb\u201D\u4E3A\u4F8B\uFF1A</p><p><strong>fdisk /dev/vdb</strong></p><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[root@ecs-test-0001 ~]# fdisk /dev/vdb
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0x38717fc1.

Command (m for help): 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u8F93\u5165\u201Cn\u201D\uFF0C\u6309\u201CEnter\u201D\uFF0C\u5F00\u59CB\u65B0\u5EFA\u5206\u533A\u3002 \u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u78C1\u76D8\u6709\u4E24\u79CD\u5206\u533A\u7C7B\u578B\uFF1A \u201Cp\u201D\u8868\u793A\u4E3B\u5206\u533A\u3002 \u201Ce\u201D\u8868\u793A\u6269\u5C55\u5206\u533A\u3002</p><div class="custom-container note"><p class="custom-container-title">\u8BF4\u660E</p><p>\u78C1\u76D8\u4F7F\u7528MBR\u5206\u533A\u5F62\u5F0F\uFF0C\u6700\u591A\u53EF\u4EE5\u521B\u5EFA4\u4E2A\u4E3B\u5206\u533A\uFF0C\u6216\u80053\u4E2A\u4E3B\u5206\u533A\u52A01\u4E2A\u6269\u5C55\u5206\u533A\uFF0C\u6269\u5C55\u5206\u533A\u4E0D\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\uFF0C\u9700\u8981\u5212\u5206\u6210\u82E5\u5E72\u4E2A\u903B\u8F91\u5206\u533A\u624D\u53EF\u4EE5\u4F7F\u7528\u3002 \u78C1\u76D8\u4F7F\u7528GPT\u5206\u533A\u5F62\u5F0F\u65F6\uFF0C\u6CA1\u6709\u4E3B\u5206\u533A\u3001\u6269\u5C55\u5206\u533A\u4EE5\u53CA\u903B\u8F91\u5206\u533A\u4E4B\u5206\u3002</p></div><ol start="4"><li>\u4EE5\u521B\u5EFA\u4E00\u4E2A\u4E3B\u8981\u5206\u533A\u4E3A\u4F8B\uFF0C\u8F93\u5165\u201Cp\u201D\uFF0C\u6309\u201CEnter\u201D\uFF0C\u5F00\u59CB\u521B\u5EFA\u4E00\u4E2A\u4E3B\u5206\u533A\u3002 \u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Select (default p): p
Partition number (1-4, default 1): 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u201CPartition number\u201D\u8868\u793A\u4E3B\u5206\u533A\u7F16\u53F7\uFF0C\u53EF\u4EE5\u9009\u62E91-4\u3002</p><ol start="5"><li>\u4EE5\u5206\u533A\u7F16\u53F7\u9009\u62E9\u201C1\u201D\u4E3A\u4F8B\uFF0C\u8F93\u5165\u4E3B\u5206\u533A\u7F16\u53F7\u201C1\u201D\uFF0C\u6309\u201CEnter\u201D\u3002 \u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Partition number (1-4, default 1): 1
First sector (2048-209715199, default 2048):
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u201CFirst sector\u201D\u8868\u793A\u8D77\u59CB\u78C1\u67F1\u503C\uFF0C\u53EF\u4EE5\u9009\u62E92048-209715199\uFF0C\u9ED8\u8BA4\u4E3A2048\u3002</p><ol start="6"><li>\u4EE5\u9009\u62E9\u9ED8\u8BA4\u8D77\u59CB\u78C1\u67F1\u503C2048\u4E3A\u4F8B\uFF0C\u6309\u201CEnter\u201D\u3002 \u7CFB\u7EDF\u4F1A\u81EA\u52A8\u63D0\u793A\u5206\u533A\u53EF\u7528\u7A7A\u95F4\u7684\u8D77\u59CB\u78C1\u67F1\u503C\u548C\u622A\u6B62\u78C1\u67F1\u503C\uFF0C\u53EF\u4EE5\u5728\u8BE5\u533A\u95F4\u5185\u81EA\u5B9A\u4E49\uFF0C\u6216\u8005\u4F7F\u7528\u9ED8\u8BA4\u503C\u3002\u8D77\u59CB\u78C1\u67F1\u503C\u5FC5\u987B\u5C0F\u4E8E\u5206\u533A\u7684\u622A\u6B62\u78C1\u67F1\u503C\u3002</li></ol><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>First sector (2048-209715199, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-209715199, default 209715199):
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u201CLast sector\u201D\u8868\u793A\u622A\u6B62\u78C1\u67F1\u503C\uFF0C\u53EF\u4EE5\u9009\u62E92048-209715199\uFF0C\u9ED8\u8BA4\u4E3A209715199\u3002</p><ol start="7"><li>\u4EE5\u9009\u62E9\u9ED8\u8BA4\u622A\u6B62\u78C1\u67F1\u503C209715199\u4E3A\u4F8B\uFF0C\u6309\u201CEnter\u201D\u3002 \u7CFB\u7EDF\u4F1A\u81EA\u52A8\u63D0\u793A\u5206\u533A\u53EF\u7528\u7A7A\u95F4\u7684\u8D77\u59CB\u78C1\u67F1\u503C\u548C\u622A\u6B62\u78C1\u67F1\u503C\uFF0C\u53EF\u4EE5\u5728\u8BE5\u533A\u95F4\u5185\u81EA\u5B9A\u4E49\uFF0C\u6216\u8005\u4F7F\u7528\u9ED8\u8BA4\u503C\u3002\u8D77\u59CB\u78C1\u67F1\u503C\u5FC5\u987B\u5C0F\u4E8E\u5206\u533A\u7684\u622A\u6B62\u78C1\u67F1\u503C\u3002</li></ol><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Last sector, +sectors or +size{K,M,G} (2048-209715199, default 209715199):
Using default value 209715199
Partition 1 of type Linux and of size 100 GiB is set

Command (m for help):
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u5206\u533A\u5B8C\u6210\uFF0C\u5373\u4E3A\u6570\u636E\u76D8\u65B0\u5EFA\u4E861\u4E2A\u5206\u533A\u3002</p><ol start="8"><li>\u8F93\u5165\u201Cp\u201D\uFF0C\u6309\u201CEnter\u201D\uFF0C\u67E5\u770B\u65B0\u5EFA\u5206\u533A\u7684\u8BE6\u7EC6\u4FE1\u606F\u3002 \u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Command (m for help): p

Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x38717fc1

   Device Boot      Start         End      Blocks   Id  System
/dev/vdb1            2048   209715199   104856576   83  Linux

Command (m for help):
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u65B0\u5EFA\u5206\u533A\u201C/dev/vdb1\u201D\u7684\u8BE6\u7EC6\u4FE1\u606F\u3002</p><ol start="9"><li>\u8F93\u5165\u201Cw\u201D\uFF0C\u6309\u201CEnter\u201D\uFF0C\u5C06\u5206\u533A\u7ED3\u679C\u5199\u5165\u5206\u533A\u8868\u4E2D\u3002 \u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u5206\u533A\u521B\u5EFA\u5B8C\u6210\u3002</p><p>\u8BF4\u660E\uFF1A \u5982\u679C\u4E4B\u524D\u5206\u533A\u64CD\u4F5C\u6709\u8BEF\uFF0C\u8BF7\u8F93\u5165\u201Cq\u201D\uFF0C\u5219\u4F1A\u9000\u51FAfdisk\u5206\u533A\u5DE5\u5177\uFF0C\u4E4B\u524D\u7684\u5206\u533A\u7ED3\u679C\u5C06\u4E0D\u4F1A\u88AB\u4FDD\u7559\u3002</p><ol start="10"><li><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u5C06\u65B0\u7684\u5206\u533A\u8868\u53D8\u66F4\u540C\u6B65\u81F3\u64CD\u4F5C\u7CFB\u7EDF\u3002 partprobe</p></li><li><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u5C06\u65B0\u5EFA\u5206\u533A\u6587\u4EF6\u7CFB\u7EDF\u8BBE\u4E3A\u7CFB\u7EDF\u6240\u9700\u683C\u5F0F\u3002 mkfs -t \u6587\u4EF6\u7CFB\u7EDF\u683C\u5F0F /dev/vdb1</p></li></ol><p>\u4EE5\u8BBE\u7F6E\u6587\u4EF6\u7CFB\u7EDF\u4E3A\u201Cext4\u201D\u4E3A\u4F8B\uFF1A</p><p>mkfs -t ext4 /dev/vdb1</p><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[root@ecs-test-0001 ~]# mkfs -t ext4 /dev/vdb1
mke2fs 1.42.9 (28-Dec-2013)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
6553600 inodes, 26214144 blocks
1310707 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=2174746624
800 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000, 7962624, 11239424, 20480000, 23887872

Allocating group tables: done
Writing inode tables: done
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u683C\u5F0F\u5316\u9700\u8981\u7B49\u5F85\u4E00\u6BB5\u65F6\u95F4\uFF0C\u8BF7\u89C2\u5BDF\u7CFB\u7EDF\u8FD0\u884C\u72B6\u6001\uFF0C\u4E0D\u8981\u9000\u51FA\u3002</p><div class="custom-container note"><p class="custom-container-title">\u987B\u77E5</p><p>\u4E0D\u540C\u6587\u4EF6\u7CFB\u7EDF\u652F\u6301\u7684\u5206\u533A\u5927\u5C0F\u4E0D\u540C\uFF0C\u8BF7\u6839\u636E\u60A8\u7684\u4E1A\u52A1\u9700\u6C42\u9009\u62E9\u5408\u9002\u7684\u6587\u4EF6\u7CFB\u7EDF\u3002</p></div><ol start="12"><li><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u65B0\u5EFA\u6302\u8F7D\u76EE\u5F55\u3002 mkdir \u6302\u8F7D\u76EE\u5F55</p></li><li><p>\u4EE5\u65B0\u5EFA\u6302\u8F7D\u76EE\u5F55\u201C/mnt/sdc\u201D\u4E3A\u4F8B\uFF1A</p></li></ol><p>mkdir /mnt/sdc</p><div class="custom-container note"><p class="custom-container-title">\u8BF4\u660E</p><p>Linux\u7CFB\u7EDF\u9ED8\u8BA4\u5E26\u6709/mnt\u76EE\u5F55\uFF0C\u5982\u679C\u521B\u5EFA\u5931\u8D25\uFF0C\u53EF\u80FD\u662F/mnt\u88AB\u8BEF\u5220\u9664\u4E86\uFF0C\u53EF\u4EE5\u6267\u884C\u547D\u4EE4mkdir -p /mnt/sdc\u521B\u5EFA\u3002</p></div><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u5C06\u65B0\u5EFA\u5206\u533A\u6302\u8F7D\u523012\u4E2D\u521B\u5EFA\u7684\u76EE\u5F55\u4E0B\u3002 mount \u78C1\u76D8\u5206\u533A \u6302\u8F7D\u76EE\u5F55</p><p>\u4EE5\u6302\u8F7D\u65B0\u5EFA\u5206\u533A\u201C/dev/vdb1\u201D\u81F3\u201C/mnt/sdc\u201D\u4E3A\u4F8B\uFF1A</p><p>mount /dev/vdb1 /mnt/sdc</p><ol start="14"><li>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u67E5\u770B\u6302\u8F7D\u7ED3\u679C\u3002 df -TH</li></ol><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</p><p>[root@ecs-test-0001 ~]# df -TH Filesystem Type Size Used Avail Use% Mounted on /dev/vda1 ext4 43G 1.9G 39G 5% / devtmpfs devtmpfs 2.0G 0 2.0G 0% /dev tmpfs tmpfs 2.0G 0 2.0G 0% /dev/shm tmpfs tmpfs 2.0G 9.1M 2.0G 1% /run tmpfs tmpfs 2.0G 0 2.0G 0% /sys/fs/cgroup tmpfs tmpfs 398M 0 398M 0% /run/user/0 /dev/vdb1 ext4 106G 63M 101G 1% /mnt/sdc</p><p>\u8868\u793A\u65B0\u5EFA\u5206\u533A\u201C/dev/vdb1\u201D\u5DF2\u6302\u8F7D\u81F3\u201C/mnt/sdc\u201D\u3002</p><div class="custom-container note"><p class="custom-container-title">\u8BF4\u660E</p><p>\u4E91\u670D\u52A1\u5668\u91CD\u542F\u540E\uFF0C\u6302\u8F7D\u4F1A\u5931\u6548\u3002\u60A8\u53EF\u4EE5\u4FEE\u6539\u201C/etc/fstab\u201D\u6587\u4EF6\uFF0C\u5C06\u65B0\u5EFA\u78C1\u76D8\u5206\u533A\u8BBE\u7F6E\u4E3A\u5F00\u673A\u81EA\u52A8\u6302\u8F7D\uFF0C\u8BF7\u53C2\u89C1\u8BBE\u7F6E\u5F00\u673A\u81EA\u52A8\u6302\u8F7D\u78C1\u76D8\u5206\u533A\u3002</p></div><h3 id="\u8BBE\u7F6E\u5F00\u673A\u81EA\u52A8\u6302\u8F7D\u78C1\u76D8\u5206\u533A" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u5F00\u673A\u81EA\u52A8\u6302\u8F7D\u78C1\u76D8\u5206\u533A" aria-hidden="true">#</a> \u8BBE\u7F6E\u5F00\u673A\u81EA\u52A8\u6302\u8F7D\u78C1\u76D8\u5206\u533A</h3><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6Efstab\u6587\u4EF6\uFF0C\u8BBE\u7F6E\u4E91\u670D\u52A1\u5668\u7CFB\u7EDF\u542F\u52A8\u65F6\u81EA\u52A8\u6302\u8F7D\u78C1\u76D8\u5206\u533A\u3002\u5DF2\u6709\u6570\u636E\u7684\u4E91\u670D\u52A1\u5668\u4E5F\u53EF\u4EE5\u8FDB\u884C\u8BBE\u7F6E\uFF0C\u8BE5\u64CD\u4F5C\u4E0D\u4F1A\u5F71\u54CD\u73B0\u6709\u6570\u636E\u3002</p><p>\u672C\u6587\u4ECB\u7ECD\u5982\u4F55\u5728fstab\u6587\u4EF6\u4E2D\u4F7F\u7528UUID\u6765\u8BBE\u7F6E\u81EA\u52A8\u6302\u8F7D\u78C1\u76D8\u5206\u533A\u3002\u4E0D\u5EFA\u8BAE\u91C7\u7528\u5728\u201C/etc/fstab\u201D\u76F4\u63A5\u6307\u5B9A\u8BBE\u5907\u540D\uFF08\u6BD4\u5982/dev/vdb1\uFF09\u7684\u65B9\u6CD5\uFF0C\u56E0\u4E3A\u4E91\u4E2D\u8BBE\u5907\u7684\u987A\u5E8F\u7F16\u7801\u5728\u5173\u95ED\u6216\u8005\u5F00\u542F\u4E91\u670D\u52A1\u5668\u8FC7\u7A0B\u4E2D\u53EF\u80FD\u53D1\u751F\u6539\u53D8\uFF0C\u4F8B\u5982/dev/vdb1\u53EF\u80FD\u4F1A\u53D8\u6210/dev/vdb2\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u4E91\u670D\u52A1\u5668\u91CD\u542F\u540E\u4E0D\u80FD\u6B63\u5E38\u8FD0\u884C\u3002</p><div class="custom-container note"><p class="custom-container-title">\u8BF4\u660E</p><p>UUID\uFF08universally unique identifier\uFF09\u662FLinux\u7CFB\u7EDF\u4E3A\u78C1\u76D8\u5206\u533A\u63D0\u4F9B\u7684\u552F\u4E00\u7684\u6807\u8BC6\u5B57\u7B26\u4E32\u3002</p></div><ol><li><p>\u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF0C\u67E5\u8BE2\u78C1\u76D8\u5206\u533A\u7684UUID\u3002 blkid \u78C1\u76D8\u5206\u533A</p></li><li><p>\u4EE5\u67E5\u8BE2\u78C1\u76D8\u5206\u533A\u201C/dev/vdb1\u201D\u7684UUID\u4E3A\u4F8B\uFF1A</p></li></ol><p>blkid /dev/vdb1</p><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF1A</p><p>[root@ecs-test-0001 ~]# blkid /dev/vdb1 /dev/vdb1: UUID=&quot;0b3040e2-1367-4abb-841d-ddb0b92693df&quot; TYPE=&quot;ext4&quot;</p><p>\u8868\u793A\u201C/dev/vdb1\u201D\u7684UUID\u3002</p><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u4F7F\u7528VI\u7F16\u8F91\u5668\u6253\u5F00\u201Cfstab\u201D\u6587\u4EF6\u3002 vi /etc/fstab</p><ol start="3"><li>\u6309\u201Ci\u201D\uFF0C\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F\u3002</li><li>\u5C06\u5149\u6807\u79FB\u81F3\u6587\u4EF6\u672B\u5C3E\uFF0C\u6309\u201CEnter\u201D\uFF0C\u6DFB\u52A0\u5982\u4E0B\u5185\u5BB9\u3002 UUID=0b3040e2-1367-4abb-841d-ddb0b92693df /mnt/sdc ext4 defaults 0 2</li></ol><p>\u4EE5\u4E0A\u5185\u5BB9\u4EC5\u4E3A\u793A\u4F8B\uFF0C\u5177\u4F53\u8BF7\u4EE5\u5B9E\u9645\u60C5\u51B5\u4E3A\u51C6\uFF0C\u53C2\u6570\u8BF4\u660E\u5982\u4E0B\uFF1A \u7B2C\u4E00\u5217\u4E3AUUID\uFF0C\u6B64\u5904\u586B\u51991\u4E2D\u67E5\u8BE2\u5230\u7684\u78C1\u76D8\u5206\u533A\u7684UUID\u3002 \u7B2C\u4E8C\u5217\u4E3A\u78C1\u76D8\u5206\u533A\u7684\u6302\u8F7D\u76EE\u5F55\uFF0C\u53EF\u4EE5\u901A\u8FC7df -TH\u547D\u4EE4\u67E5\u8BE2\u3002 \u7B2C\u4E09\u5217\u4E3A\u78C1\u76D8\u5206\u533A\u7684\u6587\u4EF6\u7CFB\u7EDF\u683C\u5F0F\uFF0C \u53EF\u4EE5\u901A\u8FC7df -TH\u547D\u4EE4\u67E5\u8BE2\u3002 \u7B2C\u56DB\u5217\u4E3A\u78C1\u76D8\u5206\u533A\u7684\u6302\u8F7D\u9009\u9879\uFF0C\u6B64\u5904\u901A\u5E38\u8BBE\u7F6E\u4E3Adefaults\u5373\u53EF\u3002 \u7B2C\u4E94\u5217\u4E3ALinux dump\u5907\u4EFD\u9009\u9879\u3002 0\u8868\u793A\u4E0D\u4F7F\u7528Linux dump\u5907\u4EFD\u3002\u73B0\u5728\u901A\u5E38\u4E0D\u4F7F\u7528dump\u5907\u4EFD\uFF0C\u6B64\u5904\u8BBE\u7F6E\u4E3A0\u5373\u53EF\u3002 1\u8868\u793A\u4F7F\u7528Linux dump\u5907\u4EFD\u3002 \u7B2C\u516D\u5217\u4E3Afsck\u9009\u9879\uFF0C\u5373\u5F00\u673A\u65F6\u662F\u5426\u4F7F\u7528fsck\u68C0\u67E5\u78C1\u76D8\u3002 0\u8868\u793A\u4E0D\u68C0\u9A8C\u3002 \u6302\u8F7D\u70B9\u4E3A\uFF08/\uFF09\u6839\u76EE\u5F55\u7684\u5206\u533A\uFF0C\u6B64\u5904\u5FC5\u987B\u586B\u51991\u3002 \u6839\u5206\u533A\u8BBE\u7F6E\u4E3A1\uFF0C\u5176\u4ED6\u5206\u533A\u53EA\u80FD\u4ECE2\u5F00\u59CB\uFF0C\u7CFB\u7EDF\u4F1A\u6309\u7167\u6570\u5B57\u4ECE\u5C0F\u5230\u5927\u4F9D\u6B21\u68C0\u67E5\u4E0B\u53BB\u3002</p><ol start="5"><li><p>\u6309\u201CESC\u201D\u540E\uFF0C\u8F93\u5165\u201C:wq\u201D\uFF0C\u6309\u201CEnter\u201D\u3002 \u4FDD\u5B58\u8BBE\u7F6E\u5E76\u9000\u51FA\u7F16\u8F91\u5668\u3002</p></li><li><p>\u6267\u884C\u4EE5\u4E0B\u6B65\u9AA4\uFF0C\u9A8C\u8BC1\u81EA\u52A8\u6302\u8F7D\u529F\u80FD\u3002 \u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF0C\u5378\u8F7D\u5DF2\u6302\u8F7D\u7684\u5206\u533A\u3002 a. umount \u78C1\u76D8\u5206\u533A</p></li></ol><p>\u547D\u4EE4\u793A\u4F8B\uFF1A</p><p>b. umount /dev/vdb1</p><p>\u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF0C\u5C06\u201C/etc/fstab\u201D\u6587\u4EF6\u6240\u6709\u5185\u5BB9\u91CD\u65B0\u52A0\u8F7D\u3002 mount -a</p><p>c. \u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF0C\u67E5\u8BE2\u6587\u4EF6\u7CFB\u7EDF\u6302\u8F7D\u4FE1\u606F\u3002 mount | grep \u6302\u8F7D\u76EE\u5F55</p><p>\u547D\u4EE4\u793A\u4F8B\uFF1A</p><p>mount | grep /mnt/sdc</p><p>\u56DE\u663E\u7C7B\u4F3C\u5982\u4E0B\u4FE1\u606F\uFF0C\u8BF4\u660E\u81EA\u52A8\u6302\u8F7D\u529F\u80FD\u751F\u6548\uFF1A</p><div class="custom-container note"><p class="custom-container-title">\u8BF4\u660E</p><p>root@ecs-test-0001 ~]# mount | grep /mnt/sdc /dev/vdb1 on /mnt/sdc type ext4 (rw,relatime,data=ordered)</p></div>`,76);function p(b,f){const s=r("ExternalLinkIcon");return d(),l("div",null,[c,e("p",null,[e("a",o,[m,t(s)])]),u])}var h=n(v,[["render",p],["__file","MountDisk.html.vue"]]);export{h as default};
