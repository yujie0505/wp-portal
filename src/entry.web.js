import '!file-loader?name=index.html!extract-loader!html-loader!pug-html-loader!./index.pug'

import Vue from 'vue/dist/vue.runtime.min.js'
import Weex from 'weex-vue-render/dist/index.min.js'

Weex.init(Vue)

import App from './app.vue'

new Vue({ el: '#v-app', render: h => h(App) })
