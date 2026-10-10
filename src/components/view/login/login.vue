<template>
  <div>
    <header-top :showBack="true" :title="$t('disembark')"></header-top>
    <div id="baseContent" style=" background-color: #fff;">
      <div class="login-bg">
        <div class="title">{{ $t('disembark') }}
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
              maxlength="20"
              :placeholder="$t('please-enter-the-user-password')"
              :type="pwdType"
          >
        </div>
        <van-button type="info" :loading="btnLoading" @click="login" block color="#fc3d44">
          {{ $t('disembark') }}
        </van-button>
<!--        <div class='sign_or'>-->
<!--          <div class='or'>OR</div>-->
<!--        </div>-->
<!--        <div class='login-btn'>-->
<!--          <g-signin-button-->
<!--            :params='googleSignInParams'-->
<!--            @success='onSignInSuccess'-->
<!--            @error='onSignInError'>-->
<!--            <div class='dis'>-->
<!--              <div class='dis-left'>-->
<!--                <img src='@/assets/img/google.jpeg' />-->
<!--              </div>-->
<!--              {{ $t('google') }}-->
<!--            </div>-->
<!--          </g-signin-button>-->
<!--        </div>-->
        <div class="login-bottom">
          <div @click="goToRegster">  {{$t("register")}}</div>

        </div>
      </div>
    </div>
    <van-dialog :before-close="close" v-model="visible" title="  " @confirm="submitDialog" :show-cancel-button="false" :showConfirmButton="true" :confirmButtonText="$t('ok')">
      <van-field v-model="uploadForm.code" :placeholder="$t('iniCode')" />
    </van-dialog>
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
      ishowPwd: false, //是否显示登录密码
      ishowcode: false, //是否显示验证码按钮
      btnLoading: false,
      pwdType: "password",
      googleSignInParams: {
        client_id: '638737486515-ctlrd8sfo5pohuom5hoqqdtl28bv3am3.apps.googleusercontent.com',
        scope: 'email',
        plugin_name: 'film',
      },
      visible: false,
      uploadForm: {
        'code': '',
      },
      upWechatRules: {
        code: [
          { required: true,  trigger: 'blur' }
        ],
      }
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
    onSignInSuccess(googleUser) {
      console.log(googleUser);
      const profile = googleUser.getBasicProfile()
      var id_token = googleUser.getAuthResponse().id_token;
      this.toLogin(id_token)
    },
    toLogin(google_token){
      this.$http.home.googleLogin({ google_token }).then(res =>{
        if (res.code != 200) {
          this.$toast(res.msg)
          return
        }
        let {token,is_code} = res.data
        store.commit("SET_TOKEN", token);
        store.commit("SET_USERINFO", res.data);
        if(is_code){
          this.visible=true;
        }else {
          this.$toast(this.$t('success'))
          setTimeout(() => {
            let redirect = that.$route.query.redirect
            if (redirect) {
              window.location.href = window.decodeURIComponent(redirect)
            } else {
              that.$router.push('/')
            }
          }, 2000)
        }

      }).catch(err => {
        console.log(err);
      });
    },
    close(e,done){
      done(false)
    },
    onSignInError(error) {
      this.$toast(this.$t("error"));
      console.log('OH NOES', error);
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
    submitDialog() {
      let { code } = this.uploadForm;
      if (!code) {
        this.$toast(this.$t('iniCode'));
        return;
      }

      this.$http.home.googleCode({  code }).then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg)
          return
        }
        this.visible=false;
          this.$toast(this.$t('success'));
        this.$toast(this.$t('success'))
        setTimeout(() => {
          let redirect = that.$route.query.redirect
          if (redirect) {
            window.location.href = window.decodeURIComponent(redirect)
          } else {
            that.$router.push('/')
          }
        }, 2000)
      });
    },
    login() {
      if (!this.username) {
        this.$toast(this.$t('please-email-address'));
        return;
      }  if (!this.password) {
        this.$toast(this.$t('please-enter-the-user-password'));
        return;
      }
      var that = this;
      var parm = {
        account: this.username,
        password: this.password
      }
      this.btnLoading = true
      this.$http.home.login(parm).then(res => {
        if (res.code != 200) {
          this.$toast(res.msg)
          return
        }
        let {token} = res.data
        store.commit("SET_TOKEN", token);
        localStorage.setItem('token',token)
        store.commit("SET_USERINFO", res.data);
        this.$toast(this.$t('success'))
        setTimeout(() => {
          let redirect = that.$route.query.redirect
          if (redirect) {
            window.location.href = window.decodeURIComponent(redirect)
          } else {
            that.$router.push('/')
          }
        }, 2000)
      }).finally(() => {
        this.btnLoading = false
      })
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
    toggle() {
      if (this.ishowPwd == false) {
        this.ishowPwd = true;
        this.pwdType = "text";
      } else {
        this.ishowPwd = false;
        this.pwdType = "password";
      }
    },
    goToForgetPwd() {
      this.$router.push('/forgetPwd');
    },

    goToRegster() {
      this.$router.push('/register');
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

.sign_or {
  width: 100%;
  height: 2px;
  margin: 20px 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .or {
    text-align: center;
    width: 30px;
    background: rgba(0, 0, 0, 0.8);
  }
}
.login-bg {
  height: 4.76rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #000;
  .title {
    // width: 1.8rem;
    font-size: 0.48rem;
    font-weight: 500;
    // text-align: center;
    padding-left: 0.48rem;
    padding-bottom: 0.76rem;
    // background-color: rgba(0, 0, 0, 0.2);
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

/*表单*/
.loginContain {
  border-top: 1px solid rgb(255, 255, 255);
  padding: 0 0.76rem;
  //background-color: rgba(0, 0, 0, 0.2);

  div.item {
    position: relative;
    width: 100%;
    height: 0.8rem;
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
      height: 100%;
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
    background-color: #000;
    display: flex;
    justify-content: center;
    margin-top: 0.24rem;
    height: 42px;
    color: #666666;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.g-signin-button {
  cursor: pointer;
  display: block;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  margin-top: 20px;
  border: 1px solid #ededed;
  color: #92938f;

  .dis {
    position: relative;
    text-align: center;
    .dis-left {
      display: inline-block;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

</style>
