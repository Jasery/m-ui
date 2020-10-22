import VueRouter from "vue-router";
import Vue from "vue";

import index from "../views/index";
import home from "../views/home/index";
import table from "../views/table";
import form from "../views/form";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: index,
      redirect: "home",
      children: [
        {
          path: "home",
          component: home
        },
        {
          path: "table",
          component: table
        },
        {
          path: "form",
          component: form
        }
      ]
    }
  ]
});
