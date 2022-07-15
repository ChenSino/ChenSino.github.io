---

title:JS原生事件
date: 2022-07-15
author: qianxun
categories: 
  - js基础
tags: 
  - 必会

---

## 一，事件注册的三种方式

1，通过 HTML 元素指定事件属性来绑定 

```javascript
<button onclick ="clickFu()">点我吧</button>
<script>
   function clickFu(){
       alert(3333)
   }
</script>
```

2,通过DOM对象指定的属性来绑定

```javascript
<div>
    <button id="btn">点我吧</button>
</div>
<script>
   var btn = document.querySelector('#btn');
   btn.onclick = function(){
       console.log('333')
   }
</script>
```

3,监听注册方式

通过 EventTarget.addEventListener() 方法来实现指定的监听器注册到 eventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。

> #### 语法格式：
>  target.addEventListener(type, listener, useCapture);
>  参数说明：
> （1）type ：必须，事件监听的类型，如 click 、 mouseover等；
> （2） listener ：必须，一个实现了 EventListener 接口的对象，或者是一个函数；
> （3） useCapture ：可选，表示是冒泡还是捕获。值为 true 表示捕获，否则表示冒泡 。

```javascript
var btn = document.querySelector('#btn');
   btn.addEventListener('click',function(){
       console.log('3333')
   })
```

区别： 如果使用传统方式进行注册，当对同一个对象添加相同事件时，后面的事件会覆盖掉前面的事件 

如果使用监听方式进行注册，当同一个对象绑定相同多个事件时，这些事件都会被执行



## 二，解绑事件

 vue组件里写的原生addEventListeners监听事件，一定要手动去销毁

对于传统注册方式，解绑事件的语法为：

`eventTarget.事件类型 = null;`

对于监听注册方式，解绑事件的语法为：

`eventTarget.removeEventListener(type, listener[, useCapture]);`

执行解绑代码后，元素绑定的点击事件不再生效。

 对于监听注册事件的解绑：

（1）将解绑事件写在函数里的任何位置，其注册事件只会执行一次；

（2）将解绑事件写在函数外，那么注册的事件将无效。

（3）对于监听注册方式的解绑，需要注意事件类型和监听函数必须是相同的，否则解绑无效。



```javascript
div>
    <button id="btn1">点我吧1</button>
    <button id="btn2">点我吧2</button>
</div>
<script>
   var btn1 = document.querySelector('#btn1');
   var btn2 = document.querySelector('#btn2');

   //传统注册
   btn1.onclick = function (){
       console.log(1111)
   }

   // 解绑事件必须放在注册事件后面
   // btn1.onclick = null

//----------------------------------------------------------------------------

    //监听注册
    btn2.addEventListener('click',function(){
       console.log(3333)
    })
   
    //这样不能解绑，相当于removeEventListener里重新赋值了一个匿名函数，卸载的不是上面监听的函数
    btn2.removeEventListener('click',function(){
        console.log(555)
    })


   function fn(){
       console.log(666)
   }

   btn2.addEventListener('click',fn)
   btn2.removeEventListener('click',fn)

</script>
```

## 三，事件流

事件传播过程就叫 DOM 事件流
由于在 HTML 中的标签都是相互嵌套的，我们可以将元素想象成一个盒子装一个盒子， document 是最外面的大盒子。当你单击一个 div 时，同时你也单击了 div 的父元素，甚至整个页面。
那么是先执行父元素的单击事件，还是先执行 div 的单击事件 ？ 先执行div的。

这就是事件冒泡，事件会向这个对象的父级传播，从里到外，直至它被处理。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>js事件冒泡</title>
</head>
<style>
    .outSide{
        width:100px;
        height:100px;
        background:#000;
        padding:50px;
    }

    .inSide{
        width:100px;
        height:100px;
        background:#CCC
    }

</style>
<body>
<div onclick="outSideWork()" id="outSide" class="outSide">
    <div onclick="inSideWork()" id="inSide" class="inSide">
    </div>
