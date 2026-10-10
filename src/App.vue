<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.init();
    document.title = this.$t("webName");
  },
  methods: {
    init() {
      //       document.addEventListener("plusready", () => {
      //         var webview = plus.webview.currentWebview();
      //         plus.key.addEventListener("backbutton", () => {
      //           webview.canBack(e => {
      //             if (e.canBack) {
      //               webview.back();
      //             } else {
      // // webview.close(); //hide,quit
      // // plus.runtime.quit();
      // //首页返回键处理
      // //处理逻辑：1秒内，连续两次按返回键，则退出应用；
      //               var first = null;
      //               plus.key.addEventListener(
      //                 "backbutton",
      //                 () => {
      // //首次按键，提示‘再按一次退出应用’
      //                   if (!first) {
      //                     first = new Date().getTime();
      //                      this.$toast("再按一次退出应用");
      // // window.plus.nativeUI.toast('再按一次退出应用')
      //                     setTimeout(function () {
      //                       first = null;
      //                     }, 1000);
      //                   } else {
      //                     if (
      //                       new Date().getTime() - first <script
      //                       1500
      //                     ) {
      //                       plus.runtime.quit();
      //                     }
      //                   }
      //                 },
      //                 false
      //               );
      //             }
      //           });
      //         });
      //       });
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #000;
  background-color: #fff;
}

div {
  box-sizing: border-box;
}
</style>
