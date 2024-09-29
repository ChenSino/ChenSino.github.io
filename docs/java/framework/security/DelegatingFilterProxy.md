---
title: DelegatingFilterProxy介绍
date: 2024-09-20
author: chensino
publish: true
isOriginal: true
---

### 作用

在典型的 Spring 应用中，ContextLoaderListener 通常用于加载 Spring 的应用上下文（ApplicationContext），并管理其中定义的 Spring Bean。然而，Servlet 容器在启动时，会优先初始化过滤器（Filter）实例，而此时 Spring 上下文可能还没有完全加载。

#### 具体解析：

1. ContextLoaderListener：

- ContextLoaderListener 是 Spring 中常见的监听器，负责在应用启动时加载 Spring 的 ApplicationContext，从而初始化应用中的所有 Spring Bean。这通常是在应用启动的较晚阶段完成的。
- ContextLoaderListener 会监听 Web 应用的启动事件，并在合适的时机加载和管理 Spring 上下文。

2. Servlet 过滤器的加载顺序：

- 在典型的 Servlet 容器（如 Tomcat）中，过滤器的实例化和注册会在应用启动的早期阶段进行，即在应用的主业务逻辑启动之前。
- 这些过滤器的初始化是 Servlet 容器的一部分，不依赖于 Spring 的 ApplicationContext。换句话说，过滤器的生命周期由 Servlet 容器本身管理，而不受 Spring 管理的影响。

3. 问题所在：

- 因为过滤器（Filter）的实例需要在 Spring 上下文加载之前注册，而 Spring 的 Bean 管理是由 ContextLoaderListener 在较后阶段完成的，这就导致了过滤器实例在创建时无法直接依赖于 Spring 的 Bean 或上下文。如果直接在 web.xml 中定义过滤器，过滤器实例会在 Spring 上下文加载完成之前被创建。

#### 解决方案——DelegatingFilterProxy：

- DelegatingFilterProxy 可以解决这个问题。它允许 Servlet 容器在初始化过滤器时，并不直接创建过滤器的实际实例，而是通过代理的方式，将过滤器的执行逻辑委托给 Spring 上下文中的某个 Bean。这样，过滤器的真正逻辑就可以依赖于 Spring 容器管理的 Bean。
- 具体来说，DelegatingFilterProxy 本身是一个标准的 Servlet 过滤器，在容器启动时被注册。但是它在处理过滤时，会去查找 Spring 上下文中已经定义好的过滤器 Bean（例如 Spring Security 的 FilterChainProxy），并将请求委托给这个 Spring 管理的过滤器 Bean。

#### 总结：

- 问题：在传统的 Servlet 应用中，过滤器的初始化顺序早于 Spring 上下文的加载，这导致无法将 Spring 的依赖注入直接应用于过滤器。
- 解决：通过使用 DelegatingFilterProxy，可以将过滤器的创建延迟到 Spring 上下文加载完成之后，由 Spring 容器管理过滤器实例的生命周期，使得过滤器可以正常依赖 Spring Bean。
因此，DelegatingFilterProxy 是一个桥梁，它确保即使 Servlet 容器在 Spring 上下文加载之前注册过滤器，过滤器的实际执行逻辑依然能够使用 Spring 管理的 Bean 和资源。