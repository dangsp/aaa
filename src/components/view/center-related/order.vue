<template>
  <div class="home">
    <header-top
      @backClick="handleBack"
      :title="$t('movieDetail')"
      :back="true"
      showBack
    ></header-top>
    <div class="time">{{ periods.current.task_id }}</div>
    <div class="time">{{ countdown }}</div>
    <div class="time previous_time">{{ periods.previous.task_id }}</div>
    <div class="time previous_time">
      {{ periods.previous.bigSmll_text }}/{{ periods.previous.oddEven_text }}
    </div>

    <div class="headcontent">
      <div class="bg-detail">
        <div class="movie">
          <div class="movie-img">
            <img :src="detail.film_image" alt="" />
          </div>
          <div class="movie-detail">
            <div class="movie-title">{{ detail.film_name }}</div>
            <div class="movie-wrapper">
              <div class="movie-item">
                {{ $t("xiangkan") }}:{{ detail.look_num }}
              </div>
              <div class="movie-item">
                {{ $t("time") }}:{{ detail.duration }}
              </div>
              <div class="movie-item">
                {{ $t("release-date") }}:{{ detail.show_time }}
              </div>
              <div class="movie-item">
                {{ $t("director") }}:{{ detail.director }}
              </div>
              <div class="movie-item">{{ $t("type") }} :{{ detail.type }}</div>
              <div class="movie-item">
                {{ $t("publisher") }} :{{ detail.publisher }}
              </div>
              <div class="movie-item">
                {{ $t("manufacturingcompany") }} :{{ detail.manufacturer }}
              </div>
              <div class="movie-item">
                {{ $t("writer") }} :{{ detail.scriptwriter }}
              </div>
            </div>
          </div>
        </div>
        <div class="bug">
          <div class="title">{{ $t("buy") }}</div>
          <div class="bug-wrapper">
            <div class="bug-item">
              <div class="bug-item-label">{{ $t("goumai") }}</div>
              <div class="bug-item-input">
                <van-stepper integer min="1" v-model="form.count" step="1" />
              </div>
            </div>
            <div class="bug-item">
              <!--              <div class="bug-item-label">是否包场</div>-->
              <div class="bug-item-input">
                <!--                <van-checkbox v-model="form.is_involve" shape="square"> <span class="bug-item-input">{{ $t("baochang") }}</span></van-checkbox>-->
                <div class="ck">
                  <div
                    :class="{ cur: form.is_involve.includes('da') }"
                    @click="setIs_involve('da')"
                  >
                    {{ $t("da") }}
                  </div>
                  <div
                    :class="{ cur: form.is_involve.includes('xiao') }"
                    @click="setIs_involve('xiao')"
                  >
                    {{ $t("xiao") }}
                  </div>
                  <div
                    :class="{ cur: form.is_involve.includes('dan') }"
                    @click="setIs_involve('dan')"
                  >
                    {{ $t("dan") }}
                  </div>
                  <div
                    :class="{ cur: form.is_involve.includes('shuang') }"
                    @click="setIs_involve('shuang')"
                  >
                    {{ $t("shuang") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="actor" v-if="detail.details.length > 0">
          <div class="title">{{ $t("cast-member") }}</div>
          <div class="actor-content">
            <div
              class="actor-item"
              v-for="(item, index) in detail.details"
              :key="index"
            >
              <div class="actor-item-img">
                <img :src="item.image" alt="" />
              </div>
              <div class="actor-item-title">
                {{ item.role_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="zhanghu">
          <div>{{ $t("zhanghu") }}:</div>
          <div>{{ balance }}</div>
        </div>
            <div>{{$t("zonge")}}：{{ form.count*this.form.is_involve.length }}</div>
        <div class="btn-wrapper">
          <van-button
            type="info"
            :loading="btnloading"
            v-if="btnBool"
            @click="onsubmit()"
            block
          >
            {{ $t("ok") }}
          </van-button>
          <div class="line" v-if="btnBool"></div>
          <van-button
            class="btn-wrapper_dis"
            @click="handleBack"
            type="info"
            block
          >
            {{ $t("cancel") }}
          </van-button>
        </div>
        <div class="movie-info">
          <div class="title">{{ $t("plot-introduction") }}</div>
          <div class="movie-info-detail">
            {{ detail.story }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
export default {
  data() {
    return {
      id: "",
      detail: { details: [] },
      form: {
        count: 1,
        is_involve: [],
      },
      btnBool: true,
      btnloading: false,
      countdown: "00:00:00",
      periods: {},
      balance: 0,
      timer: null,
    };
  },
  components: {},
  created() {},
  watch: {
    $route(to, from) {
      this.getDetail();
    },
  },
  mounted() {
    _ResizeContent.init();
    this.getDetail();
    this.getCountdown();
    this.getBalanceFun();
  },
  unmounted() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    onsubmit() {
      this.btnloading = true;
      let id = this.$route.query.id;
      let { count, is_involve } = this.form;
      let task_id = this.periods.current.task_id;
      this.$http.home
        .orderBuy({ id, buy_num: count, is_involve, task_id })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.btnBool = false;
          this.$toast(this.$t("success"));
          this.btnloading = false;
        })
        .catch((err) => {
          this.$toast(err.msg);
        });
    },
    getDetail() {
      let id = this.$route.query.id;
      this.id = id;
      this.$http.home
        .getDetails({ id })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.detail = res.data;
        })
        .catch((err) => {
          this.$toast(err.msg);
        })
        .finally(() => {});
    },
    setIs_involve(value) {
      if (this.form.is_involve.includes(value)) {
        this.form.is_involve = this.form.is_involve.filter(
          (item) => item !== value
        );
      } else {
        this.form.is_involve.push(value);
      }
    },
    getBalanceFun() {
      this.$http.home.getBalance().then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.balance = res.data.balance;
      });
    },
    getCountdown() {
      this.$http.order.countdown().then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        this.periods = res.data;
        let diff = dayjs(res.data.current.end_time * 1000).diff(dayjs());
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
          diff -= 1000;
          if (diff <= 0) {
            /* 已结束 */
            clearInterval(this.timer);
            this.getCountdown();
            return;
          }
          const d = dayjs.duration(diff);
          const pad = (n) => String(n).padStart(2, "0");
          const hours = Math.floor(d.asHours());
          this.countdown = `${pad(hours)}:${pad(d.minutes())}:${pad(
            d.seconds()
          )}`;
        }, 1000);
      });
    },
  },
};
</script>
<style lang="scss">
.van-stepper__minus,
.van-stepper__plus {
  display: none;
}
.van-stepper__input {
  width: 60px !important;
}
</style>
<style lang="scss" scoped>
.time {
  text-align: center;
  background: #df3035;
  font-weight: bold;
  color: #fff;
}
.previous_time {
  background: #2561ec;
}
.headcontent {
  .bg-detail {
    background: rgb(204, 86, 28);
    background: #fff;
    padding: 0.3rem 0.24rem;
    color: #000;

    .zhanghu {
      display: flex;
    }
    .movie {
      display: flex;

      .movie-title {
        margin-bottom: 0.24rem;
      }
    }

    .movie-img {
      width: 2rem;
      height: 2.88rem;
      border-radius: 6px;
      overflow: hidden;
      flex-basis: 2rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .movie-detail {
      padding-left: 0.24rem;
      flex: 1;
    }

    .movie-wrapper {
      //display: flex;

      .movie-item {
        display: inline-block;
        margin-right: 0.24rem;
        font-size: 0.24rem;
        font-weight: 500;
        color: #000;
      }
    }

    .title {
      font-size: 0.32rem;
      font-weight: bold;
      color: #000;
      margin-bottom: 0.24rem;
    }

    .movie-info {
      margin-top: 0.5rem;

      .movie-info-detail {
        font-size: 0.28rem;
        font-weight: 500;
        color: #000;
      }
    }

    .actor {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }

    .actor-content {
      overflow-x: scroll;
      display: flex;
      flex-wrap: wrap;
      gap: 0.2rem 0.5rem;
      .actor-item {
        width: 50px;
        // margin-right: 0.24rem;
        overflow: hidden;
        .actor-item-img {
          border-radius: 6px;
          // width: 3rem;
          // height: 4rem;
          width: 50px;
          height: 50px;

          img {
            border-radius: 6px;
            width: 50px;
            height: 50px;
          }
        }

        .actor-item-title {
          text-align: center;
          margin-top: 10px;
          font-size: 0.24rem;
          font-weight: bold;
          color: #000;
        }
      }
    }

    .bug {
      margin-top: 0.5rem;

      .bug-wrapper {
        .bug-item {
          font-size: 0.28rem;
          font-weight: 500;
          color: #000;
          display: flex;
          margin-bottom: 0.24rem;

          .bug-item-label {
            margin-right: 0.24rem;
            font-size: 0.28rem;
            font-weight: 500;
            color: #000;
          }

          .bug-item-input {
            font-size: 0.28rem;
            font-weight: 500;
            color: #000;
          }

          //    'da' => "Matinee",
          // 'xiao' => "Evening",
          // 'dan' => "Front row",
          // 'shuang' => "Back row",

          .ck {
            display: flex;
            justify-content: space-between;
            margin-top: 0.24rem;
            gap: 0.1rem;

            div {
              height: 0.6rem;
              line-height: 0.6rem;
              background: #fff;
              border: 1px solid #df3035;
              border-radius: 0.12rem;
              padding: 0 0.24rem;
              color: #df3035;

              &.cur {
                background: #df3035;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

  .btn-wrapper {
    padding: 0.24rem;
    display: flex;
    /deep/ .van-button {
      background-color: rgba(0, 0, 0, 0.2);
      border-style: none;
      color: #000;
    }
    .btn-wrapper_dis {
      background-color: rgba(0, 0, 0, 0.5) !important;
    }
    .line {
      width: 0.4rem;
    }
  }
}
</style>
