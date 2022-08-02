import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{o as c,c as o,e as p}from"./app.27ef7ac3.js";const i={},e=p('<h2 id="\u4E00-git\u51B2\u7A81\u51FA\u73B0\u7684\u539F\u56E0\u53CA\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u4E00-git\u51B2\u7A81\u51FA\u73B0\u7684\u539F\u56E0\u53CA\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> \u4E00\uFF0Cgit\u51B2\u7A81\u51FA\u73B0\u7684\u539F\u56E0\u53CA\u89E3\u51B3\u65B9\u6848</h2><p><strong>\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u672C\u5730\u4FEE\u6539\u7684\u6587\u4EF6\u548C\u76EE\u6807\u8FDC\u7A0B\u5E93\u7684\u540C\u4E00\u4E2A\u6587\u4EF6\u90FD\u6709\u4FEE\u6539\uFF0C\u8FD9\u65F6\u65E0\u8BBA\u662Fpull,push,merge\u65F6\u90FD\u4F1A\u4EA7\u751F\u51B2\u7A81\u3002</strong></p><p><strong>1.1 \u672C\u5730\u4EE3\u7801\u6CA1\u6709commit. \u4FEE\u6539\u540C\u4E00\u6587\u4EF6\u7684\u4E0D\u540C\u5904\uFF0C\u4F9D\u65E7\u4F1A\u4EA7\u751F\u51B2\u7A81\u3002</strong></p><ul><li>\u4FEE\u6539component.html\u672C\u5730\u6587\u4EF6\u7B2C11\u884C\uFF0C\u65E2\u6CA1\u6709add,\u4E5F\u6CA1\u6709commit</li><li>\u7136\u540E\u4FEE\u6539\u8FDC\u7A0Bcomponent.html\u8FDC\u7A0B\u6587\u4EF6\u7B2C14\u884C</li><li>\u672C\u5730\u6267\u884Cgit pull,\u62C9\u53D6\u4EE3\u7801\u63D0\u793A\uFF0C\u540C\u65F6\u4FEE\u6539component.html\uFF0C\u63D0\u793A\u53D1\u751F\u51B2\u7A81</li></ul><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723162517914.png" alt="image-20220723162517914"></p><p>\u6B64\u65F6\uFF0C\u6709\u4EE5\u4E0B3\u79CD\u89E3\u51B3\u529E\u6CD5\u3002</p><ol><li><p>\u4E22\u5F03\u672C\u5730\u7684\u53D1\u751F\u51B2\u7A81\u7684\u6587\u4EF6(<code>git checkout -- component.html</code>),\u7136\u540E\u91CD\u65B0git pull\u4EE3\u7801</p></li><li><p>\u6309\u7167\u63D0\u793A\uFF0C\u5148<code>commit</code>\u672C\u5730\u4FEE\u6539\uFF0C\u7136\u540E\u518D\u6B21\u6267\u884Cpull\u64CD\u4F5C\uFF0C\u5F97\u5230\u5982\u4E0B\u4E11\u964B\u7684\u63D0\u4EA4\u8BB0\u5F55\u3002\u6B64\u65F6\u672C\u5730<code>commit</code>\u8BB0\u5F55\u4FBF\u4F1A\u663E\u793A\u5982\u4E0B\u7684\u4E11\u964B\u7684<code>commit</code>\u8BB0\u5F55\u3002\u7531\u4E8E\u53D1\u751F\u4E86\u51B2\u7A81\uFF0C\u4F46\u662F\u7531\u4E8E\u662F\u4FEE\u6539\u7684\u4E0D\u540C\u884C\uFF0Cgit\u76F4\u63A5\u5E2E\u6211\u4EEC\u628A\u672C\u5730\u4FEE\u6539\u548C\u8FDC\u7A0B\u4FEE\u6539\u76F4\u63A5\u5408\u5E76\u4E86\uFF0C\u5E76\u4EA7\u751F\u4E86\u4E00\u4E2A\u65B0\u7684\u63D0\u4EA4\u8282\u70B9 Merge branch.....</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/clipboard.png" alt="img"></p></li><li><p>\u91C7\u7528<code>git stash</code>\u5148\u6682\u5B58\u672C\u5730\u4EE3\u7801-&gt;\u7136\u540E<code>git pull</code> \u4EE3\u7801-&gt;<code>git stash pop</code> \u628A\u6682\u5B58\u6587\u4EF6\u6062\u590D-&gt;<code>git add xxx-&gt;git commit -m \u201Cxxx\u201D</code>-&gt; <code>git push origin master</code></p><p>\u672C\u5730\u6CA1\u6709<code>commit</code>\u7684\u60C5\u51B5\u4E0B\u6B64\u65F6\u91C7\u7528\u7B2C3\u79CD\u89E3\u51B3\u65B9\u5F0F\u4F1A\u66F4\u597D\uFF0C<code>commit</code>\u8BB0\u5F55\u4E0D\u4F1A\u4EA7\u751F\u4E00\u4E2A\u4E11\u964B\u7684\u5408\u5E76\u8282\u70B9\u3002</p></li></ol><p><strong>1.2 \u672C\u5730\u4EE3\u7801\u5DF2\u7ECF<code>commit</code>\u4F46\u662F\u8FD8\u6CA1\u6709<code>push</code>. \u6709\u65F6\u5019\u7ECF\u5E38\u4F1A\u5FD8\u8BB0\u5148pull\u8FDC\u7A0B\u4EE3\u7801\uFF0C\u76F4\u63A5push\u4EE3\u7801.\u5982\u679C\u672C\u5730\u548C\u8FDC\u7A0B\u540C\u65F6\u4FEE\u6539\u4E86\u540C\u4E00\u6587\u4EF6\uFF0C\u4F1A\u4EA7\u751F\u63D0\u793A</strong>\u3002</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723172630686.png" alt="image-20220723172630686"></p><p>\u770B\u5230\u8FD9\u4E2A\u63D0\u793A:\u8FDC\u7A0B\u4EE3\u7801\u6709\u4FEE\u6539\uFF0C\u672C\u5730\u4EE3\u7801\u5148\u8981\u5408\u5E76\u8FDC\u7A0B\u7684\u4EE3\u7801\u624D\u53EF\u4EE5push.</p><p>\u4E0D\u6562\u968F\u4FBF\u70B9\u6309\u94AE\uFF0C\u6BD5\u7ADF\u4E0D\u77E5\u9053\u7F16\u8F91\u5668\u4E0D\u77E5\u9053\u9690\u85CF\u4E86\u4EC0\u4E48\u8BE1\u5F02\u7684\u64CD\u4F5C\uFF0C\u7ED9\u4EE3\u7801\u641E\u4E22\u4E86\u3002</p><p>\u6211\u7684\u64CD\u4F5C\uFF0C\u5148\u5173\u95ED\u63D0\u793A\u6846\u3002\u5148\u6267\u884Cgit pull \u540C\u6B65\u8FDC\u7A0B\u4EE3\u7801\uFF0C\u6B64\u65F6\u7F16\u8F91\u5668\u63D0\u793A\u6211\u6709\u6587\u4EF6\u53D1\u751F\u4E86\u51B2\u7A81\u3002</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173039634.png" alt="image-20220723173039634"></p><p>\u70B9\u51FBMerge,\u9009\u62E9\u624B\u52A8\u5408\u5E76\u51B2\u7A81\u7684\u4EE3\u7801\u3002\u6B64\u65F6\u4E5F\u4F1A\u4EA7\u751F\u4E00\u4E2A\u5408\u5E76\u8282\u70B9\u3002</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220723173207361.png" alt="image-20220723173207361"></p><p>\u7136\u540Egit add -&gt;git commit -&gt; git push.</p><p><strong>1.3 \u5C31\u7B97\u672C\u5730\u548C\u8FDC\u7A0B\u6CA1\u6709\u540C\u65F6\u4FEE\u6539\u540C\u4E00\u4E2A\u6587\u4EF6\u3002\u53EA\u8981\u51FA\u73B0\u672C\u5730\u5206\u652F\u843D\u540E\u8FDC\u7A0B\u5206\u652F\uFF0C\u5C31\u4F1A\u51FA\u73B0\u8BE5\u63D0\u793A push rejected\u7684\u63D0\u793A\uFF0C\u6B64\u65F6\u6211\u4EEC\u5C31\u8981\u5148pull\u8FDC\u7A0B\u4EE3\u7801\uFF0C\u7136\u540E\u518Dpush\u4EE3\u7801\u5373\u53EF\u3002</strong></p><p>\u4F8B\u5982\uFF0C\u6211\u5728\u8FDC\u7A0B\u65B0\u589E\u4E00\u4E2A\u6587\u4EF6\uFF0C\u672C\u5730\u6CA1\u6709pull\u4EE3\u7801\uFF0C\u6B64\u65F6\u672C\u5730\u5206\u652F\u662F\u843D\u540E\u4E8E\u8FDC\u7A0B\u5206\u652F\u7684\u3002\u5982\u679C\u4F60\u6B64\u65F6\u4E0D\u77E5\u60C5\uFF0Ccommit\u4E00\u4E9B\u4EE3\u7801\u5E76\u51C6\u5907push\u4EE3\u7801\u5230\u8FDC\u7A0B\u4F1A\u6536\u5230\u5982\u4E0B\u63D0\u793A\uFF1A</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726104412089.png" alt="image-20220726104412089"></p><p>\u6B64\u65F6\u6211\u7684\u64CD\u4F5C\u662F\uFF0C\u4F9D\u65E7\u662F\u5173\u95ED\u8FD9\u4E2A\u5F39\u6846\uFF0C\u6267\u884C<code>git pull</code> \u540C\u6B65\u8FDC\u7A0B\u4EE3\u7801\uFF0C\u8FD9\u65F6\u4F1A\u4EA7\u751F\u4E00\u4E2A\u4E11\u964B\u5408\u5E76\u8282\u70B9\uFF0C\u56E0\u4E3A\u8FDC\u7A0B\u548C\u672C\u5730\u5176\u5B9E\u5E76\u6CA1\u6709\u53D1\u751F\u51B2\u7A81\uFF0C\u8FD9\u4E2Amerge\u8282\u70B9\u4E5F\u4E0D\u4F1A\u6709\u4EFB\u4F55\u63D0\u4EA4\u5185\u5BB9\u3002</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105156403.png" alt="image-20220726105156403"></p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220726105424098.png" alt="image-20220726105424098"></p>',22),g=[e];function l(s,a){return c(),o("div",null,g)}var d=t(i,[["render",l],["__file","gitConflict.html.vue"]]);export{d as default};
