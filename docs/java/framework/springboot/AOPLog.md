---
title: 使用aop记录请求log
date: 2022-03-18
---
#### 1. 博客背景

最近业务提了一个需求，让记录每个用户的每个操作请求到数据库，保证每个操作都可追溯，这个需求很典型，实现起来也不难，一个自定义注解就搞定了。

#### 2. 实现

> 实现思路比较简单，采用AOP，先自定义一个注解，在需要记录的地方就使用注解

##### 2.1 自定义注解SysLog 

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {

	/**
	 * 描述
	 * @return {String}
	 */
	String value();

}
```

##### 2.2 日志实体类

@Data是Lombok中的

@ApiModel是swagger中的

```java
@Data
@ApiModel(value = "日志")
public class SysLog implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 编号
	 */
	@TableId(type = IdType.AUTO)
	@ApiModelProperty(value = "日志编号")
	private Long id;

	/**
	 * 日志类型
	 */
	@NotBlank(message = "日志类型不能为空")
	@ApiModelProperty(value = "日志类型")
	private String type;

	/**
	 * 日志标题
	 */
	@NotBlank(message = "日志标题不能为空")
	@ApiModelProperty(value = "日志标题")
	private String title;

	/**
	 * 创建者
	 */
	@ApiModelProperty(value = "创建人")
	private String createBy;

	/**
	 * 创建时间
	 */
	@ApiModelProperty(value = "创建时间")
	private LocalDateTime createTime;

	/**
	 * 更新时间
	 */
	@ApiModelProperty(value = "更新时间")
	private LocalDateTime updateTime;

	/**
	 * 操作IP地址
	 */
	@ApiModelProperty(value = "操作ip地址")
	private String remoteAddr;

	/**
	 * 用户代理
	 */
	@ApiModelProperty(value = "用户代理")
	private String userAgent;

	/**
	 * 请求URI
	 */
	@ApiModelProperty(value = "请求uri")
	private String requestUri;

	/**
	 * 操作方式
	 */
	@ApiModelProperty(value = "操作方式")
	private String method;

	/**
	 * 操作提交的数据
	 */
	@ApiModelProperty(value = "提交数据")
	private String params;

	/**
	 * 执行时间
	 */
	@ApiModelProperty(value = "方法执行时间")
	private Long time;

	/**
	 * 异常信息
	 */
	@ApiModelProperty(value = "异常信息")
	private String exception;

	/**
	 * 服务ID
	 */
	@ApiModelProperty(value = "应用标识")
	private String serviceId;

	/**
	 * 删除标记
	 */
	@TableLogic
	@ApiModelProperty(value = "删除标记,1:已删除,0:正常")
	private String delFlag;

}
```



##### 2.2 AOP拦截

```java
@Slf4j
@Aspect
@AllArgsConstructor
public class SysLogAspect {

	private final ApplicationEventPublisher publisher;

	@SneakyThrows
	@Around("@annotation(sysLog)")//表示拦截@SysLog注解的方法
	public Object around(ProceedingJoinPoint point, SysLog sysLog) {
		String strClassName = point.getTarget().getClass().getName();
		String strMethodName = point.getSignature().getName();
		log.debug("[类名]:{},[方法]:{}", strClassName, strMethodName);
		//此处的SysLog指的是日志实体类
		SysLog logVo = SysLogUtils.getSysLog(point);
		logVo.setTitle(sysLog.value());
		// 发送异步日志事件
		Long startTime = System.currentTimeMillis();
		Object obj = point.proceed();
		Long endTime = System.currentTimeMillis();
		logVo.setTime(endTime - startTime);
        // 因为我系统是分布式不是单机，所以此处发送一个事件，事件通过feign远程调用日志服务
		publisher.publishEvent(new SysLogEvent(logVo));
		return obj;
	}

}

```

##### 2.3 通过事件调用远程日志

```java
@Slf4j
@AllArgsConstructor
public class SysLogListener {

	private final RemoteLogService remoteLogService;

	@Async
	@Order
	@EventListener(SysLogEvent.class)
	public void saveSysLog(SysLogEvent event) {
		SysLog sysLog = event.getSysLog();
		remoteLogService.saveLog(sysLog, SecurityConstants.FROM_IN);
	}

}

```

