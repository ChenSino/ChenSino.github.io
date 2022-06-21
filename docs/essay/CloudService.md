title: 云服务问题分析及总结
date: 2022-06-20
author: 陈老师
tags:
- 运维
---

## 1、我的云服务使用场景

> 1. OBS用来存储图片，而CDN用来加速图片的访问速度； 
>
> 2. ECS服务器上有个导出pdf服务需要访问obs的图片；

## 2、遇到的问题

1. 一开始没有上cdn，用户反应慢，后来配置了cdn加速obs中的图片，这样第一次打开图片会把图片资源拉到就近的服务器，问题就是第一次打开依然慢；
2. 导出PDF很慢，经常出现504Timeout

## 3、问题分析

先上cdn原理图，对照原理图来进行分析

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/zh-cn_image_0000001129063959.png)

### 3.1 使用cdn 第一次访问慢原因分析

![image-20220620164944526](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220620164944526.png)

以上是我的服务访问线路：

1. 客户端通过加速域名`obs.sonoscapecloud.com`去请求图片，以下是我 在云服务管理台做的配置，使用obs.sonoscapecloud.com加速桶域名ccs.obs.ap-southeast-1.myhuaweicloud.com

   ![image-20220620163303675](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220620163303675.png)

2. cdn通过cname去查找是否缓存过此文件，若没有缓存，则回源到原来的obs存储服务器，先把图片从obs服务器拉到就近的cdn服务器，比如我在武汉访问图片，可能就把图片拉到了华中区的服务器，缓存到华中区后，再把图片返回到客户端。

   ****

   **第二步因为要回源拉取，所以第一次打开会慢点，第二次就直接就近到华中区去获取，就会快一些。这里有个地方要注意，虽然使用cdn后第一次拉取会稍慢，但是比不使用cdn还是快很多的，原因就是从obs源服务器把文件拉取到就近的cdn服务器应该是走的华为内网，所以速度相对来说还是要快一些，具体还要分析从源到cdn是否走了内网。**

### 3.2 解决第一次访问慢的问题

> 防止第一次访问图片，数据回源，只需要在新增文件时，在新增接口添加缓存预热一下即可。具体的代码参考华为云提供的demo即可。

