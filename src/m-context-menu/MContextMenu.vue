<template>
  <div class="m-context-menu" @contextmenu.prevent="onContextMenu">
    <slot></slot>
    <el-menu
      class="menu"
      mode="horizontal"
      @select="onMenuSelect"
      :style="menuStyle"
      ref="menu"
    >
      <el-submenu index="/">
        <m-context-menu-item
          v-for="(menu, index) in menus"
          :key="index"
          :menu="menu"
        ></m-context-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import MContextMenuItem from "./MContextMenuItem.vue";

export default {
  name: "MContextMenu",
  components: { MContextMenuItem },
  props: {
    menus: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      menuStyle: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {},
  methods: {
    onContextMenu(e) {
      this.menuStyle = {
        left: e.clientX + "px",
        top: e.clientY + "px"
      };
      this.$nextTick(() => {
        this.$refs.menu.openMenu("/", ["/"]);
      });
    },
    onMenuSelect(command) {
      this.$emit("command", command);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-context-menu {
  display: inline-block;
  ::v-deep .menu {
    border: none;
    position: fixed;
    .el-submenu__title {
      display: none;
    }
  }
}
</style>
