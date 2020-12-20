<template>
  <div class="bg-image">
    <q-page padding>
      <div class="justify-center">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-10 login">
          <h5 class="text-center">{{ getAuthType }}</h5>
          <q-form class="authentication q-gutter-y-md" ref="emailAuthenticationForm" @submit="onSubmit">
            <q-input
              v-model="email"
              outlined
              autocomplete="email"
              color="primary"
              data-cy="email"
              for="email"
              lazy-rules="lazy-rules"
              name="email"
              label="EMAIL"
              type="email"
              :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
            />
            <q-input
              v-model="password"
              for="password"
              name="password"
              lazy-rules="lazy-rules"
              outlined
              autocomplete="current-password"
              color="primary"
              data-cy="password"
              label="PASSWORT"
              :rules="[val => !!val || '*Field is required']"
              :type="isPwd ? 'password' : 'text'"
              @keyup.enter="onSubmit();"
            >
              <template v-slot:append>
                <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"/>
              </template>
            </q-input>
            <q-input
              v-if="isRegistration"
              lazy-rules="lazy-rules"
              outlined
              autocomplete="new-password"
              color="primary"
              data-cy="verifyPassword"
              label="PASSWORT WIEDERHOLEN"
              v-model="passwordMatch"
              :rules="[val => !!val || '*Field is required', val => val === password || '*Passwords don\'t match']"
              :type="isPwd ? 'password' : 'text'"
              @keyup.enter="onSubmit();"
            >
              <template v-slot:append>
                <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"/>
              </template>
            </q-input>
            <q-btn
              class="full-width q-mt-md"
              color="primary"
              data-cy="submit"
              type="submit"
              :label="getAuthType"
            >
            </q-btn>

            <p class="q-mt-md q-mb-none text-center">
              <router-link class="text-blue" :to="routeAuthentication">
                <span v-if="isRegistration">Du hast bereits einen Account?</span>
                <span v-else>Einen Account erstellen?</span>
              </router-link>
            </p>
            <p class="q-ma-sm text-center">
              <router-link class="text-blue" to="forgotPassword">Passwort vergessen?</router-link>
            </p>


          </q-form>
        </div>
      </div>
    </q-page>
  </div>

</template>

<script>
import {mapActions} from 'vuex'
import {QSpinnerGears} from 'quasar'

export default {
  name: 'Auth',
  computed: {
    getAuthType() {
      return this.isRegistration ? 'Account erstellen' : 'Login'
    },
    isRegistration() {
      return this.$route.name === 'Register'
    },
    routeAuthentication() {
      return this.isRegistration ? '/auth/login' : '/auth/register'
    }
  },
  data() {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  methods: {
    ...mapActions('auth', ['createNewUser', 'loginUser']),
    onSubmit() {
      const {email, password} = this
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          if (success) {
            this.$q.loading.show({
              message: this.isRegistration ? 'Dein Account wird erstellt...'
                : 'Du wirst eingeloggt...',
              backgroundColor: 'grey',
              spinner: QSpinnerGears,
              customClass: 'loader'
            })
            try {
              if (this.isRegistration) {
                await this.createNewUser({email, password})
              } else {
                await this.loginUser({email, password})
              }
              this.$router.push({path: '/'})
            } catch (err) {
              console.error(err)
              this.$q.notify({
                message: `An error as occured: ${err}`,
                color: 'negative'
              })
            } finally {
              this.$q.loading.hide()
            }
          }
        })
    }
  }
}
</script>

<style>

</style>
