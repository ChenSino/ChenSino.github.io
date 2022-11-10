---
title: typeScript中的泛型
date: 2022-08-05 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
  - vue中的 TypeScript
---

## 一，泛型

泛型就是通过给类型传参，得到一个更加通用的类型，就像给函数传参一样。 如下我们得到一个通用的泛型类型 T1，通过传参，可以得到 T2 类型 string[]、T3 类型 number[]； T 是变量，我们可以用任意其他变量名代替他。

```typescript

type T1<T> = T[]

type T2 = T1<string> // string[]

type T3 = T1<number> // number[]

```

## 二，定义泛型接口

我写了两个函数一个是数字类型的函数，另一个是[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)类型的函数,其实就是类型不同

实现的功能是一样的，这时候我们就可以使用泛型来优化

```typescript
function num (a:number,b:number) : Array<number> {
    return [a ,b];
}
num(1,2)

function str (a:string,b:string) : Array<string> {
    return [a ,b];
}
str('独孤','求败')
```

使用泛型来优化

语法为函数名后面跟一个<参数名> 参数名可以随便写 例如我这儿写了T

当我们使用这个函数的时候把参数的类型传进去就可以了 （也就是动态类型）。

```typescript
function Add<T>(a: T, b: T): Array<T>  {
    return [a,b]
}
Add<number>(1,2)
Add<string>('1','2')
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以了

```typescript
function add<T,U>(a:T,b:U):Array<T|U>{
	const params:Array<T|U> = [a,b]
    return params
}
Sub<Boolean,number>(false,1)
```

## 三 对象字面量泛型

```typescript
let foo :{<T>(arg:T):T}
foo = function<T>(arg:T):T{
    return arg
}
foo(123)
```




## 四，泛型接口

声明接口的时候 在名字后面加一个<参数>

使用的时候传递类型

泛型接口和上述示例类似，为接口类型传参：

```typescript
interface I1<T, U> {
  name: T;
  age: U;
}

type I2 = I1<string, number>  // type I2 = {name:string,age:number}
```

## ，泛型约束

Typescript 通过 extends 实现类型约束。让传入值满足特定条件；

```typescript

interface IWithLength {
  length:number
}

function echoWithLength<T extends IWithLength>(arg:T):T{
  console.log(arg.length)
  return arg
}

echoWithLength('str')

```

通过 extends 约束了 K 必须是 T 的 key。

```typescript

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let tsInfo = {
    name: "Typescript",
    supersetOf: "Javascript",
    difficulty: Difficulty.Intermediate
}

let difficulty: Difficulty =
    getProperty(tsInfo, 'difficulty'); // OK

let supersetOf: string =
    getProperty(tsInfo, 'superset_of'); // Error

```

## 五，泛型参数默认值

​	泛型参数默认值，和函数参数默认值一样，在没有传参时，给定默认值。

```typescript
interface I4<T = string> {
  name: T;
}

const S1: I4 = { name: '123' } // 默认 name: string类型
const S2: I4<number> = { name: 123 }

```

