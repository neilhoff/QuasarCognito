<template>
  <div>
    <q-card class="sign-up-card q-px-lg q-ma-lg">

      <q-form @submit="signIn">
        <q-card-section class="text-h4 text-center">
          Sign In
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="currentUser.username"
            type="text"
            label="Username"
            class=""
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="currentUser.password"
            label="Password"
            class=""
            outlined
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Sign In"
            type="submit"
            color="primary"
          />
        </q-card-section>
      </q-form>

    </q-card>
    <confirm-signup-dialog
      @closeConfirmDialog="closeConfirmDialog"
      :show-dialog="confirmDialog"
      :username="currentUser.username"
    />
  </div>
</template>

<script>
// import { AuthMixin } from 'src/mixins/AuthMixin'
import ConfirmSignupDialog from 'components/ConfirmSignUpDialog'

export default {
  name: 'SignInForm',
  components: {
    ConfirmSignupDialog
  },
  // mixins: [AuthMixin],
  data () {
    return {
      isPwd: true,
      currentUser: {
        username: '',
        password: ''
      },
      confirmDialog: false
    }
  },
  methods: {
    async signIn () {
      try {
        this.$q.loading.show()
        await this.$Auth.signIn(this.currentUser.username, this.currentUser.password)
        this.$router.push({ name: 'UserProfile' })
      } catch (error) {
        if (error.code === 'UserNotConfirmedException') {
          this.$q.notify({
            message: 'This account has not been verified yet',
            type: 'warning'
          })
          this.confirmDialog = true
        } else {
          console.log('Error signing in', error)
          this.$q.notify({
            message: `Error signing in: ${error.message}`,
            type: 'negative'
          })
        }
      } finally {
        this.$q.loading.hide()
      }
    },
    async resendConfirmationCode (username) {
      try {
        this.$q.loading.show()
        await this.$Auth.resendSignUp(username)
      } catch (error) {
        console.log(error)
        this.$q.notify({
          message: `Error resending confirmation code: ${error}`,
          type: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    closeConfirmDialog () {
      this.confirmDialog = false
    }
  }
}
</script>
