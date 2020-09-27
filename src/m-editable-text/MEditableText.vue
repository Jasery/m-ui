<template>
  <div class="m-editable-text">
    <pre
      ref="content"
      v-if="multiLine"
      :contenteditable="!disabled"
      :style="{ minWidth }"
      :class="{ placeholder: !value && !isFocus }"
      v-html="displayText"
      @blur="onBlur"
      @focus="onFocus"
    ></pre>
    <span
      ref="content"
      v-else
      :contenteditable="!disabled"
      :style="{ minWidth }"
      :class="{ placeholder: !value && !isFocus }"
      v-text="displayText"
      @blur="onBlur"
      @focus="onFocus"
      @keydown.enter="onConfirm"
    ></span>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import { parseStyleNum } from "../utils";

export default {
  name: "MEditableText",
  props: {
    value: [String, Number],
    multiLine: Boolean,
    disabled: Boolean,
    rules: Array,
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  components: {},
  data() {
    return {
      editValue: this.value,
      minWidth: "",
      isFocus: false
    };
  },
  computed: {
    displayText() {
      if (this.isFocus) {
        return this.value;
      }
      if (this.placeholder && !this.value) {
        return this.placeholder;
      }
      return this.value;
    }
  },
  watch: {
    value() {
      this.editValue = this.value;
    }
  },
  mounted() {
    let target = this.$refs.content;
    let mutationObserver = new MutationObserver(this.contentChange.bind(this));
    let config = {
      childList: true
    };
    mutationObserver.observe(target, config);
    this.$once("hook:beforeDestroy", () => {
      mutationObserver.disconnect();
      mutationObserver = null;
    });
    this.minWidth = this.getMinWidth();
  },
  methods: {
    onBlur() {
      this.isFocus = false;
      let value = this.getEditContent();
      this.validate(value)
        .then(() => {
          this.$emit("validate", null);
          this.$emit("save", value);
        })
        .catch(({ errors }) => {
          let error = errors[0];
          let msg = error instanceof Error ? error.message : error;
          this.$emit("validate", msg);
          this.$refs.content.innerText = this.displayText;
        });
    },

    onFocus() {
      this.isFocus = true;
    },

    validate(value) {
      if (!this.rules || !this.rules.length) {
        return Promise.resolve(true);
      }
      let prop = "value";
      const descriptor = {
        [prop]: this.rules
      };
      const validator = new AsyncValidator(descriptor);
      const model = {
        [prop]: value
      };
      return validator.validate(model, { firstFields: true });
    },

    onConfirm() {
      this.$refs.content.blur();
    },

    getEditContent() {
      return this.$refs.content.innerText.trim();
    },

    contentChange(mutations) {
      for (let mutation of mutations) {
        if (mutation.type === "childList") {
          this.editValue = this.getEditContent();
        }
      }
    },

    getMinWidth() {
      if (!this.$refs.content) {
        return "";
      }
      let fontSize = getComputedStyle(this.$refs.content)["font-size"];
      fontSize = parseStyleNum(fontSize);
      return fontSize * this.placeholder.length + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
.m-editable-text {
  position: relative;
  display: inline-block;
  span {
    display: inline-block;
    min-width: 20px;
  }
  pre {
    max-width: 100%;
    word-wrap: break-word;
    white-space: pre-wrap;
    margin: 0;
  }
  span,
  pre {
    outline: none;
  }
  .placeholder {
    color: #909399;
  }
}
</style>
