<template>
  <!-- 无缝滚动效果 -->
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{'animate-up': animateUp}">
      <li v-for="(item, index) in list" :key="index">
        <span>{{item.nameID}}</span> <span>{{item.prize}}</span>
        </li>
    </ul>
  </div>
  

  </template>
  <script>
export default {
  name: "marquee-up",
  data() {
    return {
      animateUp: false,
      timer: null,
      list:[],
      kaitou:{}
    }
  },
  mounted() {
   this.kaitou= window.webConfig.kaitou
    for (let i = 0; i < this.kaitou.num; i++) {
      this.list.push(this.randomData()) 
    }
    this.timer = setInterval(this.scrollAnimate, 1500);
  },

  methods: {
    scrollAnimate() {
      this.animateUp = true
      setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        this.animateUp = false
      }, 500)
    },
    randomData() {
      let arr = this.kaitou.arr
      let text =arr[Math.floor(Math.random() * 5)] ;

      for (let i = 0; i < 4; i++) {
        if (i == 0) {
          text = text + "*******";
        }
        text = text + Math.floor(Math.random() * 10);
      }
      let textPrize = [
        this.$t("lottery_one"),
        this.$t("lottery_two"),
        this.$t("lottery_three"),
        this.$t("lottery_four"),
        this.$t("lottery_five"),
        this.$t("lottery_six"),
        this.$t("lottery_seven"),
        this.$t("lottery_eight"),
      ];
      return {
        nameID: text,
        prize: textPrize[ Math.floor(Math.random() * 7)]
      }
    },
  },
  destroyed() {
    clearInterval(this.timer)
  }
};


  </script>
<style lang="scss">
.marquee-wrap  {
  height: 150px;
  border-radius: 10px;
  background: rgb(214, 168, 48);
  margin: 0 auto;
  overflow: hidden;
  
  .marquee-list {
    li {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 20px;
      list-style: none;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .animate-up {
    transition: all 0.5s ease-in-out;
    transform: translateY(-40px);
  }
}


  </style>