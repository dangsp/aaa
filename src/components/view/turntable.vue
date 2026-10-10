<template>
    <div class="lucky_wheel">
      <header-top
        @backClick="handleBack"
        :title="$t('lunpan')"
        :back="true"
        :leftObj="{title:$t('zhongjiangjilu'),link:'/winningRecord'}"
        showBack
      ></header-top>
      <div class="lucky_wheel_Content">
        <img src="../../assets/bgzhuanpan.jpg" :style="{height:windowWidth* 1.27 + 'px'}" alt="">
        <LuckyWheel
        class="lucky_wheel_Content_lunpan"
          ref="myLucky"
          :width="windowWidth"
          :height="windowWidth"
          :prizes="prizes"
          :blocks="blocks"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback"
        ></LuckyWheel>
        <div class="lucky_wheel_Content_bg">
          <img src="../../assets/photo_2024-10-05_11-40-51.png" alt="">
        </div>
      </div>
  
      <div class="lucky_wheel_lunbo">
        <VerticalTextSlider></VerticalTextSlider>
      </div>
    
      <div class="lucky_wheel_illustrate">
        <div class="illustrate_title">Prize Description</div>
        <div class="prize-des"><div> {{$t("lottery_one")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_two")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_three")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_four")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_five")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_six")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_seven")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_eight")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_nine")}}</div></div>
        <div class="prize-des"><div> {{$t("lottery_ten")}}</div></div>
      </div>
      <!-- <div class="lucky_wheel_illustrate">
        <h4 class="illustrate_title">{{ $t("jianglishuoming") }}</h4>
        <div class="lucky_wheel_text">
          1. You can "draw" 1-2 times a week, just log in to the "draw" page and click.
        </div>
        <van-divider />
        <div class="lucky_wheel_text">
          2, Ordinary members [Complete 10 "Video Benefits"] can draw the lottery once a week
  VIP members [Complete 19 "Video Benefits"] can get 2 draws per week
        </div>
        <van-divider />
        <div class="lucky_wheel_text">
          3, All prizes can be picked up at the front desk.
  Receiving process: 【1】Verify membership platform ID and identity ID.
                     【2】 Provide delivery address and mobile phone number.
  Shipping process: Will be delivered by express [Serpost, Rappi, TiendaMIA, DHL, FedEx, UPS]
        </div>
        <van-divider />
        <div class="lucky_wheel_text">
          4.Exchange rules: 80% of the product price will be exchanged, for example: 1000X80%=800
          You will need to provide your bank information to   the receptionist.
        </div>
        <van-divider />
        <div class="lucky_wheel_text">
          Note: The right of final interpretation of this activity belongs to our company!
        </div>
      </div> -->
    </div>
  </template>
  
  <script>
  import Vue from "vue";
  import VerticalTextSlider from "./VerticalTextSlider/VerticalTextSlider.vue";
  import { Toast } from "vant";
  
  Vue.use(Toast);
  
  export default {
    name: "turntable",
    components: { VerticalTextSlider: VerticalTextSlider },
    data() {
      return {
        numArr: [],
        windowWidth: 390,
        //转盘背景
        blocks: [
          {
            padding: "20px", //可旋转区域与转盘边缘的距离
            background: "#fff", //转盘背景色

          },
        ],
        // 扇形数组
        prizes: [
          //单个扇形
          {
            //奖品文字
            fonts: [
              {
                text: this.$t("lottery_one"), //文字
                top: "25%", //文字距顶部距离
                fontColor: "#000", //文字颜色
                fontSize: "16px", //文字大小
                fontStyle: "微软雅黑", //字体
                fontWeight: "500", //加粗
                lineHeight: "16px", //行高
       
              },
            ],
          
            background: "#ea1d24", //扇形背景色
            range: 0, //当前prize.range/所有prize中range总和
          },
          {
            fonts: [
              { text: this.$t("lottery_two"), fontSize: "16px", top: "25%" },
            ],
           
            top: 1,
          },
          {
            fonts: [
              { text: this.$t("lottery_three"), fontSize: "16px", top: "25%" },
            ],
            background: "#ea1d24",
           
          },
          {
            fonts: [
              { text: this.$t("lottery_four"), fontSize: "16px", top: "25%" },
            ],
            
            background: "#f8d1e3",
          },
          {
            fonts: [{ text: this.$t("lottery_five"),fontSize: "16px",top: "25%",},],
          
            background: "#ea1d24",
          },
          {
            fonts: [
              { text: this.$t("lottery_six"), fontSize: "16px", top: "25%" },
            ],
          
            background: "#f8d1e3",
          },
          {
            fonts: [
              { text: this.$t("lottery_seven"), fontSize: "16px", top: "25%" },
            ],
          
            background: "#ea1d24",
          },
          {
            fonts: [
              {
                text: this.$t("lottery_eight"),
                fontSize: "16px",
                top: "25%",
              },
            ],
            background: "#f8d1e3",
          },
          {
            fonts: [
              {
                text: this.$t("lottery_nine"),
                fontSize: "16px",
                top: "25%",
              },
            ],
            background: "#ea1d24",
          },
          {
            fonts: [
              {
                text: this.$t("lottery_ten"),
                fontSize: "16px",
                top: "25%",
              },
            ],
            background: "#f8d1e3",
          },
        ],
  
        buttons: [
          {
            radius: "35%",
            // background: '#333',
            pointer: true,
            fonts: [
              {
                text: "", //文字
                top: "-25%", //文字距顶部距离
                fontColor: "#fff", //文字颜色
                fontSize: "16px", //文字大小
                fontStyle: "微软雅黑", //字体
                fontWeight: "500", //加粗
                lineHeight: "16px", //行高
              },
            ],
            //抽奖按钮图
            imgs: [
              {
                src: require("../../assets/photo_2024-10-05_11-42-57.png"), //图片url
                top: "-80%", //图片距顶部距离
                width: "80px", //图片宽
                height: "80px", //图片高
              },
            ],
          },
        ],
        currentPage: 1,
      };
    },
    created(){
      this.windowWidth = window.innerWidth 
  
    },
    mounted() {
      this.getLottery();
  
    },
    methods: {
      getLottery() {
        this.$http.user.getIsLottery().then((res) => {
          if (res.code == 200) {
            this.numArr = res.data.lottery_count;
          }
        });
      },
      // 点击抽奖按钮会触发star回调
      async startCallback() {
        const res = await this.$http.user.getIsLottery().then();
        if (res.code == 200) {
          this.numArr = res.data.lottery_count;
        } else {
          Toast(res.msg);
          return;
        }
        // 调用抽奖组件的play方法开始游戏
        this.$refs.myLucky.play();
        // 模拟调用接口异步抽奖
        setTimeout(() => {
          // 假设后端返回的中奖索引是0
          const index = this.numArr[1];
          // 调用stop停止旋转并传递中奖索引
          this.$refs.myLucky.stop(index);
        }, 3000);
      },
      // 抽奖结束会触发end回调
      endCallback(prize) {
        Toast(prize.fonts[0].text);

        this.$http.user
          .getSetIsLottery({
            lottery_prize: this.numArr[1] + 1,
            lottery_copywriting: prize.fonts[0].text,
          })
          .then((res) => {
            if(res == 500){
              Toast(res.msg);
            }
            this.numArr = [];
              this.getLottery();
          });
      },
      handleBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .lucky_wheel {
    background-color: #000;
    padding-bottom: 24px;
  }
  .lucky_wheel_lunbo {
    padding: 0 8px;
  }
  .lucky_wheel_Content {
    margin: 0 auto 12px;
    // height: 517px;
    background-size: 99% 96%;
    position: relative;
    img{
      width: 100%;
    }
    .lucky_wheel_Content_lunpan{
      position: absolute;
      top: 13px;
      left: 0;
      z-index: 2;
    }
    .lucky_wheel_Content_bg {
      position: absolute;
      top: 13px;
      width: 100%;
      pointer-events: none;
      z-index: 3;
  
      img{
        width: 100%;
        pointer-events: none;
      }
    }
  
  }
  /deep/ .van-swipe {
    height: 150px !important ;
  }
  /deep/.van-swipe-item {
    color: #000;
    line-height: 30px;
    padding: 0 8px;
    height: 30px !important ;
  
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      background-color: rgb(214, 168, 48);
    }
  }
  .lucky_wheel_illustrate {
    margin: 16px 8px 0;
    padding: 12px 8px ;
    background-color: rgb(214, 168, 48);
    border-radius: 15px;
    .prize-des{
      color: #000;
      margin:  12px 0;
    }
  }
  .illustrate_title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .lucky_wheel_text {
    text-indent: 2em;
  }
  
  .lucky_wheel_record{
    .lucky_wheel_record_content{
        color: #fff;
        margin: 12px 0;
        margin-left: 8px;
      .lucky_wheel_record_content_item{
        display: flex;
        justify-content: space-between;
  
      }
    }
  }
  </style>
  
  