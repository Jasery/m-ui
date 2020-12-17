<template>
  <m-layout
    :menus="menus"
    :menu-config="menuConfig"
    :menu-default-active="menuDefaultActive"
    :collapse.sync="asideCollapse"
    :account-info="accountInfo"
  >
    <template #header> header </template>
    <div>
      <m-view-tags></m-view-tags>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cacheViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </m-layout>
</template>

<script>
const menus = [
  {
    index: "/home",
    title: "主页",
    icon: "el-icon-s-home"
  },
  {
    index: "/table",
    title: "表格",
    icon: "el-icon-s-order"
  },
  {
    index: "/form",
    title: "表单",
    icon: "el-icon-document"
  }
];
export default {
  data() {
    return {
      menus,
      menuDefaultActive: "",
      menuConfig: {
        router: true
      },
      asideCollapse: false,
      accountInfo: {
        account: "root"
      }
    };
  },
  computed: {
    cacheViews() {
      return this.$store.state.cacheViews.map(v => v.name);
    }
  },

  watch: {
    $route: {
      handler() {
        const { path, meta, name } = this.$route;
        this.menuDefaultActive = meta?.activeMenu || path;
        if (name) {
          this.$store.commit("ADD_CACHE_VIEW", this.$route);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
