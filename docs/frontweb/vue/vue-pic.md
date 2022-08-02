---
title: vue图片路径问题
date: 2022-03-09 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---



### 一，在vue中静态导入相对路径

```html
<img src="../../assets/1.png" />
<!-- 或者如下 -->
<img src="@/assets/1.png" />

```



### 二，静态导入绝对路径

**注意：绝对路径方式导入的图片需要存储在 public 文件夹下**

```html
<img src="images/1.png" />
<!-- 或者如下 -->
<img src="/images/1.png" />

```

为什么绝对路径导入的图片需要放在public文件夹下？

简单来说，就是 `public` 目录下的文件不会被编译，部署后可以通过绝对路径获取到。如果还放在原来的   `assets` 目录中，就会被webpack打包成新的文件夹，因而获取不到。

具体可看vue-cLI官网  [public文件夹](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)  

### 三，动态导入相对路径

3.1  `require` 写在html中 

```vue
<img :src="require('../../assets/' + imageUrl)" />

<script>
export default {
	data() {
        return {
            // 图片路径变量，真实路径为 assets/images/1.png
            imageUrl: 'images/1.png'
        }
    }
}
</script>
```

3.2  `require` 写在html中 

```vue
<img :src="imageUrl" />

<script>
export default {
	data() {
        return {
            // 图片路径变量，真实路径为 assets/images/1.png
            img: 'images/1.png',
            imageUrl: require('../../assets/' + this.img)
        }
    }
}
</script>
```

**注意：在vue3中不能使用require因为，vite不支持require.在vue2中webapack帮我们做了处理，所以才可以使用.**



在网上看到了一种解决办法：(亲测可用)

```vue
<template>
    <img :src="imgUrl" alt="">
</template>

<script>
    import {ref, onMounted} from "vue";
    export default {
        name: "imgPage",
        setup(){
            onMounted(()=>{
                handleImgSrc();
            })
            const imgUrl = ref('');
            const handleImgSrc = async()=>{
                let m = await import('@/assets/img/22.png');
                imgUrl.value = m.default;
            };
            return{
                imgUrl
            }
        }
    }
</script>

```

demo2 循环利用返回值请求本地图片

```vue
<template>
    <img  v-for="item in imgList" :src="getAssetsImages(item.url)" alt="">
</template>

<script>
    import {ref, reactive, onMounted} from "vue";
    export default {
        name: "imgPage",
        setup(){
        
       		const imgList = reactive([
				{url: 'a.png'},{url: 'b.png'},{url: 'c.png'}
			])
             const getAssetsImages =(name)=> {
		      return new URL(`/src/assets/pic/${name}`, import.meta.url).href; //本地文件路径
		 	 }

            return{
            	imgList ,
                getAssetsImages 
            }
        }
    }
</script>

```

