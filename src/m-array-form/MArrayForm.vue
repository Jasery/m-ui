<template>
  <m-form
    class="m-array-form"
    v-bind="$attrs"
    v-on="$listeners"
    labelWidth="0"
    :model="value"
    :fields="fields"
    ref="form"
  >
    <template v-slot:field="{ index }">
      <div class="field-item">
        <div class="content">
          <slot :index="index" :value="value[index]">
            <component
              :is="component"
              v-bind="componentProps"
              v-on="componentEvents"
              v-model="value[index]"
            ></component>
          </slot>
        </div>
        <div class="btn">
          <el-button
            v-if="index === 0"
            type="primary"
            icon="el-icon-plus"
            circle
            @click="addItem"
          ></el-button>
          <el-button
            v-else
            type="danger"
            icon="el-icon-minus"
            circle
            @click="removeItem(index)"
          ></el-button>
        </div>
      </div>
    </template>
  </m-form>
</template>

<script>
import MForm from "../m-form/MForm.vue";
import _ from "lodash";
import { isUndefined } from "../utils";

const cd = val => (isUndefined(val) ? null : _.cloneDeep(val));

export default {
  name: "MArrayForm",
  components: { MForm },
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
    itemDefaultValue: [String, Number, Object],
    rules: Array
  },
  computed: {
    currentVal() {
      return this.value.length ? this.value : [cd(this.itemDefaultValue)];
    },
    fields() {
      return this.currentVal.map((item, index) => ({
        prop: index.toString(),
        label: "",
        slotName: "field",
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

    validator(rule, value, callback) {
      return this.validate()
        .then(valid => {
          if (valid) {
            callback();
          } else {
            callback(new Error(valid));
          }
        })
        .catch(err => callback(err));
    },

    validate() {
      this.$refs.validate();
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
