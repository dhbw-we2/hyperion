<template>
  <div class="bg-image">
    <q-page padding="padding">
      <div class="justify-center">
        <div class="login">
          <q-form class="authentication q-gutter-y-md" ref="forgotPasswordForm" @submit="onSubmit">
            <h4 class="q-mb-none">Passwort vergessen</h4>
            <div class="inst q-mb-lg">Bitte gebe deine E-Mail Adresse ein. Wir schicken dir einen Link um dein Passwort zu ändern.</div>
            <q-input
              v-model="email"
              outlined
              autocomplete="email"
              color="primary"
              data-cy="email"
              for="email"
              label="EMAIL"
              lazy-rules="lazy-rules"
              name="email"
              type="email"
              :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
            ></q-input>
            <q-btn class="full-width q-mt-md" color="primary" data-cy="submit" label="Passwort Zurücksetzen" :loading="loading"
                   @click="onSubmit">
              <template v-slot:loading>
                <q-spinner-gears></q-spinner-gears>
              </template>
            </q-btn>
          </q-form>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import {QSpinnerGears} from 'quasar'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.forgotPasswordForm.validate()
        .then(async success => {
          this.$q.loading.show({
            message: 'Attempting to reset your password.',
            backgroundColor: 'grey',
            spinner: QSpinnerGears,
            customClass: 'loader'
          })
          if (success) {
            try {
              await this.$fb.auth().sendPasswordResetEmail(this.email)
              this.$q.notify({
                color: 'positive',
                message: 'Eine EMAIL zur Passwortrücksetzung wurde an dich versendet.'
              })
            } catch (err) {
              this.$q.notify({
                color: 'negative',
                message: `There was an error: ${err}`
              })
            }
          }
          this.$q.loading.hide()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.authentication
  margin auto
  max-width 30em
  width 100%

  .q-img
    height 190px

.q-page >>> .q-img__image
  height 184px
  background-size 35% !important
  background-position 50% 100% !important
</style>
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
