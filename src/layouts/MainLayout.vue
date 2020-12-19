<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
            <q-avatar>
              <img @click="$router.push({ path: '../home' })"
                   class="hover"
                   src="../assets/icon_1.png" alt="filmtracker"
              >
            </q-avatar>
          Filmtracker

        </q-toolbar-title>

        <div class="absolute-center" style="min-width: 35%">
          <q-input dark v-model="search" filled type="search" color="white" @keydown.enter.prevent="searchBtnClick">
            <template v-slot:after>
              <q-btn round dense flat icon="search" @click="searchBtnClick" type="submit"/>
            </template>
          </q-input>
        </div>
        <q-btn v-if="!$store.state.auth.isAuthenticated" dense color="secondary" icon-right="fas fa-sign-in-alt"
               label="Login" to="/auth/login"/>
        <q-btn v-if="$store.state.auth.isAuthenticated" dense color="secondary" icon-right="fas fa-sign-in-alt"
               label="Logout" @click="logout"/>

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" label="Startseite"/>
        <q-tab label="Suche"/>
        <q-route-tab to="/watchlist" label="Watch-List"/>
        <q-route-tab to="/watchedlist" label="Watched-List"/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view/>

    </q-page-container>

  </q-layout>
</template>

<script>
import {mapActions} from "vuex"

export default {
  data() {
    return {
      right: false,
      search: ''
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    searchBtnClick() {
      let searchtext;
      searchtext = this.search;
      this.$router.replace({name: "searchresult", params: {search: searchtext}}).catch(err => {
      })
    },
    async logout() {
      try {
        await this.logoutUser()
        this.$q.notify({
          type: 'info',
          message: "You are now logged out!"
        })
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `${err}`,
        })
      }
    },
  }
}
</script>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px

.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center

.q-footer
  .q-tab__icon
    font-size: 30px
</style>
