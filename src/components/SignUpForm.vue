<template>
  <div>
    <q-card class="sign-up-card q-px-lg q-ma-lg">
      <q-form
        @submit="signUp"
        class="q-gutter-sm"
      >
        <q-card-section class="text-h4 text-center">
          Create an Account
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newUser.username"
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
            v-model="newUser.password"
            label="Password"
            class=""
            outlined
            :type="isPwd ? 'password' : 'text'"
            hint="Must be at least 8 characters in length and include a number, special character, uppercase and lowercase letter"
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
          <q-input
            v-model="newUser.attributes.email"
            type="email"
            label="Email"
            class=""
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newUser.attributes.given_name"
            type="text"
            label="First Name"
            class=""
            outlined
          />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newUser.attributes.family_name"
            type="text"
            label="Last Name"
            class=""
            outlined
          />
        </q-card-section>

        <q-card-section>
          <q-btn
            label="Create Account"
            type="submit"
            color="accent"
          />
        </q-card-section>
      </q-form>
    </q-card>
    <confirm-signup-dialog
      @closeConfirmDialog="closeConfirmDialog"
      @toggleTab="toggleTab"
      :show-dialog="confirmDialog"
      :username="newUserName"
    />
  </div>
</template>

<script>
import ConfirmSignupDialog from 'components/ConfirmSignUpDialog'

export default {
  name: 'SignUpForm',
  components: {
    ConfirmSignupDialog
  },
  data () {
    return {
      isPwd: true,
      confirmDialog: false,
      newUser: {
        username: '',
        password: '',
        attributes: {
          email: '',
          given_name: '',
          family_name: ''
        }
      },
      newUserName: ''
    }
  },
  methods: {
    async signUp () {
      try {
        this.$q.loading.show()
        const result = await this.$Auth.signUp(this.newUser)
        this.newUserName = result.user.username
        this.confirmDialog = true
      } catch (error) {
        console.log('error signing up:', error)
        this.$q.notify({
          message: `Error signing up: ${error}`,
          type: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        this.newUser = {
          username: '',
          password: '',
          attributes: {
            email: '',
            given_name: '',
            family_name: ''
          }
        }
      }
    },
    closeConfirmDialog () {
      this.confirmDialog = false
    },
    toggleTab () {
      this.$emit('toggleTab', 'signin')
    }
  }
}
</script>
