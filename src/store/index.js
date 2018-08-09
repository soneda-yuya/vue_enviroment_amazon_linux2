// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { createModules } from './modules';

Vue.use(Vuex);

export function createStore() {
  const modules = createModules();
  return new Vuex.Store({
    strict: true,
    modules,
    plugins: [createLogger()],
  });
}
