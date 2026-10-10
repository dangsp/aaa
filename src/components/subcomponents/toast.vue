<template>

  <!-- 全局提示框 -->
  <div class="bg" v-show="visible">
    <div class="dialog-tips dialog-center">
      <div :class="!skin ? 'default' : 'white'">{{ message }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: "",
      skin: ""
    };
  }
};
</script>
<style lang="scss" scoped>
$bgColorfff: #fff;
$bgColor-black08: rgba(0, 0, 0, 0.8);
$colorfff: #fff;
$color333: #333;
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
}

.dialog-tips {
  width: 5.4rem;
  height: 1rem;
  font-size: 0.26rem;
  color: #fff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -2.6rem;
  margin-top: -0.75rem;
  border-radius: 0.2rem;

  div {
    line-height: 0.3rem;
    padding: 0.3rem;
    border: none;
    border-radius: 0.2rem;

    &.default {
      background-color: $bgColor-black08;
      color: $colorfff;
    }

    &.white {
      background-color: $bgColorfff;
      color: $color333;
    }
  }
}
</style>
