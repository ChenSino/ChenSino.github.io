---
title: OnecePerRequestFilter
date:  2020-11-3
author: chenkun
keys:
category:
    - Security
tag:
---

## 1、OnecePerRequestFilter初识

~~~markdown
第一次接触这个类，在SpringSecurity中，大概百度了一下，知道此类是限制一次请求只
走一次过滤器，但是我不明白为啥要做这个限制，或者说难道还有一次请求会走两次过滤器？
~~~

### 1.1 源码doc

学习一个框架最好的文档肯定是看官方doc,以下是官方doc对此类的注释，简单来说就是确保
一个请求在一个过滤器只执行一次doFilter,因在在不同版本的Servlet容器中是存在多次执
行doFilter的可能的，比如一个request forward到另一个request,在servlet2.0和3.0
表现可能都不一样，在Tomcat和weblogic容器中可能表现也不一样，为了统一此行为，所以
Spring官方提供了此类。

~~~html
Filter base class that aims to guarantee a single execution per request dispatch, on any servlet container. It provides a doFilterInternal method with HttpServletRequest and HttpServletResponse arguments.
As of Servlet 3.0, a filter may be invoked as part of a REQUEST or ASYNC dispatches that occur in separate threads. A filter can be configured in web.xml whether it should be involved in async dispatches. However, in some cases servlet containers assume different default configuration. Therefore, subclasses can override the method shouldNotFilterAsyncDispatch() to declare statically if they should indeed be invoked, once, during both types of dispatches in order to provide thread initialization, logging, security, and so on. This mechanism complements and does not replace the need to configure a filter in web.xml with dispatcher types.
Subclasses may use isAsyncDispatch(HttpServletRequest) to determine when a filter is invoked as part of an async dispatch, and use isAsyncStarted(HttpServletRequest) to determine when the request has been placed in async mode and therefore the current dispatch won't be the last one for the given request.
Yet another dispatch type that also occurs in its own thread is ERROR. Subclasses can override shouldNotFilterErrorDispatch() if they wish to declare statically if they should be invoked once during error dispatches.
The getAlreadyFilteredAttributeName method determines how to identify that a request is already filtered. The default implementation is based on the configured name of the concrete filter instance.
Since:
06.12.2003
Author:
Juergen Hoeller, Rossen Stoyanchev
~~~

## 2、 源码剖析

~~~markdown
    源码其实很简单，OncePerRequestFilter也是一个基本的Filter,核心原理就是
    当一个request进入doFilter的时候，根据request中的一个标识符判断是否已经
    执行过，如果是第一次执行，则让其进入doFilter,并且设置标识符为true,后面此
    request如果再次进来，判断其标识符为true代表已经执行，则直接doFilter,不做
    任何额外的处理
~~~

~~~java
public abstract class OncePerRequestFilter extends GenericFilterBean {


     //标识符前缀
	public static final String ALREADY_FILTERED_SUFFIX = ".FILTERED";


	@Override
	public final void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		if (!(request instanceof HttpServletRequest) || !(response instanceof HttpServletResponse)) {
			throw new ServletException("OncePerRequestFilter just supports HTTP requests");
		}
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

        //标识符的名字
		String alreadyFilteredAttributeName = getAlreadyFilteredAttributeName();
		boolean hasAlreadyFilteredAttribute = request.getAttribute(alreadyFilteredAttributeName) != null;

		if (skipDispatch(httpRequest) || shouldNotFilter(httpRequest)) {
			// Proceed without invoking this filter...
			filterChain.doFilter(request, response);
		}
        //根据标识符判断是否已经执行过，如果已经执行过，则直接放行到下一过滤器，
        //本过滤器不做任何处理
		else if (hasAlreadyFilteredAttribute) {
			if (DispatcherType.ERROR.equals(request.getDispatcherType())) {
				doFilterNestedErrorDispatch(httpRequest, httpResponse, filterChain);
				return;
			}

			// Proceed without invoking this filter...
			filterChain.doFilter(request, response);
		}
		else {
            //如果此过滤器第一次执行，则调用doFilterInternal做处理
			// Do invoke this filter...
			request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);
			try {
				doFilterInternal(httpRequest, httpResponse, filterChain);
			}
			finally {
				// Remove the "already filtered" request attribute for this request.
				request.removeAttribute(alreadyFilteredAttributeName);
			}
		}
	}

	private boolean skipDispatch(HttpServletRequest request) {
		if (isAsyncDispatch(request) && shouldNotFilterAsyncDispatch()) {
			return true;
		}
		if (request.getAttribute(WebUtils.ERROR_REQUEST_URI_ATTRIBUTE) != null && shouldNotFilterErrorDispatch()) {
			return true;
		}
		return false;
	}

	/**
	 * Return the name of the request attribute that identifies that a request
	 * is already filtered.
	 * <p>The default implementation takes the configured name of the concrete filter
	 * instance and appends ".FILTERED". If the filter is not fully initialized,
	 * it falls back to its class name.
	 * @see #getFilterName
	 * @see #ALREADY_FILTERED_SUFFIX
	 */
	protected String getAlreadyFilteredAttributeName() {
		String name = getFilterName();
		if (name == null) {
			name = getClass().getName();
		}
		return name + ALREADY_FILTERED_SUFFIX;
	}


	/**
	 * Same contract as for {@code doFilter}, but guaranteed to be
	 * just invoked once per request within a single request thread.
	 * See {@link #shouldNotFilterAsyncDispatch()} for details.
	 * <p>Provides HttpServletRequest and HttpServletResponse arguments instead of the
	 * default ServletRequest and ServletResponse ones.
	 */
     //实现此方法，进行自定义处理逻辑
	protected abstract void doFilterInternal(
			HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException;

}
~~~

## 3、总结

OncePerRequestFilter类的作用就是解决不同版本（或者不同厂家的Servlet容器）容器可能存在的一次请求重复进入到同一个过滤器的问题。
其解决方法是在request对象中添加一个属性标识符，每次调用本过滤器处理逻辑前先判断request的标识符，保证只执行一次。
