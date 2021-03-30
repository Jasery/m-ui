<template>
  <div :class="['m-chat-record-item', position]">
    <div class="info">
      <span>{{ nickName }}</span>
      <span>{{ timeStr }}</span>
    </div>
    <div class="content-container">
      <div class="avatar">
        <el-avatar :src="avatar"></el-avatar>
      </div>
      <div class="content" :style="contentBg">
        <component
          :is="contentComponent"
          :content="content"
          :config="config"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "MChatRecordItem",
  props: {
    avatar: {
      type: String,
      default:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    },
    nickName: {
      type: String,
      default: ""
    },
    time: Number,
    content: {
      type: [String, Object],
      default: ""
    },
    position: {
      type: String,
      default: "left",
      validator(val) {
        return ["left", "right"].includes(val);
      }
    },
    leftBgColor: {
      type: String,
      default: "#eee"
    },
    rightBgColor: {
      type: String,
      default: "#9eea6a"
    },
    showNickName: {
      type: Boolean,
      default: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    contentComponent: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    contentBg() {
      return {
        backgroundColor: this[this.position + "BgColor"]
      };
    },
    timeStr() {
      return dayjs(this.time).format("HH:mm");
    },
    config() {
      return {
        avatar: this.avatar,
        nickName: this.nickName,
        time: this.time,
        content: this.content,
        position: this.position,
        showNickName: this.showNickName,
        showTime: this.showTime
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.m-chat-record-item {
  .info {
    padding: 10px;
    color: #999;
    display: flex;
    span {
      margin: 0 5px;
    }
  }
  .content-container {
    display: flex;
  }
  .avatar {
    margin: 0 10px;
  }
  .content {
    padding: 10px;
    background-color: #eee;
    border-radius: 5px;
    position: relative;
    max-width: 80%;
  }
  &.left {
    .content {
      &::before {
        content: "";
        display: block;
        background-color: inherit;
        position: absolute;
        width: 10px;
        height: 10px;
        top: 15px;
        left: -5px;
        transform: rotate(45deg);
      }
    }
  }
  &.right {
    .info {
      flex-direction: row-reverse;
    }
    .content-container {
      justify-content: flex-end;
    }
    .avatar {
      order: 1;
    }
    .content {
      &::after {
        content: "";
        display: block;
        background-color: inherit;
        position: absolute;
        width: 10px;
        height: 10px;
        top: 15px;
        right: -5px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
