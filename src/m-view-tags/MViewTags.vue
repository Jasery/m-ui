<template>
  <div class="m-view-tags">
    <el-tabs
      :value="currentTab"
      type="border-card"
      :closable="closeable"
      @input="onTabChange"
      @tab-remove="onTabClose"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.meta.title || item.name"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "MViewTags",
  data() {
    return {
      currentTab: ""
    };
  },

  computed: {
    tabs() {
      return this.$store.state.cacheViews;
    },
    closeable() {
      return this.tabs.length > 1;
    }
  },

  watch: {
    $route: {
      handler() {
        this.currentTab = this.$route.name;
      },
      immediate: true
    }
  },

  methods: {
    onTabChange(name) {
      if (name == this.$route.name) {
        return;
      }
      let tab = this.tabs.find(t => t.name === name);
      this.$router.push(tab);
    },
    onTabClose(name) {
      if (this.tabs.length <= 1) {
        return;
      }
      let tabIndex = this.tabs.findIndex(t => t.name === name);
      if (name === this.$route.name) {
        if (tabIndex === this.tabs.length - 1) {
          this.$router.push(this.tabs[tabIndex - 1]);
        } else {
          this.$router.push(this.tabs[tabIndex + 1]);
        }
      }
      this.$store.commit("REMOVE_CACHE_VIEW", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-view-tags {
  ::v-deep .el-tabs__content {
    display: none;
  }
}
</style>
