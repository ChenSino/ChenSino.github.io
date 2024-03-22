---
title: 用服bom交接
date: 2023-03-14
isOriginal: true
---

## 1、系统设计

### 1.1 基础架构

![image-20230307143918331](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230307143918331.png)

### 1.2 技术栈

![image-20230307143944099](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230307143944099.png)

### 1.3 主要功能

![image-20230307144009926](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230307144009926.png)



## 2 前端目录结构

### 2.1 前端整体目录结构

~~~shell
sono_bom_web
├── build
├── config---------------------------webpack打包配置
├── dist-----------------------------最终产品
│   └── static
├── src
│   ├── api--------------------------axios请求
│   ├── assets-----------------------图片资源文件
│   ├── components-------------------组件
│   ├── config-----------------------项目配置
│   ├── icons------------------------图标
│   ├── lang-------------------------i18n
│   ├── layout-----------------------整体布局
│   ├── mixins-----------------------vue混入
│   ├── router-----------------------vue路由
│   ├── store------------------------vuex
│   ├── styles
│   ├── utils------------------------工具包
│   └── views------------------------业务视图
└── static

~~~

### 2.2 核心业务

业务的代码位于`sono_bom_web/src/views/system/bom`

~~~sh
.
├── components
├── dashboard
├── features
├── generator
├── monitor
│   ├── log
│   ├── online
│   ├── redis
│   └── sql
├── nested
│   ├── menu1
│   └── menu2
├── system
│   ├── bom-----------------核心业务
│   ├── bomHistory----------操作记录
│   ├── dept
│   ├── dict
│   ├── dictDetail
│   ├── job
│   ├── menu
│   ├── notice
│   ├── role
│   ├── series
│   ├── timing
│   └── user
└── tools
    ├── aliPay
    ├── email
    ├── picture
    ├── storage
    └── swagger

~~~

## 3 后端目录结构

### 3.1 整体目录结构

~~~sh
.
├── bom-common------通用包
├── bom-generator---代码生成器
├── bom-logging-----日志
├── bom-system------主程序
├── bom-tools-------工具包
└── scripts---------jenkins自动化部署脚本

~~~

### 3.2 核心业务目录结构

~~~shell
.
├── java
│   └── com
│       └── sonoscape
│           ├── config
│           │   └── thread
│           └── modules
│               ├── bom------------------核心业务
│               │   ├── common
│               │   ├── domain-----------实体
│               │   ├── repository-------DAO层
│               │   ├── rest-------------Controller层
│               │   └── service----------Service层
│               ├── monitor
│               │   ├── config
│               │   ├── domain
│               │   ├── repository
│               │   ├── rest
│               │   └── service
│               ├── notice
│               │   ├── domain
│               │   ├── repository
│               │   ├── rest
│               │   └── service
│               ├── quartz
│               │   ├── config
│               │   ├── domain
│               │   ├── repository
│               │   ├── rest
│               │   ├── service
│               │   ├── task
│               │   └── utils
│               ├── security
│               │   ├── config
│               │   ├── rest
│               │   ├── security
│               │   ├── service
│               │   └── utils
│               └── system
│                   ├── domain
│                   ├── repository
│                   ├── rest
│                   └── service
└── resources
    ├── config
    ├── ip2region
    └── template
        ├── email
        └── generator
            ├── admin
            └── front

~~~



## 4、主要接口

### 4.1 前端国际化

> 需求
>
> 1. 界面中英文 
> 2. 部分存在数据库中字段实现中英文

常规界面使用vue-i18n实现，存在数据库中的字段放在前端翻译。在前端中建立一个map,其中key为后端返回的中文字段，value则从前端根据i18n动态获取

![image-20230313171838694](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230313171838694.png)

![image-20230313172323514](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230313172323514.png)

![image-20230313172415312](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230313172415312.png)

### 4.2 登录接口      

#### 4.2.1 请求流程

![image-20230313181857894](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230313181857894.png) 

#### 4.2.2 构建请求                                                        

