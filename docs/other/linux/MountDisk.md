---
title: 使用fdisk工具为系统挂载磁盘
date: 2023-01-27
author: chenkun
publish: true
keys:
category:
---

## 参考

[初始化Linux数据盘（fdisk）](https://support.huaweicloud.com/qs-evs/evs_01_0033.html)

## 挂载

### 划分分区并挂载磁盘

本操作以该场景为例，当云服务器挂载了一块新的数据盘时，使用fdisk分区工具将该数据盘设为主分区，分区形式默认设置为MBR，文件系统设为ext4格式，挂载在“/mnt/sdc”下，并设置开机启动自动挂载。

1. fdisk -l
回显类似如下信息：

~~~
[root@ecs-test-0001 ~]# fdisk -l

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
~~~

表示当前的云服务器有两块磁盘，“/dev/vda”是系统盘，“/dev/vdb”是新增数据盘。

2. 执行以下命令，进入fdisk分区工具，开始对新增数据盘执行分区操作。

**fdisk 新增数据盘**

以新挂载的数据盘“/dev/vdb”为例：

**fdisk /dev/vdb**

回显类似如下信息：
~~~
[root@ecs-test-0001 ~]# fdisk /dev/vdb
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0x38717fc1.

Command (m for help): 
~~~

3. 输入“n”，按“Enter”，开始新建分区。
回显类似如下信息：
~~~
Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
~~~

表示磁盘有两种分区类型：
“p”表示主分区。
“e”表示扩展分区。

:::note 说明
磁盘使用MBR分区形式，最多可以创建4个主分区，或者3个主分区加1个扩展分区，扩展分区不可以直接使用，需要划分成若干个逻辑分区才可以使用。
磁盘使用GPT分区形式时，没有主分区、扩展分区以及逻辑分区之分。
:::

4. 以创建一个主要分区为例，输入“p”，按“Enter”，开始创建一个主分区。
回显类似如下信息：
~~~
Select (default p): p
Partition number (1-4, default 1): 
~~~

“Partition number”表示主分区编号，可以选择1-4。

5. 以分区编号选择“1”为例，输入主分区编号“1”，按“Enter”。
回显类似如下信息：
~~~
Partition number (1-4, default 1): 1
First sector (2048-209715199, default 2048):
~~~

“First sector”表示起始磁柱值，可以选择2048-209715199，默认为2048。

6. 以选择默认起始磁柱值2048为例，按“Enter”。
系统会自动提示分区可用空间的起始磁柱值和截止磁柱值，可以在该区间内自定义，或者使用默认值。起始磁柱值必须小于分区的截止磁柱值。

回显类似如下信息：
~~~
First sector (2048-209715199, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-209715199, default 209715199):
~~~

“Last sector”表示截止磁柱值，可以选择2048-209715199，默认为209715199。

7. 以选择默认截止磁柱值209715199为例，按“Enter”。
系统会自动提示分区可用空间的起始磁柱值和截止磁柱值，可以在该区间内自定义，或者使用默认值。起始磁柱值必须小于分区的截止磁柱值。

回显类似如下信息：

~~~
Last sector, +sectors or +size{K,M,G} (2048-209715199, default 209715199):
Using default value 209715199
Partition 1 of type Linux and of size 100 GiB is set

Command (m for help):
~~~

表示分区完成，即为数据盘新建了1个分区。

8. 输入“p”，按“Enter”，查看新建分区的详细信息。
回显类似如下信息：
~~~
Command (m for help): p

Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x38717fc1

   Device Boot      Start         End      Blocks   Id  System
/dev/vdb1            2048   209715199   104856576   83  Linux

Command (m for help):
~~~

表示新建分区“/dev/vdb1”的详细信息。

9. 输入“w”，按“Enter”，将分区结果写入分区表中。
回显类似如下信息：
~~~
Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
~~~

表示分区创建完成。

说明：
如果之前分区操作有误，请输入“q”，则会退出fdisk分区工具，之前的分区结果将不会被保留。

10. 执行以下命令，将新的分区表变更同步至操作系统。
partprobe

11. 执行以下命令，将新建分区文件系统设为系统所需格式。
mkfs -t 文件系统格式 /dev/vdb1

以设置文件系统为“ext4”为例：

mkfs -t ext4 /dev/vdb1

回显类似如下信息：
~~~
[root@ecs-test-0001 ~]# mkfs -t ext4 /dev/vdb1
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
~~~

格式化需要等待一段时间，请观察系统运行状态，不要退出。

:::note 须知
不同文件系统支持的分区大小不同，请根据您的业务需求选择合适的文件系统。
:::

12. 执行以下命令，新建挂载目录。
mkdir 挂载目录

13. 以新建挂载目录“/mnt/sdc”为例：

mkdir /mnt/sdc

:::note 说明
Linux系统默认带有/mnt目录，如果创建失败，可能是/mnt被误删除了，可以执行命令mkdir -p /mnt/sdc创建。
:::

执行以下命令，将新建分区挂载到12中创建的目录下。
mount 磁盘分区 挂载目录

以挂载新建分区“/dev/vdb1”至“/mnt/sdc”为例：

mount /dev/vdb1 /mnt/sdc

14. 执行以下命令，查看挂载结果。
df -TH

回显类似如下信息：

[root@ecs-test-0001 ~]# df -TH
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/vda1      ext4       43G  1.9G   39G   5% /
devtmpfs       devtmpfs  2.0G     0  2.0G   0% /dev
tmpfs          tmpfs     2.0G     0  2.0G   0% /dev/shm
tmpfs          tmpfs     2.0G  9.1M  2.0G   1% /run
tmpfs          tmpfs     2.0G     0  2.0G   0% /sys/fs/cgroup
tmpfs          tmpfs     398M     0  398M   0% /run/user/0
/dev/vdb1      ext4      106G   63M  101G   1% /mnt/sdc

表示新建分区“/dev/vdb1”已挂载至“/mnt/sdc”。

:::note 说明
云服务器重启后，挂载会失效。您可以修改“/etc/fstab”文件，将新建磁盘分区设置为开机自动挂载，请参见设置开机自动挂载磁盘分区。
:::

### 设置开机自动挂载磁盘分区

您可以通过配置fstab文件，设置云服务器系统启动时自动挂载磁盘分区。已有数据的云服务器也可以进行设置，该操作不会影响现有数据。

本文介绍如何在fstab文件中使用UUID来设置自动挂载磁盘分区。不建议采用在“/etc/fstab”直接指定设备名（比如/dev/vdb1）的方法，因为云中设备的顺序编码在关闭或者开启云服务器过程中可能发生改变，例如/dev/vdb1可能会变成/dev/vdb2，可能会导致云服务器重启后不能正常运行。

:::note 说明
UUID（universally unique identifier）是Linux系统为磁盘分区提供的唯一的标识字符串。
:::

1. 执行如下命令，查询磁盘分区的UUID。
blkid 磁盘分区

2. 以查询磁盘分区“/dev/vdb1”的UUID为例：

blkid /dev/vdb1

回显类似如下信息：

[root@ecs-test-0001 ~]# blkid /dev/vdb1
/dev/vdb1: UUID="0b3040e2-1367-4abb-841d-ddb0b92693df" TYPE="ext4"

表示“/dev/vdb1”的UUID。

执行以下命令，使用VI编辑器打开“fstab”文件。
vi /etc/fstab

3. 按“i”，进入编辑模式。
4. 将光标移至文件末尾，按“Enter”，添加如下内容。
UUID=0b3040e2-1367-4abb-841d-ddb0b92693df /mnt/sdc                ext4    defaults        0 2

以上内容仅为示例，具体请以实际情况为准，参数说明如下：
第一列为UUID，此处填写1中查询到的磁盘分区的UUID。
第二列为磁盘分区的挂载目录，可以通过df -TH命令查询。
第三列为磁盘分区的文件系统格式， 可以通过df -TH命令查询。
第四列为磁盘分区的挂载选项，此处通常设置为defaults即可。
第五列为Linux dump备份选项。
0表示不使用Linux dump备份。现在通常不使用dump备份，此处设置为0即可。
1表示使用Linux dump备份。
第六列为fsck选项，即开机时是否使用fsck检查磁盘。
0表示不检验。
挂载点为（/）根目录的分区，此处必须填写1。
根分区设置为1，其他分区只能从2开始，系统会按照数字从小到大依次检查下去。

5. 按“ESC”后，输入“:wq”，按“Enter”。
保存设置并退出编辑器。

6. 执行以下步骤，验证自动挂载功能。
执行如下命令，卸载已挂载的分区。
a. umount 磁盘分区

命令示例：

b. umount /dev/vdb1

执行如下命令，将“/etc/fstab”文件所有内容重新加载。
mount -a

c. 执行如下命令，查询文件系统挂载信息。
mount | grep 挂载目录

命令示例：

mount | grep /mnt/sdc

回显类似如下信息，说明自动挂载功能生效：

:::note 说明
root@ecs-test-0001 ~]# mount | grep /mnt/sdc
/dev/vdb1 on /mnt/sdc type ext4 (rw,relatime,data=ordered)
:::
