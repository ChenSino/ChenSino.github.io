---
title: SpringMVC基本原理
date: 2023-06-25
isOriginal: true
category: 
tag: 
---

## SpringMVC处理请求的流程

![20230625180034](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230625180034.png)

## 前端控制器源码

~~~java

protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
  HttpServletRequest processedRequest = request;
  HandlerExecutionChain mappedHandler = null;
  boolean multipartRequestParsed = false;

  WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

  try {
   ModelAndView mv = null;
   Exception dispatchException = null;

   try {
    processedRequest = checkMultipart(request);
    multipartRequestParsed = (processedRequest != request);

    // Determine handler for the current request.
    mappedHandler = getHandler(processedRequest);
    if (mappedHandler == null) {
     noHandlerFound(processedRequest, response);
     return;
    }

    // Determine handler adapter for the current request.
    HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

    // Process last-modified header, if supported by the handler.
    String method = request.getMethod();
    boolean isGet = HttpMethod.GET.matches(method);
    if (isGet || HttpMethod.HEAD.matches(method)) {
     long lastModified = ha.getLastModified(request, mappedHandler.getHandler());
     if (new ServletWebRequest(request, response).checkNotModified(lastModified) && isGet) {
      return;
     }
    }

    if (!mappedHandler.applyPreHandle(processedRequest, response)) {
     return;
    }

    // Actually invoke the handler.
    mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

    if (asyncManager.isConcurrentHandlingStarted()) {
     return;
    }

    applyDefaultViewName(processedRequest, mv);
    mappedHandler.applyPostHandle(processedRequest, response, mv);
   }
   catch (Exception ex) {
    dispatchException = ex;
   }
   catch (Throwable err) {
    // As of 4.3, we're processing Errors thrown from handler methods as well,
    // making them available for @ExceptionHandler methods and other scenarios.
    dispatchException = new ServletException("Handler dispatch failed: " + err, err);
   }
   processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
  }
        //无关代码省略。。。。。
 }

~~~

### 步骤1 客户端发起请求，请求到达前端控制器

下图可以看到前端控制器本质也就是一个Servlet

![20230625180443](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230625180443.png)

### 步骤2. 根据请求获取HandlerMethod

在流程示意图上第二步指向了HandlerMapping,对应以下源码：

~~~java
 // Determine handler for the current request.
    mappedHandler = getHandler(processedRequest);
~~~

在getHandler方法里面如下，这一步是根据request请求对象获取HandlerMethod,然后包装在HandlerExecutionChain对象里，这里有个`handlerMappings`，是因为在SpringMVC中有多种请求处理的逻辑，比如`RequestMappingHandlerMapping`是专门负责处理被`@RequestMapping`注解的处理器，这个是我们平时最常用的那种方式。其他的HandlerMapping，比如BeanNameUrlHandlerMapping负责处理和Controller同名的请求，使用这种，需要继承Controller接口，重写里面的方法，具体的使用方式自行百度。
再比如`WebMvcEndpointHandlerMapping`是springboot提供的actator监控服务，它自带了一点监控端点，当引入了actuator监控时就可以看它负责处理以下url：
![20230626093758](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230626093758.png)

所以这里总结以下，HandlerMapping是有多个，不同的实现负责处理不同的url,RequestMappingHandlerMapping负责处理有@RequestMapping注解的url,WebMvcEndpointHandlerMapping处理监控请求，`mappedHandler = getHandler(processedRequest);`这个方法就是从SpringMVC众多HandlerMapping中选择适配的HandlerMapping,然后通过这个HandlerMapping和request中的url获取HandlerMethod,封装在HandlerExecutionChain对象中，HandlerMethod可以去看它的注释，它就是包含了一些映射信息，比如这个请求以后会被哪个bean处理，被这个bean的哪个方法处理，以及请求参数等

~~~java
protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
  if (this.handlerMappings != null) {
   for (HandlerMapping mapping : this.handlerMappings) {
    HandlerExecutionChain handler = mapping.getHandler(request);
    if (handler != null) {
     return handler;
    }
   }
  }
  return null;
 }
~~~

## 步骤3  获取HandlerAdapter

对应代码如下，从HandlerExecutionChain对象（mappedHandler）中通过getHandler方法获取对应HandlerAdapter对象

```java
// Determine handler adapter for the current request.
    HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
```

HandlerAdapter有以下几个

![20230625194052](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230625194052.png)

## 步骤4 通过HandlerAdapter真正调用业务处理逻辑

这里业务处理逻辑，如果我们使用的`@RequestMapping`注解，则就是调用我们对应的Controller方法中的代码，如果是其他的方式处理的请求，比如继承Controller接口，则调用的就是Controler接口中的handleRequest方法，所以这是经典的适配器模式。

处理完了要返回ModelAndView,如果适配到RequestMappingHandlerAdapter就有机会返回ModelAndView对象，其他的适配器一般都是返回null

![20230625195520](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230625195520.png)

![20230625195531](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20230625195531.png)

## 步骤5 渲染页面

对应代码如下`processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);`,processDispatchResult方法代码如下

~~~java
private void processDispatchResult(HttpServletRequest request, HttpServletResponse response,
   @Nullable HandlerExecutionChain mappedHandler, @Nullable ModelAndView mv,
   @Nullable Exception exception) throws Exception {

  boolean errorView = false;

  if (exception != null) {
   if (exception instanceof ModelAndViewDefiningException mavDefiningException) {
    logger.debug("ModelAndViewDefiningException encountered", exception);
    mv = mavDefiningException.getModelAndView();
   }
   else {
    Object handler = (mappedHandler != null ? mappedHandler.getHandler() : null);
    mv = processHandlerException(request, response, handler, exception);
    errorView = (mv != null);
   }
  }

  // Did the handler return a view to render?
  if (mv != null && !mv.wasCleared()) {
    //如果mv不是空渲染视图
   render(mv, request, response);
   if (errorView) {
    WebUtils.clearErrorRequestAttributes(request);
   }
  }
  else {
   if (logger.isTraceEnabled()) {
    logger.trace("No view rendering, null ModelAndView returned.");
   }
  }

  if (WebAsyncUtils.getAsyncManager(request).isConcurrentHandlingStarted()) {
   // Concurrent handling started during a forward
   return;
  }

  if (mappedHandler != null) {
   // Exception (if any) is already handled..
   mappedHandler.triggerAfterCompletion(request, response, null);
  }
 }
    ~~~



## chatGPT问答

~~~markdown
# HandlerMapping为什么有多个？

Spring MVC中有多个HandlerMapping是为了支持不同的URL映射策略。每个HandlerMapping实现都有自己的URL映射策略，可以根据具体的需求选择使用不同的HandlerMapping实现。例如，BeanNameUrlHandlerMapping将请求URL映射到bean名称，这个bean名称就是处理请求的controller类名；而RequestMappingHandlerMapping将请求URL映射到带有@RequestMapping注解的方法。因此，Spring MVC中有多个HandlerMapping是为了提供更灵活的URL映射策略，以满足不同的需求。希望这能回答你的问题。
~~~
