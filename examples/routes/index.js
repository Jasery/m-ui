import VueRouter from "vue-router";
import Vue from "vue";

import index from "../views/index";
import home from "../views/home/index";
import table from "../views/table";
import form from "../views/form";
import page403 from "../views/exception/403";
import page404 from "../views/exception/404";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/403",
      component: page403
    },
    {
      path: "/",
      component: index,
      redirect: "home",
      children: [
        {
          path: "home",
          component: home,
          name: "home",
          meta: {
            title: "首页"
          }
        },
        {
          path: "table",
          component: table,
          name: "table",
          meta: {
            title: "表格"
          }
        },
        {
          path: "form",
          component: form,
          name: "form",
          meta: {
            title: "表单"
          }
        }
      ]
    },
    {
      path: "*",
      component: page404
    }
  ]
});
