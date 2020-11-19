import AuthObserver from "./auth-observer";
import directiveFactory from "./directive-factory";
import routerAuth from "./router-auth";
import { getConfig } from "../utils/config";

export { AuthObserver, routerAuth };

export default {
  install(Vue) {
    const config = getConfig();
    const $auth = new AuthObserver(config?.auth);
    Vue.prototype.$auth = $auth;
    Vue.directive("auth", directiveFactory($auth));
  }
};
