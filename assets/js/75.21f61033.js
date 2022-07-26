(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{567:function(a,s,t){"use strict";t.r(s);var e=t(10),n=function(a){a.options.__data__block__={mermaid_1a96284d:"graph LR\n    ccs((中控))\n    ccs--\x3e applet[小程序]--\x3e|登录|ccm[ccm系统]\n    ccs--\x3e back[后端]--\x3e|获取保修期/型号|erp[erp系统]\n     \tback--\x3e|图片|obs[obs云存储]\n     \tback--\x3e|获取订单号|equipment[主机制造]\n    \tback--\x3e|首页看板|ccm\n     ccs--\x3efront[前端]\n    \tfront--\x3ecdn[CDN加速]\n",mermaid_1a962851:"graph LR\nall((功能))--\x3esystem((系统功能))\n    system--\x3erole[角色管理]\n    system--\x3emenu[菜单管理]\n    system--\x3etenant[租户管理]\n    system--\x3euser[用户管理]\n    system--\x3edepartmen[部门管理]\n\n\nall((功能))--\x3emetadata((基础数据))\n  metadata--\x3ehospital[医院管理]\n  metadata--\x3ehostpitalDept[医院科室管理]\n  metadata--\x3earea[地区管理]\n  metadata--\x3emachineType[机型管理]\n  metadata--\x3edefault[故障管理]\n  metadata--\x3eagent[代理商]\n\nall((功能))--\x3ecore((核心业务))\n\n  core--\x3einstall[装机]\n    install--\x3eultrasound[超声]\n    install--\x3eendoscope[内镜]\n    install--\x3eexamine[检验]\n  core--\x3emaintenance[保养]\n    maintenance--\x3eultrasound[超声]\n    maintenance--\x3eendoscope[内镜]\n    maintenance--\x3eexamine[检验]\n\n  core--\x3erepair[维修]\n    repair--\x3eultrasound[超声]\n    repair--\x3eendoscope[内镜]\n    repair--\x3eexamine[检验]\n\n  core--\x3elifecycle[设备生命周期]\n  core--\x3eapproval[审批]\n"}},r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"_1、系统划分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、系统划分"}},[a._v("#")]),a._v(" 1、系统划分")]),a._v(" "),t("Mermaid",{attrs:{id:"mermaid_1a96284d",graph:a.$dataBlock.mermaid_1a96284d}}),t("h2",{attrs:{id:"_2、具体业务划分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、具体业务划分"}},[a._v("#")]),a._v(" 2、具体业务划分")]),a._v(" "),t("Mermaid",{attrs:{id:"mermaid_1a962851",graph:a.$dataBlock.mermaid_1a962851}}),t("h2",{attrs:{id:"_3、内外网系统交互"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、内外网系统交互"}},[a._v("#")]),a._v(" 3、内外网系统交互")]),a._v(" "),t("h3",{attrs:{id:"_3-1-通过frp打通内外网"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-通过frp打通内外网"}},[a._v("#")]),a._v(" 3.1 通过FRP打通内外网")]),a._v(" "),t("blockquote",[t("p",[a._v("我有一个在局域网内部的机器，可以访问外网，但是没有公网ip,我又不想麻烦it同事，那么如何通过公网来访问这个内网的服务？")]),a._v(" "),t("p",[a._v("答：可以使用FRP")])]),a._v(" "),t("p",[a._v("使用的条件：")]),a._v(" "),t("ol",[t("li",[a._v("有一个内网机器（需要访问外网权限），上面部署了想在外网访问的服务")]),a._v(" "),t("li",[a._v("有一个公网ip的机器")])]),a._v(" "),t("h4",{attrs:{id:"_3-1-1-frp在中控的使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-1-frp在中控的使用"}},[a._v("#")]),a._v(" 3.1.1 FRP在中控的使用")]),a._v(" "),t("p",[a._v("中控的一部分首页看板数据需要从ccm数据库获取，而ccm的数据库在内网，此处使用的是FRP内网穿透技术来实现公网访问内网。")]),a._v(" "),t("p",[t("img",{attrs:{src:"http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220330115046571.png",alt:"image-20220330115046571"}})]),a._v(" "),t("p",[t("strong",[a._v("具体实现原理：")])]),a._v(" "),t("ol",[t("li",[a._v("中控云服务器部署FRPS（h.sonocape.com），启动端口7000")]),a._v(" "),t("li",[a._v("内网服务器部署FRPC(10.10.100.68)，监听端口7000，同时在服务端启动一个1006端口，映射到本地3306数据库")])]),a._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("common"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 内网穿透服务器监听的IP地址，默认 127.0.0.1")]),a._v("\nbind_addr "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.0")]),a._v(".0.0\nbind_port "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("7000")]),a._v("\ntoken "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" sonoscape\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#监控界面配置")]),a._v("\ndashboard_addr "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.0")]),a._v(".0.0\ndashboard_port "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("7500")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 监控界面账号密码")]),a._v("\ndashboard_user "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" xx\ndashboard_pwd "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" xx\n\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br")])]),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("common"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\ntls_enable "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v("\nserver_addr "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("159.138")]),a._v(".45.48\nserver_port "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("7000")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("token")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("xx\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("67")]),a._v("-ccm-mysql"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("type")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" tcp\nlocal_ip "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),a._v(".0.1\nlocal_port "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("3306")]),a._v("\nremote_port "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1006")]),a._v("\n\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br")])]),t("p",[t("img",{attrs:{src:"http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220330120441985.png",alt:"image-20220330120441985"}})]),a._v(" "),t("p",[a._v("通过以上配置后，FRP客户端会在外网服务器启动一个1006端口，访问"),t("code",[a._v("h.sonoscape.com:1006")]),a._v("就等于访问内网那个的"),t("code",[a._v("10.10.102.106:3306")])]),a._v(" "),t("p",[a._v("云服务器的配置：")]),a._v(" "),t("p",[t("img",{attrs:{src:"http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220330120828935.png",alt:"image-20220330120828935"}})]),a._v(" "),t("p",[a._v("上图中devie-mysql我在hosts中配置映射到了127.0.0.1，在云服务器上访问"),t("code",[a._v("device-mysql:1006")]),a._v("会自动映射到内网"),t("code",[a._v("10.10.102.106:3306")])]),a._v(" "),t("p",[a._v("以上FRP实现其实就是一个反向代理。")]),a._v(" "),t("h3",{attrs:{id:"_3-2-找it申请外网端口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-找it申请外网端口"}},[a._v("#")]),a._v(" 3.2 找IT申请外网端口")]),a._v(" "),t("p",[a._v("中控请求主机制造的接口采用的这种方式")]),a._v(" "),t("p",[t("img",{attrs:{src:"http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220330133638523.png",alt:"image-20220330133638523"}})]),a._v(" "),t("h3",{attrs:{id:"_3-3-从业务角度优化访问内网数据慢的问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-从业务角度优化访问内网数据慢的问题"}},[a._v("#")]),a._v(" 3.3 从业务角度优化访问内网数据慢的问题")]),a._v(" "),t("p",[t("strong",[a._v("内网查询慢的原因：")])]),a._v(" "),t("p",[a._v("之前的设计是在分页查询到结果后，采用循环发送http请求到内网系统请求数据。")]),a._v(" "),t("p",[t("strong",[a._v("优化方法：")])]),a._v(" "),t("p",[a._v("在新增装机时发送一次请求到内网，然后把数据存到中控，后续查询一律从中控直接取")]),a._v(" "),t("h2",{attrs:{id:"_4、后续的用服业务规划"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、后续的用服业务规划"}},[a._v("#")]),a._v(" 4、后续的用服业务规划")]),a._v(" "),t("ol",[t("li",[t("p",[a._v("迁移ccm到中控直接集成到现有的ccs-data微服务")])]),a._v(" "),t("li",[t("p",[a._v("用服bom接入中控微服务，打通中控和bom的数据交互")])])])],1)}),[],!1,null,null,null);"function"==typeof n&&n(r);s.default=r.exports}}]);