<template>
  <div>
    <router-view v-cloak></router-view>
  </div>
</template>

<script>
import {mapState,} from 'vuex'

export default {
  data() {
    return {
      notHasUidLogin: false,
    };
  },
  created() {

  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      if (that.userInfo.uid && !that.userInfo.token) {
        that.notHasUidLogin = true;
      }
    })
  },
  computed: {
    ...mapState({
      userInfo: "user"
    })
  },

  methods: {
    loginSuccess() {
      this.notHasUidLogin = false;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
