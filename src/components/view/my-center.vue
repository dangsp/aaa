<template>
  <div class="home">
    <header-top :title='$t("center")'></header-top>
    <div class="headcontent">
      <div class="personal">
        <img class="personal-avatar" src="@/assets/img/avatar.png" alt="">
        <div class="personal-name">
          <div class="name-part1">
            <div class="name-part1-text">{{ centerData.nickname }}</div>
          </div>
          <div v-if="userInfo.account">
            <div class="name-part2">{{ userInfo.account }}</div>
            <div class="name-part2">id:{{ userInfo.id }}</div>
            <div class="name-part2">{{ $t("points") }}:{{ userInfo.points }}</div>
            <div class="name-part2">{{ $t("account") }}:{{ userInfo.balance }}</div>
          </div>
          <div class="name-part2" v-else @click="handleLogin"> {{ $t("loginf") }}</div>
        </div>
      </div>

      <div class="center-part">
        <div class="part-box" @click="announcement">
          <div class="part-left">
            <!-- <img src="@/assets/img/my_4.png" alt=""> -->
            <van-icon name="coupon-o" size="0.3rem" />

            <span> {{ $t("edit-user-information") }}</span>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="part-box" @click="vipInstructions">
          <div class="part-left">
            <van-icon name="like-o" size="0.3rem" />
            <span> {{ $t("my-wallet") }}</span>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="part-box" @click="vipInstructions1">
          <div class="part-left">
            <van-icon name="smile-comment-o" size="0.3rem" />
            <span> {{ $t("walletflow") }}</span>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="part-box" @click="vipInstructions2">
          <div class="part-left">
            <van-icon name="birthday-cake-o" size="0.3rem" />
            <span> {{ $t("movieticketflow") }}</span>
          </div>
          <van-icon name="arrow" />
        </div>
        <div v-if="userInfo.serve_url" class="part-box" @click='handleLicencia("customer_url")'>
          <div class="part-left">
            <van-icon name="home-o" size="0.3rem" />
            <span> {{ $t("customer") }}</span>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="confirm1" v-if="userInfo.account" @click="loginOut"> {{ $t("log-out") }}</div>
    </div>
    <van-dialog :closeOnClickOverlay="true" v-model="showPhone" :confirmButtonText="$t('confirm')"
      :showConfirmButton="true">
      <div class="success-box">
        <div style="text-align: center" v-if="rule.kefu1">zalo: {{ rule.kefu1 }} <img class="copy-img"
            v-clipboard:copy="rule.kefu1" v-clipboard:error="onError" v-clipboard:success="onCopy"
            src="@/assets/img/my_7.png" alt=""></div>
        <div style="text-align: center" v-if="rule.kefu2">zalo: {{ rule.kefu2 }} <img class="copy-img"
            v-clipboard:copy="rule.kefu2" v-clipboard:error="onError" v-clipboard:success="onCopy"
            src="@/assets/img/my_7.png" alt=""></div>
      </div>
    </van-dialog>
    <van-dialog :closeOnClickOverlay="true" v-model="showEmail" :confirmButtonText="$t('confirm')"
      :showConfirmButton="true">
      <div class="success-box">
        <div style="text-align: center">{{ rule.kefu_email }} <img class="copy-img" v-clipboard:copy="rule.kefu_email"
            v-clipboard:error="onError" v-clipboard:success="onCopy" src="@/assets/img/my_7.png" alt=""></div>
      </div>
    </van-dialog>
    <footersub nav="myCenter"></footersub>
  </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";
import { Dialog } from 'vant';
import { mapActions } from "vuex";

