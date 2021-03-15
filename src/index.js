import Vue from 'vue'
import App from './index.vue'
import Sawui from '../package/sawui'

Vue.use(Sawui)

new Vue({
    render: h => h(App)
}).$mount('#app')