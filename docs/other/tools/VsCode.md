---
title: vscode配置
date: 2022-07-15
author: chenkun
publish: true
keys:
category:
---

<!--more-->

> 版本: 1.69.1 (user setup)
> 提交: b06ae3b2d2dbfe28bca3134cc6be65935cdfea6a
> 日期: 2022-07-12T08:21:24.514Z
> Electron: 18.3.5
> Chromium: 100.0.4896.160
> Node.js: 16.13.2
> V8: 10.0.139.17-electron.0
> OS: Windows_NT x64 6.1.7601

### 1. vscode终端无法打开

> 现象，使用vscod打开终端一直卡着。
>
> 解决方法是禁用GPU加速，猜测是因为公司电脑没有独显的原因

1、取消win7的兼容模式
2、启动方式后加 --disable-[gpu](https://so.csdn.net/so/search?q=gpu&spm=1001.2101.3001.7020)，似乎是禁用 GPU 硬件加速
找其他各种方法都无效，管理员、兼容、改setting.json都没用。

![](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/202207151112664.png)

### 2、在vscode中使用git-bash作为默认终端

1. 给vscode设置以管理员方式运行，
2. 在配置文件加入以下配置，把git的path改成自己的

```json
  "terminal.integrated.defaultProfile.windows": "GitBash",
    "terminal.integrated.profiles.windows": {
        "PowerShell": {
            "source": "PowerShell",
            "icon": "terminal-powershell"
        },
        "Command Prompt": {
            "path": [
                "${env:windir}\\Sysnative\\cmd.exe",
                "${env:windir}\\System32\\cmd.exe"
            ],
            "args": [],
            "icon": "terminal-cmd"
        },
        "GitBash": {
            "path": "D:\\ProgramFiles\\Git\\bin\\bash.exe"
        },
        "Windows PowerShell": {
            "path": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
        }
    },
```

![](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/202207151115182.png)

### 3. vscode代码片段
[参考](https://juejin.cn/post/6844903869424599053)

设置片段格式可以使用[在线生成工具](https://snippet-generator.app/)
