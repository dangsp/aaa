<template>
  <footer class="flex justifySpace">
    <div class="a" @click="gonav('home')">
      <!-- <img v-show="ishome" src="@/assets/img/home.png" alt> -->
      <van-icon v-show="ishome" name="wap-home"   class="a_icon" size="16px"/>
      <van-icon v-show="!ishome" name="wap-home"  color="#fff" class="a_icon active"  size="16px"/>
      <!-- <img v-show="!ishome" src="@/assets/img/home_sel.png" alt> -->
      <span class="font-text" :class="{active:!ishome}">  {{ $t("shouye") }}</span>
    </div>
    <div class="a" @click="gonav('myCenter')">
      <!-- <img v-show="isme" src="@/assets/img/center.png" alt>
      <img v-show="!isme" src="@/assets/img/center_sel.png" alt> -->
      <van-icon v-show="isme" name="manager"  class="a_icon"  size="16px"/>
      <van-icon v-show="!isme" name="manager"  class="a_icon active" size="16px"/>
      <span class="font-text" :class="{active:!isme}">  {{ $t("me") }}</span>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    nav: String,
    required: true
  },
  data() {
    return {
      ishome: true,
      isTask: true,
      isasset: true,
      isme: true
    };
  },
  created() {
    this.gonav(this.nav);
  },
  methods: {
    gonav(key) {
      switch (key) {
        case "home":
          this.$router.push("/home");
          this.ishome = false;
          this.isasset = true;
          this.isTask = true;
          this.isme = true;
          break;
        case "money":
          this.$router.push("/money");
          this.ishome = true;
          this.isTask = false;
          this.isasset = true;
          this.isme = true;
          break;
        case "team":
          this.$router.push("/team");
          this.ishome = true;
          this.isasset = false;
          this.isTask = true;
          this.isme = true;
          break;
        case "myCenter":
          this.$router.push("/myCenter");
          this.ishome = true;
          this.isasset = true;
          this.isTask = true;
          this.isme = false;
          break;
        default:
      }
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 0.98rem;
  background-color: #000;
  border: none;
  color: rgba(255, 255, 255,0.5);
  position: absolute;
  bottom: 0;

  .a {
    -webkit-flex: 1;
    flex: 1;
    height: 100%;
    text-align: center;
    width: 25%;
    display: flex;
    flex-direction: column;
    padding-top: 2px;
    align-items: center;
    
    .a_icon{
      padding: 4px;
      border-radius: 50%;
      &.active{
        color: #fff;
        background-color: rgba(255, 255, 255,0.3);
      }
    }
    img {
      display: block;
      height: 0.44rem;
      margin: 0.1rem auto 0 auto;
    }

    .bet-ball-box {
      border-radius: 50%;
      border-bottom: 2px solid #f3f4f5;
      border-right: 2px solid #f3f4f5;
      border-left: 2px solid #f3f4f5;
      height: 1rem;
      width: 1rem;
      margin: -0.5rem auto 0px auto;
      position: relative;

      .bet-ball {
        height: 1rem;
        position: absolute;
        top: -10px;
        z-index: 0;
      }

      .bet-ball-text-box {
        position: absolute;
        z-index: 1;
        color: #fff;
        width: 100%;
        height: 100%;
        font-size: 0.25rem;

        .bet-ball-text-xbox {
          background-size: 100% 100%;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          padding: 2px 0;
          flex-direction: column;
          align-items: center;
        }
      }
    }

    .font-text {
      width: 100%;
      display: block;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      padding: 0 0.1rem;
      text-align: center;
      color: rgba(255, 255, 255,0.5);
      font-size: 0.2rem;
      margin-top: 0.05rem;
    }

    span.active {
      color: #fff;
    }
  }
}
</style>
