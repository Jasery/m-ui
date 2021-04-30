<template>
  <div>
    <el-submenu v-if="menu.submenus" v-bind="menu">
      <template slot="title">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </template>
      <m-submenu
        :menu="submenu"
        :key="submenu.index"
        v-for="submenu in menu.submenus"
      ></m-submenu>
    </el-submenu>
    <el-menu-item v-else v-bind="menu">
      <slot name="menu-item" v-bind="menu">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </slot>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MSubmenu",
  props: {
    menu: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
