import { setStyle } from "./util";

export default {
  bind() {},
  inserted(el, { value }) {
    setStyle(el, "height", value);
  },

  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setStyle(el, "height", value);
    }
  },

  unbind() {}
};
