import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,c as o,e}from"./app.455daa93.js";const r={},s=e('<h3 id="\u4E00-\u57FA\u672C\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u4E00-\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a> \u4E00\uFF0C\u57FA\u672C\u6982\u5FF5</h3><ul><li><strong>\u5DE5\u4F5C\u533A</strong>\uFF1A\u5C31\u662F\u4F60\u5728\u7535\u8111\u91CC\u80FD\u770B\u5230\u7684\u76EE\u5F55\u3002</li><li><strong>\u6682\u5B58\u533A</strong>\uFF1A\u82F1\u6587\u53EB stage \u6216 index\u3002\u4E00\u822C\u5B58\u653E\u5728 .git \u76EE\u5F55\u4E0B\u7684 index \u6587\u4EF6\uFF08.git/index\uFF09\u4E2D\uFF0C\u6240\u4EE5\u6211\u4EEC\u628A\u6682\u5B58\u533A\u6709\u65F6\u4E5F\u53EB\u4F5C\u7D22\u5F15\uFF08index\uFF09\u3002</li><li><strong>\u7248\u672C\u5E93</strong>\uFF1A\u5DE5\u4F5C\u533A\u6709\u4E00\u4E2A\u9690\u85CF\u76EE\u5F55 .git\uFF0C\u8FD9\u4E2A\u4E0D\u7B97\u5DE5\u4F5C\u533A\uFF0C\u800C\u662F Git \u7684\u7248\u672C\u5E93\u3002</li></ul><p>\u4E0B\u9762\u8FD9\u4E2A\u56FE\u5C55\u793A\u4E86\u5DE5\u4F5C\u533A\u3001\u7248\u672C\u5E93\u4E2D\u7684\u6682\u5B58\u533A\u548C\u7248\u672C\u5E93\u4E4B\u95F4\u7684\u5173\u7CFB\uFF1A</p><p><img src="http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220803144042656.png" alt="image-20220803144042656" loading="lazy"></p><ul><li>\u56FE\u4E2D\u5DE6\u4FA7\u4E3A\u5DE5\u4F5C\u533A\uFF0C\u53F3\u4FA7\u4E3A\u7248\u672C\u5E93\u3002\u5728\u7248\u672C\u5E93\u4E2D\u6807\u8BB0\u4E3A &quot;index&quot; \u7684\u533A\u57DF\u662F\u6682\u5B58\u533A\uFF08stage/index\uFF09\uFF0C\u6807\u8BB0\u4E3A &quot;master&quot; \u7684\u662F master \u5206\u652F\u6240\u4EE3\u8868\u7684\u76EE\u5F55\u6811\u3002</li><li>\u56FE\u4E2D\u6211\u4EEC\u53EF\u4EE5\u770B\u51FA\u6B64\u65F6 &quot;HEAD&quot; \u5B9E\u9645\u662F\u6307\u5411 master \u5206\u652F\u7684\u4E00\u4E2A&quot;\u6E38\u6807&quot;\u3002\u6240\u4EE5\u56FE\u793A\u7684\u547D\u4EE4\u4E2D\u51FA\u73B0 HEAD \u7684\u5730\u65B9\u53EF\u4EE5\u7528 master \u6765\u66FF\u6362\u3002</li><li>\u56FE\u4E2D\u7684 objects \u6807\u8BC6\u7684\u533A\u57DF\u4E3A Git \u7684\u5BF9\u8C61\u5E93\uFF0C\u5B9E\u9645\u4F4D\u4E8E &quot;.git/objects&quot; \u76EE\u5F55\u4E0B\uFF0C\u91CC\u9762\u5305\u542B\u4E86\u521B\u5EFA\u7684\u5404\u79CD\u5BF9\u8C61\u53CA\u5185\u5BB9\u3002</li><li>\u5F53\u5BF9\u5DE5\u4F5C\u533A\u4FEE\u6539\uFF08\u6216\u65B0\u589E\uFF09\u7684\u6587\u4EF6\u6267\u884C <mark><strong>git add \u547D\u4EE4\u65F6\uFF0C\u6682\u5B58\u533A\u7684\u76EE\u5F55\u6811\u88AB\u66F4\u65B0</strong></mark> \uFF0C\u540C\u65F6\u5DE5\u4F5C\u533A\u4FEE\u6539\uFF08\u6216\u65B0\u589E\uFF09\u7684\u6587\u4EF6\u5185\u5BB9\u88AB\u5199\u5165\u5230\u5BF9\u8C61\u5E93\u4E2D\u7684\u4E00\u4E2A\u65B0\u7684\u5BF9\u8C61\u4E2D\uFF0C\u800C\u8BE5\u5BF9\u8C61\u7684ID\u88AB\u8BB0\u5F55\u5728\u6682\u5B58\u533A\u7684\u6587\u4EF6\u7D22\u5F15\u4E2D\u3002</li><li>\u5F53\u6267\u884C\u63D0\u4EA4\u64CD\u4F5C\uFF08git commit\uFF09\u65F6\uFF0C\u6682\u5B58\u533A\u7684\u76EE\u5F55\u6811\u5199\u5230\u7248\u672C\u5E93\uFF08\u5BF9\u8C61\u5E93\uFF09\u4E2D\uFF0Cmaster \u5206\u652F\u4F1A\u505A\u76F8\u5E94\u7684\u66F4\u65B0\u3002\u5373 master \u6307\u5411\u7684\u76EE\u5F55\u6811\u5C31\u662F\u63D0\u4EA4\u65F6\u6682\u5B58\u533A\u7684\u76EE\u5F55\u6811\u3002</li><li>\u5F53\u6267\u884C <strong>git reset HEAD</strong> \u547D\u4EE4\u65F6\uFF0C\u6682\u5B58\u533A\u7684\u76EE\u5F55\u6811\u4F1A\u88AB\u91CD\u5199\uFF0C\u88AB master \u5206\u652F\u6307\u5411\u7684\u76EE\u5F55\u6811\u6240\u66FF\u6362\uFF0C\u4F46\u662F\u5DE5\u4F5C\u533A\u4E0D\u53D7\u5F71\u54CD\u3002</li><li>\u5F53\u6267\u884C <strong>git rm --cached &lt;file&gt;</strong> \u547D\u4EE4\u65F6\uFF0C\u4F1A\u76F4\u63A5\u4ECE\u6682\u5B58\u533A\u5220\u9664\u6587\u4EF6\uFF0C\u5DE5\u4F5C\u533A\u5219\u4E0D\u505A\u51FA\u6539\u53D8\u3002</li><li>\u5F53\u6267\u884C <strong>git checkout .</strong> \u6216\u8005 <strong>git checkout -- &lt;file&gt;</strong> \u547D\u4EE4\u65F6\uFF0C\u4F1A\u7528\u6682\u5B58\u533A\u5168\u90E8\u6216\u6307\u5B9A\u7684\u6587\u4EF6\u66FF\u6362\u5DE5\u4F5C\u533A\u7684\u6587\u4EF6\u3002\u8FD9\u4E2A\u64CD\u4F5C\u5F88\u5371\u9669\uFF0C\u4F1A\u6E05\u9664\u5DE5\u4F5C\u533A\u4E2D\u672A\u6DFB\u52A0\u5230\u6682\u5B58\u533A\u4E2D\u7684\u6539\u52A8\u3002</li><li>\u5F53\u6267\u884C <strong>git checkout HEAD .</strong> \u6216\u8005 <strong>git checkout HEAD &lt;file&gt;</strong> \u547D\u4EE4\u65F6\uFF0C\u4F1A\u7528 HEAD \u6307\u5411\u7684 master \u5206\u652F\u4E2D\u7684\u5168\u90E8\u6216\u8005\u90E8\u5206\u6587\u4EF6\u66FF\u6362\u6682\u5B58\u533A\u548C\u4EE5\u53CA\u5DE5\u4F5C\u533A\u4E2D\u7684\u6587\u4EF6\u3002\u8FD9\u4E2A\u547D\u4EE4\u4E5F\u662F\u6781\u5177\u5371\u9669\u6027\u7684\uFF0C\u56E0\u4E3A\u4E0D\u4F46\u4F1A\u6E05\u9664\u5DE5\u4F5C\u533A\u4E2D\u672A\u63D0\u4EA4\u7684\u6539\u52A8\uFF0C\u4E5F\u4F1A\u6E05\u9664\u6682\u5B58\u533A\u4E2D\u672A\u63D0\u4EA4\u7684\u6539\u52A8\u3002</li></ul>',5),l=[s];function g(n,a){return i(),o("div",null,l)}var m=t(r,[["render",g],["__file","gitwork.html.vue"]]);export{m as default};
