---
title: typeScript项目实战
date: 2022-10-20 16:57:01
author: qianxun
category: 
  - vue知识点
tag: 
  - 必会
  - vue中的 TypeScript
---

## 一，利用typeScript实现新增，删除一行数据

这里基本涵盖了typeScript在项目中的实战用法

1,html部分

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="./style.css" />
	<title>蛋老喵</title>
</head>
<body>
	<button class="remind">随机1只喵</button>
	<table>
		<thead>
			<tr>
				<th>图片id</th>
				<th>图片预览</th>
				<th>图片高度</th>
				<th>图片宽度</th>
				<th>图片地址</th>
				<th>删除图片</th>
			</tr>
		</thead>
		<tbody id="table-body">
			<tr>
				<td>idxxx</td>
				<td><img src="./example.jpeg" /></td>
				<td>高度xx</td>
				<td>宽度xx</td>
				<td>地址xx</td>
				<td><a href="#">X</a></td>
			</tr>
		</tbody>
	</table>
	<script src="./script.js"></script>
</body>
</html>

```

2，typeScript

```typescript

const url: string = 'https://api.thecatapi.com/v1/images/search';
const button: HTMLButtonElement | null = document.querySelector('button');
const tableBody: HTMLTableElement | null = document.querySelector('#table-body');

interface CatType {
    id: string;
    url: string;
    height: number;
    width: number;
    test?: boolean;
}

class Cat implements CatType {
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id: string, url: string, height: number, width: number) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}

class WebDisplay {
    public static addData(data: CatType): void {
        const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
        const tableRow: HTMLTableRowElement = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}" /></td>
            <td>${cat.height}</td>
            <td>${cat.width}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `;
        tableBody?.appendChild(tableRow);
    }
    public static deleteData(deleteButton: HTMLAnchorElement): void {
        const td = deleteButton.parentElement as HTMLTableCellElement;
        const tr = td.parentElement as HTMLTableRowElement;
        tr.remove();
    }
}

async function getJSON<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    const json: Promise<T> = await response.json();
    return json;
}

async function getData(): Promise<void> {
    try {
        const json: CatType[] = await getJSON<CatType[]>(url);
        const data: CatType = json[0];
        WebDisplay.addData(data);
    }
    catch (error: Error | unknown) {
        let message: string;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        console.log(error);
    }
}

button?.addEventListener<'click'>('click', getData);

tableBody?.addEventListener<'click'>('click', (ev: MouseEvent) => {
    WebDisplay.deleteData(<HTMLAnchorElement>ev.target);
});
```

项目来源：[b站技术蛋老师](https://www.bilibili.com/video/BV12P411E79E/?spm_id_from=333.337.search-card.all.click)
