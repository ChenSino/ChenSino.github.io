---
title: 节流与防抖
date: 2022-04-25
author: qianxun
categories: 
  - js基础
tags: 
  - 必会

---

## 一，节流概念(Throttle)


> 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。



**主要应用场景有：**

1. 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；
1. 在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次 ajax 请求，而不是在用户停下滚动页面操作时才去请求数据；
1. 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断；

## 二，节流实现

思路： 第一次先设定一个变量true，第二次执行这个函数时，会判断变量是否true，是则返回。当第一次的定时器执行完函数最后会设定变量为flase。那么下次判断变量时则为flase，函数会依次运行。


代码一:

```javascript
function throttle(fn,delay=100){
	//首先设定一个变量，在没有执行我们的定时器时为null
	let timer = null;
	return function(){
		//当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
		if(timer) return;
		timer = setTimeout(()=>{
			fn.apply(this,arguments);
			timer = null;
		},delay);
	}
}
```

代码二:

```javascript
function throttle2(fn,delay=100){
	let last = 0;
	return function(){
		let curr = +new Date();
		if(curr - last > delay){
			fn.apply(this,arguments);
			last = curr;
		}
	}
}
```


## 

## 三，防抖概念(Debounce)



> 在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。



抖动停止后的时间超过设定的时间时执行一次函数。注意：这里的抖动停止表示你停止了触发这个函数，从这个时间点开始计算，当间隔时间等于你设定时间，才会执行里面的回调函数。如果你一直在触发这个函并且两次触发间隔小于设定时间，则一定不会到回调函数那一步。



**主要应用场景有：**

1. 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询ajax请求，这样可以有效减少请求次数，节约请求资源；
1. window的resize、scroll事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次；



## 四，防抖实现

思路：首次运行时把定时器赋值给一个变量，第二次执行时，如果间隔没超过定时器设定的时间则会清除掉定时器，重新设定定时器，依次反复，当我们停止下来时，没有执行清除定时器，超过一定时间后触发回调函数。


代码一

```javascript
function debounce(fn,delay=200){
	let timer = null;
	return function(){
		if(timer) clearTimeout(timer);
		timer = setTimeout(()=>{
			fn.apply(this,arguments);
			timer = null;
		},delay);
	}
}
```





