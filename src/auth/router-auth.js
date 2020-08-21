import Vue from "vue";

function hasPermission($auth, authData) {
  if (Array.isArray(authData)) {
    return authData.some(key => $auth.checkAuth(key));
  }
  if (typeof authData === "string") {
    return $auth.checkAuth(authData);
  }
  if (typeof authData === "function") {
    return !!authData($auth);
  }
}

export default function handleRouteConfigs(routeConfigs, redirect) {
  for (let routeConfig of routeConfigs) {
    if (routeConfig.auth) {
      const oldBeforeEnter = routeConfig.beforeEnter;
      const callOldBeforeEnter = (to, from, next) => {
        if (oldBeforeEnter) {
          oldBeforeEnter(to, from, next);
        } else {
          next();
        }
      };
      routeConfig.beforeEnter = function(to, from, next) {
        const $auth = Vue.prototype.$auth;
        if (!$auth) {
          callOldBeforeEnter(to, from, next);
          return;
        }
        let checkAuth = () => {
          if (hasPermission($auth, routeConfig.auth)) {
            callOldBeforeEnter(to, from, next);
          } else {
            next(redirect);
          }
        };
        if ($auth.hasSetAuth()) {
          checkAuth();
        } else {
          $auth.subscribe(routeConfig, checkAuth);
          callOldBeforeEnter(to, from, next);
        }
      };
    }
    if (routeConfig.children) {
      handleRouteConfigs(routeConfig.children, redirect);
    }
  }
  return routeConfigs;
}
