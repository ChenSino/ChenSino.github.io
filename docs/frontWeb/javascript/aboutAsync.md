---
title: 异步async函数
date: 2021-02-20
author: qianxun
categories: 
  - vue知识点
tags: 
  - 必会
---

## 一，async函数的定义

async函数是使用async关键字声明的函数。  并且其中允许使用await关键字。async和await关键字让我们可以用一种更简洁的方式写出基于[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的**异步行为**，而无需刻意地链式调用promise。

> **备注：**`async`/`await`的目的为了简化使用基于 promise 的 API 时所需的语法。`async`/`await`的行为就好像搭配使用了生成器和 promise。



async函数的书写方式如下：

```javascript
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};

```

1.1   一个不含await表达式的async函数是会同步运行的。没有**await** 的情况下执行 async 函数，它会立即执行，返回  一个 Promise 对象，并且绝不会阻塞后面的语句。

```javascript
async function testAsync(){
   let a = 5;
   console.log('async内部')
 }
 testAsync();
 console.log('async外部') 
 
 //由于没有await，此时async函数同步执行  打印结果顺序  async内部--async外部

```

如果函数体内有一个await表达式，async函数就一定会异步执行。

```javascript
  async function test(){
      console.log(222)
    let a = await 5;
    console.log(444)
   }
function test2(){
    console.log(111)
    test();
    console.log(333)
}



/**打印结果
111,
222，
333,
444
*/
```

## 二，async函数的返回值	

**async 函数一定会返回一个 promise 对象。如果一个 async 函数的返回值看起来不是 promise，那么它将会被隐式地包装在一个 promise 中**。

2.1  如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。当 async 函数没有返回值时，返回 Promise.resolve(undefined)

```javascript
async function foo() {
   return 1
}
//等价于
function foo() {
   return Promise.resolve(1)
}
```

```javascript
 //定义一个普通函数，返回一个字符串
 function test() {
     return "hello async";
 }
 const result1 = test();
 console.log(result1); //输出一个字符串 hello async
 ​
 //定义一个使用了async修饰的函数，同样返回一个字符串
 async function testAsync() {
     return "hello async";
 }
 const result2 = testAsync();
 console.log(result2); //输出一个Promise对象 Promise {<fulfilled>: 'hello async'}

```

async较好的用法-sync通常用于声明一个处理异步任务且返回了Promise对象的函数

```javascript

 async function testAsync(){
     //返回一个Promise对象
     return new Promise((resolve, reject)=>{
         //处理异步任务
         setTimeout(function () {
             resolve("testAsync")
         }, 1000);
     })
 }

```

2.2  async内部return语句的返回值，会成为then方法回调函数的参数。(因为async函数返回的是promise对象)

```javascript
 async function testAsync() {
     return "hello async";
 }
testAsync().then(res=>{
	console.log(res)   //"hello async"
});
```

2.3   await关键字只能使用在被async声明的函数内，**用于修饰一个Promise对象**，使得该Promise对象处理的异步任务在当前协程上按顺序同步执行。

定义一个使用async修饰的函数，处理异步任务

```javascript
 async function testAsync(){
     return new Promise((resolve, reject)=>{
         setTimeout(function () {
             resolve("testAsync")
         }, 1000);
     })
 }

```

```javascript
 //定义一个函数，直接调用testAsync函数
 function testAwait(){
     console.log('testAsync调用前')
     testAsync().then(res=>{
         console.log(res) //输出"testAsync"
     })
     console.log('testAsync调用后')
 }
 ​
 /***** 输出如下 *****/
 testAsync调用前
 testAsync调用后
 testAsync
 //尽管代码按顺序写，但不按顺序执行，因为testAsync()是异步函数

```

```javascript
//定义一个函数（使用async声明该函数）用await修饰调用testAsync函数
 async function testAwait(){
     console.log('testAsync调用前')
     await testAsync().then(res=>{
         console.log(res)
     })
     console.log('testAsync调用后')
 }
 ​
 /***** 输出如下 *****/
 testAsync调用前
 testAsync
 testAsync调用后
 ​
 //使用了await关键字修饰，使得代码按照顺序执行，即同步执行

```

## 三， await命令

1,`await`有等待的意思，需**等待后面的`Promise`** 执行结束才会执行下一步。这里强调一下后面的`Promise`，是因为假如后面直接跟的是一个计时器，那么计时器虽然是异步操作，但是不会等计时器回调函数执行才执行下一步。

2,**`await`后面可以跟`Promise`，和其他类型的数据**

（1）当跟的是`Promise`时，值是执行成功的返回值。

```javascript
async function fn(){
	let a = await Promise.resolve(1)   a=1
	let b = await Promise.resolve(2) b=2
	return a+b  
}
fn().then(v=>v) v =3

```

（2）如果是其他数据时，返回值就是数据本身会返回的值，**该啥值是啥值**。

```javascript
function k(){}
async function fn(){
	let a = await k   //a就是函数k
	let b = await 1 //b=1
	let c = await setTimeOut(...) //c是定时器的id数值
	return a+b  
}
fn().then(v=>v) v =3

```

## 五，错误处理

async函数的错误处理方式有很多，正常来说，有3种方式。如下
        **方式一：** 直接调用throw new Error

`throw new Error` 下面的状态不会执行，`async`函数返回`Promise`的状态变   	为失败，执行`.catch`方法.

```javascript
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
    return await('hello world');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了

```

上面代码中，async函数f执行后，await后面的 Promise 对象会抛出一个错误对象，导致catch方法的回调函数被调用，它的参数就是抛出的错误对象。

当然，上边的写法我们不建议在项目中书写，我们可以把它写到try…catch…中的，这样就能防止错误，并且在代码正确的情况也能正常执行。

```javascript
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
      console.log(e)
  }
  return await('hello world');
}

 fn().then(res=>{
    console.log(res)
 })    
```

如果有多个await命令，可以统一放在try…catch结构中。

当`await`其中一个`Promse`执行失败，那么接下来的`await`不会继续执行， `async`函数返回`Promise`的状态变为失败，执行`.catch`方法

```javascript
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}

```

## 六，总结

![image-20220712101429059](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/image-20220712101429059.png)
