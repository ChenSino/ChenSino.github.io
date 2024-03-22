import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c,e as a}from"./app-Cf-knFG-.js";const s={},i=a(`<h2 id="_1、一个真实的多模块maven项目" tabindex="-1"><a class="header-anchor" href="#_1、一个真实的多模块maven项目"><span>1、一个真实的多模块maven项目</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ tree <span class="token parameter variable">-d</span> <span class="token parameter variable">-L</span> <span class="token number">2</span>
.———————————————————————————————————最顶级pom所在目录
├── ccs-auth
│   ├── src
│   └── target
├── ccs-common——————————————————————通用模块聚合
│   ├── ccs-common-bom——————————————此模块是个pom类型的，负责管理整个项目jar包版本
│   ├── ccs-common-core
│   ├── ccs-common-data
│   ├── ccs-common-datasource
│   ├── ccs-common-feign
│   ├── ccs-common-gateway
│   ├── ccs-common-gray
│   ├── ccs-common-log
│   ├── ccs-common-oss
│   ├── ccs-common-security
│   ├── ccs-common-sentinel
│   ├── ccs-common-sequence
│   ├── ccs-common-swagger
│   └── ccs-common-transaction
├── ccs-data——————————————————————业务模块data，按照api和biz聚合
│   ├── ccs-data-api
│   └── ccs-data-biz
├── ccs-gateway
│   ├── src
│   └── target
├── ccs-panel
│   ├── ccs-panel-api
│   └── ccs-panel-biz
├── ccs-register
│   ├── src
│   └── target
├── ccs-upms
│   ├── ccs-upms-api
│   └── ccs-upms-biz
├── ccs-visual
│   ├── ccs-codegen
│   ├── ccs-oa-platform
│   └── ccs-tx-manager
├── ccs-weibao
    ├── ccs-weibao-api
    └── ccs-weibao-biz

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：<br> 通用模块common是一个多模块聚合的，其中有个common-bom是专门负责管理整个项目jar包版本。其他的data和weibao等是业务模块，业务模块一般分为两个子模块聚合在一起，分别是api和biz</p>`,3),m=[i];function t(o,l){return e(),c("div",null,m)}const v=n(s,[["render",t],["__file","multiModule.html.vue"]]),u=JSON.parse('{"path":"/java/other/maven/multiModule.html","title":"多模块maven项目的搭建","lang":"zh-CN","frontmatter":{"title":"多模块maven项目的搭建","date":"2022-07-28T00:00:00.000Z","author":"chenkun","publish":true,"keys":null,"description":"1、一个真实的多模块maven项目 说明： 通用模块common是一个多模块聚合的，其中有个common-bom是专门负责管理整个项目jar包版本。其他的data和weibao等是业务模块，业务模块一般分为两个子模块聚合在一起，分别是api和biz","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/other/maven/multiModule.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"多模块maven项目的搭建"}],["meta",{"property":"og:description","content":"1、一个真实的多模块maven项目 说明： 通用模块common是一个多模块聚合的，其中有个common-bom是专门负责管理整个项目jar包版本。其他的data和weibao等是业务模块，业务模块一般分为两个子模块聚合在一起，分别是api和biz"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"chenkun"}],["meta",{"property":"article:published_time","content":"2022-07-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"多模块maven项目的搭建\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chenkun\\"}]}"]]},"headers":[{"level":2,"title":"1、一个真实的多模块maven项目","slug":"_1、一个真实的多模块maven项目","link":"#_1、一个真实的多模块maven项目","children":[]}],"git":{"createdTime":1659925295000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":2}]},"readingTime":{"minutes":0.85,"words":255},"filePathRelative":"java/other/maven/multiModule.md","localizedDate":"2022年7月28日","excerpt":"<h2>1、一个真实的多模块maven项目</h2>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ tree <span class=\\"token parameter variable\\">-d</span> <span class=\\"token parameter variable\\">-L</span> <span class=\\"token number\\">2</span>\\n.———————————————————————————————————最顶级pom所在目录\\n├── ccs-auth\\n│   ├── src\\n│   └── target\\n├── ccs-common——————————————————————通用模块聚合\\n│   ├── ccs-common-bom——————————————此模块是个pom类型的，负责管理整个项目jar包版本\\n│   ├── ccs-common-core\\n│   ├── ccs-common-data\\n│   ├── ccs-common-datasource\\n│   ├── ccs-common-feign\\n│   ├── ccs-common-gateway\\n│   ├── ccs-common-gray\\n│   ├── ccs-common-log\\n│   ├── ccs-common-oss\\n│   ├── ccs-common-security\\n│   ├── ccs-common-sentinel\\n│   ├── ccs-common-sequence\\n│   ├── ccs-common-swagger\\n│   └── ccs-common-transaction\\n├── ccs-data——————————————————————业务模块data，按照api和biz聚合\\n│   ├── ccs-data-api\\n│   └── ccs-data-biz\\n├── ccs-gateway\\n│   ├── src\\n│   └── target\\n├── ccs-panel\\n│   ├── ccs-panel-api\\n│   └── ccs-panel-biz\\n├── ccs-register\\n│   ├── src\\n│   └── target\\n├── ccs-upms\\n│   ├── ccs-upms-api\\n│   └── ccs-upms-biz\\n├── ccs-visual\\n│   ├── ccs-codegen\\n│   ├── ccs-oa-platform\\n│   └── ccs-tx-manager\\n├── ccs-weibao\\n    ├── ccs-weibao-api\\n    └── ccs-weibao-biz\\n\\n</code></pre></div>","autoDesc":true}');export{v as comp,u as data};
