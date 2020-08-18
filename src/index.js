export const HelloMUi = {
  render(h) {
    return h("h1", "hello m-ui");
  }
};

export default {
  install(Vue) {
    Vue.component("hello-mui", HelloMUi);
  }
};
