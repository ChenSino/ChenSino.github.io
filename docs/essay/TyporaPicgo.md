---
title: 在Typora中使用Picgo
date: 2020-03-09
---

### 前言

平时用MarkDown写博客少不了需要截图，我用的是Typora,刚开始截图是保存在本地，有时想把博客分享到网上，就发现各种图全挂了，需要手动一个一个再复制一下，着实麻烦，今天无意间发现有个叫PicGo的工具，此工具专门上传图到各大图床，着实方便。

[picgo配置](https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html#picbed-github)

[picgo-core](https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html#picbed-tcyun)

==picgo的ui剪贴板上传功能，需要win10+==



### 1、搭建Typora + PicGo + gitee

我的电脑环境如下，

```shell
								  OS: Manjaro 21.2.4 Qonos
 ██████████████████  ████████     Kernel: x86_64 Linux 5.15.25-1-MANJARO
 ██████████████████  ████████     Uptime: 5h 26m
 ████████            ████████     Packages: 1556
 ████████  ████████  ████████     Shell: zsh 5.8.1
 ████████  ████████  ████████     Resolution: 1920x1080
 ████████  ████████  ████████     DE: KDE 5.91.0 / Plasma 5.24.2
 ████████  ████████  ████████     WM: KWin
 ████████  ████████  ████████     GTK Theme: Breath [GTK2/3]
 ████████  ████████  ████████     Icon Theme: WhiteSur
 ████████  ████████  ████████     Disk: 112G / 245G (49%)
 ████████  ████████  ████████     CPU: Intel Core i7-6700HQ @ 8x 3.5GHz [61.0°C]
 ████████  ████████  ████████     GPU: NVIDIA GeForce GTX 960M
                                  RAM: 8315MiB / 15428MiB

```

#### 1.1 、第一步

打开typora的配置，按照如下图配置，选择PicGo-Core,点击下载，此时会自动下载PicGo-Core，

![image-20220309141611583](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220309141611583.png)



#### 1.2 、第二步

安装picgo 主程序

```shell
npm install picgo -g # yarn global add picgo 
```

#### 1.3 、第三步

安装gitee插件

```shell
picgo install gitee-uploader
```

#### 1.4、 第四步

从typora打开配置，修改配置

![image-20220309145003089](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220309145003089.png)

用如下配置覆盖原来的，同时记得把带有注释信息的部分修改成自己的

```json
{
  "picBed": {
    "uploader": "gitee",
    "gitee": {
      "branch": "master", //分支名
      "customPath": "", 
      "customUrl": "",
      "path": "img",;//上传的时候创建一个文件夹用来放图片
      "repo": "ChenSino/blogimages",//你的gitee用户名/仓库名
      "token": ""//gitee的token
    }
  },
  "picgoPlugins": {
    "picgo-plugin-gitee-uploader": true
  },
  "picgo-plugin-gitee-uploader": {
    "lastSync": "2022-03-09 02:50:05"
  }
}
```

#### 1.5 、 第五步

测试上传图片

![image-20220309145521751](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220309145521751.png)

### 2、给typora中picgo设置代理

最简单的方法是用gui先设置好代理，然后通过ui打开配置，再复制到typora中picgo配置文件下

PicGo的配置文件在不同系统里是不一样的。

Windows: %APPDATA%\picgo\data.json
Linux: $XDG_CONFIG_HOME/picgo/data.json or ~/.config/picgo/data.json
macOS: ~/Library/Application\ Support/picgo/data.json
