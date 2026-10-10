<template>
  <div>
    <header-top :showBack="true" :title="$t('sign-in')"></header-top>
    <div id="baseContent" style="  background-color: #fff">
      <div class="login-bg">
        <div class="title">{{ $t('sign-in') }}
          <!-- <div class="line"></div> -->
        </div>
      </div>
      <div class="loginContain">
        <div class="item marginb40 clear">
          <input
          class="login_input"

              type="text"
              id="username"
              v-model.trim="username"
              autocomplete="off"
              :placeholder="$t('please-email-address')"
          >
        </div>
        <div class="item marginb40 lgpwd clear">
          <input
          class="login_input"

              id="password"
              v-model.trim="password"
              autocomplete="off"
              value
              :placeholder="$t('please-enter-the-user-password')"
              :type="pwdType"
          >
          <div class="toggle" @click="toggle">
            <img v-if="!ishowPwd" src="@/assets/img/login/hidden.png">
            <img v-if="ishowPwd" src="@/assets/img/login/show-gray.png">
          </div>
        </div>
        <div class="item marginb40 lgpwd clear">
          <input
          class="login_input"

              id="passwordAgain"
              v-model.trim="passwordAgain"
              autocomplete="off"
              value
              :placeholder="$t('comfirmPas')"
              :type="pwdType1"
          >
          <div class="toggle" @click="toggle1">
            <img v-if="!ishowPwd1" src="@/assets/img/login/hidden.png">
            <img v-if="ishowPwd1" src="@/assets/img/login/show-gray.png">
          </div>
        </div>
        <div class="item marginb40 lgpwd clear">
          <input
              id="code"
              class="login_input"
              v-model.trim="code"
              autocomplete="off"
              value
              :placeholder="$t('iniCode')"
          >

        </div>
        <div class="item marginb40 lgpwd clear" style="border: none;">
        <div style="display: inline-block"><van-checkbox v-model="select" ></van-checkbox></div>
     <div class="privacy">
       <span>
         {{ $t('privacy1') }}
       </span>
       <span @click='handlePrivacy("register")' class='cli'>
         {{ $t('privacy2') }}.
       </span>
     </div>
        </div>

        <van-button type="info" :loading="btnLoading" @click="login" block color="#fc3d44">
          {{ $t('sign-in') }}
        </van-button>
        <div class="login-bottom">
          <div @click="goToRegster">{{ $t("disembark") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,} from 'vuex'
import store from '@/store'

export default {
  data() {
    return {
      uid: "",
      sid: "",
      showuid: "",
      showsid: "",
      showimtag: false,
      username: "",
      password: "",
      passwordAgain: "",
      select: false,
      code: "",
      ishowPwd: false, //是否显示登录密码
      ishowPwd1: false, //是否显示登录密码
      ishowcode: false, //是否显示验证码按钮
      btnLoading: false,
      pwdType: "password",
      pwdType1: "password",
    };
  },
  computed: {
    ...mapState({
      userInfo: "user"
    })
  },
  created() {

  },
  watch: {},
  mounted() {
    _ResizeContent.init();
    this.getConfig()
    //FIXME 方便调试后期删除
    // if (process.env.NODE_ENV == "development") {
    //   this.username = "644869695@qq.com";
    //   this.password = "123456";
    // }
  },
  methods: {
    handlePrivacy(val) {
      this.$router.push({ path: '/licencia', query: { 'key': val } });
    },
    login() {
      if (!this.select) {
        this.$toast(`${this.$t('privacy1')}${this.$t('privacy2')}`);
        return;
      }
      if (this.password!=this.passwordAgain) {
        this.$toast(this.$t('match'));
        return;
      }
      if (!this.username) {
        this.$toast(this.$t('please-email-address'));
        return;
      }
      if (!this.password) {
        this.$toast(this.$t('please-enter-the-user-password'));
        return;
      }
      if (!this.passwordAgain) {
        this.$toast(this.$t('comfirmPas'));
        return;
      }
      if (!this.code) {
        this.$toast(this.$t('iniCode'));
        return;
      }
      var that = this;
      var parm = {
        account: this.username,
        password: this.password,
        code: this.code
      }
      this.btnLoading = true
      this.$http.home.register(parm).then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        } else {
          this.$toast(res.msg);
          setTimeout(() => {
            this.$router.push("login")
          }, 2000)
        }
      }).finally(() => {
        this.btnLoading = false
      });
    },
    clean() {
      this.username = "";
      $("#username").focus();
    },
    iscodeBtn() {
      let email = this.formData.email.trim()
      if (!email) {
        this.$toast(this.$t('pleaseEnterEmailAddress'))
        return
      }
      let isEmail = this.$isEmail(this.formData.email)
      if (!isEmail) {
        this.$toast(this.$t('pleaseEnterTheCorrectEmailAddress'))
        return
      }
      this.isSend = true;
      this.ishowcode = true;
    },
    getConfig() {
      this.$http.home.configWeb({}).then((res) => {
        if (res.code == 200) {
            var lanData1 = localStorage.getItem('clientData');
            if (!lanData1) {
                localStorage.setItem('clientData', JSON.stringify(res.data));
                location.reload()
            }
            localStorage.setItem('clientData', JSON.stringify(res.data));
        }
      });
    },
    toggle() {
      if (this.ishowPwd == false) {
        this.ishowPwd = true;
        this.pwdType = "text";
      } else {
        this.ishowPwd = false;
        this.pwdType = "password";
      }
    },   toggle1() {
      if (this.ishowPwd1 == false) {
        this.ishowPwd1 = true;
        this.pwdType1 = "text";
      } else {
        this.ishowPwd1 = false;
        this.pwdType1 = "password";
      }
    },

    goToRegster() {
      this.$router.push('/login');
    },
  }
};
</script>


