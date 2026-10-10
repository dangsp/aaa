<template>
  <div class="recharge">
    <!--    <div class="recharge-tt">-->

    <!--      <div v-show='isQr'>-->
    <!--        <van-tabs v-model="activeTab" swipeable>-->
    <!--          <van-tab :title="$t('erc20')" name="erc20">-->

    <!--          </van-tab>-->
    <!--          <van-tab :title="$t('trc20')" name="trc20">-->
    <!--          </van-tab>-->
    <!--        </van-tabs>-->
    <!--        <div class="tab-wrap" v-show="activeTab=='erc20'">-->
    <!--          <div class="classId1"></div>-->
    <!--          <div class="input-wrap">-->
    <!--            <van-field-->
    <!--                clickable-->
    <!--                style="flex: 1"-->
    <!--                readonly-->
    <!--                v-model="rechange1.address"-->
    <!--            />-->
    <!--            <van-button type="info" class='btnss' :data-clipboard-text="rechange1.address" color="#fc3d44">-->
    <!--              {{ $t("copy") }}-->
    <!--            </van-button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="tab-wrap" v-show="activeTab=='trc20'">-->
    <!--          <div class="classId2"></div>-->
    <!--          <div class="input-wrap">-->
    <!--            <van-field-->
    <!--                clickable-->
    <!--                style="flex: 1"-->
    <!--                readonly-->
    <!--                v-model="rechange2.address"-->
    <!--            />-->
    <!--            <van-button type="info" class='btnss' :data-clipboard-text="rechange2.address" color="#fc3d44">-->
    <!--              {{ $t("copy") }}-->
    <!--            </van-button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="recharge-wrapper" v-show='!isQr'>-->
    <!--        <div class="recharge-item" v-for='(item,index) in princes' :key='item.id'-->
    <!--             :class='select==item.id?"primary":""'-->
    <!--             @click='handleSelect(item.id,item.value)'>-->
    <!--          {{ item.label }}{{ $t("yuan") }}-->
    <!--        </div>-->
    <!--        <div class="recharge-item" style="visibility: hidden"></div>-->
    <!--      </div>-->

    <!--      <div class="input-wrapper">-->
    <!--        <div class="input-balel">-->
    <!--          {{ $t("enter-the-recharge-amount") }}-->
    <!--        </div>-->
    <!--        <van-field-->
    <!--            clickable-->
    <!--            v-model="price"-->
    <!--            :placeholder="$t('please-enter-the-recharge-amount')"-->
    <!--        />-->
    <!--        <div class="input-tips">( {{ $t("dailymaximum") }})</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="btn-wrapper">-->
    <!--      <van-button type="info" @click="comfirm" block color="#fc3d44">-->
    <!--        {{ $t("top-up") }}-->
    <!--      </van-button>-->
    <!--    </div>-->
    <div class="steps">
      <div class="step-1" v-if="step==1">
        <van-cell v-for="(item,index) in list" :key="index" @click="handleStep1(item)" :title="item.front_name"
                  is-link/>
        <!--        <van-button style="margin-top: 20px;" type="info" @click="handleStep1" block color="#fc3d44">-->
        <!--          {{ $t("top-up") }}-->
        <!--        </van-button>-->
      </div>
      <div class="step-2" v-else-if="step==2">
        <div class="input-wrapper" style="margin-top: 20px;">
          <div class="input-balel">
            {{ $t("enter-the-recharge-amount") }}
          </div>
          <van-field
          class="steps_input"
              clickable
              v-model="money"
              :placeholder="$t('please-enter-the-recharge-amount')"
          />
          <div class="input-tips">( {{ $t("dailymaximum") }})</div>
        </div>
        <div class="button-wrapper">
          <van-button style="margin-top: 20px;margin-right: 8px;" @click="handleBefr" type="default" block>
            {{ $t("back") }}
          </van-button>
          <van-button style="margin-top: 20px;margin-left: 8px;" @click="handleSatisfy" type="info" block
                      >
            {{ $t("next") }}
          </van-button>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import walletFlow from "./walletFlow.vue";
import fileFlow from "./fileFlow.vue";
import withdraw from "./withdraw.vue";
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard'

