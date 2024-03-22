---
title: 并发问题
date: 2023-02-17
isOriginal: true
tag: 
  -- 并发
---

## 1、背景

因没做过大项目，并发经验匮乏，所以很多时候考虑不到并发问题，今天做接口的压力测试，无意间发现一个并发的问题，就是判断数据库是否存在某个记录时，如果没做并发处理，就会出现并发的问题，比如以下代码，给某个医院添加科室，当医院已经有这个科室则不允许重复添加重名的科室

~~~java
public void addHospitalDept(SysHospitalDept sysHospitalDept) {
        //根据医院id,科室名，校验科室唯一性
        SysHospitalDept hospitalDept = this.queryByHospitalIdAndDeptName(sysHospitalDept.getHospitalId(), sysHospitalDept.getDeptName());
        if (Objects.nonNull(hospitalDept)) {
            log.error("医院id：{}，已经存在了科室[{}]", hospitalDept.getHospitalId(), hospitalDept.getDeptName());
            throw new RuntimeException("该医院下已经存在了科室——" + hospitalDept.getDeptName());
        }
		sysHospitalDept.setDelFlag(false);
		sysHospitalDept.setCreatorId(SecurityUtils.getUser().getId());
		sysHospitalDept.setCreateTime(LocalDateTime.now());
		this.save(sysHospitalDept);
	}
~~~

以上代码表面看没啥问题，实际上存在并发问题，当同时进来大量请求访问此接口，则很容易复现并发问题，在最后一行`this.save(sysHospitalDept);`执行完成前，queryByHospitalIdAndDeptName一直返回的null,就会导致很多线程在if判断时都得到的是一个null对象，不会抛出异常，所以就会重复添加。

## 解决方法

使用同步代码解决：

~~~java
	public void addHospitalDept(SysHospitalDept sysHospitalDept) {
		synchronized (this) {
			//根据医院id,科室名，校验科室唯一性
			SysHospitalDept hospitalDept = this.queryByHospitalIdAndDeptName(sysHospitalDept.getHospitalId(), sysHospitalDept.getDeptName());
			if (Objects.nonNull(hospitalDept)) {
				log.error("医院id：{}，已经存在了科室[{}]", hospitalDept.getHospitalId(), hospitalDept.getDeptName());
				throw new RuntimeException("该医院下已经存在了科室——" + hospitalDept.getDeptName());
			}
		}
		sysHospitalDept.setDelFlag(false);
		sysHospitalDept.setCreatorId(SecurityUtils.getUser().getId());
		sysHospitalDept.setCreateTime(LocalDateTime.now());
		this.save(sysHospitalDept);
	}
~~~

## 总结

这种并发问题是因为使用了第三方数据库中的东西来作为判断条件，这有点分布式的感觉，因为数据是放在第三方，不是在本地程序，第三方数据是可能随时被别人修改的。这种情况一定要注意并发问题。