> curl 'http://localhost:8013/auth/login' \
>   -H 'Accept: application/json, text/plain, */*' \
>   -H 'Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7' \
>   -H 'Cache-Control: no-cache' \
>   -H 'Connection: keep-alive' \
>   -H 'Content-Type: application/json;charset=UTF-8' \
>   -H 'Cookie: language=en' \
>   -H 'Origin: http://0.0.0.0:8013' \
>   -H 'Pragma: no-cache' \
>   -H 'Referer: http://0.0.0.0:8013/login?redirect=%2Fdashboard' \
>   -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36' \
>   --data-raw '{"username":"admin","password":"123456789","code":"4","uuid":"code-keyda97382a765b42a29d20edf1978b4cb3","languageFlag":"en"}' \
>   --compressed \
>   --insecure

 ~~~markdown
 username：用户名
 password: 密码
 code：验证码
 uuid：验证码在redis对应的key
 languageFlag: 语言标识符
 ~~~

#### 4.2.3 登录接口代码

~~~java
 	 @Log("用户登录")
    @ApiOperation("登录授权")
    @AnonymousAccess
    @PostMapping(value = "/login")
    public org.springframework.http.ResponseEntity login(@Validated @RequestBody AuthUser authUser, HttpServletRequest request) {

        // 查询验证码
        String code = redisService.getCodeVal(authUser.getUuid());
        // 清除验证码
        redisService.delete(authUser.getUuid());
        if (StringUtils.isBlank(code)) {
            throw new BadRequestException("验证码已过期");
        }
        if (StringUtils.isBlank(authUser.getCode()) || !authUser.getCode().equalsIgnoreCase(code)) {
            throw new BadRequestException("验证码错误");
        }
        //先把语言标识符插入用户表
        if (null != authUser.getUsername()) {
            User user = userRepository.findByUsername(authUser.getUsername());
            Objects.requireNonNull(user, "User does not exist");
            user.setLanguageFlag(authUser.getLanguageFlag());
            userRepository.save(user);
        }
        final JwtUser jwtUser = (JwtUser) userDetailsService.loadUserByUsername(authUser.getUsername());

        if (!jwtUser.getPassword().equals(EncryptUtils.encryptPassword(authUser.getPassword()))) {
            throw new AccountExpiredException("密码错误");
        }

        if (!jwtUser.isEnabled()) {
            throw new AccountExpiredException("账号已停用，请联系管理员");
        }

        //上次重置密码时间(如果还未重置则取创建时间) + 3个月，和当前时间比较
        LocalDate lastPasswordResetDate = DateUtil.Date2LocalDate(jwtUser.getLastPasswordResetDate() == null ? jwtUser.getCreateTime() : jwtUser.getLastPasswordResetDate());
        if (lastPasswordResetDate.plusMonths(durationMonth).isBefore(LocalDate.now())) {
            throw new PasswordExpiredException("密码已过期，请重置");
        }

        // 生成令牌
        final String token = jwtTokenUtil.generateToken(jwtUser);
        // 保存在线信息
        onlineUserService.save(jwtUser, token, request);
        // 返回 token
        return ResponseEntity.ok(new AuthInfo(token, jwtUser));
    }
~~~



### 4.3 基本crud

```shel
curl 'http://localhost:8000/api/bomCs' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDg4ODgiLCJleHAiOjE2NzgxMDcwOTQsImlhdCI6MTY3ODA4NTQ5NH0.l1m218NYrXJzbk-0x2937bKsR_1vIIS-ZJyWHKr2bdVKNtWU18etjLgAXU7uZeIhW7xd0_HbSjyfrcrM2l8J_g' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H 'Cookie: EL-ADMIN-TOEKN=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDg4ODgiLCJleHAiOjE2NzgxMDcwOTQsImlhdCI6MTY3ODA4NTQ5NH0.l1m218NYrXJzbk-0x2937bKsR_1vIIS-ZJyWHKr2bdVKNtWU18etjLgAXU7uZeIhW7xd0_HbSjyfrcrM2l8J_g' \
  -H 'Origin: http://0.0.0.0:8013' \
  -H 'Pragma: no-cache' \
  -H 'Referer: http://0.0.0.0:8013/bom/bom' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
  --data-raw '{"uuid":"","code":"","productType":"超声","parts":"维修组件类","material":"板卡6320","enMaterial":"banka","newPn":"12036","olderPn":"35q0245.5488","olderVersion":"","usageStatus":1,"series":{"id":62},"compatibility":"兼容板卡1@0&兼容板卡2@0","enCompatibility":"compatible card1@0","chinaRecycleAttribute":"国内返回总部","foreignRecycleAttribute":"国际分公司报废","pricingAttribute":"消耗不收费","unit":"1","customerPrice":"333","secondaryPrice":"33","agentPrice":"33","chinaBottomPrice":"3","foreignBottomPrice":"33","standardPrice":"33","engineerPrice":"33","areaBottomPrice":"33","pricingComment":"定价合理","remark":"备注3333","enRemark":"remarkllll","createUser":"","createDate":"","attribute1":"","attribute2":"3","attribute3":"","attribute4":"","attribute5":"","attribute6":""}' \
  --compressed \
  --insecure
```

