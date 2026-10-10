<template>
  <div class="home">
    <header-top :title="$t('iWantToMakeMoney')"></header-top>
    <div class="headcontent" @click="goToOrderPay">
      <img src="@/assets/img/has_money.png" alt="">
    </div>
    <van-dialog :closeOnClickOverlay="true" :title="$t('prompt')" v-model="showSuccess" :showConfirmButton="false">
      <div class="success-box">
        <div>{{ showMsg }}</div>
      </div>
      <div class="success-button">
        <div @click="toCancel">{{ $t('cancel') }}</div>
        <div @click="toLogin">{{ $t('toPayFor') }}</div>
      </div>
    </van-dialog>
    <footersub nav="money"></footersub>
  </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";

export default {
  data() {
    return {
      userInfo: {
        "nickname": "",
        "email": "",
        "avatar": "",
        "balance": "0",
        "commission": "0",
        "invite_code": "",
        "lv": '',
        "bank_username": null,
        "bank_no": null,
        "bank_id": null,
        "receiver_name": null,
        "receiver_mobile": null,
        "receiver_address": null,
        "set_pay_password": 0,//1已设置密码 0未设置密码
        "order": {
          "status1": 0,
          "status2": 0,
          "status3": 0
        }
      },
      showSuccess: false,
      showMsg: this.$t('forOrdersToBePaidPleasePayFirst'),
    };
  },
  components: {
    footersub: footersub
  },
  created() {
  },
  watch: {},
  mounted() {
    _ResizeContent.init();
    // this.getData();
  },

  methods: {
    toCancel() {
      this.showSuccess = false
    },

    toLogin() {//order?type=1
      this.$router.push({path: 'order', query: {type: 1}});
    },
    getUserInfo() {
      this.$http.user.userInfo().then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.userInfo = res.data
      })
    },
    goToOrderPay() {
      this.$http.home.getHomePageData().then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        let {order_num = 0} = res.data
        if (order_num > 0) {
          this.$http.user.userInfo().then(res => {
            if (res.code != 200) {
              this.$toast(res.msg);
              return;
            }
            this.userInfo = res.data
            let count = res.data.order.status1 || 0
            if (count > 0) {
              this.showSuccess = true
            } else {
              this.$router.push('/confirmOrder');
            }
          })
        } else {
          this.$toast(this.$t('theNumberOfTimesThatDayHasExceededTheLimit'));
        }
      })
    },

    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.success-box {
  margin-top: 30px;
  text-align: center;

  .success-img {
    width: 1.5rem;
    margin-bottom: 10px;
    background-color: #FE2A34;
  }
}

.success-button {
  display: flex;
  justify-content: space-around;
  margin: 10px auto 30px auto;

  & :first-child {
    width: 40%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: .5rem;
    border: 1px solid #E5E5E5;
  }

  & :last-child {
    width: 40%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: .5rem;
    border: 1px solid #E5E5E5;
    color: #fff;
    background-color: #fc3d44;
  }
}

.headcontent {
  height: calc(100vh - 1.86rem);
  width: 100%;
  overflow: hidden;

  img {
    height: calc(100vh - 1.86rem);
    width: 100%;
  }
}
</style>
