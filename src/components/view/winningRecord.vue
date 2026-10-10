<template>
  <div class="winningr_ecord">
    <header-top
      :title="$t('zhongjiangjilu')"
      :back="true"
      showBack
    ></header-top>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="no Data"
      loading-text="loading"
      @load="onLoad"
    >
        <div  class="winningr_ecord_item" v-for="(item, index) in list" :key="index">
          <div>{{ item.add_time }}</div>
          <div>{{ item.lottery_copywriting }}</div>
      </div>
   
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageSize: {
        page: 1,
        page_limit: 10,
        total: 0,
      },
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.$http.user.getMylottery(this.pageSize).then((res) => {
        console.log(res);
        res.data.items.forEach(item => {
            this.list.push(item);
        });
        
        this.pageSize.total = res.data.total;
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.pageSize.total) {
          this.finished = true;
        }else{
            this.pageSize.page =  this.pageSize.page + 1
        }
      });
    },
 
  },
};
</script>

<style lang="scss" scoped>
.winningr_ecord{
.winningr_ecord_item{
    padding: 12px 24px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    background: #d6a830;
    border-top: 1px solid #eee;
    div{
        flex: 1;
    }
}
}
</style>