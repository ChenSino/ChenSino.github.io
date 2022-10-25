---
title:前端模块化
date: 2022-10-25 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
---

## 一，什么是前端模块化

模块化就是将一个复杂的应用程序，按照规范拆分成几个相互独立的文件，这些文件里面完成共同的或者类似的逻辑，通过对外暴露一些数据或者调用方法，与外部整合。

这样每个文件彼此独立，我们开发者更容易开发和维护代码，特别是当开发的项目越来越大，代码复杂性也不断增加，这对于模块化的需求也会越来越大。

模块化主要特点是：可复用性、可组合性、独立性、中心化。

所以使用模块化可以帮我们解决什么问题呢？

- **解决了命名冲突**：因为每个模块是独立的，所以变量或函数名重名不会发生冲突
- **提高可维护性**：因为每个文件的职责单一，有利于代码维护
- **性能优化**：异步加载模块对页面性能会非常好
- **模块的版本管理**：通过别名等配置，配合构建工具，可以实现模块的版本管理
- **跨环境共享模块**：通过 `Sea.js` 的` NodeJS `版本，可以实现模块的跨服务器和浏览器共享

目前前端主流的模块化标准有：

- **CommonJS**
- **AMD**
- **CMD**
- **UMD**
- **ES6**



## 二，CommonJS

commonJS 是语言层面的规范，当前主要用于Node.js.

在每个模块内部有一个 module 对象，代表当前模块，通过它来导出当前模块里的 API，module 有几个属性：

- `exports` : 是对外的接口，加载某个模块，就是加载该模块的` **module.exports** `属性
- `loaded`: 返回一个布尔值，表示该模块是否已完成加载
- `parent`: 返回一个对象，表示调用该模块的模块
- `children`：返回一个数组，表示该模块被用到了其他模块的集合
- `filename`：模块的文件名，带有绝对路径
- `id`：模块的标识符，一般是带有绝对路径的模块文件名

**CommonJS 规范的特点：**

- 每个文件都是**独立**的模块，有独立的作用域，b变量和方法 不会污染全局空间,并且对其他文件是不可见的。
- 文件可以被重复引用、加载。**第一次加载时会被缓存**，之后再引用就直接读取缓存
- 加载某个模块时，**module.exports 输出的是值的拷贝**，一旦这个值被输出，模块内再发生变化不会影响已经输出的值

用法是这样的：

**导出**

```javascript

module.exports.foo = function(){ ... } // 只能输出一个
或 可以输出多个
exports.a = 1
exports.foo = function(){ ... }

```

exports 和 module.exports 都能导出模块数据，

**导入**

```javascript
const foo = require("./xxx") // 如果没有写文件名后缀，会自动按照 .js、.json、.node的顺序补齐查找
```

**加载过程如下：**

- 先从缓存里找，有就加载
- 缓存没有就检查是不是全局模块，是就直接加载
- 不是就检查模块路径有没有该文件，有就解析路径并定位文件，然后执行加载
- 如果以上都不是，就沿当前路径向上层逐级递归查找，直到根目录 node_modules



## 三，AMD(异步模块定义)



和 CommonJS 一样都是模块化，只不过 **CommonJS 规范加载模块是同步加载**，只有加载完成，才能执行后面的操作，而 **AMD 是异步加载模块**，可以指定回调函数。

因为 Node.js 运行在服务器上，所有的文件一般都存在本地硬盘里，不需要再去请求异步加载。可如果放在浏览器环境下，就需要去请求从服务器获取模块文件，这时如果再使用同步加载显然就不合适了，所以才有了完全贴合浏览器的 ADM 规范，**该规范的实现就是** `require.js`

它的使用方法就是通过一个全局函数 `define`，把代码定义为模块，再用 `require` 方法加载模块。

`define` 接收三个参数

- 第一个是模块名称，也可以不填，默认就是文件名
- 第二个参数必须是一个数组，定义了该模块依赖的模块列表
- 第三个参数是模块初始化要执行的函数或对象。如果是函数，只会被执行一次，如果是对象，那这个对象应该作为模块的输出值

```javascript

define("myModule"， ["require", "exports", "beta"],  function(require, exports, beta){
    exports.foo = function(){
        return beat.foo()
    }
})
```

就是创建了一个名为 myModule 的模块，该模块依赖 require、exports 和 beta 三个模块，并导出 foo 函数

导出

```javascript
module.exports = { ... }
```

导入

```JavaScript
const foo = require("./xxx")
```



## 四， CMD（公共模块定义）



CMD 规范整合了上面说的 CommonJS 规范和 AMD 规范的特点，CMD 规范的实现就是 sea.js。

CMD 规范最大的特点就是懒加载，不需要在定义模块的时候声明依赖，可以在模块执行时动态加载依赖，并且同时支持同步和异步加载模块。

**CMD 和 AMD 的主要区别是**：

- AMD 需要异步加载模块，而 CMD 可以同步加载(`require`)，也可以异步加载(`require.sync`)
- CMD 遵循依赖就近原则，AMD 遵循依赖前置原则。就是说在 AMD 中我们需要把模块需要的依赖都提前在依赖数组里声明，而在 CMD 里我们只需要在具体代码逻辑内，把需要使用的模块 require 进来就可以了

用法和require.js差不多，通过定义一个全局函数 define 来实现，不过只能接受一个参数，可以是函数或者对象。如果是对象，模块导出的就是对象，如果是函数，那这个函数会被传入三个参数

```javascript

define( function(require, exports, module){
    ...
})

```

三个参数分别是：

- `require`：可以引用其他模块，也可以用 require.async 异步调用其他模块
- `expxort`：是一个对象，定义模块的时候，需要通过参数 export 添加属性来导出 API
- module：是一个对象，它有三个上属性
  - **uri**： 模块完整的 URI 路径
  - **dependencies**：模块的依赖
  - **exports**：模块需要被导出的 API

