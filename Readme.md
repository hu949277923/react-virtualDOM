
# VirtualDOM 及 Diff 算法

react VirturalDOM是通过babel转译的，转译后代码通过React.createElement包裹,那如何实现自定义createElement尼？

- 在代码顶部添加如下代码

```js
/**@jsx Tinyreact.createElement*/
```

- 通过给babel配置如下属性实现

```js
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "pragma": "TinyReact.createElement" // TinyReact  为自定义对象
      }
    ]
  ]
}

```