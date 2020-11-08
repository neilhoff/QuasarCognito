<template>
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
</template>

<script>
import { AuthMixin } from 'src/mixins/AuthMixin'
export default {
  name: 'SignInForm',
  mixins: [AuthMixin],
  data () {
    return {
      isPwd: true,
      currentUser: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