</div>
</body>
    <script type="text/javascript">
        function outSideWork()
        {
            alert('My name is outSide,I was working...');
        }

    function inSideWork()
    {
        alert('My name is inSide,I was working...');
    }
        

</script>
</html>
```

事件流又称为事件传播，描述的是从页面接收事件的顺序。当事件发生时会在元素节点之间按照 特定 的顺序传播，这个传播过程就叫 DOM 事件流 。

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/27493437-16b0e5bc10d1aab3.png)

（1）JavaScript 代码中只能执行捕获或冒泡其中一个阶段，要么冒泡，要么捕获。
		（2）onclick 与 attachEvent 方式注册的事件只有冒泡阶段。
		（3）addEventListener(type, listener[, useCapture]) 第三个参数为 true 表示捕获阶段，默认空着或		者 false 为冒泡阶段。
		（4） 有些事件不支持冒泡阶段（常见的几个）： blur 、 focus 、 mouseenter 、 mouseleave 、load 、 unload 、 resize 。

3.1  事件冒泡

事件冒泡是从明确的对象向不明确对象传播的事件。

[关于事件冒泡](https://www.cnblogs.com/qianxunpu/p/8041709.html)

3.2 事件捕获

（1）要想进行捕获，只能使用事件监听注册方式，不能使用事件传统注册方式；
		（2）需要把监听注册方法的第三个参数设置为 true

```html
<body>
<button id="btn1">点我吧</button>
</body>
<script type="text/javascript">
 var box = document.querySelector('#btn1');

 box.addEventListener('click',function(){
     console.log("div")
 },true)

 document.body.addEventListener('click',function(){
     console.log('body')
 },true)

 document.documentElement.addEventListener('click',function(){
     console.log('html')
 },true)

    //html，body，div

</script>
```

## 四，事件委托

事件委托就是把⼀个元素响应事件 （ click 、 keydown ......）的函数委托到另⼀个元素 ，事件流的都会经过三个阶段： 捕获阶段 -> ⽬标阶段 -> 冒泡阶段，⽽事件委托就是在冒泡阶段完成

事件委托 会把⼀个或者⼀组元素的事件委托到它的⽗层或者更外层元素上，真正绑定事件的是外层元 素，⽽不是⽬标元素。当事件响应到⽬标元素上时，会通过事件冒泡机制从⽽触发它的外层元素的绑定事件上，然后在外层元 素上去执⾏函数。

```html
<ul id="box">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
</body>
<script type="text/javascript">
 var box = document.querySelector('#box');

    //利用事件委托
 box.onmouseover = function(e){
     console.log(e);
     if(e.target.nodeName.toLowerCase()==='li'){
         e.target.style.backgroundColor = 'blue';
     }
 }

 box.onmouseout = function (e){
     if(e.target.nodeName.toLowerCase()=== 'li'){
         e.target.style.backgroundColor = 'black'
     }
 }

```


从上面的代码可以发现，当把事件绑定在 ul 上时，减少了一个循环。这样就可以提高程序性能。而把事件绑定在 ul 上的方式就是事件委托。
优点二： 使用事件委托的第二个好处是后续添加的子元素也可以拥有委托事件。

## 

## 五、事件方法

5.1 阻止事件冒泡 

 `e.stopImmediatePropagation() 和 e.stopPropagation()  两者都行`

5.2 阻止链接的默认行为

```html
<div>
    <a href="javascript:void(0)">链接1</a>
    <a href="javascript:;">链接2</a>
    <a href="https://www.baidu.com/">链接3</a>
</div>
</body>
<script type="text/javascript">
    var as = document.querySelectorAll('a');
    as[2].onclick = function (event){
        event.preventDefault()
    }
</script>
```

6.2 阻止提交按钮提交表单的默认行为

```html
 <form action="https://www.baidu.com/" method="post">
       <input type="text" name="s">
       <input type="submit" value="提供">
   </form>
</div>
</body>
<script type="text/javascript">
    var form = document.querySelector('form')
    form.addEventListener('submit',function(event){
        event.preventDefault()
    })
</script>
```

