---
title: js能识别最大的正整数
date: 2023-07-21
isOriginal: true
category: 
tag: 
---

## 背景

今天用Mybatis-plus插入数据，自动产生了一个19位的主键id,后来才发现这是Mybatis-plus3.0后更新的功能，默认使用雪花算法最终会产生一个19位数字。

然后我在前端项目查询后端接口，后端接口返回的1682195717382606849，而到了前端一直打印的是另一个数字。

## 原因，参考gpt回答

问题1：数据库19位id,在浏览器控制台显示错误?

如果你的数据库使用的是19位的ID，而浏览器控制台显示错误，可能是因为浏览器默认将超过16位的整数值视为科学计数法表示。在科学计数法表示下，可能会丢失精度或显示不正确。

为了解决这个问题，可以对ID进行处理，确保在浏览器中正确显示。以下是一种常见的处理方式：

将ID转换为字符串：将19位的ID转换为字符串形式，在浏览器中显示时可以保留完整的位数。例如，使用Java的String.valueOf方法将ID转换为字符串：

```java
String idString = String.valueOf(id);
```

将转换后的ID传递给前端：将转换后的ID作为数据传递到前端，确保在浏览器中显示的是字符串形式的完整ID。

在前端展示时进行格式化：在前端页面中使用适当的方式对19位的ID进行格式化，以便正确显示。例如，可以使用JavaScript的toLocaleString方法将ID格式化为带有千位分隔符的字符串：

```javascript
var formattedId = id.toLocaleString();
```

这样，浏览器就能够正确地显示19位的ID。

请注意，在处理和展示大型数字时，确保使用适当的数据类型和格式，以避免数据丢失或显示错误。

问题2： js所支持的number最大值?

根据 ECMAScript 标准（JavaScript 的规范），浏览器所支持的最大数值可以通过 Number.MAX_SAFE_INTEGER 属性获取。这个属性的值是 9007199254740991，也就是 2^53 - 1。

超过这个值的数值将无法在 JavaScript 中精确表示，可能会导致精度丢失或不可预期的结果。因此，如果你需要处理超过 Number.MAX_SAFE_INTEGER 的大数字，建议使用专门的大数运算库或其他扩展来处理。

以下是一个示例，展示了 Number.MAX_SAFE_INTEGER 的值：

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 输出 9007199254740991
```

请注意，不同的浏览器可能会在处理超出 Number.MAX_SAFE_INTEGER 的大数字时表现不同，因此建议在开发过程中仔细考虑数字范围和精度的问题，并结合实际情况选择合适的处理方式。


## 解决方法

1. 不要用这么大的数字主键
2. 转化为字符串
3. 序列化处理【推荐】

```java
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizer() {
        return (builder) -> {
            builder.serializerByType(Long.class, ToStringSerializer.instance);
        };
    }
```

