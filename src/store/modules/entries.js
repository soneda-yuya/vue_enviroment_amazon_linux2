import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { fetchItem } from '../../api';

export function createEntriesStore() {
  return {
    state: {
      items: {},
    },
    actions: {
      fetchItem({ commit }) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return fetchItem().then(item => {
          commit('setItem', { item });
        });
      },
    },
    mutations: {
      setItem(state, { item }) {
        Vue.set(state.items, item);
      },
    },
  };
}
