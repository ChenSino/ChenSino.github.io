---
title: vue3使用emit进行父子组件传值
date: 2023-04-12
isOriginal: true
category: 
tag: 
  - ts
  - vue3
---

## vue3 使用组合式api时如何进行父子组件通信

~~~javascript
// 1.在vue组件中定义事件
const emit = defineEmits(['update:hospitalDept'])
//2. 调用userXXXControl时，把emit当做参数传递进去，useCreateHospitalDeptControl(emit)实际也就类似一个函数
const {
  deptForm,
  formRules,
  validDeptRef,
  status,
  deptCategoryList,
  initColumn,
  initData,
  createHospitalDeptSubmit,
} = useCreateHospitalDeptControl(emit)

//3. 在useXXXContrl.tx文件中让函数接收一个参数
const useCreateHospitalDeptControl = (emit: any)=>{
    
    //这里可以使用vue组件传递过来的emit参数了.....
   	const testEmit = ()=>{
         emit('update:hospitalDept')
    }
    return {
        testEmit,
        ....
    }
}
//4. 父组件xx.vue中就可以使用@update:hospital-depth
   <CreateHospitalDept
      ref="createHospitalDeptRef"
      @update:hospital-dept="updateHospitalDeptList"
    />
~~~
