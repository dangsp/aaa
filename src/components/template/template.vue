<template>
  <div>
    <div class="header bgColorfff borderbccc">
      <button class="btn-back" @click="back">
        <img src="@/assets/img/icon/btn-back-black.png"/>
      </button>
      <span class="color333"></span>
    </div>
    <div id="baseContent">
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import {resizeContent} from "@/assets/js/resizeContent"; //适配内容盒子高度

export default {
  data() {
    return {
      ajaxStatus: false
    };
  },
  components: {},
  created() {
  },
  mounted() {
    resizeContent();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route() {
    //   this.getInfo(); //当对象改变，执行方法
    // }
  },
  methods: {
    getInfo() {
      var params = new URLSearchParams();
      params.append("transCode", "10006");

      if (this.ajaxStatus) {
        return;
      }
      this.ajaxStatus = true;
      //显示加载层
      this.$Loading();
      this.$axios({data: params}).then(ret => {
        this.ajaxStatus = false;
        this.$Loading("false");

        ret = ret.data;
        if (
          ret.respCode == "99999" ||
          ret.respCode == "99990" ||
          ret.respCode == "1"
        ) {
          this.$toast(ret.respMsg,);
        } else if (ret.respCode == "00000") {
        } else {
          this.$toast(ret.respMsg,);
        }
      });
    },
    submit() {
      if (this.vCode == "" || this.vCode == undefined || this.vCode == null) {
        this.$toast($("#vCode").attr("placeholder"));
        $("#vCode").focus();
        return false;
      }

      var params = new URLSearchParams();
      params.append("transCode", "");
      // params.append("username", this.oMobile);
      // params.append("password", this.$md5(this.password));

      if (this.ajaxStatus) {
        console.log("正在请求中。。。。。");
        return;
      }
      this.ajaxStatus = true;
      //显示加载层
      this.$Loading();
      this.$axios({data: params}).then(ret => {
        this.ajaxStatus = false;
        this.$Loading("false");

        ret = ret.data;
        if (
          ret.respCode == "99999" ||
          ret.respCode == "99990" ||
          ret.respCode == "1"
        ) {
          this.$toast(ret.respMsg, 1, "/", this);
        } else if (ret.respCode == "00000") {
          this.$toast(this.$t('submittedSuccessfully'),);
        } else {
          this.$toast(ret.respMsg,);
        }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
