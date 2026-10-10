<template>
  <div>
    <header-top :title="$t('my-wallet')" showBack></header-top>
    <div class="headcontent">
      <div class="bg-top">
        <div class="count-wrapper">
          <div class="title">{{ $t("wallet-information") }}</div>
          <div class="count-content">
            <div class="count-w">
              <div class="info">{{ $t("currentintegral") }}</div>
              <div class="number">{{ uploadForm.balance }}</div>
            </div>
            <div class="count-w">
              <div class="info">{{ $t("points") }}</div>
              <div class="number">{{ uploadForm.points || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs-wrapper" v-if="showHeader">
        <van-tabs v-model="activeName" @click="onClick">
          <van-tab :title="$t('top-up')" name="a">
            <recharge ref="recharge" @refresh="handleRefresh"></recharge>
          </van-tab>
          <van-tab :title="$t('withdraw')" name="b">
            <withdraw @refresh="handleRefresh"></withdraw>
          </van-tab>
          <van-tab :title="$t('walletflow')" name="c">
            <walletFlow></walletFlow>
          </van-tab>
          <van-tab :title="$t('movieticketflow')" name="d">
            <fileFlow></fileFlow>
          </van-tab>
        </van-tabs>
      </div>
      <div class="tabs-wrapper 111" v-else>
        <walletFlow v-if="activeName == 'c'"></walletFlow>
        <fileFlow v-if="activeName == 'd'"></fileFlow>
      </div>
    </div>
  </div>
</template>

<script>
import recharge from "./components/recharge";
import fileFlow from "./components/fileFlow.vue";
import withdraw from "./components/withdraw.vue";
import walletFlow from "./components/walletFlow.vue";
import flow from "./components/flow.vue";

export default {
  components: {
    recharge: recharge,
    fileFlow: fileFlow,
    withdraw: withdraw,
    walletFlow: walletFlow,
    flow: flow,
  },
  data() {
    return {
      activeName: "a",
      showHeader: true,
      form: {
        amount: "",
        pay_password: "",
      },
      uploadForm: {
        account: "",
        balance: "0",
        points: "0",
        user_name: "",
        bank_code: "",
        bank_name: "",
      },
      balance: "",
      withdraw_rule: "",
      withdraw_fee: "",
      withdraw_desc: "",
      ishow: false,
      bankList: [],
      showSuccess: false,
      showBank: false,
      showBankInfo: false,
    };
  },
  filters: {
    filterBank(val, list) {
      let name = "";
      let bank = list.filter((value) => val == value.id);
      if (bank.length > 0) {
        name = bank[0].bank_name;
      }
      return name;
    },
  },
  created() {},
  watch: {
    $route(to, from) {
      this.getData();
    },
  },
  mounted() {
    _ResizeContent.init();
    this.getData();
  },

  methods: {
    handleRefresh() {
      this.getData();
    },
    onClick(name, title) {
      if (name == "a") {
        this.$refs.recharge.handleBefr();
      }
    },
    toLogin() {
      this.$router.push("modifyPwd");
    },
    toConfirm() {
      let { user_name, bank_code, bank_name } = this.uploadForm;
      this.$http.home
        .setInfo({ user_name, bank_code, bank_name })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.$message.success(this.$t("success"));
          this.$router.go(-1);
        });
    },
    toCancelBank() {
      this.showBank = false;
    },
    toBank() {
      this.$router.push("bankManage");
    },
    getData() {
      let type = this.$route.query.type;
      this.showHeader = true;
      if (type == 1) {
        this.activeName = "a";
      } else if (type == 2) {
        this.activeName = "b";
      } else if (type == 3) {
        this.activeName = "c";
        this.showHeader = false;
      } else if (type == 4) {
        this.activeName = "d";
        this.showHeader = false;
      } else if (type == 5) {
        this.activeName = "e";
        this.showHeader = false;
      }
      this.$http.home.userInfo().then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.uploadForm = res.data;
      });
    },
    handleComfirm() {
      if (!this.uploadForm.account) {
        return this.$toast(this.$t("theAmountCannotBeEmpty"), 1);
      }
      if (!this.uploadForm.bank_code) {
        return this.$toast(this.$t("theAmountCannotBeEmpty"), 1);
      }
      if (!this.uploadForm.bank_name) {
        return this.$toast(this.$t("theAmountCannotBeEmpty"), 1);
      }
      let { user_name, bank_code, bank_name } = this.uploadForm;
      this.$http.home
        .setInfo({ user_name, bank_code, bank_name })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.$toast(this.$t("success"));
          this.$router.go(-1);
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .van-cell__title {
  color: #000;
}

.tabs-wrapper {
  margin-top: 20px;
  padding: 0 0.24rem;
  border-radius: 6px;
  overflow: hidden;

  /deep/ .van-tabs__nav {
    background-color: #fff;

    .van-tab {
      color: #000;
    }

    .van-tabs__line {
      background-color: #ccc;
    }
  }
}

.bg-top {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.24rem 0.24rem 0;
  background-color: rgba(0, 0, 0, 0.2);
  .count-wrapper {
    background-color: rgba(0, 0, 0, 1);

    .title {
      color: #fff;
      font-size: 0.32rem;
      font-weight: bold;
      margin-top: 10px;
      padding: 0.24rem;
    }

    .count-content {
      padding: 0.1rem;
      display: flex;
      align-items: center;

      .count-w {
        padding: 0.2rem;
        background-color: rgba(0, 0, 0, 1);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .info {
          font-size: 0.27rem;
          font-weight: 500;
          color: #fff;
        }

        .number {
          font-size: 0.64rem;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
}
</style>
