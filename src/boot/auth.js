import { Auth } from '@aws-amplify/auth'
import { cognitoConfig } from './auth/cognitoConfig'
Auth.configure(cognitoConfig)

import { Notify } from 'quasar'

function goToSignUp (next) {
  Notify.create({
    message: 'You need to sign in to view this page',
    multiLine: true,
    type: 'negative',
    timeout: 10000,
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    ]
  })
  next('/signup')
}

export default async ({ app, router, store, Vue }) => {
  const plugin = {
    install () {
      Vue.Auth = Auth
      Vue.prototype.$Auth = Auth
    }
  }
  Vue.use(plugin)

  router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      try {
        const isSignedIn = await Auth.currentAuthenticatedUser()
        if (isSignedIn) {
          next()
        } else {
          goToSignUp(next)
        }
      } catch (error) {
        if (error === 'not authenticated') {
          goToSignUp(next)
        }
      }
    }
    next()
  })
}