```markdown
新增注意事项：
	新增数据插入到数据库以后，同时要在历史记录表中插入记录，标记“新增”，同时插入操作人员、操作时间等
修改：
	修改数据需要把修改后的数据写入历史记录表
删除：
	删除数据前，需要把原数据插入历史记录表，再删除
```





### 4.4 批量导入（新增/修改）

```markdown
流程：
	1. 解析excel
	2. 判断模板，当模板中有“唯一编码”字段，则代表是批量修改操作，否则为批量新增。
	3. 新增和更新不同逻辑单独处理
```



```java
 	@Override
    @CacheEvict(allEntries = true)
    @Transactional(rollbackFor = Exception.class)
    public void batchImport(MultipartFile file) {
        Map<String, String> columnAndComment = tableService.getColumnAndComment("bom_cs");
        try {
            //读取excel
            ExcelReader reader = ExcelUtil.getReader(file.getInputStream(), 0);
            //有“唯一编码”则代表用户本次操作是要批量更新
            if ("唯一编码".equals(reader.getCell(0, 0).getStringCellValue())){
                BomUtil.validateExcelTemplate(reader, columnAndComment, OperateType.UPDATE);
                reader.setCellEditor((cell, value) -> {
                    //1. 排除header ;2.使用状态位于第7列（从0开始）
                    if (cell.getRowIndex() > 0 && cell.getColumnIndex() == 7) {
         				//处理地7列的字段，用户excel中是文字，数据库存的是数字，插入数据库前需要转化为数字
                        return getUsageStatusByCell(cell);
                    }
                    return value;
                });
            }else {//新增
                BomUtil.validateExcelTemplate(reader, columnAndComment, OperateType.INSERT);
                reader.setCellEditor((cell, value) -> {
                    //1. 排除header ;2.使用状态位于第6列（从0开始）
                    if (cell.getRowIndex() > 0 && cell.getColumnIndex() == 6) {
                        return getUsageStatusByCell(cell);
                    }
                    return value;
                });
            }

            //忽略空行，防止因误操作导致中间存在大量的空白行，从而导致内存消耗过多造成OOM
            reader.setIgnoreEmptyRow(true);
            //excel表头和BomCs实体映射，具体参考hutool工具类
            columnAndComment.forEach((k, v) -> reader.addHeaderAlias(v, k));
            List<BomCs> items = reader.readAll(BomCs.class);
            //批量提交
            List<BomCs> bomCsBatch = new ArrayList<>();
            List<BomCsHistory> bomCsHistoryBatch = new ArrayList<>();
            //是否校验导入模板，防止模板是正常在，在循环中多次校验
            BomCsHistory bomCsHistory = null;
            for (int i = 0; i < items.size(); i++) {
                BomCs bomCs = items.get(i);
                //根据机型设置默认值
                setDefaultValue(bomCs);
                //若没有code则代表是新增
                if (StrUtil.isEmpty(bomCs.getCode())) {
                    bomCs = setAndGetBomCs(reader, i + 1, bomCs);
                    bomCsHistory = setAndGetBomCsHistory(bomCs, OperateType.INSERT);
                } else {
                    ValidationUtil.isNull(bomCsRepository.findByCode(bomCs.getCode()), "bom", "唯一编码", bomCs.getCode());
                    //防止批量修改时，图片被覆盖为空
                    bomCs.setPicturePath(bomCsRepository.findByCode(bomCs.getCode()).getPicturePath());
                    bomCs.setUuid(bomCsRepository.findByCode(bomCs.getCode()).getUuid());

                    //覆盖导入时，第9列代表适用子型号
                    Series series = validateAndGetSeries(reader, 9, i + 1);
                    bomCs.setSeries(series);
                    bomCsHistory = setAndGetBomCsHistory(bomCs, OperateType.UPDATE);
                }
                //校验单位
                //导入或新增时用户输入的是文字，要转换为数字，数据库中存放的是1、2、3，这样处理是为了兼容历史数据
              	//校验单位代码略
                
                //校验bomCs对象的字段合法性
                ValidateUtil.bomCsValidate(bomCs);

                bomCsBatch.add(bomCs);
                bomCsHistoryBatch.add(bomCsHistory);
                if (i % 300 == 0) {
                    //存入主表
                    bomCsRepository.saveAll(bomCsBatch);
                    //插入历史记录
                    bomCsHistoryRepository.saveAll(bomCsHistoryBatch);
                    bomCsBatch.clear();
                    bomCsHistoryBatch.clear();
                }
            }
            if (bomCsBatch.size() > 0) {
                bomCsRepository.saveAll(bomCsBatch);
                bomCsHistoryRepository.saveAll(bomCsHistoryBatch);
            }
        } catch (Exception e) {
            log.error("导入bom配置出现异常，{}", e);
            String eMessage;
            if (e instanceof NumberFormatException) {
                eMessage = "存在价格不为数字类";
            } else {
                eMessage = e.getMessage();
            }
            throw new RuntimeException(eMessage);
        }
    }
```



