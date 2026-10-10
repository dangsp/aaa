<template>
  <div class="recharge">
    <div class="recharge-tt">
      <div class="recharge-wrapper">
        <div class="recharge-item" v-for='(item, index) in princes' :key='item.id'
          :class='select == item.id ? "primary" : ""' @click='handleSelect(item.id, item.value)'>
          {{ item.label }}{{ $t("yuan") }}
        </div>
        <div class="recharge-item" style="visibility: hidden"></div>
      </div>
      132123132
      <div class="form">
        <div class="input-box">
          <van-field v-model="uploadForm.balance" readonly :label='$t("account")' input-align="left" type="number"
            size="large">
            <div slot="right-icon" size="small" type="primary"></div>
          </van-field>
        </div>
        <div class="input-box">
          <van-field v-model="uploadForm.user_name" readonly :label="$t('user-name')" input-align="left" size="large">
            <div slot="right-icon" size="small" type="primary"></div>
          </van-field>
        </div>
        <div class="input-box" v-show="isInput">
          <van-field v-model="uploadForm.bank_code" :label='$t("bank-card-number")' readonly input-align="left"
            size="large" />
        </div>
        <div class="input-box" v-show="isInput">
          <van-field v-model="uploadForm.bank_name" :label='$t("bank-name")' readonly input-align="left" size="large" />
        </div>
      </div>
      <div class="input-wrapper">
        <div class="input-balel">
          {{ $t("enterwithdrawalamount") }}
        </div>
        <van-field clickable v-model="price" :placeholder="$t('please-enter-the-withdrawal-amount')" />
        <div class="input-tips">( {{ $t("dailymaximum") }})</div>
      </div>
      <div class="input-wrapper">
        <div class="input-balel">
          {{ $t("txdm") }}
        </div>
        <van-field clickable v-model="pull_code" :placeholder="$t('txdm')" />
      </div>
    </div>
    <div class="btn-wrapper">
      <van-button type="info" @click="comfirm" block color="#fc3d44">
        {{ $t("submissionofwithdrawal") }}
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadForm: {
        'account': '',
        'balance': '',
        'user_name': '',
        'bank_code': '',
        'bank_name': ''
      },
      select: '',
      price: '',
      pull_code:'',
      isInput: false,
      princes: [
        { id: 2, value: '100', label: '100' },
        { id: 3, value: '500', label: '500' },
        { id: 4, value: '1000', label: '1000' },
        { id: 5, value: '5000', label: '5000' }
      ],
    };
  },

  created() {

  },
  watch: {},
  mounted() {
    _ResizeContent.init();
    this.getData()
    this.getConfig()
  },

  methods: {
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
            if (value.key == 'is_input' && value.val == '1') {//1用户输入三个字段 2用户输入一个字段
              this.isInput = true;
            }
          });
        }
      }).catch(err => {
      }).finally(() => {
      });
    },
    comfirm() {
      if (!this.price) {
        this.$toast(this.$t("price"));
        return;
      }
      if (this.pull_code > 99999999) {
        this.$toast(this.$t('txdm'));
        return;
      }
      if (this.price > 99999999) {
        this.$toast(this.$t('dailymaximum'));
        return;
      }
      this.$http.home.userPull({ pull_num: this.price ,pull_code:this.pull_code}).then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.price = '';
        this.$emit("refresh", true);
        this.$toast(this.$t("success"));
      }).catch(err => {
        this.$toast(err.msg);
      }).finally(() => {
      });
    },
    handleSelect(id, val) {
      if (this.select == id) {
        this.price = '';
        this.select = '';
      } else {
        this.select = id;
        this.price = val;
      }
    },
  }
};
</script>
<style scoped lang="scss">
/deep/ .van-field__control:read-only {
  color: #000;
}

/deep/.van-cell {
  // background-color: rgba(0,0,0,0.2);
  color: #000;

}

/deep/ .van-cell__title {
  color: #000;
}

.recharge-tt {
  // background-color: #fff;
  color: #000;

  .recharge-wrapper {
    padding: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .recharge-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.14rem;
      margin-bottom: 0.2rem;
      border-radius: 6px 6px 6px 6px;
      overflow: hidden;
      width: 30%;
      opacity: 1;
      border: 2px solid #000;
    }
  }


  .recharge-item.primary {
    color: #000;
    background-color: $primary;
  }

  .input-wrapper {
    padding: 0 0.24rem 0.5rem;
   /deep/ .van-field__body {
      color: #000;
      input{
        color: #000;
      }
      input::placeholder{
        color: #000;
      }
    }


    .input-balel {
      font-size: 0.24rem;
      font-weight: 500;
      color: #000;

    }

    .input-tips {
      font-size: 0.2rem;
      font-weight: 500;
      color: #000;
    }
  }
}

.btn-wrapper {
  margin-top: 1rem;
  margin-bottom: 20px;

  /deep/ .van-button {
    background-color: rgba(0,0,0,0.2) !important;
    border-style: none;
  }

  .van-button__text {
    color: #000;

  }
}
</style>
