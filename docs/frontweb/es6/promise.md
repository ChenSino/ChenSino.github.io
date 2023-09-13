---
title: Promise介绍
date: 2023-09-13
isOriginal: true
category: 
tag: 
---

### 1. Promise介绍

romise 是 JavaScript 中用于异步编程的一种解决方案。Promise 可以将异步操作进行封装，并提供了更加灵活和强大的处理方式。

Promise 有三种状态：

- pending(等待)：初始状态，既不是成功也不是失败状态。
- fulfilled(成功)：意味着操作成功完成，Promise 实例的最终值可通过 then 方法获取到。
- rejected(失败)：意味着操作失败，Promise 实例的最终值可通过 catch 方法获取到。

Promise 实例可以使用 then、catch 和 finally 方法实现异步操作的链式调用：

```js
promise.then(onResolved, onRejected)
       .then(onFulfilled, onRejected)
       .catch(onRejected)
       .finally(onFinally);
```

其中：

- then() 方法接受两个函数参数，第一个参数是成功时（fulfilled）执行的函数（可以为空），第二个参数是失败时（rejected）执行的函数（可以为空）。
- catch() 方法仅接收失败时（rejected）执行的函数，通常在 Promise 链式调用中作为最后一个方法使用。
- finally() 方法不论 Promise 是否成功都会执行，通常用于清理工作。

Promise 也提供了一些静态方法，如：

- Promise.all(iterable)：当所有的 Promise 都成功时返回一个包含所有结果的数组，一旦有任意一个 Promise 失败，则直接 reject 返回。
- Promise.race(iterable)：只要迭代器中的一个 promise 完成，就返回那个 promise 的结果。
- Promise.resolve(value)：返回一个以给定值解析后的 Promise 对象。
- Promise.reject(reason)：返回一个带有拒绝原因的 Promise 对象。

下面是一个通过 Promise 实现异步操作的示例代码：

```js
function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: '张三', age: 20 };
      if (data) {
        resolve(data); // 数据获取成功，调用 resolve 并传递数据
      } else {
        reject('获取数据失败！'); // 数据获取失败，调用 reject 并传递错误信息
      }
    }, 2000);
  });
}

loadData().then((data) => {
   console.log('获取到的数据为:', data);
}).catch((error) => {
   console.error('发生了错误:', error);
});
```

在这个例子中，loadData() 函数返回了一个 Promise 对象，并使用 resolve(data) 和 reject(error) 方法来改变 Promise 对象的状态。在 then() 方法中，可以接收到 resolve 传递的数据或者在 catch() 方法中接收到 reject 传递的错误信息。

这是 Promise 的简单介绍和使用示例。Promise 在异步编程中起到至关重要的作用，它使得异步代码更加清晰、可读性更高，并且能够更加灵活地处理异步操作。

### 2. 使用

平时发送请求使用`getxxx().then(res=>{})`这里的then其实是传递了一个参数，就是解析成功的回掉函数onResolved，第二个onRejected回掉函数省略了。

在一个完成的写法里面如下：

```js
promise.then(onResolved, onRejected)
       .then(onFulfilled, onRejected)
       .catch(onRejected)
       .finally(onFinally);
```

当遇到错误时，如果有onRejected参数，则onRejected回掉函数会处理异常，catch可能就不会执行了，当然如果你在onRejected有错误，catch依然会捕获。

### 3. promise中使用then和await的区别

在 Promise 中使用 then 和 await 都是用于处理异步操作并等待其结果，但它们之间有一些区别。

1. 使用 then：

- then 是 Promise 的原生方法，用于注册回调函数来处理异步操作的结果。
- then 方法返回一个新的 Promise 对象，可以继续进行链式调用。
- then 方法接收两个参数：onResolved 和 onRejected，分别用于处理 Promise 成功和失败的情况。
- then 方法中的回调函数会在 Promise 状态发生改变时被调用，可以处理异步操作的成功或失败结果。
- then 方法无法直接使用 await 来等待异步操作的结果，需要配合 async/await 使用。

2. 使用 await：

- await 是 ES2017 引入的关键字，只能在异步函数（async function）中使用。
- 在异步函数中，可以使用 await 来暂停代码的执行，等待一个 Promise 对象的解析结果。
- 使用 await 可以使代码看起来更像是同步的线性代码，而不需要显式地使用 then 方法来处理异步操作的结果。
- 使用 await 时，其后面必须是一个 Promise 对象，并且 await 表达式会返回该 Promise 的解析结果。
- 在使用 await 等待 Promise 的过程中，当前函数的执行会被暂停，直到 Promise 解析完成并返回结果。

以下是使用 then 和 await 的示例代码进行对比：

使用 then：

```js
promise.then((result) => {
  // 处理异步操作成功的结果
  console.log(result);
}).catch((error) => {
  // 处理异步操作失败的结果
  console.error(error);
});
```

使用 await：

```js
async function fetchData() {
  try {
    const result = await promise;
    // 处理异步操作成功的结果
    console.log(result);
  } catch (error) {
    // 处理异步操作失败的结果
    console.error(error);
  }
}

fetchData();

```

在上述示例中，使用 `then` 方法时，需要通过回调函数来处理异步操作的结果。而使用 `await` 时，可以将异步操作的结果直接赋给一个变量，并在 `try/catch` 语句中处理成功或失败的情况。

需要注意的是，await 只能在异步函数中使用，所以在使用 `await` 时，需要将它放在一个异步函数内部（如上述示例中的 `async function fetchData()）`。

#### 4. 如果我有多个异步请求，要求每个异步请求顺序执行，该如何做

有2个方法

1. 使用await

    在每个强求前添加await同步执行
2. 使用then,在then的成功回掉函数中，添加下一个请求