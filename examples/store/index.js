import Vue from "vue";
import Vuex from "vuex";
import { MUtils } from "m-ui";

Vue.use(Vuex);

const state = {
  cacheViews: []
};

const mutations = {
  ADD_CACHE_VIEW(state, view) {
    let index = state.cacheViews.findIndex(v => v.name === view.name);
    if (index < 0) {
      state.cacheViews.push(view);
    } else {
      Vue.set(state.cacheViews, index, view);
    }
  },

  REMOVE_CACHE_VIEW(state, view) {
    let name = MUtils.isString(view) ? view : view.name;
    let index = state.cacheViews.findIndex(v => v.name === name);
    if (index >= 0) {
      state.cacheViews.splice(index, 1);
    }
  }
};

const actions = {};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