export default {
  components: {withdraw, fileFlow, walletFlow},
  data() {
    return {
      select: '',
      isQr: false,
      price: '',
      princes: [
        {id: 2, value: '100', label: '100'},
        {id: 3, value: '500', label: '500'},
        {id: 4, value: '1000', label: '1000'},
        {id: 5, value: '5000', label: '5000'}
      ], activeTab: 'erc20',
      rechange1: {
        address: '',
        url: ''
      },
      rechange2: {
        address: '',
        url: ''
      },
      money: '',
      list: [],
      selected: {
        "id": '2',
        "front_name": "",
        "back_name": "",
        "code": "",
      },
      step: 1,
    };
  },

  created() {

  },
  watch: {},
  mounted() {
    _ResizeContent.init();
    // this.getData();
    this.getList();
    this.getQr('erc20');
    this.getQr('trc20');
    const clipboard = new Clipboard('.btnss')
    clipboard.on('success', () => {
      this.$toast(this.$t('success'));
    })
    clipboard.on('error', () => {
      console.log('复制失败')
    })
  },

  methods: {
    getList() {
      this.$http.home.depositList({page: 1, limit: 10000,}).then(res => {
        if (res.code == 200) {
          let items = res.data.items;
          this.list = items;
        }
      }).catch(err => {
      }).finally(() => {
      });
    },
    handleBefr() {
      this.step = 1;
      this.money = '';
      this.selected = {}
      this.$emit("refresh", true);
    },
    handleSatisfy() {
      let money = this.money
      let {id: deposit_id} = this.selected
      if (!this.money) {
        this.$toast(this.$t("price"));
        return;
      }
      if (this.money > 99999999) {
        this.$toast(this.$t("dailymaximum"));
        return;
      }
      // 用户选择以后 输入金额 然后点击确定将选择的id （deposit_id） 还有用户输入的金额(money) 传入 /api/user/satisfy接口
      this.$http.home.satisfy({deposit_id, money}).then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.handleBefr();
        // window.open(res.data.url.url)
        window.location.href=res.data.url.url;
      }).catch(err => {
      }).finally(() => {
      });
    },
    handleStep1(val) {
      console.log(JSON.stringify(val));
      this.selected = Object.assign({}, val)
      this.step = 2
    },
    getData() {
      this.$http.home.configList({}).then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        let items = res.data.items;
        this.isQr = false;
        items.map(value => {
          if (value.key == 'is_type' && value.val == '1') {//1二维码 2用户手动输入
            this.isQr = true;
          }
        });
      }).catch(err => {
      }).finally(() => {
      });
    },
    generateQRCode(classId, value) {
      new QRCode(document.querySelector(classId), {
        text: value,
        width: 150,
        height: 150,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    getQr(type) {
      this.$http.home.getQrcode({type}).then((res) => {
        if (res.code == 200) {
          if (type == 'erc20') {
            this.generateQRCode('.classId1', res.data.url);
            this.rechange1 = res.data;
          } else {
            this.rechange2 = res.data;
            this.generateQRCode('.classId2', res.data.url);
          }
        }
      });
    },
    comfirm() {
      if (!this.price) {
        this.$toast(this.$t("price"));
        return;
      }
      if (this.price > 99999999) {
        this.$toast(this.$t("dailymaximum"));
        return;
      }
      this.$http.home.userSatisfy({money: this.price}).then(res => {
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
<style lang="scss">
.steps {
  .van-cell {
    display: flex;
    // background: rgba(0,0,0,0.2);
    color: #000;
   
  }
  .steps_input input::placeholder{
      color: #fff !important;
    }
    .steps_input input{
      color: #fff !important;
    }
}

</style>
<style scoped lang="scss">

.button-wrapper {
  display: flex;
  align-items: center;
  /deep/ .van-button{
      background-color:rgba(0,0,0,0.2);
      border-style: none;
    }
    .van-button__text{
      color: #000;

    }
    .btn-wrapper_dis{
      background-color:rgba(0,0,0,0.2);
    }
}

.tab-wrap {
  padding: 0.2rem;

  .input-wrap {
    //display: flex;
  }
}

.classId1, .classId2 {
  margin: 0.2rem auto;
  width: 3rem;
}

.recharge-tt {
  background-color: #fff;

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
      border: 2px solid #F63130;
    }
  }

  .recharge-item.primary {
    color: #000;
    background-color: $primary;
  }

  .input-wrapper {
    padding: 0 0.24rem 1rem;

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
}
</style>
