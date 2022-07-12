(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{608:function(s,t,a){"use strict";a.r(t);var r=a(10),e=Object(r.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[s._v("#")]),s._v(" 问题")]),s._v(" "),a("blockquote",[a("p",[s._v("某天突然收到预警邮件，服务器CPU超过阈值，并且一直持续居高不下")])]),s._v(" "),a("h3",{attrs:{id:"分析原因"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分析原因"}},[s._v("#")]),s._v(" 分析原因")]),s._v(" "),a("ol",[a("li",[s._v("使用"),a("code",[s._v("htop")]),s._v("查看资源消耗，按照CPU使用率降序排列，发现都是mysqld进程占用CPU很高")]),s._v(" "),a("li",[s._v("进入mysql命令行使用"),a("code",[s._v("show processlist;")]),s._v("查看当前正在执行的命令，经过多次执行"),a("code",[s._v("show processlist")]),s._v("发现有几条固定的sql一直在执行，并且每次传递的参数害不一样")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("mysql"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" show processlist"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n+--------+------+-------------------+--------------------------+---------+------+--------------+-----------------------------------------------------------------------------------------------+\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Id     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" User "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Host              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db                       "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Command "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Time "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" State        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Info                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n+--------+------+-------------------+--------------------------+---------+------+--------------+-----------------------------------------------------------------------------------------------+\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("130878")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:43314   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" bomconfig                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("77")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("132762")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:34342   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx_weibao              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Query   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sending data "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" SELECT vir.*, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" as business_type\n                FROM ccsx_data.v_install_record vir\n                WHERE vir.id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1948")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("132841")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:42218   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx                     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("574")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("132955")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:54332   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx                     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("693")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133058")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:38132   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" bomconfig                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("434")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133243")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:58272   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx_data                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("539")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133347")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:41100   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx_weibao              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Query   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sending data "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("select")]),s._v(" * from ccsx_weibao.install_record_accessory where "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("host_id")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2106")]),s._v("                         "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133416")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:47832   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" international_ccsx_data  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("519")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133454")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:51226   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" internatinal_ccsx_weibao "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1194")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133459")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:51642   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx                     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133466")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:51956   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" bomconfig                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("488")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133467")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:51958   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" bomconfig                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("77")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133469")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:52616   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx_data                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sleep   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("540")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" NULL                                                                                          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("133519")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" localhost:57874   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ccsx_weibao              "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Query   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Sending data "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" SELECT vir.*, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" as business_type\n                FROM ccsx_data.v_install_record vir\n                WHERE vir.id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("19042")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])]),a("p",[s._v("经过第2步的执行，猜测有人在for循环中调用了查询，每次传递了不同的参数")]),s._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[s._v("为了确定我的分析正确性，复制"),a("code",[s._v("show processlist")]),s._v("结果中的sql，到项目代码查询，最终跟踪到如下代码，确实在循环中使用了查询，fuck！")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[s._v("\t"),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("List")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("InstallRecordVO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getInstalls")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("List")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Integer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" ids"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("List")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("InstallRecordVO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" installRecords "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ArrayList")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CollectionUtil")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("isNotEmpty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ids"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\t\tids"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("t"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("InstallRecordVO")]),s._v(" installRecordVO "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" installRecordMapper"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("queryById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("installRecordVO"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("List")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("InstallRecordAccessory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" installRecordAccessories "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" installRecordAccessoryMapper"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("queryByHostId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("installRecordVO"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//……省略部分代码")]),s._v("\n\t\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("List")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SysFile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" sysFileList "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" sysFileMapper"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("queryByBusinessInfo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("paramMap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//……省略部分代码")]),s._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" installRecords"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("光有以上代码还不能完全确定，这个循环在线上一直在执行，所以我决定使用arthas来进一步确定，于是我把arths attach到生产环境的项目上使用"),a("code",[s._v("trace")]),s._v("分别跟踪循环中的三个查询，看看是否正在执行，结果三个全在执行，印证了循环一直在执行，所以cpu问题就出现在这里了。")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("trace com.sonoscape.ccs.data.mapper.InstallRecordMapper queryById  -n "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" --skipJDKMethod "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v(" \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("trace com.sonoscape.ccs.data.mapper.InstallRecordAccessoryMapper queryByHostId  -n "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" --skipJDKMethod "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v(" \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("trace com.sonoscape.ccs.data.mapper.SysFileMapper queryByBusinessInfo  -n "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" --skipJDKMethod "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v(" \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("最后我找到这部分代码负责人，他的ids参数本应该是个过滤后的，理论上不会太多，结果因为调用函数不严谨导致查询出ids实际上是全表的，吐")])]),s._v(" "),a("h3",{attrs:{id:"结论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结论"}},[s._v("#")]),s._v(" 结论")]),s._v(" "),a("p",[s._v("不要轻易在循环执行sql")])])}),[],!1,null,null,null);t.default=e.exports}}]);