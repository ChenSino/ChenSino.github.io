---
title: CDN静态资源加速
date: 2020-02-20
author: John
sticky: 8
tags:
- 运维

---
#### 1、什么是CDN？

```text
CDN（Content Delivery Network，内容分发网络）是构建在现有互联网基础之上的一层智能虚拟网络，通过在网络各处部署节点服务器，实现将源站内容分发至所有CDN节点，使用户可以就近获得所需的内容。CDN服务缩短了用户查看内容的访问延迟，提高了用户访问网站的响应速度与网站的可用性，解决了网络带宽小、用户访问量大、网点分布不均等问题。
```

#### 2、CDN应用场景

[华为云关于CDN应用场景介绍](https://support.huaweicloud.com/productdesc-cdn/cdn_01_0067.html)


##### 2.1 网站加速

适用于有加速需求的网站，包括门户网站、电商平台、资讯APP、UGC应用（User Generated Content，用户原创内容）等。CDN网络能够对加速域名下的静态内容提供良好的加速服务。支持自定义缓存规则，用户可以根据数据需求设置缓存过期时间，缓存格式包括但不限于zip、exe、wmv、gif、png、bmp、wma、rar、jpeg、jpg等。

![img](https://support.huaweicloud.com/productdesc-cdn/zh-cn_image_0170805353.png)

##### 2.2 文件下载加速

适用于使用http/https文件下载业务的网站、下载工具、游戏客户端、APP商店等。现在越来越多的新业务需要通过网络对客户端软件进行实时更新，包括APP更新，手游更新等，传统的下载类业务也需要支持更多的文件数量和更大的文件，如果所有的请求都通过源站服务器来处理，服务器和网络会成为很大的瓶颈，导致下载体验变差。使用CDN下载加速可以将下载量大的内容分发到各地的CDN节点，有效减轻源站的压力，同时保证了客户端高速下载的需求。

![img](https://support.huaweicloud.com/productdesc-cdn/zh-cn_image_0170805965.png)

##### 2.3 点播加速

适用于提供音视频点播服务的客户。例如：在线教育类网站、在线视频分享网站、互联网电视点播平台、音乐视频点播APP等。传统的点播服务会加大服务器的负载，并消耗巨大的带宽资源，同时又无法保证终端用户访问时需要的高速体验，CDN点播加速可以提供快速、稳定和安全的点播加速服务，通过分布在各个区域的CDN节点，将音视频内容扩展到距离用户较近的地方，随时随地为用户提供高品质的访问体验。



![点击放大](https://support.huaweicloud.com/productdesc-cdn/zh-cn_image_0170806639.png)

##### 2.4 全站加速

适用于各行业动静态内容混合，含较多动态资源请求（如asp、jsp、php等格式的文件）的网站。全站加速融合了动态和静态加速，用户请求资源时，静态内容从边缘节点就近获取，动态内容通过动态加速技术智能选择较优路由回源获取。CDN全站加速有效提升动态页面的加载速度，避开网络拥堵路由，提高访问成功率，实现网站整体加速与实时优化。



![点击放大](https://support.huaweicloud.com/productdesc-cdn/zh-cn_image_0170806896.png)

#### 3、CDN加速原理

```
当用户访问使用CDN服务的网站时，本地DNS服务器通过CNAME方式将最终域名请求重定向到CDN服务。CDN通过一组预先定义好的策略(如内容类型、地理区域、网络负载状况等)，将当时能够最快响应用户的CDN节点IP地址提供给用户，使用户可以以最快的速度获得网站内容。
```

##### 3.1 **CDN节点无缓存场景**

![CDN节点无缓存场景](https://res-static.hc-cdn.cn/SEO/CDN%E8%8A%82%E7%82%B9%E6%97%A0%E7%BC%93%E5%AD%98%E5%9C%BA%E6%99%AF.jpg)

HTTP请求流程说明：

1、用户在浏览器输入要访问的网站域名，向本地DNS发起域名解析请求。

2、域名解析的请求被发往网站授权DNS服务器。

3、网站DNS服务器解析发现域名已经CNAME到了www.example.com.c.cdnhwc1.com。

4、请求被指向CDN服务。

5、CDN对域名进行智能解析，将响应速度最快的CDN节点IP地址返回给本地DNS。

6、用户获取响应速度最快的CDN节点IP地址。

7、浏览器在得到速度最快节点的IP地址以后，向CDN节点发出访问请求。

8、CDN节点回源站拉取用户所需资源。（==无缓存时，第一次请求要回源地址获取资源，因此第一次请求会感觉仍然慢==）

9、将回源拉取的资源缓存至节点。

10、将用户所需资源返回给用户。



##### 3.2 CDN节点有缓存场景

![CDN节点有缓存场景](https://res-static.hc-cdn.cn/SEO/CDN%E8%8A%82%E7%82%B9%E6%9C%89%E7%BC%93%E5%AD%98%E5%9C%BA%E6%99%AF.jpg)

HTTP请求流程说明：

1、用户在浏览器输入要访问的网站域名，向本地DNS发起域名解析请求。

2、域名解析的请求被发往网站授权DNS服务器。

3、网站DNS服务器解析发现域名已经CNAME到了www.example.com.c.cdnhwc1.com。

4、请求被指向CDN服务。

5、CDN对域名进行智能解析，将响应速度最快的CDN节点IP地址返回给本地DNS。

6、用户获取响应速度最快的CDN节点IP地址。

7、浏览器在得到速度最快节点的IP地址以后，向CDN节点发出访问请求。

8、CDN节点将用户所需资源返回给用户。



#### 4、如何使用华为云CDN？

[华为云CDN配置](https://support.huaweicloud.com/cdn/index.html)

![image-20210812155106627](/home/chenkun/.config/Typora/typora-user-images/image-20210812155106627.png)

​	举例说明：我要开通加速的地址是h.sonoscape.com，是公司下的一个子域名，则开通cdn的步骤如下：

1. 在华为云花钱开通CDN服务；

2. 添加加速域名，就是把你要加速的域名到华为控制台配置以下，配置好后，它会根据你的域名生成一个CNAME，类似h.sonoscape.com.7bf9428.c.cdnhwc1.com这样；

3. 配置CNAME解析，要看你的域名是哪里来的，这个h.sonoscape.com是从公司申请的，因此要找公司IT部门去配置一个CNAME，把h.sonoscape.com下配置一个cname，h.sonoscape.com.7bf9428.c.cdnhwc1.com，配置好一般两小时生效；

4. 验证cname是否生效

   ```
   nslookup -qt=cname h.sonoscape.com
   ```

   如果回显CNAME，则表示CNAME配置已经生效，如下图：

   ![点击放大](https://support.huaweicloud.com/qs-cdn/zh-cn_image_0298980912.png)

#### 5、问题

1. 为何第一次请求感觉CDN没用？

   ```
   正常，由于首次访问时，CDN未对源站的相关资源进行缓存，需要回源拉取资源。您可以在首次访问前，进行缓存预热，将访问频率高的资源预热到CDN。
   ```

   