export default {
  data() {
    return {
      centerData: {},
      rule: {
        "platform_rule": "",
        "recharge_rule": "",
        "withdraw_rule": "",
        "invite_rule": "",
        "level_rule": "",
        "receive_username": "",
        "receive_bankcode": "",
        "receive_bank": "",
        "kefu": "",
      },
      userInfo: {
        "account": "",
        "points": 0,
        "balance": "0",
        "user_name": "",
        "bank_code": "",
        "bank_name": ""
      },
      customer_url: '',
      showPhone: false,
      showEmail: false
    };
  },
  components: {
    footersub: footersub,
    Dialog
  },
  created() {
  },
  // computed: {
  //   ...mapState({
  //     userInfo: "user"
  //   })
  // },
  watch: {},
  mounted() {
    _ResizeContent.init();
    this.getData();
    this.getList();
  },

  methods: {
    ...mapActions([
      'LogOut',
    ]),
    handleLicencia(val) {
      // window.open(this.customer_url)
      window.location.href = 'https://www.baidu.com/'
      // this.$router.push({ path: '/licencia', query: { 'key': val } });
    },
    loginOut() {
      this.$http.user.userLogout().then(res => {
        this.LogOut()
        this.back()
      })
      localStorage.removeItem('token')
      localStorage.removeItem('Authorization')
      localStorage.removeItem('vuex')

    },
    getList() {
      this.$http.home.configList({}).then(res => {
        if (res.code == 200) {
          let list = res.data.items;
          list.map(val => {
            if (val.key == "customer_url") {
              this.customer_url = val.val
            }
          })
        }
      }).catch(err => {
      }).finally(() => {
      });
    },
    handleLogin() {
      this.$router.push('/login');
    },
    vipInstructions() {
      this.$router.push('/wallet');
    }, vipInstructions1() {
      this.$router.push({ path: '/wallet', query: { type: 3 } });
    }, vipInstructions2() {
      this.$router.push({ path: '/wallet', query: { type: 4 } });
    }, vipInstructions3() {
      this.$router.push({ path: '/wallet', query: { type: 5 } });
    },
    handleEmail() {
      this.showEmail = true
      // Dialog.alert({
      //   closeOnClickOverlay: "true",
      //   message: this.rule.kefu_email, confirmButtonText: this.$t('confirm')
      // }).then(() => {
      //   // on close
      // });
    },
    instructions() {
      Dialog.alert({
        title: this.$t('ruleDescription'),
        closeOnClickOverlay: "true",
        message: this.rule.platform_rule, confirmButtonText: this.$t('confirm')
      }).then(() => {
        // on close
      });
    },
    //编辑用户信息
    announcement() {
      this.$router.push('/userInfo');
    },
     customer() {
      this.showPhone = true
      // Dialog.alert({
      //   title: this.$t('onlineCustomerService'),
      //   message: this.rule.receive_bankcode,
      //   confirmButtonText: this.$t('confirm')
      // }).then(() => {
      //   // on close
      // });
    },
    onCopy() {
      this.$toast(this.$t('copySuccess'));
    },
    onError() {
      this.$toast(this.$t('copyTheFailure'));
    },
    async getData() {
      const res = await this.$http.user.getUserInfo();
      if (res.code == 200) {
        this.userInfo = res.data
        store.commit("SET_USERINFO", res.data);
      }
      // this.centerData = res.data;
    },

    goToOrder(num) {
      this.$router.push({ path: '/order', query: { type: num } });
    },

    goToModifyPwd(num) {
      this.$router.push({ path: '/modifyPwd', query: { type: num } });
    },

    goToBankManage() {
      this.$router.push('/bankManage');
    },

    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.success-box {
  margin-top: 16px;
}

.copy-img {
  width: 0.25rem;
  margin-left: 5px;
}

.headcontent {
  padding-bottom: 1.2rem;

  .confirm1 {
    width: 90%;
    margin: 20px auto;
    background: rgba(0, 0, 0, 0.2);
    color: #000;
    text-align-last: center;
    text-align: center;
    font-size: .32rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: 5px;
  }

  .personal {
    display: flex;
    align-items: center;
    padding: .32rem;
    border-radius: 5px;

    .personal-avatar {
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 10px;
      border-radius: 0.55rem;
    }

    .personal-name {
      .name-part1 {
        display: flex;
        align-items: center;

        .name-part1-text {
          font-size: .36rem;
          font-weight: 700;
        }

        .name-part1-box {
          background: linear-gradient(-55deg, #fc3d44, #FF7200);
          margin-left: 5px;
          border-radius: calc(.2rem + 5px);
          padding: 3px 10px;
          color: #000;

          img {
            width: .26rem;
            height: .26rem;
            vertical-align: middle;
            margin-right: 2px;
          }
        }

        .name-part2-box {
          background: #c7c7c7;
        }
      }

      .name-part2 {
        font-size: 14px;
        color: #000;
      }
    }
  }

  .my-order {
    width: 90%;
    margin: 10px auto;
    padding: .32rem;
    background-color: #000;
    border-radius: 5px;

    .order-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      & :first-child {
        color: #333333;
        font-weight: 700;
        font-size: .34rem;
      }

      & :last-child {
        color: #7B7B7B;
      }
    }

    .order-content {
      display: flex;
      justify-content: space-around;
      align-items: self-start;

      .order-title-xbox {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        flex: 1;
        word-break: normal;
        text-align: center;
        padding: 0 0.1rem;
        justify-content: space-between;

        //min-height: 1.4rem;
        img {
          width: .4rem;
          height: .4rem;
          margin-bottom: 5px;
        }

        .xbox-info {
          position: absolute;
          top: 0;
          right: 0;
          box-sizing: border-box;
          min-width: 16px;
          padding: 0 3px;
          color: #000;
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          background-color: #ee0a24;
          border: 1px solid #fff;
          border-radius: 16px;
          -webkit-transform: translate(50%, -50%);
          transform: translate(50%, -50%);
          -webkit-transform-origin: 100%;
          transform-origin: 100%;
        }
      }
    }
  }

  .center-part {
    width: 90%;
    margin: 10px auto;
    padding: .32rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    color: #000;

    .part-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: .32rem 0;
      font-size: 14px;

      .part-left {
        display: flex;
        align-items: center;

        i {
          margin-right: 4px;
        }
      }

      .part-right {
        width: .16rem;
        height: .23rem;
      }
    }
  }

  .explain {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
