---
title: 图片懒加载
date: 2022-04-25 16:57:01
author: qianxun
categories: 
  - js基础
tags: 
  - 必会

---

### **一，为什么需要图片懒加载**

在老版本的Chrome中，图片的加载其实是会阻塞DOM渲染的。在我们现代浏览器中，这一点基本不用担心了，也就是说现在的图片加载不会阻塞DOM渲染，**但是每一个图片都会对应一个HTTP请求**，**而浏览器允许同时并发请求的数量是有限的（数量为6）**，假设你的网站有大量的图片，那么加载的过程是很耗时的，尤其像那些电商类需要大量图片的网站，可想而知，网站的初始加载时间会很长，再加上网络等其它影响，用户体验会很差。为了解决这个问题，提高用户体验，所以就出现了懒加载这种方式来减轻服务器的压力，优先加载可视区域的内容，其他部分等进入了可视区域再加载，从而提高性能。

### **二，图片懒加载原理**

原理其实非常简单，主要就是需要判断元素是否进入了可视区，进入了可视区就去请求对应的图片，否则就显示一张兜底的占位图。

实现图片懒加载基本要点如下所示：

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/图片懒加载.png)



### 三，实战

3.1 常用:利用图片顶部距离小于浏览器可视区域的高度来判断是否加载图片

```javascript
//获取图片元素
const images = document.querySelectorAll('img');
//scroll滚动事件
window.addEventListener('scroll',(e)=>{
     //判断每张图片的位置是否出现在可视区域
    images.forEach(image =>{
        //获取每张图片到顶部的距离
        const imTop = image.getBoundingClientRect().top;
         const imbottom = image.getBoundingClientRect().bottom;
        //当前元素顶部距离小于当前浏览器的可视高度并且元素距离底部距离大于等于0 ： 能够显示出来 可以加载
        if(imTop<window.innerHeight && imbottom>=0){
            //使用自定义属性data-src。在定义的时候：<img data-src="图片资源路径" >
            const data_src = image.getAttribute('data-src');//获取自定义属性
            image.setAttribute('src',data_src);//赋值给原本的的src属性，这样就显示了
        };
        //即使图片加载了还是会不断触发事件，非常消耗资源
        console.log("触发");
    })
})

```

> **getBoundingClientRect**返回值是一个DOMRect对象，这个对象是由该元素的getClientRects()方法返回的一组矩形的集合，就是该元素的 CSS 边框大小。返回的结果是包含完整元素的最小矩形，并且拥有left, top, right, bottom, x, y, width, 和 height这几个以像素为单位的只读属性用于描述整个边框。除了width 和 height 以外的属性是相对于视图窗口的左上角来计算的。

![img](http://afatpig.oss-cn-chengdu.aliyuncs.com/blog/clipboard.png)

3.2 优化：使用浏览器提供的构造函数IntersectionObserver。

> `IntersectionObserver` 是一个新的 API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

`let observer = new IntersectionObserver(callback, [options])`

```javascript
//获取图片元素
const images = document.querySelectorAll('img');
//定义callback函数  接受的参数是数组
const callback =(entries)=>{
    entries.forEach(entry=>{
        //isIntersecting属性为true时，说明到可视区域了 可以显示出来
        if(entry.isIntersecting){
        //target属性 就是目标元素
        const image = entry.target;
        const data_src = image.getAttribute('data-src')
        image.setAttribute('src',data_src);
        //显示出来后取消 观察 这个动作。不再观察了
        obser.unobserve(image);
        console.log('触发');
        }
    })
}
//回调函数callback一般触发两次 ,目标元素能看见 触发一次，目标元素看不见了 触发一次
const obser = new IntersectionObserver(callback);
images.forEach(image =>{
    //xxx.observe(DOM节点)  观察每个img节点
    obser.observe(image);
})

```



