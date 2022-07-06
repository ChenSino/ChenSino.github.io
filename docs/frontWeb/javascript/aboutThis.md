---
title:this指向问题
date: 2022-04-25 16:57:01
author: qianxun
categories: 
  - js基础
tags: 
  - 必会

---

## 一，函数内部的this指向

    函数内this指向，是当我们调用函数的时候才能确定。调用方式的不同决定this的指向不同。
    this的指向，是在调用函数时根据执行上下文所动态确定的。


​    

 调用方式 | this指向
---|---
普通函数调用 | window
构造函数调用 | 实例对象，原型对象里的方法也指向实例对象
对象方法调用 | 该方法所属的对象
事件绑定方法调用 | 绑定事件对象
定时器函数 |window
立即执行函数|window



​    

## 二，setTimeout & setInterval
对于延时函数内部的回调函数的this指向全局对象window（当然我们可以通过bind方法改变其内部函数的this指向.

```javascript
function Person() {  
    this.age = 0;  
    setTimeout(function() {
        console.log(this);  
    }, 3000);
}
var p = new Person(); //3秒后返回 window 对象
```



通过bind绑定

```javascript
function Person() {  
    this.age = 0;  
    setTimeout((function() {
        console.log(this);  
    }).bind(this), 3000);  //通过bind改变this的指向
}
var p = new Person();//3秒后返回构造函数新生成的对象 Person{...}
```


## 三，箭头函数中的this

由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，
所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）
因为箭头函数可以捕获其所在上下文的this值 所以

```javascript
function Person() {
    this.age = 0;
    setTimeout(() => {
             // 回调里面的 `this` 变量就指向了期望的那个对象了
        console.log(this) //this 指向Person
    }, 3000);
}
var p = new Person();
```



  如果将箭头函数当做一个方法使用会怎样呢？

```javascript
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();  // undefined window{...}
obj.c();  // 10 Object {...}
```





## 四,关于promise中的this指向问题

1、this指向window还是实例？

```javascript
methods: {
        getJoke() {
            console.log( axios.get("https://autumnfish.cn/api/joke") ); // Promise {<pending>} 对象
            axios.get("https://autumnfish.cn/api/joke").then( function (response) {
                console.log(this); // promise的then中回调函数为匿名函数时，this会指向 window
            },function (err) {
                console.log(err);
            }) 
        }
    }
```

this指向实例：

```javascript
 methods: {
        getJoke() {
            axios.get("https://autumnfish.cn/api/joke").then( response => {
                console.log(this); // promise的then中回调函数为箭头函数时，this指向外层第一个普通函数的this，本例中指向Vue实例
            },function (err) {
                console.log(err);
            }) 
        }
    }
```

**总结：**

Promise对象的回调函数是匿名函数时，this指向window，需要对回调函数bind(this)来改变其this指向。

Promise对象的回调函数是箭头函数时，this指向外层第一个普通函数的this。本例中指向Vue实例。

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/1725c096bb763965~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
