---
title: 逻辑卷
date: 2025-01-20
author: chensino
publish: true
isOriginal: false
---

转载自<https://www.cnblogs.com/lijiaman/p/12885649.html>，仅用于方便个人查看。原作者： gegeman

### （一）相关概念

逻辑卷是使用逻辑卷组管理(Logic Volume Manager)创建出来的设备，如果要了解逻辑卷，那么首先需要了解逻辑卷管理中的一些概念。

物理卷（Physical Volume,PV）：也就是物理磁盘分区，如果想要使用LVM来管理这个分区，可以使用fdisk将其ID改为LVM可以识别的值，即8e。
卷组（Volume Group,VG）：PV的集合
逻辑卷（Logic Volume,LV）：VG中画出来的一块逻辑磁盘
了解概念之后，逻辑卷是如何产生的就很清晰了：物理磁盘或者磁盘分区转换为物理卷，一个或多个物理卷聚集形成一个或多个卷组，而逻辑卷就是从某个卷组里面抽象出来的一块磁盘空间。具体架构如下：

![](https://ddns.chensina.cn:29000/afatpig/blog/823295-20200513231715436-764135301.png)


### （二）为什么要使用逻辑卷

对于物理磁盘，我们直接分区、格式化为文件系统之后就可以使用，那为什么还需要使用逻辑卷的方式来管理磁盘呢？我认为主要有2个原因：

业务上使用大容量的磁盘。举个例子，我们需要在/data下挂载30TB的存储，对于单个磁盘，是无法满足要求的，因为市面上没有那么大的单块磁盘。但是如果我们使用逻辑卷，将多个小容量的磁盘聚合为一个大的逻辑磁盘，就能满足需求。
扩展和收缩磁盘。在业务初期规划磁盘时，我们并不能完全知道需要分配多少磁盘空间是合理的，如果使用物理卷，后期无法扩展和收缩，如果使用逻辑卷，可以根据后期的需求量，手动扩展或收缩。


### （三）创建物理卷（PV）

通过上面的逻辑卷架构图，可以知道，如果要创建逻辑卷，需要先有物理磁盘或者磁盘分区，然后使用物理磁盘或磁盘分区创建物理卷，再使用物理卷创建卷组，最后使用卷组创建逻辑卷。接下来一步一步创建逻辑卷。

创建物理卷是创建逻辑卷的第一步，创建物理卷相关命令有：

```shell
# pvcreate用于创建物理卷
pvcreate /dev/sdb

# pvdisplay、pvsca、pvs用于查看物理卷
pvdisplay
pvs
pvscan
```

可以使用磁盘直接创建物理卷，也可以使用磁盘分区创建物理卷。两种方法稍微有些差距，下面进行说明。

#### （3.1）使用磁盘直接创建物理卷

直接使用物理磁盘创建物理卷没有什么需要特别注意的，直接创建即可。

~~~shell
# 使用fdisk -l确认磁盘，可以看到/dev/sdb未做分区处理
[root@masterdb ~]# fdisk -l /dev/sdb

Disk /dev/sdb: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

# 使用pvcreate将sdb磁盘创建为物理卷
[root@masterdb ~]# pvcreate /dev/sdb
  Physical volume "/dev/sdb" successfully created.

# 使用pvdisplay确认物理卷信息
[root@masterdb ~]# pvdisplay 
  --- Physical volume ---
  PV Name               /dev/sda3
  VG Name               centos
  PV Size               <68.73 GiB / not usable 4.00 MiB
  Allocatable           yes (but full)
  PE Size               4.00 MiB
  Total PE              17593
  Free PE               0
  Allocated PE          17593
  PV UUID               FRxq7G-1XWu-dPeW-wEwO-322y-M9XR-0ExebA
   
  "/dev/sdb" is a new physical volume of "2.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb
  VG Name               
  PV Size               2.00 GiB
  Allocatable           NO
  PE Size               0   
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               nsL75f-o3fD-apyz-SSY0-miUi-4RYf-zVLIT6
   
# 也可以使用pvs确认物理卷信息,不过能够看到的信息比pvdisplay少
[root@masterdb ~]# pvs 
  PV         VG     Fmt  Attr PSize  PFree
  /dev/sda3  centos lvm2 a--  68.72g    0 
  /dev/sdb          lvm2 ---   2.00g 2.00g
[root@masterdb ~]#
~~~


#### （3.2）使用磁盘分区创建物理卷

磁盘分区之后，磁盘id为83，如果要使用逻辑卷管理，需要将id改为8e，才能创建物理卷。

![](https://ddns.chensina.cn:29000/afatpig/blog/823295-20200513231716700-400843767.png)

分区1修改id过程如下：

~~~shell
[root@masterdb ~]# fdisk /dev/sdc 
 Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
 Be careful before using the write command.


 Command (m for help): t     #t可以修改分区代码
 Partition number (1,2, default 2): 1            #选择1分区进行修改
 Hex code (type L to list all codes): L          #如果不知道类型，可以用”L”列出可以选择的修改代码

  0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris        
  1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
  2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
  3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden C:  c6  DRDOS/sec (FAT-
  4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx         
  5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data    
  6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
  7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility   
  8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt         
  9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access     
  a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O        
  b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor      
  c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi eb  BeOS fs        
  e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         ee  GPT            
  f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ef  EFI (FAT-12/16/
 10  OPUS            55  EZ-Drive        a7  NeXTSTEP        f0  Linux/PA-RISC b
 11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f1  SpeedStor      
 12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f4  SpeedStor      
 14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f2  DOS secondary  
 16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      fb  VMware VMFS    
 17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fc  VMware VMKCORE 
 18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fd  Linux raid auto
 1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fe  LANstep        
 1c  Hidden W95 FAT3 75  PC/IX           be  Solaris boot    ff  BBT            
 1e  Hidden W95 FAT1 80  Old Minix      
 Hex code (type L to list all codes): 8e         #选择8e
 Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): w               # 保存
 The partition table has been altered!

Calling ioctl() to re-read partition table.
 Syncing disks.
 [root@masterdb ~]#
~~~

按照上面的过程，修改分区2，最终结果如下：

![](https://ddns.chensina.cn:29000/afatpig/blog/823295-20200513231717369-997595744.png)

接着进行创建物理卷(PV)即可

~~~shell
[root@masterdb ~]# pvcreate /dev/sdc1 
  Physical volume "/dev/sdc1" successfully created.
[root@masterdb ~]# pvcreate /dev/sdc2 
  Physical volume "/dev/sdc2" successfully created.
~~~

### （四）创建、扩容卷组

#### （4.1）创建卷组

有了PV就可以创建卷组了，创建卷组相关命令有：

~~~shell
# 使用vgcreate创建卷组
vgcreate VG_NAME device1 ... devicen

# 使用vgdosplay、vgscan、vgs命令查看卷组
vgdisplay
vgscan
vgs
~~~

接下来演示使用sdb和sdc1创建一个卷组VG_TEST。

~~~shell
# 使用vgcreate创建卷组VG_TEST,包含物理卷：/dev/sdb和/dev/sdc1
[root@masterdb ~]# vgcreate VG_TEST /dev/sdb /dev/sdc1
  Volume group "VG_TEST" successfully created

# 查看方法一：使用vgdisplay查看卷组信息
[root@masterdb ~]# vgdisplay
  --- Volume group ---
  VG Name               VG_TEST
  System ID             
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               2.99 GiB
  PE Size               4.00 MiB
  Total PE              766
  Alloc PE / Size       0 / 0   
  Free  PE / Size       766 / 2.99 GiB
  VG UUID               DmY2Nz-ietc-2Y8Y-7A1b-1cpT-qEeV-XrgURn
...  
   
# 查看方法二：使用vgscan查看卷组信息
[root@masterdb ~]# vgscan
  Reading volume groups from cache.
  Found volume group "VG_TEST" using metadata type lvm2
  Found volume group "centos" using metadata type lvm2

# 查看方法三：使用vgs查看卷组信息
[root@masterdb ~]# vgs 
  VG      #PV #LV #SN Attr   VSize  VFree
  VG_TEST   2   0   0 wz--n-  2.99g 2.99g
  centos    1   4   0 wz--n- 68.72g    0
~~~


#### （4.2）扩容卷组

如果在使用过程中，发现要使用的空间大于卷组的空间，可以对卷组进行扩容，把新的物理卷(PV)加入到卷组中，语法为

~~~shell
vgextend VG_NAME device1 ... devicen
~~~

接下来演示将sdc2加入到卷组VG_TEST中。

~~~shell
# 使用vgextend扩容卷组VG_TEST
[root@masterdb ~]# vgextend VG_TEST /dev/sdc2  
  Volume group "VG_TEST" successfully extended
~~~

最终结果如下，发现PV数量和VG容量都发生了变化

![](https://ddns.chensina.cn:29000/afatpig/blog/823295-20200513231718058-1985120739.png)



### （五）创建、扩容逻辑卷

#### （5.1）创建逻辑卷

有了卷组，就可以创建逻辑卷(LV)了，创建逻辑卷相关命令有：

~~~shell
# 使用lvcreate创建逻辑卷
lvcreate –L SIZE –n LV_NAME VG_NAME

使用lvdisplay、lvscan、lvs查看逻辑卷
lvdisplay
lvscan
lvs
~~~

接下来演示使用VG_TEST创建逻辑卷lv_test

~~~shell
# 使用lvcreate创建逻辑卷lv_test
[root@masterdb ~]# lvcreate -L 1g -n lv_test VG_TEST
  Logical volume "lv_test" created.

# 查看方法一：使用lvdisplay查看逻辑卷
[root@masterdb ~]# lvdisplay 
  --- Logical volume ---
  LV Path                /dev/VG_TEST/lv_test
  LV Name                lv_test
  VG Name                VG_TEST
  LV UUID                RqWMOG-wCJJ-deu4-dIgv-c5hI-Bsqa-FHgh4E
  LV Write Access        read/write
  LV Creation host, time masterdb, 2020-05-13 22:42:45 +0800
  LV Status              available
  # open                 0
  LV Size                1.00 GiB
  Current LE             256
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:4
...
   
# 查看方法二：使用lvscan查看逻辑卷  
[root@masterdb ~]# lvscan 
  ACTIVE            '/dev/VG_TEST/lv_test' [1.00 GiB] inherit
  ACTIVE            '/dev/centos/mysql' [<45.00 GiB] inherit
  ACTIVE            '/dev/centos/swap' [<3.73 GiB] inherit
  ACTIVE            '/dev/centos/home' [10.00 GiB] inherit
  ACTIVE            '/dev/centos/root' [10.00 GiB] inherit
  
# 查看方法三：使用lvs查看逻辑卷  
[root@masterdb ~]# lvs 
  LV      VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_test VG_TEST -wi-a-----   1.00g                                                    
  home    centos  -wi-ao----  10.00g                                                    
  mysql   centos  -wi-ao---- <45.00g                                                    
  root    centos  -wi-ao----  10.00g                                                    
  swap    centos  -wi-ao----  <3.73g
~~~

创建完lv之后，格式化挂载即可使用

~~~shell
# 创建文件系统
[root@masterdb ~]# mkfs.ext3 /dev/VG_TEST/lv_test 
mke2fs 1.42.9 (28-Dec-2013)
Filesystem label=
 OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
 Stride=0 blocks, Stripe width=0 blocks
 65536 inodes, 262144 blocks
 13107 blocks (5.00%) reserved for the super user
 First data block=0
 Maximum filesystem blocks=268435456
 8 block groups
 32768 blocks per group, 32768 fragments per group
 8192 inodes per group
 Superblock backups stored on blocks: 
     32768, 98304, 163840, 229376

Allocating group tables: done                            
 Writing inode tables: done                            
 Creating journal (8192 blocks): done
 Writing superblocks and filesystem accounting information: done

# 创建挂载点
[root@masterdb ~]# mkdir /test 

# 挂载文件系统
[root@masterdb ~]# mount /dev/VG_TEST/lv_test /test

# 确认结果
[root@masterdb ~]# df –h 
 Filesystem                   Size  Used Avail Use% Mounted on
 /dev/mapper/centos-root       10G  4.1G  5.9G  42% /
 ...
 /dev/mapper/VG_TEST-lv_test  976M  1.3M  924M   1% /test
~~~


#### （5.2）扩容逻辑卷

使用如下命令进行扩容

~~~shell
# 使用lvextend扩容lv，+SIZE代表增加的空间
lvextend -L +SIZE lv_device

# 调整文件系统的大小
resize2fs device lv_device
~~~

接下来演示使用对逻辑卷lv_test扩容500M。

扩容前文件磁盘大小如下：

![](https://ddns.chensina.cn:29000/afatpig/blog/823295-20200513231719174-88647049.png)

进行扩容操作：

~~~shell
# 对lv进行扩容，增加500M空间
[root@masterdb ~]# lvextend -L +500M /dev/VG_TEST/lv_test 
  Size of logical volume VG_TEST/lv_test changed from 1.00 GiB (256 extents) to <1.49 GiB (381 extents).
  Logical volume VG_TEST/lv_test successfully resized.
~~~
之后查看磁盘大小，未发生改变：

![](https://ddns.chensina.cn:29000/afatpig/blog/823295-20200513231719884-1598548425.png)

调整文件系统的大小：

~~~shell
# 使用resize2fs调整文件系统的大小
[root@masterdb ~]# resize2fs /dev/VG_TEST/lv_test 
resize2fs 1.42.9 (28-Dec-2013)
Filesystem at /dev/VG_TEST/lv_test is mounted on /test; on-line resizing required
old_desc_blocks = 1, new_desc_blocks = 1
The filesystem on /dev/VG_TEST/lv_test is now 390144 blocks long.
~~~
确认磁盘大小已经发生了改变

![image](https://img2020.cnblogs.com/blog/823295/202005/823295-20200513231720555-1199395255.png)




