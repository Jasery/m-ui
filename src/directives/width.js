import { setStyle } from "./util";
export default {
  bind() {},
  inserted(el, { value }) {
    setStyle(el, "width", value);
  },

  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setStyle(el, "width", value);
    }
  },

  unbind() {}
};
