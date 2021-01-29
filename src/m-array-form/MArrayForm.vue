<template>
  <m-form
    class="m-array-form"
    v-bind="$attrs"
    v-on="$listeners"
    labelWidth="0"
    :model="value"
    :fields="fields"
    ref="mForm"
  >
  </m-form>
</template>

<script>
import MForm from "../m-form/MForm.vue";
import _ from "lodash";
import { isUndefined } from "../utils";
import ValidMixins from "../utils/valid-mixins";
import MArrayFormItem from "./MArrayFormItem.vue";

const cd = val => (isUndefined(val) ? null : _.cloneDeep(val));

export default {
  name: "MArrayForm",
  components: { MForm },
  mixins: [ValidMixins],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    component: [String, Object],
    componentProps: Object,
    componentEvents: Object,
    itemDefaultValue: [String, Number, Object, Array],
    rules: Array,
    emptiable: Boolean
  },
  computed: {
    currentVal() {
      if (this.emptiable) {
        return this.value;
      }
      return this.value.length ? this.value : [cd(this.itemDefaultValue)];
    },
    fields() {
      return this.currentVal.map((value, index) => ({
        prop: index.toString(),
        label: "",
        component: MArrayFormItem,
        componentProps: {
          component: this.component,
          componentProps: this.componentProps,
          componentEvents: this.componentEvents,
          index,
          arrayValue: this.currentVal,
          emptiable: this.emptiable
        },
        componentEvents: {
          add: this.addItem,
          remove: this.removeItem,
          update: this.onUpdate
        },
        rules: this.rules
      }));
    }
  },
  mounted() {},
  methods: {
    addItem() {
      this.$emit("input", [...this.currentVal, cd(this.itemDefaultValue)]);
    },

    removeItem(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },

    validate() {
      return this.$refs.mForm.validate();
    },

    onUpdate(value, index) {
      this.$set(this.value, index, value);
    },

    getFieldComponents() {
      return Array(this.fields.length)
        .fill(0)
        .map((_, index) => {
          let comp = this.$refs.mForm.$refs[index];
          if (Array.isArray(comp)) {
            comp = comp[0];
          }
          return comp.getFieldComponent();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.m-array-form {
  .field-item {
    display: flex;
    align-items: center;
    .content {
      flex: auto;
      margin-right: 10px;
    }
  }
}
</style>
