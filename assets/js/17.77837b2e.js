(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{569:function(s,t,a){"use strict";a.r(t);var n=a(13),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"_1、-githubpage介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、-githubpage介绍"}},[s._v("#")]),s._v(" 1、 GitHubPage介绍")]),s._v(" "),a("h3",{attrs:{id:"_1-1-ok"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-ok"}},[s._v("#")]),s._v(" 1.1 ok")]),s._v(" "),a("h3",{attrs:{id:"_1-2-搭建个人githubpage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-搭建个人githubpage"}},[s._v("#")]),s._v(" 1.2 搭建个人githubpage")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("个人page和项目page的区别就是个人page只有一个，所谓的个人Page说白了也是一个特殊的项目Page,无非就是它的仓库名字比较特殊，必须为&lt;username>.github.io，比如java框架`spring-cloud.github.io`、`facebook.github.io`，注意个人page的仓库名一定要加上 `.github.io`才算个人Page，不加的话就是一个普通项目了。\n个人page有啥特殊之处呢？\n在访问页面时可以直接使用https://&lt;username>.github.io,不用加仓库名，普通的项目page,访问时需要加仓库名，比如https://&lt;username>.github.io/&lt;reponame>\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"_2、配合github的action实现自动化部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、配合github的action实现自动化部署"}},[s._v("#")]),s._v(" 2、配合github的Action实现自动化部署")]),s._v(" "),a("h3",{attrs:{id:"_2-1-自动部署脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-自动部署脚本"}},[s._v("#")]),s._v(" 2.1 自动部署脚本")]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" docs\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 每当 push 到 main 分支时触发部署")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("branches")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("main"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 手动触发部署")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("workflow_dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("jobs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("docs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("runs-on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ubuntu"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("latest "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#在github服务器使用ubuntu环境")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("steps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/checkout@v2\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("fetch-depth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Setup Node.js\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/setup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("node@v1\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 选择要使用的 node 版本")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("node-version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"14"')]),s._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 缓存 node_modules")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Cache dependencies\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/cache@v2\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("id")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" npm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cache\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token scalar string"}},[s._v("\n            **/node_modules")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" runner.os "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("npm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" hashFiles('"),a("span",{pre:!0,attrs:{class:"token important"}},[s._v("**/package-lock.json')")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restore-keys")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token scalar string"}},[s._v("\n            ${{ runner.os }}-npm-")]),s._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果缓存没有命中，安装依赖")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Install dependencies\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" steps.npm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cache.outputs.cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("hit "),a("span",{pre:!0,attrs:{class:"token tag"}},[s._v("!=")]),s._v(" 'true'\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("run")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" npm install\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 运行构建脚本")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Build VuePress site\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("run")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" npm run build  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#命令和package.json保持一直，本地打包用什么，这里写什么")]),s._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看 workflow 的文档来获取更多信息")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# @see https://github.com/crazy-max/ghaction-github-pages")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Deploy to GitHub Pages\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" JamesIves/github"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("deploy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("action@3.7.1\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ACCESS_TOKEN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("secrets.xxx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#在github设置，这里名字要和你设置的保持一致,注意这里不是要你直接写token,是把xxx改成你设置的那个名字就ok了")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署到 gh-pages 分支")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("BRANCH")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" gh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署目录为 VuePress 的默认输出目录")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("FOLDER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" public\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br")])]),a("p",[a("em",[a("strong",[s._v("注意")])])]),s._v(" "),a("ol",[a("li",[s._v("在项目根路径新建一个.github/workflows/main.yml，yml中放以上内容")]),s._v(" "),a("li",[s._v("现在github主分支改成了main,所以需要在本地把分支修改一下"),a("code",[s._v("git branch -M main")])]),s._v(" "),a("li",[s._v("源码和打包后的public(一般是dist)文件夹分别放在两个分支，我这里源码在main分支，部署是在gh-pages分支，部署脚本会自动创建一个gh-pages分支。")]),s._v(" "),a("li",[s._v("ACCESS_TOKEN这里不要直接放密钥，而是放你生成的密钥对应的名字（github设置中那个note字段）")])])])}),[],!1,null,null,null);t.default=e.exports}}]);