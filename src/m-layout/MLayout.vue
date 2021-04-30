<template>
  <div
    :class="['m-layout', { animate, dark: isDarkMode, light: !isDarkMode }]"
    :style="{ height: getNumStyle(height) }"
  >
    <header
      v-if="$slots.header || accountInfo"
      class="header-container"
      :class="{ 'hide-header': !hasHeader }"
      :style="headerStyle"
    >
      <div v-if="showLogo" class="logo-container" @click="onLogoClick">
        <img class="logo-img" :src="logo" />
        <h1 class="title">{{ appName }}</h1>
      </div>
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div v-if="accountInfo" class="account-container">
        <span class="account-name">{{
          accountInfo && accountInfo.account
        }}</span>
        <el-button type="text" @click="onLogout">退出</el-button>
      </div>
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
          :background-color="menuBgColor"
          :text-color="menuTextColor"
          :active-text-color="menuActiveTextColor"
          v-bind="menuConfig"
          @select="(index, indexPath) => $emit('menu-select', index, indexPath)"
        >
          <template v-for="menu in menus">
            <m-submenu :menu="menu" :key="menu.index"></m-submenu>
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
import { isNumber, resolveResource } from "../utils";

import defaultLogo from "../assets/image/logo.png";
import MSubmenu from "./MSubmenu";

export default {
  name: "MLayout",
  components: { MSubmenu },
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
    theme: {
      type: String,
      default: "dark",
      validate(val) {
        return ["dark", "light"].includes(val);
      }
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
    showAsideToggleTag: Boolean,
    logo: {
      type: String,
      default: resolveResource(defaultLogo)
    },
    appName: {
      type: String,
      default: "后台名称"
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    accountInfo: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    hasHeader() {
      return (this.showHeader && !!this.$slots.header) || this.accountInfo;
    },
    hasAside() {
      return this.showAside && !!(this.$slots.aside || this.menus);
    },
    isDarkMode() {
      return this.theme === "dark";
    },
    asideStyle() {
      return {
        backgroundColor: this.isDarkMode ? this.themeColor : "#fff"
      };
    },
    headerStyle() {
      return {
        backgroundColor: this.themeColor
      };
    },
    menuBgColor() {
      return this.isDarkMode ? this.themeColor : "#fff";
    },
    menuTextColor() {
      return this.isDarkMode ? "#ccc" : "#555";
    },
    menuActiveTextColor() {
      return this.isDarkMode ? "#fff" : "#1890FF";
    }
  },
  mounted() {},
  methods: {
    getNumStyle(val) {
      return isNumber(val) ? val + "px" : val;
    },

    onLogoClick() {
      if (this.$router) {
        this.$router.push("/");
      }
    },

    onLogout() {
      this.$emit("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
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
    display: flex;
    .header {
      flex-grow: 1;
    }
    &.hide-header {
      top: -$headerHeight;
    }
    .logo-container {
      width: $asideWidth;
      display: flex;
      height: 100%;
      float: left;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .title {
        font-size: 18px;
        color: #fff;
        margin: 0 0 0 20px;
      }
    }
    .account-container {
      display: flex;
      height: 100%;
      float: left;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
      .account-name {
        margin-right: 10px;
        color: white;
      }
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
  &.dark {
    .aside-container {
      .menu-wrapper {
        .el-menu-item:hover {
          color: #fff !important;
        }
        .el-menu-item.is-active {
          background-color: #1890ff !important;
          border-right: 2px solid #fff;
        }
      }
      .collapse-icon:hover {
        color: #fff;
      }
    }
  }
  &.light {
    .aside-container {
      .menu-wrapper {
        .el-menu-item:hover {
          background-color: #e6f7ff !important;
        }
        .el-menu-item.is-active {
          background-color: #e6f7ff !important;
          border-right: 2px solid #1890ff;
        }
      }
      .collapse-icon:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
