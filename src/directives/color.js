import { setStyle } from "./util";

export default {
  bind() {},
  inserted(el, { value }) {
    setStyle(el, "color", value);
  },

  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setStyle(el, "color", value);
    }
  },

  unbind() {}
};
