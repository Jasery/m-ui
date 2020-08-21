import AuthObserver from "./auth-observer";
import directiveFactory from "./directive-factory";
import routerAuth from "./router-auth";

export { AuthObserver, routerAuth };

export default {
  install(Vue, options = {}) {
    const $auth = new AuthObserver(options);
    Vue.prototype.$auth = $auth;
    Vue.directive("auth", directiveFactory($auth));
  }
};
