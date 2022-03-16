---
title: 墙外的世界
date: 2018-05-15
---
### Manjaro使用v2raya

```shell
#启动
sudo systemctl start v2raya.service
# web管理界面
http://127.0.0.1:2017/
#忘记web管理密码
sudo systemctl stop v2raya.service
sudo v2raya --reset-password
```

![image-20220316214713478](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220316214713478.png)



```text
2022/03/16 21:47:25 [Warning] [285899553] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:26 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:27 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:28 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:30 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:31 127.0.0.1:51634 accepted //history.google.com:443 [msdxpyczsflkejh]
2022/03/16 21:47:31 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:32 127.0.0.1:51638 accepted //www.google.com:443 [msdxpyczsflkejh]
2022/03/16 21:47:32 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:33 [Warning] [3480984951] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:34 [Warning] [3852245298] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:35 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination > common/retry: [transport/internet/http: failed to dial to tcp:s290.s2022.xyz:33903 > Put "https://s290.s2022.xyz:33903/": tls: invalid NextProtos value] > common/retry: all retry attempts failed
2022/03/16 21:47:35 [Warning] app/proxyman/outbound: failed to process outbound traffic > proxy/vless/outbound: failed to find an available destination 
```

