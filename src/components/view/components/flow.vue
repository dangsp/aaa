<template>
  <div class="clickFarm">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :loosing-text="$t('releaseToRefresh')"
      :loading-text="$t('inTheLoad')"
    >
      <van-empty v-if="isEmpty" :description="$t('noContent')" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :loading-text="$t('inTheLoad')"
        :immediate-check="false"
        :finished-text="$t('noMoreData')"
        @load="onLoad"
      >
        <div class="list">
          <div v-for="(item, index) in list" :key="index">
            <div class="data-box">
              <div class="data-item">
                <div class="data-left">
                  <div>{{ $t("change") }}</div>
                </div>
                <div class="data-right">
                  {{ item.balance }}
                </div>
              </div>
              <div class="data-item">
                <div class="data-left">
                  <div>{{ $t("changeafter") }}</div>
                </div>
                <div class="data-right">
                  {{ item.later_balance }}
                </div>
              </div>
              <div class="data-item">
                <div class="data-left">
                  <div>{{ $t("types") }}</div>
                </div>
                <div class="data-right">{{ item.is_status_text }}</div>
              </div>
              <div class="data-item">
                <div class="data-left">
                  <div>{{ $t("statuss") }}</div>
                </div>
                <div class="data-right">
                  {{ item.is_type_text }}
                </div>
              </div>
              <div class="data-item">
                <div class="data-left">
                  <div>{{ $t("times") }}</div>
                </div>
                <div class="data-right">
                  {{ item.add_time }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "lowerLevel",
  data() {
    return {
      page: 1,
      limit: 20,
      total: 0,
      isEmpty: false,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      type: 2, //类型 1刷单收益 2下级收益
    };
  },
  mounted() {
    _ResizeContent.init();
    this.onLoad();
  },
  methods: {
    onRefresh() {
      this.page = 1;
      let page = this.page;
      let limit = this.limit;
      let type = this.type;
      this.list = [];
      this.$http.home
        .userIndex({ page, limit, type, is_deposit: 1 })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.loading = false;
          let result = res.data;
          this.total = result.total;
          this.list = result.items;
          let all = page * limit;
          this.page = this.page + 1;
          if (all >= result.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        })
        .finally(() => {
          this.isLoading = false;
          if (this.list.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        });
    },
    onLoad() {
      let page = this.page;
      let limit = this.limit;
      let type = this.type;
      this.$http.home
        .userIndex({ page, limit, type, is_deposit: 1 })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return;
          }
          this.loading = false;
          let result = res.data;
          if (this.page == 1) {
            this.list = result.items;
          } else {
            this.list = this.list.concat(result.items);
          }
          this.page = this.page + 1;
          this.total = result.total;
          let all = page * limit;
          if (all >= result.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        })
        .finally(() => {
          this.isLoading = false;
          if (this.list.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.data-box {
  padding: 0.24rem;
  margin-top: 0.24rem;
  border-radius: 6px;
  overflow: hidden;
  background-color: #000;

  .data-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    font-weight: 500;
    color: #999999;
    padding: 0.14rem 0;

    .data-right {
      color: #333333;
    }
  }
}
</style>