<style lang="scss" scoped>

/deep/ .van-button{
      background-color: rgba(0, 0, 0,.2) !important;
      border-style: none;
      padding: 0;
    }
    .van-button__content{
      width: 100%;
      background-color: rgba(255, 255, 255,.1) !important;
    }
    .van-button__text{
      color: #000;
    }
    .login_input{
  color: #000 !important;
}
.login_input::placeholder {
  color: #000 !important; /* 使用!important声明提高优先级 */
}

.login-bg {
  height: 4rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .title {
    font-size: 0.48rem;
    font-weight: 500;
    color: #000;
    padding-left: 0.48rem;
    padding-bottom: 0.76rem;
    background-color: rgba(255, 255, 255, 0.5);

  }

  .line {
    width: 100%;
    height: 8px;
    background: $primary;
    border-radius: 14px 14px 14px 14px;
    opacity: 1;
  }
}



.login-img {
  width: 2rem;
  // height: 1rem;
  margin: 1rem auto;
  display: block;
}

button.code {
  margin-right: 0.2rem;
  color: $primary;
  border: none;
  margin-left: 10px;
}

.lang {
  color: $c5e;
  width: 1.8rem;
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;

  .title {
    text-align: right;
    font-size: 0.28rem;
    color: $blue;
  }

  ul {
    color: $c5e;
    width: 100%;
    height: auto;
    padding: 0.2rem 0;
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0.5rem;
    font-size: 0.26rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    li {
      color: $c5e;
      height: 0.5rem;
    }
  }
}

.wel {
  margin-top: 1rem;
  margin-left: 0.4rem;
  font-size: 0.36rem;
  margin-bottom: .4rem;

}

.logo {
  @include margin(1.6rem, auto, 1.2rem);

  img {
    margin: 0 auto;
    display: block;
    width: 3.8rem;
    height: 3.35rem;
  }
}
.privacy {
  display: inline-block;
  text-align: left;
  padding-left: 10px;
  line-height: 1.2;
  cursor: pointer;
  .cli{
    color: #409eff;
  }
}
/*表单*/
.loginContain {
  border-top: 1px solid rgb(255, 255, 255);

  padding: 0 0.76rem;
  background-color: rgba(255, 255, 255, 0.5);

  div.item {
    position: relative;
    width: 100%;
    min-height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;

    .label {
      width: 1rem;
    }

    .clean {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -0.15rem;

      img {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
      }
    }

    .toggle {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -0.15rem;
      color: #fff;
      img {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
      }
    }

    label {
      display: block;
      float: left;
      height: 0.8rem;
      border-radius: 20px 0 0 20px;
      margin-left: 0.1rem;

      img {
        display: block;
        width: 0.25rem;
        height: 0.3rem;
        margin-top: 0.25rem;
      }
    }

    input {
      /*修改提示文字的颜色*/
      float: left;
      display: block;
      flex: 1;
      height: 0.8rem;
      color: #fff;
      font-size: 0.3rem;
      background: transparent;
      border: none;
      font-size: 0.28rem;
    }
  
  }

  div.veriCode {
    input {
      width: 50%;
    }

    .changeImg {
      height: 0.6rem;
      margin-top: 0.1rem;

      img {
        height: 0.6rem;
      }
    }
  }

  div.vcode {
    input {
      width: 50%;
    }
  }

  a {
    color: #3868C7;
  }

  .login-bottom {
    background-color: #666666;
    display: flex;
    justify-content: center;
    margin-top: 0.24rem;
    height: 42px;
    color: #666666;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
