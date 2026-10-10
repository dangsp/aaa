<template>
  <div>
    <header-top :title="$t('edit-user-information')" showBack></header-top>
    <div class="headcontent">
      <div class="input-box">
        <van-field
            v-model="uploadForm.balance"
            :label='$t("zhanghu")'
            input-align="left"
            size="large"
            readonly
        >
          <div slot="right-icon" size="small" type="primary"></div>
        </van-field>
      </div>
      <div class="input-box">
        <van-field
            v-model="uploadForm.user_name"
            :label="$t('user-name')"
            :placeholder="$t('please-enter-the-user-name')"
            input-align="left"
            :required="isInput"
            size="large"
        >
          <div slot="right-icon" size="small" type="primary"></div>
        </van-field>
      </div>
      <div class="input-box" v-show="isInput">
        <van-field
            v-model="uploadForm.bank_code"
            :label="$t('bank-card-number')"
            :placeholder="$t('please-enter-your-bank-card-number')"
            input-align="left"
            size="large" required
        />
      </div>
      <div class="input-box" v-show="isInput">
        <van-field
            v-model="uploadForm.user_ci"
            :label="$t('cimsg')"
            :placeholder="$t('please-enter-your-bank-card-number')"
            input-align="left"
            size="large" required
        />
      </div>
      <div class="input-box" v-show="isInput">
        <van-field
            v-model="uploadForm.bank_name"
            :label="$t('bank-name')" required
            :placeholder="$t('please-enter-the-bank-name')"
            input-align="left"
            size="large"
        />
      </div>
      <van-button class="confirm" type="info" @click="handleComfirm" block >
        {{ $t("ok") }}
      </van-button>
    </div>
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
      form: {
        "amount": "",
        pay_password: '',
      },
      uploadForm: {
        'account': '',
        'balance': '',
        'user_name': '',
        'bank_code': '',
        'bank_name': '',
        'user_ci': 0
      },
      balance: '',
      withdraw_rule: '',
      withdraw_fee: '',
      withdraw_desc: '',
      ishow: false,
      bankList: [],
      showSuccess: false,
      isInput: false,
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
  watch: {
    "uploadForm.user_name"(newValue, oldValue) {
      this.uploadForm.user_name = newValue.replace(/[\u4e00-\u9fa5/\s+/]|[`~!@#$%^&*() \\+ =<>?"{}|, \\/ ;' \\ [ \] ·~！@#￥%……&*（）—— \\+ ={}|《》？：“”【】、；‘’，。、_.-:]/g, "")
    }
  },
  mounted() {
    _ResizeContent.init();
    this.getData();
    this.getConfig();
  },

  methods: {
    toLogin() {
      this.$router.push('modifyPwd');
    },
    toConfirm() {
      let {user_name, bank_code, bank_name} = this.uploadForm;
      this.$http.home.setInfo({user_name, bank_code, bank_name}).then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.$message.success(this.$t("success"));
        this.$router.go(-1)
      });
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
        this.uploadForm = res.data;
      })
    },
    getConfig() {
      this.$http.home.configList({}).then(res => {
        if (res.code == 200) {
          let items = res.data.items;
          this.isInput = false;
          items.map(value => {
            console.log(value);
            if (value.key == 'is_input' && value.val == '1') {//1用户输入三个字段 2用户输入一个字段
              this.isInput = true;
            }
          });
        }
      }).catch(err => {
      }).finally(() => {
      });
    },
    handleComfirm() {
      // if (this.isInput) {
      //   if (!this.uploadForm.account) {
      //     return this.$toast(this.$t('theAmountCannotBeEmpty'), 1);
      //   }
      //   if (!this.uploadForm.bank_code) {
      //     return this.$toast(this.$t('theAmountCannotBeEmpty'), 1);
      //   }
      //   if (!this.uploadForm.bank_name) {
      //     return this.$toast(this.$t('theAmountCannotBeEmpty'), 1);
      //   }
      // }

      let {user_name, bank_code, bank_name,user_ci} = this.uploadForm;
      this.$http.home.setInfo({user_name, bank_code, bank_name,user_ci}).then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.$toast(this.$t("success"));
        this.$router.go(-1)
      });
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
    /deep/ .van-cell{
      // background-color: rgba(0,0,0,0.2);
      color: #000;
    }
    /deep/ .van-field__control{
      color: #000;
    }
  }

  .confirm {
    width: 90%;
    margin: 20px auto;
    // background-color: #fc3d44;
    color: #fff;
    text-align: center;
    text-align-last: center;
    font-size: .28rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.5);
    border-style: none;
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
