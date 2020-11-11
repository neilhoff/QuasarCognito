export const AuthMixin = {
  data () {
    return {
      userProfile: null
    }
  },
  methods: {
    async signOut () {
      try {
        this.$q.loading.show()
        await this.$Auth.signOut()
        this.$q.notify({
          message: 'You have successfully signed out',
          type: 'positive'
        })
        const currentPath = this.$router.currentRoute.fullPath
        if (currentPath !== '/auth/signin') {
          this.$router.push('/auth/signin')
        } else {
          this.$router.push('/auth/signup')
        }
      } catch (error) {
        console.log('error signing out: ', error)
        this.$q.notify({
          message: `Error signing out: ${error}`,
          type: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    async getUserAttributes () {
      try {
        const { attributes } = await this.$Auth.currentAuthenticatedUser()
        this.userProfile = attributes
      } catch (error) {
        this.userProfile = null
      }
    }
  }
}
