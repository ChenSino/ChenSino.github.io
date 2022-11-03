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

## 二，泛型接口

泛型接口和上述示例类似，为接口类型传参：

```typescript
interface I1<T, U> {
  name: T;
  age: U;
}

type I2 = I1<string, number>  // type I2 = {name:string,age:number}
```

三，泛型约束

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

四，泛型参数默认值

​	泛型参数默认值，和函数参数默认值一样，在没有传参时，给定默认值。

```typescript
interface I4<T = string> {
  name: T;
}

const S1: I4 = { name: '123' } // 默认 name: string类型
const S2: I4<number> = { name: 123 }

```

