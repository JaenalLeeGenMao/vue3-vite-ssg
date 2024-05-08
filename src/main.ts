import './assets/main.css'

import devalue from '@nuxt/devalue'
import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { useRootStore } from './stores/root'
import App from './App.vue'
// import router from './router'
import { routes } from 'vue-router/auto-routes'
// import { routes } from 'vue-router/auto-routes'
// import generatedRoutes from '~pages'

export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes: setupLayouts(routes)
    // routes: setupLayouts(generatedRoutes)
  },
  ({ app, router, initialState }) => {
    const pinia = createPinia()
    app.use(pinia)

    if (import.meta.env.SSR) {
      // this will be stringified and set to window.__INITIAL_STATE__
      initialState.pinia = pinia.state.value
    } else {
      // on the client side, we restore the state
      pinia.state.value = initialState?.pinia || {}
    }

    router.beforeEach((to, from, next) => {
      const store = useRootStore(pinia)

      store.initialize()
      next()
    })
  },
  {
    transformState(state) {
      return import.meta.env.SSR ? devalue(state) : state
    }
  }
)
