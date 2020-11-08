<template>
  <q-page padding>
    <div v-if="!userProfile">
      <q-tabs
        v-model="tab"
        class=""
      >
        <q-tab
          name="signup"
          icon="alarm"
          no-caps
          label="Create a new account"
        />
        <q-tab
          name="signin"
          icon="mail"
          no-caps
          label="Sign In"
        />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="signup">
          <div class="row justify-center">
            <sign-up-form></sign-up-form>
          </div>
        </q-tab-panel>
        <q-tab-panel name="signin">
          <div class="row justify-center">
            <sign-in-form></sign-in-form>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-if="userProfile">
      <div class="text-h5 text-center">You are already signed in as {{userProfile.given_name}} {{userProfile.family_name}}</div>
      <div class="row justify-center items-center q-mt-sm">If this is not you, please
        <q-btn
          color="primary"
          outline
          label="Sign Out"
          @click="signOut"
          size="md"
          class="q-ml-md"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import SignInForm from 'components/SignInForm'
import SignUpForm from 'components/SignUpForm'
import { AuthMixin } from 'src/mixins/AuthMixin'

export default {
  name: 'Authenticate',
  components: {
    SignInForm,
    SignUpForm
  },
  mixins: [AuthMixin],
  watch: {
    $route (to, from) {
      this.tab = to.params.type
    }
  },
  data () {
    return {
      tab: this.$route.params.type
    }
  }
}
</script>
<style lang="scss">
.sign-up-card {
  width: 600px;
  min-width: 400px;
}
</style>
