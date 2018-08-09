// app.js
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

export function createApp() {
  // create router instance
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    // inject router into root Vue instance
    store,
    router,
    render: h => h(App),
  });
  // return both the app and the router
  return { app, router, store };
}
