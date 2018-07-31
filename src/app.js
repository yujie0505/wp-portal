import '!file-loader?name=index.html!extract-loader!html-loader!pug-html-loader!./index.pug'

import Vue from 'vue/dist/vue.runtime.min.js'
import Weex from 'weex-vue-render/dist/index.min.js'

import App from './app.vue'

const app = new Vue({
  el: '#v-app',
  render: h => h(App),
})
