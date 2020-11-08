import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import user from './user'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'QuasarCognito', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  modules: ['user']
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    modules: {
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