[华为云CDN缓存预热](https://support.huaweicloud.com/usermanual-cdn/cdn_01_0113.html)

[创建刷新预热](https://support.huaweicloud.com/api-cdn/CreatePreheatingTasks.html)

```java
private void preHeatingFile(String fileName) {
		ICredential auth = new GlobalCredentials()
				.withAk(ossProperties.getAccessKey())
				.withSk( ossProperties.getSecretKey());

		CdnClient client = CdnClient.newBuilder()
				.withCredential(auth)
				.withRegion(CdnRegion.valueOf(ossProperties.getRegion()))
				.build();
		CreatePreheatingTasksRequest request = new CreatePreheatingTasksRequest();
		PreheatingTaskRequest body = new PreheatingTaskRequest();
		List<String> listPreheatingTaskUrls = new ArrayList<>();
		listPreheatingTaskUrls.add("http://" + ossProperties.getAccelerationDomain() + "/" + fileName);
		PreheatingTaskRequestBody preheatingTaskbody = new PreheatingTaskRequestBody();
		preheatingTaskbody.withUrls(listPreheatingTaskUrls);
		body.withPreheatingTask(preheatingTaskbody);
		request.withBody(body);
		try {
			CreatePreheatingTasksResponse response = client.createPreheatingTasks(request);
			System.out.println(response.toString());
		} catch (ConnectionException e) {
			log.error("连接出错，缓存预热失败");
		} catch (RequestTimeoutException e) {
			log.error("连接超时，缓存预热失败");
		} catch (ServiceResponseException e) {
			e.printStackTrace();
			System.out.println(e.getHttpStatusCode());
			System.out.println(e.getErrorCode());
			System.out.println(e.getErrorMsg());
			log.error("缓存预热失败，异常信息：{}，响应码：{}，异常码：{}", e.getErrorMsg(), e.getHttpStatusCode(), e.getErrorCode());
		}
	}
```



### 3.3、问题2分析

![image-20220620165052448](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220620165052448.png)

问题2，我需要实现的功能是用户请求ecs上的后端接口，接口根据ftl模板去创建pdf文件，这个模板会访问很多图片，访问图片的路径和问题1中的方式一样，都是用的加速域名访问，类似`http://obs.sonoscapecloud.com/14c84f0716ec4c25bd4f97c23fd55e83.jpg`，用户反馈偶尔会出现导出pdf失败，或者时间过长。

> 针对次问题我做了以下猜想和尝试：
>
> 1. 用户上传了原图，导致图片过大；针对此猜想我在浏览器控制台专门查看了，有的没有原图，导出pdf有时也很慢，所以结论是原图只是影响因素之一。
> 2. 程序性能问题，渲染pdf耗时，

针对第二个猜想我做了以下调试，使用arths分析函数执行时间

```shell
  ,---.  ,------. ,--------.,--.  ,--.  ,---.   ,---.
 /  O  \ |  .--. ''--.  .--'|  '--'  | /  O  \ '   .-'
|  .-.  ||  '--'.'   |  |   |  .--.  ||  .-.  |`.  `-.
|  | |  ||  |\  \    |  |   |  |  |  ||  | |  |.-'    |
`--' `--'`--' '--'   `--'   `--'  `--'`--' `--'`-----'

wiki       https://arthas.aliyun.com/doc
tutorials  https://arthas.aliyun.com/doc/arthas-tutorials.html
version    3.6.2
main_class
pid        1329
time       2022-06-20 10:13:00

[arthas@1329]$ trace com.sonoscape.ccs.data.utils.PDFUtil createPDF  -n 5 --skipJDKMethod false
Press Q or Ctrl+C to abort.
Affect(class count: 1 , method count: 1) cost in 199 ms, listenerId: 5
`---ts=2022-06-20 17:01:26;thread_name=XNIO-1 task-8;id=1df4;is_daemon=false;priority=5;TCCL=org.springframework.boot.loader.LaunchedURLClassLoader@5010be6
    `---[7542.18413ms] com.sonoscape.ccs.data.utils.PDFUtil:createPDF()
        +---[0.00% 0.02161ms ] java.io.ByteArrayOutputStream:<init>() #79
        +---[0.01% 1.047334ms ] com.sonoscape.ccs.data.utils.ITextRendererO:<init>() #80
        +---[0.16% 11.992901ms ] com.sonoscape.ccs.data.utils.ITextRendererO:setDocumentFromString() #81
        +---[0.00% 0.010167ms ] com.sonoscape.ccs.data.utils.ITextRendererO:getFontResolver() #82
        +---[5.76% 434.381521ms ] org.xhtmlrenderer.pdf.ITextFontResolver:addFont() #84
        +---[92.76% 6996.077491ms ] com.sonoscape.ccs.data.utils.ITextRendererO:layout() #85
        +---[1.29% 97.567985ms ] com.sonoscape.ccs.data.utils.ITextRendererO:createPDF() #86
        +---[0.00% 0.010778ms ] com.sonoscape.ccs.data.utils.ITextRendererO:finishPDF() #87
        +---[0.00% 0.130757ms ] java.io.ByteArrayOutputStream:toByteArray() #88
        `---[0.00% 0.006634ms ] java.io.ByteArrayOutputStream:close() #95

`---ts=2022-06-20 17:01:40;thread_name=XNIO-1 task-8;id=1df4;is_daemon=false;priority=5;TCCL=org.springframework.boot.loader.LaunchedURLClassLoader@5010be6
    `---[17829.321031ms] com.sonoscape.ccs.data.utils.PDFUtil:createPDF()
        +---[0.00% 0.006945ms ] java.io.ByteArrayOutputStream:<init>() #79
        +---[0.00% 0.789188ms ] com.sonoscape.ccs.data.utils.ITextRendererO:<init>() #80
        +---[0.04% 6.329745ms ] com.sonoscape.ccs.data.utils.ITextRendererO:setDocumentFromString() #81
        +---[0.00% 0.003905ms ] com.sonoscape.ccs.data.utils.ITextRendererO:getFontResolver() #82
        +---[2.30% 410.421151ms ] org.xhtmlrenderer.pdf.ITextFontResolver:addFont() #84
        +---[96.91% 17278.037704ms ] com.sonoscape.ccs.data.utils.ITextRendererO:layout() #85
        +---[0.75% 132.97389ms ] com.sonoscape.ccs.data.utils.ITextRendererO:createPDF() #86
        +---[0.00% 0.006713ms ] com.sonoscape.ccs.data.utils.ITextRendererO:finishPDF() #87
        +---[0.00% 0.199395ms ] java.io.ByteArrayOutputStream:toByteArray() #88
        `---[0.00% 0.003751ms ] java.io.ByteArrayOutputStream:close() #95


```

从日志中可以看出`com.sonoscape.ccs.data.utils.PDFUtil:createPDF()`，花费了大量时间渲染pdf，我导出了两个，以上日志可以看到第一次后端的`createPDF()`执行了7s多，第二次居然执行了快18s。

![image-20220620170554398](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220620170554398.png)

再配合浏览器控制台看，可以看到后端一共执行了18.21s，真正的download只用了1.03s，所以能得出结论，**问题还是在后端接口的渲染函数createPDF**

### 3.4、问题解决

基于以上3.3的分析，并且我用了cdn加速，我一直认为是程序渲染太慢导致，一直尝试找优化方法，从没有往网络方面去想。后来突然灵感来了，**既然我的ecs和obs都是在华为云并且都在香港区域，他们应该是同属一个内网，那么我用CDN加速就是脱裤子放屁了**。然后上提工单，询问华为云如何使用内网访问obs中的图片。我的诉求就是当我在ecs服务器上访问obs图片让他走内网，经过与华为云工程师沟通，他给出的结论是：**因为我用了自定义域名obs.sonoscapecloud.com加速obs，所以当我在ecs服务器上使用obs.sonoscapecloud.com访问obs图片时无法走内网，一个加速域名不能既走cdn又走内网，要实现内网访问建议我修改代码，直接在代码中用桶域名访问，同时在服务器上配置内网dns把桶域名解析到内网**。

![image-20220620171351216](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220620171351216.png)

在未配内网dns时，`ping obs.sonoscapecloud.com`结果如下，可以看到返回的是一个Cname，说明配置的cdn加速在生效，这是符合预期的。

```shell
$ ping obs.sonoscapecloud.com
PING hcdnd101.gslb.c.cdnhwc2.com (27.221.3.90) 56(84) bytes of data.
64 bytes from 27.221.3.90 (27.221.3.90): icmp_seq=1 ttl=43 time=40.2 ms
64 bytes from 27.221.3.90 (27.221.3.90): icmp_seq=2 ttl=43 time=40.2 ms
64 bytes from 27.221.3.90 (27.221.3.90): icmp_seq=3 ttl=43 time=40.2 ms
64 bytes from 27.221.3.90 (27.221.3.90): icmp_seq=4 ttl=43 time=40.2 ms
^C
--- hcdnd101.gslb.c.cdnhwc2.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3003ms
rtt min/avg/max/mdev = 40.264/40.278/40.290/0.142 ms

```

**那么如何在ecs上使用时，让这个dns解析到内网IP呢？**

[如何在ecs上通过内网访问obs](https://support.huaweicloud.com/bestpractice-obs/obs_05_0410.html)

参考以上文档，确实如华为云工程师说的一样，第一步：配置内网dns，第二步：改代码，代码中用桶域名访问，这违背了我不想改代码的初衷。

1. 虽然以上文档不能解决我的问题，但是它给我提供了思路，当我`ping`桶域名时得到的是桶域名对应的内网ip

```shell

$ cat /etc/resolv.conf
# Generated by NetworkManager
search openstacklocal
nameserver 100.125.1.250  #配置内网dns
nameserver 114.114.114.114
nameserver 114.114.115.115
options single-request-reopen

```



```shell
$ ping ccs.obs.ap-southeast-1.myhuaweicloud.com
PING obs.lz01.ap-southeast-1.myhuaweicloud.com (100.125.100.3) 56(84) bytes of data.
64 bytes from 100.125.100.3 (100.125.100.3): icmp_seq=1 ttl=60 time=0.124 ms
64 bytes from 100.125.100.3 (100.125.100.3): icmp_seq=2 ttl=60 time=0.131 ms
^C
--- obs.lz01.ap-southeast-1.myhuaweicloud.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 0.124/0.127/0.131/0.011 ms

```

2. 配置内网dns后再ping一下加速域名，发现加速域名指向的还是一个cname，不是内网ip（**华为文档有说，内网ip是100开头**）

```shell
$ ping obs.sonoscapecloud.com
PING hcdnd101.gslb.c.cdnhwc2.com (36.27.210.67) 56(84) bytes of data.
64 bytes from 36.27.210.67 (36.27.210.67): icmp_seq=1 ttl=37 time=34.3 ms
64 bytes from 36.27.210.67 (36.27.210.67): icmp_seq=2 ttl=37 time=34.3 ms
64 bytes from 36.27.210.67 (36.27.210.67): icmp_seq=3 ttl=37 time=34.3 ms
^C
--- hcdnd101.gslb.c.cdnhwc2.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2001ms
rtt min/avg/max/mdev = 34.343/34.350/34.365/0.214 ms

```



3. 得到了内网IP，那我只需要在`/etc/hosts`手动把我的加速域名`obs.sonoscapecloud.com`映射到这个内网100.125.100.3是不是就可以了？

   ```shell
   $ cat /etc/hosts
   
   192.168.1.87 sono-bom
   ::1     localhost       localhost.localdomain   localhost6      localhost6.localdomain6
   
   
   127.0.0.1       localhost       localhost.localdomain   localhost4      localhost4.localdomain4
   127.0.0.1       localhost       localhost
   100.125.100.3 obs.sonoscapecloud.com #手动配置
   
   ```

   当手动配置hosts后，再ping sonoscapecloud.com发现其指向了内网，注释关闭内网dns（配置内网dns目的是通过开启内网dns拿到桶域名对应的内网ip，也可不关闭）

```shell
$ ping obs.sonoscapecloud.com
PING obs.sonoscapecloud.com (100.125.100.3) 56(84) bytes of data.
64 bytes from obs.sonoscapecloud.com (100.125.100.3): icmp_seq=1 ttl=60 time=0.136 ms
64 bytes from obs.sonoscapecloud.com (100.125.100.3): icmp_seq=2 ttl=60 time=0.136 ms
```

4. 再次导出pdf测试

```shell
`---ts=2022-06-20 18:46:24;thread_name=XNIO-1 task-1;id=585;is_daemon=false;priority=5;TCCL=org.springframework.boot.loader.LaunchedURLClassLoader@5010be6
    `---[929.225252ms] com.sonoscape.ccs.data.utils.PDFUtil:createPDF()
        +---[0.00% 0.004384ms ] java.io.ByteArrayOutputStream:<init>() #79
        +---[0.09% 0.850161ms ] com.sonoscape.ccs.data.utils.ITextRendererO:<init>() #80
        +---[1.55% 14.408436ms ] com.sonoscape.ccs.data.utils.ITextRendererO:setDocumentFromString() #81
        +---[0.00% 0.003273ms ] com.sonoscape.ccs.data.utils.ITextRendererO:getFontResolver() #82
        +---[43.84% 407.382037ms ] org.xhtmlrenderer.pdf.ITextFontResolver:addFont() #84
        +---[44.00% 408.866284ms ] com.sonoscape.ccs.data.utils.ITextRendererO:layout() #85
        +---[10.33% 95.959779ms ] com.sonoscape.ccs.data.utils.ITextRendererO:createPDF() #86
        +---[0.00% 0.005449ms ] com.sonoscape.ccs.data.utils.ITextRendererO:finishPDF() #87
        +---[0.18% 1.628766ms ] java.io.ByteArrayOutputStream:toByteArray() #88
        `---[0.00% 0.002498ms ] java.io.ByteArrayOutputStream:close() #95

```

根据以上arthas日志看到，渲染pdf总耗时不到1s，大大提升了速率，再打开浏览器控制台看到后端总耗时1.26s，经过我多次测试都很稳定。



![image-20220620184752843](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220620184752843.png)

**问题二：如何实现一个加速域名既能保证加速效果，又能保证ecs的内网访问呢？**

方法1： 配置内网dns，ecs访问obs时使用桶域名访问

方法2(推荐)：先配置内网dns，ping桶域名拿到内网ip，然后手动配置hosts把加速域名指向内网ip（不配置host就会解析到cname了）
