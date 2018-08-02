import Vue from 'vue/dist/vue.runtime.min.js'
import Weex from 'weex-vue-render/dist/index.min.js'

weex.init(Vue)

const App = require('../src/index.vue');
new Vue(Vue.util.extend({el: '#root'}, App));
