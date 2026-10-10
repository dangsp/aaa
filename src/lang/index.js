import Vue from "vue";
import VueI18n from "vue-i18n";
import http from '@/api'

Vue.use(VueI18n);

//引入语言包
import LangCN from "./cn"
import LangPT from "./pt"

var lanData = {};
var lanData1 = localStorage.getItem('clientData');
if (lanData1) {
  lanData = JSON.parse(lanData1);
}
const i18n = new VueI18n({
  locale: "pt", // 语言标识
  messages: {
    pt: {
      ...LangPT,
      ...lanData
    },
    // cn: LangCN
  }
});
export {i18n}
