import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as c,o as a,c as r,a as e,b as t,d as s}from"./app-Cs38sdJl.js";const i={},p=e("p",null,"在codehub上有多个分支，每次的提交都会生成一个新的ID。如下图，假设开始各个分支都是根据ID2的提交更新后的代码进行修改，（ID号仅代表生成的时间顺序，实际的ID号是根据算法生成的）",-1),g=e("p",null,[e("img",{src:"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/4385e8c23d844b6e9c8b3f1171319b00.png",alt:"img"})],-1),l={href:"https://so.csdn.net/so/search?q=rebase&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,[e("strong",null,"merge的方法是合并库时推荐使用的方法。")],-1),d=e("p",null,"如下图，merge操作会将绿色的所有修改合并，解决冲突后在蓝色分支的后面新建一个ID，成为蓝色分支的最新提交，实际上就是基于父节点ID7的提交，入库后将蓝色分支库上代码更新。",-1),h=e("p",null,[e("img",{src:"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/bec81683ac884300851f42bd731c4861.png",alt:"img"})],-1),b=e("p",null,"如下图，rebase的方法是将提蓝色分支放到绿色分支后面提交，ID3\\ID4\\ID5\\ID7都会转换为新的ID并进行提交，由于父节点改变，每次提交都需要解决一次冲突，因此会大大增加分支合并的难度。",-1),u=e("p",null,[e("img",{src:"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/7ed03a3ace22445b9b5f8646fb8f1cc4.png",alt:"img"})],-1);function f(_,y){const o=c("ExternalLinkIcon");return a(),r("div",null,[p,g,e("p",null,[t("如果我们需要将绿色分支修改的代码更新到蓝色分支，本地远程分支内与个人工作分支已经是蓝色分支对应库内最新代码，那么在绿色远程分支代码更新到个人的库后（fetch），需要将本地远程分支代码更新到个人工作分支，这时有两种方法，"),e("a",l,[t("rebase"),s(o)]),t("和merge。")]),m,d,h,b,u])}const T=n(i,[["render",f],["__file","rebaseAndMerge.html.vue"]]),x=JSON.parse('{"path":"/other/git/rebaseAndMerge.html","title":"git rebase与merge的区别","lang":"zh-CN","frontmatter":{"title":"git rebase与merge的区别","date":"2022-07-26T16:57:01.000Z","category":["git 操作"],"tag":["必会"],"description":"在codehub上有多个分支，每次的提交都会生成一个新的ID。如下图，假设开始各个分支都是根据ID2的提交更新后的代码进行修改，（ID号仅代表生成的时间顺序，实际的ID号是根据算法生成的） img 如果我们需要将绿色分支修改的代码更新到蓝色分支，本地远程分支内与个人工作分支已经是蓝色分支对应库内最新代码，那么在绿色远程分支代码更新到个人的库后（fetc...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/git/rebaseAndMerge.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"git rebase与merge的区别"}],["meta",{"property":"og:description","content":"在codehub上有多个分支，每次的提交都会生成一个新的ID。如下图，假设开始各个分支都是根据ID2的提交更新后的代码进行修改，（ID号仅代表生成的时间顺序，实际的ID号是根据算法生成的） img 如果我们需要将绿色分支修改的代码更新到蓝色分支，本地远程分支内与个人工作分支已经是蓝色分支对应库内最新代码，那么在绿色远程分支代码更新到个人的库后（fetc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/4385e8c23d844b6e9c8b3f1171319b00.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T13:56:59.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:tag","content":"必会"}],["meta",{"property":"article:published_time","content":"2022-07-26T16:57:01.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-01T13:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git rebase与merge的区别\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/4385e8c23d844b6e9c8b3f1171319b00.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/bec81683ac884300851f42bd731c4861.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/7ed03a3ace22445b9b5f8646fb8f1cc4.png\\"],\\"datePublished\\":\\"2022-07-26T16:57:01.000Z\\",\\"dateModified\\":\\"2022-08-01T13:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1659362219000,"updatedTime":1659362219000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":1.29,"words":386},"filePathRelative":"other/git/rebaseAndMerge.md","localizedDate":"2022年7月26日","excerpt":"<p>在codehub上有多个分支，每次的提交都会生成一个新的ID。如下图，假设开始各个分支都是根据ID2的提交更新后的代码进行修改，（ID号仅代表生成的时间顺序，实际的ID号是根据算法生成的）</p>\\n<p><img src=\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/4385e8c23d844b6e9c8b3f1171319b00.png\\" alt=\\"img\\"></p>\\n<p>如果我们需要将绿色分支修改的代码更新到蓝色分支，本地远程分支内与个人工作分支已经是蓝色分支对应库内最新代码，那么在绿色远程分支代码更新到个人的库后（fetch），需要将本地远程分支代码更新到个人工作分支，这时有两种方法，<a href=\\"https://so.csdn.net/so/search?q=rebase&amp;spm=1001.2101.3001.7020\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">rebase</a>和merge。</p>","autoDesc":true}');export{T as comp,x as data};
