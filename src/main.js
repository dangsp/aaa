// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "babel-polyfill";
import Es6Promise from "es6-promise";
import * as filters from './filters/index'
import axios from 'axios'

require("es6-promise").polyfill();
Es6Promise.polyfill();
import App from "./App";
import {router} from "./router";
import VueClipboard from 'vue-clipboard2';

import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import moment from 'moment'

Vue.prototype.$moment = moment;
import "./assets/css/base.css"; //加载全局公共样式
import "./assets/css/swiper.min.css";
import "./assets/js/rem"; //适配
import $ from "jquery";
import "@/assets/js/resizeContent"; //适配内容盒子高度
import FastClick from "fastclick";
import {i18n} from "@/lang/index";
import "./common/public.js"; //公共方法
import QRCode from "qrcodejs2";
import http from '@/api'

// 全局导入过滤器
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton);
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
import headerTop from '@/components/subcomponents/header';
import copyRight from '@/components/subcomponents/copyright';
import {Dialog} from 'vant';

// 全局注册
Vue.component('header-top', headerTop)
Vue.component('copy-right', copyRight)
Vue.prototype.$axios = axios;
FastClick.attach(document.body);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import VueLuckyCanvas from '@lucky-canvas/vue'
Vue.use(VueLuckyCanvas)
// 挂载原型上
Vue.use(Vant);
Vue.use(VueClipboard);
Vue.use(Dialog);

Vue.prototype.$http = http
//生成二维码
Vue.prototype.$QRCode = (classId, value,) => {
  new QRCode(document.querySelector(classId), {
    text: value,
    width: 150,
    height: 150,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  // let qrcode = new QRCode(obj, {
  //   width: width, // 设置宽度，单位像素
  //   height: height, // 设置高度，单位像素
  //   text: url // 设置二维码内容或跳转地址
  // });
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store, //使用store
  i18n,
  components: {App},
  template: "<App/>"
});
