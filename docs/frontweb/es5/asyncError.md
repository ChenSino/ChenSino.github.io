---
title: 关于async/await的异常捕获
date: 2022-11-10
author: qianxun
publish: true
category: 
  - vue知识点
tag: 
  - 必会
---

## 一，为什么要捕获异常

```javascript
//确认提交
const submitWorkloadSure = async () => {
  
    let data = await WorkloadSures()
     console.log(555)
};

```
这里我们没有进行异常捕获，如果这个`let data = await WorkloadSures()`执行报错的话，那么接下来的代码将因为程序发生错误不会继续执行下去，这里的555就不会被打印出来。
如果我们有进行异常捕获的话，后续代码依旧可以正常执行。

1.2 使用catch捕获异常

```javascript

//确认提交
const submitWorkloadSure = async () => {
        let data = await WorkloadSures().catch(err=>{
            console.log(err)
        });  
    console.log(555)
};

```

1.3 使用try.catch捕获异常

```javascript
//确认提交
const submitWorkloadSure = async () => {
        try{
            let data = await WorkloadSures()  
        }catch(e){
            console.log(e)
        }  
    console.log(555) 
};

```



## 二，相关案例

测试的方法

```javascript
		httpTest(status) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (status === 'success') {
						resolve({ code: 200, msg: '操作成功' });
					} else {
						reject('error');
					}
				}, 300);
			});
		}
```

当我们使用.then().catch()的方法调用,我们在catch中就可以捕获到异常

```javascript
		getList2() {
			this.httpTest()
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
```

但是当我们使用es7的 [async](https://so.csdn.net/so/search?q=async&spm=1001.2101.3001.7020)/await呢? 只是这么写，我们是捕获不到异常的！

```Javascript
		async getList3() {
			let resp = await this.httpTest();
			console.log(resp);
		},
```

这个时候我们需要一个捕获异常的地方，有些人就想到了链式调用的catch，但是这么写总是有点四不像的样子，我既然想用async/await这种调用方式，那就看上了这种的调用更加的优雅，代码更加的清晰明了，在后面加上一个.catch就显的很怪。

```javascript
		async getList4() {
			let resp = await this.httpTest().catch(err => console.log(err));
			console.log(resp);
		},
```

使用try / catch来捕获异常，这样的话代码就看起来舒服多了，catch里面的err就是我们所捕获的异常.

```javascript
		async getList6() {
			try {
				let resp = await this.httpTest();
				console.log(resp);
			} catch (err) {
				console.log(err);
			}
		},
```

但是问题，又来了，我在一个方法里面写了好几个请求方法，这个时候该怎么办？有的人的写法

```javascript
		async getList6() {
			try {
				let resp1 = await this.httpTest();
				console.log(resp1);
				let resp2 = await this.httpTest();
				console.log(resp2);
				let resp3 = await this.httpTest();
				console.log(resp3);
			} catch (err) {
				console.log(err);
			}
		},
```

合理吗？显然是不合理！这个err值只输出了一次，我怎么知道这捕获的是谁的？，那怎么办？每个都写一个try / catch,是个解决办法，像下面这样，好看吗，看着还整洁，如果再加上业务代码处理，那就写了好多代码啊。。。作为一个懒人，我们需要想点招.

```javascript
		async getList6() {
			try {
				let resp1 = await this.httpTest();
				console.log(resp1);
			} catch (err) {
				console.log(err);
			}
			try {
				let resp2 = await this.httpTest();
				console.log(resp2);
			} catch (err) {
				console.log(err);
			}
			try {
				let resp3 = await this.httpTest();
				console.log(resp3);
			} catch (err) {
				console.log(err);
			}
		},
```

一个小招，我们写了一个test的方法，做一个简单的封装

```javascript
		test(fn) {
			return new Promise(async resovle => {
				try {
					let res = await fn;
					resovle([null, res]);
				} catch (err) {
					resovle([err, null]);
				}
			});
		},
 
        //或者这样
        async test(fn) {
	        try {
		        let resp = await fn
		        return [null, resp]
	        } catch (err) {
		        return [err, null]
	        }
        }
```

调用

```javascript
		async getList5() {
			let [err, res] = await this.test(this.httpTest());
			console.log('res===>', res);
			console.log('err===>', err);
			let [err1, res1] = await this.test(this.httpTest('success'));
			console.log('res1===>', res1);
			console.log('err1===>', err1);
			let [err2, res2] = await this.test(this.httpTest('fail'));
			console.log('res2===>', res2);
			console.log('err2===>', err2);
		},
```

