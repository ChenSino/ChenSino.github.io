import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as o,e as i}from"./app-COSs6b7v.js";const r={},n=i('<h2 id="_1、权限说明" tabindex="-1"><a class="header-anchor" href="#_1、权限说明"><span>1、权限说明</span></a></h2><p>认证（Authentication）：登录操作就是最常见的认证方式，就是提供用户名和密码来证明自己是某个系统的合法用户，当用户没有经过认证去访问一个受保护资源时，应当响应401<br> 授权（Authorization）：授权是检验用户是否有权限访问某个资源，比如普通用户是无法看到管理员界面的，当用户无权访问某个资源，应当响应403</p><h2 id="_2、security中负责权限校验的类结构图" tabindex="-1"><a class="header-anchor" href="#_2、security中负责权限校验的类结构图"><span>2、Security中负责权限校验的类结构图</span></a></h2><p><img src="https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221220222603.png" alt="Security中权限类"></p><p>如上图，可以看到最底层有两个类，分别是<code>FilterSecurityInterceptor</code> 和<code>MethodSecurityInterceptor</code>，这两个类都是AbstractSecurityInterceptor的子类。<br> 其中FilterSecurityInterceptor还实现了Filter接口，它是一个SecurityFilter，是众多SecurityFilterChain过滤器中的一个，它处理认证问题，当用户访问未认证接口 会被此类拦截，抛出异常，返回401。</p><p>MethodSecurityInterceptor是当程序即将调用Controller中方法之前调用，对应的它处理Controller层被使用了@PreAuthorize注解的方法，它用来校验当前用户是否有注解中 包含的权限，当前用户不包含对应权限时，会抛出异常返回403。</p>',6),a=[n];function c(p,h){return e(),o("div",null,a)}const u=t(r,[["render",c],["__file","Authorization.html.vue"]]),m=JSON.parse('{"path":"/java/framework/security/Authorization.html","title":"权限校验原理","lang":"zh-CN","frontmatter":{"title":"权限校验原理","date":"2022-12-20T00:00:00.000Z","category":["security"],"description":"1、权限说明 认证（Authentication）：登录操作就是最常见的认证方式，就是提供用户名和密码来证明自己是某个系统的合法用户，当用户没有经过认证去访问一个受保护资源时，应当响应401 授权（Authorization）：授权是检验用户是否有权限访问某个资源，比如普通用户是无法看到管理员界面的，当用户无权访问某个资源，应当响应403 2、Secu...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/blog/java/framework/security/Authorization.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"权限校验原理"}],["meta",{"property":"og:description","content":"1、权限说明 认证（Authentication）：登录操作就是最常见的认证方式，就是提供用户名和密码来证明自己是某个系统的合法用户，当用户没有经过认证去访问一个受保护资源时，应当响应401 授权（Authorization）：授权是检验用户是否有权限访问某个资源，比如普通用户是无法看到管理员界面的，当用户无权访问某个资源，应当响应403 2、Secu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221220222603.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T03:45:12.000Z"}],["meta",{"property":"article:author","content":"ChenSino"}],["meta",{"property":"article:published_time","content":"2022-12-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T03:45:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"权限校验原理\\",\\"image\\":[\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221220222603.png\\"],\\"datePublished\\":\\"2022-12-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T03:45:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ChenSino\\",\\"url\\":\\"https://ChenSino.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、权限说明","slug":"_1、权限说明","link":"#_1、权限说明","children":[]},{"level":2,"title":"2、Security中负责权限校验的类结构图","slug":"_2、security中负责权限校验的类结构图","link":"#_2、security中负责权限校验的类结构图","children":[]}],"git":{"createdTime":1671546901000,"updatedTime":1711079112000,"contributors":[{"name":"ChenSino","email":"462488588@qq.com","commits":1},{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":1.08,"words":323},"filePathRelative":"java/framework/security/Authorization.md","localizedDate":"2022年12月20日","excerpt":"<h2>1、权限说明</h2>\\n<p>认证（Authentication）：登录操作就是最常见的认证方式，就是提供用户名和密码来证明自己是某个系统的合法用户，当用户没有经过认证去访问一个受保护资源时，应当响应401<br>\\n授权（Authorization）：授权是检验用户是否有权限访问某个资源，比如普通用户是无法看到管理员界面的，当用户无权访问某个资源，应当响应403</p>\\n<h2>2、Security中负责权限校验的类结构图</h2>\\n<p><img src=\\"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20221220222603.png\\" alt=\\"Security中权限类\\"></p>","autoDesc":true}');export{u as comp,m as data};
