export const AuthMixin = {
  methods: {
    async signUp () {
      try {
        await this.$Auth.signUp(this.newUser)
      } catch (error) {
        console.log('error signing up:', error)
      }
    },
    async signIn () {
      try {
        this.$q.loading.show()
        const user = await this.$Auth.signIn(this.currentUser.username, this.currentUser.password)
        this.$q.loading.hide()
        this.$store.commit('user/setAttributes', user.attributes)
        this.$router.push({ name: 'UserProfile' })
      } catch (error) {
        this.$q.loading.hide()
        console.log('error signing in', error)
        this.$q.notify({
          message: error.message,
          type: 'negative'
        })
      }
    },
    signOut () {
      try {
        this.$store.commit('user/setAttributes', null)
        this.$Auth.signOut()
        this.$router.push({ name: 'SignUp' })
      } catch (error) {
        console.log('error signing out: ', error)
      }
    }
  },
  computed: {
    userProfile () {
      return this.$store.state.user.attributes
    }
  }
}
