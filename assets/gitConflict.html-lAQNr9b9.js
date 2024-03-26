import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as o,e as i}from"./app-eaM1OiHO.js";const c={},p=i('<h2 id="一-git冲突出现的原因及解决方案" tabindex="-1"><a class="header-anchor" href="#一-git冲突出现的原因及解决方案"><span>一，git冲突出现的原因及解决方案</span></a></h2><p><strong>简单来说就是本地修改的文件和目标远程库的同一个文件都有修改，这时无论是pull,push,merge时都会产生冲突。</strong></p><p><strong>1.1 本地代码没有commit. 修改同一文件的不同处，依旧会产生冲突。</strong></p><ul><li>修改component.html本地文件第11行，既没有add,也没有commit</li><li>然后修改远程component.html远程文件第14行</li><li>本地执行git pull,拉取代码提示，同时修改component.html，提示发生冲突</li></ul><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723162517914.png" alt="image-20220723162517914"></p><p>此时，有以下3种解决办法。</p><ol><li><p>丢弃本地的发生冲突的文件(<code>git checkout -- component.html</code>),然后重新git pull代码</p></li><li><p>按照提示，先<code>commit</code>本地修改，然后再次执行pull操作，得到如下丑陋的提交记录。此时本地<code>commit</code>记录便会显示如下的丑陋的<code>commit</code>记录。由于发生了冲突，但是由于是修改的不同行，git直接帮我们把本地修改和远程修改直接合并了，并产生了一个新的提交节点 Merge branch.....</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/clipboard.png" alt="img"></p></li><li><p>采用<code>git stash</code>先暂存本地代码-&gt;然后<code>git pull</code> 代码-&gt;<code>git stash pop</code> 把暂存文件恢复-&gt;<code>git add xxx-&gt;git commit -m “xxx”</code>-&gt; <code>git push origin master</code></p><p>本地没有<code>commit</code>的情况下此时采用第3种解决方式会更好，<code>commit</code>记录不会产生一个丑陋的合并节点。</p></li></ol><p><strong>1.2 本地代码已经<code>commit</code>但是还没有<code>push</code>. 有时候经常会忘记先pull远程代码，直接push代码.如果本地和远程同时修改了同一文件，会产生提示</strong>。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723172630686.png" alt="image-20220723172630686"></p><p>看到这个提示:远程代码有修改，本地代码先要合并远程的代码才可以push.</p><p>不敢随便点按钮，毕竟不知道编辑器不知道隐藏了什么诡异的操作，给代码搞丢了。</p><p>我的操作，先关闭提示框。先执行git pull 同步远程代码，此时编辑器提示我有文件发生了冲突。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173039634.png" alt="image-20220723173039634"></p><p>点击Merge,选择手动合并冲突的代码。此时也会产生一个合并节点。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173207361.png" alt="image-20220723173207361"></p><p>然后git add -&gt;git commit -&gt; git push.</p><p><strong>1.3 就算本地和远程没有同时修改同一个文件。只要出现本地分支落后远程分支，就会出现该提示 push rejected的提示，此时我们就要先pull远程代码，然后再push代码即可。</strong></p><p>例如，我在远程新增一个文件，本地没有pull代码，此时本地分支是落后于远程分支的。如果你此时不知情，commit一些代码并准备push代码到远程会收到如下提示：</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726104412089.png" alt="image-20220726104412089"></p><p>此时我的操作是，依旧是关闭这个弹框，执行<code>git pull</code> 同步远程代码，这时会产生一个丑陋合并节点，因为远程和本地其实并没有发生冲突，这个merge节点也不会有任何提交内容。</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105156403.png" alt="image-20220726105156403"></p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105424098.png" alt="image-20220726105424098"></p>',22),g=[p];function n(a,m){return e(),o("div",null,g)}const r=t(c,[["render",n],["__file","gitConflict.html.vue"]]),h=JSON.parse('{"path":"/other/git/gitConflict.html","title":"git冲突出现的原因","lang":"zh-CN","frontmatter":{"title":"git冲突出现的原因","date":"2022-03-09T16:57:01.000Z","author":"zxf","category":["git 操作"],"tag":["必会"],"description":"一，git冲突出现的原因及解决方案 简单来说就是本地修改的文件和目标远程库的同一个文件都有修改，这时无论是pull,push,merge时都会产生冲突。 1.1 本地代码没有commit. 修改同一文件的不同处，依旧会产生冲突。 修改component.html本地文件第11行，既没有add,也没有commit 然后修改远程component.html...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/other/git/gitConflict.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"git冲突出现的原因"}],["meta",{"property":"og:description","content":"一，git冲突出现的原因及解决方案 简单来说就是本地修改的文件和目标远程库的同一个文件都有修改，这时无论是pull,push,merge时都会产生冲突。 1.1 本地代码没有commit. 修改同一文件的不同处，依旧会产生冲突。 修改component.html本地文件第11行，既没有add,也没有commit 然后修改远程component.html..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723162517914.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T13:56:59.000Z"}],["meta",{"property":"article:author","content":"zxf"}],["meta",{"property":"article:tag","content":"必会"}],["meta",{"property":"article:published_time","content":"2022-03-09T16:57:01.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-01T13:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git冲突出现的原因\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723162517914.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/clipboard.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723172630686.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173039634.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173207361.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726104412089.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105156403.png\\",\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105424098.png\\"],\\"datePublished\\":\\"2022-03-09T16:57:01.000Z\\",\\"dateModified\\":\\"2022-08-01T13:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"zxf\\"}]}"]]},"headers":[{"level":2,"title":"一，git冲突出现的原因及解决方案","slug":"一-git冲突出现的原因及解决方案","link":"#一-git冲突出现的原因及解决方案","children":[]}],"git":{"createdTime":1659362219000,"updatedTime":1659362219000,"contributors":[{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":2.74,"words":823},"filePathRelative":"other/git/gitConflict.md","localizedDate":"2022年3月9日","excerpt":"<h2>一，git冲突出现的原因及解决方案</h2>\\n<p><strong>简单来说就是本地修改的文件和目标远程库的同一个文件都有修改，这时无论是pull,push,merge时都会产生冲突。</strong></p>\\n<p><strong>1.1 本地代码没有commit. 修改同一文件的不同处，依旧会产生冲突。</strong></p>\\n<ul>\\n<li>修改component.html本地文件第11行，既没有add,也没有commit</li>\\n<li>然后修改远程component.html远程文件第14行</li>\\n<li>本地执行git pull,拉取代码提示，同时修改component.html，提示发生冲突</li>\\n</ul>","autoDesc":true}');export{r as comp,h as data};