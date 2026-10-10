<template>
  <div class="pay-tool">
    <div class="srzfmm_box">
      <div class="qsrzfmm_bt clear_wl">
        <div class="zfClose" @click="close"></div>
        <div style="line-height: 0.9rem;text-align: center;">{{ $t('pleaseEnterThePaymentCode') }}</div>
      </div>
      <div class="zfmmxx_shop">
        <div v-if="amtType != ''" class="mz">{{ amtType }}</div>
        <div v-if="amt != ''" class="zhifu_price">{{ amt|format_number }}</div>
      </div>
      <div class="pay-tool-inputs">
        <div class="item" v-for="(index,i) in items" :key="i" @click="ishowKey('show')">
          <span v-show="Span>index-1">●</span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="pay-tool-keyboard" v-if="ishowKeyboard">
        <div class="xiaq_tb" @click="ishowKey('hide')">
          <div class="xiaq_img"></div>
        </div>
        <ul>
          <li @click="keyUpHandle($event)" v-for="key in keys" :key="key">
            {{ key }}
          </li>
          <li class="clean" @click="clearPwdHandle"><span class="icon-del">{{ $t('empty') }}</span></li>
          <li @click="keyUpHandle($event)">0</li>
          <li class="del" @click="delHandle"><span class="icon-del">{{ $t('delete') }}</span></li>
        </ul>
      </div>
    </transition>
    <div class="hbbj"></div>
  </div>
</template>
<script>
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9]; //"清空", 0 ,"删除"
// let sendFlag = true // 防止重复发送密码
export default {
  data() {
    return {
      ishowKeyboard: true,
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      Span: -1,
      password: []
    };
  },
  props: {
    amt: "",
    unit: "",
    amtType: ""
  },
  created() {
  },
  methods: {
    ishowKey(type) {
      this.$nextTick(() => {
        if (type == "show") {
          this.ishowKeyboard = true;
        } else this.ishowKeyboard = false;
      });
    },
    close() {
      this.$emit("close");
    },
    keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.password.length;
      if (!text || len >= 6) return;
      this.password.push(text);
      this.Span = len;
      this.pay();
    },
    clearPwdHandle() {
      if (this.password.length <= 0) return false;
      this.password = [];
      this.Span = -1;
    },
    delHandle() {
      if (this.password.length <= 0) return false;
      this.password.pop();
      this.Span--;
    },
    pay() {
      if (this.password.length >= 6) {
        // console.log(this.password.join(""));
        this.$emit(
          "paypwd",
          this.password.join("")
          // parseInt(this.password.join(" ").replace(/\s/g, ""))
        );
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  //类名：隐藏到显示过程所需要的时间
  animation: bounce-in 0.5s;
}

.fade-leave-active {
  //类名：显示到隐藏过程所需要的时间
  animation: bounce-in 0.5s reverse; //reverse表示和隐藏到显示动画相反
}

@keyframes bounce-in {
  0% {
    @include transform(scale(0));
  }
  50% {
    @include transform(scale(1.5));
  }
  100% {
    @include transform(scale(1));
  }
}

.pay-tool {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  min-width: 320px;
  max-width: 640px;

  .hbbj {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 8;
    background: #000;
    opacity: 0.4;
    top: 0;
    left: 0;
  }

  .srzfmm_box {
    position: absolute;
    z-index: 10;
    background: #fff;
    width: 6rem;
    left: 50%;
    margin-left: -3rem;
    top: 10%;
    border-radius: 0.3rem;
    padding: 0.1rem;

    .clear_wl:after {
      content: ".";
      height: 0;
      visibility: hidden;
      display: block;
      clear: both;
    }

    .qsrzfmm_bt {
      font-size: 16px;
      overflow: hidden;
      position: relative;

      a {
        display: block;
        width: 10%;
        padding: 10px 0;
        text-align: center;
      }

      img.tx {
        width: 10%;
        padding: 10px 0;
      }

      span {
        padding: 15px 5px;
      }

      .zfClose {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        background: url(../../assets/img/icon/close.png) no-repeat center;
        background-size: 100% 100%;
        top: 50%;
        margin-top: -0.2rem;
        left: 0.2rem;
      }
    }

    .zfLink {
      float: right;
      margin-right: 0.32rem;
      padding: 0.1rem 0 0.3rem;
      color: blue;
      font-size: 0.28rem;
    }

    .pay-tool-inputs {
      width: 89%;
      margin: 10px auto;
      height: 0.8rem;
      overflow: hidden;
      border: 1px solid #bebebe;
      box-shadow: 0 0 1px #e6e6e6;
      display: flex;
      margin-bottom: 0.6rem;

      .item {
        width: 16.66666666%;
        height: 0.8rem;
        border-right: 1px solid #b9b9b9;
        line-height: 0.8rem;
        text-align: center;

        &:last-child {
          border-right: none;
        }

        .icon_dot {
          display: inline-block;
          width: 0.51111111rem;
          height: 0.51111111rem;
        }
      }
    }
  }

  .pay-tool-keyboard {
    position: absolute;
    z-index: 10;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #f5f5f5;

    .xiaq_tb {
      padding: 0.2rem 0;
      text-align: center;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #dadada;

      .xiaq_img {
        width: 0.6rem;
        height: 0.3rem;
        margin: auto;
        background: url(../../assets/img/icon/pulldown.jpg) no-repeat center;
        background-size: 100% 100%;
      }
    }

    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      li {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 33.33%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-right: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
        font-size: 0.4rem;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          border-top: 1px solid #eee;
        }

        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9),
        &:nth-child(12) {
          border-right: none;
        }

        &:nth-child(10),
        &:nth-child(11),
        &:nth-child(12) {
          border-bottom: none;
        }

        &:nth-child(10),
        &:nth-child(12),
        &:active {
          background-color: #eee;
          font-weight: bold;
        }

        &:nth-child(12):active {
          background-color: #fff;
        }
      }
    }
  }
}

.zfmmxx_shop {
  text-align: center;
  font-size: 12px;
  padding: 10px 0 0;
  overflow: hidden;

  .mz {
    font-size: 14px;
    float: left;
    width: 100%;
    padding: 0.1rem 0;
  }

  .zhifu_price {
    font-size: 24px;
    float: left;
    margin-bottom: 0.6rem;
    width: 100%;
  }
}

.ml5 {
  margin-left: 5px;
}
</style>
