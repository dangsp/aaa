<template>
  <div class="header">
    <!-- bgColorfff -->
    <template v-if="!showBack">
      <div class="header_top1">
        <div class="header_top1_logo">
          <div>{{ $t("webName") }}</div>
        </div>
        <div class="header_top1_login" v-if="tokenBool">
          <div @click="clicklogin(1)">{{ $t("Register") }}</div>
          <!-- <div  @click="clicklogin(0)">{{ $t('disembark') }}</div> -->
        </div>
      </div>
      <!-- <div class="center color333 one-center">{{ title }}</div> -->
    </template>
    <template v-else>
      <div class="leading" @click="toBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="center header_center" @click="leftBack">{{ title }}</div>
      <div class="actions" @click="leftBack">
        {{ leftObj.title ? leftObj.title : "" }}
      </div>
    </template>
  </div>
</template>

<script>
import { getToken } from "../../utils/auth";
export default {
  name: "hander",
  props: {
    title: {
      type: String,
      required: true,
    },
    showBack: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false,
    },
    leftObj: {
      Object: {
        title: "",
        link: "",
      },
      default: false,
    },
  },
  data() {
    return {
      tokenBool: true,
    };
  },
  mounted() {
    let token = getToken();
    if (token) {
      console.log(1321, token);
      this.tokenBool = false;
    }
  },
  methods: {
    toBack() {
      this.$router.go(-1);
      // if (this.back) {
      //   this.$emit("backClick", "");
      // } else {
      //   this.$router.go(-1);
      // }
    },
    clicklogin(bool) {
      if (bool) {
        this.$router.push("/register");
      } else {
        this.$router.push("/login");
      }
    },
    leftBack() {
      if (this.leftObj.link) {
        this.$router.push(this.leftObj.link);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 1.2rem;
  line-height: 0.88rem;
  text-align: center;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.29rem;
  font-weight: 700;
  background: #fff;
  border-bottom: 1px solid #000;

  .header_center {
    color: #000;
    line-height: 60px;
  }
  .leading {
    color: #000;
    font-size: 0.4rem;
    display: flex;
    align-items: center;
    width: 1rem;

    img {
      height: 0.3rem;
    }
  }

  .center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    font-size: 0.36rem;
    font-weight: bold;
    max-width: 60%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .one-center {
    max-width: 100%;
    width: 100%;
    text-align: center;
    margin-left: 0;
  }

  .header_top1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    color: #000;
    .header_top1_logo {
      display: flex;
      align-items: center;
      img {
        height: 30px;
        width: 50px;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 8px;
      }
      div {
        font-weight: 700;
        font-size: 18px;
      }
    }
    .header_top1_login {
      display: flex;
      align-items: center;
      div {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0;
        line-height: 20px;
        // &:nth-child(1){
        //   background: #fff;
        //   color: #0b0019;
        //   padding: 6px 8px;
        //   border-radius: 8px;
        //   margin-right: 8px;
        // }
      }
    }
  }
}
</style>
