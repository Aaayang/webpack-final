## 找到自定义 loader 的方式

```javascript
module: {
    rules: [
        {
            test: /\.js$/,
            use: path.resolve(__dirname, 'loaders', 'loader1.js')
        }
    ]
}
```

```javascript
resolveLoader: {
    alias: {
        loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
    }
},
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'loader1'
        }
    ]
}
```

```javascript
resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
},
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'loader1'
        }
    ]
}
```

## 配置多个 loader

```javascript
module: {
    rules: [
        {
            test: /\.js$/,
            use: ['loader3', 'loader2', 'loader1']
        }
    ]
}
```

```javascript
// loader 的顺序是从右往左，从下往上，所以打印结果是 3、2、1
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'loader1'
            }
        },
        {
            test: /\.js$/,
            use: {
                loader: 'loader2'
            }
        },
        {
            test: /\.js$/,
            use: {
                loader: 'loader3'
            }
        }
    ]
}
```

loader 的分类：pre、post(后)、normal(中)

loader 的顺序：pre > normal > inline > post

```javascript
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'loader1'
            },
            enforce: 'pre'
        },
        {
            test: /\.js$/,
            use: {
                loader: 'loader2'
            }
        },
        {
            test: /\.js$/,
            use: {
                loader: 'loader3'
            },
            enforce: 'post'
        }
    ]
}
```

```javascript
// inline-loader
let str = require('inline-loader!./a.js');
```

```javascript
// -! 不执行 pre 和 normal 标记的 loader
let str = require('-!inline-loader!./a.js');
```

```javascript
// ! 不执行 normal 标记的 loader
let str = require('!inline-loader!./a.js');
```

```javascript
// !! 只需要行内来处理
let str = require('!!inline-loader!./a.js');
```

## pitchLoader 和 normalLoader

每个 loader 都有 pitchLoader 和 normalLoader 两部分组成，pitch 和 normal 的执行顺序刚好相反

当 pitch 没有定义或者没有返回值时，会先依次执行 pitch 在获取资源执行 loader

如果定义的某个 pitch 有返回值，则会跳过读取资源和自己的 loader

pitch 阶段：pitch 的 loader3 -> pitch 的 loader2 -> pitch 的 loader1 -> 获取资源 -> normal 的 loader1  -> normal 的 loader2 -> normal 的 loader3

假如 loader2 中的 pitch 中有返回值：pitch 阶段的 loader3  -> pitch 阶段的 loader2 -> normal 阶段的 loader3

## loader 的特定

- loader 中必须返回的是 string or buffer，要返回 JS 脚本供 eval 执行
- 每个 loader 只做一件事，为了使 loader 在更多场景链式调用
- 每一个 loader 都是一个模块
- 每个 loader 都是无状态的，确保 loader 在不同模块转换之间不保存状态

## 实现 babel-loader





