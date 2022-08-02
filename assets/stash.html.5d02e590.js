import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{o as t,c as a,e as i}from"./app.ba7cbcee.js";const e={},o=i('<h2 id="\u4E00-\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u4E00-\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> \u4E00\uFF0C\u4F7F\u7528\u573A\u666F</h2><p>\u5728\u5F00\u53D1\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u7ECF\u5E38\u4F1A\u9047\u5230\uFF0C\u51E0\u4E2A\u5206\u652F\u5E76\u884C\u8FDB\u884C\u3002\u5F53\u5728A\u5206\u652F\u5F00\u53D1\uFF0C\u7A81\u7136\u53D1\u73B0\u6709\u4E2A\u7EBF\u4E0Abug\uFF0C\u9700\u8981\u4E34\u65F6\u5207\u6362\u5230B\u5206\u652F\u8FDB\u884C\u5904\u7406\uFF0C\u540C\u65F6\uFF0CA\u5206\u652F\u4E0A\u7684\u4EE3\u7801\u8FD8\u672A\u7F16\u5199\u5B8C\u6574\uFF0C\u4E0D\u60F3\u63D0\u4EA4\u4E0A\u53BB\u3002\u8FD9\u4E2A\u65F6\u5019\uFF0C<code>git stash</code>\u7684\u597D\u5904\u5C31\u63D0\u73B0\u51FA\u6765\u4E86\u3002</p><h2 id="\u4E8C-stash\u7684\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#\u4E8C-stash\u7684\u4F5C\u7528" aria-hidden="true">#</a> \u4E8C\uFF0Cstash\u7684\u4F5C\u7528</h2><p>stash\u4F1A\u8DDF\u8E2A\u6587\u4EF6\u7684\u4FEE\u6539\u4E0E\u6682\u5B58\u7684\u6539\u52A8\u2014\u2014\u7136\u540E\u5C06\u672A\u5B8C\u6210\u7684\u4FEE\u6539\u4FDD\u5B58\u5230\u4E00\u4E2A\u6808\u4E0A\uFF0C \u800C\u4F60\u53EF\u4EE5\u5728\u4EFB\u4F55\u65F6\u5019\u91CD\u65B0\u5E94\u7528\u8FD9\u4E9B\u6539\u52A8\uFF08\u751A\u81F3\u5728\u4E0D\u540C\u7684\u5206\u652F\u4E0A\uFF09\u3002</p><h2 id="\u4E09-\u4F7F\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u4E09-\u4F7F\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u4E09\uFF0C\u4F7F\u7528\u547D\u4EE4</h2><ol><li><p><strong>git status</strong>\u67E5\u770B\u54EA\u4E9B\u6587\u4EF6\u53D1\u751F\u53D8\u5316</p></li><li><p><strong>git stash</strong>\u628A\u6240\u6709\u6539\u52A8\u6682\u5B58\u8D77\u6765\uFF0C<code>git stash</code>\u7B49\u540C\u4E8E<code>git stash push</code>\uFF0C\u53EF\u4EE5\u7ED9\u5F53\u524Dstash\u589E\u52A0message\u65B9\u4FBF\u540E\u7EED\u67E5\u770B</p><p><code>git stash push -m &quot;message&quot;</code>,\u6267\u884C\u5B8C\uFF0C\u4F1A\u53D1\u73B0<code>git status</code>\u5F53\u524D\u5206\u652F\u53D8\u5F97\u8DDF\u6CA1\u6709\u6539\u52A8\u65F6\u4E00\u6837\u5E72\u51C0</p></li><li><p><code>git stash list</code> \u67E5\u770B\u5F53\u524D\u6808\u4E2D\u6709\u591A\u5C11\u6682\u5B58\u8BB0\u5F55</p></li><li><p>\u6062\u590D\u6808\u6700\u65B0\u7684\u4E00\u4E2A\u6682\u5B58\u53EF\u4EE5<code>git stash pop</code>,\u53D6\u6682\u5B58\u4E2D\u7684\u67D0\u4E00\u4EFD<code> git stash apply stash@{1}</code></p></li><li><p>pop<code> \u548C</code>apply<code>\u90FD\u53EF\u4EE5\u6062\u590D\u6682\u5B58\uFF0C\u4F46\u662F\uFF0Capply\u6267\u884C\u540E\uFF0C\u6682\u5B58\u8BB0\u5F55\u8FD8\u5B58\u5728\u3002</code>pop`\u5219\u4F1A\u4ECE\u6808\u4E2D\u79FB\u9664</p></li><li><p><code>git stash clear</code> \u5220\u9664\u6240\u6709\u7F13\u5B58\u7684stash</p></li><li><p><code>git stash drop stash@{$num}</code> \uFF1A\u4E22\u5F03stash@{$num}\u5B58\u50A8\uFF0C\u4ECE\u5217\u8868\u4E2D\u5220\u9664\u8FD9\u4E2A\u5B58\u50A8</p></li></ol><h2 id="\u56DB-\u672C\u5730\u89E3\u51B3\u51B2\u7A81" tabindex="-1"><a class="header-anchor" href="#\u56DB-\u672C\u5730\u89E3\u51B3\u51B2\u7A81" aria-hidden="true">#</a> \u56DB\uFF0C\u672C\u5730\u89E3\u51B3\u51B2\u7A81</h2><ol><li>\u628A\u81EA\u5DF1\u5F00\u53D1\u7684\u4EE3\u7801\u50A8\u85CF\u8D77\u6765git stash</li><li>git pull \u62C9\u53D6\u6700\u65B0\u4EE3\u7801</li><li>git stash pop \u628A\u6682\u5B58\u6587\u4EF6\u6062\u590D</li><li>\u67E5\u770B\u51B2\u7A81\uFF0C\u89E3\u51B3\u51B2\u7A81 git status -s</li><li>\u89E3\u51B3\u5B8C\u51B2\u7A81\u540E\u5C31\u53EF\u4EE5\u50CF\u6B63\u5E38\u63D0\u4EA4\u4EE3\u7801\u4E00\u6837\u64CD\u4F5C\u4E86\uFF0C</li><li>git add xxx</li><li>git commit -m \u201Cxxx\u201D</li><li>git push origin master:my_branch</li></ol>',8),h=[o];function d(l,c){return t(),a("div",null,h)}var n=s(e,[["render",d],["__file","stash.html.vue"]]);export{n as default};