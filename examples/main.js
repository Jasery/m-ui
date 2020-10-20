import Vue from "vue";
import Elm from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import mui from "m-ui";
import router from "./routes";
import App from "./App";

Vue.use(Elm);

Vue.use(mui);

new Vue({
  ...App,
  router
}).$mount("#app");
