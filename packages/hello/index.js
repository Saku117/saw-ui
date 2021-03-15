import Hello from './src/index.vue'

// install 是默认的方法，供按需引入
// 当外界在use这个组件的时候,就会调用本身的install 方法，同时传一个Vue这个类的参数。

Hello.install = function (Vue) {
    Vue.component(Hello.name, Hello)
}

export default Hello