### 4.5 带权限查询接口

#### 4.5.1 流程图

![image-20230307144357501](https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20230307144357501.png)

#### 4.5.2 关键代码

```markdown
数据权限指的是机型系列的权限，查询的、导出接口都需要加上对应的数据权限，没有对应数据权限的用户不应该看到或者导出相应的数据。
	1. 执行查询前先查询当前用户信息
	2. 获取用户关联的角色，角色关联的机型权限
	3. 在查询条件加上条件过滤机型（主要使用mysql的in关键字进行过滤）
```

```java
   @Override
    public List<BomCsDTO> queryAll(BomCsQueryCriteria criteria) {
        //1. 当请求未携带过滤条件
        if (criteria.getSeriesId() == null) {
            criteria.setSeriesIds(dataScope.getSeriesIds());
        } else {
            Set<Long> set = dataScope.getAllSeriesIds(criteria.getSeriesId());
            if (set == null) {
                throw new BadRequestException("当前用户不拥有该系列权限");
            } else {
                criteria.setSeriesId(null);
                criteria.setSeriesIds(set);
            }
        }

        List<BomCs> bomcss = bomCsRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder));
        bomcss.forEach(bomCs -> {
            @NotNull Series series = bomCs.getSeries();
            bomCs.setMainMode(seriesService.getPNameById(series.getId()));
            bomCs.setAppliedMode(series.getName());
        });
        return bomCsMapper.toDto(bomcss);
    }

```



```java
 public Set<Long> getSeriesIds() {

        UserDTO user = userService.findByName(SecurityUtils.getUsername());

        // 用于存储系列id
        Set<Long> seriesIds = new HashSet<>();

        // 查询用户角色
        List<RoleSmallDTO> roleSet = roleService.findByUsers_Id(user.getId());

        for (RoleSmallDTO role : roleSet) {
            if (seriesType[0].equals(role.getSeriesScope())) {
                //全部机型权限
                return null;
            }

            //自定义机型权限
            Set<Series> seriesSet = seriesService.findByRoleIds(role.getId());
            for (Series series : seriesSet) {
                seriesIds.add(series.getId());
                List<Series> seriesChildren = seriesService.findByPid(series.getId());
                if (seriesChildren != null && seriesChildren.size() != 0) {
                    seriesIds.addAll(getSeriesChildren(seriesChildren));
                }
            }
        }
        return seriesIds;
    }
```

```java
    public List<Long> getSeriesChildren(List<Series> seriesList) {
        List<Long> seriesIds = seriesList.parallelStream().filter(item -> item.getEnabled()).map(Series::getId).collect(Collectors.toList());
        //机型的层级有2级，查询所有机型备用，避免递归或者嵌套循环中c数据库
        SeriesQueryCriteria seriesQueryCriteria = new SeriesQueryCriteria();
        List<SeriesDTO> seriesDTOS = seriesService.queryAll(seriesQueryCriteria);
        for (int i = 0; i < seriesList.size(); i++) {
            Series series = seriesList.get(i);
            for (int j = 0; j < seriesDTOS.size(); j++) {
                SeriesDTO seriesDTO = seriesDTOS.get(j);
                if (seriesDTO.getPid().equals(series.getId())) {
                    seriesIds.add(seriesDTO.getId());
                }
            }
        }
        return seriesIds;
    }
```







