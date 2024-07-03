---
title: ElementUI表单自定义校验
date: 2024-07-03
author: chensino
publish: true
isOriginal: true
---

### 常规

```typescript
//定义一个函数

export const numberValidator = (rule: any, value: any, callback: any) => {
    //数字正则表达式
    const pattern = /^[0-9]*$/
    if (!value || !pattern.test(value)) {
        return callback(new Error('请输入数字'))
    }
    callback()
}

// 使用
const formRules = {
  enName: [ {
    required: false,
    min:2,
    max: 32,
    validator: numberValidator(),
    trigger: 'blur',
  }]
}
```

```markdown
使用以上方式定义可实现自定义校验，但是不够灵活，比如我想在自定义函数中判断输入值最大允许的长度，最小允许的长度，
这个最大最小长度需要是动态的，不能在自定义校验中写死
```

### 动态获取参数

```typescript
//自定义校验
/**
 * 字母或数字校验
 */
export const letterOrNumberValidator = () => {

    return (rule: any, value: any, callback: any) => {
        //默认required必填
        if (rule.required == undefined) {
            rule.required = false;
        }
        if (rule.min == undefined) {
            rule.min = 2
        }
        if (rule.max == undefined) {
            rule.max = 16
        }
        const pattern =  `^[a-zA-Z0-9]{${rule.min},${rule.max}}$`;
        const regExp = new RegExp(pattern);
        //必填
        if (rule.required) {
            if (!regExp.test(value)) {
                return callback(new Error(`请输入字母或数字长度在${rule.min}-${rule.max}位`))
            }
        }
        //非必填，但是输入了，则校验
        if (!rule.required && value) {
            if (!regExp.test(value)) {
                return callback(new Error(`请输入字母或数字长度在${rule.min}-${rule.max}位`))
            }
        }
        callback()
    };
}

//表单规则中调用
const formRules = {
  enName: [ {
    required: false,
    min:2,
    max: 32,
    validator: letterOrNumberValidator(),
    trigger: 'blur',
  }]
  }
```

:::note 说明
这种方式可以通过回掉参数中rule获取到规则中传递的required、min、max等参数，使用时，只需要正常传递即可
:::
