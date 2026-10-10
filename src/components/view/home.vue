<template>
  <div class="home">
    <header-top :title="$t('shouye')"></header-top>
    <div class="headcontent">
      <div class="swipe-wrapper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in bannerData" :key="index">
            <img :src="item.image" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="card-wrapper">
        <div class="card">
          <div class="title">
            {{ $t("on-screen") }}
          </div>
          <div class="content">
            <div class="content_1" v-if="airingPage.loading">
              <div
                class="content-item"
                @click="toDetail(item.id)"
                v-for="(item, index) in tableData"
                :key="index"
              >
                <div class="item-img">
                  <img :src="item.film_image" alt="" />
                </div>
                <div class="item-title">
                  {{ item.film_name }}
                </div>
              </div>
            </div>
            <div class="content_loading" v-else>
              <van-loading type="spinner" color="#1989fa" />
            </div>

            <div class="content_pagin">
              <van-pagination
                v-model="airingPage.currentPage"
                @change="changeAir"
                :total-items="airingPage.total"
                :show-page-size="5"
              >
                <template slot="prev-text">
                  <van-icon name="arrow-left" />
                </template>
                <template slot="next-text">
                  <van-icon name="arrow" />
                </template>
              </van-pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="card-wrapper">
        <div class="card">
          <div class="title">
            {{ $t("coming-soon") }}
          </div>
          <div class="content">
            <div class="content_1" v-if="comingPage.loading">
              <div class="content-item" @click='toDetail(item.id)' v-for="(item, index) in tableData1" :key="index">
                <div class="item-img">
                  <img :src="item.film_image" alt="">
                </div>
                <div class="item-title">
                  {{ item.film_name }}
                </div>
              </div>
            </div>

            <div class="content_loading" v-else>
              <van-loading type="spinner" color="#1989fa" />
            </div>
            <div class="content_pagin">
              <van-pagination v-model="comingPage.currentPage" @change="changeCom" :total-items="comingPage.total"
                :show-page-size="5">
                <template slot="prev-text">
                  <van-icon name="arrow-left" />
                </template>
                <template slot="next-text">
                  <van-icon name="arrow" />
                </template>
              </van-pagination>
            </div>
          </div>
        </div>
      </div> -->
      <copy-right></copy-right>
    </div>
    <footersub nav="home"></footersub>
    <!-- <div class="footer-turntable" @click="gotoRoute"></div> -->
  </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      page: 1,
      page_limit: 10,
      homeData: {},
      bannerData: [],
      tableData: [],
      tableData1: [],
      airingPage: {
        currentPage: 1,
        page_limit: 10,
        total: 100,
        loading: true,
      },
      comingPage: {
        currentPage: 1,
        page_limit: 10,
        total: 100,
        loading: true,
      },
    };
  },
  components: {
    footersub: footersub,
  },
  created() {},
  watch: {},
  mounted() {
    _ResizeContent.init();
    this.getBanner();
    this.getList();
    this.getConfig();
  },

  methods: {
    gotoRoute() {
      let token = getToken();
      console.log(token);
      if (token) {
        this.$router.push("/turntable");
      } else {
        this.$router.push("/login");
      }
    },
    getConfig() {
      this.$http.home.configWeb({}).then((res) => {
        if (res.code == 200) {
          var lanData1 = localStorage.getItem("clientData");
          if (!lanData1) {
            localStorage.setItem("clientData", JSON.stringify(res.data));
            location.reload();
          }
          localStorage.setItem("clientData", JSON.stringify(res.data));
        }
      });
    },
    toDetail(id) {
      this.$router.push({ path: "order", query: { id: id } });
    },
    getBanner() {
      this.$http.home
        .bannerList({
          page: 1,
          page_limit: 10,
        })
        .then((res) => {
          console.log("------ ~ res bannerData =>", res);
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.bannerData = res.data;
        });
    },
    getList() {
      this.getAiring();
      this.getComing();
    },
    getAiring() {
      this.airingPage.loading = false;
      this.$http.home
        .filmList({
          page: this.airingPage.currentPage,
          page_limit: this.airingPage.page_limit,
          is_type: 1,
        })
        .then((res) => {
          console.log("------ ~ res =>", res);

          this.airingPage.total = res.data.total;
          this.airingPage.loading = true;
          console.log(
            "------ ~ this.airingPage.currentPage * 10 > res.data.total =>",
            this.airingPage.currentPage * 1 > res.data.total
          );
          if (this.airingPage.currentPage * 1 > res.data.total) {
            return;
          } else {
            this.tableData = res.data.items;
          }
        });
    },
    getComing() {
      this.comingPage.loading = false;
      this.$http.home
        .filmList({
          page: this.comingPage.currentPage,
          page_limit: this.comingPage.page_limit,
          is_type: 2,
        })
        .then((res) => {
          console.log(res);
          this.comingPage.total = res.data.total;
          this.comingPage.loading = true;
          if (this.comingPage.currentPage * 10 > res.data.total) {
            return;
          } else {
            this.tableData1 = res.data.items;
          }
        });
    },
    changeAir(value) {
      this.airingPage.currentPage = value;
      this.getAiring();
    },
    changeCom(value) {
      this.comingPage.currentPage = value;
      this.getComing();
    },
  },
};
</script>

<style lang="scss" scoped>
.content_loading {
  width: 100%;
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 30px;
}

.content_pagin {
  flex: 1;
  padding: 8px 0;
}

/deep/ .van-pagination__prev {
  width: 60px;
  flex-shrink: 0;
}

/deep/ .van-pagination__next {
  width: 60px;
  flex-shrink: 0;
}

/deep/ .van-pagination__item {
  height: 25px;
  font-size: 12px;
  background-color: rgba($color: #fff, $alpha: 0.7);
  color: #000;
  flex-grow: 1;
}

/deep/ .van-pagination__item--active {
  background-color: #1989fa;
  background-color: rgba($color: #1989fa, $alpha: 0.8);
}

.footer-turntable {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 0px;
  bottom: 100px;
  z-index: 100;
  background-image: url(../../assets/turntable.png);
  background-size: 100% 100%;
}

.headcontent {
  margin-bottom: 50px;
  // background-color: #0b0019;
  background-color: #fff;
  padding-top: 4px;

  .swipe-wrapper {
    padding: 0 0.24rem;
    margin-bottom: 0.24rem;
  }

  .my-swipe .van-swipe-item {
    height: 2.16rem;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .card-wrapper {
    margin-bottom: 0.24rem;
    overflow: hidden;
    padding: 0 0.24rem;

    .card {
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;

      .title {
        font-size: 0.32rem;
        font-weight: bold;
        color: #000;
        padding: 0.32rem 0.24rem 0.24rem;
      }

      .content {
        padding: 0 0.24rem;

        .content_1 {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .content-item {
          width: 48%;
          margin-bottom: 0.24rem;

          .item-img {
            height: 3.5rem;
            border-radius: 6px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .item-title {
            width: 100%;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: clip;
            white-space: nowrap;
            font-size: 0.24rem;
            font-weight: bold;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
