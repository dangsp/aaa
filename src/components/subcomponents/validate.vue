<template>
  <button class="code bgColor-transparent">{{ this.auth_time }}{{ $t('resendAfterSeconds') }}</button>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      defaults: ""
    }, type: {//类型 1登录 2注册 3找回密码
      type: Number,
      defaults: 1
    },
  },
  created() {
    this.getcode();
  },
  data() {
    return {
      auth_time: 60,
      SMSTY: null,
      abledSend: false
    };
  },
  methods: {
    sendCode() {
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.$emit("isend", false);
          clearInterval(auth_timetimer);
        }
      }, 1000);

    },
    getcode() {
      let email = this.email.trim()
      this.$http.login.sendMailCode({
        "email": email,
        "type": this.type
      }).then(res => {
        if (res.code != 200) {
          this.$emit("isend", false);
          this.$toast(res.msg);
          return;
        }
        this.$emit("isend", true);
        this.$emit("get-code", res.data);
        this.sendCode();
        this.$toast(this.$t('theVerificationCodeIsSentSuccessfullyProcedure'));
      }).catch(err => {
        this.$emit("isend", false);
      })
    }
  }
};
</script>
