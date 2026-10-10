<template>
  <div>
    <header-top :title="$t('withdrawal')" showBack></header-top>
    <div class="headcontent">
      <div class="personal">
        <img class="personal-avatar" v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
        <img class="personal-avatar" v-else src="@/assets/img/avatar.png" alt="">
        <div class="personal-name">
          <div>{{ userInfo.nickname }}</div>
        </div>
      </div>

      <div class="input-box">
        <van-field
          v-model="balance"
          :label="$t('cashAvailableBalance')"
          input-align="left"
          size="large"
          readonly
        >
          <div slot="right-icon" size="small" type="primary"></div>
        </van-field>
      </div>

      <div class="input-box">
        <van-field
          v-model="form.amount"
          :label="$t('accountWithdrawal')"
          :placeholder="$t('pleaseEnterAmount')"
          input-align="left"
          size="large"
        >
          <div slot="right-icon" size="small" type="primary"></div>
        </van-field>
      </div>
      <div class="input-box">
        <van-field
          v-model="userInfo.bank_no"
          :label="$t('cashAccount')"
          readonly
          input-align="left"
          size="large"
        />
      </div>
      <!--      <div class="withdraw-desc" v-if="withdraw_desc">-->
      <!--        <span style="color:#999999">{{ withdraw_desc }}</span>-->
      <!--      </div>-->
      <van-button class="confirm" type="info" @click="handleComfirm" block color="#fc3d44">
        {{ $t('toConfirmWithdrawal') }}
      </van-button>
      <div class="withdraw-desc" v-if="withdraw_rule">
        <span style="color:#FE2A34">*</span>
        <span style="color:#999999">{{ withdraw_rule }}</span>
      </div>
    </div>
    <van-dialog :closeOnClickOverlay="true" :title="$t('prompt')" v-model="showSuccess" :showConfirmButton="false">
      <div class="success-box">
        <div>{{ $t('setBank') }}</div>
      </div>
      <div class="success-button">
        <div @click="toCancelBank">{{ $t('cancel') }}</div>
        <div @click="toBank">{{ $t('toSetUp') }}</div>
      </div>
    </van-dialog>
    <van-dialog :closeOnClickOverlay="true" :title="$t('prompt')" v-model="showSuccess" :showConfirmButton="false">
      <div class="success-box">
        <div>{{ $t('pleaseSetThePaymentPasswordFirst') }}</div>
      </div>
      <div class="success-button">
        <div @click="toConfirm">{{ $t('cancel') }}</div>
        <div @click="toLogin">{{ $t('toSetUp') }}</div>
      </div>
    </van-dialog>
    <van-dialog :closeOnClickOverlay="true" :title='$t("withdrawal")' v-model="showBankInfo" :showConfirmButton="false">
      <div class="bank-info">
        <div class="bank-item">{{ $t('theAmountOf') }} : {{ form.amount|format_number }}</div>
        <div class="bank-item">{{ $t('theName') }} : {{ userInfo.bank_username }}</div>
        <div class="bank-item">{{ $t('bankName') }} : {{ userInfo.bank_id|filterBank(bankList) }}</div>
        <div class="bank-item">{{ $t('bankCardNumber') }} : {{ userInfo.bank_no }}</div>
      </div>
      <div class="success-button">
        <div @click="toCancelBanks">{{ $t('cancel') }}</div>
        <div @click="toShowBank">{{ $t('confirm') }}</div>
      </div>
    </van-dialog>
    <payKeyboard @close="close()" :amtType="$t('withdrawal')" :amt="form.amount" @paypwd="getPwd"
                 v-if="ishow"></payKeyboard>
  </div>
</template>

<script>
import payKeyboard from "@/components/subcomponents/payKeyboard"; //支付密码键盘

export default {
  components: {
    payKeyboard: payKeyboard
  },
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
      },
      form: {
        "amount": "",
        pay_password: '',
      },
      balance: '',
      withdraw_rule: '',
      withdraw_fee: '',
      withdraw_desc: '',
      ishow: false,
      bankList: [],
      showSuccess: false,
      showBank: false,
      showBankInfo: false,
    };
  },
  filters: {
    filterBank(val, list) {
      let name = ''
      let bank = list.filter(value => val == value.id)
      if (bank.length > 0) {
        name = bank[0].bank_name
      }
      return name;
    }
  },
  created() {

  },
  watch: {},
  mounted() {
    _ResizeContent.init();
    this.getData();
  },

  methods: {
    toLogin() {
      this.$router.push('modifyPwd');
    },
    toConfirm() {
      this.showSuccess = false
    },
    toCancelBank() {
      this.showBank = false
    },
    toBank() {
      this.$router.push('bankManage');
    },
    getData() {
      this.$http.home.userInfo().then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.userInfo = res.data;

      })
    },
    format(n = 0) {
      var b = parseInt(n).toString();
      var len = b.length;
      if (len <= 3) {
        return b;
      }
      var r = len % 3;
      return r > 0 ? b.slice(0, r) + "." + b.slice(r, len).match(/\d{3}/g).join(".") : b.slice(r, len).match(/\d{3}/g).join(".");
    },
    getConfig() {
      this.$http.home.config().then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.withdraw_rule = res.data.withdraw_rule;
        this.withdraw_fee = res.data.withdraw_fee;
        this.withdraw_desc = res.data.withdraw_desc;
      })
    },

    handleComfirm() {
      if (!this.userInfo.bank_no) {
        this.showBank = true
        return;
      }
      if (!this.form.amount) {
        return this.$toast(this.$t('theAmountCannotBeEmpty'), 1);
      }
      if (Number(this.userInfo.balance) < Number(this.form.amount)) {
        return this.$toast(this.$t('lackOfBalance'), 1);
      }
      if (Number(this.userInfo.balance) < Number(this.withdraw_fee)) {
        return this.$toast(this.$t('balancePay'), 1);
      }
      if (Number(this.form.amount) < Number(this.withdraw_fee)) {
        return this.$toast(this.$t('payTips'), 1);
      }
      this.showBankInfo = true
    },
    toCancelBanks() {
      this.showBankInfo = false;
    },
    toShowBank() {
      this.showBankInfo = false;
      this.form.pay_password = ''
      this.ishow = true;
    },
    getPwd(paypwd) {
      this.form.pay_password = paypwd
      this.$http.home.BalanceWithdraw(this.form).then(res => {
        if (res.code == 400041) {
          this.showSuccess = true;
          return;
        }
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.ishow = false;
        this.$toast(this.$t('submittedSuccessfully'));
        this.getData();
        this.$router.push('home')
      })
    },

    close() {
      this.form.pay_password = ''
      this.ishow = false;
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
  padding-top: .4rem;

  .personal {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    padding: .32rem;
    border-radius: 5px;

    .personal-avatar {
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 10px;
      border-radius: 50%;
      overflow: hidden;
    }

    .personal-name {
      font-size: .36rem;
      font-weight: 700;
    }
  }

  .input-box {
    width: 90%;
    margin: 10px auto;
  }

  .confirm {
    width: 90%;
    margin: 20px auto;
    background-color: #fc3d44;
    color: #fff;
    text-align: center;

    text-align-last: center;
    font-size: .28rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: 5px;
  }

  .withdraw-desc {
    width: 90%;
    margin: 0 auto;
    font-size: .26rem;
  }
}

.bank-info {
  color: #333333;
  font-size: .28rem;
  margin: 0 20px;

  .bank-item {
    height: 0.8rem;
    line-height: 0.8rem;
  }
}
</style>
