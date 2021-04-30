<template>
  <div>
    <el-submenu v-if="menu.submenus" v-bind="menu">
      <template slot="title">
        <slot name="menu-item" v-bind="menu">
          <i v-if="menu.icon" :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </slot>
      </template>
      <m-submenu
        :menu="submenu"
        :key="submenu.index"
        v-for="submenu in menu.submenus"
      >
        <template #menu-item="menuItemConfig">
          <slot name="menu-item" v-bind="menuItemConfig"></slot>
        </template>
      </m-submenu>
    </el-submenu>
    <el-menu-item v-else v-bind="menu">
      <template slot="title">
        <slot name="menu-item" v-bind="menu">
          <i v-if="menu.icon" :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </slot>
      </template>
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
