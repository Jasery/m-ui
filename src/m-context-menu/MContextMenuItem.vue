<template>
  <el-submenu
    v-if="menu.menus"
    :index="menu.command || ''"
    :disabled="menu.disabled"
    :class="['m-context-menu-item', { line: menu.line }]"
  >
    <template slot="title">
      <i v-if="menu.icon" :class="menu.icon"></i>
      <span slot="title">{{ menu.title }}</span>
    </template>
    <m-context-menu-item
      v-for="(subMenu, index) in menu.menus"
      :key="index"
      :menu="subMenu"
    ></m-context-menu-item>
  </el-submenu>
  <el-menu-item
    v-else
    :index="menu.command"
    :disabled="menu.disabled"
    :class="['m-context-menu-item', { line: menu.line }]"
  >
    <i v-if="menu.icon" :class="menu.icon"></i>
    <span slot="title">{{ menu.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MContextMenuItem",
  props: {
    menu: Object
  }
};
</script>

<style lang="scss" scoped>
.m-context-menu-item {
  &.line {
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>
