import _ from "lodash";

function getFixedFunc(el) {
  return function() {
    let { top } = el.getBoundingClientRect();
    let bottom = el.fixedBottomConfig.bottom || 0;
    let targetHeight = window.innerHeight - top - bottom;
    el.style.height = targetHeight + "px";
  };
}

export default {
  inserted: function(el, binding) {
    if (!_.isNumber(binding.value)) {
      console.error("directive:v-fixed-bottom value is not a number");
      return;
    }
    let bottom = binding.value;
    el.fixedBottomConfig = {
      bottom,
      fixedFunc: getFixedFunc(el)
    };
    el.fixedBottomConfig.fixedFunc();
    window.addEventListener("resize", el.fixedBottomConfig.fixedFunc);
  },
  unbind: function(el) {
    if (el.fixedBottomConfig && _.isFunction(el.fixedBottomConfig.fixedFunc)) {
      window.removeEventListener("resize", el.fixedBottomConfig.fixedFunc);
    }
  },
  update: function(el, binding) {
    if (!_.isNumber(binding.value)) {
      console.error("directive:v-fix-bottom value is not a number");
      return;
    }
    let bottom = binding.value;
    if (el.fixedBottomConfig) {
      if (el.fixedBottomConfig.bottom === bottom) {
        return;
      }
      el.fixedBottomConfig.bottom = bottom;
      el.fixedBottomConfig.fixedFunc();
    } else {
      el.fixedBottomConfig = {
        bottom,
        fixedFunc: getFixedFunc(el)
      };
      el.fixedBottomConfig.fixedFunc();
      window.addEventListener("resize", el.fixedBottomConfig.fixedFunc);
    }
  }
};
