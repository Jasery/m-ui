<template>
  <div class="m-scroll-nav">
    <div class="nav-conatiner" :style="navMenuStyle" :class="navClass">
      <el-menu
        :default-active="menuActive.toString()"
        :mode="navMode"
        @select="onMenuSelect"
      >
        <el-menu-item
          v-for="(nav, index) in navs"
          :key="index"
          :index="index.toString()"
          >{{ nav.title }}</el-menu-item
        >
      </el-menu>
      <slot name="nav"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { isNumber } from "../utils";
import _ from "lodash";

export default {
  name: "MScrollNav",
  props: {
    navs: {
      type: Array,
      default() {
        return [];
      }
    },
    navMode: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      }
    },
    sticky: {
      type: Boolean,
      default: true
    },
    stickyTop: {
      type: [Number, String],
      default: 0
    },
    navStyle: Object,
    navClass: [String, Object, Array],
    container: {
      type: String,
      default: ".main-container"
    }
  },
  data() {
    return {
      menuActive: 0,
      observers: [],
      ratios: [],
      scrolling: false
    };
  },

  computed: {
    navMenuStyle() {
      let style = { ...this.navStyle };
      if (this.sticky) {
        style.position = "sticky";
        style.top = isNumber(this.stickyTop)
          ? this.stickyTop + "px"
          : this.stickyTop;
      }
      return style;
    }
  },

  watch: {
    navs() {
      if (this.observers.length) {
        for (const ob of this.observers) {
          ob.disconnect();
        }
        this.observers.length = 0;
      }
      this.$nextTick(() => {
        this.initNavs();
      });
    },
    menuActive(val) {
      this.$emit("change", this.navs[val], val);
    }
  },

  mounted() {
    this.initNavs();
  },
  beforeDestroy() {
    for (const ob of this.observers) {
      ob.disconnect();
    }
  },
  methods: {
    onMenuSelect(index) {
      let target = this.targets[index];
      target?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      });
      this.menuActive = Number(index);
      clearTimeout(this.timeId);
      this.scrolling = true;
      this.timeId = setTimeout(() => {
        this.scrolling = false;
      }, 1000);
    },

    initNavs() {
      let defaultSlots = this.$slots.default.filter(s => s.tag);
      this.targets = [];
      for (const [index, nav] of this.navs.entries()) {
        let target = nav.target
          ? this.$el.querySelector(nav.target)
          : defaultSlots[index]?.elm;
        this.initObserver(target, index);
        this.targets[index] = target;
        this.ratios[index] = 0;
      }
    },

    initObserver(target, index) {
      let container = this.container
        ? document.querySelector(this.container)
        : null;
      let intersectionObserver = new IntersectionObserver(
        entries => {
          this.ratios[index] = entries[0].intersectionRatio;
          this.updateMenu();
        },
        {
          root: container,
          threshold: Array(10)
            .fill(1)
            .map((_, index) => 0.1 * (index + 1))
        }
      );
      intersectionObserver.observe(target);
      this.observers[index] = intersectionObserver;
    },

    updateMenu: _.throttle(function() {
      if (this.scrolling) {
        return;
      }
      let current = this.menuActive;
      if (current > 0) {
        let prev = current - 1;
        if (this.ratios[prev] > 0 && this.ratios[prev] > this.ratios[current]) {
          this.menuActive = prev;
        }
      }
      if (current < this.navs.length - 1) {
        let next = current + 1;
        if (this.ratios[next] > 0 && this.ratios[next] > this.ratios[current]) {
          this.menuActive = next;
        }
      }
    }, 20)
  }
};
</script>

<style lang="scss" scoped></style>
