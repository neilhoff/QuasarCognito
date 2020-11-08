<template>
  <q-page
    padding
    v-if="userProfile"
  >
    <div class="row justify-center">
      <q-card
        class="profile-card"
        rounded
      >
        <q-card-section>
          <div class="text-center text-primary">
            <q-icon
              name="account_box"
              style="font-size: 172px;"
            />
          </div>
          <div class="text-h4 text-center">{{userProfile.given_name}} {{userProfile.family_name}}</div>
          <div class="text-subtitle1 text-center">{{userProfile.email}}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { AuthMixin } from 'src/mixins/AuthMixin'

export default {
  name: 'UserProfile',
  mixins: [AuthMixin],
  data () {
    return {
      user: ''
    }
  },
  created () {
    // TODO: The router isn't always redirecting to the signup page
    // TODO: The v-if on the q-page element is also needed because otherwise it throws errors even when redirect is working
    if (!this.$store.state.user.attributes) {
      this.$router.push('/auth/signup')
    }
  }
}
</script>
<style lang="scss">
.profile-card {
  width: 400px;
  min-width: 300px;
  min-height: 300px;
}
</style>
