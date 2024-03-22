import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e}from"./app-Cs38sdJl.js";const t={},o=e(`<h2 id="一-什么是前端模块化" tabindex="-1"><a class="header-anchor" href="#一-什么是前端模块化"><span>一，什么是前端模块化</span></a></h2><p>模块化就是将一个复杂的应用程序，按照规范拆分成几个相互独立的文件，这些文件里面完成共同的或者类似的逻辑，通过对外暴露一些数据或者调用方法，与外部整合。</p><p>这样每个文件彼此独立，我们开发者更容易开发和维护代码，特别是当开发的项目越来越大，代码复杂性也不断增加，这对于模块化的需求也会越来越大。</p><p>模块化主要特点是：可复用性、可组合性、独立性、中心化。</p><p>所以使用模块化可以帮我们解决什么问题呢？</p><ul><li><strong>解决了命名冲突</strong>：因为每个模块是独立的，所以变量或函数名重名不会发生冲突</li><li><strong>提高可维护性</strong>：因为每个文件的职责单一，有利于代码维护</li><li><strong>性能优化</strong>：异步加载模块对页面性能会非常好</li><li><strong>模块的版本管理</strong>：通过别名等配置，配合构建工具，可以实现模块的版本管理</li><li><strong>跨环境共享模块</strong>：通过 <code>Sea.js</code> 的<code>NodeJS</code>版本，可以实现模块的跨服务器和浏览器共享</li></ul><p>目前前端主流的模块化标准有：</p><ul><li><strong>CommonJS</strong></li><li><strong>AMD</strong></li><li><strong>CMD</strong></li><li><strong>UMD</strong></li><li><strong>ES6</strong></li></ul><h2 id="二-commonjs" tabindex="-1"><a class="header-anchor" href="#二-commonjs"><span>二，CommonJS</span></a></h2><p>commonJS 是语言层面的规范，当前主要用于Node.js.</p><p>在每个模块内部有一个 module 对象，代表当前模块，通过它来导出当前模块里的 API，module 有几个属性：</p><ul><li><code>exports</code> : 是对外的接口，加载某个模块，就是加载该模块的<code>**module.exports**</code>属性</li><li><code>loaded</code>: 返回一个布尔值，表示该模块是否已完成加载</li><li><code>parent</code>: 返回一个对象，表示调用该模块的模块</li><li><code>children</code>：返回一个数组，表示该模块被用到了其他模块的集合</li><li><code>filename</code>：模块的文件名，带有绝对路径</li><li><code>id</code>：模块的标识符，一般是带有绝对路径的模块文件名</li></ul><p><strong>CommonJS 规范的特点：</strong></p><ul><li>每个文件都是<strong>独立</strong>的模块，有独立的作用域，b变量和方法 不会污染全局空间,并且对其他文件是不可见的。</li><li>文件可以被重复引用、加载。<strong>第一次加载时会被缓存</strong>，之后再引用就直接读取缓存</li><li>加载某个模块时，<strong>module.exports 输出的是值的拷贝</strong>，一旦这个值被输出，模块内再发生变化不会影响已经输出的值</li></ul><p>用法是这样的：</p><p><strong>导出</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span> <span class="token comment">// 只能输出一个</span>
或 可以输出多个
exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>exports 和 module.exports 都能导出模块数据，</p><p><strong>导入</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./xxx&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 如果没有写文件名后缀，会自动按照 .js、.json、.node的顺序补齐查找</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>加载过程如下：</strong></p><ul><li>先从缓存里找，有就加载</li><li>缓存没有就检查是不是全局模块，是就直接加载</li><li>不是就检查模块路径有没有该文件，有就解析路径并定位文件，然后执行加载</li><li>如果以上都不是，就沿当前路径向上层逐级递归查找，直到根目录 node_modules</li></ul><h2 id="三-amd-异步模块定义" tabindex="-1"><a class="header-anchor" href="#三-amd-异步模块定义"><span>三，AMD(异步模块定义)</span></a></h2><p>和 CommonJS 一样都是模块化，只不过 <strong>CommonJS 规范加载模块是同步加载</strong>，只有加载完成，才能执行后面的操作，而 <strong>AMD 是异步加载模块</strong>，可以指定回调函数。</p><p>因为 Node.js 运行在服务器上，所有的文件一般都存在本地硬盘里，不需要再去请求异步加载。可如果放在浏览器环境下，就需要去请求从服务器获取模块文件，这时如果再使用同步加载显然就不合适了，所以才有了完全贴合浏览器的 ADM 规范，<strong>该规范的实现就是</strong> <code>require.js</code></p><p>它的使用方法就是通过一个全局函数 <code>define</code>，把代码定义为模块，再用 <code>require</code> 方法加载模块。</p><p><code>define</code> 接收三个参数</p><ul><li>第一个是模块名称，也可以不填，默认就是文件名</li><li>第二个参数必须是一个数组，定义了该模块依赖的模块列表</li><li>第三个参数是模块初始化要执行的函数或对象。如果是函数，只会被执行一次，如果是对象，那这个对象应该作为模块的输出值</li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&quot;myModule&quot;</span>， <span class="token punctuation">[</span><span class="token string">&quot;require&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;exports&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;beta&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> beta</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    exports<span class="token punctuation">.</span><span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> beat<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是创建了一个名为 myModule 的模块，该模块依赖 require、exports 和 beta 三个模块，并导出 foo 函数</p><p>导出</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>导入</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript" data-title="JavaScript"><pre class="language-JavaScript"><code>const foo = require(&quot;./xxx&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="四-cmd-公共模块定义" tabindex="-1"><a class="header-anchor" href="#四-cmd-公共模块定义"><span>四， CMD（公共模块定义）</span></a></h2><p>CMD 规范整合了上面说的 CommonJS 规范和 AMD 规范的特点，CMD 规范的实现就是 sea.js。</p><p>CMD 规范最大的特点就是懒加载，不需要在定义模块的时候声明依赖，可以在模块执行时动态加载依赖，并且同时支持同步和异步加载模块。</p><p><strong>CMD 和 AMD 的主要区别是</strong>：</p><ul><li>AMD 需要异步加载模块，而 CMD 可以同步加载(<code>require</code>)，也可以异步加载(<code>require.sync</code>)</li><li>CMD 遵循依赖就近原则，AMD 遵循依赖前置原则。就是说在 AMD 中我们需要把模块需要的依赖都提前在依赖数组里声明，而在 CMD 里我们只需要在具体代码逻辑内，把需要使用的模块 require 进来就可以了</li></ul><p>用法和require.js差不多，通过定义一个全局函数 define 来实现，不过只能接受一个参数，可以是函数或者对象。如果是对象，模块导出的就是对象，如果是函数，那这个函数会被传入三个参数</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token function">define</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三个参数分别是：</p><ul><li><code>require</code>：可以引用其他模块，也可以用 require.async 异步调用其他模块</li><li><code>expxort</code>：是一个对象，定义模块的时候，需要通过参数 export 添加属性来导出 API</li><li>module：是一个对象，它有三个上属性 <ul><li><strong>uri</strong>： 模块完整的 URI 路径</li><li><strong>dependencies</strong>：模块的依赖</li><li><strong>exports</strong>：模块需要被导出的 API</li></ul></li></ul><p>看个栗子</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token function">define</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> <span class="token keyword">export</span><span class="token punctuation">,</span> module</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;math&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>add
    exports<span class="token punctuation">.</span><span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    module<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token string">&quot;increment&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是定义一个名为 increment 的模块，引用 math 模块里的 add 方法，经过处理后，再导出 increment 函数</p><h2 id="五-umd" tabindex="-1"><a class="header-anchor" href="#五-umd"><span>五，UMD</span></a></h2><p>UMD 没有专门的规范，而是集合了上面说的三个规范于一身，它可以让我们在合适的环境选择合适的模块规范。</p><p>比如在 Node.js 环境中用 CommonJS 模块规范管理，在浏览器端支持 AMD 的话就采用 AMD 模块规范，不支持就导出为全局函数。</p><p>看实现代码</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> factory</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">&quot;function&quot;</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        root<span class="token punctuation">.</span>returnExports <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span> root<span class="token punctuation">.</span>xxx <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">$</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断过程是这样的</p><ul><li><p>先判断支不支持 AMD (define 是否存在)，存在就使用 AMD 方式加载模块</p></li><li><p>再判断支不支持 Node.js 模块格式(export 是否存在)，存在就用 Node.js 模块格式</p></li><li><p>如果前两个都不存在，就将模块公开到全局，window 或 global</p></li></ul><h2 id="六-es6模块化" tabindex="-1"><a class="header-anchor" href="#六-es6模块化"><span>六，ES6模块化</span></a></h2><p>CommonJS 和 AMD 都是在运行时确定依赖关系，也就是运行时加载，CommonJS 加载的是拷贝，而 ES6 module 是在编译时就确定依赖关系，所有的加载都是引用，这样做的好处是可以执行静态分析和类型检查</p><p><strong>ES6 Module 和 CommonJS 的区别</strong>：</p><ul><li><code>ES6 Module</code> 的 import 是静态引入，CommonJS的 require 是动态引入</li><li><code>Tree-Shaking</code> 就是通过 ES6 Module 的 import 来进行静态分析，并且只支持 <code>ES6 Module</code> 模块的使用。</li><li>Tree-Shaking 就是移除掉 JS 上下文中没有引用的代码，比如 import 导入模块没有返回值的情况下，</li><li>webpack 在打包编译时 Tree-Shaking 会默认忽略掉此文件</li><li><code>ES6 Module</code> 是对模块的引用，输出的是值的引用，改变原来模块中的值引用的值也会改变；<code>CommonJS</code> 是对模块的拷贝，修改原来模块的值不会影响引用的值</li><li><code>ES6 Module</code> 里的 this 指向 undefined；<code>CommonJS</code> 里的 this 指向模块本身</li><li><code>ES6 Module</code> 是在编译时确定依赖关系，生成接口并对外输出；CommonJS 是在运行时加载模块</li><li><code>ES6 Module</code> 可以单独加载某个方法；<code>CommonJS</code> 是加载整个模块</li><li><code>ES6 Module</code> 不能被重新赋值，会报错；<code>CommonJS</code> 可以重新赋值(改变 this 指向)。</li></ul><p>静态分析是啥？什么是静态引入？什么是动态引入？</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token comment">// CommonJS / AMD 中动态引入的写法</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">all/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token punctuation">[</span><span class="token string">&quot;f&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;o&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;o&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">&quot;all/FOO&quot;</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> xx<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token comment">// ES6 Module 中静态引入的写法</span>
<span class="token keyword">import</span> foo <span class="token keyword">from</span> <span class="token string">&quot;xxxx/xxx&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo1<span class="token punctuation">,</span> foo2 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;xxxx/xxx&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结论：动态==可以拼接，静态==不准拼接，哈哈哈 ~~~ ，不是 === 哈，简单理解一下，原理就不拓展了.</p><p>不能拼接，ES6 Module 自然就可以很容易分析出使用了哪些模块，这就是静态分析，可以在不运行代码的情况下，对代码扫描检测分析</p><p>ES6 Module 的用法，看下代码</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token comment">// 方式一 可以输出多个</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">//方式二 只能输出一个</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    a<span class="token punctuation">,</span> 
    foo 
<span class="token punctuation">}</span>

<span class="token comment">// 注意</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> a <span class="token keyword">as</span> b <span class="token punctuation">}</span>  <span class="token comment">// as 的意思就是重命名</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有 export default 会导出默认输出，用 vue 的应该特别熟悉，就是不需要知道模块中输出的名字，在导入的时候再自定义名字</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token comment">// 导出</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token comment">// 引入</span>
<span class="token keyword">import</span> <span class="token string">&quot;./xxx&quot;</span>  这样只是加载，没有输出，也就不能调用
<span class="token comment">// 下面这样就可以使用</span>
<span class="token keyword">import</span> funName1 <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> funName1 <span class="token keyword">as</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> funName1<span class="token punctuation">,</span> funName2 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span>

<span class="token comment">// 加载整个模块  会忽略 default 输出</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> myModule <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span>
<span class="token comment">// 使用</span>
myModule<span class="token punctuation">.</span>a
myModule<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 模块的继承</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span> <span class="token comment">// 在当前模块里这样引入别的模块，就把 xxx 模块里导出的全部继承过来了</span>
                          
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-1-在浏览器中使用-es-模块化" tabindex="-1"><a class="header-anchor" href="#_6-1-在浏览器中使用-es-模块化"><span>6.1 在浏览器中使用 ES 模块化</span></a></h3><p>只需要在 script 标签中添加 <code>type=&quot;module&quot;</code> 属性就行，目前各大浏览器较新版本都已支持，如果是不支持的浏览器通过添加 <code>nomodule</code> 属性来执行其他方案.</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>
<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">&quot;module&quot;</span><span class="token operator">&gt;</span>
    <span class="token keyword">import</span> module1 <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script nomodule<span class="token operator">&gt;</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&quot;您的浏览器暂不支持 ES 模块，请先升级浏览器版本&quot;</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-在-node-js-中使用-es-模块化" tabindex="-1"><a class="header-anchor" href="#_6-2-在-node-js-中使用-es-模块化"><span>6.2 在 Node.js 中使用 ES 模块化</span></a></h3><p>Node.js 从 9.0 版本开始支持 ES 模块</p><p>可以在执行脚本需要启动时加上 <strong>--experimental-modules</strong>，需要文件后缀名必须为 .mjs</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>node <span class="token operator">--</span>experimental<span class="token operator">-</span>modules module1<span class="token punctuation">.</span>mjs

<span class="token comment">//使用</span>
<span class="token keyword">import</span> module1 <span class="token keyword">from</span> <span class="token string">&quot;./xxx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者也可以安装 <strong>babel-cli</strong> 和 <strong>babel-preset-env</strong>，配置 .babelrc 文件后，执行</p><div class="language-ABAP line-numbers-mode" data-ext="ABAP" data-title="ABAP"><pre class="language-ABAP"><code>
./node_modules/.bin/babel-node

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>
npx babel-node

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3><p><code>Webpack </code>本身维护了一套模块系统，兼容了几乎所有前端历史下的模块规范，上面说的模块化全都有。</p>`,78),p=[o];function i(l,c){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","useModule.html.vue"]]),k=JSON.parse('{"path":"/frontweb/es6/useModule.html","title":"前端模块化","lang":"zh-CN","frontmatter":{"title":"前端模块化","date":"2022-10-25T16:57:01.000Z","author":"qianxun","category":["vue知识点"],"tag":["必会"],"description":"一，什么是前端模块化 模块化就是将一个复杂的应用程序，按照规范拆分成几个相互独立的文件，这些文件里面完成共同的或者类似的逻辑，通过对外暴露一些数据或者调用方法，与外部整合。 这样每个文件彼此独立，我们开发者更容易开发和维护代码，特别是当开发的项目越来越大，代码复杂性也不断增加，这对于模块化的需求也会越来越大。 模块化主要特点是：可复用性、可组合性、独立...","head":[["meta",{"property":"og:url","content":"https://ChenSino.github.io/frontweb/es6/useModule.html"}],["meta",{"property":"og:site_name","content":"ChenSino"}],["meta",{"property":"og:title","content":"前端模块化"}],["meta",{"property":"og:description","content":"一，什么是前端模块化 模块化就是将一个复杂的应用程序，按照规范拆分成几个相互独立的文件，这些文件里面完成共同的或者类似的逻辑，通过对外暴露一些数据或者调用方法，与外部整合。 这样每个文件彼此独立，我们开发者更容易开发和维护代码，特别是当开发的项目越来越大，代码复杂性也不断增加，这对于模块化的需求也会越来越大。 模块化主要特点是：可复用性、可组合性、独立..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-11-03T06:07:24.000Z"}],["meta",{"property":"article:author","content":"qianxun"}],["meta",{"property":"article:tag","content":"必会"}],["meta",{"property":"article:published_time","content":"2022-10-25T16:57:01.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-03T06:07:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端模块化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-25T16:57:01.000Z\\",\\"dateModified\\":\\"2022-11-03T06:07:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"qianxun\\"}]}"]]},"headers":[{"level":2,"title":"一，什么是前端模块化","slug":"一-什么是前端模块化","link":"#一-什么是前端模块化","children":[]},{"level":2,"title":"二，CommonJS","slug":"二-commonjs","link":"#二-commonjs","children":[]},{"level":2,"title":"三，AMD(异步模块定义)","slug":"三-amd-异步模块定义","link":"#三-amd-异步模块定义","children":[]},{"level":2,"title":"四， CMD（公共模块定义）","slug":"四-cmd-公共模块定义","link":"#四-cmd-公共模块定义","children":[]},{"level":2,"title":"五，UMD","slug":"五-umd","link":"#五-umd","children":[]},{"level":2,"title":"六，ES6模块化","slug":"六-es6模块化","link":"#六-es6模块化","children":[{"level":3,"title":"6.1 在浏览器中使用 ES 模块化","slug":"_6-1-在浏览器中使用-es-模块化","link":"#_6-1-在浏览器中使用-es-模块化","children":[]},{"level":3,"title":"6.2 在 Node.js 中使用 ES 模块化","slug":"_6-2-在-node-js-中使用-es-模块化","link":"#_6-2-在-node-js-中使用-es-模块化","children":[]},{"level":3,"title":"其他","slug":"其他","link":"#其他","children":[]}]}],"git":{"createdTime":1666686291000,"updatedTime":1667455644000,"contributors":[{"name":"zhu","email":"819508408@qq.com","commits":2},{"name":"ChenSino","email":"chenxk@sonoscape.net","commits":1}]},"readingTime":{"minutes":9.33,"words":2800},"filePathRelative":"frontweb/es6/useModule.md","localizedDate":"2022年10月25日","excerpt":"<h2>一，什么是前端模块化</h2>\\n<p>模块化就是将一个复杂的应用程序，按照规范拆分成几个相互独立的文件，这些文件里面完成共同的或者类似的逻辑，通过对外暴露一些数据或者调用方法，与外部整合。</p>\\n<p>这样每个文件彼此独立，我们开发者更容易开发和维护代码，特别是当开发的项目越来越大，代码复杂性也不断增加，这对于模块化的需求也会越来越大。</p>\\n<p>模块化主要特点是：可复用性、可组合性、独立性、中心化。</p>\\n<p>所以使用模块化可以帮我们解决什么问题呢？</p>\\n<ul>\\n<li><strong>解决了命名冲突</strong>：因为每个模块是独立的，所以变量或函数名重名不会发生冲突</li>\\n<li><strong>提高可维护性</strong>：因为每个文件的职责单一，有利于代码维护</li>\\n<li><strong>性能优化</strong>：异步加载模块对页面性能会非常好</li>\\n<li><strong>模块的版本管理</strong>：通过别名等配置，配合构建工具，可以实现模块的版本管理</li>\\n<li><strong>跨环境共享模块</strong>：通过 <code>Sea.js</code> 的<code>NodeJS</code>版本，可以实现模块的跨服务器和浏览器共享</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};
