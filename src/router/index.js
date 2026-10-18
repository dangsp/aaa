import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import md5 from "js-md5";
import store from "@/store";
import { getToken } from "@/utils/auth";

Vue.use(Router);
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.withCredentials = true;
axios.defaults.method = "post";

const layout = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/layout/layout-index"
  );

const login = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/login/login");
const userInfo = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/userinfo");
const wallet = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/wallet");

const register = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/view/login/register"
  );

const home = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/home");

const Withdraw = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/view/home-related/withdraw"
  );

const myCenter = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/my-center");
const order = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/view/center-related/order"
  );
const cookie = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/cookie");
const about = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/about");
const clause = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/clause");
const help = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/help");
const licencia = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/licencia");
const privacy = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/privacy");
const tomatometer = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/view/tomatometer");

const winningRecord = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/view/winningRecord.vue"
  );

const layoutMap = [
  //首页
  {
    path: "/",
    name: "home",
    meta: {
      login_require: false,
    },
    component: home,
  },
  {
    path: "/home",
    name: "home",
    meta: {
      login_require: false,
    },
    component: home,
  },
  {
    path: "/order",
    name: "order",
    meta: {
      login_require: false,
    },
    component: order,
  },
  {
    path: "/withdraw",
    name: "withdraw",
    meta: {
      login_require: true,
    },
    component: Withdraw,
  },
  {
    path: "/userInfo",
    name: "userInfo",
    meta: {
      login_require: true,
    },
    component: userInfo,
  },
  {
    path: "/wallet",
    name: "wallet",
    meta: {
      login_require: true,
    },
    component: wallet,
  },
  {
    path: "/turntable",
    name: "turntable",
    meta: {
      login_require: false,
    },
    component: () => import("../components/view/turntable.vue"),
  },
  {
    path: "/myCenter",
    name: "myCenter",
    meta: {
      login_require: true,
    },
    component: myCenter,
  },
  {
    path: "/cookie",
    name: "cookie",
    meta: {
      login_require: false,
    },
    component: cookie,
  },
  {
    path: "/about",
    name: "about",
    meta: {
      login_require: false,
    },
    component: about,
  },
  {
    path: "/clause",
    name: "clause",
    meta: {
      login_require: false,
    },
    component: clause,
  },
  {
    path: "/help",
    name: "help",
    meta: {
      login_require: false,
    },
    component: help,
  },
  {
    path: "/licencia",
    name: "licencia",
    meta: {
      login_require: false,
    },
    component: licencia,
  },
  {
    path: "/privacy",
    name: "privacy",
    meta: {
      login_require: false,
    },
    component: privacy,
  },
  {
    path: "/tomatometer",
    name: "tomatometer",
    meta: {
      login_require: false,
    },
    component: tomatometer,
  },
  {
    path: "/winningRecord",
    name: "winningRecord",
    meta: {
      login_require: false,
    },
    component: winningRecord,
  },
];

const routers = [
  {
    path: "/login",
    name: "login",
    meta: {
      login_require: false,
    },
    component: login,
  },
  {
    path: "/register",
    name: "register",
    meta: {
      login_require: false,
    },
    component: register,
  },
  {
    path: "/",
    name: "layout",
    component: layout,
    meta: {
      login_require: false,
    },
    children: [...layoutMap],
  },
];

var router = new Router({
  routes: routers,
});
// const originalPush = router.prototype.push;
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
//导航守卫
router.beforeEach((to, from, next) => {
  let lang = store.state.user.lang;
  let token = getToken();
  store.commit("SET_LANG", "pt");

  if (
    /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
  ) {   
    next();

  } else {
   // window.location.href = "./index.html";
    next();
  }

  // if (lang == "vn") {
  //   store.commit("SET_LANG", "vn");
  // } else {
  //   store.commit("SET_LANG", "cn");
  // }
  if (!to.meta.login_require) {
    next();
  } else {
    if (!token) {
      next({ path: "/login" });
    } else {
      // if (!userId) {
      //   store.dispatch("GetUserInfo")
      // }
      next();
    }
    next();
  }
});
export { router };
