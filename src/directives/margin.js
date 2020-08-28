import { setDirectionStyle } from "./util";

export default {
  bind() {},
  inserted(el, { value, arg }) {
    setDirectionStyle(el, "margin", arg, value);
  },

  update(el, { value, oldValue, arg }) {
    if (value !== oldValue) {
      setDirectionStyle(el, "margin", arg, value);
    }
  },

  unbind() {}
};
