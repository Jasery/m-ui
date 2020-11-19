<template>
  <div class="m-exception">
    <div class="img-wrapper">
      <img class="err-img" :src="displayImg" :alt="displayTitle" />
    </div>
    <div class="content">
      <h1 :class="{ browser: isBrowser }">{{ displayTitle }}</h1>
      <div class="desc">
        {{ displayDesc }}
      </div>
      <div class="browsers" v-if="isBrowser">
        <div v-for="b in browsers" :key="b.name" class="browser-item">
          <a :href="b.url" target="_blank">
            <img :src="b.icon" :alt="b.name" />
          </a>
          <span>{{ b.name }}</span>
        </div>
      </div>
      <div class="actions">
        <el-button
          v-if="!$slots.default && !isBrowser"
          type="primary"
          @click="onClick"
        >
          {{ btnText }}
        </el-button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import img403 from "../assets/image/403.svg";
import img404 from "../assets/image/404.svg";
import img500 from "../assets/image/500.svg";
import browser from "../assets/image/browser.svg";
import chrome from "../assets/image/chrome.svg";
import edge from "../assets/image/edge.svg";
import safari from "../assets/image/safari.svg";
import firefox from "../assets/image/firefox.svg";
import { resolveResource } from "../utils";

const config = {
  403: {
    img: resolveResource(img403),
    title: "403",
    desc: "抱歉，你无权访问该页面"
  },
  404: {
    img: resolveResource(img404),
    title: "404",
    desc: "抱歉，你访问的页面不存在"
  },
  500: {
    img: resolveResource(img500),
    title: "500",
    desc: "抱歉，服务器出错了"
  },
  browser: {
    img: resolveResource(browser),
    title: "浏览器版本不兼容",
    desc: "浏览器版本过低，为避免可能存在的安全隐患，推荐升级以下浏览器"
  }
};
const browsers = [
  {
    name: "Chrome",
    icon: resolveResource(chrome),
    url: "https://www.google.com/intl/zh-CN/chrome/"
  },
  {
    name: "Edge",
    icon: resolveResource(edge),
    url: "https://www.microsoft.com/zh-cn/edge"
  },
  {
    name: "Firefox",
    icon: resolveResource(firefox),
    url: "https://www.firefox.com.cn/"
  },
  {
    name: "Safari",
    icon: resolveResource(safari),
    url: "https://support.apple.com/zh_CN/downloads/safari"
  }
];

export default {
  name: "MException",
  props: {
    type: {
      type: String,
      default: "500",
      validate(val) {
        return ["403", "404", "500", "browser"].includes(val);
      }
    },
    title: String,
    desc: String,
    img: String,
    redirect: {
      type: String,
      default: "/"
    },
    btnText: {
      type: String,
      default: "返回首页"
    }
  },
  data() {
    return {
      browsers
    };
  },
  computed: {
    displayTitle() {
      return this.title || config[this.type].title;
    },
    displayDesc() {
      return this.desc || config[this.type].desc;
    },
    displayImg() {
      return this.img || config[this.type].img;
    },
    isBrowser() {
      return this.type === "browser";
    }
  },
  methods: {
    onClick() {
      if (this.$router) {
        this.$router.push(this.redirect);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-exception {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 666px;
  .img-wrapper {
    width: 50%;
    padding-right: 150px;
    display: flex;
    justify-content: flex-end;
    text-align: right;
    .err-img {
      max-height: 430px;
      max-width: 100%;
    }
  }
  .content {
    flex: auto;
    h1 {
      margin: 24px 0;
      color: #434e59;
      font-weight: 600;
      font-size: 56px;
      line-height: 56px;
      &.browser {
        font-size: 30px;
        line-height: 30px;
      }
    }
    .desc {
      margin-bottom: 16px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
    }
    .browsers {
      display: flex;
      .browser-item {
        display: flex;
        flex-direction: column;
        width: 70px;
        align-items: center;
        span {
          color: #aaa;
        }
      }
    }
  }
}
</style>
