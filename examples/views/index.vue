<template>
  <m-layout
    :menus="menus"
    :menu-config="menuConfig"
    :menu-default-active="menuDefaultActive"
    :collapse.sync="asideCollapse"
    :account-info="accountInfo"
  >
    <template #header>
      header
    </template>
    <template v-slot:menu-item="menu">
      <i :class="menu.icon"></i>
      {{ menu.title }}
    </template>
    <router-view></router-view>
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

  watch: {
    $route: {
      handler() {
        const { path, meta } = this.$route;
        this.menuDefaultActive = meta?.activeMenu || path;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
