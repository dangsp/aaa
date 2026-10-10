<template>
  <div class="content-wrapper">
    <header-top :title="title" :back="true" :showBack="true"></header-top>
    <div class="content" v-html="content"></div>
  </div>
</template>
<script>
export default {
  name: "cookie",
  data() {
    return {
      id: "",
      content: "",
      title: "",
    };
  },
  mounted() {
    _ResizeContent.init();
    this.getDetail();
  },
  methods: {
    getDetail() {
      let { key } = this.$route.query;
      switch (key) {
        case "help":
          this.title = this.$t("assist");
          break;
        case "about_us":
          this.title = this.$t("about-us");
          break;
        case "rotten_tomatoes":
          this.title = this.$t("tomatometer");
          break;
        case "permission":
          this.title = this.$t("permission");
          break;
        case "privacy_policy":
          this.title = this.$t("privacy-policy");
          break;
        case "terms_and_policies":
          this.title = this.$t("terms-and-conditions");
          break;
        case "cookie_notice":
          this.title = this.$t("cookie-notification");
          break;
        case "customer_url":
          this.title = this.$t("customer");
          break;
      }
      this.$http.home.getFootConfig({ key }).then((res) => {
        if (res.code == 200) {
          this.content = res.data.val;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.content-wrapper {
  overflow-y: auto;
  height: 100vh;
}

.content {
  margin: 0 auto 50px;
  color: #595959;
  font-size: 15px;
  line-height: 2;
  padding: 0.24rem;
  font-weight: 400;

  .content-title {
    font-weight: bold;
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #595959;
    font-size: 15px;
    line-height: 2;
    font-weight: 400;
  }

  .title {
    font-size: 20px;
    padding: 0 0 0 5px;
    margin: 10px 0;
  }
}
</style>