看个栗子

```javascript

define( function(require, export, module){
    const add = require("math").add
    exports.increment = function(val){
        return add(val, 1)
    }
    module.id = "increment"
})
```

就是定义一个名为 increment 的模块，引用 math 模块里的 add 方法，经过处理后，再导出 increment 函数



## 五，UMD



UMD 没有专门的规范，而是集合了上面说的三个规范于一身，它可以让我们在合适的环境选择合适的模块规范。

比如在 Node.js 环境中用 CommonJS 模块规范管理，在浏览器端支持 AMD 的话就采用 AMD 模块规范，不支持就导出为全局函数。

看实现代码

```javascript

(function(root, factory){
    if(typeof define === "function" && define.amd){
        define(["xxx"], factory)
    }else if(typeof exports === "object"){
        module.exports = factory( require("xxx") )
    }else{
        root.returnExports = factory( root.xxx )
    }
}(this, ($) => {
    return { ... }
}))
```

判断过程是这样的

- 先判断支不支持 AMD (define 是否存在)，存在就使用 AMD 方式加载模块

- 再判断支不支持 Node.js 模块格式(export 是否存在)，存在就用 Node.js 模块格式

- 如果前两个都不存在，就将模块公开到全局，window 或 global

  

## 六，ES6模块化

CommonJS 和 AMD 都是在运行时确定依赖关系，也就是运行时加载，CommonJS 加载的是拷贝，而 ES6 module 是在编译时就确定依赖关系，所有的加载都是引用，这样做的好处是可以执行静态分析和类型检查

**ES6 Module 和 CommonJS 的区别**：

- `ES6 Module` 的 import 是静态引入，CommonJS的 require 是动态引入
- `Tree-Shaking` 就是通过 ES6 Module 的 import 来进行静态分析，并且只支持 `ES6 Module` 模块的使用。
- Tree-Shaking 就是移除掉 JS 上下文中没有引用的代码，比如 import 导入模块没有返回值的情况下，
- webpack 在打包编译时 Tree-Shaking 会默认忽略掉此文件
- `ES6 Module` 是对模块的引用，输出的是值的引用，改变原来模块中的值引用的值也会改变；`CommonJS` 是对模块的拷贝，修改原来模块的值不会影响引用的值
- `ES6 Module` 里的 this 指向 undefined；`CommonJS` 里的 this 指向模块本身
- `ES6 Module` 是在编译时确定依赖关系，生成接口并对外输出；CommonJS 是在运行时加载模块
- `ES6 Module` 可以单独加载某个方法；`CommonJS` 是加载整个模块
- `ES6 Module` 不能被重新赋值，会报错；`CommonJS` 可以重新赋值(改变 this 指向)。



静态分析是啥？什么是静态引入？什么是动态引入？

```javascript

// CommonJS / AMD 中动态引入的写法
const foo = require( `all/${["f","o","o"].join("")}` )
const foo = require( "all/FOO".toLowerCase() )
const foo = require( (()=>"foo")() )
const foo = xx.get( require("foo") )

// ES6 Module 中静态引入的写法
import foo from "xxxx/xxx"
import { foo1, foo2 } from "xxxx/xxx"

```

结论：动态==可以拼接，静态==不准拼接，哈哈哈 ~~~ ，不是 === 哈，简单理解一下，原理就不拓展了.

不能拼接，ES6 Module 自然就可以很容易分析出使用了哪些模块，这就是静态分析，可以在不运行代码的情况下，对代码扫描检测分析

ES6 Module 的用法，看下代码

```javascript

// 方式一 可以输出多个
export const a = 1
export function foo(){}

//方式二 只能输出一个
const a = 1
function foo(){}
export default {
    a, 
    foo 
}

// 注意
export { a as b }  // as 的意思就是重命名

```

还有 export default 会导出默认输出，用 vue 的应该特别熟悉，就是不需要知道模块中输出的名字，在导入的时候再自定义名字

```javascript

// 导出
export default function(){ ... }

// 引入
import "./xxx"  这样只是加载，没有输出，也就不能调用
// 下面这样就可以使用
import funName1 from "./xxx"
import { funName1 as foo } from "./xxx"
import { funName1, funName2 } from "./xxx"

// 加载整个模块  会忽略 default 输出
import * as myModule from "./xxx"
// 使用
myModule.a
myModule.foo()

// 模块的继承
import * from "./xxx" // 在当前模块里这样引入别的模块，就把 xxx 模块里导出的全部继承过来了
                          
```

### 6.1 在浏览器中使用 ES 模块化

只需要在 script 标签中添加 `type="module"` 属性就行，目前各大浏览器较新版本都已支持，如果是不支持的浏览器通过添加 `nomodule` 属性来执行其他方案.

```javascript

<script type="module">
    import module1 from "./xxx"
</script>
<script nomodule>
    alert("您的浏览器暂不支持 ES 模块，请先升级浏览器版本")
</script>

```

### 6.2 在 Node.js 中使用 ES 模块化



Node.js 从 9.0 版本开始支持 ES 模块

可以在执行脚本需要启动时加上 **--experimental-modules**，需要文件后缀名必须为 .mjs

```javascript
node --experimental-modules module1.mjs

//使用
import module1 from "./xxx"
```

或者也可以安装 **babel-cli** 和 **babel-preset-env**，配置 .babelrc 文件后，执行

```ABAP

./node_modules/.bin/babel-node

```

或

```bash

npx babel-node

```

### 其他

`Webpack `本身维护了一套模块系统，兼容了几乎所有前端历史下的模块规范，上面说的模块化全都有
