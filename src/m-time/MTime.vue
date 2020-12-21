<template>
  <span>{{ content }}</span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isNumber } from "../utils";

const fullFormat = "YYYY-MM-DD HH:mm:ss";
const dateOnlyFormat = "YYYY-MM-DD";
dayjs.extend(relativeTime);

export default {
  name: "MTime",
  props: {
    value: {
      type: [Number, Date],
      validator(val) {
        if (val instanceof Date) {
          return true;
        }
        let len = val.toString().length;
        if (len > 10) {
          console.error("[m-time] 值必须是一个有效的十位时间戳或Date对象");
          return false;
        }
        return true;
      }
    },

    dateOnly: Boolean,
    relative: Boolean,
    format: String
  },
  computed: {
    content() {
      let dayjsObj = isNumber(this.value)
        ? dayjs.unix(this.value)
        : dayjs(this.value);

      if (this.relative) {
        return dayjsObj.fromNow();
      }
      let format = this.format || (this.dateOnly ? dateOnlyFormat : fullFormat);
      return dayjsObj.format(format);
    }
  }
};
</script>
