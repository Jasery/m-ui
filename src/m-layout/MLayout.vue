<template>
  <div
    :class="['m-layout', { animate }]"
    :style="{ height: getNumStyle(height) }"
  >
    <header
      v-if="$slots.header"
      class="header-container"
      :class="{ 'hide-header': !hasHeader }"
      :style="headerStyle"
    >
      <slot name="header"></slot>
    </header>
    <aside
      v-if="$slots.aside || menus"
      class="aside-container"
      :class="{
        'hide-header': !hasHeader,
        'hide-aside': !hasAside,
        collapse: collapse
      }"
      :style="asideStyle"
    >
      <slot v-if="$slots.aside" name="aside"></slot>
      <div class="menu-wrapper" v-if="menus">
        <el-menu
          :default-active="menuDefaultActive"
          :collapse="collapse"
          :collapse-transition="animate"
          v-bind="menuConfig"
          @select="(index, indexPath) => $emit('menu-select', index, indexPath)"
        >
          <template v-for="menu in menus">
            <el-submenu v-if="menu.submenus" :key="menu.index" v-bind="menu">
              <template slot="title">
                <i v-if="menu.icon" :class="menu.icon"></i>
                <span slot="title">{{ menu.title }}</span>
              </template>
              <el-menu-item
                v-for="submenu in menu.submenus"
                :key="submenu.index"
                v-bind="submenu"
              >
                <i v-if="submenu.icon" :class="submenu.icon"></i>
                <span slot="title">{{ submenu.title }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="menu.index" v-bind="menu">
              <i v-if="menu.icon" :class="menu.icon"></i>
              <span slot="title">{{ menu.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <i
        v-if="showCollapseIcon"
        :class="['collapse-icon', 'el-icon-s-fold', { collapse }]"
        @click="$emit('update:collapse', !collapse)"
      ></i>
      <div class="toggle-tag" v-if="showAsideToggleTag">
        <div class="tag" @click="$emit('update:showAside', !showAside)">
          <i class="el-icon-arrow-left icon" :class="{ hide: !showAside }"></i>
        </div>
      </div>
    </aside>
    <main
      class="main-container"
      :class="{
        'hide-header': !hasHeader,
        'hide-aside': !hasAside,
        collapse: collapse
      }"
    >
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { isNumber } from "../utils";

export default {
  name: "MLayout",
  props: {
    height: {
      type: [Number, String],
      default: "100vh"
    },
    collapse: Boolean,
    showAside: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: true
    },
    themeColor: {
      type: String,
      default: "#373d41"
    },
    menus: Array,
    menuDefaultActive: String,
    menuConfig: {
      type: Object,
      default() {
        return {
          textColor: "#fff",
          backgroundColor: "#41485d"
        };
      }
    },
    showCollapseIcon: {
      type: Boolean,
      default: true
    },
    showAsideToggleTag: Boolean
  },
  data() {
    return {};
  },
  computed: {
    hasHeader() {
      return this.showHeader && !!this.$slots.header;
    },
    hasAside() {
      return this.showAside && !!(this.$slots.aside || this.menus);
    },
    asideStyle() {
      return {
        backgroundColor: this.themeColor
      };
    },
    headerStyle() {
      return {
        backgroundColor: this.themeColor
      };
    }
  },
  mounted() {},
  methods: {
    getNumStyle(val) {
      return isNumber(val) ? val + "px" : val;
    }
  }
};
</script>

<style lang="scss">
$asideWidth: 256px !default;
$asideCollapseWidth: 64px !default;
$headerHeight: 64px !default;
$colorBrand: #409eff !default;

.m-layout {
  position: relative;
  overflow: hidden;
  .header-container,
  .aside-container,
  .main-container {
    position: absolute;
  }
  &.animate {
    .header-container,
    .aside-container,
    .main-container {
      transition: all 0.3s ease-in-out;
    }
  }
  .header-container {
    width: 100%;
    height: $headerHeight;
    left: 0;
    right: 0;
    &.hide-header {
      top: -$headerHeight;
    }
  }
  .aside-container {
    width: $asideWidth;
    top: $headerHeight;
    left: 0;
    bottom: 0;
    z-index: 10;
    &.hide-header {
      top: 0;
    }
    &.hide-aside {
      left: -$asideWidth;
      &.collapse {
        left: -$asideCollapseWidth;
      }
    }
    &.collapse {
      width: $asideCollapseWidth;
    }
    .menu-wrapper {
      position: absolute;
      top: 0;
      width: 100%;
      bottom: 40px;
      overflow-x: hidden;
      overflow-y: auto;
      .el-menu {
        border: none;
      }
      .el-menu:not(.el-menu--collapse) {
        width: $asideWidth;
        box-sizing: border-box;
      }
    }
    .collapse-icon {
      position: absolute;
      left: 15px;
      bottom: 15px;
      color: #ccc;
      font-size: 18px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      &.collapse {
        transform: rotate(180deg);
      }
    }
    .toggle-tag {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 100%;
      width: 16px;
      display: flex;
      align-items: center;
      border-left: 1px solid transparent;
      transition: all 0.3s;
      &:hover {
        border-left: 1px solid $colorBrand;
        color: $colorBrand;
        .tag {
          color: $colorBrand;
          border-color: $colorBrand;
        }
      }
      .tag {
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-left: none;
        height: 45px;
        border-radius: 0 6px 6px 0;
        display: flex;
        align-items: center;
        background-color: white;
        .icon {
          transition: all 0.3;
          &.hide {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .main-container {
    top: $headerHeight;
    left: $asideWidth;
    right: 0;
    bottom: 0;
    overflow: auto;
    &.collapse {
      left: $asideCollapseWidth;
    }
    &.hide-header {
      top: 0;
    }
    &.hide-aside {
      left: 0;
    }
  }
}
</style>
