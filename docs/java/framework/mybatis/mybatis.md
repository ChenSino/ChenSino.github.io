---
title: Mybatis使用
date: 2019-10-22
author: chenkun
publish: true
keys:
category:
  - 框架
tag:
  - 框架
---

## mybatis缓存

[缓存介绍]( https://www.cnblogs.com/happyflyingpig/p/7739749.html )

[一级缓存存在的问题](https://cloud.tencent.com/developer/article/1650481)

#### 1、 一级缓存

mybatis缓存有一级缓存也叫SelSession缓存，是强制打开的，也就是说Mybatis没有提供关闭一级缓存的方式。一级缓存只是相对于**同一个SqlSession**而言。所以在参数和SQL完全一样的情况下，我们使用同一个SqlSession对象调用一个Mapper方法，往往只执行一次SQL，因为使用SelSession第一次查询后，MyBatis会将其查询结果放在缓存中，以后再查询的时候，如果没有声明需要刷新，并且缓存没有超时的情况下，SqlSession都会取出当前缓存的数据，而不会再次发送SQL到数据库。一级缓存的存储位置是在JVM虚拟机内存，它放在一个Map中

##### 1.1 一级缓存的生命周期有多长？

　　a、MyBatis在开启一个数据库会话时，会 创建一个新的SqlSession对象，SqlSession对象中会有一个新的Executor对象。Executor对象中持有一个新的PerpetualCache对象；当会话结束时，SqlSession对象及其内部的Executor对象还有PerpetualCache对象也一并释放掉。

　　b、如果SqlSession调用了close()方法，会释放掉一级缓存PerpetualCache对象，一级缓存将不可用。

　　c、如果SqlSession调用了clearCache()，会清空PerpetualCache对象中的数据，但是该对象仍可使用。

　　d、SqlSession中执行了任何一个update操作(update()、delete()、insert()) ，都会清空PerpetualCache对象的数据，但是该对象可以继续使用

#### 1. 2、怎么判断某两次查询是完全相同的查询？

　　mybatis认为，对于两次查询，如果以下条件都完全一样，那么就认为它们是完全相同的两次查询。

　　2.1 传入的statementId

　　2.2 查询时要求的结果集中的结果范围

　　2.3. 这次查询所产生的最终要传递给JDBC java.sql.Preparedstatement的Sql语句字符串（boundSql.getSql() ）

　　2.4 传递给java.sql.Statement要设置的参数值

#### 1.3 一级缓存的问题

前面说了一级缓存是针对同一个SelSession，如果用SqlSession去执行同一个查询两次，会发现只有一次打印出了sql，说明一级缓存生效了

```java
 @Test
    public void pageQuery() throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        System.out.println(sqlSession);
        RowBounds rowBounds = new RowBounds(2, 2);
        List<Order> orders = sqlSession.selectList("com.chen.mapper.OrderMapper.pageQuery", rowBounds);
        System.out.println(orders.size());
        List<Order> orders1 = sqlSession.selectList("com.chen.mapper.OrderMapper.pageQuery", rowBounds);
        System.out.println(orders1.size());
        sqlSession.close();
    }
```

![image-20210926204622261](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20210926204622261-16326603908611.png)

针对以上代码，如果再新创建一个SqlSession,叫sqlSession2,在第一次和第二次查询的中间用sqlSession2去删除一条记录，然后再查询，这时第二查询的数据是第一次缓存的，这就导致了第二次查询结果不准确。

```java
	 @Test
    public void pageQuery() throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        System.out.println(sqlSession);
        RowBounds rowBounds = new RowBounds(2, 2);
        List<Order> orders = sqlSession.selectList("com.chen.mapper.OrderMapper.pageQuery", rowBounds);
        System.out.println(orders.size());
        SqlSession sqlSession2 = sqlSessionFactory.openSession();
        sqlSession2.delete("com.chen.mapper.OrderMapper.deleteOne");
        sqlSession2.commit();
        List<Order> orders1 = sqlSession.selectList("com.chen.mapper.OrderMapper.pageQuery", rowBounds);
        System.out.println(orders1.size());
        sqlSession.close();
        sqlSession2.close();
    }
```

删除后，第二次查询的结果应该比第一次少一个，但是实际去却没少，如下图

![image-20210926205004963](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20210926205004963-16326606075292.png)

在实际项目中SqlSession 并没有太大作用，显得很鸡肋，测试如下：

```java
		sysHospitalService.selectByDeptId(1);
		sysHospitalService.selectByDeptId(1);
```

在测试方法中调用同一个查询两次，日志如下，会发现创建了两个sqlsession,第1行和第18行，```SELECT  *  FROM sys_hospital ``` 执行了两次。所以实际项目一般不会使用同一个sqlsession去查两次，所以一级缓存其实并没有什么卵用。

```
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@1346a6fe] was not registered for synchronization because synchronization is not active
JDBC Connection [com.alibaba.druid.proxy.jdbc.ConnectionProxyImpl@30e3042] will not be managed by Spring
Original SQL: SELECT  *  FROM sys_hospital 
 
 WHERE (dept_id = ?)
parser sql: SELECT * FROM sys_hospital WHERE (dept_id = ?) AND tenant_id = 1
==>  Preparing: SELECT * FROM sys_hospital WHERE (dept_id = ?) AND tenant_id = 1 
==> Parameters: 1(Integer)
<==    Columns: id, uuid, encoded, hospital_name, address, status, contact, contact_position, contact_tel, contact_mail, hospital_remark, country, provinces, city, county, install_quantity, info_sources, rating, hospital_rating, hospital_nature, nature, hospital_bed_num, doctors_num, daily_inspect_num, in_hospital_position, in_hospital_use_way, competitors, kol, hospital_photo, last_follow_date, create_date, modify_date, dept_id, created_id, tenant_id, hospital_type, belong_area, belong_office, endoscope_window, ultrasound_window, inspection_window, vip_customer_level, country_name, provinces_name, city_name, level, hospital_level, sono_tag, vip_level, contact_json
<==        Row: 20038, f050a176-a569-49bb-a422-f705fde468b3, null, 测试, 是, null, 22, null, 所属, 4335@111.com, 嗯嗯, 7, 247, 3022, null, null, null, null, 1, null, 1, 0, 0, 0, null, null, null, 0, 8004, null, 2021-03-03 16:40:34, 2021-03-03 16:40:46, 1, 1, 1, null, null, null, null, null, null, null, 中国, 北京, 西城, 1, null, null, null, <<BLOB>>
<==        Row: 20039, 3d9faf5e-d4b5-4fdf-a0c2-af9069eb1f9a, null, test hospital, Russia, null, Gordon, null, +7 5542 214 111, u@sonsocape.net, , 7, 250, 3069, null, null, null, null, 1, null, 1, 0, 0, 0, null, null, null, 0, , null, 2021-03-03 19:04:09, 2021-03-03 19:04:20, 1, 1, 1, null, null, null, null, null, null, null, 中国, 山西, 朔州, 1, null, null, null, <<BLOB>>
<==        Row: 20040, 6e35f8e1-a941-4879-852d-ed1f8a5d76cd, null, hghjbg, 6757667, null, 空间环境开会、】, null, 9098989, hjjh@ff.net, , 7, 247, 3021, null, null, null, null, 1, null, 4, 0, 0, 0, null, null, null, 1, , null, 2021-03-04 11:54:12, 2021-03-04 11:55:37, 1, 1, 1, null, null, null, null, null, null, null, 中国, 北京, 东城, 1, null, null, null, <<BLOB>>
<==        Row: 21165, a0cc7326-0a94-4fd9-a469-dac4994c9bbf, null, test2, aaaaaz, null, test, null, 123456, 123456@qq.com, , 7, 247, 3021, null, null, null, null, 1, null, null, 0, 0, 0, null, null, null, 0, , null, 2021-07-01 15:22:29, 2021-07-01 15:22:32, 1, 329, 1, null, null, null, null, null, null, null, 中国, 北京, 东城, 1, null, null, null, <<BLOB>>
<==        Row: 21669, 577dada6-be56-45a9-a892-80fe600cd197, null, Abu el Rish - El Monira, Cairo, null, Ayman Email, null, +2 23654494, abo.bakr@misrsinai.org, , 17, 501, 6404, null, null, null, null, 15, null, 1, 300, 300, 0, null, null, null, 0, , null, 2021-09-02 17:57:13, 2021-09-05 17:49:58, 1, 433, 1, null, null, null, null, null, null, null, Egypt, Cairo, Cairo, 1, null, null, null, <<BLOB>>
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@1346a6fe]
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@82f93f6] was not registered for synchronization because synchronization is not active
JDBC Connection [com.alibaba.druid.proxy.jdbc.ConnectionProxyImpl@30e3042] will not be managed by Spring
Original SQL: SELECT  *  FROM sys_hospital 
 
 WHERE (dept_id = ?)
parser sql: SELECT * FROM sys_hospital WHERE (dept_id = ?) AND tenant_id = 1
==>  Preparing: SELECT * FROM sys_hospital WHERE (dept_id = ?) AND tenant_id = 1 
==> Parameters: 1(Integer)
<==    Columns: id, uuid, encoded, hospital_name, address, status, contact, contact_position, contact_tel, contact_mail, hospital_remark, country, provinces, city, county, install_quantity, info_sources, rating, hospital_rating, hospital_nature, nature, hospital_bed_num, doctors_num, daily_inspect_num, in_hospital_position, in_hospital_use_way, competitors, kol, hospital_photo, last_follow_date, create_date, modify_date, dept_id, created_id, tenant_id, hospital_type, belong_area, belong_office, endoscope_window, ultrasound_window, inspection_window, vip_customer_level, country_name, provinces_name, city_name, level, hospital_level, sono_tag, vip_level, contact_json
<==        Row: 20038, f050a176-a569-49bb-a422-f705fde468b3, null, 测试, 是, null, 22, null, 所属, 4335@111.com, 嗯嗯, 7, 247, 3022, null, null, null, null, 1, null, 1, 0, 0, 0, null, null, null, 0, 8004, null, 2021-03-03 16:40:34, 2021-03-03 16:40:46, 1, 1, 1, null, null, null, null, null, null, null, 中国, 北京, 西城, 1, null, null, null, <<BLOB>>
<==        Row: 20039, 3d9faf5e-d4b5-4fdf-a0c2-af9069eb1f9a, null, test hospital, Russia, null, Gordon, null, +7 5542 214 111, u@sonsocape.net, , 7, 250, 3069, null, null, null, null, 1, null, 1, 0, 0, 0, null, null, null, 0, , null, 2021-03-03 19:04:09, 2021-03-03 19:04:20, 1, 1, 1, null, null, null, null, null, null, null, 中国, 山西, 朔州, 1, null, null, null, <<BLOB>>
<==        Row: 20040, 6e35f8e1-a941-4879-852d-ed1f8a5d76cd, null, hghjbg, 6757667, null, 空间环境开会、】, null, 9098989, hjjh@ff.net, , 7, 247, 3021, null, null, null, null, 1, null, 4, 0, 0, 0, null, null, null, 1, , null, 2021-03-04 11:54:12, 2021-03-04 11:55:37, 1, 1, 1, null, null, null, null, null, null, null, 中国, 北京, 东城, 1, null, null, null, <<BLOB>>
<==        Row: 21165, a0cc7326-0a94-4fd9-a469-dac4994c9bbf, null, test2, aaaaaz, null, test, null, 123456, 123456@qq.com, , 7, 247, 3021, null, null, null, null, 1, null, null, 0, 0, 0, null, null, null, 0, , null, 2021-07-01 15:22:29, 2021-07-01 15:22:32, 1, 329, 1, null, null, null, null, null, null, null, 中国, 北京, 东城, 1, null, null, null, <<BLOB>>
<==        Row: 21669, 577dada6-be56-45a9-a892-80fe600cd197, null, Abu el Rish - El Monira, Cairo, null, Ayman Email, null, +2 23654494, abo.bakr@misrsinai.org, , 17, 501, 6404, null, null, null, null, 15, null, 1, 300, 300, 0, null, null, null, 0, , null, 2021-09-02 17:57:13, 2021-09-05 17:49:58, 1, 433, 1, null, null, null, null, null, null, null, Egypt, Cairo, Cairo, 1, null, null, null, <<BLOB>>
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@82f93f6]

```

#### 2、mybatis-plus扩展自定义查询

[mybatis自定义sql查询方法](https://cloud.tencent.com/developer/article/1639915)

[mybatis插件之拦截器](https://blog.csdn.net/weixin_39494923/article/details/91534658/)

##### 2.1 背景

pig项目中有个`serviceStockInstallRecordMapper.selectListByScope(queryWrapper.orderByDesc("create_time"), new DataScope());`方法，selectListByScope此方法是一个接口方法，并且这是一个自定义的方法，Mybatis和Mybatis-plus没有对其进行实现，所以就探究一下这个方法是如何执行的。

##### 2.2 研究思路

1. 根据参数反查

方法参数中有个DataScope，顾名思义这是根据权限查询数据范围，查看一下源码，是一个Map类型，可以看到有部门id,医院id,创建人id等一些限制查询范围的字段。

```java
@Data
@EqualsAndHashCode(callSuper = true)
public class DataScope extends HashMap {

	/**
	 * 限制范围的字段名称
	 */
	private String scopeName = "dept_id";

	/**
	 * 限制范围的字段名称
	 */
	private String scopeName_1 = "hospital_id";


    /* 数据创建用户id */
	private String createId = "created_id";

	/**
	 * 具体的数据范围
	 */
	private List<Integer> deptIds = new ArrayList<>();

	/**
	 * 具体的医院数据范围
	 */
	private List<Integer> hospitalIds = new ArrayList<>();

	/**
	 * 是否只查询本部门
	 */
	private Boolean isOnly = false;

	/**
	 * 函数名称，默认 SELECT * ;
	 *
	 * <ul>
	 * <li>COUNT(1)</li>
	 * </ul>
	 */
	private DataScopeFuncEnum func = DataScopeFuncEnum.ALL;

}
```

2. 利用idea的检索快捷键（Alt+F7）查找DataScope调用情况

   很容易就定位到`DataScopeInterceptor`这个类中使用到了`DataScope`

   ![image-20211220114833903](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20211220114833903-16399721171081.png)

核心代码是重写了Interceptor的intercept方法，在此方法中#18行调用了一个findDataScopeObject方法，此方法先判断查找参数是有有个DataScope对象，如果没有，则直接进行普通的sql查询，如果有则需要根据DataScope来限制查询数据的范围，#36行调用calcScope计算当前请求用户所拥有的具体权限

```java
//com.sonoscape.ccs.common.data.datascope.DataScopeInterceptor#intercept

public Object intercept(Invocation invocation) {
		StatementHandler statementHandler = PluginUtils.realTarget(invocation.getTarget());
		MetaObject metaObject = SystemMetaObject.forObject(statementHandler);
		this.sqlParser(metaObject);
		// 先判断是不是SELECT操作
		MappedStatement mappedStatement = (MappedStatement) metaObject.getValue("delegate.mappedStatement");
		if (!SqlCommandType.SELECT.equals(mappedStatement.getSqlCommandType())) {
			return invocation.proceed();
		}

		BoundSql boundSql = (BoundSql) metaObject.getValue("delegate.boundSql");
		String originalSql = boundSql.getSql();
		Object parameterObject = boundSql.getParameterObject();

		// 查找参数中包含DataScope类型的参数
		DataScope dataScope = findDataScopeObject(parameterObject);
		if (dataScope == null) {
			return invocation.proceed();
		}

		String deptScope = dataScope.getScopeName();
		String hospitalScope = dataScope.getScopeName_1();
		String createId = dataScope.getCreateId();

		String funcType = dataScope.getFunc().getType();
		// 在sevice方法中用datascope查询时，
		// 1、不设置dept、created_id、hospital_Id集合值，
		// 2、从角色配置的数据权限获取dept_ids,
		// 3、从用户获取关联的hospital_ids 与created_id
		List<Integer> deptIds = dataScope.getDeptIds();
		List<String> userIds = new ArrayList<>();
		List<Integer> hospitalIds = dataScope.getHospitalIds();
		// 从角色权限配置处，优先获取赋值数据
		if (CollUtil.isEmpty(deptIds) && dataScopeHandle.calcScope(deptIds,userIds,hospitalIds)) {

			return invocation.proceed();
		}

		String hospitalJoin = CollectionUtil.join(hospitalIds, ",");

		if (deptIds.isEmpty()) {

			if(hospitalIds.isEmpty()){
				// 1 代理商为空，医院列表为空
				if(userIds.isEmpty()) {
					// 1.1、没有代理商、医院、userIds集合为空，则访问所有data权限
					originalSql = getOriginSql(funcType, originalSql);
				}else{
					// 1.2、 没有代理商、医院， userIds集合不为空, 并且originalSql包含created_id字段
					if(originalSql.contains(createId)) {

						originalSql = getUserCreatedDataSql(funcType, originalSql, createId, userIds.get(0));
					}else{

						//1.3、 没有代理商、医院， userIds集合不为空, 但originalSql不包含created_id字段，则访问所有data权限
						originalSql = getOriginSql(funcType, originalSql);

					}

				}

			}

			else{
				//2 代理商为空，医院列表不为空, userIds集合为空
				if(userIds.isEmpty()) {
					// 没有代理商，存在医院列表，userIds集合为空, 判断originalSql是否存在hospital_id 字段:

					// 2.1、存在hospital_id 字段, 则表示只查询绑定医院权限下数据
					if(originalSql.contains(hospitalScope)) {

						originalSql = getDeptScopeOrHospitalScopeSql(funcType, originalSql, hospitalScope, hospitalJoin);
					} else {
						// 2.2、 不存在hospital_id 字段,则表示查询所有数据
						originalSql = getOriginSql(funcType, originalSql);
					}

				}else{
				 //3 代理商为空，医院列表不为空, userIds集合不为空

					if(originalSql.contains(hospitalScope)&&originalSql.contains(createId)) {
						// 3.1、 originalSql中存在hospital_id、created_id
						originalSql = getDeptUserOrHospitalUserSql(funcType, originalSql, hospitalScope, hospitalJoin, createId, userIds.get(0));
					}
					else if(originalSql.contains(hospitalScope)) {
						// 3.2、 originalSql中只在hospital_id
						originalSql = getDeptScopeOrHospitalScopeSql(funcType, originalSql, hospitalScope, hospitalJoin);
					}
					else if(originalSql.contains(createId)) {
						// 3.3、 originalSql中只存在created_id
						originalSql = getUserCreatedDataSql(funcType, originalSql, createId, userIds.get(0));
					}
					else{
						// 3.4、 不存在存在hospital_id、created_id，则查询所有数据
						originalSql = getOriginSql(funcType, originalSql);

					}
				}

			}

		}else{
			String deptJoin = CollectionUtil.join(deptIds, ",");

			// 4 存在代理商，医院列表为空
			if(hospitalIds.isEmpty()){

				if(userIds.isEmpty()) {
					// 4.1、存在代理商，医院列表为空, userIds集合为空，则查询所有代理商数据
					originalSql = getDeptScopeOrHospitalScopeSql(funcType, originalSql, deptScope, deptJoin);
				}else{
					// 4.2、存在代理商，医院列表为空， userIds集合不为空, 并且originalSql包含created_id字段
					if(originalSql.contains(createId)) {

						originalSql = getDeptUserOrHospitalUserSql(funcType, originalSql, deptScope, deptJoin, createId, userIds.get(0));
					}else{
						//4.3、 存在代理商，医院列表为空， userIds集合不为空, 但originalSql不包含created_id字段，则访问所有代理商数据
						originalSql = getDeptScopeOrHospitalScopeSql(funcType, originalSql, deptScope, deptJoin);

					}

				}

			}
			else{
				//5 存在代理商，医院列表不为空, userIds集合为空,
				if(userIds.isEmpty()) {
					// 判断originalSql是否存在hospital_id 字段:
					// 5.1  originalSql 存在hospital_id 字段, 则表示查询代理商层级与医院列表数据
					if(originalSql.contains(hospitalScope)) {

						originalSql = String.format("SELECT %s FROM (%s) temp_data_scope WHERE 1=1 and temp_data_scope.%s IN (%s) or temp_data_scope.%s IN (%s)",
								dataScope.getFunc().getType(), originalSql, deptScope, deptJoin, hospitalScope, hospitalJoin);
					} else {
						// 5.2、 originalSql 不存在hospital_id 字段, 则表示查询所有代理商数据
						originalSql =  getDeptScopeOrHospitalScopeSql(funcType, originalSql, deptScope, deptJoin);
					}

				}else{
				//6 存在代理商，医院列表不为空，userIds集合不为空
					if(originalSql.contains(hospitalScope)&&originalSql.contains(createId)) {
						// 6.1、 originalSql中存在hospital_id、created_id
						originalSql = String.format("SELECT %s FROM (%s) temp_data_scope WHERE 1=1 and temp_data_scope.%s IN (%s) or temp_data_scope.%s IN (%s) or temp_data_scope.%s = %s",
								dataScope.getFunc().getType(), originalSql, deptScope, deptJoin, hospitalScope, hospitalJoin,createId,userIds.get(0));
					}
					else if(originalSql.contains(hospitalScope)) {
						// 6.2、 originalSql中只在hospital_id
						originalSql = String.format("SELECT %s FROM (%s) temp_data_scope WHERE 1=1 and temp_data_scope.%s IN (%s) or temp_data_scope.%s IN (%s)",
								dataScope.getFunc().getType(), originalSql, deptScope, deptJoin, hospitalScope, hospitalJoin);
					}
					else if(originalSql.contains(createId)) {
						// 6.3、 originalSql中只存在created_id
						originalSql = getDeptUserOrHospitalUserSql(funcType, originalSql, deptScope, deptJoin, createId, userIds.get(0));
					}
					else{
						// 6.4、 不存在存在hospital_id、created_id，则只查询代理商数据
						originalSql =  getDeptScopeOrHospitalScopeSql(funcType, originalSql, deptScope, deptJoin);
					}
				}

			}


		}

		metaObject.setValue("delegate.boundSql.sql", originalSql);
		return invocation.proceed();
	}
```



​	查看`calcScope`源码，可以看到先获取security中的用户，自然就可以得到用户的对应的角色权限，然后把对应权限设置到集合deptList、userIds、hospitalList中，查询在`com.sonoscape.ccs.common.data.datascope.DataScopeInterceptor#intercept`会触发过滤

```java
//com.sonoscape.ccs.common.data.datascope.CcsDefaultDatascopeHandle#calcScope

    	public Boolean calcScope(List<Integer> deptList, List<String> userIds, List<Integer> hospitalList) {
		CcsUser user = SecurityUtils.getUser();
		List<String> roleIdList = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.filter(authority -> authority.startsWith(SecurityConstants.ROLE))
				.map(authority -> authority.split(StrUtil.UNDERLINE)[1]).collect(Collectors.toList());
		// 当前用户的角色为空
		if (CollectionUtil.isEmpty(roleIdList)) {
			return false;
		}
		SysRole role = dataScopeService.getRoleList(roleIdList).getData().stream()
				.min(Comparator.comparingInt(SysRole::getDsType)).orElse(null);
		// 角色有可能已经删除了
		if (role == null) {
			return false;
		}
		Integer dsType = role.getDsType();
		// 查询全部
		if (DataScopeTypeEnum.ALL.getType() == dsType) {
 			return true;
		}
		// 自定义
		if (DataScopeTypeEnum.CUSTOM.getType() == dsType) {
			String dsScope = role.getDsScope();
			deptList.addAll(
					Arrays.stream(dsScope.split(StrUtil.COMMA)).map(Integer::parseInt).collect(Collectors.toList()));
			//跨部门查询，也要查询他自己
			userIds.add(user.getId()+"");
		}
		// 查询本级及其下级
		if (DataScopeTypeEnum.OWN_CHILD_LEVEL.getType() == dsType) {
			List<Integer> deptIdList = dataScopeService.getDescendantList(user.getDeptId()).getData().stream()
					.map(SysDeptRelation::getDescendant).collect(Collectors.toList());
			deptList.addAll(deptIdList);
			//跨部门查询，也要查询他自己
			userIds.add(user.getId()+"");
		}
		// 只查询本级
		if (DataScopeTypeEnum.OWN_LEVEL.getType() == dsType) {
			deptList.add(user.getDeptId());
			//跨部门查询，也要查询他自己
			userIds.add(user.getId()+"");
		}

		// 只查询下级与自己
		// @revised by liubin
		if (DataScopeTypeEnum.OWN_ONLY_CHILD_LEVEL.getType() == dsType) {
			List<Integer> deptIdList = dataScopeService.getDescendantListNoSelf(user.getDeptId()).getData().stream()
					.map(SysDeptRelation::getDescendant).collect(Collectors.toList());
			deptList.addAll(deptIdList);
			//查询下级的同时查询自己
			userIds.add(user.getId()+"");

		}

		//获取当前用户绑定医院
		List<Integer> hospitalIdList =  dataScopeService.getHospitalIdByUserId(user.getId()).getData();
		if (hospitalIdList != null && hospitalIdList.size() > 0) {
			hospitalList.addAll(hospitalIdList);
		}


		return false;
	}
```

##### 2.3 





#### 3. mybatis使用中遇到问题

##### 3.1 
