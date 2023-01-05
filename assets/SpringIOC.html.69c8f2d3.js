const e=JSON.parse('{"key":"v-697485c6","path":"/java/framework/spring/SpringIOC.html","title":"Spring IOC \u5BB9\u5668\u6E90\u7801\u5206\u6790","lang":"zh-CN","frontmatter":{"name":"spring-ioc","title":"Spring IOC \u5BB9\u5668\u6E90\u7801\u5206\u6790","date":"2021-05-21T00:00:00.000Z","category":["open-source"],"summary":"Spring \u6700\u91CD\u8981\u7684\u6982\u5FF5\u662F IOC \u548C AOP\uFF0C\u672C\u7BC7\u6587\u7AE0\u5176\u5B9E\u5C31\u662F\u8981\u5E26\u9886\u5927\u5BB6\u6765\u5206\u6790\u4E0B Spring \u7684 IOC \u5BB9\u5668\u3002\u65E2\u7136\u5927\u5BB6\u5E73\u65F6\u90FD\u8981\u7528\u5230 Spring\uFF0C\u600E\u4E48\u53EF\u4EE5\u4E0D\u597D\u597D\u4E86\u89E3 Spring \u5462\uFF1F\u9605\u8BFB\u672C\u6587\u5E76\u4E0D\u80FD\u8BA9\u4F60\u6210\u4E3A Spring \u4E13\u5BB6\uFF0C\u4E0D\u8FC7\u4E00\u5B9A\u6709\u52A9\u4E8E\u5927\u5BB6\u7406\u89E3 Spring \u7684\u5F88\u591A\u6982\u5FF5\uFF0C\u5E2E\u52A9\u5927\u5BB6\u6392\u67E5\u5E94\u7528\u4E2D\u548C Spring \u76F8\u5173\u7684\u4E00\u4E9B\u95EE\u9898\u3002 \u672C\u6587\u91C7\u7528\u7684\u6E90\u7801\u7248\u672C\u662F","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/java/framework/spring/SpringIOC.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"Spring IOC \u5BB9\u5668\u6E90\u7801\u5206\u6790"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-12-27T02:12:09.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2021-05-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-27T02:12:09.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"\u5F15\u8A00","slug":"\u5F15\u8A00","children":[]},{"level":2,"title":"BeanFactory \u7B80\u4ECB","slug":"beanfactory-\u7B80\u4ECB","children":[]},{"level":2,"title":"\u542F\u52A8\u8FC7\u7A0B\u5206\u6790","slug":"\u542F\u52A8\u8FC7\u7A0B\u5206\u6790","children":[{"level":3,"title":"\u521B\u5EFA Bean \u5BB9\u5668\u524D\u7684\u51C6\u5907\u5DE5\u4F5C","slug":"\u521B\u5EFA-bean-\u5BB9\u5668\u524D\u7684\u51C6\u5907\u5DE5\u4F5C","children":[]},{"level":3,"title":"\u521B\u5EFA Bean \u5BB9\u5668\uFF0C\u52A0\u8F7D\u5E76\u6CE8\u518C Bean","slug":"\u521B\u5EFA-bean-\u5BB9\u5668-\u52A0\u8F7D\u5E76\u6CE8\u518C-bean","children":[]},{"level":3,"title":"Bean \u5BB9\u5668\u5B9E\u4F8B\u5316\u5B8C\u6210\u540E","slug":"bean-\u5BB9\u5668\u5B9E\u4F8B\u5316\u5B8C\u6210\u540E","children":[]},{"level":3,"title":"\u51C6\u5907 Bean \u5BB9\u5668: prepareBeanFactory","slug":"\u51C6\u5907-bean-\u5BB9\u5668-preparebeanfactory","children":[]},{"level":3,"title":"\u521D\u59CB\u5316\u6240\u6709\u7684 singleton beans","slug":"\u521D\u59CB\u5316\u6240\u6709\u7684-singleton-beans","children":[]}]},{"level":2,"title":"\u9644\u5F55","slug":"\u9644\u5F55","children":[{"level":3,"title":"id \u548C name","slug":"id-\u548C-name","children":[]},{"level":3,"title":"\u914D\u7F6E\u662F\u5426\u5141\u8BB8 Bean \u8986\u76D6\u3001\u662F\u5426\u5141\u8BB8\u5FAA\u73AF\u4F9D\u8D56","slug":"\u914D\u7F6E\u662F\u5426\u5141\u8BB8-bean-\u8986\u76D6\u3001\u662F\u5426\u5141\u8BB8\u5FAA\u73AF\u4F9D\u8D56","children":[]},{"level":3,"title":"profile","slug":"profile","children":[]},{"level":3,"title":"\u5DE5\u5382\u6A21\u5F0F\u751F\u6210 Bean","slug":"\u5DE5\u5382\u6A21\u5F0F\u751F\u6210-bean","children":[]},{"level":3,"title":"FactoryBean","slug":"factorybean","children":[]},{"level":3,"title":"\u521D\u59CB\u5316 Bean \u7684\u56DE\u8C03","slug":"\u521D\u59CB\u5316-bean-\u7684\u56DE\u8C03","children":[]},{"level":3,"title":"\u9500\u6BC1 Bean \u7684\u56DE\u8C03","slug":"\u9500\u6BC1-bean-\u7684\u56DE\u8C03","children":[]},{"level":3,"title":"ConversionService","slug":"conversionservice","children":[]},{"level":3,"title":"Bean \u7EE7\u627F","slug":"bean-\u7EE7\u627F","children":[]},{"level":3,"title":"\u65B9\u6CD5\u6CE8\u5165","slug":"\u65B9\u6CD5\u6CE8\u5165","children":[]},{"level":3,"title":"BeanPostProcessor","slug":"beanpostprocessor","children":[]}]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","children":[]}],"git":{"createdTime":1659362219000,"updatedTime":1672107129000,"contributors":[{"name":"ChenSino","email":"chenxk@sonoscape.net","commits":1},{"name":"chenkun","email":"462488588@qq.com","commits":1}]},"readingTime":{"minutes":60.7,"words":18209},"filePathRelative":"java/framework/spring/SpringIOC.md","localizedDate":"2021\u5E745\u670821\u65E5"}');export{e as data};