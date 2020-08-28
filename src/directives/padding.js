import { setDirectionStyle } from "./util";

export default {
  bind() {},
  inserted(el, { value, arg }) {
    setDirectionStyle(el, "padding", arg, value);
  },

  update(el, { value, oldValue, arg }) {
    if (value !== oldValue) {
      setDirectionStyle(el, "padding", arg, value);
    }
  },

  unbind() {}
};
