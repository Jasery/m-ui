import { setStyle } from "./util";

export default {
  bind() {},
  inserted(el, { value }) {
    setStyle(el, "backgroundColor", value);
  },

  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setStyle(el, "backgroundColor", value);
    }
  },

  unbind() {}
};
