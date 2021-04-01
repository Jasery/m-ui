<template>
  <el-date-picker
    v-model="dateVal"
    ref="datePicker"
    :size="size"
    v-bind="{
      ...$attrs,
      'value-format': undefined,
      'default-time': _defaultTime,
      'picker-options': _pickerOptions
    }"
    v-on="{
      ...$listeners,
      input: onInput,
      change: onChange
    }"
    class="m-date-picker"
  >
    <template v-slot:range-separator>
      <slot name="range-separator"></slot>
    </template>
  </el-date-picker>
</template>

<script>
import dayjs from "dayjs";
import { dateToUnix, unixToDate } from "../utils";

export default {
  name: "MDatePicker",
  props: {
    value: [Number, Array],
    size: {
      type: String,
      default: "small"
    },
    pickerOptions: [Boolean, Object],
    defaultTime: Array
  },
  components: {},
  data() {
    return {
      dateVal: null
    };
  },
  computed: {
    _defaultTime() {
      if (this.defaultTime) {
        return this.defaultTime;
      }
      let type = this.$attrs.type;
      if (type && type.endsWith("range")) {
        return ["00:00:00", "23:59:59"];
      }
      return undefined;
    },
    _pickerOptions() {
      let type = this.$attrs.type;
      if (!type || !type.endsWith("range")) {
        return this.pickerOptions;
      }
      if (this.pickerOptions && typeof this.pickerOptions !== "boolean") {
        return this.pickerOptions;
      } else if (this.pickerOptions) {
        return this.options;
      }
      return this.pickerOptions;
    },
    options() {
      return {
        firstDayOfWeek: 1,
        shortcuts: [
          {
            text: "昨天",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("day", -1));
            }
          },
          {
            text: "本周",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("week", 0));
            }
          },
          {
            text: "上周",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("week", -1));
            }
          },
          {
            text: "本月",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("month", 0));
            }
          },
          {
            text: "上月",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("month", -1));
            }
          },
          {
            text: "最近7天",
            onClick: picker => {
              picker.$emit("pick", this.getLatestDayRange(7));
            }
          },
          {
            text: "最近30天",
            onClick: picker => {
              picker.$emit("pick", this.getLatestDayRange(30));
            }
          },
          {
            text: "最近90天",
            onClick: picker => {
              picker.$emit("pick", this.getLatestDayRange(90));
            }
          },
          {
            text: "本季度",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("quarter", 0));
            }
          },
          {
            text: "上季度",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange("quarter", -1));
            }
          }
        ]
      };
    }
  },
  watch: {
    value: {
      handler(val) {
        this.dateVal = this.valToDate(val);
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    onChange(value) {
      let unixVal = this.dateToVal(value);
      this.$emit("change", unixVal);
    },
    onInput(value) {
      let unixVal = this.dateToVal(value);
      this.$emit("input", unixVal);
    },
    dateToVal(dateVal) {
      if (Array.isArray(dateVal)) {
        return dateVal.map(dateToUnix);
      }
      if (dateVal instanceof Date) {
        return dateToUnix(dateVal);
      }
      return dateVal;
    },
    valToDate(val) {
      if (Array.isArray(val)) {
        return val.map(unixToDate);
      }
      if (typeof val === "number") {
        return unixToDate(this.value);
      }
      return val;
    },

    focus() {
      return this.$refs.datePicker?.focus();
    },
    getLatestDayRange(latestDay = 0) {
      if (latestDay < 0) {
        latestDay = 0;
      }
      if (latestDay === 0) {
        return [new Date(0), new Date()];
      }
      let today = dayjs();
      let before = today.subtract(latestDay, "day");
      return [before.toDate(), today.toDate()];
    },

    getDateRange(period, offset = 0) {
      let start = dayjs()
        .startOf(period)
        .add(offset, period);
      let end = dayjs()
        .endOf(period)
        .add(offset, period);
      return [start.toDate(), end.toDate()];
    }
  }
};
</script>

<style lang="scss" scoped></style>
