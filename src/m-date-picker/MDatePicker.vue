<template>
  <el-date-picker
    v-model="dateVal"
    ref="datePicker"
    :size="size"
    v-bind="{
      ...$attrs,
      'value-format': undefined,
      'default-time': defaultTime
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
import { dateToUnix, unixToDate } from "../utils";

export default {
  name: "MDatePicker",
  props: {
    value: [Number, Array],
    size: {
      type: String,
      default: "small"
    }
  },
  components: {},
  data() {
    return {
      dateVal: null
    };
  },
  computed: {
    defaultTime() {
      let type = this.$attrs.type;
      if (type && type.endsWith("range")) {
        return ["00:00:00", "23:59:59"];
      }
      return undefined;
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
