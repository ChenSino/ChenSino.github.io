import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";import{o,c,b as a,a as n,e as p,d as e,r as t}from"./app.c91928b8.js";const l={},i=p(`<p>\u5728\u524D\u9762\u51E0\u8BB2\u4E2D\uFF0C\u6211\u90FD\u662F\u57FA\u4E8E Web \u5E94\u7528\u7684\u573A\u666F\u6765\u8BB2\u89E3\u7684 OAuth 2.0\u3002\u9664\u4E86 Web \u5E94\u7528\u5916\uFF0C\u73B0\u5B9E\u73AF\u5883\u4E2D\u8FD8\u6709\u975E\u5E38\u591A\u7684\u79FB\u52A8 App\u3002\u90A3\u4E48\uFF0C\u5728\u79FB\u52A8 App \u4E2D\uFF0C\u80FD\u4E0D\u80FD\u4F7F\u7528 OAuth 2.0 \uFF0C\u53C8\u8BE5\u5982\u4F55\u4F7F\u7528 OAuth 2.0 \u5462\uFF1F</p><p>\u6CA1\u9519\uFF0COAuth 2.0 \u6700\u521D\u7684\u5E94\u7528\u573A\u666F\u786E\u5B9E\u662F Web \u5E94\u7528\uFF0C\u4F46\u662F\u5B83\u7684\u4F1F\u5927\u4E4B\u5904\u5C31\u5728\u4E8E\uFF0C\u5B83\u628A\u81EA\u5DF1\u7684\u6838\u5FC3\u534F\u8BAE\u5B9A\u4F4D\u6210\u4E86\u4E00\u4E2A\u6846\u67B6\u800C\u4E0D\u662F\u5355\u4E2A\u7684\u534F\u8BAE\u3002\u8FD9\u6837\u505A\u7684\u597D\u5904\u662F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u57FA\u4E8E\u8FD9\u4E2A\u57FA\u672C\u7684\u6846\u67B6\u534F\u8BAE\uFF0C\u5728\u4E00\u4E9B\u7279\u5B9A\u7684\u9886\u57DF\u8FDB\u884C\u6269\u5C55\u3002</p><p>\u56E0\u6B64\uFF0C\u5230\u4E86\u684C\u9762\u6216\u8005\u79FB\u52A8\u7684\u573A\u666F\u4E0B\uFF0COAuth 2.0 \u7684\u534F\u8BAE\u4E00\u6837\u9002\u7528\u3002\u8003\u8651\u5230\u6388\u6743\u7801\u8BB8\u53EF\u662F\u6700\u5B8C\u5907\u3001\u6700\u5B89\u5168\u7684\u8BB8\u53EF\u7C7B\u578B\uFF0C\u6240\u4EE5\u6211\u5728\u8BB2\u79FB\u52A8 App \u5982\u4F55\u4F7F\u7528 OAuth 2.0 \u7684\u65F6\u5019\uFF0C\u4F9D\u7136\u4F1A\u7528\u6388\u6743\u7801\u8BB8\u53EF\u6765\u8BB2\u89E3\uFF0C\u6BD5\u7ADF\u201C\u8981\u7528\u5C31\u7528\u6700\u597D\u7684\u201D\u3002</p><p>\u5F53\u6211\u4EEC\u5F00\u53D1\u4E00\u6B3E\u79FB\u52A8 App \u7684\u65F6\u5019\uFF0C\u53EF\u4EE5\u9009\u62E9\u6CA1\u6709 Server \u7AEF\u7684 \u201C\u7EAF App\u201D \u67B6\u6784\uFF0C\u6BD4\u5982\u8FD9\u6B3E App \u4E0D\u9700\u8981\u8DDF\u81EA\u5DF1\u7684 Server \u7AEF\u901A\u4FE1\uFF0C\u6216\u8005\u53EF\u4EE5\u8C03\u7528\u5176\u5B83\u5F00\u653E\u7684 HTTP \u63A5\u53E3\uFF1B\u5F53\u7136\u4E5F\u53EF\u4EE5\u9009\u62E9\u6709\u670D\u52A1\u7AEF\u7684\u67B6\u6784\uFF0C\u6BD4\u5982\u8FD9\u6B3E App \u8FD8\u60F3\u628A\u7528\u6237\u7684\u64CD\u4F5C\u65E5\u5FD7\u8BB0\u5F55\u4E0B\u6765\u5E76\u4FDD\u5B58\u5230 Server \u7AEF\u7684\u6570\u636E\u5E93\u4E2D\u3002</p><p>\u90A3\u603B\u7ED3\u4E0B\u6765\u5462\uFF0C\u79FB\u52A8 App \u53EF\u4EE5\u5206\u4E3A\u4E24\u7C7B\uFF0C\u4E00\u7C7B\u662F\u6CA1\u6709 Server \u7AEF\u7684 App \u5E94\u7528\uFF0C\u4E00\u7C7B\u662F\u6709 Server \u7AEF\u7684 App \u5E94\u7528\u3002</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/4c034e019467aafae511f16055b57b99.png" alt="\u56FE1 \u4E24\u7C7B\u79FB\u52A8App" loading="lazy"></p><p>\u8FD9\u4E24\u7C7B App \u5728\u4F7F\u7528 OAuth 2.0 \u65F6\u7684\u6700\u5927\u533A\u522B\uFF0C\u5728\u4E8E\u83B7\u53D6\u8BBF\u95EE\u4EE4\u724C\u7684\u65B9\u5F0F\uFF1A</p><ul><li>\u5982\u679C\u6709 Server \u7AEF\uFF0C\u5C31\u5EFA\u8BAE\u901A\u8FC7 Server \u7AEF\u548C\u6388\u6743\u670D\u52A1\u505A\u4EA4\u4E92\u6765\u6362\u53D6\u8BBF\u95EE\u4EE4\u724C\uFF1B</li><li>\u5982\u679C\u6CA1\u6709 Server \u7AEF\uFF0C\u90A3\u4E48\u53EA\u80FD\u901A\u8FC7\u524D\u7AEF\u901A\u4FE1\u6765\u8DDF\u6388\u6743\u670D\u52A1\u505A\u4EA4\u4E92\uFF0C\u6BD4\u5982\u5728\u4E0A\u4E00\u8BB2\u4E2D\u63D0\u5230\u7684\u9690\u5F0F\u8BB8\u53EF\u6388\u6743\u7C7B\u578B\u3002\u5F53\u7136\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u7684\u5B89\u5168\u6027\u5C31\u964D\u4F4E\u4E86\u5F88\u591A\u3002</li></ul><p>\u6709\u4E9B\u65F6\u5019\uFF0C\u6211\u4EEC\u53EF\u80FD\u89C9\u5F97\u81EA\u5DF1\u5F00\u53D1\u4E00\u4E2A App \u4E0D\u9700\u8981\u4E00\u4E2A Server \u7AEF\u3002\u90A3\u597D\uFF0C\u5C31\u8BA9\u6211\u4EEC\u5148\u6765\u770B\u770B\u6CA1\u6709 Server \u7AEF\u7684 App \u5E94\u7528\u5982\u4F55\u4F7F\u7528\u6388\u6743\u7801\u8BB8\u53EF\u7C7B\u578B\u3002</p><h3 id="\u6CA1\u6709-server-\u7AEF\u7684-app" tabindex="-1"><a class="header-anchor" href="#\u6CA1\u6709-server-\u7AEF\u7684-app" aria-hidden="true">#</a> \u6CA1\u6709 Server \u7AEF\u7684 App</h3><p>\u5728\u4E00\u4E2A\u6CA1\u6709 Server \u7AEF\u652F\u6301\u7684\u7EAF App \u5E94\u7528\u4E2D\uFF0C\u6211\u4EEC\u9996\u5148\u60F3\u5230\u7684\u662F\uFF0C\u5982\u4F55\u53EF\u4EE5\u50CF Web \u670D\u52A1\u90A3\u6837\uFF0C\u8BA9\u8BF7\u6C42\u548C\u54CD\u5E94\u201C\u6765\u53BB\u81EA\u5982\u201D\u5462\u3002</p><p>\u4F60\u53EF\u80FD\u4F1A\u60F3\uFF0C\u6211\u662F\u4E0D\u662F\u53EF\u4EE5\u5C06\u4E00\u4E2A\u201C\u8FF7\u4F60\u201D\u7684 Web \u670D\u52A1\u5668\u5D4C\u5165\u5230 App \u91CC\u9762\u53BB\uFF0C\u8FD9\u6837\u4E0D\u5C31\u53EF\u4EE5</p><p>\u8FD9\u6837\u7684 App \u901A\u8FC7\u76D1\u542C\u8FD0\u884C\u5728 localhost \u4E0A\u7684 Web \u670D\u52A1\u5668 URI\uFF0C\u5C31\u53EF\u4EE5\u505A\u5230\u8DDF\u666E\u901A\u7684 Web \u5E94\u7528\u4E00\u6837\u7684\u901A\u4FE1\u673A\u5236\u3002\u4F46\u8FD9\u79CD\u65B9\u5F0F\u4E0D\u662F\u6211\u4EEC\u8FD9\u6B21\u8981\u8BB2\u7684\u91CD\u70B9\uFF0C\u5982\u679C\u4F60\u60F3\u6DF1\u5165\u4E86\u89E3\u53EF\u4EE5\u53BB\u67E5\u4E9B\u8D44\u6599\u3002\u56E0\u4E3A\u5F53\u4F7F\u7528\u8FD9\u79CD\u65B9\u5F0F\u7684\u65F6\u5019\uFF0C\u8BF7\u6C42\u8BBF\u95EE\u4EE4\u724C\u65F6\u9700\u8981\u7684 app_secret \u5C31\u53EA\u80FD\u4FDD\u5B58\u5728\u7528\u6237\u672C\u5730\u8BBE\u5907\u4E0A\uFF0C\u800C\u8FD9\u5E76\u4E0D\u662F\u6211\u4EEC\u6240\u5EFA\u8BAE\u7684\u3002</p><p>\u5230\u8FD9\u91CC\uFF0C\u4F60\u5E94\u8BE5\u731C\u5230\u4E86\uFF0C\u95EE\u9898\u7684\u5173\u952E\u5728\u4E8E\u5982\u4F55\u4FDD\u5B58 app_secret\uFF0C\u56E0\u4E3A App \u4F1A\u88AB\u5B89\u88C5\u5728\u6210\u5343\u4E0A\u4E07\u4E2A\u7EC8\u7AEF\u8BBE\u5907\u4E0A\uFF0Capp_secret \u4E00\u65E6\u88AB\u7834\u89E3\uFF0C\u5C31\u5C06\u4F1A\u9020\u6210\u707E\u96BE\u6027\u7684\u540E\u679C\u3002\u8FD9\u65F6\uFF0C\u6709\u7684\u540C\u5B66\u7A81\u53D1\u5947\u60F3\uFF0C\u5982\u679C\u4E0D\u7528 app_secret\uFF0C\u4E5F\u80FD\u5728\u6388\u6743\u7801\u6D41\u7A0B\u91CC\u6362\u56DE\u8BBF\u95EE\u4EE4\u724C access_token\uFF0C\u4E0D\u5C31\u53EF\u4EE5\u4E86\u5417\uFF1F</p><p>\u786E\u5B9E\u53EF\u4EE5\uFF0C\u4F46\u65B0\u7684\u95EE\u9898\u4E5F\u6765\u4E86\u3002\u5728\u6388\u6743\u7801\u8BB8\u53EF\u7C7B\u578B\u7684\u6D41\u7A0B\u4E2D\uFF0C\u5982\u679C\u6CA1\u6709\u4E86 app_secret \u8FD9\u4E00\u5C42\u7684\u4FDD\u62A4\uFF0C\u90A3\u4E48\u901A\u8FC7\u6388\u6743\u7801 code \u6362\u53D6\u8BBF\u95EE\u4EE4\u724C\u7684\u65F6\u5019\uFF0C\u5C31\u53EA\u6709\u6388\u6743\u7801 code \u5728\u201C\u51B2\u950B\u9677\u9635\u201D\u4E86\u3002\u8FD9\u65F6\uFF0C\u6388\u6743\u7801 code \u4E00\u65E6\u5931\u7A83\uFF0C\u5C31\u4F1A\u5E26\u6765\u4E25\u91CD\u7684\u5B89\u5168\u95EE\u9898\u3002\u90A3\u4E48\uFF0C\u6211\u65E2\u4E0D\u4F7F\u7528 app_secret\uFF0C\u8FD8\u8981\u9632\u6B62\u6388\u6743\u7801 code \u5931\u7A83\uFF0C\u6709\u4EC0\u4E48\u597D\u7684\u65B9\u6CD5\u5417\uFF1F</p><p>\u6709\uFF0COAuth 2.0 \u91CC\u9762\u5C31\u6709\u8FD9\u6837\u7684\u6307\u5BFC\u65B9\u6CD5\u3002\u8FD9\u4E2A\u65B9\u6CD5\u5C31\u662F\u6211\u4EEC\u5C06\u8981\u4ECB\u7ECD\u7684 PKCE \u534F\u8BAE\uFF0C\u5168\u79F0\u662F Proof Key for Code Exchange by OAuth Public Clients\u3002</p><p>\u5728\u4E0B\u9762\u7684\u6D41\u7A0B\u56FE\u4E2D\uFF0C\u4E3A\u4E86\u7A81\u51FA\u7B2C\u4E09\u65B9\u8F6F\u4EF6\u4F7F\u7528 PKCE \u534F\u8BAE\u65F6\u4E0E\u6388\u6743\u670D\u52A1\u4E4B\u95F4\u7684\u901A\u4FE1\u8FC7\u7A0B\uFF0C\u6211\u7701\u7565\u4E86\u53D7\u4FDD\u62A4\u8D44\u6E90\u670D\u52A1\u548C\u8D44\u6E90\u62E5\u6709\u8005\u7684\u89D2\u8272\uFF1A</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/66648bff2d955b3d714ce597299fbf52.png" alt="\u56FE2 \u4F7F\u7528PKCE\u534F\u8BAE\u7684\u6D41\u7A0B\u56FE" loading="lazy"></p><p>\u6211\u6765\u548C\u4F60\u5206\u6790\u4E0B\u8FD9\u4E2A\u6D41\u7A0B\u4E2D\u7684\u91CD\u70B9\u3002</p><p>\u9996\u5148\uFF0CApp \u81EA\u5DF1\u8981\u751F\u6210\u4E00\u4E2A\u968F\u673A\u7684\u3001\u957F\u5EA6\u5728 43~128 \u5B57\u7B26\u4E4B\u95F4\u7684\u3001\u53C2\u6570\u4E3A code_verifier \u7684\u5B57\u7B26\u4E32\u9A8C\u8BC1\u7801\uFF1B\u63A5\u7740\uFF0C\u6211\u4EEC\u518D\u5229\u7528\u8FD9\u4E2A code_verifier\uFF0C\u6765\u751F\u6210\u4E00\u4E2A\u88AB\u79F0\u4E3A\u201C\u6311\u6218\u7801\u201D\u7684\u53C2\u6570code_challenge\u3002</p><p>\u90A3\u600E\u4E48\u751F\u6210\u8FD9\u4E2A code_challenge \u7684\u503C\u5462\uFF1FOAuth 2.0 \u89C4\u8303\u91CC\u9762\u7ED9\u51FA\u4E86\u4E24\u79CD\u65B9\u6CD5\uFF0C\u5C31\u662F\u770B code_challenge_method \u8FD9\u4E2A\u53C2\u6570\u7684\u503C\uFF1A</p><ul><li>\u4E00\u79CD code_challenge_method=plain\uFF0C\u6B64\u65F6 code_verifier \u7684\u503C\u5C31\u662F code_challenge \u7684\u503C\uFF1B</li><li>\u53E6\u5916\u4E00\u79CD code_challenge_method=S256\uFF0C\u5C31\u662F\u5C06 code_verifier \u503C\u8FDB\u884C ASCII \u7F16\u7801\u4E4B\u540E\u518D\u8FDB\u884C\u54C8\u5E0C\uFF0C\u7136\u540E\u518D\u5C06\u54C8\u5E0C\u4E4B\u540E\u7684\u503C\u8FDB\u884C BASE64-URL \u7F16\u7801\uFF0C\u5982\u4E0B\u4EE3\u7801\u6240\u793A\u3002</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>code_challenge <span class="token operator">=</span> BASE64URL-ENCODE<span class="token punctuation">(</span>SHA256<span class="token punctuation">(</span>ASCII<span class="token punctuation">(</span>code_verifier<span class="token punctuation">))</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u597D\u4E86\uFF0C\u6211\u77E5\u9053\u6709\u8FD9\u6837\u4E24\u4E2A\u503C\uFF0C\u4E5F\u77E5\u9053\u5B83\u4EEC\u7684\u751F\u6210\u65B9\u6CD5\u4E86\uFF0C\u4F46\u8FD9\u4E24\u4E2A\u503C\u8DDF\u6211\u4EEC\u7684\u6388\u6743\u7801\u6D41\u7A0B\u6709\u4EC0\u4E48\u5173\u7CFB\u5462\uFF0C\u53C8\u600E\u4E48\u5229\u7528\u5B83\u4EEC\u5462\uFF1F\u4E0D\u7528\u7740\u6025\uFF0C\u6211\u4EEC\u63A5\u7740\u8BB2\u3002</p><p>\u6388\u6743\u7801\u6D41\u7A0B\u7B80\u5355\u6982\u62EC\u8D77\u6765\u4E0D\u662F\u6709\u4E24\u6B65\u5417\uFF0C\u7B2C\u4E00\u6B65\u662F\u83B7\u53D6\u6388\u6743\u7801 code\uFF0C\u7B2C\u4E8C\u6B65\u662F\u7528 app_id+app_secret+code \u83B7\u53D6\u8BBF\u95EE\u4EE4\u724C access_token\u3002\u521A\u624D\u6211\u4EEC\u7684\u201C\u68A6\u60F3\u201D\u4E0D\u662F\u8BBE\u60F3\u4E0D\u4F7F\u7528 app_secret\uFF0C\u4F46\u540C\u65F6\u53C8\u80FD\u4FDD\u8BC1\u6388\u6743\u7801\u6D41\u7A0B\u7684\u5B89\u5168\u6027\u4E48\uFF1F</p><p>\u6CA1\u9519\u3002code_verifier \u548C code_challenge \u8FD9\u4E24\u4E2A\u53C2\u6570\uFF0C\u5C31\u662F\u6765\u5E2E\u6211\u4EEC\u5B9E\u73B0\u8FD9\u4E2A\u201C\u68A6\u60F3\u201D\u7684\u3002</p>`,26),d=e("\u5728\u7B2C\u4E00\u6B65\u83B7\u53D6\u6388\u6743\u7801 code \u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u4F7F\u7528 code_challenge \u53C2\u6570\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u6211\u4EEC\u8981\u540C\u65F6\u5C06 code_challenge_method \u53C2\u6570\u4E5F\u4F20\u8FC7\u53BB\uFF0C\u76EE\u7684\u662F\u8BA9\u6388\u6743\u670D\u52A1\u77E5\u9053\u751F\u6210 code_challenge \u503C\u7684\u65B9\u6CD5\u662F plain \u8FD8\u662F S256\u3002"),_={href:"https://authorization-server.com/auth?response_type=code&app_id=APP_ID&redirect_uri=REDIRECT_URI&code_challenge=CODE_CHALLENGE&code_challenge_method=S256",target:"_blank",rel:"noopener noreferrer"},h=e("https://authorization-server.com/auth?response_type=code&app_id=APP_ID&redirect_uri=REDIRECT_URI&code_challenge=CODE_CHALLENGE&code_challenge_method=S256"),v=p(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
https://authorization-server.com/auth?
<span class="token assign-left variable">response_type</span><span class="token operator">=</span>code<span class="token operator">&amp;</span>
<span class="token assign-left variable">app_id</span><span class="token operator">=</span>APP_ID<span class="token operator">&amp;</span>
<span class="token assign-left variable">redirect_uri</span><span class="token operator">=</span>REDIRECT_URI<span class="token operator">&amp;</span>
<span class="token assign-left variable">code_challenge</span><span class="token operator">=</span>CODE_CHALLENGE<span class="token operator">&amp;</span>
<span class="token assign-left variable">code_challenge_method</span><span class="token operator">=</span>S256
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u7B2C\u4E8C\u6B65\u83B7\u53D6\u8BBF\u95EE\u4EE4\u724C\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u4F7F\u7528 code_verifier \u53C2\u6570\uFF0C\u6388\u6743\u670D\u52A1\u6B64\u65F6\u4F1A\u5C06 code_verifier \u7684\u503C\u8FDB\u884C\u4E00\u6B21\u8FD0\u7B97\u3002\u90A3\u600E\u4E48\u8FD0\u7B97\u5462\uFF1F\u5C31\u662F\u4E0A\u9762 code_challenge_method=S256 \u7684\u8FD9\u79CD\u65B9\u5F0F\u3002</p><p>\u6CA1\u9519\uFF0C\u7B2C\u4E00\u6B65\u8BF7\u6C42\u6388\u6743\u7801\u7684\u65F6\u5019\uFF0C\u5DF2\u7ECF\u544A\u8BC9\u6388\u6743\u670D\u52A1\u751F\u6210 code_challenge \u7684\u65B9\u6CD5\u4E86\u3002\u6240\u4EE5\uFF0C\u5728\u7B2C\u4E8C\u6B65\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u6388\u6743\u670D\u52A1\u5C06\u8FD0\u7B97\u7684\u503C\u8DDF\u7B2C\u4E00\u6B65\u63A5\u6536\u5230\u7684\u503C\u505A\u6BD4\u8F83\uFF0C\u5982\u679C\u76F8\u540C\u5C31\u9881\u53D1\u8BBF\u95EE\u4EE4\u724C\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
POST https://api.authorization-server.com/token?
  <span class="token assign-left variable">grant_type</span><span class="token operator">=</span>authorization_code<span class="token operator">&amp;</span>
  <span class="token assign-left variable">code</span><span class="token operator">=</span>AUTH_CODE_HERE<span class="token operator">&amp;</span>
  <span class="token assign-left variable">redirect_uri</span><span class="token operator">=</span>REDIRECT_URI<span class="token operator">&amp;</span>
  <span class="token assign-left variable">app_id</span><span class="token operator">=</span>APP_ID<span class="token operator">&amp;</span>
  <span class="token assign-left variable">code_verifier</span><span class="token operator">=</span>CODE_VERIFIER
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u73B0\u5728\uFF0C\u4F60\u5C31\u77E5\u9053\u4E86\u6211\u4EEC\u662F\u5982\u4F55\u4F7F\u7528 code_verifier \u548C code_challenge \u8FD9\u4E24\u4E2A\u53C2\u6570\u7684\u4E86\u5427\u3002\u603B\u7ED3\u4E00\u4E0B\u5C31\u662F\uFF0C\u6362\u53D6\u6388\u6743\u7801 code \u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u4F7F\u7528 code_challenge \u53C2\u6570\u503C\uFF1B\u6362\u53D6\u8BBF\u95EE\u4EE4\u724C\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u4F7F\u7528 code_verifier \u53C2\u6570\u503C\u3002\u90A3\u4E48\uFF0C\u6709\u7684\u540C\u5B66\u4F1A\u7EE7\u7EED\u95EE\u4E86\uFF0C\u6211\u4EEC\u4E3A\u4EC0\u4E48\u8981\u8FD9\u6837\u505A\u5462\u3002</p><p>\u73B0\u5728\uFF0C\u5C31\u8BA9\u6211\u6765\u548C\u4F60\u5206\u6790\u4E00\u4E0B\u3002</p><p>\u6211\u4EEC\u7684\u613F\u671B\u662F\uFF0C\u6CA1\u6709 Server \u7AEF\u7684\u624B\u673A App\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u6388\u6743\u7801\u8BB8\u53EF\u6D41\u7A0B\uFF0C\u5BF9\u5427\uFF1Fapp_secret \u4E0D\u80FD\u7528\uFF0C\u56E0\u4E3A\u5B83\u53EA\u80FD\u88AB\u5B58\u5728\u7528\u6237\u7684\u8BBE\u5907\u4E0A\uFF0C\u6211\u4EEC\u62C5\u5FC3\u88AB\u6CC4\u9732\u3002</p><p>\u90A3\u4E48\uFF0C\u5728\u6CA1\u6709\u4E86 app_secret \u8FD9\u5C42\u4FDD\u62A4\u7684\u524D\u63D0\u4E0B\uFF0C\u5373\u4F7F\u6211\u4EEC\u7684\u6388\u6743\u7801 code \u88AB\u622A\u83B7\uFF0C\u518D\u52A0\u4E0A code_challenge \u4E5F\u540C\u65F6\u88AB\u622A\u83B7\u4E86\uFF0C\u90A3\u4E5F\u6CA1\u6709\u529E\u6CD5\u7531 code_challenge \u9006\u63A8\u51FA code_verifier \u7684\u503C\u3002\u800C\u6070\u6070\u5728\u7B2C\u4E8C\u6B65\u6362\u53D6\u8BBF\u95EE\u4EE4\u724C\u7684\u65F6\u5019\uFF0C\u6388\u6743\u670D\u52A1\u9700\u8981\u7684\u5C31\u662F code_verifier \u7684\u503C\u3002\u56E0\u6B64\uFF0C\u8FD9\u4E5F\u5C31\u907F\u514D\u4E86\u8BBF\u95EE\u4EE4\u724C\u88AB\u6076\u610F\u6362\u53D6\u7684\u5B89\u5168\u95EE\u9898\u3002</p><p>\u73B0\u5728\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 PKCE \u534F\u8BAE\u7684\u5E2E\u52A9\uFF0C\u8BA9\u6CA1\u6709 Server \u7AEF\u7684 App \u4E5F\u80FD\u591F\u5B89\u5168\u5730\u4F7F\u7528\u6388\u6743\u7801\u8BB8\u53EF\u7C7B\u578B\u8FDB\u884C\u6388\u6743\u4E86\u3002\u4F46\u662F\uFF0C\u6309\u7167 OAuth 2.0 \u7684\u89C4\u8303\u5EFA\u8BAE\uFF0C\u901A\u8FC7\u540E\u7AEF\u901A\u4FE1\u6765\u6362\u53D6\u8BBF\u95EE\u4EE4\u724C\u662F\u8F83\u4E3A\u5B89\u5168\u7684\u65B9\u5F0F\u3002\u6240\u4EE5\u5462\uFF0C\u5728\u8FD9\u91CC\uFF0C\u6211\u60F3\u8DDF\u4F60\u63A2\u8BA8\u7684\u662F\uFF0C\u6211\u4EEC\u771F\u7684\u4E0D\u9700\u8981\u4E00\u4E2A Server \u7AEF\u5417\uFF1F\u5728\u505A\u79FB\u52A8\u5E94\u7528\u5F00\u53D1\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u771F\u7684\u4ECE\u8BBE\u8BA1\u4E0A\u5C31\u51B3\u5B9A\u5E9F\u5F03 Server \u7AEF\u4E86\u5417\uFF1F</p><h3 id="\u6709-server-\u7AEF\u7684-app" tabindex="-1"><a class="header-anchor" href="#\u6709-server-\u7AEF\u7684-app" aria-hidden="true">#</a> \u6709 Server \u7AEF\u7684 App</h3><p>\u5982\u679C\u4F60\u5F00\u53D1\u63A5\u5165\u8FC7\u5FAE\u4FE1\u767B\u5F55\uFF0C\u5C31\u4F1A\u5728\u5FAE\u4FE1\u7684\u5B98\u65B9\u6587\u6863\u4E0A\u770B\u5230\u4E0B\u9762\u8FD9\u53E5\u8BDD\uFF1A</p><blockquote><p>\u5FAE\u4FE1 OAuth 2.0 \u6388\u6743\u767B\u5F55\u76EE\u524D\u652F\u6301 authorization_code \u6A21\u5F0F\uFF0C\u9002\u7528\u4E8E\u62E5\u6709 Server \u7AEF\u7684\u5E94\u7528\u6388\u6743\u3002</p></blockquote><p>\u6CA1\u9519\uFF0C\u5FAE\u4FE1\u7684 OAuth 2.0 \u6388\u6743\u767B\u5F55\uFF0C\u5C31\u662F\u5EFA\u8BAE\u6211\u4EEC\u9700\u8981\u4E00\u4E2A Server \u7AEF\u6765\u652F\u6301\u8FD9\u6837\u7684\u6388\u6743\u63A5\u5165\u3002</p><p>\u90A3\u4E48\uFF0C\u6709 Server \u7AEF\u652F\u6301\u7684 App \u53C8\u662F\u5982\u4F55\u4F7F\u7528 OAuth 2.0 \u7684\u6388\u6743\u7801\u8BB8\u53EF\u6D41\u7A0B\u7684\u5462\uFF1F\u5176\u5B9E\uFF0C\u5728\u524D\u9762\u51E0\u8BB2\u7684\u57FA\u7840\u4E0A\uFF0C\u6211\u4EEC\u73B0\u5728\u7406\u89E3\u8FD9\u6837\u7684\u573A\u666F\u5E76\u4E0D\u662F\u4EC0\u4E48\u96BE\u4E8B\u513F\u3002</p>`,14),u=e("\u6211\u4EEC\u4ECD\u4EE5\u5FAE\u4FE1\u767B\u5F55\u4E3A\u4F8B\uFF0C\u770B\u4E00\u4E0B"),g={href:"https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html",target:"_blank",rel:"noopener noreferrer"},A=e("\u5B98\u65B9\u7684\u6D41\u7A0B\u56FE"),b=e("\uFF1A"),m=p('<p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/86d3yy8fa419c94b7e3766fe0a4e3db1.png" alt="img" loading="lazy"></p><p>\u770B\u5230\u8FD9\u4E2A\u56FE\uFF0C\u4F60\u662F\u4E0D\u662F\u89C9\u5F97\u7279\u522B\u719F\u6089\uFF0C\u8DDF\u666E\u901A\u7684\u6388\u6743\u7801\u6D41\u7A0B\u6CA1\u6709\u533A\u522B\uFF0C\u4ECD\u662F\u4E24\u6B65\u8D70\u7684\u7B56\u7565\uFF1A\u7B2C\u4E00\u6B65\u6362\u53D6\u6388\u6743\u7801 code\uFF0C\u7B2C\u4E8C\u6B65\u901A\u8FC7\u6388\u6743\u7801 code \u6362\u53D6\u8BBF\u95EE\u4EE4\u724C access_token\u3002</p><p>\u8FD9\u91CC\u7684\u7B2C\u4E09\u65B9\u5E94\u7528\uFF0C\u5C31\u662F\u6211\u4EEC\u4F5C\u4E3A\u5F00\u53D1\u8005\u6765\u5F00\u53D1\u7684\u5E94\u7528\uFF0C\u5305\u542B\u4E86\u79FB\u52A8 App \u548C Server \u7AEF\u3002\u6211\u4EEC\u5C06\u5176\u201C\u653E\u5927\u201D\u5F97\u5230\u4E0B\u9762\u8FD9\u5F20\u56FE\uFF1A</p><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/564f5b7af360180d270e205df5f9c05e.png" alt="img" loading="lazy"></p><p>\u6211\u4EEC\u4ECE\u8FD9\u5F20\u201C\u653E\u5927\u201D\u7684\u56FE\u4E2D\uFF0C\u5C31\u4F1A\u53D1\u73B0\u6709 Server \u7AEF\u7684 App \u5728\u4F7F\u7528\u6388\u6743\u7801\u6D41\u7A0B\u7684\u65F6\u5019\uFF0C\u8DDF\u666E\u901A\u7684 Web \u5E94\u7528\u51E0\u4E4E\u6CA1\u6709\u4EFB\u4F55\u5DEE\u522B\u3002</p><p>\u5927\u6982\u6D41\u7A0B\u662F\uFF1A\u5F53\u6211\u4EEC\u8BBF\u95EE\u7B2C\u4E09\u65B9 App \u7684\u65F6\u5019\uFF0C\u9700\u8981\u7528\u5230\u5FAE\u4FE1\u6765\u767B\u5F55\uFF1B\u7B2C\u4E09\u65B9 App \u53EF\u4EE5\u62C9\u8D77\u5FAE\u4FE1\u7684 App\uFF0C\u6211\u4EEC\u4F1A\u5728\u5FAE\u4FE1\u7684 App \u91CC\u9762\u8FDB\u884C\u767B\u5F55\u53CA\u6388\u6743\uFF1B\u5FAE\u4FE1 Server \u7AEF\u9A8C\u8BC1\u6210\u529F\u4E4B\u540E\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u6388\u6743\u7801 code\uFF0C\u901A\u8FC7\u5FAE\u4FE1 App \u4F20\u9012\u7ED9\u4E86\u7B2C\u4E09\u65B9 App\uFF1B\u540E\u9762\u7684\u6D41\u7A0B\u5C31\u662F\u6211\u4EEC\u719F\u6089\u7684\u4F7F\u7528\u6388\u6743\u7801 code \u548C app_secret\uFF0C\u6362\u53D6\u8BBF\u95EE\u4EE4\u724C access_token \u7684\u503C\u4E86\u3002</p><p>\u8FD9\u6B21\u4F7F\u7528 app_secret \u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u662F\u5728\u7B2C\u4E09\u65B9 App \u7684 Server \u7AEF\u6765\u4F7F\u7528\u7684\uFF0C\u56E0\u6B64\u5B89\u5168\u6027\u4E0A\u6CA1\u6709\u4EFB\u4F55\u95EE\u9898\u3002</p><h3 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h3><p>\u4ECA\u5929\u8FD9\u4E00\u8BB2\uFF0C\u6211\u91CD\u70B9\u548C\u4F60\u8BB2\u4E86\u4E24\u5757\u5185\u5BB9\uFF0C\u6CA1\u6709 Server \u7AEF\u7684 App \u548C\u6709 Server \u7AEF\u7684 App \u5206\u522B\u662F\u5982\u4F55\u4F7F\u7528\u6388\u6743\u7801\u8BB8\u53EF\u7C7B\u578B\u7684\u3002\u6211\u5E0C\u671B\u4F60\u80FD\u591F\u8BB0\u4F4F\u4EE5\u4E0B\u4E24\u70B9\u5185\u5BB9\u3002</p><ol><li>\u6211\u4EEC\u4F7F\u7528 OAuth 2.0 \u534F\u8BAE\u7684\u76EE\u7684\uFF0C\u5C31\u662F\u8981\u8D77\u5230\u5B89\u5168\u6027\u7684\u4F5C\u7528\uFF0C\u4F46\u6709\u4E9B\u65F6\u5019\uFF0C\u56E0\u4E3A\u4F7F\u7528\u4E0D\u5F53\u53CD\u800C\u4F1A\u9020\u6210\u66F4\u5927\u7684\u5B89\u5168\u95EE\u9898\uFF0C\u6BD4\u5982\u5C06 app_secret \u653E\u5165 App \u4E2D\u7684\u6700\u57FA\u672C\u9519\u8BEF\u3002\u5982\u679C\u653E\u5F03\u4E86 app_secret\uFF0C\u53C8\u662F\u5982\u4F55\u8BA9\u6CA1\u6709 Server \u7AEF\u7684 App \u5B89\u5168\u5730\u4F7F\u7528\u6388\u6743\u7801\u8BB8\u53EF\u534F\u8BAE\u5462\uFF1F\u9488\u5BF9\u8FD9\u79CD\u60C5\u51B5\uFF0C\u6211\u548C\u4F60\u4ECB\u7ECD\u4E86 PKCE \u534F\u8BAE\u3002\u5B83\u662F\u4E00\u79CD\u5728\u5931\u53BB app_secret \u4FDD\u62A4\u7684\u65F6\u5019\uFF0C\u9632\u6B62\u6388\u6743\u7801\u5931\u7A83\u7684\u89E3\u51B3\u65B9\u6848\u3002</li><li>\u6211\u4EEC\u9700\u8981\u601D\u8003\u4E00\u4E0B\uFF0C\u6211\u4EEC\u7684 App \u771F\u7684\u4E0D\u9700\u8981\u4E00\u4E2A Server \u7AEF\u5417\uFF1F\u6211\u5EFA\u8BAE\u4F60\u5728\u5F00\u53D1\u79FB\u52A8 App \u7684\u65F6\u5019\uFF0C\u5C3D\u53EF\u80FD\u5730\u90FD\u8981\u642D\u5EFA\u4E00\u4E2A Server \u7AEF\uFF0C\u56E0\u4E3A\u901A\u8FC7\u540E\u7AEF\u901A\u4FE1\u6765\u4F20\u8F93\u8BBF\u95EE\u4EE4\u724C\u6BD4\u901A\u8FC7\u524D\u7AEF\u901A\u4FE1\u4F20\u8F93\u8981\u5B89\u5168\u5F97\u591A\u3002\u6211\u4E5F\u4E3E\u4E86\u5FAE\u4FE1\u7684\u4F8B\u5B50\uFF0C\u5F88\u591A\u5B98\u65B9\u7684\u5F00\u653E\u5E73\u53F0\u5728\u63D0\u4F9B OAuth 2.0 \u670D\u52A1\u7684\u65F6\u5019\uFF0C\u90FD\u4F1A\u5EFA\u8BAE\u5F00\u53D1\u8005\u8981\u6709\u4E00\u4E2A\u76F8\u5E94\u7684 Server \u7AEF\u3002</li></ol><h3 id="\u601D\u8003\u9898" tabindex="-1"><a class="header-anchor" href="#\u601D\u8003\u9898" aria-hidden="true">#</a> \u601D\u8003\u9898</h3><p>\u5728\u79FB\u52A8 App \u4E2D\uFF0C\u4F60\u8FD8\u80FD\u60F3\u5230\u6709\u54EA\u4E9B\u76F8\u5BF9\u5B89\u5168\u7684\u65B9\u5F0F\u6765\u4F7F\u7528 OAuth 2.0 \u5417\uFF1F</p>',12);function f(k,S){const s=t("ExternalLinkIcon");return o(),c("div",null,[i,a("p",null,[d,a("a",_,[h,n(s)])]),v,a("p",null,[u,a("a",g,[A,n(s)]),b]),m])}var O=r(l,[["render",f],["__file","07.html.vue"]]);export{O as default};