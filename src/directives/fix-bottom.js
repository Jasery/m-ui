import _ from "lodash";

function getFixFunc(el) {
  return function() {
    let { top } = el.getBoundingClientRect();
    let bottom = el.fixBottomConfig.bottom || 0;
    let targetHeight = window.innerHeight - top - bottom;
    el.style.height = targetHeight + "px";
  };
}

export default {
  inserted: function(el, binding) {
    if (!_.isNumber(binding.value)) {
      console.error("directive:v-fix-bottom value is not a number");
      return;
    }
    let bottom = binding.value;
    el.fixBottomConfig = {
      bottom,
      fixFunc: getFixFunc(el)
    };
    el.fixBottomConfig.fixFunc();
    window.addEventListener("resize", el.fixBottomConfig.fixFunc);
  },
  unbind: function(el) {
    if (el.fixBottomConfig && _.isFunction(el.fixBottomConfig.fixFunc)) {
      window.removeEventListener("resize", el.fixBottomConfig.fixFunc);
    }
  },
  update: function(el, binding) {
    if (!_.isNumber(binding.value)) {
      console.error("directive:v-fix-bottom value is not a number");
      return;
    }
    let bottom = binding.value;
    if (el.fixBottomConfig) {
      if (el.fixBottomConfig.bottom === bottom) {
        return;
      }
      el.fixBottomConfig.bottom = bottom;
      el.fixBottomConfig.fixFunc();
    } else {
      el.fixBottomConfig = {
        bottom,
        fixFunc: getFixFunc(el)
      };
      el.fixBottomConfig.fixFunc();
      window.addEventListener("resize", el.fixBottomConfig.fixFunc);
    }
  }
};
