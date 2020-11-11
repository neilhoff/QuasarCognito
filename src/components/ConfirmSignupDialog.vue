<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Please Confirm Your Account</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 q-mb-md">A confirmation code has been sent to your email </div>

        <q-input
          class="col"
          v-model="confirmationCode"
          type="text"
          label="Confirmation code"
          outlined
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Submit" color="primary" @click="confirmSignUp"/>
      </q-card-actions>
      <q-card-section >
        <div>If you did not recieve the code or it has expired, we can send you a new one </div>
        <q-btn flat label="Resend Code" color="primary" @click="resendConfirmationCode"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ConfirmSignupDialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      confirmationCode: ''
    }
  },
  methods: {
    async confirmSignUp () {
      try {
        this.$q.loading.show()
        await this.$Auth.confirmSignUp(this.username, this.confirmationCode)
        this.closeDialog()
        this.$q.notify({
          message: 'Account confirmed successfully. Please sign in.',
          type: 'positive'
        })
        this.$emit('toggle-tab', 'signin')
      } catch (error) {
        console.log('error confirming sign up', error)
        this.$q.notify({
          message: `${error.message}`,
          type: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    async resendConfirmationCode () {
      try {
        this.$q.loading.show()
        const result = await this.$Auth.resendSignUp(this.username)
        console.log(result)
        this.$q.notify({
          message: 'Confirmation code sent successfully. Please check your email.',
          type: 'positive'
        })
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
    closeDialog () {
      this.$emit('closeConfirmDialog')
    }
  }
}
</script>
