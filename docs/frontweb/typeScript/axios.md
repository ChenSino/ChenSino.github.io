---
title: typeScript中使用axios
date: 2022-11-8 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
  - vue中的 TypeScript
---

## 项目一

根据名称获取动漫列表

1,定义api.type.ts （定义后台接口返回的类型）

```typescript

interface ApiFormat<T> {
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: T
}

export type Search = ApiFormat<{
  /** 当前返回页数 */
  pageindex: number
  /** 总页数 */
  pagetotal: number
  /** 动漫列表 */
  results: {
    /** 分类列表 */
    category: string
    /** 封面 */
    cover: string
    /** 首发时间 */
    date: string
    /** 介绍 */
    description: string
    /** 动漫id */
    id: string
    /** 动漫状态（更新、完结...） */
    season: string
    /** 动漫名称 */
    title: string
  }[]
}>
    
```

2，重新定义，我们前端需要的数据类型。type.ts

（比如后台接口返回的是pagetotal总页数，我们前端需要的是total总条数） 所以我们可以重新定义我们前端需要的数据结构.

```typescript
/**
 * 分页
 */
type Page<T> = {
  /** 当前页数据 */
  data: T
  /** 总数 */
  total: number
}

/**
 * 动漫分页列表
 */
export interface ComicPageList {
  /** 封面 */
  cover: string
  /** id */
  id: string
  /** 杂项 */
  season: string
  /** 名称 */
  title: string
}

/**
 * 动漫搜索-返回值
 */
export type SearchComicReturn = Page<ComicPageList[]>


```

3, 定义请求接口 .index.ts（这里想要返回的数据类型为 SearchComicReturn，而不是ApiType.Search类型）

```typescript

/**
 * 请求 - get
 * @param url 请求地址
 * @returns
 */
export function getax<T>(url: string) {
  return instance.get<T>(url)
}
```

```typescript

import * as FnReturns from './type'
import * as ApiType from './api.type'

/**
 * 根据名称获取动漫列表
 * @param param
 * @returns
 */
export async function searchComic(param: {
  name: string
  page: number
}): Promise<FnReturns.SearchComicReturn> {
  try {
    const {
      data: {
        data: { results, pagetotal }
      }
    } = await getax<ApiType.Search>(
      `api/search/${param.name}?page=${param.page}`
    )
    if (results instanceof Array) {
      return {
        data: results,
        total: (pagetotal || 0) * 20
      }
    } else {
      throw newError()
    }
  } catch {
    badRequestNotify('api/search')
    return {
      data: [],
      total: 0
    }
  }
}

```