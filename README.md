# SawUI(搭建组件库)





[TOC]

## 1.项目初始化

### 1.1 npm初始化项目

```
mkdir saw-ui
cd saw-ui
npm init
```

### 1.2 安装依赖

一个基本的VUE项目大概需要这些依赖： vue、webpack、webpack-cli、webpack-dev-server、@babel/core、babel-loader、css-loader、html-webpack-plugin、vue-loader 、vue-template-compiler

```
npm i --save  vue webpack webpack-cli webpack-dev-server @babel/core babel-loader css-loader html-webpack-plugin vue-loader vue-template-compiler
```

### 1.3Hello World

依赖装好了，我们来定义一下项目html模版，入口文件和VUE主页文件，根目录新建index.html,新建src目录，src下新建一个index.js和index.vue。

#### 1.index.html 模板文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>saw-ui</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

#### 2.index.vue

```vue
<template>
    <div>Hello Saw-ui</div>
</template>
<script>
    export default{
        name:'App'
    }
</script>

```

#### 3.index.js 入口文件

```js
import Vue from 'vue'
import App from './index.vue'

new Vue({
    render: h => h(App)
}).$mount('#app')
```

#### 4.配置webpack

在根目录下新建build文件夹,里面新增webpack配置文件

webpack.config.base.js

```js
'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
    // 入口文件
    entry: path.resolve(__dirname, '../src/index.js'),
    // 输出文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
    ]
}
```

### 1.4问题

#### 1.解决报错Cannot find module 'webpack-cli/bin/config-yargs'

- **问题原因** webpack-cli和webpack-dev-server版本不兼容

- **解决办法**：

  - webpack-cli降低一个版本(4->3)

  - ```
    npm i webpack-cli@3 -D
    ```



## 2.编写第一个组件

### 2.1编写第一个组件

先在根目录下新建一个`packages`文件,然后在下面新建一个hello文件夹，开是编写组件。组件作用很简单，就是一个简单的打招呼的组件，传入名字即可，会在页面显示Hello，xxx。

下面看看我们的目录结构：

![image-20210315220136751](F:\Front-end\截图\image-20210315220136751.png)

**packages/hello/src/index.vue**

```
<template>
  <div>
    <h2>Hello, {{name}} ！</h2>
  </div>
</template>

<script>
export default {
  name:'Hello',
  props:{
    name:{
      type:String,
      default:'Ninecat UI'
    }
  }
}
</script>
```

**packages/hello/index.js**

```
import Hello from './src/index.vue'

// install 是默认的方法,供按需引入。
// 当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。

Hello.install = function(Vue){
  Vue.component(Hello.name, Hello)
}

export default Hello
```

组件文件夹之所以这么写是为了让组件有个统一的出口，每个组件文件夹下的src目录是可以扩展组件其他功能。

**src/index.vue**

```
<template>
  <div>
    <Hello 
      :name="name"
    />
  </div>
</template>

<script>
import Hello from '../packages/hello'
export default {
  name:'App',
  components:{
    Hello
  },
  data:function(){
    return {
      name:'Terence'
    }
  }
}
</script>
复制代码
```

OK，到这里我们算封装了一个最简单的Hello组件，但是现在我们还没有实现将组件打包后用npm安装这个组件库，然后引用里面的Hello组件,所以下面需要进行导出配置和打包配置。



### 2.2配置导出和打包

组件编写好了需要统一导出，现在是一个组件，后面会有很多组件，所以我们需要统一导出组件了。

**packages/index.js**

```javascript
import Hello from './hello'

const components = {
  Hello
}

const install = function (Vue) {
  Object.values(components).forEach(component => {
    Vue.component(component.name, component);
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello
}
```

配置打包 **build/webpack.config.build.js**

```javascript
'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
  mode: 'production',
  entry: {
    'ninecatui': './packages/index.js' // 入口文件
  },
  output: {
    path: path.resolve(__dirname, '../package'), // 出口目录
    publicPath: '/package/',
    library: 'ninecatui', // 包名
    libraryTarget: 'umd',
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
```

到这里基本的打包就可以了，可以本地测试一下。

在`package.json`增加一个打包脚本,

```
"build": "webpack --config build/webpack.config.build.js"
```

我们来build一下项目：`npm run build`

会打出一个package文件夹，我们来引用一下这个组件库。

修改一下**src/index.js**

```java
import Vue from 'vue'
import App from './index.vue'
import Sawui from '../package/sawui'

Vue.use(Sawui)

new Vue({
    render: h => h(App)
}).$mount('#app')
```

修改一下**src/index.vue**

```vue
<template>
  <div>
    <div>Hello Saw-ui</div>
    <Hello :name="name" />
  </div>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {
        name: "Saw",
      };
    },
  };
</script>

```

修改一下**src/index.vue**

```vue
<template>
  <div>
    <div>Hello Saw-ui</div>
    <Hello :name="name" />
  </div>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {
        name: "Saw",
      };
    },
  };
</script>

```

![image-20210315221837213](F:\Front-end\截图\image-20210315221837213.png)

