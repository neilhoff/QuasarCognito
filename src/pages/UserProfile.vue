<template>
  <q-page
    padding
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
      userProfile: {}
    }
  },
  methods: {

  },
  async created () {
    await this.getUserAttributes()
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
