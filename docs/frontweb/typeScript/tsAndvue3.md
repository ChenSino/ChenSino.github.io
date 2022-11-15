---
title: typeScript在vue3中的实战
date: 2022-08-05 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
  - vue中的 TypeScript
---

## ts在表单中的应用

```vue
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="70px">
        <h2>后台管理系统</h2>
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button class="login-btn" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
```

```javascript

import { LoginData } from "@/type/login";
import { FormInstance } from "element-plus";
//表单响应式的数据放入reactive中
 const data = reactive(new LoginData());

  // 表单输入规则 --不是响应式的
const rules = {
    username: [
        {
            required: true, //是否必须字段
            message: "请输入用户名", // 触发的提示信息
            trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
            min: 3, // 最小字符书
            max: 5, // 最大字符数
            message: "用户名长度需要在3-5个字符之间", // 触发的提示信息
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true, //是否必须字段
            message: "请输入密码", // 触发的提示信息
            trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
            min: 3, // 最小字符书
            max: 6, // 最大字符数
            message: "密码长度需要在3-5个字符之间", // 触发的提示信息
            trigger: "blur",
        },
    ],
};

//表单实例化
 const ruleFormRef = ref<FormInstance>();

 const submitForm = (formEl: FormInstance | undefined) => {
      // 对表单内容进行验证
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            console.log(res);
            // 将token进行保存
            localStorage.setItem("token", res.data.token);
            // 跳转页面
            router.push("/");
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

//重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


```

在上面这个例子中，对reactive中数据进行类型显示注解，这个博主用的方式，新建了一个types文件login.ts

```typescript
/**
 * 表单数据接口
 */
export interface ILoginData{
    username: string
    password: string
}

export class LoginData {
    ruleForm: ILoginData = {
        username: "",
        password: ""
    }
}
```

然后

```javascript
 
 import { LoginData } from "@/type/login";
 const data = reactive(new LoginData()); 
 
```

二，使用泛型来注解reactive中的数据类型

```typescript

interface DomainItem {
  key: number
  value: string
}

const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    { key: 1,value: '',},
  ],
  email: '',
})
```

